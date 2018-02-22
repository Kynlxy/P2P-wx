<!--没有数据的展示组件-->
<template>
  <div class="loadingnot" style="z-index: -10;"></div>
</template>
<script>
  export default({
    name:"loadingNot",
    data(){
      return{

      }
    }
  })
</script>
<style scoped>
  .loadingnot{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    background: url(../../assets/images/404.png) no-repeat center;
    background-size: cover;
  }
</style>
