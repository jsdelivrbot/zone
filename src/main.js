// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from "vue-resource"
import Footer from './components/public/Footer.vue'
import Header from './components/public/Header.vue'
import Pop from './components/public/Pop.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'vue-awesome-swiper/dist/vue-awesome-swiper.min.css' //1.1.10之后的版本，css被放在了单独的文件中，方便替换
import $ from 'jquery'
import vueEventCalendar from 'vue-event-calendar'
import 'vue-event-calendar/dist/style.css' //1.1.10之后的版本，css被放在了单独的文件中，方便替换
import Backtop from './components/public/Backtop.vue'
import load from './components/public/Loading.vue'
import imgView from './components/public/imgView.vue'

import VueScroller from 'vue-scroller'
Vue.use(VueScroller)


Vue.use(vueEventCalendar, {locale: 'zh'}) //可以设置语言，支持中文和英文
Vue.component(Footer.name, Footer)
Vue.component(Header.name, Header)
Vue.component(Pop.name, Pop)
Vue.component(Backtop.name, Backtop)
Vue.component(load.name, load)
Vue.component(imgView.name, imgView)
Vue.use(VueResource)
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

//时间日期插件
import Calendar from 'vue2-datepick';
Vue.use(Calendar);

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)
//懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
	preLoad: 1.3,
	error: './static/lazy-wrong.png',
	loading: './static/lazy-load.gif',
	attempt: 1
});
//微信分享
//import { wechatShare } from './assets/js/wechat'; //这里我脚手架配置过Alias，没有配过可直接相对路径来寻找
//window.wechatShare  = wechatShare
import SocialSharing from 'vue-social-sharing';
Vue.use(SocialSharing);
//解决点击300ms延迟
// import FastClick from 'fastclick'
// FastClick.attach(document.body);
//高德地图
import AMap from 'vue-amap';
Vue.use(AMap);

//图片预览
import wcView from 'wc-view';
import 'wc-view/style.css';
Vue.use(wcView);


//压缩图片
import lrz from 'lrz'
//Vue.use(lrz)
// 初始化vue-amap
AMap.initAMapApiLoader({
	// 申请的高德key
	key: 'cd36f59f90e23a57f7a03f897f2228dc',
	// 插件集合
	plugin: ['AMap.PlaceSearch', 'AMap.Geolocation']
});

//mint ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui';
Vue.use(Mint);


import { Popup } from 'mint-ui';
Vue.component(Popup.name, Popup);

//动画
import 'vue2-animate/dist/vue2-animate.min.css';

//提示弹框
import {Alert, Confirm, Toast} from 'wc-messagebox'
import 'wc-messagebox/style.css'
Vue.use(Toast);

import store from './vuex/store'

new Vue({
	el: '#app',
	router,
  store,
	template: '<App/>',
	components: { App },
	data: {
		eventHub: new Vue()
	}
});
