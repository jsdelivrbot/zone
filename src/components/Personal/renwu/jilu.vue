<template>
  <div class="index" style="overflow-y: scroll;">
    <!--<my-header title="我的任务"></my-header>-->
    <div class="header">
      <div class="headerall">
        <a href="javascript:history.back(-1);" class="a1"></a>
        <span class="forget">我的任务</span>
      </div>
    </div>
    <div class="page-loadmore backtop" style="position:relative;top:1rem;bottom:0;overflow:scroll;font-size: 0.2rem;height: calc(100% - 1rem);">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">

        <div class="cen">
          <!--<a href="#/datiall">-->
          <div class="cenall" v-for="(data,index) in items" :key="index">
            <div class="cenallt">
              <ul class="cent">
                <li class="li1">{{data.name}}</li>
                <li class="li2">奖励{{data.prize}}：<span>{{data.bonus}}</span></li>
                <div style="clear: both;"></div>
              </ul>

              <ul class="cenb">
                <li class="li2">完成时间
                  <span>{{data.updatetime}}</span>
                  <span class="sp2">{{data.taskTime}}</span>
                </li>
                <router-link v-if="data.type" :to="{
                path:'/datiall',
                query:{taskuid:data.taskuid}
              }">
                  <p class="li4">任务详情</p>
                </router-link>
                <div style="clear: both;"></div>
              </ul>
            </div>
          </div>
          <!--</a>-->
          <!--<div class="loading-layer">-->
          <!--<span class="spinner-holder"><img src="../../../images/loading.gif" /></span>-->
          <!--<div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>-->
          <!--</div>-->
          <div class="loading-layer" v-show="loadingshow" style="color: rgb(170, 170, 170);">没有更多数据</div>
        </div>

      </mt-loadmore>
    </div>
    <div class="load" style="display:none;">
      <div class="load-container load4"><div class="loader"> <i></i></div></div>
    </div>
    <backtop></backtop>
    <load v-show="isload"></load>
  </div>
