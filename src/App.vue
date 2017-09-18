<template>
	<div>
		<transition :name="transitionName" mode="out-in">
			<keep-alive>
			    <router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    </transition>
    <transition :name="transitionName" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
		<svg-icon></svg-icon>
  </div>
</template>

<script>
	import svgIcon from './components/common/svg';
	import { mapState, mapMutations } from 'vuex';
  import {setStore, getStore} from './config/mUtils'
  	export default {
  	  data(){
  	    return{
//          transitionName: 'slide-left'
        }
      },
    	components:{
            svgIcon
      },
      watch: {
        '$route' (to, from) {
          let that = this;
          // 判断此次路由变化是否为返回和触发
          if(getStore('isRouteBack') === 'true'){
            setStore('isRouteBack', false);
          }else{
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            if( toDepth < fromDepth ){
              this.SET_TRANSITION_NAME('slide-right')
            }else{
              this.SET_TRANSITION_NAME('slide-left')
            }
          }
          setTimeout(()=>{that.SET_TRANSITION_NAME('slide-left')},300)
        }
      },
      computed: {
        ...mapState ([
          'transitionName'
        ])
      },
      methods: {
        ...mapMutations ([
          'SET_TRANSITION_NAME'
        ])
      }
  	}
</script>

<style lang="scss">
  	@import 'assets/css/common';
	/*.router-fade-enter-active, .router-fade-leave-active {*/
	  	/*transition: opacity .3s;*/
	/*}*/
	/*.router-fade-enter, .router-fade-leave-active {*/
	  	/*opacity: 0;*/
	/*}*/


  .slide-left-enter-active, .slide-left-leave-active {
    transition: transform .3s;
  }
  .slide-left-enter {
    transform: translateX(100vw);
	}

  .slide-left-leave-active {
    /*transform: translateX(100vw);*/
  }



  .slide-right-enter-active, .slide-right-leave-active {
    transition: transform .3s;
  }
  .slide-right-enter {
    /*transform: translateX(100vw);*/
	}
  .slide-right-leave-active {
    transform: translateX(100vw);
  }

</style>
