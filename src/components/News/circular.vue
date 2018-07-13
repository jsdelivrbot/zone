<template>
  <div class="circular" style="overflow-y: scroll;">
    <!--<div v-show="quanzi">-->
    <!--<my-header :title="tit"></my-header>-->
    <div v-show="quanzi" class="header">
      <div class="headerall">
        <a @click="back" href="javascript:history.back(-1);" class="a1"></a>
        <span class="forget">{{tit}}</span>
      </div>
    </div>
    <div v-show="quanzi" class="page-loadmore backtop" style="position:relative;top:1rem;bottom:0;overflow:scroll;font-size: 0.2rem;height: calc(100% - 1rem);">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="oneloadmore">

        <div class="first" v-if="items">
          <div class="nav" v-for="(data,index) in items" :key="index">
            <div class="nav-user">
              <div style="
              width: 0.68rem;height: 0.68rem;
              border-radius: 50%;
              margin-top: 0.3rem;margin-right:0.2rem;float:left;">
                <img :src="data.face" v-lazy="data.face"/>
              </div>
              <!--<img v-if="data.face==0" src="../../images/personLogo.png" />-->
              <ul class="nav-ul1">
                <li class="ul-li1">{{data.uname}}</li>
                <li class="ul-li2">{{data.data.msg}}</li>
              </ul>
              <ul class="nav-ul2">
                <!--<a href="#/guanli">-->
                <li class="ul-li1" v-bind:class="{isHide:data.data.gid==0}" @click="chakan(data.data.gid,data.data.tid,data.data.type)">查看</li>
                <!--</a>-->
              </ul>
            </div>
          </div>
          <!--<div class="loading-layer">-->
          <!--<span class="spinner-holder"><img src="../../images/loading.gif" /></span>-->
          <!--<div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>-->
          <!--</div>-->
          <div class="loading-layer" v-show="loadingshow" style="color: rgb(170, 170, 170);">没有更多数据</div>
          <!--<div class="nav">-->
          <!--<div class="nav-user">-->
          <!--<img src="../../images/tongzhi.png"/>-->
          <!--<ul class="nav-ul1">-->
          <!--<li class="ul-li1">圈子通知</li>-->
          <!--<li class="ul-li2">已经退出</li>-->
          <!--</ul>-->
          <!--</div>-->
          <!--</div>-->
        </div>

      </mt-loadmore>
    </div>
    <!--<my-footer></my-footer>-->
    <!--</div>-->


    <!--<div v-show="systems">-->
    <!--<my-header :title="tit"></my-header>-->
    <div v-show="systems" class="header">
      <div class="headerall">
        <a @click="back" href="javascript:history.back(-1);" class="a1"></a>
        <span class="forget">{{tit}}</span>
      </div>
    </div>
    <div v-show="systems" class="page-loadmore backtop" style="position:relative;top:1rem;bottom:0;overflow:scroll;font-size: 0.2rem;height: calc(100% - 1rem);">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="twoloadmore">

        <div class="first" v-if="items">
          <div class="nav" v-for="(data,index) in items" :key="index">
            <div class="nav-user">
              <div style="width: 0.68rem;height: 0.68rem;
              border-radius: 50%;
              margin-top: 0.3rem;margin-right:0.2rem;float:left;">
                <img :src="data.face" v-lazy="data.face"/>
              </div>
              <!--<img v-if="data.face==0" src="../../images/personLogo.png" />-->

              <ul class="nav-ul1">
                <li class="ul-li1">{{data.data.tname}}</li>
                <li class="ul-li2" v-html="data.data.content"></li>
              </ul>
            </div>
          </div>
          <!--<div class="loading-layer">-->
          <!--<span class="spinner-holder"><img src="../../images/loading.gif" /></span>-->
          <!--<div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>-->
          <!--</div>-->
          <div class="loading-layer" v-show="loadingshow" style="color: rgb(170, 170, 170);">没有更多数据</div>
          <!--<div class="nav">-->
          <!--<div class="nav-user">-->
          <!--<img src="../../images/tongzhi.png"/>-->
          <!--<ul class="nav-ul1">-->
          <!--<li class="ul-li1">圈子通知</li>-->
          <!--<li class="ul-li2">已经退出</li>-->
          <!--</ul>-->
          <!--</div>-->
          <!--</div>-->
        </div>

      </mt-loadmore>
    </div>
    <!--<my-footer></my-footer>-->
    <!--</div>-->


    <!--<div v-show="answers">-->
    <!--<my-header :title="tit"></my-header>-->
    <div v-show="answers" class="header">
      <div class="headerall">
        <a @click="back" href="javascript:history.back(-1);" class="a1"></a>
        <span class="forget">{{tit}}</span>
      </div>
    </div>
    <div v-show="answers" class="page-loadmore backtop" style="position:relative;top:1rem;bottom:0;overflow:scroll;font-size: 0.2rem;height: calc(100% - 1rem);">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="threeloadmore">

        <div class="first" v-if="items">
          <div class="nav" v-for="(data,index) in items" :key="index">
            <!--<router-link :to="'/subed?id='+data.data.wo_id" style="display: flex;">-->
              <div class="nav-user" @click="todayi(data.data.wo_id)">
                <div style="width: 0.68rem;height: 0.68rem;
                border-radius: 50%;
                margin-top: 0.3rem;margin-right:0.2rem;float:left;">
                  <img :src="data.face" v-lazy="data.face"/>
                </div>
                <!--<img v-if="data.face==0" src="../../images/personLogo.png" />-->

                <ul class="nav-ul1">
                  <li class="ul-li1">{{data.uname}}</li>
                  <li class="ul-li2" v-html="data.data.msg"></li>
                </ul>
                <!--<ul class="answers-ul2" style="position: absolute;right: 0.2rem;-->
                <!--top: 0.2rem;">-->
                <!--<li class="ul-li1" style="    line-height: 0.39rem;-->
                <!--font-size: 0.14rem;-->
                <!--color: #949494;">{{data.ctime}}</li>-->
                <!--</ul>-->
              </div>
            <!--</router-link>-->
          </div>
          <!--<div class="loading-layer">-->
          <!--<span class="spinner-holder"><img src="../../images/loading.gif" /></span>-->
          <!--<div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>-->
          <!--</div>-->
          <div class="loading-layer" v-show="loadingshow" style="color: rgb(170, 170, 170);">没有更多数据</div>
        </div>

      </mt-loadmore>
    </div>
    <!--<my-footer></my-footer>-->
    <!--</div>-->
    <div class="load" style="display:none;">
      <div class="load-container load4"><div class="loader"> <i></i></div></div>
    </div>
    <backtop></backtop>
  </div>
