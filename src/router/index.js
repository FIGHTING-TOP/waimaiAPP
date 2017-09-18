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
        meta: { keepAlive: true }
      },
      {
        path: '/search/:geohash',
        component: search
      },
      {
        path: '/forget',
        component: forget
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

