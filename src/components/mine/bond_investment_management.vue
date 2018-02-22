<!--投资管理-->
<template>
  <div>
    <div class="main-warp">
      <div class="top-bar">
        <ul>
          <li :class="chose == 0 ? 'active':'' " @click="choseClass(0)">可转债权</li>
          <li :class="chose == 1 ? 'active':'' " @click="choseClass(1)">已转债权</li>
          <li :class="chose == 2 ? 'active':'' " @click="choseClass(2)">承接的债权</li>
        </ul>
      </div>
      <div v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-immediate-check = "false"
           infinite-scroll-distance="5">
        <template>
          <div v-show="chose == 0">
            <div class="common-warp template-one-warp" v-if="productOne.mainData && productOne.mainData.length > 0">
              <div class="template" v-for="item in productOne.mainData">
                <div class="left-div">
                  <p class="first-p">{{item.name}}</p>
                  <div class="second-div">
                    <ul>
                      <li class="big-li">{{item.recover_account}}</li>
                      <li class="big-li">{{item.recover_capital}}</li>
                      <li>{{item.recover_period}}</li>
                    </ul>
                  </div>
                  <div class="third-div">
                    <ul>
                      <li class="big-li">待收利息</li>
                      <li class="big-li">待收本金</li>
                      <li>剩余期数</li>
                    </ul>
                  </div>
                </div>
                <div class="right-div">
                  <div class="border-common blue-border">
                    转让
                  </div>
                </div>
              </div>
            </div>
            <loadingNot v-else></loadingNot>
          </div>
        </template>
        <template>
          <div v-show="chose == 1">
            <div class="common-warp template-two-warp"  v-if="productTwo.mainData && productTwo.mainData.length > 0">
              <div class="template" v-for="item in productTwo.mainData">
                <div class="left-div">
                  <p class="first-p">债权ID:{{item.tid}}&nbsp;&nbsp;&nbsp;&nbsp;标编号:{{item.bid}}</p>
                  <div class="second-div">
                    <ul>
                      <li class="big-li">{{item.recover_account}}</li>
                      <li class="big-li">{{item.recover_capital}}</li>
                      <li>{{item.recovercount}}</li>
                    </ul>
                  </div>
                  <div class="third-div">
                    <ul>
                      <li class="big-li">待收利息</li>
                      <li class="big-li">待收本金</li>
                      <li>剩余期数</li>
                    </ul>
                  </div>
                </div>
                <div class="right-div">
                  <div class="border-common white-border">
                    已转让
                  </div>
                </div>
              </div>
            </div>
            <loadingNot v-else></loadingNot>
          </div>
        </template>
        <template >
          <div v-show="chose == 2">
            <div class="common-warp template-three-warp" v-if="productThree.mainData && productThree.mainData.length > 0">
              <div class="template" v-for="item in productThree.mainData">
                <div class="left-div">
                  <p class="first-p">债权ID:{{item.tid}}&nbsp;&nbsp;&nbsp;&nbsp;标编号:{{item.bid}}</p>
                  <div class="second-div">
                    <ul>
                      <li class="big-li">{{item.trans_price}}</li>
                      <li class="big-li">{{item.recover_account}}</li>
                      <li>{{item.recovercount}}</li>
                    </ul>
                  </div>
                  <div class="third-div">
                    <ul>
                      <li class="big-li">转让价格</li>
                      <li class="big-li">待收总额</li>
                      <li>剩余期数</li>
                    </ul>
                  </div>
                </div>
                <div class="right-div">
                  <div class="border-common green-border">
                    已承接
                  </div>
                </div>
              </div>
            </div>
            <loadingNot v-else></loadingNot>
          </div>
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
    name:"BondInvestmentManagement",
    data(){
      return {
        on:"my",             //传值给bottomBar确定是哪个处于on状态
        chose:0,                           //topBar 处于active 的class
        productOne:{                      //第一个分页的产品
          pageIndex:1,                    //页码
          pageSize:8,
          mainData:[],                    //数据存放处
          isEnd:false                     //是否分组里的所有数据都获取了

        },
        productTwo:{                      //第二个产品
          pageIndex:1,                    //页码
          pageSize:8,
          mainData:[],                    //数据存放处
          isGet:false,                    //第一次点击的时候是否加载
          isEnd:false                     //是否分组里的所有数据都获取了
        },
        productThree:{                    //第三个产品
          pageIndex:1,                    //页码
          pageSize:8,
          mainData:[],                    //数据存放处
          isGet:false,                    //第一次点击的时候是否加载
          isEnd:false                     //是否分组里的所有数据都获取了
        }

      }
    },
    mounted(){
      this.getOneProduct();
    },
    methods:{
      priceFormat:function (_num) {
        return this.$main.priceFormat(_num);
      },
      choseClass(index){
        if (index == 0){
          this.chose = 0
        }else if (index == 1){
          this.chose = 1
        }else{
          this.chose = 2
        }
      },
      loadMore(){
        if (this.loading == true){
        }else{
          this.loading = true;
          if (this.chose == 0){
            this.productOne.pageIndex ++;
            this.getOneProduct();
          }else if(this.chose == 1){
            this.productTwo.pageIndex ++;
            this.getTwoProduct();
          }else if(this.chose == 2){
            this.productThree.pageIndex ++;
            this.getThreeProduct();

          }
        }
      },
      //获取列表1的数据
      getOneProduct(){
        var that = this;
        if (that.productOne.isEnd){
          this.$alert("数据已全部加载");
          that.loading = false;
          return false;
        }
        that.$loading.open("努力加载中");
        this.$http({
          method:'post',
          url:that.api.getReCoverBinfo,
          data:that.$qs.stringify({
            pageIndex:that.productOne.pageIndex,
            pageSize:that.productOne.pageSize
          })
        }).then(function (response) {
          that.loading = false;
          that.$loading.close();
          //如果已经加载完 就给提示 已加载完
          if (that.productOne.pageIndex * that.productOne.pageSize >= response.data.total){
            that.productOne.isEnd = true;
          }
          that.productOne.mainData = that.productOne.mainData.concat(response.data.data);
        }).catch(function (response) {
          that.$loading.close();
          console.log(response);
        });
      },
      //获取列表2的数据
      getTwoProduct(){
        var that = this;
        if (that.productTwo.isEnd){
          this.$alert("数据已全部加载");
          that.loading = false;
          return false;
        }
        that.$loading.open("努力加载中");
        this.$http({
          method:'post',
          url:that.api.getZqList,
          data:that.$qs.stringify({
            pageIndex:that.productTwo.pageIndex,
            pageSize:that.productTwo.pageSize
          })
        }).then(function (response) {
          that.loading = false;
          that.$loading.close();
          //如果已经加载完 就给提示 已加载完
          if (that.productTwo.pageIndex * that.productTwo.pageSize >= response.data.total){
            that.productTwo.isEnd = true;
          }
          that.productTwo.mainData = that.productTwo.mainData.concat(response.data.data)

        }).catch(function (response) {
          that.$loading.close();
          console.log(response);
        });
      },
      //获取列表3的数据
      getThreeProduct(){
        var that = this;
        if (that.productThree.isEnd){
          this.$alert("数据已全部加载");
          that.loading = false;
          return false;
        }
        that.$loading.open("努力加载中");
        this.$http({
          method:'post',
          url:that.api.getZqList2,
          data:that.$qs.stringify({
            pageIndex:that.productThree.pageIndex,
            pageSize:that.productThree.pageSize
          })
        }).then(function (response) {
          that.loading = false;
          that.$loading.close();
          //如果已经加载完 就给提示 已加载完
          if (that.productThree.pageIndex * that.productThree.pageSize >= response.data.total){
            that.productThree.isEnd = true;
          }
          that.productThree.mainData = that.productThree.mainData.concat(response.data.data)

        }).catch(function (response) {
          that.$loading.close();
          console.log(response);
        });

      }
    },
    components: {
      bottomBar,
      loadingNot
    },
    watch:{
      chose(newVal,oldVal){
        if (newVal == 1){
          if (this.productTwo.isGet == false){
            this.getTwoProduct();
            this.productTwo.isGet = true;
          }
        }else if(newVal == 2){
          if (this.productThree.isGet == false){
            this.getThreeProduct();
            this.productThree.isGet = true;
          }
        }
      }
    }
  })
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import url(../../assets/less/common.less);
  @7:#70afcd;
  .main-warp{
    .top-bar{
      width: 100%;
      height: 50/@r;
      padding-top: 25/@r;
      background: #ffffff;
      ul{
        li{
          width: 33.3%;
          height: 50/@r;
          float: left;
          text-align: center;
          font-size: .7rem;
          color: #333333;
          cursor: pointer;
        }
        .active{
          border-bottom: 2px solid @7;
          color: @7;
        }
      }
    }
    .common-warp{
      .template{
        width: 95%;
        padding:30/@r 0 0 5%;
        margin-top: 20/@r;
        height: 170/@r;
        background: url(../../assets/images/detailBg.png) no-repeat center;
        background-size: cover;
        .left-div{
          float: left;
          width: 74%;
          overflow: hidden;
          .first-p{
            font-size: .65rem;
            margin-bottom: 30/@r;
            button{
              border: 1px solid @7;
              background: @ff;
              padding: 5/@r 15/@r;
              color:@7;
              border-radius: 10px;
            }
          }
          .second-div{
            width: 100%;
            height: 40/@r;
            ul{
              overflow: hidden;
              li{
                width: 30%;
                float: left;
                font-size: .85rem;
                text-align: center;
                span{
                  font-size: .6rem;
                }
              }
              .big-li{
                width: 35%;
                color: #fd4400;
                text-align: left;
                overflow: hidden;
                overflow-x: scroll;
              }
            }
          }
          .third-div{
            margin-top: 20/@r;
            width: 100%;
            height: 30/@r;
            ul{
              overflow: hidden;
              li{
                width: 30%;
                float: left;
                font-size: .7rem;
                color: #adafbb;
              }
              .big-li{
                width: 35%;
                text-align: left;
              }
            }
          }
        }
        .right-div{
          width: 26%;
          height: 100/@r;
          float: right;
          .border-common{
            width: 2.7rem;
            height: 2.7rem;
            margin: 0 auto;
            border-radius: 50%;
            line-height: 2.7rem;
            text-align: center;
            cursor: pointer;
          }
          .blue-border{
            border: 0.34rem solid #5aa0ff;
            color: #5aa0ff;
            font-size: .7rem;
          }
          .white-border{
            border: 0.34rem solid #9c9c9c;
            color: #9c9c9c;
            font-size: .7rem;
          }
          .green-border{
            border:0.34rem solid #8fbcfa;
            color: #8fbcfa;
            font-size: .7rem;
          }
        }
      }
    }
  }
</style>

