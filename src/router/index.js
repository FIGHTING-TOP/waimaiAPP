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

