
import Vue from 'vue'
import App from './App'
import router from './router'             //路由
import {Common} from './common/base'  //公用js
// import Mint from 'mint-ui';       //ui框架组件
import 'mint-ui/lib/style.css';    //ui样式
import axios from 'axios';        //ajax请求组件
import Qs from 'qs'               //axios post 请求数据格式转换工具
import {api} from  './api/api'    //接口总汇
import store from './store'       //vuex状态管理

Vue.prototype.$main = Common;
Vue.prototype.$http = axios;
Vue.prototype.$qs = Qs;
Vue.prototype.api = api;
Vue.prototype.$store = store;
// Vue.use(Mint);
Vue.config.productionTip = false;

require('./assets/less/base.less');   //引入基础css
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

router.beforeEach((to, from, next) => {
  if (to.name == Vue.prototype.$store.state.backMsg){
    Vue.prototype.$store.state.isBack = true;
  }else{
    Vue.prototype.$store.state.isBack = false;
  }
  Vue.prototype.$store.state.backMsg = from.name;
  next()
})