</template>
<script>
import {setCookie,getCookie} from '../../../assets/js/cookie.js'
import {getOpenUrl,getToken} from '../../../assets/js/common.js'
import qs from 'qs'
var status = 1, start = 1, size = 10, loading = false, end = false;
export default {
  data () {
    return{
      isload:false,
      data:'',
      noData: '',
      items: [],
      allLoaded: false,
      scrollMode:"auto",
      topStatus: '',
      st:{},
      loadingshow:false,
    }
  },
  mounted(){
    this.type   = status;
    this.start  = start = 1;
    this.bottom = size //默认加载10条数据
    loading = end = false;
    var self      = this;

    //$('.load').show();
    this.isload = true;

    this.$root.eventHub.$on('jfSuccess',()=>{
      this.items = [];
      this.getData(this.type, this.start, this.bottom);
    })

    this.getData(this.type, this.start, this.bottom);

    $('.cen').css('min-height', $(window).height() - $('div.header').outerHeight());

    //this.tabScroll();
//    $(window).scroll(function(){
//      if(loading || end) return;
//      if($(document).height() - $(window).height() - $(window).scrollTop() < 80){
//        $('.loading-layer span').addClass('active');
//        loading = true;
//        start += size;
//        self.getData(status, start, size);
//      }
//    });
  },
  methods:{
//    tabScroll(){
//      window.addEventListener("scroll",this.toScroll);
//    },
//    toScroll(){
//      if(loading || end) return;
//      if($(document).height() - $(window).height() - $(window).scrollTop() < 80){
//        $('.loading-layer span').addClass('active');
//        loading = true;
//        start += 1;
//        this.getData(status, start, size);
//      }
//    },
    loadTop() { // 刷新数据的操作
      var self = this;
      start = 1;
      setTimeout(()=> {
        start=1;
        this.$http.get(getOpenUrl() + '/myTask', {
          headers: {
            "Authorization": "Bearer " + getToken()
          },
          params:{
            page: start,
            limit: size
          },
        }).then((res)=>{
          var data = res.body.data;
          this.data = res.body.data;
          if (res.body.count > 0){
            self.items.splice(0, self.items.length);
            self.allLoaded = false;
            self.loadingshow=false;
            self.$refs.loadmore.onTopLoaded();
            $.each(data, function(key, val){
              self.items.push(val);
            });
          }else{
            //end = true;
            //self.noData = "没有更多数据"
            self.allLoaded = true;
            self.loadingshow=true;
          }
          loading = false;
          $('.load').hide();
          $('.first').show();
          $('div[type="'+this.type+'"]').addClass('isload').show();
        },function(err) {
          this.$router.push({
            path: '/login',
          });
          console.log('请求失败', err);
        });
      }, 2000);
    },
    loadBottom() { // 加载更多数据的操作
      //this.allLoaded = true;// 若数据已全部获取完毕
      var self = this;
      start+=1;
      setTimeout(function() {
        self.getData(self.type,start,size);
        if(self.st.status==0){
          self.allLoaded = true;
          self.loadingshow=true;
        }
        self.$refs.loadmore.onBottomLoaded();
      }, 2000);

    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    handleBottomChange(status){
      this.bottomStatus = status;
    },
    getData(type, start, size){
//            console.log(type, status)
      if (status !== type && !loading){
        this.items = [];
        end        = false;
        loading    = false;
      }
      status = type;
      var self   = this;

      this.$http.get(getOpenUrl() + '/myTask', {
        headers: {
          "Authorization": "Bearer " + getToken()
        },
        params:{
          page: start,
          limit: size
        },
      }).then((res)=>{
        this.isload = false;
        $('.loading-layer span').removeClass('active');
        $('.loading-layer div').removeClass('active');
        self.st = res.body;
        var data = res.body.data;
        this.data = res.body.data;
        console.log(res.body);
        if (res.body.count > 0){
          $.each(data, function(key, val){
            self.items.push(val);
          });
        }else{
//          end = true;
//          self.noData = "没有更多数据"
          //self.allLoaded = true;
          self.loadingshow=true;
          $('.loading-layer div').addClass('active');
        }
//              console.log(self.items)
        loading = false;
        $('.load').hide();
        $('.first').show();
        $('div[type="'+type+'"]').addClass('isload').show();
      },function(err) {
        this.$router.push({
          path: '/login',
          //query:{gid: res.body.data.gid}
        });
        console.log('请求失败', err);

      });
    },
  },
  beforeDestroy(){
    window.removeEventListener("scroll",this.toScroll);
  },
  activated(){
    //路由缓存 前进后退
    $('.load').hide();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header{height: 0.7rem;box-shadow:0 0 5px #ebebeb;width: 100%;background: #fff;z-index: 11;margin-bottom: 0.05rem; position:fixed;padding-top: 0.3rem;}
  .headerall{padding: 0 0.2rem;}
  .header a{width: 0.18rem;height: 0.7rem;display: block;background: url(../../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}
  .header{position: fixed;top: 0;}
  /*.cen{position: absolute;top: 1.28rem;width: 100%;}*/
  .cenall{width: 5.86rem;margin: 0 auto;}
  .cent{font-size:0.26rem;color: #242424;height: 0.64rem;margin-top: 0.13rem;line-height: 0.64rem;text-align: center;}
  .cent li{float: left;font-size: 0.22rem;}
  .cent .li2{float: right;font-size: 0.18rem;color: #fb6e06;}

  .cenallt{padding-bottom: 0.23rem;overflow: hidden;border-bottom: 0.01rem solid #ebebeb;}
  .cenb li{float: left;height: 0.46rem;line-height: 0.46rem;color: #636363;font-size: 0.16rem;}
  .cenb .li2 .sp2{margin-left: 0.24rem;}
  .cen dl dt img{width: 0.61rem;height: 1.65rem;margin: 0 auto;display: block;margin-top: 0.32rem;}
  .cen dl dd{font-size: 0.29rem;color: #292929;text-align: center;height: 0.73rem;line-height: 0.73rem;}
  .cenb li{float: left;height: 0.46rem;line-height: 0.46rem;color: #636363;font-size: 0.16rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 4.6rem;}
  .li4{width:1.18rem;height:0.42rem;font-size: 0.18rem;color: #0490d6;border: 1px solid #ced8dd;border-radius: 0.05rem;text-align: center;line-height: 0.42rem;float: right;margin-top: 0.2rem;}

</style>