</template>
<script>
    import qs from 'qs'
    import { setCookie, getCookie } from '../../assets/js/cookie.js'
    import {getOpenUrl,getToken} from '../../assets/js/common.js'
    var top = ''
    var status = 1, start = 1, size = 10, loading = false, end = false;
    export default {
    name:'first',
        data () {
             return {
               noData: '',
               items: [],
               isHide:'',
               quanzi:'',
               systems:'',
               answers:'',
               tit:'',
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

           if(this.$route.query.qz == 1){
             this.quanzi = true;
             this.systems = false;
             this.answers = false;
             this.tit = '圈子通知';
           }else if(this.$route.query.qz == 2){
             this.systems = true;
             this.quanzi = false;
             this.answers = false;
             this.tit = '系统通知';
           }else if(this.$route.query.qz == 3){
             this.answers = true;
             this.quanzi = false;
             this.systems = false;
             this.tit = '答疑通知';
           }

           //this.getData(this.type, this.start, this.bottom);

           $('.first').css('min-height', $(window).height() - $('div.header').outerHeight());

//           $(window).scroll(function(){
//             if(loading || end) return;
//             if($(document).height() - $(window).height() - $(window).scrollTop() < 80){
//               $('.loading-layer span').addClass('active');
//               loading = true;
//               //start += size;
//               start += 1;
//               self.getData(status, start, size);
//             }
//           });
           //this.tabScroll();
         },
         methods: {
           todayi(id){
             let isexpert = getCookie('isexpert');
             if(isexpert==1){
               this.$router.push({
                 path:'/zjdetail',
                 query:{
                   id:id
                 }
               });
             }else{
               this.$router.push({
                 path:'/subed',
                 query:{
                   id:id
                 }
               });
             }
           },
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
             top=this.scroll;
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
                 $('.loading-layer span').removeClass('active');
                 $('.loading-layer div').removeClass('active');
                 var data = res.body.data;
                 this.data = res.body.data;
                 //console.log(res.body);
                 if (res.body.limit > 0){
                   self.items.splice(0, self.items.length);
                   if(this.$route.query.qz == 1){
                     self.$refs.oneloadmore.onTopLoaded();
                   }else if(this.$route.query.qz == 2){
                     self.$refs.twoloadmore.onTopLoaded();
                   }else if(this.$route.query.qz == 3){
                     self.$refs.threeloadmore.onTopLoaded();
                   }
                   self.allLoaded = false;
                   self.loadingshow=false;
                   //self.$refs.loadmore.onTopLoaded();
                   $.each(data , function(key, val){
                     self.items.push(val);
                   });
                 }else{
//                   end = true;
//                   self.noData = "没有更多数据"
//                   $('.loading-layer div').addClass('active');
                   self.loadingshow=true;
                 }
                 loading = false;
                 $('.load').hide();
                 $('.first').show();
                 $('div[type="'+this.type+'"]').addClass('isload').show();
               });
             }, 2000);
           },
           loadBottom() { // 加载更多数据的操作
             //this.allLoaded = true;// 若数据已全部获取完毕
             top=this.scroll;
             var self = this;
             self.start+=1;
             setTimeout(function() {
               self.getData(self.type, self.start);
               if(self.st.status==0){
                 self.allLoaded = true;
                 self.loadingshow=true;
               }
               if(self.$route.query.qz == 1){
                 self.$refs.oneloadmore.onBottomLoaded();
               }else if(self.$route.query.qz == 2){
                 self.$refs.twoloadmore.onBottomLoaded();
               }else if(self.$route.query.qz == 3){
                 self.$refs.threeloadmore.onBottomLoaded();
               }
               //self.$refs.loadmore.onBottomLoaded();
             }, 2000);

           },
           handleTopChange(status) {
             this.topStatus = status;
           },
           handleBottomChange(status){
             this.bottomStatus = status;
           },
           getData(type, start, size){
             top=0
             this.$store.commit('HOMESTOPF',top)
             //$(".backtop").animate({"scrollTop":this.scroll},0)

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

               $('.backtop').scroll(()=> {
                 this.scroll=$('.backtop').scrollTop();
               })

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
           chakan(gid,tid,type){
             if(gid&&tid&&type===undefined){
               this.$router.push({path:'/vote', query:{id:tid}});
             }else if(gid&&tid===undefined&&type===undefined){
               this.$router.push({path:'/listcircle', query:{
                 gid:gid,id:gid
               }});
             }else if(gid&&type==='joingroup'){
               this.$router.push({path:'/guanli', query:{
                 gid:gid,
                 type:2
               }});
             }else if(gid&&type==='joinevent'){
               this.$router.push({path:'/attend', query:{
                 tid:tid
               }});
             }
           }
         },
      beforeDestroy(){
        window.removeEventListener("scroll",this.toScroll);
      },
      created(){
        this.getData(this.type, this.start, this.bottom);
      },
      activated(){
        //路由缓存 前进后退
        $('.load').hide();
        $(".backtop").animate({"scrollTop":this.scroll},0)
      },
      beforeRouteLeave(to,from,next){
        top=this.scroll
        this.$store.commit('HOMESTOPF',top)
        next();
      },
    }
