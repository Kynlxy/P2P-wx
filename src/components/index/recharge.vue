<!--充值页面-->
<template>
  <div>
    <div class="main-warp">
      <template v-if="bankInfo">
        <div class="main-center-top">
          <img :src="imgSrc" alt="">
          <div class="right-div">
            <p class="total-p">{{bankInfo.dbankinfo}}</p>
            <p>{{bankInfo.mobile}}</p>
          </div>
        </div>
        <div class="p-div">
          每笔最大20万,每日限额50万元
        </div>
        <div class="input-div">
          <span class="absolute-span">金额</span>
          <input type="number" placeholder="请输入充值金额" v-model="money">
        </div>
        <button class="submit" @click="quickRecharge()">充值</button>
      </template>
      <template v-else-if="bankInfo == null">
        <!--<div class="p-div">-->
          <!--每笔最大20万,每日限额50万元-->
        <!--</div>-->
        <!--<div class="input-div">-->
          <!--<span class="absolute-span">金额</span>-->
          <!--<input type="number" placeholder="请输入充值金额" >-->
        <!--</div>-->
        <button class="submit disabled" disabled>未绑定银行卡</button>
      </template>
    </div>
    <MyIframe :onHref="onHref" v-if="this.$store.state.iframeIf"></MyIframe>
    <bottomBar :on="on"></bottomBar>
  </div>
</template>
<script>
  import { Toast,Indicator } from 'mint-ui';
  import bottomBar from '../common/bottomBar.vue'
  import {allBankImg} from '../../common/bank.js'
  import checkout from '../../common/checkout';
  import MyIframe from '../common/iframeDiv.vue'
  export default({
    name:"recharge",
    data(){
      return {
        on:"index",               //传值给bottomBar确定是哪个处于on状态
        Img:allBankImg.bank,            //银行图标存放处
        imgSrc:null,                   //展示图片的存放处
        bankInfo:"",                    //主数据存放处
        money:"",                       //充值钱存放处
        onHref:""                     //链接存放处
      }
    },
    mounted(){
      this.$main.checkLogin(this.getInfo);
    },
    methods:{
      getInfo(){
        var that = this;
        this.$http({
          method: 'post',
          url: that.api.getMoneyBank
        }).then(function (response) {
          if (response.data.r == 1) {
            if (response.data.bankcode) {
              that.bankInfo = response.data;
              for (var i = 0 ,$length = that.Img.length ; i < $length ; i ++){
                if (response.data.bankcode = that.Img[i].rr_bank_code){
                  that.imgSrc = that.Img[i].img
                }
              }
            }else{
              that.bankInfo = null;
                that.$alert("未绑定银行卡!");
            }
          } else {
            that.$alert("出错啦!");
          }
        }).catch(function (response) {
          that.$loading.close();
          console.log(response);
        });
      },
      quickRecharge(){
        var that = this;
        var test = new checkout.InputValidators();
        test.importStrategies(checkout.validationStrategies);
        test.addValidator('minLength:1','请输入充值金额',that.money);
        var result = test.check();
        if(result){
          Toast(result.errMsg);
          return false;
        }
        this.$http({
          method: 'post',
          data:that.$qs.stringify({
            amount:that.money
          }),
          url: that.api.quickRecharge
        }).then(function (response) {
          if (response.data.r == 1 && response.data.gohref){
            that.onHref = response.data.gohref;
            that.$store.state.iframeIf = true;
          }else{
            that.$alert(response.data.msg||"出错啦!");
          }
        }).catch(function (response) {
          that.$loading.close();
          console.log(response);
        });
      }
    },
    components: {
      bottomBar,
      MyIframe
    }
  })
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import url(../../assets/less/common.less);
  .main-warp{
    .main-center-top{
      position: relative;
      width: 95%;
      padding-left: 5%;
      height: 120/@r;
      padding-top: 40/@r;
      background: #ffffff;
      img{
        position: absolute;
        width: 90/@r;
        height: 90/@r;
        display: block;
      }
      .right-div{
        width: 82%;
        height: 120/@r;
        float: right;
        p{
          margin-top: .3rem;
          font-size: .66rem;
          color: #cccccc;
        }
        .total-p{
          font-size: .7rem;
          color: #545454;
        }
      }
    }
    .p-div{
      width: 95%;
      padding-left: 5%;
      height: 70/@r;
      line-height: 70/@r;
      font-size: .7rem;
      color: #808080;
    }
    .input-div{
      position: relative;
      width: 100%;
      height: 100/@r;
      margin-bottom: 120/@r;
      background: #ffffff;
      .absolute-span{
        position: absolute;
        font-size: .75rem;
        top:36/@r;
        left: 5%;
        color: #545454;
      }
      input{
        width: 80%;
        height: 100/@r;
        padding-left: 20%;
        font-size: .75rem;
        color: #cccccc;
      }
    }
    .submit{
      display: block;
      width:70%;
      height: 90/@r;
      margin:60/@r auto 30/@r auto;
      border-radius: 20px;
      color: #ffffff;
      letter-spacing: 3px;
      font-size: .75rem;
      background: #5aa0ff;
    }
    .disabled{
      background: #9E9E9E;
    }
    .submit:active{
      background: #4481ff;
    }
  }

</style>
