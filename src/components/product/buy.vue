<template>
  <div>
    <div class="main-warp">
      <template v-if="information">
        <div class="p-div">
          <p>账户可用余额:{{information.binfo.MeBalance}} 元</p>
          <p>标的可投余额:{{information.binfo.borrow_account_wait}} 元</p>
        </div>
        <template>
          <div class="input-div">
            <span>投标金额</span>
            <input type="number" placeholder="请输入投标金额" v-model="buyInfo.money" @blur="getRedEnvelopes()">
          </div>
        </template>
        <div class="input-div" v-if="buyInfo.isPwd">
          <span>密码</span>
          <input type="password" placeholder="请输入投标密码" v-model="buyInfo.pwd">
        </div>
        <template v-if="redEnvelopes.redMoney">
          <div class="input-div custom-select">
            <span>红包</span>
            <select v-model="buyInfo.hbId">
              <option value="-1">不使用红包</option>
              <option v-for="item in redEnvelopes.redMoney" :value="item.hbid">{{item.money}}元</option>
            </select>
          </div>
        </template>
        <template v-if="redEnvelopes.jiaXi">
          <div class="input-div custom-select">
            <span>加息券</span>
            <select v-model="buyInfo.jxId">
              <option value="-1">不使用加息券</option>
              <option v-for="item in redEnvelopes.jiaXi" :value="item.hbid">{{item.money}}%</option>
            </select>
          </div>
        </template>

        <button @click="buyProduct()">立即购买</button>
      </template>
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
    name: "Buy",
    data(){
      return {
        on: "money",             //传值给bottomBar确定是哪个处于on状态
        onHref: "",              //跳转的链接
        information: "",           //获取的数据存放处
        buyInfo: {                 //投标相关
          money: "",               //投标金额
          pwd: "",                 //密码标的密码存放处
          isPwd: false,             //是否密码标
          hbId: -1,                  //红包id存放处
          jxId: -1                   //加息券id存放处
        },
        redEnvelopes: {              //获取红包加息券列表
          isGetRed: false,             //是否获取红包数据
          redMoney: null,           //红包列表存放处
          jiaXi: null              //加息券列表存放处
        },
      }
    },
    mounted(){
      this.getInfo(this.$route.query.id);
    },
    methods: {
      getInfo(id){
        var that = this;
        this.$http({
          method: 'post',
          url: that.api.productDetail,
          data: that.$qs.stringify({
            bid: id
          })
        }).then(function (response) {
          if (response.data.r == 1) {
            that.information = response.data;
            //判断是否是密码标
            if (typeof response.data.binfo.ispassword != "undefined" && response.data.binfo.ispassword * 1 == 1) {
              that.buyInfo.isPwd = true;
            }
          } else {
            this.$alert("数据有误");
          }
        }).catch(function (response) {
          console.log(response);
        });
      },
      getRedEnvelopes(){
        var that = this;
        that.redEnvelopes.isGetRed = true;
        //获取可用红包
        this.$http({
          method: 'post',
          url: that.api.getCanTenderHongBao,
          data: that.$qs.stringify({
            bid: this.$route.query.id,
            account: that.buyInfo.money
          })
        }).then(function (response) {
          if (response.data.data) {
            that.redEnvelopes.redMoney = response.data.data;
          } else {
            this.$alert("红包获取有误");
          }
        }).catch(function (response) {
          console.log(response);
        });
        //获取可用加息券
        this.$http({
          method: 'post',
          url: that.api.getCanTenderJiaXi,
          data: that.$qs.stringify({
            bid: this.$route.query.id,
            account: that.buyInfo.money
          })
        }).then(function (response) {
          if (response.data.data) {
            that.redEnvelopes.jiaXi = response.data.data;
          } else {
            this.$alert("加息券获取有误");
          }
        }).catch(function (response) {
          console.log(response);
        });
      },
      //购买
      buyProduct(){
        var that = this;
        if (that.redEnvelopes.isGetRed == true) {
          var test = new checkout.InputValidators();
          test.importStrategies(checkout.validationStrategies);
          test.addValidator('minLength:1', '请输入投标金额', that.buyInfo.money);
          if (that.buyInfo.isPwd) {
            test.addValidator('minLength:1', '请输入投标密码', that.buyInfo.pwd);
          }
          var result = test.check();
          if (result) {
            Toast(result.errMsg);
            return false;
          }
          var data = {};
          data.bid = that.$route.query.id;
          data.amount = that.buyInfo.money;
          data.way = "WAP";
          if (that.buyInfo.isPwd){
            data.mima = that.buyInfo.pwd
          }
          if (that.buyInfo.jxId > -1) {
            data.jxid = that.buyInfo.jxId
          }
          if (that.buyInfo.hbId > -1) {
            data.hbid = that.buyInfo.hbId
          }
          that.$http({
            method: 'post',
            url: that.api.webTender,
            data: that.$qs.stringify(data)
          }).then(function (response) {
            if (response.data.r == 1 && response.data.gohref) {
              that.onHref = response.data.gohref;
              that.$store.state.iframeIf = true;
            } else {
              Toast(response.data.msg || "出错啦!");
              if (response.data.msg.indexOf("还未参与风险评测") != -1) {
                setTimeout(function () {
                  that.$router.push({
                    name: 'Assessment',
                  })
                }, 2000)
              }
            }
          }).catch(function (response) {
            console.log(response);
          });
        }else{
          Toast("暂未获取红包数据!")
        }
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

  .main-warp {
    .p-div {
      width: 92%;
      height: 2.4rem;
      margin: 1rem auto .5rem auto;
      color: #797e86;
      font-size: .75rem;
      letter-spacing: 1px;
      p {
        line-height: 1.2rem;
      }
    }
    .input-div {
      position: relative;
      width: 92%;
      height: 2.5rem;
      margin: .6rem auto;
      background: #fff;
      border: 1px solid #d4d4d4;
      span {
        position: absolute;
        font-size: .8rem;
        line-height: 2.5rem;
        left: 2%;
      }
      input {
        font-size: .8rem;
        width: 76%;
        padding-left: 24%;
        height: 2.4rem;
        background: #ffffff;
      }
    }
    .input-div:active {
      border: 1px solid red;
    }
    .custom-select {
      select {
        font-size: .8rem;
        width: 76%;
        margin-left: 24%;
        height: 2.4rem;
        background: #ffffff;
        appearance: none;
        -webkit-appearance: none;
      }
    }
    .custom-select::after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      top: 50%;
      right: 12px;
      margin-top: -5px;
      border: 8px solid #929497;
      border-width: 10px 8px;
      border-color: #929497 transparent transparent;
      z-index: 2;
      pointer-events: none;
    }
    button {
      display: block;
      width: 92%;
      height: 2.2rem;
      font-size: .8rem;
      margin: 1rem auto;
      border-radius: 5px;
      color: red;
      background: #ffffff;
      border: 1px solid red;
    }
    button:active {
      background: #f78f8d;
      color: #fff;
    }
  }
</style>
