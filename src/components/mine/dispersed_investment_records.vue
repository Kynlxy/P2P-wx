<!--散标投资记录-->
<template>
  <div>
    <div class="main-warp">
      <div v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-immediate-check = "false"
           infinite-scroll-distance="5">
        <template v-if="list.mainData && list.mainData.length > 0">
          <div class="list-template" v-for="item in list.mainData">
            <div class="main-center">
              <p class="total-p">{{item.name}}</p>
              <p class="second-p">
                <span class="left-span">投标金额/时间</span>
                <span class="right-span">年化利率</span>
              </p>
              <p class="third-p">
                <span class="left-span">{{item.realaccount}}元/{{item.time_tz}}</span>
                <span class="right-span">{{item.borrow_apr}}%</span>
              </p>
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
    name:"dispersedInvestmentRecords",
    data(){
      return {
        on:"my",                          //传值给bottomBar确定是哪个处于on状态
        loading:true,                    //是否加载数据
        list:{                            //列表里面的数据
          pageIndex:1,                    //页码
          pageSize:8,
          mainData:[],                    //数据存放处
          isEnd:false                     //是否分组里的所有数据都获取了
        }

      }
    },

    mounted(){
      this.getList();
    },
    methods:{
      loadMore(){
        if (this.loading == true){

        }else{
          this.loading = true;
          this.list.pageIndex ++;
          this.getList();
        }

      },
      getList(){
        var that = this;
        if (that.list.isEnd){
          this.$alert("数据已全部加载");
          return false;
        }
        that.$loading.open("努力加载中");
        this.$http({
          method:'post',
          url:that.api.tenderList,
          data:that.$qs.stringify({
            pageIndex:that.list.pageIndex,
            pageSize:that.list.pageSize
          })
        }).then(function (response) {
          that.loading = false;
          that.$loading.close();
          //如果已经加载完 就给提示 已加载完
          if (that.list.pageIndex * that.list.pageSize >= response.data.total){
            that.list.isEnd = true;
          }
          that.list.mainData = that.list.mainData.concat(response.data.data)

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
    .list-template{
      width: 100%;
      height: 140/@r;
      padding-top: 30/@r;
      background: @ff;
      .main-center{
        width: 90%;
        margin-left: 5%;
        padding-right: 5%;
        height: 138/@r;
        border-bottom: 1px solid #cecece;
        p{
          margin-bottom: 20/@r;
        }
        .total-p{
          font-size: .75rem;
          color: #333333;
        }
        .second-p{
          font-size: .6rem;
          color: #979797;
          overflow: hidden;
        }
        .third-p{
          font-size: .6rem;
          color: #f28847;
          overflow: hidden;
        }
        .left-span{
          float: left;
        }
        .right-span{
          float: right;
        }
      }
    }
  }
</style>
