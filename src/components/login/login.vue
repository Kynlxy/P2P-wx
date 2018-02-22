<!--登录页面-->
<template>
  <div>
    <div class="main-warp">
      <div class="main-center-banner">
      </div>
      <div class="main-login-input">
        <div class="input-logo">
          <img src="../../assets/images/logo.png" alt="">
        </div>
        <div class="input-div">
          <img class="input-img" src="../../assets/images/uname.png" alt="">
          <input type="text" placeholder="手机号/邮箱/用户名" v-model="user.uname">
        </div>
        <div class="input-div">
          <img class="input-img" src="../../assets/images/pwd.png" alt="">
          <input type="password" placeholder="密码" v-model="user.password">
        </div>
        <button class="submit" @click="submit()">登录</button>
        <div class="last-message">
          <router-link to="/Register">
            <a class="left-span">
              注册
            </a>
          </router-link>
          <router-link to="/ForgetPwd">
            <a class="right-span">
              忘记密码
            </a>
          </router-link>
          </span>
        </div>
      </div>
    </div>
    <div id="login">
      <mt-popup
        v-model="popupShow"
        :modal = false
        position="top">
        <Slot>初次在设备上打开可能会有些许卡顿 ^_^</Slot>
      </mt-popup>
    </div>
    <bottomBar :on="on"></bottomBar>
  </div>
</template>
<script>
  import checkout from '../../common/checkout';
  import { Toast,Indicator ,Popup} from 'mint-ui';
  import bottomBar from '../common/bottomBar.vue'
  import md5 from 'md5';
  import Vue from 'vue';
  Vue.component(Popup.name, Popup);
  export default{
    name:'login',
    data(){
      return {
        user:{            //用户登录相关
          uname:"",
          password:"",
          cd:"",
          salt:""
        },
        popupShow:false,  //上方提示窗是否展示
        isold:false,      //是否为老用户 是则需要前端转换
        step:0,           //登录步骤
        oknum:0,
        on:"index"        //传值给bottomBar确定是哪个处于on状态
      }
    },
    mounted(){
    },
    methods:{
      submit(){
        var that = this;
        var test = new checkout.InputValidators();
        test.importStrategies(checkout.validationStrategies);
        test.addValidator('isMobile', '请输入正确的手机号', this.user.uname);
        test.addValidator('minLength:6','密码位数不对',this.user.password);
        var result = test.check();
        if(result){
          Toast(result.errMsg);
          return false;
        }
        //获取cd跟salt
        that.getCdSalt();
      },
      getCdSalt(){
        Indicator.open('登录中...');
        var that = this;
        this.$http({
          method:'post',
          url:that.api.getcd,
          data:that.$qs.stringify({
            username:this.user.uname
          })
        }).then(function (response) {
          that.user.cd = response.data.cd;
          that.user.salt = response.data.salt;
          that.login();
        }).catch(function (response) {
          console.log(response);
        });
      },
      //登录
      login(){
        var that = this;
        that.popupShow = true;
        //判断是否是老用户 如果不是的话则进行md5加密
        if (!that.isold){
          var password = md5(md5(md5(String(this.user.password)) + this.user.salt) +this.user.cd);
        }
        this.$http({
          method:'post',
//          url:"/index_wx.php?m=&s=login&ismd5=" + (that.isold ? "0": "1"),
          url:that.api.login + (that.isold ? "0": "1"),
          data:that.$qs.stringify({
            username:this.user.uname,
            password:password
          })
        }).then( function (response){
          Indicator.close();
          if (!response.data){
            return false;
          }
          window.json = response.data;
          if (response.data.isold == 1){
            that.isold = true;
            that.login();
          }else{
            that.isold = false
          }
          if (response.data.script){
            if(!window.json.lastscript){
              window.json.lastscript = response.data.script[response.data.script.length-1];
              response.data.script.pop();
            }
            that.step = response.data.script.length;
            for (var i = 0;i<response.data.script.length;i++) {
              if (window.location.href.substr(0, 8) == 'https://') {
                response.data.script[i] = response.data.script[i].replace('http://', 'https://');
              }
              that.$main.loadJS(response.data.script[i], function () {
                that.oknum++;
                if (that.step == that.oknum) {
                  if(window.json.lastscript) {
                    if (window.location.href.substr(0, 8) == 'https://') {
                      window.json.lastscript = window.json.lastscript.replace('http://', 'https://');
                    }
                    that.$main.loadJS(window.json.lastscript,function(){
                      Toast("登录成功");
                      setTimeout( function (){
                        location.hash = '/Index'
                      },3500);
                    });
                  }else{
                    Toast("登录成功");
                    setTimeout( function (){
                      location.hash = '/Index'
                    },3500);
                  }
                }
              });
            }
          }else{
            var msg = "";
            if (response.data.msg)
              msg = response.data.msg;
            else if (response.data.gomsg)
              msg = response.data.gomsg;
            if (msg && msg.length > 0)
              Toast(msg)
          }
        })
      },
      layout(){
        location.href = "/api/t.php?a=logout"
      }
    },
    components: {
      bottomBar
    }

  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import url(../../assets/less/common.less);
  body{
    .main-warp{
      position: relative;
      height: 1332/@r;
      background: @ff;
      .main-center-banner{
        width: 100%;
        height:688/@r;
        background: url(../../assets/images/loginBanner.png) no-repeat center;
        background-size: cover;
      }
      .main-login-input{
        position: relative;
        width: 86.7%;
        height: 590/@r;
        padding-top: 74/@r;
        margin: -170/@r auto;
        background: @ff;
        box-shadow: 1px 5px 10px rgba(0,0,0,.1), -1px -1px 10px rgba(0,0,0,.1);
        -webkit-box-shadow: 1px 5px 10px rgba(0,0,0,.1), -1px -1px 10px rgba(0,0,0,.1);
        -o-box-shadow: 1px 5px 10px rgba(0,0,0,.1),-1px -1px 10px rgba(0,0,0,.1);
        -moz-box-shadow: 1px 5px 10px rgba(0,0,0,.1),-1px -1px 10px rgba(0,0,0,.1);
        -ms-box-shadow: 1px 5px 10px rgba(0,0,0,.1),-1px -1px 10px rgba(0,0,0,.1);
        border-radius: 20px;
        .input-logo{
          width: 49%;
          height: 108/@r;
          margin: 0 auto;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .input-div{
          position: relative;
          width: 70%;
          height: 64/@r;
          margin: 36/@r auto;
          input{
            width: 85%;
            padding-left: 15%;
            height: 65/@r;
            line-height: 65/@r;
            font-size: .7rem;
            color: #b7b7b8;
            border-bottom: 2px solid #e6e6e6;
          }
          .input-img{
            display: block;
            position: absolute;
            width: 36/@r;
            height: 36/@r;
            top: 7px;
            left: 3%;
          }
        }
        .submit{
          display: block;
          width:70%;
          height: 70/@r;
          margin:60/@r auto 30/@r auto;
          border-radius: 20px;
          color: #ffffff;
          letter-spacing: 3px;
          font-size: .75rem;
          background: #5aa0ff;
        }
        .submit:active{
          background: #4481ff;
        }
        .last-message{
          width: 70%;
          height:  auto;
          margin: 0 auto;
          .left-span{
            float: left;
          }
          .right-span{
            float: right;
          }
          a{
            font-size: .7rem;
            color: #b7b7b8;
          }
        }
      }
    }
  }
</style>
