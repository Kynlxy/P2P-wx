<!--存管开通页面-->
<template>
  <div>
    <div class="main-warp">
      <div class="main-top-banner">
        银行存管开通
      </div>
      <div class="input-div">
        <span>姓名:</span> <input class="name" type="text" placeholder="请输入姓名" v-model="personInfo.uName">
      </div>
      <div class="input-div big">
        <span>身份证:</span> <input class="id-card" type="text" placeholder="请输入身份证号码" v-model="personInfo.idCard">
      </div>
      <button class="submit" @click="submit()">立即开通</button>
    </div>
    <bottomBar :on="on"></bottomBar>
    <MyIframe :onHref="onHref" v-if="this.$store.state.iframeIf"></MyIframe>
  </div>
</template>
<script>
  import checkout from '../../common/checkout';
  import {Toast, Indicator} from 'mint-ui';
  import MyIframe from '../common/iframeDiv.vue'
  import bottomBar from '../common/bottomBar.vue'
  export default({
    name: "Depository",
    data(){
      return {
        on: "my",             //传值给bottomBar确定是哪个处于on状态
        personInfo: {          //个人信息相关
          uName: "",
          idCard: "",
          phone: this.$store.state.myInfo.mobile
        },
        onHref: "",        //跳转的链接
        clearInfo: {       //轮询相关
          num: 0,           // 轮询次数
          clear: null,       //轮询开关
          isBegin: false    //轮询是否开始
        }
      }
    },
    mounted(){

    },
    methods: {
      submit(){
        var that = this;
        var test = new checkout.InputValidators();
        test.importStrategies(checkout.validationStrategies);
        test.addValidator('minLength:1', '请输入姓名', that.personInfo.uName);
        test.addValidator('isIdCardNo', '请输入正确的身份证号码', that.personInfo.idCard);
        var result = test.check();
        if (result) {
          Toast(result.errMsg);
          return false;
        }
        that.$http({
          method: 'post',
          url: that.api.webOpenAccount,
          data: that.$qs.stringify({
            mobile: that.personInfo.phone,
            realname: that.personInfo.uName,
            personid: that.personInfo.idCard,
            way: "IOS"
          })
        }).then(function (response) {
          if (response.data.r == 1 && response.data.gohref) {
            that.onHref = response.data.gohref;
            that.$store.state.iframeIf = true;
            //轮询就开启一次
            if (that.clearInfo.isBegin == false) {
              that.clearInfo.isBegin = true;
              that.setTimeoutFunction();
            }
          } else {
            Toast(response.data.msg || "出错啦!");
          }
        }).catch(function (response) {
          console.log(response);
        });
      },
      setTimeoutFunction(){
        var that = this;
        that.$http({
          method: 'post',
          url: that.api.checkLoginApi,
        }).then(function (response) {
          if (that.clearInfo.num <= 200 && that.clearInfo.isBegin == true) {
            if (response.data.msg && response.data.msg.indexOf("请先开通存管账户") != -1) {
              that.clearInfo.clear = setTimeout(function () {
                that.clearInfo.num++;
                that.setTimeoutFunction();
              }, 3000)
            } else {
              that.$router.push({ path: '/DepositoryManage'});
            }
          }
        }).catch(function (response) {
          console.log(response);
        });

      },
    },
    components: {
      bottomBar,
      MyIframe
    }
  })
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import url(../../assets/less/common.less);

  .main-warp {
    .submit {
      width: 50%;
      height: 70/@r;
      font-size: 16px;
      margin: 0 auto;
      display: block;
      background: #6da5ee;
      color: #fff;
      margin-top: 60/@r;
    }
    .main-top-banner {
      width: 100%;
      height: 100/@r;
      padding-top: 80/@r;
      font-size: 1rem;
      text-align: center;
      color: #9e9e9e;
    }
    .input-div {
      width: 90%;
      height: 2rem;
      margin: 0 auto;
      margin-top: 30/@r;
      span {
        font-size: .7rem;
        position: absolute;
        line-height: 2rem;
      }
      input {
        margin-left: 17%;
        width: 70%;
        padding-left: 5%;
        height: 100%;
        border-radius: 4px;
        color: #34495e;
        border: 1px solid #e6e6e6;
        font-size: .7rem;
        font-family: "Microsoft Yahei";
        box-shadow: none;
      }
    }

  }
</style>
