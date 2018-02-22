<!--忘记密码-->
<template>
  <div>
    <div class="main-warp">
      <div class="input-div">
        <img class="left-icon" src="../../assets/images/mobile.png" alt="">
        <input type="text" placeholder="请输入手机号码" maxlength="11" v-model="user.mobile">
      </div>
      <div class="input-div">
        <img class="left-icon" src="../../assets/images/erweima.png" alt="">
        <input type="text" placeholder="请输入图形验证码" v-model="user.imgCode">
        <img class="right-img" :src="user.checkoutImg" alt="看不清吗？换一张" title="看不清？换一张" @click="changeCode()">
      </div>
      <div class="input-div">
        <img class="left-icon" src="../../assets/images/anquan.png" alt="">
        <input type="text" placeholder="请输入短信验证码" v-model="user.msgCode">
        <div class="right-div">
          |&nbsp;&nbsp;
          <button v-if="!isShow" class="getCode" @click="checkImgCode()" v-cloak>获取验证码</button>
          <button v-else class="notCode" disabled v-cloak>{{buttonMsg}}</button>
        </div>
      </div>
      <div class="last-div">
        <div class="div-input" id="one-div">
          <span class="absolute-span">新登录密码</span>
          <input type="password" placeholder="新登录密码" v-model="user.pwd">
        </div>
        <div class="div-input">
          <span class="absolute-span">确认登录密码</span>
          <input type="password" placeholder="确认登录密码" v-model="user.pwd2">
        </div>
      </div>

      <button class="submit" @click="submit()">确认</button>
    </div>
    <bottomBar :on="on"></bottomBar>
  </div>
</template>
<script>
  import checkout from '../../common/checkout';
  import { Toast,Indicator } from 'mint-ui';
  import bottomBar from '../common/bottomBar.vue'
  import md5 from 'md5';
  export default({
    name:"forgetPwd",
    data(){
      return {
        user:{                            //用户相关
          mobile:"",                      //手机号码
          imgCode:"",                     //输入的图形验证码
          checkoutImg:this.api.forgetImgCode,   //图片验证码
          msgCode:"",                     //短信验证码
          pwd:"",                         //密码
          pwd2:""                         //第二次输入密码
        },
        buttonMsg:"" ,                     //获取验证码按钮信息
        isSend:false,                      //是否发送信息
        isShow:false,
        wait:60 ,                           //倒计时
        gJson:"",
        oknum:0,
        on:"index"        //传值给bottomBar确定是哪个处于on状态

      }
    },
    mounted(){

    },
    components: {
      bottomBar
    },
    methods:{
      submit(){
        var that = this;
        this.test =  new checkout.InputValidators();
        this.test.importStrategies(checkout.validationStrategies);
        that.test.addValidationStrategy('isEqual',  function(errMsg, value1, value2) {
          if(value1 !== value2) {
            return this.buildInvalidObj(errMsg, value1 );
          }
        });
        that.test.addValidator('isTrue','请先进行获取验证码操作',this.isSend);
        that.test.addValidator('minLength:1',"请输入短信验证码",this.user.msgCode);
        that.test.addValidator('minLength:6','请输入大于等于6位数的密码',this.user.pwd);
        that.test.addValidator('isEqual:' + that.user.pwd, '两次密码不一致', that.user.pwd2);
        var result = that.test.check();
        if(result){
          Toast(result.errMsg);
          return false;
        }
        that.checkoutPhoneCode();

      },
      //获取验证码按钮点击(判断图片验证码是否正确)
      checkImgCode(){
        var that = this;
        this.test =  new checkout.InputValidators();
        this.test.importStrategies(checkout.validationStrategies);
        that.test.addValidator('isMobile', '请输入正确的手机号', this.user.mobile);
        that.test.addValidator('minLength:1','请输入图形验证码',this.user.imgCode);
        var result = that.test.check();
        if(result){
          Toast(result.errMsg);
          return false;
        }
        this.$http({
          method:'get',
          url:that.api.sendMsg,
          params:{
            chkcode:that.user.imgCode,
            mobile:that.user.mobile
          }
        }).then(function (response) {
          if (response.data.r == false){
              that.changeCode();
            Toast(response.data.msg);
          }else{
            that.isSend = true;
            that.isShow = true;
            that.timeLimit();
          }
        }).catch(function (response) {
          console.log(response);
        });
      },
      //验证手机验证码
      checkoutPhoneCode(){
        Indicator.open('努力加载中...');
        var that = this;
        this.$http({
          method:'get',
          url:that.api.forgetCheck,
          params:{
            mobile:that.user.mobile,
            phonecode:that.user.msgCode
          }
        }).then(function (response) {
          if (response.data.r == false){
            Indicator.close();
            Toast(response.data.msg);
          }else{
            that.ImmediateRegistration()
          }
        }).catch(function (response) {
          console.log(response);
        });
      },
      //修改验证码
      changeCode(){
        this.user.checkoutImg = this.api.forgetImgCode + "&t=" + Math.random()
      },
      //倒计时
      timeLimit() {
        var that = this;
        if (that.wait == 0) {
          that.isShow = false;
          that.wait = 60;
        } else {
          that.buttonMsg = "已发送(" + this.wait + ")";
          that.isShow = true;
          that.wait--;
          that.x = setTimeout(function () {
            that.timeLimit()
          }, 1000);
        }
      },
      //立即注册
      ImmediateRegistration(){
        var that = this;
        this.$http({
          method:'get',
          url:that.api.forgetPwdLogin,
          params:{
            newpass:md5(that.user.pwd)
          }
        }).then(function (response) {
          Indicator.close();
          if (!response.data) {
            return;
          }
          if (response.data.r == true) {
            Toast("修改密码成功,系统将自动跳转至登录页面");
            setTimeout(function (){
              that.$router.push({ path: '/Login'});
            },2000);
          } else {
            var s = "修改密码失败:" + response.data.msg;
            Toast(s);
          }

        }).catch(function (response) {
          console.log(response);
        });
      },
      /**
       * 切换用户中心
       */
      redirect: function () {
        var that = this;
        ++that.oknum;
        if (that.oknum == that.gJson.script.length) {
          if(window.json.lastscript)
          {
            if (window.location.href.substr(0, 8) == 'https://') {
              window.json.lastscript = window.json.lastscript.replace('http://', 'https://');
            }
            that.$main.loadJS(window.json.lastscript,function(){
              /**
               * 注册成功处
               */
              Toast("注册成功");
            });
          }else
          {
            /**
             * 注册成功处
             */
            Toast("注册成功");
          }
        }
      },
    }
  })

