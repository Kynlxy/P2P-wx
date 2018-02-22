<!--安全中心-->
<template>
  <div>
    <div class="main-warp">
      <div class="top-div">
        <div class="input-div border-bottom">
          <span class="left-span">手机号码</span>
          <span class="right-span" v-cloak>{{mobile}}</span>
        </div>
        <div class="input-div border-bottom">
          <template v-if="!show.testShowIf">
            <router-link to="/Assessment">
              <span class="left-span">风险评测</span>
              <span class="right-span">去设置 <img src="../../assets/images/allowDown.png" alt=""></span>
            </router-link>
          </template>
          <template v-else>
            <span class="left-span">风险评测</span>
            <span class="right-span ">
            <span v-if="show.testLevel == 1">稳健型</span>
            <span v-else-if="show.testLevel == 2">平衡型</span>
            <span v-else-if="show.testLevel == 3">成长型</span>
            <span v-else>进取型</span>
          </span>
          </template>

        </div>
        <router-link to="/DepositoryManage">
          <div class="input-div border-bottom">
            <span class="left-span">存管开户</span>
            <span class="right-span" v-if="!show.depositoryIf">去开户 <img src="../../assets/images/allowDown.png" alt=""></span>
            <span class="right-span blue" v-else>已开户 <img src="../../assets/images/allowDown.png" alt=""></span>
          </div>
        </router-link>
        <router-link to="/ChangePwd">
          <div class="input-div border-bottom">
            <span class="left-span">登录密码</span>
            <span class="right-span blue">去修改 <img src="../../assets/images/allowDown.png" alt=""></span>
          </div>
        </router-link>
        <div class="input-div border-bottom">
          <span class="left-span">交易密码</span>
          <span class="right-span blue" @click="changeTransactionPwd()">去修改 <img src="../../assets/images/allowDown.png"
                                                                                 alt=""></span>
        </div>
        <router-link to="/Bank">
          <div class="input-div">
            <span class="left-span">银行卡信息</span>
            <span class="right-span" v-if="!show.bankShowIf">去设置 <img src="../../assets/images/allowDown.png"
                                                                      alt=""></span>
            <span class="right-span blue" v-else>已设置 <img src="../../assets/images/allowDown.png" alt=""></span>
          </div>
        </router-link>

      </div>
      <button class="last-button" @click="goModel()">安全退出</button>

    </div>
    <bottomBar :on="on"></bottomBar>
    <MyIframe :onHref="onHref" v-if="this.$store.state.iframeIf"></MyIframe>
    <mt-actionsheet
      :actions="actions"
      v-model="showIf">
    </mt-actionsheet>
  </div>

</template>
<script>
  import {Toast, Indicator, MessageBox} from 'mint-ui';
  import {Actionsheet} from 'mint-ui';
  import Vue from 'vue'
  import MyIframe from '../common/iframeDiv.vue'
  Vue.component(Actionsheet.name, Actionsheet);
  import bottomBar from '../common/bottomBar.vue'
  export default({
    name: "SafeCenter",
    data(){
      return {
        on: "my",             //传值给bottomBar确定是哪个处于on状态
        showIf: false,
        actions: [{
          name: "退出登录",
          method: this.layout
        }],
        show: {                //显示相关判断是否修改设置过
          testShowIf: false,     //风险评测是否设置过
          bankShowIf: false,    //银行卡是否设置过
          depositoryIf: false,  //存管是否开通
          testLevel: 0          //风险评测级别
        },
        mobile: "",            //手机号
        onHref: ""             //iframe打开的链接
      }
    },
    mounted(){
      this.getInfo();
    },
    methods: {
      //获取数据
      getInfo(){
        var that = this;
        this.$http({
          method: 'post',
          url: that.api.centerInfo,
        }).then(function (response) {
          that.$loading.close();
          if (response.data.r == 1) {
            if (response.data.mobile && response.data.mobile.flag * 1 == 1) {
              that.mobile = response.data.mobile.mobile;
            }
            if (response.data._ME && response.data._ME.assessment > 0) {
              that.show.testShowIf = true;
              that.show.testLevel = response.data._ME.assessment;
            }
            if (response.data.acc && response.data.acc.flag * 1 == 1) {
              that.show.depositoryIf = true;
            }
            if (response.data.bak && response.data.bak.flag * 1 == 1) {
              that.show.bankShowIf = true;
            }

          } else {
            that.$alert("出错啦!")
          }
        }).catch(function (response) {
          that.$loading.close();
          console.log(response);
        });
      },
      layout(){
        var that = this;
        that.$loading.open("退出中...");
        this.$http.get(that.api.layOut).then(function (response) {
        }).catch(function (response) {
          console.log(response);
        });
        setTimeout(function () {
          that.$loading.close();
          location.hash = "/"
        }, 2000)
      },
      goModel(){
        this.showIf = true;
      },
      //修改交易密码
      changeTransactionPwd(){
        var that = this;
        that.$loading.open("数据获取中...");
        this.$http({
          method: 'post',
          url: that.api.webResetPassword,
          data: that.$qs.stringify({
            way: "wap"
          })
        }).then(function (response) {
          that.$loading.close();
          if (response.data.r == 1) {
            that.onHref = response.data.gohref;
            that.$store.state.iframeIf = true;
          } else {
            that.$alert(response.data.msg || "出错啦")
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
    },
  })
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import url(../../assets/less/common.less);

  .main-warp {
    .top-div {
      width: 95%;
      padding-left: 5%;
      height: auto;
      background: #ffffff;
      .input-div {
        width: 95%;
        padding-right: 5%;
        height: 99/@r;
        line-height: 99/@r;
        font-size: .65rem;
        .left-span {
          float: left;
          color: #333333;
        }
        .right-span {
          color: #a9a9a9;
          float: right;
          img {
            width: 17/@r;
            height: 27/@r;
            margin-top: .92rem;
            margin-left: .3rem;
          }
        }
        .blue {
          color: #77aeff;
        }
      }
      .border-bottom {
        border-bottom: 1px solid #e6e6e6;
      }
    }
    .last-button {
      width: 100%;
      height: 100/@r;
      margin-top: 40/@r;
      font-size: .8rem;
      color: #77aeff;
      background: #ffffff;
    }
  }

</style>
