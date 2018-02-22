<!-- 理财列表 -->
<template>
  <div>
    <div class="main-warp">
      <div class="top-bar">
        <ul>
          <li :class="chose == 0 ? 'active':'' " @click="choseClass(0)">全部</li>
          <li :class="chose == 1 ? 'active':'' " @click="choseClass(1)">散标列表</li>
          <li :class="chose == 2 ? 'active':'' " @click="choseClass(2)">债权转让</li>
        </ul>
      </div>
      <div v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-immediate-check = "false"
           infinite-scroll-distance="5">
        <template>
          <div v-show="chose == 0" style="display: none">
            <div class="common-warp template-one-warp" v-if="productOne.mainData && productOne.mainData.length > 0">
              <div class="template"  v-for="item in productOne.mainData" @click="goRouter(item.bid,1)">
                <div class="left-div">
                  <p class="first-p">{{item.name}}
                    <button v-if="item.flag == 3">抵押</button>
                    <button  class="new" v-if="(item.isxs&16) == 16">新手</button>
                  </p>
                  <div class="second-div">
                    <ul>
                      <li class="big-li">{{item.borrow_apr}}<span>%</span></li>
                      <li>{{priceFormat(parseInt(item.account)/10000)}}<span>万</span></li>
                      <li v-if="item.days > 0">
                        <font v-if="item.min_period && Number(item.min_period) > 0">{{item.min_period - item.days}}</font>
                        <font v-else>{{item.days}}</font>
                        <span>天</span>
                      </li>
                      <li v-else>{{item.borrow_period}}<span>个月</span></li>

                    </ul>
                  </div>
                  <div class="third-div">
                    <ul>
                      <li class="big-li">年化利率</li>
                      <li>借款金额</li>
                      <li>借款期限</li>
                    </ul>
                  </div>
                </div>
                <div class="right-div">
                  <canvas v-if="item.status == 1 && item.lefttime > 0 " class="myCanvas noDraw" :data-info="item.borrow_account_scale" status="1"></canvas>
                  <canvas v-if="item.status == 1 && item.lefttime <= 0 "  class="myCanvas noDraw" :data-info="item.borrow_account_scale" status="2">已过期</canvas>
                  <canvas v-if="item.status == 3" class="myCanvas noDraw" :data-info="item.borrow_account_scale" status="3">收益中</canvas>
                  <canvas v-if="item.status == 4" class="myCanvas noDraw" :data-info="item.borrow_account_scale" status="4">未通过</canvas>
                  <canvas v-if="item.status == 5" class="myCanvas noDraw" :data-info="item.borrow_account_scale" status="5">已取消</canvas>
                  <canvas v-if="item.status == 6" class="myCanvas noDraw" :data-info="item.borrow_account_scale" status="6">已结束</canvas>
                  <canvas v-if="item.status == 8" class="myCanvas noDraw" :data-info="item.borrow_account_scale" status="8">复审中</canvas>
                </div>
              </div>
            </div>
            <loadingNot v-else></loadingNot>
          </div>
        </template>
        <template>
          <div v-show="chose == 1" style="display: none">
            <div class="common-warp template-two-warp" v-if="productTwo.mainData && productTwo.mainData.length > 0">
              <div class="template"  v-for="item in productTwo.mainData" @click="goRouter(item.bid,1)">
                <div class="left-div">
                  <p class="first-p">{{item.name}}
                    <button v-if="item.flag == 3">抵押</button>
                    <button  class="new" v-if="(item.isxs&16) == 16">新手</button>
                  </p>
                  <div class="second-div">
                    <ul>
                      <li class="big-li">{{item.borrow_apr}}<span>%</span></li>
                      <li>{{priceFormat(parseInt(item.account)/10000)}}<span>万</span></li>
                      <li v-if="item.days > 0">
                        <font v-if="item.min_period && Number(item.min_period) > 0">{{item.min_period - item.days}}</font>
                        <font v-else>{{item.days}}</font>
                        <span>天</span>
                      </li>
                      <li v-else>{{item.borrow_period}}<span>个月</span></li>

                    </ul>
                  </div>
                  <div class="third-div">
                    <ul>
                      <li class="big-li">年化利率</li>
                      <li>借款金额</li>
                      <li>借款期限</li>
                    </ul>
                  </div>
                </div>
                <div class="right-div">
                  <canvas v-if="item.status == 1 && item.lefttime > 0 " class="myCanvas noDraw" :data-info="item.borrow_account_scale" status="1"></canvas>
                  <canvas v-if="item.status == 1 && item.lefttime <= 0 "  class="myCanvas noDraw" :data-info="item.borrow_account_scale" status="2">已过期</canvas>
                  <canvas v-if="item.status == 3" class="myCanvas noDraw" :data-info="item.borrow_account_scale" status="3">收益中</canvas>
                  <canvas v-if="item.status == 4" class="myCanvas noDraw" :data-info="item.borrow_account_scale" status="4">未通过</canvas>
                  <canvas v-if="item.status == 5" class="myCanvas noDraw" :data-info="item.borrow_account_scale" status="5">已取消</canvas>
                  <canvas v-if="item.status == 6" class="myCanvas noDraw" :data-info="item.borrow_account_scale" status="6">已结束</canvas>
                  <canvas v-if="item.status == 8" class="myCanvas noDraw" :data-info="item.borrow_account_scale" status="8">复审中</canvas>
                </div>
              </div>
            </div>
            <loadingNot v-else></loadingNot>
          </div>
        </template>
        <template>
          <div v-show="chose == 2" style="display: none">
            <div class="common-warp" id="template-three-warp" v-if="productThree.mainData && productThree.mainData.length > 0">
              <div class="template"  v-for="item in productThree.mainData" @click="goRouter(item.tid,2)">
                <div class="left-div">
                  <p class="first-p">[{{item.cname}}]{{item.name}}</p>
                  <div class="second-div">
                    <ul>
                      <li class="red-font">
                        <!--{{item.trans_price}}-->
                        <span>
                          {{priceFormat(parseInt(item.trans_price)/10000)}}
                        </span>万
                      </li>
                      <li class="red-font">
                        <!--{{item.recover_capital}}-->
                        <span>
                          {{priceFormat(parseInt(item.recover_capital)/10000)}}
                        </span>万
                      </li>
                      <li>{{item.time_h}}</li>
                      <li>{{item.tun}}</li>

                    </ul>
                  </div>
                  <div class="third-div">
                    <ul>
                      <li>转让价格</li>
                      <li>剩余本金</li>
                      <li>发布时间</li>
                      <li>转让账号</li>
                    </ul>
                  </div>
                </div>
                <div class="right-div">
                  <div class="border-common blue-border" v-if="item.status == 0">承接</div>
                  <div class="border-common white-border" v-else>已承接</div>
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
    name:"product",
    data(){
      return {
        on:"money",                       //传值给bottomBar确定是哪个处于on状态
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
      this.getAllProduct();
    },
    methods:{
      priceFormat:function (_num) {
        return this.$main.priceFormat(_num);
      },
      //下拉获取更多数据
      loadMore(){
        if (this.loading == true){
        }else{
          this.loading = true;
          if (this.chose == 0){
              this.productOne.pageIndex ++;
              this.getAllProduct();
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
      getAllProduct(){
        var that = this;
        if (that.productOne.isEnd){
          this.$alert("数据已全部加载");
          that.loading = false;
          return false;
        }
        that.$loading.open("努力加载中");
        this.$http.get(that.api.allProductList,{
            params:{
              pageIndex:that.productOne.pageIndex,
              pageSize:that.productOne.pageSize
            }
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
//        this.$http({
//          method:'post',
//          url:that.api.allProductList,
//          data:that.$qs.stringify({
//            pageIndex:that.productOne.pageIndex,
//            pageSize:that.productOne.pageSize
//          })
//        }).then(function (response) {
//          that.loading = false;
//          that.$loading.close();
//          //如果已经加载完 就给提示 已加载完
//          if (that.productOne.pageIndex * that.productOne.pageSize >= response.data.total){
//            that.productOne.isEnd = true;
//          }
//          that.productOne.mainData = that.productOne.mainData.concat(response.data.data);
//        }).catch(function (response) {
//          that.$loading.close();
//          console.log(response);
//        });
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
        this.$http.get(that.api.productList,{
          params:{
            pageIndex:that.productTwo.pageIndex,
            pageSize:that.productTwo.pageSize
          }
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
//        this.$http({
//          method:'post',
//          url:that.api.productList,
//          data:that.$qs.stringify({
//            pageIndex:that.productTwo.pageIndex,
//            pageSize:that.productTwo.pageSize
//          })
//        }).then(function (response) {
//          that.loading = false;
//          that.$loading.close();
//          //如果已经加载完 就给提示 已加载完
//          if (that.productTwo.pageIndex * that.productTwo.pageSize >= response.data.total){
//            that.productTwo.isEnd = true;
//          }
//          that.productTwo.mainData = that.productTwo.mainData.concat(response.data.data)
//
//        }).catch(function (response) {
//          that.$loading.close();
//          console.log(response);
//        });
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
        this.$http.get(that.api.bondProductList,{
          params:{
            pageIndex:that.productThree.pageIndex,
            pageSize:that.productThree.pageSize
          }
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
//        this.$http({
//          method:'post',
//          url:that.api.bondProductList,
//          data:that.$qs.stringify({
//            pageIndex:that.productThree.pageIndex,
//            pageSize:that.productThree.pageSize
//          })
//        }).then(function (response) {
//          that.loading = false;
//          that.$loading.close();
//          //如果已经加载完 就给提示 已加载完
//          if (that.productThree.pageIndex * that.productThree.pageSize >= response.data.total){
//            that.productThree.isEnd = true;
//          }
//          that.productThree.mainData = that.productThree.mainData.concat(response.data.data)
//
//        }).catch(function (response) {
//          that.$loading.close();
//          console.log(response);
//        });

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
      goRouter(id,index){
        if (index == 1){
          this.$router.push({
            name:'ProductDetail',
            query: {
              id:id
            }
          })
        }else{
          this.$router.push({
            name:'BondDetail',
            query: {
              tid:id
            }
          })
        }

      },
      whereToDraw(){
        if(this.chose !== 2){
          this.drawRing();
        }
      },
      /**
       * canvas画圆
       */
      drawRing(){
        //先创建一个canvas画布对象，设置宽高
        if (this.chose == 0){
          var c = document.querySelectorAll('.noDraw');
        }else if(this.chose == 1) {
          var c = document.querySelectorAll('.noDraw');
        }
        var w =100 ,
          h = 100;
        for (var i = 0, $length = c.length; i < $length; i++) {
          var ctx = c[i].getContext('2d');
          if (c[i].getAttribute("data-info")) {
            var _val = c[i].getAttribute("data-info");
          } else {
            var _val = 0;
          }
          var _status = c[i].getAttribute("status");
          ctx.canvas.width = w;
          ctx.canvas.height = h;
          //圆环有两部分组成，底部灰色完整的环，根据百分比变化的环
          //先绘制底部完整的环
          //起始一条路径
          ctx.beginPath();
          //设置当前线条的宽度
          ctx.lineWidth = 10;//10px
          //设置笔触的颜色
          ctx.strokeStyle = '#f2f2f2';
          //arc()方法创建弧/曲线（用于创建圆或部分圆）arc(圆心x,圆心y,半径,开始角度,结束角度)
          ctx.arc(50, 50, 40, 0, 2 * Math.PI);
          //绘制已定义的路径
          ctx.stroke();

          //绘制根据百分比变动的环
          ctx.beginPath();
          ctx.lineWidth = 10;
          if (_status == 1){
            ctx.strokeStyle = '#5aa0ff';
          }else{
            ctx.strokeStyle = '#a8a8a8';
          }
          //设置开始处为0点钟方向（-90*Math.PI/180）
          //x为百分比值（0-100）
          ctx.arc(50, 50, 40, -90 * Math.PI / 180, (_val * 3.6 - 90) * Math.PI / 180);
          ctx.stroke();
          //绘制中间的文字
          ctx.font = '16px Arial';
          if (_status == 1) {
            ctx.fillStyle = '#5aa0ff';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillText(_val + '%', 50, 50);
          }else{
            ctx.fillStyle = '#a8a8a8';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            if (_status == 2){
              ctx.fillText("已过期",50,50);
            }else if (_status == 3){
              ctx.fillText("收益中",50,50);
            }else if (_status == 4){
              ctx.fillText("未通过",50,50);
            }else if (_status == 5){
              ctx.fillText("已取消",50,50);
            }else if (_status == 6){
              ctx.fillText("已结束",50,50);
            }else if (_status == 8){
              ctx.fillText("复审中",50,50);
            }
          }

          c[i].removeAttribute("class");

        }
      }
    },
    components: {
      bottomBar,
      loadingNot
    },
    updated(){
      this.whereToDraw();
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
          width: 73.5%;
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
              margin-left: 10/@r;
            }
            .new{
              color:#50ba6b;
              border: 1px solid #50ba6b;
            }
          }
          .second-div{
            width: 100%;
            height: 40/@r;
            ul{
              overflow: hidden;
              li{
                width: 32%;
                float: left;
                font-size: .85rem;
                height: 1rem;
                overflow: hidden;
                overflow-x: scroll;
                span{
                  font-size: .6rem;
                }
              }
              .big-li{
                width: 36%;
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
                width: 32%;
                float: left;
                font-size: .7rem;
                color: #adafbb;
              }
              .big-li{
                width: 36%;
              }
            }
          }
        }
        .right-div{
          width: 26%;
          height: 4rem;
          float: right;
          text-align: center;
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
            border: 0.34rem solid #a8a8a8;
            color: #a8a8a8;
            font-size: .7rem;
          }
        }
      }
    }
    #template-three-warp{
      .second-div{
        width: 100%;
        height: 40/@r;
        ul{
          overflow: hidden;
          li{
            width: 25%;
            height: 40/@r;
            float: left;
            font-size: .6rem;
            overflow: hidden;
            overflow-y: scroll;
            overflow-x: scroll;
            }
          .red-font{
            color: #ff0000;
            span{
              font-size: .8rem;
            }
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
            width: 25%;
            float: left;
            font-size: .6rem;
            color: #adafbb;
          }
        }
      }
    }
  }
</style>

