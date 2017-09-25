<template>
    <div class="msite">
        <div class="top top_header">
          <router-link to="/home" class="msite_title">
            <span class="icon">
              <svg class="index-2PFNE" style="width: .8rem;height: .8rem;fill: #fff;font-weight: 700;"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#location"></use></svg>
            </span>
            <span class="title_text ellipsis">{{msiteTitle}}</span>
          </router-link>
          <div class="weather">
            <div class="left"><p>29°</p><p>晴天</p></div>
            <div class="right"><img src="//fuss10.elemecdn.com/e/85/614c1229282673bb8609909812e76png.png?imageMogr/format/webp/thumbnail/!69x69r/gravity/Center/crop/69x69/" alt="weather"></div>
          </div>
        </div>
        <head-top signin-up='msite' class="search_header">
          <router-link :to="'/search/' + geohash" class="link_search" slot="search">
            <div class="icon">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <circle cx="8" cy="8" r="7" stroke="rgb(0,0,0)" stroke-width="1" fill="none"/>
                <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(0,0,0);stroke-width:2"/>
              </svg>
            </div>
            <span class="place">搜索商家、商品名称</span>
          </router-link>
          <!--<router-link to="/home" slot="msite-title" class="msite_title">-->
          <!--<span class="title_text ellipsis">{{msiteTitle}}</span>-->
          <!--</router-link>-->
        </head-top>
        <div class="header_bottom">
          <ul class="nav_wrapper">
            <li v-for="item in 10" :key="item" class="header_nav">快乐柠檬</li>
          </ul>
        </div>

    	<nav class="msite_nav">
    		<div class="swiper-container" v-if="foodTypes.length">
		        <div class="swiper-wrapper">
		            <div class="swiper-slide food_types_container" v-for="(item, index) in foodTypes" :key="index">
	            		<router-link :to="{path: '/food', query: {geohash, title: foodItem.title, restaurant_category_id: getCategoryId(foodItem.link)}}" v-for="foodItem in item" :key="foodItem.id" class="link_to_food">
	            			<figure>
	            				<img :src="imgBaseUrl + foodItem.image_url">
	            				<figcaption>{{foodItem.title}}</figcaption>
	            			</figure>
	            		</router-link>
		            </div>
		        </div>
		        <div class="swiper-pagination"></div>
		    </div>
		    <img src="../../assets/img/fl.svg" class="fl_back animation_opactiy" v-else>
    	</nav>
    	<div class="shop_list_container">
	    	<header class="shop_header">
	    		<svg class="shop_icon">
	    			<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
	    		</svg>
	    		<span class="shop_header_title">附近商家</span>
	    	</header>
	    	<shop-list v-if="hasGetData" :geohash="geohash"></shop-list>
    	</div>
    	<foot-guide></foot-guide>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
// import {imgBaseUrl} from 'src/config/env'
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import shopList from 'src/components/common/shoplist'
import {msiteAdress, msiteFoodTypes, position} from 'src/service/getData'
import 'src/assets/js/swiper.min.js'
import 'src/assets/css/swiper.min.css'

export default {
	data(){
        return {
        	geohash: '', // city页面传递过来的地址geohash
            msiteTitle: '请选择地址...', // msiet页面头部标题
            foodTypes: [], // 食品分类列表
            hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
            imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
        }
    },
    async beforeMount(){
      if (!this.$route.query.geohash) {
        const address = await position();
        this.geohash = address.latitude + ',' + address.longitude;
      }else{
        this.geohash = this.$route.query.geohash
      }
      //保存geohash 到vuex
      this.SAVE_GEOHASH(this.geohash);
    	//获取位置信息
    	let res = await msiteAdress(this.geohash);
    	this.msiteTitle = res.name;
    	// 记录当前经度纬度
    	this.RECORD_ADDRESS(res);

    	this.hasGetData = true;
    },
    mounted(){
        //获取导航食品类型列表
       	msiteFoodTypes(this.geohash).then(res => {
       		let resLength = res.length;
       		let resArr = [...res]; // 返回一个新的数组
       		let foodArr = [];
    		for (let i = 0, j = 0; i < resLength; i += 8, j++) {
    			foodArr[j] = resArr.splice(0, 8);
    		}
    		this.foodTypes = foodArr;
        }).then(() => {
        	//初始化swiper
        	new Swiper('.swiper-container', {
		        pagination: '.swiper-pagination',
		        loop: true
		    });
        })
    },
    components: {
    	headTop,
    	shopList,
    	footGuide,
    },
    computed: {

    },
    methods: {
    	...mapMutations([
    		'RECORD_ADDRESS', 'SAVE_GEOHASH'
    	]),
    	// 解码url地址，求去restaurant_category_id值
    	getCategoryId(url){
    		let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name',''));
    		if (/restaurant_category_id/gi.test(urlData)) {
    			return JSON.parse(urlData).restaurant_category_id.id
    		}else{
    			return ''
    		}
    	}
    },
    watch: {

    }
}

