<!--提现记录-->
<template>
  <div>
    <div class="main-warp">
      <div v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-distance="10">
        <template  v-if="list.mainData && list.mainData.length > 0">
          <div class="list-template" v-for="item in list.mainData">
            <div class="main-div">
              <p class="big-p">
                <span class="left-span">提现</span>
                <span class="right-span">-{{item.money}}</span>
              </p>
              <p class="small-p">
                <span class="left-span" v-if="item.status == -1 || item.status == 0">已审[汇款中]</span>
                <span class="left-span" v-else-if="item.status == 1 ">已审[汇款中]</span>
                <span class="left-span" v-else-if="item.status == 2 ">已审[汇款中]</span>
                <span class="left-span" v-else-if="item.status == 3 ">已汇款</span>
                <span class="left-span" v-else-if="item.status == 4 ">汇款失败</span>
                <span class="right-span">
                {{item.time_h}}
                </span>
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
    name:"SafeCenter",
    data(){
      return{
        on:"my",             //传值给bottomBar确定是哪个处于on状态
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
          url:that.api.withdrawalsList,
          data:that.$qs.stringify({
            pageIndex:that.list.pageIndex,
            pageSize:that.list.pageSize
          })
        }).then(function (response) {
          if(response.data.r == 1){
            that.loading = false;
            that.$loading.close();
            //如果已经加载完 就给提示 已加载完
            if (that.list.pageIndex * that.list.pageSize >= response.data.total){
              that.list.isEnd = true;
            }
            that.list.mainData = that.list.mainData.concat(response.data.cash)
          }else{
            this.$alert("出错啦");
          }
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
      height: 100@r;
      padding-top: 40/@r;
      background: #ffffff;
      .main-div{
        width: 94%;
        margin-left: 3%;
        padding-right: 3%;
        height: 100/@r;
        border-bottom: 1px solid #cecece;
        .big-p{
          margin-bottom: 20/@r;
          height:  auto;
          font-size: .7rem;
          color: #f17d30;
          overflow: hidden;
        }
        .small-p{
          font-size: .65rem;
          color: #9f9f9f;
          height: auto;
          overflow: hidden;
          .timer{
            margin-right: .5rem;
          }
        }
        .left-span(@index){
          background: @index;
          float: left;
        }
        .right-span{
          float: right;
        }

      }
    }
  }

</style>
