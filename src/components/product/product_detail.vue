<!--投资产品详情-->
<template>
  <div>
    <div class="main-warp">
      <template v-if="information">
        <div class="detail-banner">
          <div class="common profit ">
            <p><span>{{information.binfo.borrow_apr}}</span>%</p>
            <p>年化收益</p>
          </div>
          <div class="common term" v-if="information.binfo.days > 0">
            <p v-if="information.binfo.min_period && Number(information.binfo.min_period) > 0">
              <span>{{information.binfo.min_period}} - {{information.binfo.days}}</span>天
            </p>
            <p v-else>
              <span>{{information.binfo.days}}</span>天
            </p>
            <p>借款期限</p>
          </div>
          <div class="common term" v-else>
            <p>
              <span>{{information.binfo.borrow_period}}</span>个月
            </p>
            <p>借款期限</p>
          </div>
        </div>
        <div class="second-mask">
          <div class="circle-wrap">
            <div class="circle-inner">
              <div class="circle-inner-bg"></div>
              <span class="mask">{{information.binfo.borrow_account_scale}}<font>%</font></span>
            </div>
          </div>
          <p>{{information.binfo.borrow_account_wait/10000}}万元</p>
          <p>可投金额</p>
        </div>
        <div class="third-li">
          <ul>
            <li>整投标</li>
            <li>还款方式 <span class="right-span">{{information.binfo.show_borrow_style}}</span></li>
            <li>借款金额 <span class="right-span">{{information.binfo.account/10000}}万元</span></li>
          </ul>
        </div>
        <div class="font">继续拖动，查看详情</div>
        <div class="last-div">
          <div class="title">
            <ul>
              <li class="no-right" :class="chose == 0 ? 'active':'' " @click="changeChose(0)">产品详情</li>
              <li class="no-left" :class="chose == 1 ? 'active':'' " @click="changeChose(1)">投资记录<span v-if="list.total > 0">&nbsp;({{list.total}})</span></li>
            </ul>
          </div>
          <div style="clear: both"></div>
          <template>
            <div v-show="chose == 0">
              <div class="small-common-div">
                <div class="information">
                  <p class="small-title-p">用户信息</p>
                  <ul>
                    <li>性别:
                      <span v-if="information.user.sex == 0">女</span>
                      <span v-else>男</span>
                    </li>
                    <li>婚姻状况:
                      <span v-if="information.user.marriage">未婚</span>
                      <span v-else>已婚</span>
                    </li>
                    <li>籍贯:{{information.user.v_area}}</li>
                    <li>所在城市:</li>
                  </ul>
                </div>
                <div class="information">
                  <p class="small-title-p">借款说明</p>
                  <ul>
                    <li>还清期数: {{information.jiekuan.cg}}期</li>
                    <li>待还款: {{information.jiekuan.dh}}期</li>
                    <li>逾期次数: {{information.jiekuan.yq}}期</li>
                  </ul>
                </div>
                <div class="information" v-if="information.diya_list && information.diya_list.length > 0">
                  <p class="small-title-p">车俩信息</p>
                  <ul id="car-information" v-for ="apiece in information.diya_list">
                    <li>车辆品牌：{{apiece.name}}</li>
                    <li>车牌号：{{apiece.chepai}}***</li>
                    <li>公里数：{{apiece.gonglishu}}</li>
                    <li>购买价格：{{apiece.buymoney}}</li>
                    <li>评估价格：{{apiece.money}}</li>
                    <li>审核时间：{{apiece.verify_time}}</li>
                    <li>审核说明：{{apiece.verify_remark.split("").slice(0,6).join("")}}**]</li>
                  </ul>
                </div>
                <div class="information" v-if="information.attention_list && information.attention_list.length > 0">
                  <p class="small-title-p">资料图片</p>
                  <ul id="information-img">
                    <li v-for = "datas in information.attention_list">
                      <img :src="datas.picurl">
                      <p class="odt">{{datas.content}}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </template>
          <template>
            <div v-show="chose == 1">
              <div class="tab-panel">
                <table class="list" v-if="list.mainData && list.mainData.length > 0">
                  <thead>
                  <tr>
                    <td>用户</td>
                    <td>金额(元)</td>
                    <td>时间</td>
                  </tr>
                  </thead>
                  <tbody id="list_tz_show" v-infinite-scroll="loadMore"
                         infinite-scroll-disabled="loading"
                         infinite-scroll-immediate-check = "false"
                         infinite-scroll-distance="5">
                  <tr v-for="item in list.mainData">
                    <td>{{item.mobile.replace(/(\d{3})\d{5}(\d{3})/,'$1*****$2')}}<i class="iconfont icon-phone"></i></td>
                    <td>{{Number(item.account).toLocaleString()}}</td>
                    <td>{{item.time_h.split(' ')[0]}}</td>
                  </tr>
                  </tbody>
                </table>
                <div class="loadingNot" v-else>
                  <img src="../../assets/images/no.png" alt="">
                </div>
              </div>
            </div>
          </template>

        </div>
        <button class="fixed-button" @click="buy()">
          立即投标
        </button>
      </template>

    </div>
    <bottomBar :on="on"></bottomBar>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Toast,Indicator,InfiniteScroll } from 'mint-ui';
  Vue.use(InfiniteScroll);
  import bottomBar from '../common/bottomBar.vue'
  export default({
    name: "ProductDetail",
    data(){
      return {
        on: "money",             //传值给bottomBar确定是哪个处于on状态
        chose: 0,               //下面title数值保存处g
        loading:true,                    //是否加载数据
        list: {                      //投资记录相关存放处
          pageIndex: 1,                    //页码
          pageSize: 8,
          mainData: [],                    //数据存放处
          isEnd: false,                     //是否分组里的所有数据都获取了
          total:0                           //list条数的总条数
        },
        information:""                  //详情页主数据存放处
      }
    },
    mounted(){
      this.getInfo(this.$route.query.id);
      this.getList(this.$route.query.id);
    },
    methods: {
      //下拉获取更多数据
      loadMore(){
        if (this.loading == true) {
        } else {
          this.loading = true;
          this.list.pageIndex++;
          this.getList(this.$route.query.id);
        }
      },
      getInfo(id){
        var that = this;
        this.$http({
          method: 'post',
          url: that.api.productDetail,
          data: that.$qs.stringify({
            bid: id
          })
        }).then(function (response) {
          if (response.data.r == 1){
            that.information = response.data;
          }else{
            this.$alert("数据有误");
          }
        }).catch(function (response) {
          console.log(response);
        });
      },
      getList(id){
        var that = this;
        if (that.list.isEnd){
          this.$alert("数据已全部加载");
          that.loading = true;
          return false;
        }
        that.$loading.open("努力加载中");
        this.$http({
          method:'post',
          url:that.api.detailTenderList,
          data:that.$qs.stringify({
            bid:id,
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
          that.list.mainData = that.list.mainData.concat(response.data.data);
          that.list.total = response.data.total;
        }).catch(function (response) {
          that.$loading.close();
          console.log(response);
        });
      },
      changeChose(index){
        if (index == 0) {
          this.chose = 0
        } else {
          this.chose = 1
        }
      },
      //购买
      buy(){
        this.$main.checkLogin(this.goRouter);

      },
      goRouter(){
        var that = this;
        this.$router.push({
          name:'Buy',
          query: {
            id:that.$route.query.id
          }
        })
      }
    },
    components: {
      bottomBar
    }
  })
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import url(../../assets/less/common.less);

  .main-warp {
    background: @ff;
    .detail-banner {
      position: relative;
      width: 100%;
      height: 440/@r;
      background: url(../../assets/images/productBanner.png) no-repeat center;
      background-size: cover;
      .common {
        position: absolute;
        width: 30%;
        height: 160/@r;
        font-size: .9rem;
        color: #ffffff;
        text-align: center;
        p {
          margin-bottom: 20/@r;
          span {
            font-size: 1.7rem;
            margin-right: 1%;
          }
        }
      }
      .profit {
        top: 2.5rem;
        left: 28%;
      }
      .term {
        top: 4.2rem;
        left: 59%;
      }
    }
    .second-mask {
      position: relative;
      width: 100%;
      height: 130/@r;
      padding-top: 10/@r;
      background: #ffffff;
      p {
        margin-left: 34%;
        font-size: .8rem;
        margin-bottom: .3rem;
        color: #666;
      }
      .circle-wrap {
        position: absolute;
        width: 4rem;
        height: 4rem;
        left: 6%;
        top: -1.3rem;
        text-align: center;
        line-height: 4rem;
        background: #ff877f;
        color: #fff;
        border: 5px solid #fff;
        border-radius: 50%;
        overflow: hidden;
        .mask {
          z-index: 10;
          font-size: 1rem;
          display: inline-block;
          text-align: center;
          -webkit-transform: translateY(0%);
          -moz-transform: translateY(0%);
          transform: translateY(0%);
          font {
            font-size: .8rem;
          }
        }
        .circle-inner-bg {
          width: 4rem;
          height: 4rem;
          position: absolute;
          top: 50%;
          left: 0;
          background: #ff6459;
        }
      }
    }
    .third-li {
      width: 100%;
      height: auto;
      li {
        width: 90%;
        height: 75/@r;
        padding: .5rem 5%;
        background: #fff7f6;
        border-bottom: 1px solid #e6e6e6;
        line-height: 75/@r;
        font-size: .8rem;
        color: #666;
      }
    }
    .font {
      text-align: center;
      width: 100%;
      padding: 50/@r 0;
      font-size: .85rem;
      color: #aaa;
    }
    .right-span {
      float: right;
    }
    .last-div {
      width: 90%;
      padding: 0 5%;
      height: auto;
      padding-bottom: 160/@r;
      .title {
        width: 99%;
        height: 80/@r;
        margin: 0 auto;
        li {
          width: 49%;
          float: left;
          height: 79/@r;
          font-size: .85rem;
          line-height: 79/@r;
          text-align: center;
          color: #5c8cbd;
          border: 1px solid #5c8cbd;
        }
        .no-right {
          border-right: none;
          border-radius: 5px 0 0 5px;
        }
        .no-left {
          border-radius: 0 5px 5px 0;

        }
        .active {
          background: #5c8cbd;
          color: #fff;
        }
      }
      .small-common-div {
        width: 100%;
        height: auto;
        margin-top: 40/@r;
        .information {
          .small-title-p {
            font-size: .8rem;
            line-height: 1.5rem;
          }
          ul {
            overflow: hidden;
            li {
              width: 50%;
              float: left;
              height: 70/@r;
              font-size: .7rem;
              line-height: 70/@r;
              color: #acbcd2;
              overflow: hidden;
              overflow-x: scroll;
            }
          }
          #car-information {
            li {
              width: 100%;
            }
          }
          #information-img {
            li {
              float: left;
              width: 31.5%;
              height: auto;
              padding: 0 5/@r 5/@r;
              img {
                width: 100%;
              }
              .odt {
                white-space: nowrap;
                text-overflow: ellipsis;
                -o-text-overflow: ellipsis;
                overflow: hidden;
                text-align: center;
                color: #666666;
              }
            }
          }
        }
      }
      .tab-panel {
        margin-top: 60/@r;
        height: 440/@r;
        overflow: hidden;
        overflow-y: scroll;
        padding-bottom: 40/@r;
        .list {
          width: 100%;
          td {
            padding: 23/@r 0;
            border-bottom: 1px solid #e6e6e6;
            font-size: .7rem;
            color: #acbcd2;
          }
          tr td:nth-child(1) {
            width: 40%;
          }
          thead td {
            width: 30%;
            color: #666;
            font-size: .8rem;
          }
        }
      }
      .loadingNot {
        height: 440/@r;
        width: 100%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .fixed-button {
      position: fixed;
      bottom: 2.5rem;
      width: 100%;
      height: 100/@r;
      background: #ff6459;
      color: #ffffff;
      font-size: .8rem;
    }
  }
</style>
