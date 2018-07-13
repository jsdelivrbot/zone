<template>
    <div class="circular" style="overflow-y: scroll;">
        <!--<my-header title="用户通知"></my-header>-->
      <div class="header">
        <div class="headerall">
          <a @click="back" href="javascript:history.back(-1);" class="a1"></a>
          <span class="forget">用户通知</span>
        </div>
      </div>
      <div class="page-loadmore backtop" style="position:relative;top:1rem;bottom:0;overflow:scroll;font-size: 0.2rem;height: calc(100% - 1rem);">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">

        <div class="first">
            <div class="nav" v-for="(data,index) in items" :key="index">
                <div class="nav-user">
                  <div style="width: 0.68rem;height: 0.68rem;border-radius: 50%;
                  margin-top: 0.3rem;margin-right:0.2rem;float:left;">
                    <img :src="data.face" v-lazy="data.face"/>
                  </div>
                  <!--<img v-if="data.face==0" src="../../images/personLogo.png" />-->

                    <ul class="nav-ul1">
                        <li class="ul-li1">{{data.uname}}</li>
                        <li class="ul-li2">{{data.title}}</li>
                    </ul>
                    <ul class="nav-ul2" v-if="data.type==0">
                      <router-link style="display: block;width:100%;" :to="{path:'/friend',
                        query:{
                          //type:3
                          id:data.message_id
                        }
                       }">
                          <li class="ul-li1">查看</li>
                      </router-link>
                    </ul>
                    <ul class="nav-ul2" v-if="data.type==1">
                      <router-link style="display: block;width:100%;" :to="{path:'/friend',
                        query:{
                          //type:3
                          id:data.message_id
                        }
                       }">
                        <li class="ul-li1">已拒绝</li>
                      </router-link>
                    </ul>
                    <ul class="nav-ul2" v-if="data.type==2">
                      <router-link style="display: block;width:100%;" :to="{path:'/friend',
                        query:{
                          //type:3
                          id:data.message_id
                        }
                       }">
                      <li class="ul-li1">已同意</li>
                      </router-link>
                    </ul>
                </div>
            </div>
            <!--<div class="loading-layer">-->
              <!--<span class="spinner-holder"><img src="../../images/loading.gif" /></span>-->
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
        <!--<my-footer></my-footer>-->
    </div>
</template>
<script>
    import qs from 'qs'
    import { setCookie, getCookie } from '../../assets/js/cookie.js'
    import {getOpenUrl,getToken} from '../../assets/js/common.js'
    var status = 1, start = 1, size = 10, loading = false, end = false;
    export default {
    name:'first',
        data () {
             return {
               noData: '',
               items: [],
               allLoaded: false,
               scrollMode:"auto",
               topStatus: '',
               data:{},
               st:{},
               loadingshow:false
             };
         },
      mounted(){
        this.type   = status;
        this.start  = start = 1;
        this.bottom = size //默认加载10条数据
        loading = end = false;
        $('.load').show();
        var self      = this;

        this.getData(this.type, this.start, this.bottom);

        $('.first').css('min-height', $(window).height() - $('div.header').outerHeight());

//        $(window).scroll(function(){
//          if(loading || end) return;
//          if($(document).height() - $(window).height() - $(window).scrollTop() < 80){
//            $('.loading-layer span').addClass('active');
//            loading = true;
//            //start += size;
//            start += 1;
//            self.getData(status, start, size);
//          }
//        });
        //this.tabScroll();
      },
         methods: {
           back(){
             this.$root.eventHub.$emit('newsSuccess');
           },
//           tabScroll(){
//             window.addEventListener("scroll",this.toScroll);
//           },
//           toScroll(){
//             if(loading || end) return;
//             if($(document).height() - $(window).height() - $(window).scrollTop() < 80){
//               $('.loading-layer span').addClass('active');
//               loading = true;
//               //start += size;
//               start += 1;
//               this.getData(status, start, size);
//             }
//           },
           loadTop() { // 刷新数据的操作
             var self = this;
             setTimeout(()=>{
               self.start=1;
               this.$http.get(getOpenUrl() + '/notifyListData', {
                 headers: {
                   "Authorization": "Bearer " + getToken()
                 },
                 params:{
                   type:this.$route.query.type,
                   page: start,
                   limit: size
                 },
               }).then((res)=>{
                 var data = res.body.data;
                 this.data = res.body.data;
                 //console.log(res.body);
                 if (res.body.limit > 0){
                   self.items.splice(0, self.items.length);
                   self.allLoaded = false;
                   self.loadingshow=false;
                   self.$refs.loadmore.onTopLoaded();
                   $.each(data , function(key, val){
                     self.items.push(val);
                   });
                   if (res.body.limit < size){
                     //end = true;
                   }
                 }else{
//                   end = true;
//                   self.noData = "没有更多数据"
//                   $('.loading-layer div').addClass('active');
                   self.loadingshow=true;
                 }
//              console.log(self.items)
                 loading = false;
                 $('.load').hide();
                 $('.first').show();
                 $('div[type="'+this.type+'"]').addClass('isload').show();
               });
             }, 2000);
           },
           loadBottom() { // 加载更多数据的操作
             //this.allLoaded = true;// 若数据已全部获取完毕
             var self = this;
             self.start+=1;
             setTimeout(function() {
               self.getData(self.type, self.start);
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

             this.$http.get(getOpenUrl() + '/notifyListData', {
               headers: {
                 "Authorization": "Bearer " + getToken()
               },
               params:{
                 type:this.$route.query.type,
                 page: start,
                 limit: size
               },
             }).then((res)=>{
               $('.loading-layer span').removeClass('active');
               $('.loading-layer div').removeClass('active');
               var data = res.body.data;
               this.data = res.body.data;
               //console.log(res.body);
               if (res.body.limit > 0){
                 $.each(data , function(key, val){
                   self.items.push(val);
                 });
                 if (res.body.limit < size){
                   //end = true;
                 }
               }else{
                 end = true;
                 self.noData = "没有更多数据"
                 $('.loading-layer div').addClass('active');
               }
//              console.log(self.items)
               loading = false;
               $('.load').hide();
               $('.first').show();
               $('div[type="'+type+'"]').addClass('isload').show();
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
<style scoped>
  .header{height: 0.7rem;box-shadow:0 0 5px #ebebeb;width: 100%;background: #fff;z-index: 11;margin-bottom: 0.05rem; position:fixed;padding-top: 0.3rem;}
  .headerall{padding: 0 0.2rem;}
  .header a{width: 0.18rem;height: 0.7rem;display: block;background: url(../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}
  /*.first{padding-bottom:0.98rem;}*/
  .nav{padding: 0 0.2rem;}
  .nav-user{height:1.28rem;width:100%;border-bottom:0.01rem solid #ebebeb;}
  .nav-user img{width:100%;height: 100%;border-radius: 50%;object-fit: cover;
    /*position:absolute;top:50%;transform:translateY(-50%);*/
    display:block;float:left;}

  .nav-ul1{float:left;margin-top:0.26rem;}
  .nav-ul1 .ul-li1{line-height:0.39rem;font-size:0.22rem;color:#292929;}
  .nav-ul1 .ul-li2{line-height:0.37rem;font-size:0.2rem;color:#949494;}

  .nav-ul2{float:right;}
  .nav-ul2 .ul-li1{width:1rem;height:0.54rem;line-height:0.54rem;text-align:center;font-size:0.2rem;border-radius:0.27rem;color:#fff;float:right;margin-top:0.37rem;background:#54c2f0;}
</style>
