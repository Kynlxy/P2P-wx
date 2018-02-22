<!--债权转让详情-->
<template>
  <div>
    <div class="main-warp" v-if="info">
      <div class="top-div">
        <div class="title-div">
          借款标题: {{info.title}}
        </div>
        <ul>
          <li>待收总额: <span>{{info.account}}</span>元</li>
          <li>借款利率: <span>{{info.b_apr}}</span>%</li>
          <li>剩余期数: <span>{{info.pcount}}</span></li>
          <li>手续费用: <span v-if="info.fee">{{info.fee}}</span><span v-else>0.00</span>元</li>
          <li>待收利息: <span>{{info.interest}}</span>元</li>
          <li>待收本金: <span>{{info.capital}}</span>元</li>
          <!--<li>金额区间:<span></span></li>-->
          <li>转让折价: <span v-if="info.min">{{info.min}}</span><span v-else>0.00</span>元</li>
          <li>待收日期: <span>{{info.rtime}}</span></li>
        </ul>
      </div>
      <div class="pay-div">
        <p>转让密码: <input type="password" placeholder="请输入转让密码"></p>
        <button class="submit">确定转让</button>
      </div>
    </div>
    <bottomBar :on="on"></bottomBar>
  </div>
</template>
<script>
  import {Toast, Indicator} from 'mint-ui';
  import bottomBar from '../common/bottomBar.vue'
  export default({
    name: "BondDetail",
    data(){
      return {
        on: "money",             //传值给bottomBar确定是哪个处于on状态
        info:{}           //债权转让获取的信息存放处

      }
    },
    mounted(){
      this.getInfo(this.$route.query.tid);
    },
    methods: {
      getInfo(id){
        var that = this;
        this.$http({
          method: 'post',
          url: that.api.getSavedTinfo,
          data: that.$qs.stringify({
            tid: id
          })
        }).then(function (response) {
          if (response.data.r == 1){
            that.info = response.data.info;
          }else{
            this.$alert("数据有误");
          }
        }).catch(function (response) {
          console.log(response);
        });
      }
    },
    components: {
      bottomBar
    },
  })

</script>
<style scoped lang="less" rel="stylesheet/less">
  @import url(../../assets/less/common.less);
  .main-warp{
    .top-div{
      width: 90%;
      padding: 0 5%;
      height: 700/@r;
      background: #ffffff;
      color: #666666;
      border-bottom: 1px solid #c8c8c8;
      .title-div{
        width: 100%;
        padding: 33/@r 0;
        font-size: .75rem;
        border-bottom: 1px solid #c8c8c8;
      }
      ul{
        li{
          width: 100%;
          padding: 22/@r 0 ;
          font-size: .75rem;
          span{
            color: #ff5050;
          }
        }
      }
    }
    .pay-div{
      margin-top: 30/@r;
      width: 90%;
      padding: 30/@r 5%;
      height: 280/@r;
      border-bottom: 1px solid #c8c8c8;
      border-top: 1px solid #c8c8c8;
      background: #ffffff;
      p{
        padding: 40/@r 0;
        font-size: .8rem;
        input{
          width: 68%;
          padding-left: 4%;
          height: 2rem;
          font-size: .75rem;
          border: 1px solid #dadada;
          color: #b4b4b4;
        }
      }
      .submit{
        display: block;
        margin: 5/@r auto;
        width: 100%;
        height: 80/@r;
        border-radius: 5px;
        background: #49b4ec;
        font-size: .8rem;
        color: #ffffff;
      }
      .submit:active{
        background: #2196f3;
      }
    }
  }
</style>
