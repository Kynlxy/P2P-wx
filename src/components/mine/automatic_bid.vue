<!--自动报价-->
<template>
  <div>
    <div class="main-warp">
      <div class="common-div">
        <p>当前净排名:
          <span class="red-font">0</span>/<span class="black-font">1</span>
          <span class="right-span">自动投标&nbsp;&nbsp;<mt-switch class="switch" v-model="allSwitch.switchOne"></mt-switch></span>
        </p>
      </div>
      <div class="common-two-div">
        <div class="common-one-div border-bottom">
          <span>投资上限</span><input type="number">
        </div>
        <div class="common-one-div">
          <span>投资下限</span><input type="number">
        </div>
      </div>
      <div class="common-two-div">
        <div class="common-one-div border-bottom">
          <span class="left-span">不限期&nbsp;&nbsp;
            <mt-switch class="switch" v-model="allSwitch.switchTwo"></mt-switch>
          </span>
          <span class="right-span">可投天数&nbsp;&nbsp;
            <mt-switch class="switch" v-model="allSwitch.switchThree"></mt-switch>
          </span>
        </div>
        <div class="common-one-div">
          <span class="left-span">借款期限&nbsp;&nbsp;</span>
          <span class="right-span">
            <select class="select-div">
              <option value="1">1个月</option>
              <option value="2">2个月</option>
              <option value="3">3个月</option>
              <option value="4">4个月</option>
              <option value="5">5个月</option>
              <option value="6">6个月</option>
              <option value="7">7个月</option>
              <option value="8">8个月</option>
              <option value="9">9个月</option>
              <option value="10">10个月</option>
              <option value="11">11个月</option>
              <option value="12">12个月</option>
              <option value="13">13个月</option>
              <option value="14">14个月</option>
              <option value="15">15个月</option>
              <option value="16">16个月</option>
              <option value="17">17个月</option>
              <option value="18">18个月</option>
              <option value="19">19个月</option>
              <option value="20">20个月</option>
              <option value="21">21个月</option>
              <option value="22">22个月</option>
              <option value="23">23个月</option>
              <option value="24">24个月</option>
              <option value="25">25个月</option>
              <option value="26">26个月</option>
              <option value="27">27个月</option>
              <option value="28">28个月</option>
              <option value="29">29个月</option>
              <option value="30">30个月</option>
              <option value="31">31个月</option>
              <option value="32">32个月</option>
              <option value="33">33个月</option>
              <option value="34">34个月</option>
              <option value="35">35个月</option>
              <option value="36">36个月</option>
            </select>
            ~
            <select class="select-div">
              <option value="1">1个月</option>
              <option value="2">2个月</option>
              <option value="3">3个月</option>
              <option value="4">4个月</option>
              <option value="5">5个月</option>
              <option value="6">6个月</option>
              <option value="7">7个月</option>
              <option value="8">8个月</option>
              <option value="9">9个月</option>
              <option value="10">10个月</option>
              <option value="11">11个月</option>
              <option value="12">12个月</option>
              <option value="13">13个月</option>
              <option value="14">14个月</option>
              <option value="15">15个月</option>
              <option value="16">16个月</option>
              <option value="17">17个月</option>
              <option value="18">18个月</option>
              <option value="19">19个月</option>
              <option value="20">20个月</option>
              <option value="21">21个月</option>
              <option value="22">22个月</option>
              <option value="23">23个月</option>
              <option value="24">24个月</option>
              <option value="25">25个月</option>
              <option value="26">26个月</option>
              <option value="27">27个月</option>
              <option value="28">28个月</option>
              <option value="29">29个月</option>
              <option value="30">30个月</option>
              <option value="31">31个月</option>
              <option value="32">32个月</option>
              <option value="33">33个月</option>
              <option value="34">34个月</option>
              <option value="35">35个月</option>
              <option value="36">36个月</option>
            </select>
          </span>
        </div>

      </div>
      <div class="common-two-div">
        <div class="common-one-div border-bottom">
          <span class="left-span">不限利率&nbsp;&nbsp;
            <mt-switch class="switch" v-model="allSwitch.switchFour"></mt-switch>
          </span>

        </div>
        <div class="common-one-div">
          <span class="left-span">利率范围&nbsp;&nbsp;</span>
          <span class="right-span">
            <select class="select-div">
              <option value="1">1%</option>
              <option value="2">2%</option>
              <option value="3">3%</option>
              <option value="4">4%</option>
              <option value="5">5%</option>
              <option value="6">6%</option>
              <option value="7">7%</option>
              <option value="8">8%</option>
              <option value="9">9%</option>
              <option value="10">10%</option>
              <option value="11">11%</option>
              <option value="12">12%</option>
              <option value="13">13%</option>
              <option value="14">14%</option>
              <option value="15">15%</option>
              <option value="16">16%</option>
              <option value="17">17%</option>
              <option value="18">18%</option>
              <option value="19">19%</option>
              <option value="20">20%</option>
              <option value="21">21%</option>
              <option value="22">22%</option>
              <option value="23">23%</option>
              <option value="24">24%</option>
              <option value="25">25%</option>
            </select>
            ~
            <select class="select-div">
              <option value="1">1%</option>
              <option value="2">2%</option>
              <option value="3">3%</option>
              <option value="4">4%</option>
              <option value="5">5%</option>
              <option value="6">6%</option>
              <option value="7">7%</option>
              <option value="8">8%</option>
              <option value="9">9%</option>
              <option value="10">10%</option>
              <option value="11">11%</option>
              <option value="12">12%</option>
              <option value="13">13%</option>
              <option value="14">14%</option>
              <option value="15">15%</option>
              <option value="16">16%</option>
              <option value="17">17%</option>
              <option value="18">18%</option>
              <option value="19">19%</option>
              <option value="20">20%</option>
              <option value="21">21%</option>
              <option value="22">22%</option>
              <option value="23">23%</option>
              <option value="24">24%</option>
              <option value="25">25%</option>
            </select>
          </span>
        </div>
      </div>
      <div class="common-div" id="last-div">
          <mt-checklist
            title="标的类型"
            v-model="checkList"
            align="right"
            :options="['抵押标', '信用标']">
          </mt-checklist>
      </div>
      <button class="submit">提交</button>
    </div>
    <bottomBar :on="on"></bottomBar>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Toast, Indicator, Switch,Checklist} from 'mint-ui';
  Vue.component(Switch.name, Switch);
  Vue.component(Checklist.name, Checklist);
  import bottomBar from '../common/bottomBar.vue'
  export default({
    name: "AutomaticBid",
    data(){
      return {
        on: "my",             //传值给bottomBar确定是哪个处于on状态
        allSwitch: {           //所有switch相关
          switchOne: false,
          switchTwo: false,
          switchThree: false,
          switchFour:false,
        },
        checkList:[             //底部check存放处

        ]
      }
    },
    methods: {
    },
    components: {
      bottomBar
    }
  })
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import url(../../assets/less/common.less);

  .main-warp {
    color: #878787;
    #last-div{
      height:  auto;
    }
    .common-div {
      margin-top: 30/@r;
      width: 92%;
      height: 100/@r;
      padding: 0 4%;
      background: #ffffff;
      line-height: 100/@r;
      font-size: .75rem;
      .red-font {
        color: red;
      }

    }
    .left-span {
      float: left;
      display: flex;
    }
    .right-span {
      float: right;
      display: flex;
    }
    .common-two-div {
      margin-top: 30/@r;
      width: 100%;
      height: 230/@r;
      background: #ffffff;
      .common-one-div {
        position: relative;
        width: 92%;
        padding-right: 4%;
        margin-left: 4%;
        height: 114/@r;
        line-height: 114/@r;
        font-size: .75rem;
        overflow: hidden;
        input {
          width: 30%;
          height: 40/@r;
          padding: 15/@r;
          margin-left: 3%;
          border-radius: 4px;
          color: #34495e;
          border: 1px solid #e6e6e6;
          font-size: .7rem;
          font-family: "Microsoft Yahei";
          box-shadow: none;
        }
        input:focus {
          background: #fff;
          border-color: #00C490;
        }

      }
      .select-div{
        width: 4.5rem;
        margin: .7rem;
        border-radius: 5px;
        height: 60/@r;
        font-size: .65rem;
        border: 1px solid #ccc;
        background: #ffffff;
      }
      .border-bottom {
        border-bottom: 1px solid #e3e3e3;
      }
    }
    .submit{
      width: 80%;
      height: 80/@r;
      display: block;
      margin: 60/@r auto 200/@r auto;
      border-radius: 5px;
      background: #2187de;
      font-size: .7rem;
      color: #ffffff;

    }
  }
</style>
