<!--收款明细-->
<template>
  <div>
    <div class="main-warp">
      <div class="top-bar">
        <ul>
          <li @click="changeTitle(1)">
            <div :class="chose == 0 ? 'active' :''">待收明细</div>
          </li>
          <li @click="changeTitle(2)">
              <div :class="chose == 1 ? 'active' :''">已收明细</div>
          </li>
        </ul>
      </div>
      <div v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-immediate-check = "false"
           infinite-scroll-distance="5">
        <template>
          <div  v-show ="chose == 0" style="display: none">
            <div class="common-warp template-two-warp" v-if="productOne.mainData && productOne.mainData.length > 0">
              <div class="template" v-for="item in productOne.mainData">
                <div class="left-div">
                  <p class="first-p">
                    {{item.name}}
                  </p>
                  <div class="second-div">
                    <ul>
                      <li class="first-li"><span class="big-font">{{item.recover_account}}</span>元</li>
                      <li><span class="big-font">{{item.recover_capital}}</span>元</li>
                      <li><span class="big-font">{{item.recover_interest}}</span>元</li>
                    </ul>
                  </div>
                  <div class="third-div">
                    <ul>
                      <li>待收本息</li>
                      <li>待收本金</li>
                      <li>待收利息</li>
                    </ul>
                  </div>
                </div>
                <div class="right-div">
                  <p class="first-p">未还款</p>
                  <p class="second-p" v-if="item.recover_period == -1">末期/{{item.borrow_period}}</p>
                  <p class="second-p" v-else="item.recover_period == -1">{{item.recover_period}}/{{item.borrow_period}}</p>

                  <p class="second-p">{{item.recover_time}}</p>
                </div>
              </div>
            </div>
            <loadingNot v-else></loadingNot>

          </div>
        </template>
        <template>
          <div v-show="chose == 1" style="display: none">
            <div class="common-warp template-two-warp" v-if="productTwo.mainData && productTwo.mainData.length > 0">
              <div class="template" v-for="item in productTwo.mainData">
                <div class="left-div">
                  <p class="first-p">
                    {{item.name}}
                  </p>
                  <div class="second-div">
                    <ul>
                      <li class="first-li"><span class="big-font">{{item.recover_account}}</span>元</li>
                      <li><span class="big-font">{{item.recover_capital}}</span>元</li>
                      <li><span class="big-font">{{item.recover_interest}}</span>元</li>
                    </ul>
                  </div>
                  <div class="third-div">
                    <ul>
                      <li>总收款</li>
                      <li>本金</li>
                      <li>利息</li>
                    </ul>
                  </div>
                </div>
                <div class="right-div">
                  <p class="first-p">已收款</p>
                  <p class="second-p" v-if="item.recover_period == -1">末期/{{item.borrow_period}}</p>
                  <p class="second-p" v-else="item.recover_period == -1">{{item.recover_period}}/{{item.borrow_period}}</p>

                  <p class="second-p">{{item.recover_yestime}}</p>
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
    name:"receivables",
    data(){
      return {
        on:"my",              //传值给bottomBar确定是哪个处于on状态
        chose:0,                          //topBar 处于active 的class
        loading:true,                    //是否加载数据
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
      }
    },
    mounted(){
      this.getOneProduct();
    },
    methods:{
      changeTitle(index){
        if (index == 1){
          this.chose = 0;
        }else{
          this.chose = 1;
        }
      },
      loadMore(){
        if (this.loading == true){
        }else{
          this.loading = true;
          if (this.chose == 0){
            this.productOne.pageIndex ++;
            this.getOneProduct();
          }else{
            this.productTwo.pageIndex ++;
            this.getTwoProduct();
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
          url:that.api.accountReceivable,
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
          url:that.api.getRecoverHave,
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
      padding-top: 25/@r;
      height: 55/@r;
      background: @ff;
      ul{
        overflow: hidden;
        li{
          width: 50%;
          float: left;
          text-align: center;
          font-size: .7rem;
          div{
            width: 50%;
            height: 50/@r;
            margin: 0 auto;
            cursor: pointer;
          }
          .active{
            color: #5aa0ff;
            border-bottom: 2px solid #5aa0ff;
          }
        }
      }
    }
    .common-warp{
      .template{
        width: 95%;
        padding: 30/@r 0 0 5%;
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
          }
          .second-div{
            width: 100%;
            height: 40/@r;
            ul{
              overflow: hidden;
              li{
                width: 33%;
                float: left;
                height: 40/@r;
                overflow: hidden;
                overflow-x: scroll;
                .big-font{
                  font-size: .8rem;
                  margin-left: .1rem;
                }
                span{
                  font-size: .6rem;
                }
              }
              .first-li{
                color: #fd4400;
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
                width: 33%;
                float: left;
                font-size: .7rem;
                color: #adafbb;
              }

            }
          }
        }
        .right-div{
          float: right;
          width: 25%;
          height: auto;
          overflow: hidden;
          font-size: .65rem;
          text-align: center;
          p{
            margin-bottom: 30/@r;
            color: #b3b5c0;
          }
          .first-p{
            color: #5aa0ff;
          }

        }
      }
    }
  }
</style>
