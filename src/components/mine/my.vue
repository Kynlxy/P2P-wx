<!--我的-->
<template>
  <div>
    <div class="main-warp">
      <div class="banner-div">

        <img src="../../assets/images/head.png" alt="" v-if="!userInfo.headImg">
        <div id="headId" v-html="userInfo.headImg" v-else></div>
        <!--<img :src="headImg" alt="" v-else>-->
        <p v-cloak>{{userInfo.phone}}</p>
        <p>已认证</p>
      </div>
      <router-link to="/SafeCenter">
        <div class="first-div">
          <img class="index-icon" src="../../assets/images/my1.png" alt="">
          <p>安全中心</p>
          <img class="right-img" src="../../assets/images/allowDown.png" alt="">
        </div>
      </router-link>
      <div class="main-center">
        <div class="main-center-div">
          <ul>
            <router-link to="/AutomaticBid">
              <li class="left-li top-li">
                <img class="index-icon" src="../../assets/images/my2.png" alt="">
                <p>自动投标设置</p>
                <img class="right-img" src="../../assets/images/allowDown.png" alt="">
              </li>
            </router-link>
            <router-link to="/DispersedInvestmentRecords">
              <li class="right-li top-li">
                <img class="index-icon" src="../../assets/images/my3.png" alt="">
                <p>散标投资记录</p>
                <img class="right-img" src="../../assets/images/allowDown.png" alt="">
              </li>
            </router-link>

            <router-link to="/BondInvestmentManagement">
              <li class="left-li">
                <img class="index-icon" src="../../assets/images/my4.png" alt="">
                <p>债权投资记录</p>
                <img class="right-img" src="../../assets/images/allowDown.png" alt="">
              </li>
            </router-link>
            <router-link to="/Bank">
              <li class="right-li">
                <img class="index-icon" src="../../assets/images/my5.png" alt="">
                <p>我的银行卡</p>
                <img class="right-img" src="../../assets/images/allowDown.png" alt="">
              </li>
            </router-link>
          </ul>
        </div>
      </div>
      <div class="main-center">
        <div class="main-center-div">
          <ul>

            <router-link to="/Receivables">
              <li class="left-li top-li">
                <img class="index-icon" src="../../assets/images/my6.png" alt="">
                <p>收款明细</p>
                <img class="right-img" src="../../assets/images/allowDown.png" alt="">
              </li>
            </router-link>
            <router-link to="/RechargeRecord">
              <li class="right-li top-li">
                <img class="index-icon" src="../../assets/images/my7.png" alt="">
                <p>充值记录</p>
                <img class="right-img" src="../../assets/images/allowDown.png" alt="">
              </li>
            </router-link>
            <router-link to="/PresentRecord">
              <li class="left-li">
                <img class="index-icon" src="../../assets/images/my8.png" alt="">
                <p>提现记录</p>
                <img class="right-img" src="../../assets/images/allowDown.png" alt="">
              </li>
            </router-link>

            <router-link to="/RedEnvelopes">
              <li class="right-li">
                <img class="index-icon" src="../../assets/images/my9.png" alt="">
                <p>我的红包</p>
                <img class="right-img" src="../../assets/images/allowDown.png" alt="">
              </li>
            </router-link>
          </ul>
        </div>
      </div>
      <div class="main-center" id="last">
        <div class="main-center-div">
          <ul>
            <li class="left-li top-li">
              <img class="index-icon" src="../../assets/images/my10.png" alt="">
              <p>邀请好友</p>
              <img class="right-img" src="../../assets/images/allowDown.png" alt="">
            </li>
            <router-link to="/AboutUs">
              <li class="right-li top-li">
                <img class="index-icon" src="../../assets/images/my11.png" alt="">
                <p>关于我们</p>
                <img class="right-img" src="../../assets/images/allowDown.png" alt="">
              </li>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
    <bottomBar :on="on"></bottomBar>
  </div>
</template>
<script>
  import {Toast, Indicator} from 'mint-ui';
  import bottomBar from '../common/bottomBar.vue'
  export default({
    name: "my",
    data(){
      return {
        on: "my",             //传值给bottomBar确定是哪个处于on状态
        userInfo: {
          headImg: "1",          //初始头像存放处
          phone: ""       //手机号码存放处

        }
      }
    },
    mounted(){
      this.$main.checkLogin(this.getInfo);
    },
    methods: {
      getInfo(){
        var that = this;
        this.$http({
          method: 'post',
          url: that.api.getPhoto,
        }).then(function (response) {
          that.userInfo.phone = response.data._ME.hmobile;
          if (response.data.showphoto) {
            that.userInfo.headImg = response.data.showphoto;
          } else {
            that.userInfo.headImg = "";
          }
        }).catch(function (response) {
          that.userInfo.headImg = "";
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

  @5: #5e5e5e;
  .main-warp {
    #last {
      height: 2.2rem;
      overflow: hidden;
    }
    .banner-div {
      width: 100%;
      height: 320/@r;
      padding-top: 65/@r;
      background: url(../../assets/images/indexBanner.png) no-repeat center;
      background-size: cover;
      text-align: center;
      color: @ff;
      #headId {
        width: 170/@r;
        height: 170/@r;
        display: block;
        margin: 0 auto;
        border-radius: 50%;
      }
      img {
        width: 170/@r;
        height: 170/@r;
        display: block;
        margin: 0 auto;
        border-radius: 50%;
      }
      p {
        font-size: .65rem;
        color: @ff;
        margin-top: .5rem;
      }
    }
    .first-div {
      position: relative;
      width: 95%;
      padding-left: 5%;
      height: 55/@r;
      line-height: 32/@r;
      padding-top: 25/@r;
      background: #ffffff;
      .right-img {
        position: absolute;
        width: .4rem;
        height: .8rem;
        right: 10%;
        top: .6rem;
      }
      p {
        margin-left: 15%;
        font-size: .65rem;
        color: @5;
      }
      .index-icon {
        position: absolute;
        left: 9%;
        top: .45rem;
        width: 45/@r;
        height: 47/@r;
      }

    }
    .main-center {
      margin-top: 24/@r;
      width: 100%;
      height: 200/@r;
      padding-bottom: 20/@r;

      background: @ff;
      .main-center-div {
        width: 89%;
        height: 200/@r;
        margin: 0 auto;
        ul {
          overflow: hidden;
          li {
            position: relative;
            float: left;
            width: 49%;
            height: 99/@r;
            padding-top: 10/@r;
            cursor: pointer;
            .right-img {
              position: absolute;
              width: .4rem;
              height: .8rem;
              right: 6%;
              top: .95rem;
            }
            .index-icon {
              position: absolute;
              left: 8%;
              top: .75rem;
              width: 47/@r;
              height: 48/@r;
            }
            p {
              margin-top: .8rem;
              margin-left: 32%;
              font-size: .65rem;
              color: @5;
            }

          }
          .left-li {
            border-right: 1px solid #eeeeee;
          }
          .top-li {
            border-bottom: 1px solid #eeeeee;
          }
        }

      }
    }
  }

</style>