</script>

<style lang="scss" scoped>
    @import '../../assets/css/mixin';
    .top_header{
      background-image: linear-gradient(90deg,#0af,#0085ff);
      .weather{
        float: right;
        @include wh(16%, 100%);
        box-sizing:border-box;
        padding:.2rem 0;
        margin-right: 0.2rem;
        .left{
          float: left;
          width:50%;
          box-sizing: border-box;
          p{
            @include sc(.5rem, #fff);
            text-align: center;
          }
        }
        .right{
          float: left;
          width:50%;
          padding:.1rem 0;
          img{
            width:100%;
          }
        }
      }
    }
    .top{
      @include wh(100%, 1.95rem);
    }
    .msite .search_header{
      position: sticky;
      top:-1px;
    }

	.link_search{
		@include wh(96%, 1.6rem);
		@include center;
    background-color: #fff;
    text-align: center;
    @include sc(.6rem,#000);
    padding-top: .3rem;
    .icon{
      display: inline-block;
      @include wh(.8rem,.8rem);
      vertical-align: bottom;
    }
	}
  .header_bottom{
    background-image: linear-gradient(90deg,#0af,#0085ff);
    overflow: hidden;
    overflow-x: auto;
    .nav_wrapper{
      width:100rem;
      white-space: nowrap;
      .header_nav{
        float: left;
        @include sc(.6rem,#fff);
        padding:.5rem;
      }
    }
  }
	.msite_title{
        float: left;
        max-width: 70%;
        color: #fff;
        text-align: center;
        margin-left: 0.5rem;
        line-height: 1.95rem;
    span{
      float: left;
    }
        .title_text{
            @include sc(0.7rem, #fff);
            text-align: center;
          max-width: 90%;
          font-weight: 700;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

    .icon{
      @include wh(.8rem,.8rem);
      margin-right: 2px;
    }
	}
	.msite_nav{
    overflow: hidden;
		background-color: #fff;
		border-bottom: 0.025rem solid $bc;
    padding-bottom: 1rem;
		.swiper-container{
			@include wh(100%, auto);
      overflow: visible;
			.swiper-pagination{
				bottom: -.8rem;
			}
		}
		.fl_back{
			@include wh(100%, 100%);
		}
	}
	.food_types_container{
		/*display:flex;*/
		/*flex-wrap: wrap;*/
		.link_to_food{
      float: left;
			width: 25%;
			padding: 0.3rem 0rem;
			@include fj(center);
			figure{
				img{
					margin-bottom: 0.3rem;
					@include wh(1.8rem, 1.8rem);
				}
				figcaption{
					text-align: center;
					@include sc(0.55rem, #666);
				}
			}
		}
	}
	.shop_list_container{
		margin-top: .4rem;
		border-top: 0.025rem solid $bc;
		background-color: #fff;
		.shop_header{
			.shop_icon{
				fill: #999;
				margin-left: 0.6rem;
				vertical-align: middle;
				@include wh(0.6rem, 0.6rem);
			}
			.shop_header_title{
				color: #999;
				@include font(0.55rem, 1.6rem);
			}
		}
	}

</style>