</script>
<style scoped lang="less" rel="stylesheet/less">
  @import url(../../assets/less/common.less);
  .main-warp{
    .last-div{
      width: 100%;
      height:  auto;
      margin-top: 24/@r;
      margin-bottom: 65/@r;
      background: #ffffff;
      .div-input{
        position: relative;
        width: 96%;
        margin-left: 4%;
        height: 90/@r;
        padding: 10/@r 0;
        input{
          width: 66%;
          padding: 0 4% 0 30%;
          height: 2.25rem;
          font-size: .63rem;
          color: #b7b7b8;
        }
        .absolute-span{
          position: absolute;
          font-size: .65rem;
          color: #666666;
          top:1.1rem;
        }
      }
      #one-div{
        border-bottom: 1px solid #dddddd;
      }
    }
    .input-div{
      position: relative;
      width: 100%;
      height: 90/@r;
      background: @ff;
      padding: 10/@r 0;
      margin-top: 24/@r;
      input{
        width: 60%;
        padding: 0 4% 0 8%;
        height: 90/@r;
        font-size: .63rem;
        color: #b7b7b8;
      }
      .left-icon{
        position: absolute;
        top: 40/@r;
        left: 3%;
        width: .625rem;
        height: 28/@r;
      }
      .right-img{
        position: absolute;
        right: 3%;
        top: 20/@r;
        width: 30%;
        height: 70/@r;
        cursor: pointer;
      }
      .right-div{
        position: absolute;
        right: 3%;
        top: 20/@r;
        width: 30%;
        height: 70/@r;
        line-height: 70/@r;
        font-size: .6rem;
        color: #666666;
        .getCode{
          position: absolute;
          top: .05rem;
          right: .2rem;
          width: 160/@r;
          height: 64/@r;
          background:#f17d30;
          color: #ffffff;
          border-radius: 5px;
          line-height:50/@r ;
          cursor: pointer;
        }
        .notCode{
          position: absolute;
          top: .05rem;
          right: .2rem;
          width: 160/@r;
          height: 64/@r;
          background:#dedede;
          color: #8a8a89;
          border-radius: 5px;
          line-height:50/@r ;
          cursor: pointer;
        }
      }
    }
    .register-p{
      margin:24/@r 0 70/@r 8%;
      font-size: .63rem;
      color:#666666;
      span{
        color: #f17d30;
      }
    }
    .submit{
      width: 92%;
      height: 70/@r;
      display: block;
      margin: 0 auto;
      background: #5aa0ff;
      color: @ff;
      border-radius: 8px;
      font-size: .65rem;
      letter-spacing: 10px;
    }
    .submit:active{
      background: #3585f2;
    }
  }
</style>
