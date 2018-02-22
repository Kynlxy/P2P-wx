<!--关于我们-->
<template>
  <div>
    <div class="main-warp">

      <div class="banner">
        <img src="../../assets/images/about-banner.jpg"/>
      </div>
      <ul class="a-menu">
        <li>
          <span class="th">官方网站</span>
          <span v-cloak>{{information.web}}</span>
        </li>
        <li>
          <span class="th">客服</span>
          <span v-cloak>{{information.customerService}}</span>
        </li>
        <li>
          <span class="th">客服电话</span>
          <span v-cloak>{{information.phone}}</span>
        </li>
        <li>
          <span class="th">工作时间</span>
          <span v-cloak>{{information.time}}</span>
        </li>
      </ul>
    </div>
    <bottomBar :on="on"></bottomBar>
  </div>
</template>
<script>
  import bottomBar from '../common/bottomBar.vue'
  export default({
    name: "About",
    data(){
      return {
        on: "my",             //传值给bottomBar确定是哪个处于on状态
        information:this.$store.state.information
      }
    },
    mounted(){
    },
    components: {
      bottomBar
    }
  })
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import url(../../assets/less/common.less);
  .main-warp{
    .banner{
      width: 100%;
      height: 9rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .a-menu .th {
      position: absolute;
      left: 1rem;
      top: 50%;
      margin-right: 4px;
      color: #545454;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      transform: translateY(-50%);
    }
    .a-menu li{
      text-align: right;
      background: #fff;
      color: #797e86;
      padding: 1rem 1rem 1rem 7rem;
      position: relative;
      word-break: break-all;
      font-size: .8rem;
    }
    .a-menu li, .u-menu li, .whthdraw-list li, .whthdraw-nav {
      border-bottom: 1px solid #ececec;
    }
  }
</style>
