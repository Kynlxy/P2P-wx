<!--银行卡-->
<template>
  <div>
    <div class="main-warp">
      <template v-if="bankInfo">
        <div class="bank-show">
          <img :src="imgSrc" alt="">
          <p class="center-p">{{bankInfo.bankname}}</p>
          <span class="absolute-p">{{bankInfo.mobile}}</span>
          <ul class="bottom-ul">
            <li>{{bankInfo.account.substring(0,4)}}</li>
            <li>****</li>
            <li>****</li>
            <li>{{bankInfo.account.substring(bankInfo.account.length -4, bankInfo.account.length)}}</li>
          </ul>
          <span class="change" @click="relieve()">解绑银行卡</span>
        </div>
      </template>
      <template v-else>
        <div class="add-bank" @click="getBank()">
          <img src="../../assets/images/addBank.png" alt="">
        </div>
      </template>
    </div>
    <bottomBar :on="on"></bottomBar>
    <MyIframe :onHref="onHref" v-if="this.$store.state.iframeIf"></MyIframe>
  </div>
</template>
<script>
  import checkout from '../../common/checkout';
  import {allBankImg} from '../../common/bank.js'
  import { Toast,Indicator,MessageBox } from 'mint-ui';
  import bottomBar from '../common/bottomBar.vue'
  import MyIframe from '../common/iframeDiv.vue'
  export default({
    name:"Bank",
    data(){
      return {
        on: "my",                     //传值给bottomBar确定是哪个处于on状态
        bankInfo:"",                  //主信息存放处
        Img:allBankImg.bank,            //银行图标存放处
        imgSrc:null,                    //用户目前银行卡图片链接存放处
        clearInfo:{                   //轮询相关
          num:0,                      // 轮询次数
          clear:null,                 //轮询开关
          isBegin:false                //轮询是否开始
        },
        onHref:""                     //链接存放处
      }
    },
    mounted(){
      this.getBankInfo()
    },
    methods:{
      getBankInfo(){
        var that = this;
        this.$http({
          method: 'post',
          url: that.api.getMyBank
        }).then(function (response) {
          if (response.data.r == 1) {
            if (response.data.data.account){
              that.bankIf = 1;
              for (var i = 0 ,$length = that.Img.length ; i < $length ; i ++){
                if (response.data.data.bank = that.Img[i].rr_bank_code){
                  that.imgSrc = that.Img[i].img
                }
              }
              that.bankInfo = response.data.data;
              that.bankList = response.data.bank;
            }
          } else {

          }
        }).catch(function (response) {
          that.$loading.close();
          console.log(response);
        });
      },
      relieve(){
        MessageBox.confirm('确定解绑银行卡?').then(() => {
          this.$http({
            method: 'post',
            url: this.api.apiUnBindCard,
            data:this.$qs.stringify({
              bankId:this.bankInfo.bankId,
              way:"WAP"
            })
          }).then(response => {
            if (response.data.r == 1 ){
              this.bankInfo = null;
            }else{
              Toast(response.data.msg || "出错啦");
            }

          }).catch(function (response) {
            console.log(response);
          });
        });

      },
      getBank(){
        var that = this;
        this.$http({
          method: 'post',
          url: this.api.getBank3,
          data:this.$qs.stringify({
            way:"WAP"
          })
        }).then(function (response) {
          if (response.data.r == 1 && response.data.gohref){
            that.onHref = response.data.gohref;
            that.$store.state.iframeIf = true;
            //轮询就开启一次
            if (that.clearInfo.isBegin == false){
              that.clearInfo.isBegin = true;
              that.setTimeoutFunction();
            }
          }else{
            Toast(response.data.msg || "出错啦");
          }

        }).catch(function (response) {
          console.log(response);
        });
      },
      //轮询检查是否绑卡成功
      setTimeoutFunction(){
        var that = this;
        that.$http({
          method:'post',
          url:that.api.getMyBank
        }).then(function (response) {
          if(that.clearInfo.num <= 200 ){
            if (response.data.r == 1) {
              if (response.data.data.account){
                that.bankIf = 1;
                for (var i = 0 ,$length = that.Img.length ; i < $length ; i ++){
                  if (response.data.data.bank = that.Img[i].rr_bank_code){
                    that.imgSrc = that.Img[i].img
                  }
                }
                that.bankInfo = response.data.data;
                that.bankList = response.data.bank;
              }
            }else{
              that.clearInfo.clear = setTimeout(function () {
                that.clearInfo.num++;
                that.setTimeoutFunction();
              }, 3000)
            }
          }
        }).catch(function (response) {
          console.log(response);
        });

      }
    },
    components:{
      bottomBar,
      MyIframe
    }
  })
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import url(../../assets/less/common.less);
  .main-warp{
    padding-top: 45/@r;
    .add-bank{
      width: 92%;
      height: 220/@r;
      margin: 0 auto;
      cursor: pointer;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .bank-show{
      position: relative;
      width: 84%;
      height: 220/@r;
      padding: 60/@r 4% 0 4%;
      margin: 0 auto;
      background: url(../../assets/images/bankBg.png) no-repeat center;
      background-size: cover;
      border-radius: 5px;
      color: #ffffff;
      .change{
        float: right;
        font-size: .8rem;
        color: #f74545;
        margin-top: 80/@r;
        cursor: pointer;
      }
      .center-p{
        margin-top: 28/@r;
        margin-left: 18%;
        font-size: .7rem;
      }
      .absolute-p{
        position: absolute;
        right: 4%;
        top: 52/@r;
        font-size: .65rem;
        letter-spacing: 1px;
      }
      .bottom-ul{
        overflow: hidden;
        margin-top: 40/@r;
        width: 100%;
        li{
          width: 25%;
          float: left;
          height: 80/@r;
          line-height: 120/@r;
          text-align: center;
          font-size: .8rem;
          letter-spacing: 2px;
        }
      }
      img{
        position: absolute;
        width: 90/@r;
        height: 90/@r;
        display: block;
      }
    }
    .change-bank{
      color: #666666;
      .title-p{
        margin: 20/@r auto 40/@r auto;
        font-size: .75rem;
        text-align: center;
      }
      .input-div{
        position: relative;
        width: 90%;
        height: 100/@r;
        margin: 30/@r auto ;
        line-height: 48px;
        border: 1px solid #e6e6e6;
        background: #ffffff;
        .absolute-p{
          position: absolute;
          left: 2%;
          font-size: .75rem;
        }
        select{
          width: 100%;
          padding-left: 25%;
          margin: 0;
          height: 100/@r;
          background: none;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
          color: #797e86;
          font-size: .75rem;
        }
        input{
          width: 75%;
          padding-left: 25%;
          margin: 0;
          height: 100/@r;
          background: none;
          outline: none;
          color: #797e86;
          font-size: .75rem;
        }
      }
      .submit-change{
        width: 40%;
        height: 75/@r;
        margin: 0 auto;
        display: block;
        background: #03A9F4;
        color: #fff;
        font-size: .75rem;
        border-radius: 5px;
        cursor: pointer;
      }
    }
    .getBank{
      width: 40%;
      height: 75/@r;
      margin: 0 auto;
      display: block;
      background: #03A9F4;
      color: #fff;
      font-size: .75rem;
      border-radius: 5px;
      cursor: pointer;
    }
  }

</style>
