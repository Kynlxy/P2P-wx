<!--底部导航栏-->
<template>
  <div class="main-bottom">
    <ul>
      <router-link to="/Index">
        <li>
          <div :id="on1" class="index"></div>
        </li>
      </router-link>
      <router-link to="/Product">

        <li>
          <div :id="on2" class="money"></div>
        </li>
      </router-link>
      <router-link to="/My">

        <li>
          <div :id="on3" class="my"></div>
        </li>
      </router-link>

    </ul>
  </div>
</template>
<script>
  export default{
    name: "bottomBar",
    props: {
      on: String  //定义传值的类型<br>
    },
    data(){
      return {
        on1: "",
        on2: "",
        on3: "",
      }
    },
    mounted(){
      if (this.on == "index") {
        this.on1 = "indexOn"
      } else if (this.on == "money") {
        this.on2 = "moneyOn"
      } else if (this.on = "my") {
        this.on3 = "myOn"
      }
    },
    methods: {}
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import url(../../assets/less/common.less);

  .main-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100/@r;
    background: #ffffff;
    z-index: 1111;
    border-top: 1px solid #eeeeee;
    ul {
      overflow: hidden;
      li {
        width: 33.3%;
        float: left;
        height: 100/@r;
        cursor: pointer;
        .index {
          width: 40/@r;
          height: 75/@r;
          margin: 12/@r auto;
          background: url(../../assets/images/index.png) no-repeat center;
          background-size: contain;
        }
        .money {
          width: 44/@r;
          height: 75/@r;
          margin: 12/@r auto;
          background: url(../../assets/images/money.png) no-repeat center;
          background-size: contain;
        }
        .my {
          width: 40/@r;
          height: 75/@r;
          margin: 12/@r auto;
          background: url(../../assets/images/my.png) no-repeat center;
          background-size: contain;
        }
        #indexOn {
          background: url(../../assets/images/index-on.png) no-repeat center;
          background-size: contain;
        }
        #moneyOn {
          background: url(../../assets/images/money-on.png) no-repeat center;
          background-size: contain;
        }
        #myOn {
          background: url(../../assets/images/my-on.png) no-repeat center;
          background-size: contain;
        }
      }
    }
  }

  .goBack {
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
