<template>
  <div>
    <div class="main-warp">
      <div class="top-div">
        <template v-if="info">
          <div class="input-div border-bottom">
            <span class="left-span">用户名</span>
            <span class="right-span" v-if="info._ME.un">
              {{info._ME.un}}
            </span>
            <span class="right-span" v-else>
              未设置
            </span>
          </div>
          <div class="input-div border-bottom">
            <span class="left-span">实名信息</span>
            <span class="right-span" v-if="info._ME.uname && info._ME.personid">
              {{info._ME.uname}} {{info._ME.personid}}
            </span>
            <span class="right-span" v-else>
              未设置
            </span>
          </div>
          <div class="input-div border-bottom">
            <span class="left-span">存管信息</span>
            <span class="right-span" v-if="info.acc.acc">
              {{info.acc.acc}}
            </span>
            <span class="right-span" v-else>
              <router-link to="/Depository">
                点击设置
              </router-link>

            </span>
          </div>
          <div class="input-div border-bottom">
            <span class="left-span">绑定银行卡</span>
            <span class="right-span" v-if="info.bak.bankno">
              ***************{{info.bak.bankno.substr(info.bak.bankno.length-4)}}
            </span>
            <span class="right-span" v-else>
              <router-link to="/Bank">
                点击设置
              </router-link>
            </span>
          </div>
          <div class="input-div border-bottom">
            <span class="left-span">预留手机</span>
            <span class="right-span" v-if="info.bak.mobile">
              {{info.bak.mobile.replace(/(\d{3})\d{5}(\d{3})/,'$1*****$2')}}
            </span>
            <span class="right-span" v-else>
              <router-link to="/Bank">
                点击设置
              </router-link>
            </span>
          </div>
        </template>
      </div>
      <button class="last-button" @click="goBack()">返回</button>

    </div>
    <bottomBar :on="on"></bottomBar>
  </div>
</template>
<script>
  import {Toast, Indicator, MessageBox} from 'mint-ui';
  import {Actionsheet} from 'mint-ui';
  import Vue from 'vue'
  Vue.component(Actionsheet.name, Actionsheet);
  import bottomBar from '../common/bottomBar.vue'
  export default({
    name: "DepositoryManage",
    data(){
      return {
        on: "my",             //传值给bottomBar确定是哪个处于on状态
        info: "",               //信息存储处
        myInfo: this.$store.state.myInfo
      }
    },
    mounted(){
      this.getInfo();
    },
    methods: {
      getInfo(){
        var that = this;
        this.$http({
          method: 'post',
          url: that.api.centerInfo,
        }).then(function (response) {
          that.$loading.close();
          if (response.data.r == 1) {
            that.info = response.data;
          } else {
            that.$alert("出错啦!")
          }
        }).catch(function (response) {
          that.$loading.close();
          console.log(response);
        });
      },
      goBack(){
        this.$router.go(-1);
      }
    },
    components: {
      bottomBar
    }
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
        font-size: .7rem;
        .left-span {
          float: left;
          color: #333333;
        }
        .right-span {
          color: #a9a9a9;
          float: right;
        }
      }
      .border-bottom {
        border-bottom: 1px solid #e6e6e6;
      }
    }
    .last-button {
      display: block;
      width: 90%;
      height: 100/@r;
      margin: 60/@r auto;
      font-size: .8rem;
      color: #77aeff;
      background: #ffffff;
      border: 1px solid #77aeff;
      border-radius: 5px;
    }
    a{
      color: #a9a9a9;
    }
  }

</style>
