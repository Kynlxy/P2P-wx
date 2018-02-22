<!--主页-->
<template>
  <div>
    <div class="main-warp">
      <div class="banner-div">
        <p class="total-p">总资产</p>
        <p><img src="../../assets/images/shield.png" alt="">风控管理,安全保障</p>
        <p class="second-p" v-cloak>{{this.$main.priceFormat(money.totalMoney)}}</p>
      </div>
      <div class="button-div">
        <div >
          <router-link to="/Withdrawals">
            <button class="left-button">
                提现
            </button>
          </router-link>
        </div>
        <div >
          <router-link to="/Recharge">
            <button class="right-button">
              充值
            </button>
          </router-link>
        </div>
      </div>
      <template>
        <div class="main-center">
          <div class="main-center-div">
            <ul>
              <li class="left-li top-li">
                <img class="index-icon" src="../../assets/images/index1.png" alt="">
                <div class="right-div">
                  <p class="total-p">待收总额</p>
                  <p>{{this.$main.priceFormat(money.waitMoney)}}</p>
                </div>
              </li>
              <li class="right-li top-li">
                <img class="index-icon" src="../../assets/images/index2.png" alt="">
                <div class="right-div">
                  <p class="total-p">待收利息</p>
                  <p>{{this.$main.priceFormat(money.waitInterest)}}</p>
                </div>
              </li>
              <li class="left-li">
                <img class="index-icon" src="../../assets/images/index3.png" alt="">
                <div class="right-div">
                  <p class="total-p">可用余额</p>
                  <p>{{this.$main.priceFormat(money.canUseMoney)}}</p>
                </div>
              </li>
              <li class="right-li">
                <img class="index-icon" src="../../assets/images/index4.png" alt="">
                <div class="right-div">
                  <p class="total-p">已收利息</p>
                  <p>{{this.$main.priceFormat(money.receivedInterest)}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </template>
    </div>
    <bottomBar :on="on"></bottomBar>
    <!--<MyIframe :onHref="onHref"></MyIframe>-->
  </div>
</template>
<script>
  import { Toast,Indicator } from 'mint-ui';
  import bottomBar from '../common/bottomBar.vue'
//  import MyIframe from '../common/iframeDiv.vue'
  export default({
    name:"index",
    data(){
      return{
        money:{                 //首页money相关
          totalMoney:"",         //首页总金额money
          canUseMoney:"",          //首页可用余额
          waitMoney:"",            //待收总额
          receivedInterest:"",      // 已收利息
          waitInterest:""           //待收利息
        },
        on:"index",             //传值给bottomBar确定是哪个处于on状态
      }
    },
    mounted(){
      this.$main.checkLogin(this.getInfo);
    },
    methods:{
      getInfo(){
        var that = this;
        this.$http({
          method:'post',
          url:that.api.ucenter,
        }).then(function (response) {
          if (response.data.r == 1){
            that.$store.state.myInfo = response.data._ME;
            //首页可用余额
            that.money.canUseMoney = parseFloat(response.data.account_detail.buketi) + parseFloat(response.data.account_detail.keti);
            // 账户资产总额：                          待收本金利息 + 提现冻结 + 投资冻结 + 可用余额(不可提现+可提现)
            that.money.totalMoney = parseFloat(response.data.tj.v_twait_benjinlixi) + parseFloat(response.data.account_detail.freeze) + parseFloat(response.data.account_detail.freeze_touzi) + that.money.canUseMoney;
            //待收总额
            that.money.waitMoney = parseFloat(response.data.tj.v_twait_benjinlixi);
            //已收利息
            that.money.receivedInterest = parseFloat(response.data.tj.v_tcur_lixi);
            //未收利息
            that.money.waitInterest = parseFloat(response.data.tj.v_twait_lixi);

          }else{
            that.$alert("出错啦!")
          }
        }).catch(function (response) {
          console.log(response);
        });
      }
    },
    components: {
      bottomBar
    },
  })

</script>

<style scoped lang="less" rel="stylesheet/less">
  @import url(../../assets/less/common.less);
  .main-warp{
    .banner-div{
      width: 100%;
      height: 285/@r;
      padding-top: 100/@r;
      background: url(../../assets/images/indexBanner.png) no-repeat center;
      background-size: cover;
      text-align: center;
      color: @ff;
      font-size: .6rem;
      p{
        margin-bottom: 40/@r;
        text-shadow: 1px 3px 3px #080808;
        img{
          width: 25/@r;
          height: 30/@r;
          margin-right: 10/@r;
        }
      }
      .total-p{
        font-size: .7rem;
      }
      .second-p{
        margin-top: 30/@r;
        font-size: 1rem;
      }
    }
    .button-div{
      width: 100%;
      height: 103/@r;
      padding-top: 17/@r;
      background: @ff;
      div{
        width: 50%;
        float: left;
        button{
          display: block;
          width:95%;
          height: 85/@r;
          margin: 0 auto;
          background: #ffffff;
          font-size: .8rem;
          letter-spacing: 5px;
          border-radius: 5px;
        }
        .left-button{
          border: 1px solid #503214;
          color: #503214;
        }
        .right-button{
          color: #91bcff;
          border: 1px solid #91bcff;
        }
      }
    }
    .main-center{
      margin-top: 24/@r;
      width: 100%;
      height: 240/@r;
      padding-top: 20/@r;
      padding-bottom: 20/@r;

      background: @ff;
      .main-center-div{
        width: 89%;
        height: 240/@r;
        margin:  0 auto;
        ul{
          overflow: hidden;
          li{
            position: relative;
            float: left;
            width: 49%;
            height: 109/@r;
            padding-top: 10/@r;
            .index-icon{
              position: absolute;
              left: 1rem;
              top:.75rem;
              width: 47/@r;
              height: 48/@r;
            }
            .right-div{
              width: 66%;
              float: right;
              p{
                margin-top: .3rem;
                font-size: .7rem;
              }
              .total-p{
                color: #7a7979;
              }
            }

          }
          .left-li{
            border-right:1px solid #eeeeee;
          }
          .top-li{
            border-bottom: 1px solid #eeeeee;
          }
        }

      }
    }
  }

</style>
