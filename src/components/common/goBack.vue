<template>
  <div class="main-top">
    <div class="goBack" @click="goBack()">

    </div>
    <p>{{message}}</p>
  </div>
</template>
<script>
  export default{
    name: "goback",
    props: {
      message: String  //定义传值的类型<br>
    },
    data(){
      return {}
    },
    methods:{
      goBack: function () {
        this.$router.go(-1);
        this.$store.state.isBack = true;
      }
    }
  }
</script>
<style scoped>
  .main-top{
    position: fixed;
    top:0;
    width: 100%;
    height: 2.25rem;
    background: #ffffff;
    font-size: .75rem;
    text-align: center;
    line-height: 2.25rem;
    z-index: 11111111;
  }
  .goBack{
    position: absolute;
    top: .65rem;
    left: 3%;
    width: .5rem;
    height: 1rem;
    background: url(../../assets/images/goback.png) no-repeat;
    background-size: contain;
    cursor: pointer;
  }
</style>