</script>
<style scoped>
  .header{height: 0.7rem;box-shadow:0 0 5px #ebebeb;width: 100%;background: #fff;z-index: 11;margin-bottom: 0.05rem; position:fixed;padding-top: 0.3rem;}
  .headerall{padding: 0 0.2rem;}
  .header a{width: 0.18rem;height: 0.7rem;display: block;background: url(../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10!important;
  }
  /*.first{padding-bottom:0.98rem;}*/
  .nav{padding: 0 0.2rem;position: relative;}
  .nav-user{height:1.28rem;width:100%;border-bottom:0.01rem solid #ebebeb;}
  .nav-user img{width:100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    /*position:absolute;top:50%;transform:translateY(-50%);*/
    display:block;float:left;}

  .nav-ul1{float:left;margin-top:0.26rem;}
  .nav-ul1 .ul-li1{line-height:0.39rem;font-size:0.22rem;color:#292929;}
  .nav-ul2 .ul-li1.isHide{display: none;}
  .nav-ul1 .ul-li2{line-height:0.37rem;font-size:0.2rem;color:#949494;}

  .nav-ul2{float:right;}
  .nav-ul2 .ul-li1{width:1rem;height:0.54rem;line-height:0.54rem;text-align:center;font-size:0.2rem;border-radius:0.27rem;color:#fff;float:right;margin-top:0.37rem;background:#54c2f0;}
</style>
