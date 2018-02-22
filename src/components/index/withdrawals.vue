<!--提现页面-->
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
        <div class="input-div">
          <p>提现金额(元)</p>
          <input type="number" placeholder="请输入提现金额" v-model="getMsg.money">
        </div>
        <p class="last-p">可提余额: {{bankInfo.data.ky_account}}元 <span class="red-span" @click="allGet()">全部提现</span></p>
        <p class="last-p margin-top-p">实际到账:
          <span class="blue-span" v-if="getMsg.money > 2">{{getMsg.money - 2}}元</span>
          <span class="blue-span" v-else>0.00元</span>
        </p>
        <p class="last-p">充值未投资现金提现按照提现金额的<span class="blue-span">千分之2.5</span>收取费用</p>
        <button class="submit" @click="getMoney()">提现</button>
      </template>
      <template v-else-if="bankInfo == null">
        <div class="input-div">
          <p>提现金额(元)</p>
          <input type="number" placeholder="请输入提现金额">
        </div>
        <p class="last-p">可提余额: 0元 <span class="red-span">全部提现</span></p>
        <p class="last-p margin-top-p">实际到账:
          <span class="blue-span" >0.00元</span>
        </p>
        <p class="last-p">充值未投资现金提现按照提现金额的<span class="blue-span">千分之2.5</span>收取费用</p>
        <button class="submit disabled" disabled>未绑定银行卡</button>
      </template>
    </div>
    <bottomBar :on="on"></bottomBar>
    <MyIframe :onHref="onHref" v-if="this.$store.state.iframeIf"></MyIframe>
  </div>
</template>
<script>
  import { Toast,Indicator } from 'mint-ui';
  import bottomBar from '../common/bottomBar.vue'
  import MyIframe from '../common/iframeDiv.vue'
  import checkout from '../../common/checkout';
  import {allBankImg} from '../../common/bank.js'

  export default({
    name:"withdrawals",
    data(){
      return {
        on:"index",             //传值给bottomBar确定是哪个处于on状态
        Img:allBankImg.bank,            //银行图标存放处
        imgSrc:null,                   //展示图片的存放处
        bankInfo:"",
        getMsg:{
          money:"",
        },
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
            if (response.data.bankcode){
              that.bankInfo = response.data;
              for (var i = 0 ,$length = that.Img.length ; i < $length ; i ++){
                if (response.data.bankcode = that.Img[i].rr_bank_code){
                  that.imgSrc = that.Img[i].img
                }
              }
            }else{
              that.$alert("未绑定银行卡!");
              that.bankInfo = null;
            }
          } else {
            that.$alert("出错啦!");
          }
        }).catch(function (response) {
          that.$loading.close();
          console.log(response);
        });
      },
      allGet(){
        this.getMsg.money = this.bankInfo.data.ky_account;
      },
      getMoney(){
        var that = this;
        var test = new checkout.InputValidators();
        test.importStrategies(checkout.validationStrategies);
        test.addValidator('minLength:1','请输入提现金额',that.getMsg.money);
        test.addValidator('isCompare','提现金额不得大于可提金额',that.getMsg.money - that.bankInfo.data.ky_account);
        test.addValidator('isCompare','提现金额不得小于100元',100 - that.getMsg.money);
        var result = test.check();
        if(result){
          Toast(result.errMsg);
          return false;
        }
        this.$http({
          method: 'post',
          data:that.$qs.stringify({
            amount:that.getMsg.money,
            way:"WAP"
          }),
          url: that.api.withdrawals
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
    .last-p{
      padding-left: 5%;
      margin-top: 20/@r;
      font-size: .65rem;
      color: #808080;
      .red-span{
        color: #ef8a4e;
        cursor: pointer;
      }
      .blue-span{
        color: #5aa0ff;
      }
    }
    .margin-top-p{
      margin-top: 1rem;
    }
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
      width: 95%;
      padding-left: 5%;
      padding-top: 30/@r;
      height: 180/@r;
      margin-top: 20/@r;
      background: #ffffff;
      p{
        font-size: .65rem;
      }
      input{
        width: 100%;
        height: 130/@r;
        font-size: 1.3rem;
        color: #cfcfcf;
      }
    }
    .code-div{
      position: relative;
      width: 100%;
      height: 100/@r;
      background: #ffffff;
      margin-top: 30/@r;
      input{
        width: 60%;
        padding-left: 5%;
        padding-right: 30%;
        height: 100/@r;
        line-height: 100/@r;
        font-size: .8rem;
        color: #666666;
      }
      img{
        position: absolute;
        right:5%;
        top:0;
        width: 30%;
        height: 100/@r;
        cursor: pointer;
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
