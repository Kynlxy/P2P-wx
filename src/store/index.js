/**
 * Created by kyn on 18/1/10.
 */

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {
  backMsg:"" ,              //路由保存的后一步的信息
  isBack:false,            //是否是返回操作
  information:{             //公司信息
    corporateName:"仁润科技",
    phone:"17767093447",
    web:"www.renrunkeji.com",
    address:"杭州市余杭区仓前街道景兴路999号梦想小镇天使村9号楼",
    customerService:"qq1739029502",
    time:"周一至周日 9.00 -- 18.00"
  },
  iframeIf:false,          //iframe组件是否显示
  myInfo:{}                 //登陆后关于我的信息存放处

};
const mutations = {

};

export default new Vuex.Store({
  state,
  mutations
})

