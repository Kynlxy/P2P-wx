<template>
  <div>
    <div class="main-warp">
      <div class="answer">
        <p class="total-p">风险评估系统</p>
        <mt-radio
          title="1、您的年龄是?"
          v-model="answer.value1"
          :options="question.one">
        </mt-radio>
        <mt-radio
          title="2、您的家庭年收入为(折合人民币)?"
          v-model="answer.value2"
          :options="question.two">
        </mt-radio>
        <mt-radio
          title="3、在您每年的家庭收入中，可用于金融投资(储蓄存款除外)的比例为？"
          v-model="answer.value3"
          :options="question.three">
        </mt-radio>
        <mt-radio
          title="4、以下哪项最能说明您的投资经验?"
          v-model="answer.value4"
          :options="question.four">
        </mt-radio>
        <mt-radio
          title="5.您有多少年投资股票、基金、外汇、金融衍生产品等风险投资品的经验？"
          v-model="answer.value5"
          :options="question.five">
        </mt-radio>
        <mt-radio
          title="6、以下哪项描述最符合您的投资态度?"
          v-model="answer.value6"
          :options="question.six">
        </mt-radio>
        <mt-radio
          title="7、以下情况，您会选择哪一种？"
          v-model="answer.value7"
          :options="question.seven">
        </mt-radio>
        <mt-radio
          title="8、您计划的投资期限是多久?"
          v-model="answer.value8"
          :options="question.eight">
        </mt-radio>
        <mt-radio
          title="9、您的投资目的是？"
          v-model="answer.value9"
          :options="question.nine">
        </mt-radio>
        <mt-radio
          title="10、您的投资出现何种程度的波动时，您会呈现明显的焦虑？"
          v-model="answer.value10"
          :options="question.ten">
        </mt-radio>
        <mt-radio
          title="11、您是否已充分了解互联网金融知识，了解P2P是网络借贷信息中介，了解收益与风险?"
          v-model="answer.value11"
          :options="question.eleven">
        </mt-radio>
        <mt-radio
          title="12、P2P主要从事网络借贷信息中介，不承诺保本保息，不销售国家禁止的银行理财产品、信托、基金、债券及资产包等。对于上述情况您是否已经清楚地了解并且能够接受?"
          v-model="answer.value12"
          :options="question.twelve">
        </mt-radio>
        <mt-radio
          title="13、本人已经根据自身实际情况，认真填写完成了本问卷，并已充分了解自身的风险承受能力和风险类型，你是否确认？"
          v-model="answer.value13"
          :options="question.thirteen">
        </mt-radio>
        <p style="margin-top: 50px;line-height: 20px;font-size: 16px">
          特别提醒：我们平台为正规的P2P网络借贷信息中介，提供经过严格审核的真实的借贷项目信息，供您选择投资；一起严守国家法规，共筑投资好环境！祝您投资愉快！
        </p>
        <button class="lastSubmit" @click="submit()">提交</button>
      </div>
    </div>
    <bottomBar :on="on"></bottomBar>
  </div>
