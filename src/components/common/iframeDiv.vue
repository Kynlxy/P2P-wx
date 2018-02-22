<template>
  <div class="my-iframe" >
    <iframe :src="onHref" frameborder="0"></iframe>
    <button class="close" @click="closeShowIf()">关闭</button>
  </div>
</template>
<script>
  export default{
    name: "MyIframe",
    props: {
      onHref: String  //定义传值的类型<br>
    },
    mounted(){
      document.querySelector("body").setAttribute("class","no-scroll")
    },
    beforeDestroy(){
      document.querySelector("body").setAttribute("class","")
    },
    methods: {
      closeShowIf(){
        this.$store.state.iframeIf = false;
      }
    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import url(../../assets/less/common.less);
  .my-iframe{
    position: fixed;
    bottom: 0;
    top: 0;
    right: 0;
    left: 0;
    margin: auto;
    width: 100%;
    height: auto;
    background: rgba(0,0,0,.7);
    z-index: 111111;
    iframe{
      display: block;
      width: 100%;
      height: 22rem;
      margin: 3rem auto 0 auto;
      background: #fff;
    }
    .close{
      display: block;
      width: 30%;
      height: 60/@r;
      margin: 40/@r auto ;
      text-align: center;
      font-size: .85rem;
      background: #ffffff;
      color: #03A9F4;
      border-radius: 5px;
      z-index: 11111111;
    }
  }
</style>
