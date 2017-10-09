import Vue from 'vue'
import VueRouter from 'vue-router'
import {routerMode} from '../config/env'
import App from '../App'
import home from '../components/page/home'
import login from '../components/page/login'
import city from '../components/page/city'
import msite from '../components/page/msite'
import search from '../components/page/search'
import forget from '../components/page/forget'
import profile from '../components/page/profile'
import info from '../components/page/profileChildren/info'
import setusername from '../components/page/profileChildren/setusername.vue'
import address from '../components/page/profileChildren/children/address'
import add from '../components/page/profileChildren/children/children/add'
import addDetail from '../components/page/profileChildren/children/children/children/addDetail.vue'
import food from '../components/page/food.vue'
import shop from '../components/page/shop/shop.vue'
import foodDetail from '../components/page/shop/children/foodDetail'
import shopDetail from '../components/page/shop/children/shopDetail'
import shopSafe from '../components/page/shop/children/children/shopSafe'
import confirmOrder from '../components/page/confirmOrder/confirmOrder.vue'
import remark from '../components/page/confirmOrder/children/remark.vue'
import invoice from '../components/page/confirmOrder/children/invoice.vue'
import payment from '../components/page/confirmOrder/children/payment.vue'
import userValidation from '../components/page/confirmOrder/children/userValidation.vue'
import chooseAddress from '../components/page/confirmOrder/children/chooseAddress.vue'
import addAddress from '../components/page/confirmOrder/children/children/addAddress.vue'
import searchAddress from '../components/page/confirmOrder/children/children/children/searchAddress.vue'
import vipcard from '../components/page/vipcard/vipcard.vue'
import invoiceRecord from '../components/page/vipcard/children/invoiceRecord.vue'
import useCart from '../components/page/vipcard/children/useCart.vue'
import vipDescription from '../components/page/vipcard/children/vipDescription.vue'
import order from '../components/page/order/order.vue'
import orderDetail from '../components/page/order/children/orderDetail.vue'
import download from '../components/page/download.vue'
import balance from '../components/page/balance/balance.vue'
import balanceDetail from '../components/page/balance/children/detail.vue'
import benefit from '../components/page/benefit/benefit.vue'
import coupon from '../components/page/benefit/children/coupon.vue'
import hbDescription from '../components/page/benefit/children/hbDescription.vue'
import hbHistory from '../components/page/benefit/children/hbHistory.vue'
import exchange from '../components/page/benefit/children/exchange.vue'
import commend from '../components/page/benefit/children/commend.vue'
import points from '../components/page/points/points.vue'
import pointsDetail from '../components/page/points/children/detail.vue'

Vue.use(VueRouter)

const router =  new VueRouter({
  // history: true,
  mode: routerMode,
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition ||0}
    }
  },
  routes: [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
      //地址为空时跳转home页面
      {
        path: '',
        redirect: '/home'
      },
      //首页城市列表页
      {
        path: '/home',
        component: home
      },
      {
        path: '/login',
        component: login
      },
      {
        path: '/city/:cityid',
        component: city
      },
      {
        path: '/msite',
        component: msite,
        // meta: { keepAlive: true }
      },
      {
        path: '/search/:geohash',
        component: search
      },
      {
        path: '/forget',
        component: forget
      },
      {
        path: '/profile',
        component: profile,
        children: [{
          path: 'info',
          component: info,
          children: [{
            path: 'address',
            component: address,
            children: [{
              path: 'add',
              component: add,
              children: [{
                path: 'addDetail',
                component: addDetail
              }]
            }]
          }]
        },
          {
            path: 'setusername',
            component: setusername,
          },
        ]
      },
      {
        path: '/food',
        component: food
      },
      {
        path: '/shop',
        component: shop,
        children: [{
          path: 'foodDetail', //食品详情页
          component: foodDetail,
        }, {
          path: 'shopDetail', //商铺详情页
          component: shopDetail,
          children: [{
            path: 'shopSafe', //商铺安全认证页
            component: shopSafe,
          }, ]
        }]
      },
      {
        path: '/confirmOrder',
        component: confirmOrder,
        children: [{
          path: 'remark', //订单备注
          component: remark,
        }, {
          path: 'invoice', //发票抬头
          component: invoice,
        }, {
          path: 'payment', //付款页面
          component: payment,
        }, {
          path: 'userValidation', //用户验证
          component: userValidation,
        }, {
          path: 'chooseAddress', //选择地址
          component: chooseAddress,
          children: [{
            path: 'addAddress', //添加地址
            component: addAddress,
            children: [{
              path: 'searchAddress', //搜索地址
              component: searchAddress,
            }]
          }, ]
        }, ]
      },
      {
        path: '/vipcard',
        component: vipcard,
        children: [{
          path: 'invoiceRecord', //开发票
          component: invoiceRecord,
        }, {
          path: 'useCart', //购买会员卡
          component: useCart,
        }, {
          path: 'vipDescription', //会员说明
          component: vipDescription,
        },]
      },
      {
        path: '/order',
        component: order,
        children: [{
          path: 'orderDetail', //订单详情页
          component: orderDetail,
        }, ]
      },
      {
        path: '/download',
        component: download
      },
      {
        path: 'balance',
        component: balance,
        children: [{
          path: 'detail', //余额说明
          component: balanceDetail,
        }, ]
      },
      {
        path: 'benefit',
        component: benefit,
        children: [{
          path: 'coupon', //代金券说明
          component: coupon,
        }, {
          path: 'hbDescription', //红包说明
          component: hbDescription,
        }, {
          path: 'hbHistory', //历史红包
          component: hbHistory,
        }, {
          path: 'exchange', //兑换红包
          component: exchange,
        }, {
          path: 'commend', //推荐有奖
          component: commend,
        },]
      },
      {
        path: 'points',
        component: points,
        children: [{
          path: 'detail', //积分说明
          component: pointsDetail,
        }, ]
      },
    ]
  }]
})

router.beforeEach((to, from, next) => {
  if (from.meta.keepAlive) {
    from.meta.savedPosition = document.body.scrollTop;
  }
  next()
})

export default router