</template>
<script>

  import {Toast, Indicator, Radio} from 'mint-ui';
  import {Actionsheet} from 'mint-ui';
  import Vue from 'vue';
  import bottomBar from '../common/bottomBar.vue';
  Vue.component(Radio.name, Radio);
  import md5 from 'md5';
  export default({
    name: "Assessment",
    data(){
      return {
        on: "my",             //传值给bottomBar确定是哪个处于on状态
        result:{                  //最后提交信息存放处
          score:0 ,             //分数存放处
          assessment:0,          //风险级别  1.稳健型  2.平衡型  3.成长型  4.进取型
          uid:null
        },
        answer: {             //答案存放处
          value1: null,
          value2:null,
          value3:null,
          value4:null,
          value5:null,
          value6:null,
          value7:null,
          value8:null,
          value9:null,
          value10:null,
          value11:null,
          value12:null,
          value13:null
        },
        question: {
          one: [{
            label: '18~30岁',
            value: '-2'
          },{
            label: '31~50岁',
            value: '0'
          },{
            label: '51~65岁',
            value: '-4'
          },{
            label: '65岁以上',
            value: '-10'
          }],
          //
          two:[{
            label: '5万元以下',
            value: '0'
          },{
            label: '5-20万元',
            value: '2'
          },{
            label: '20-50万元',
            value: '6'
          },{
            label: '50-100万元',
            value: '8'
          },{
            label: '100万元以上',
            value: '10'
          }],
          //
          three:[{
            label: '小于10%',
            value: '2'
          },{
            label: '10%~25%',
            value: '4'
          },{
            label: '25%~50%',
            value: '8'
          },{
            label: '大于50%',
            value: '10'
          }],
          //
          four:[{
            label: '除存款、国债外，我几乎不投资其他金融产品',
            value: '0'
          },{
            label: '大部分投资于存款、国债等，较少投资于股票、基金、P2P等风险产品',
            value: '2'
          },{
            label: '资产均衡地分布于存款、国债、银行理财产品、P2P、股票、基金等',
            value: '6'
          },{
            label: '大部分投资于股票、基金、P2P、外汇等高风险产品，较少投资于存款、国债',
            value: '10'
          }],
          //
          five:[{
            label: '没有经验',
            value: '0'
          },{
            label: '少于2年',
            value: '2'
          },{
            label: '2至5年',
            value: '6'
          },{
            label: '5至8年',
            value: '8'
          },{
            label: '8年以上',
            value: '10'
          }],
          //
          six:[{
            label: '厌恶风险，不希望本金损失，希望获得稳定回报',
            value: '0'
          },{
            label: '保守投资，不希望本金损失，愿意承担一定幅度的收益波动',
            value: '4'
          },{
            label: '寻求资金的较高收益和成长性，愿意为此承担有限本金损失',
            value: '8'
          },{
            label: '希望赚取高回报，愿意为此承担较大本金损失',
            value: '10'
          }],
          //
          seven:[{
            label: '有100%的机会赢取1000元现金',
            value: '0'
          },{
            label: '有50%的机会赢取5万元现金',
            value: '4'
          },{
            label: '有25%的机会赢取50万元现金',
            value: '6'
          },{
            label: '有10%的机会赢取100万元现金',
            value: '10'
          }],
          //
          eight:[{
            label: '1年以下',
            value: '4'
          },{
            label: '1 - 3年',
            value: '6'
          },{
            label: '3 - 5年',
            value: '8'
          },{
            label: '5年以上',
            value: '10'
          }],
          //
          nine:[{
            label: '资产保值',
            value: '2'
          },{
            label: '资产稳健增长',
            value: '6'
          },{
            label: '资产迅速增长',
            value: '10'
          }],
          //
          ten:[{
            label: '本金无损失，但收益未达预期',
            value: '-5'
          },{
            label: '出现轻微本金损失',
            value: '5'
          },{
            label: '本金10%以内的损失',
            value: '10'
          },{
            label: '本金20% - 50%的损失',
            value: '15'
          },{
            label: '本金50%以上的损失',
            value: '20'
          }],
          //
          eleven:[{
            label: '是',
            value: '1'
          },{
            label: '否',
            value: '2'
          }],
          //
          twelve: [{
            label: '是',
            value: '1'
          },{
            label: '否',
            value: '2'
          }],
          thirteen: [{
            label: '是',
            value: '1'
          },{
            label: '否',
            value: '2'
          }]
        }
      }
    },
    mounted(){
      this.getUid();
    },
    methods: {
      getUid(){
        var that = this;
        that.$http({
          method: 'post',
          url: that.api.checkLoginApi,
        }).then(function (response) {
          if (response.data._ME.uid) {
            that.result.uid = response.data._ME.uid
          } else {
            Toast("请先登录后再进行评测");
            setTimeout( function (){
              that.$router.push({ path: '/Login'});
            },2000)
          }
        }).catch(function (response) {
          console.log(response);
        });
      },
      submit(){
        var that = this;
        for (var i in that.answer){
          if (that.answer[i] != null){
            that.result.score = that.result.score + that.answer[i] * 1;
          }else{
            Toast("问题尚未答完!");
            return false;
          }
        }
        if (that.result.score <= 35){
          that.result.assessment = 1;
        }else if (that.result.score > 36 && that.result.score <= 60){
          that.result.assessment = 2;
        }else if (that.result.score > 61 && that.result.score < 85){
          that.result.assessment = 3;
        }else{
          that.result.assessment = 4;
        }
        that.$http({
          method: 'post',
          url: that.api.postAssessment,
          data: that.$qs.stringify({
            assessment:that.result.assessment,
            sum_score: that.result.score,
            web_key:md5(that.result.uid + 'fxpc')
          })
        }).then(function (response) {
          if (response.data.r == 1) {
            Toast(response.data.msg || "评测成功");
            setTimeout(function (){
              that.$router.push({ path: '/SafeCenter'});
            },2000)
          } else {
            Toast(response.data.msg || "出错啦!");
          }
        }).catch(function (response) {
          console.log(response);
        });
      }
    },
    components: {
      bottomBar
    }
  })
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import url(../../assets/less/common.less);

  .total-p {
    font-size: 1rem;
    text-align: center;
  }

  .title-p {
    font-size: .7rem;
    margin-top: 20/@r;
    margin-bottom: 20/@r;

  }

  .submit, .lastSubmit {
    width: 30%;
    height: 1.5rem;
    margin: 40/@r auto 0 auto;
    border-radius: 10px;
    background: #03A9F4;
    color: #ffffff;
    font-size: .7rem;
    display: block;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .question-main {
    margin-top: 30/@r;
  }

  .question-main p {
    line-height: 48/@r;
  }

  .question-main div {
    margin-top: 10px;
  }

  .question-main input[type=radio] {
    margin-right: 10/@r;
    cursor: pointer;
  }

  .answer {
    display: block;
    padding: 20/@r;
    font-size: .7rem;
    background: #ffffff;
  }
</style>
