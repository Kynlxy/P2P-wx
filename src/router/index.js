import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Product from '@/components/product/Product'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path: '/ForgetPwd',
      name: 'ForgetPwd',
      component: resolve => require(["@/components/login/Forget_pwd"],resolve),
      //路由懒加载 优化初次打开加载所有组件导致白屏过久 但是 切换路由会有稍许卡顿
      meta: {
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path: '/Register',
      name: 'Register',
      component: resolve => require(["@/components/login/Register"],resolve),
      meta: {
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path: "/Index",
      name: "Index",
      component: resolve => require(["@/components/index/Index"],resolve),
      meta: {
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path: "/Recharge",
      name: "Recharge",
      component: resolve => require(["@/components/index/Recharge"],resolve),
      meta: {
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path: "/SafeCenter",
      name: "SafeCenter",
      component: resolve => require(["@/components/mine/Safe_center"],resolve),
      meta: {
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path: "/RechargeRecord",
      name: "RechargeRecord",
      component: resolve => require(['@/components/mine/Recharge_record'],resolve),
      meta: {
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path: "/Product",
      name: "Product",
      component: Product,
      meta: {
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path: "/Buy",
      name: "Buy",
      component: resolve => require(['@/components/product/Buy'],resolve),
      meta: {
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path: "/DispersedInvestmentRecords",
      name: "DispersedInvestmentRecords",
      component: resolve => require(['@/components/mine/Dispersed_investment_records'],resolve),
      meta: {
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path: "/Receivables",
      name: "Receivables",
      component: resolve => require(['@/components/mine/Receivables'],resolve),
      meta: {
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path: "/Withdrawals",
      name: "Withdrawals",
      component: resolve => require(['@/components/index/Withdrawals'],resolve),
      meta: {
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path: "/PresentRecord",
      name: "PresentRecord",
      component: resolve => require(['@/components/mine/Present_record'],resolve),
      meta: {
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path: "/My",
      name: "My",
      component: resolve => require(['@/components/mine/My'], resolve),
      meta: {
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path: "/RedEnvelopes",
      name: "RedEnvelopes",
      component: resolve => require(['@/components/mine/Red_envelopes'],resolve),
      meta: {
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path: "/Bank",
      name: "Bank",
      component: resolve => require(['@/components/mine/Bank'],resolve),
      meta: {
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path: "/BondInvestmentManagement",
      name: "BondInvestmentManagement",
      component: resolve => require(['@/components/mine/Bond_investment_management'],resolve),
      meta: {
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path: "/AboutUs",
      name: "AboutUs",
      component: resolve => require(['@/components/mine/About_us'],resolve),
      meta: {
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path: "/Depository",
      name: "Depository",
      component: resolve => require(['@/components/mine/Depository'],resolve),
      meta: {
        auth: true // 这里设置，当前路由需要校验
      }
    }, {

      path: "/AutomaticBid",
      name: "AutomaticBid",
      component: resolve => require(['@/components/mine/Automatic_bid'],resolve),
      meta: {
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path: "/ProductDetail",
      name: "ProductDetail",
      component: resolve => require(['@/components/product/Product_detail'],resolve),
      meta: {
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path: "/BondDetail",
      name: "BondDetail",
      component: resolve => require(['@/components/product/Bond_detail'],resolve),
      meta: {
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path: "/ChangePwd",
      name: "ChangePwd",
      component: resolve => require(['@/components/mine/Change_pwd'],resolve),
      meta: {
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path: "/Assessment",
      name: "Assessment",
      component: resolve => require(['@/components/mine/Assessment'],resolve),
      meta: {
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path: "/DepositoryManage",
      name: "DepositoryManage",
      component: resolve => require(['@/components/mine/Depository_manage'],resolve),
      meta: {
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path: '*', redirect: '/Login'
    }
  ]
})
