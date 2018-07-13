<template>
  <div id="app">
    <!--<transition :name="transitionName">-->
    	<!--<navigation>-->
      	<!--<router-view class="Router"></router-view>-->
      <!--</navigation>-->
    <!--</transition>-->
    <div v-if="netDown" style="width:100%;background:#ffeeee;position: relative;padding-left: 0.2rem;padding-top: 0.3rem;">
      <img src="./images/other/alert.png" style="padding-top: 0.3rem;width: 0.3rem;position: absolute;top:50%;transform: translateY(-50%);" alt="">
      <p style="font-size: 0.2rem;float:left;padding: 0.2rem 0.4rem;">网路连接不可用</p>
      <div style="clear: both;"></div>
    </div>
    <!--<transition :name="transitionName">-->
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive" class="Router"></router-view>
      </keep-alive>
    <!--</transition>-->
    <my-footer></my-footer>
      <!--<transition :name="transitionName">-->
        <router-view v-if="!$route.meta.keepAlive" class="Router"></router-view>
      <!--</transition>-->
  </div>
</template>

<script>
  import Vue from 'vue'
  import Router from 'vue-router'
  //import {getStatus} from './assets/js/common.js'
export default {
  name: 'app',
  data() {
    return {
      netDown:false,
      transitionName: 'slide-right'  // 默认动态路由变化为slide-right
      //transitionName: 'slide-left'
    }
  },
  mounted(){
//    getStatus();
//    StatusBar.overlaysWebView(false);
//    StatusBar.backgroundColorByName("blue");
//    alert('状态栏：',StatusBar);

    document.addEventListener('online', ()=> {
      this.netDown = false;
//      if (navigator.connection.type == Connection.WIFI) {
//        this.$toast('已经切换到Wifi网络',{
//          duration:'1500'
//        })
//      }else if (navigator.connection.type == Connection.CELL_4G) {
//        this.$toast('当前使用4G网络',{
//          duration:'1500'
//        })
//      }else if (navigator.connection.type == Connection.CELL_2G) {
//        this.$toast('当前使用2G网络',{
//          duration:'1500'
//        })
//      }else if (navigator.connection.type == Connection.CELL_3G) {
//        this.$toast('当前使用3G网络',{
//          duration:'1500'
//        })
//      }
    }, false)

    document.addEventListener('offline', ()=> {
      if(this.$route.path == '/home' || this.$route.path == '/mycircle' || this.$route.path == '/circle' || this.$route.path == '/find' || this.$route.path == '/personal'){
        this.netDown = true;
      }
      this.$toast('当前网络不可用,请检查你的网络设置',{
        duration:'1500'
      })
    }, false)

//    cordova.plugins.Keyboard.shrinkView(true);
//    cordova.plugins.Keyboard.disableScrollingInShrinkView(true);
  },
  watch: {
    '$route'(to, from) {
      //this.transitionName = 'slide-left';
      let isBack = this.$router.isBack;  //  监听路由变化时的状态为前进还是后退
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false;
    }
  }
}
</script>

<style>
  .Router {
    position: absolute;
    width: 100%;
    height:100%;
    transition: all .2s ease-in;
    /*overflow-y:scroll;*/
    -webkit-overflow-scrolling:touch;
    z-index: 1;
    /*top: 40px;*/
  }
  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 1;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 1;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
  }

  .fade-enter-active, .fade-leave-active {
    opacity: 1;
    transition: all .2s ease-in;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
