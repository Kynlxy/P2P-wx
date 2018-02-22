<!--红包列表-->
<template>
  <div>
    <div class="main-warp">
      <div v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-distance="10">
        <template v-if="list.mainData && list.mainData.length > 0">
          <div v-for="item in list.mainData">
            <div class="money-list add-class" v-if="item.money_ty == 5">

              <!--左右小半圆开始-->
              <div class="common-absolute absolute-left">

              </div>
              <div class="common-absolute absolute-right">

              </div>
              <!--左右小半圆结束-->
              <div class="top-div">
                <div class="left-div">
                  <span class="big-font">{{item.money}}</span>%
                </div>
                <div class="right-div text-left">
                  加息券
                </div>
              </div>
              <div class="bottom-div">
                <div class="left-div">
                  <p v-if="item.use_rule_msg">{{item.use_rule_msg}}</p>
                  <p v-else>无使用要求</p>
                  <!--<p>最低投资期限3个月</p>-->
                </div>
                <div class="right-div">
                  <p>适用产品标签 活动</p>
                  <p>到期时间{{item.time_end}}</p>
                </div>
              </div>
            </div>
            <div class="money-list red-class" v-else>
              <!--左右小半圆开始-->
              <div class="common-absolute absolute-left">

              </div>
              <div class="common-absolute absolute-right">

              </div>
              <!--左右小半圆结束-->
              <div class="top-div">
                <div class="left-div">
                  <span class="big-font">{{item.money}}</span>元
                </div>
                <div class="right-div text-left">
                  红包
                </div>
              </div>
              <div class="bottom-div">
                <div class="left-div">
                  <p v-if="item.use_rule_msg">{{item.use_rule_msg}}</p>
                  <p v-else>无使用要求</p>
                  <!--<p>最低投资期限3个月</p>-->
                </div>
                <div class="right-div">
                  <p>适用产品标签 活动</p>
                  <p>到期时间 {{item.time_end}}</p>
                </div>
              </div>
            </div>
          </div>

        </template>
        <template v-else>
          <loadingNot></loadingNot>
        </template>
      </div>
    </div>
    <bottomBar :on="on"></bottomBar>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Toast,Indicator,InfiniteScroll } from 'mint-ui';
  Vue.use(InfiniteScroll);
  import bottomBar from '../common/bottomBar.vue'
  import loadingNot from '../common/loadingNot.vue'
  export default({
    name:"RedEnvelopes",
    data(){
      return {
        on: "my",             //传值给bottomBar确定是哪个处于on状态
        list:{                            //列表里面的数据
          pageIndex:1,                    //页码
          pageSize:10,
          mainData:[],                    //数据存放处
          isEnd:false                     //是否分组里的所有数据都获取了
        },
        loading:true                   //是否加载数据

      }
    },
    mounted(){
      this.getInfo();
    },
    methods:{
      loadMore(){
        if (this.loading == true){

        }else{
          this.loading = true;
          this.list.pageIndex ++;
          this.getInfo();
        }
      },
      getInfo(){
        var that = this;
        if (that.list.isEnd){
          this.$alert("数据已全部加载");
          return false;
        }
        that.$loading.open("努力加载中");
        this.$http({
          method:'post',
          url:that.api.redMoney,
          data:that.$qs.stringify({
            pageIndex:that.list.pageIndex,
            pageSize:that.list.pageSize
          })
        }).then(function (response) {
//          if(response.data.r == 1){
            that.loading = false;
            that.$loading.close();
            //如果已经加载完 就给提示 已加载完
            if (that.list.pageIndex * that.list.pageSize >= response.data.total){
              that.list.isEnd = true;
            }
            that.list.mainData = that.list.mainData.concat(response.data.data)
//          }else{
//            this.$alert("出错啦");
//          }
        }).catch(function (response) {
          that.$loading.close();
          console.log(response);
        });
      }
    },
    components: {
      bottomBar,
      loadingNot
    }
  })
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import url(../../assets/less/common.less);
  .main-warp{
    .money-list{
      position: relative;
      width: 91%;
      height: 220/@r;
      margin: 30/@r auto 0 auto;
      color: @ff;
      overflow: hidden;
      .common-absolute{
        position: absolute;
        width: 30/@r;
        height: 30/@r;
        border-radius: 50%;
        background: #ffffff;
        top:108/@r;
      }
      .absolute-left{
        left: -15/@r;
      }
      .absolute-right{
        right:-15/@r;
      }
      .top-div{
        width: 90%;
        padding: 0 5%;
        height: 120/@r;
        margin: 0 auto;
        overflow: hidden;
        font-size: .8rem;
        line-height: 120/@r;
        border-bottom: 2px dotted #ffffff;
      }
      .left-div{
        width: 50%;
        float: left;
        height: 120/@r;
        .big-font{
          font-size: 1.4rem;
          margin-right: 3%;
        }
      }
      .right-div{
        width: 50%;
        float: right;
        height: 92/@r;

      }
      .text-left{
        text-align: right;
      }
      .bottom-div{
        width: 90%;
        height: 92/@r;
        margin: 0 auto;
        .right-div{
          overflow: hidden;
          overflow-y: scroll;
          overflow-x: scroll;
        }
        p{
          margin-top: .35rem;
          font-size: .6rem;
        }
      }
    }
    .add-class{
      background:#59a0ff;
    }
    .red-class{
      background: #b1b1b1;
    }
  }

</style>
