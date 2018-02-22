<template>
  <div>
    <div class="main-warp">
      <div class="input-div">
        <span>旧密码</span>
        <input type="password" placeholder="请输入您的旧密码" v-model="pwd.oldPwd">
      </div>
      <div class="input-div">
        <span>新密码</span>
        <input type="password" placeholder="请输入您的新密码" v-model="pwd.newPwd">
      </div>
      <div class="input-div" >
        <span id="last-span">确认密码</span>
        <input type="password" placeholder="请确认您的新密码" v-model="pwd.newPwd2">
      </div>
      <button class="last-button" @click="submit()">确认修改</button>
    </div>
    <bottomBar :on="on"></bottomBar>
  </div>
</template>
<script>
  import checkout from '../../common/checkout';
  import {Toast, Indicator} from 'mint-ui';
  import Vue from 'vue'
  import bottomBar from '../common/bottomBar.vue'
  export default({
    name: "ChangePwd",
    data(){
      return {
        on: "my",             //传值给bottomBar确定是哪个处于on状态
        pwd:{
          oldPwd:"",          //原来密码
          newPwd:"",          //新密码
          newPwd2:""          // 第二次新密码
        }
      }
    },
    methods:{
      submit(){
        var that = this;
        var test = new checkout.InputValidators();
        test.importStrategies(checkout.validationStrategies);
        test.addValidator('minLength:1','请输入旧密码',this.pwd.oldPwd);
        test.addValidator('minLength:6','请输入至少6位的新密码',this.pwd.newPwd);
        test.addValidator('minLength:1','请再次输入新密码',this.pwd.newPwd2);
        test.addValidator('isEqual:' + that.pwd.newPwd, '新密码输入不一致', that.pwd.newPwd2);
        test.addValidator('notEqual:' + that.pwd.oldPwd, '新旧密码一样还算改吗', that.pwd.newPwd);
        var result = test.check();
        if(result){
          Toast(result.errMsg);
          return false;
        }
        this.$http({
          method:'post',
          url:that.api.changePwd,
          data:that.$qs.stringify({
            oldpassword:this.pwd.oldPwd,
            newpassword:this.pwd.newPwd
          })
        }).then(function (response) {
            if(response.data.r == 1){
              Toast(response.data.msg || "修改成功!");
              setTimeout( function (){
                that.$router.push({
                  name:'My'
                })
              },2000)
            }else{
              Toast(response.data.msg || "出错啦!");
            }
        }).catch(function (response) {
          console.log(response);
        });
      }
    },
    components:{
      bottomBar
    }
  })
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import url(../../assets/less/common.less);
  .main-warp{
    .input-div{
      position: relative;
      width: 90%;
      height: 90/@r;
      margin: 30/@r auto;
      background: #ffffff;
      border: 1px solid #e6e6e6;
      color: #666666;
      line-height: 90/@r;
      font-size: .8rem;
      span{
        margin-left: 5%;
      }
      input{
        width: 72%;
        height: 2.2rem;
        font-size: .73rem;
        padding-left: 2%;
        outline: none;
        cursor: pointer;
        border: none;
      }
      #last-span{
        margin-left: 1%;
      }
    }
    .last-button{
      display: block;
      width: 90%;
      height: 90/@r;
      margin: 30/@r auto;
      background: #ffffff;
      border: 1px solid #03A9F4;
      font-size: .8rem;
      color: #03A9F4;
      border-radius: 5px;
    }
  }


</style>
