<template>
  <div class="first" style="overflow-y: scroll;">
    <div class="header">
      <div class="headerall">
        <a @click="back" href="javascript:history.back(-1);" class="a1"></a>
        <!--<a @click="back" class="a1"></a>-->
        <span class="forget">查找好友</span>
      </div>

    </div>

    <!--<div class="navall">-->
      <div class="navall-t" style="position: fixed;top:1rem;">
        <div class="input">
          <p class="p1"></p>
          <input type="text" class="txt" @keyup.13="getSearch" ref="kw" />
          <input type="button" class="btn" value="搜索" @click="getSearch"/>
        </div>
      </div>

      <div class="page-loadmore backtop" style="position:relative;top:2.1rem;bottom:0;overflow:scroll;font-size: 0.2rem;height: calc(100% - 2.1rem);">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">

          <div>
            <div class="fri">
              <!--<div class="nav">-->
              <!--<a href="#/yesfriend"><p class="li2"><img src="../../../images/peo.png"/></p></a>-->
              <!--<ul>-->
              <!--<li class="li1 l">小燕<span class="sp1">(zlh)</span><span class="sp2"><img src="../../../images/men.png"/></span></li>-->
              <!--<li class="li4 l">悄然无声</li>-->
              <!--<li class="navp"></li>-->
              <!--</ul>-->

              <!--</div>-->
              <div class="nav" v-for="(member,index) in items" :key="index">
                <!--<router-link @click="qcInputKey" style="display: block;width:100%;" :to="{path:'/yesfriend',query:{uid:member.uid}}">-->
                <a @click="qcInputKey(member.uid)">
                  <p class="li2">
                    <img v-if="member.face!=0" :src="member.face"/>
                    <img v-if="member.face==0" src="../../../images/personLogo.png" />
                  </p>
                </a>
                <!--</router-link>-->
                <ul>
                  <!--<router-link @click="qcInputKey" style="display: block;width:100%;" :to="{path:'/yesfriend',query:{uid:member.uid}}">-->
                  <a @click="qcInputKey(member.uid)">
                    <li class="li1 l">{{member.uname}}<span class="sp1" v-if="member.note">({{member.note}})</span><span class="sp2"><img v-if="member.sex==1" src="../../../images/men.png"/><img v-if="member.sex==0" src="../../../images/girl.png"/></span></li>
                  </a>
                  <li style="height: 0.3rem;float:left;margin-left: 0.22rem;">
                    <img  :src="data.icon" alt="" style="height:0.3rem;margin-right:0.1rem;float: left;" v-for="(data,index) in member.usergroup" v-if="data.icon!=''">
                    <span class="li" style="line-height: 0;height: 0;padding: 0.1rem 0.1rem;border-radius: 0.05rem;font-size:0.14rem;margin-right: 0.05rem;margin-top: 0.04rem;color: #fff;margin-left: 0.05rem;float: left;" v-for="(data,index) in member.usergroup" v-if="data.type=='member'" :style="'background:'+data.bcolor">{{data.title}}</span>
                  </li>
                  <!--</router-link>-->
                  <!--<li class="li4 l" v-if="member.signature">{{member.signature}}</li>-->
                  <!--<li class="li4 l" v-if="!member.signature" style="height:0.38rem"></li>-->

                  <li class="li4 l" v-text="member.signature==''?'暂无':member.signature"></li>
                  <!--<a href="#/sixin">-->
                    <li class="navp" @click="isTalking(member.uid,member.uname)"></li>
                  <!--</a>-->
                </ul>
              </div>
              <!--<div class="loading-layer">-->
              <!--<span class="spinner-holder"><img src="../../../images/loading.gif" /></span>-->
              <!--<div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>-->
              <!--</div>-->
              <div class="loading-layer" v-show="loadingshow" style="color: rgb(170, 170, 170);">没有更多数据</div>
            </div>
          </div>

        </mt-loadmore>
      </div>
    <!--</div>-->
    <div class="load" style="display:none;">
      <div class="load-container load4">
        <div class="loader"> <i></i></div>
      </div>
    </div>
    <backtop></backtop>
    <load v-show="isload"></load>
  </div>
</template>
<script>
    import qs from 'qs'
    import { setCookie, getCookie } from '../../../assets/js/cookie.js'
    import {getOpenUrl,getToken} from '../../../assets/js/common.js'
    var topsearch = ''
    var status = 1, start = 1, size = 15, loading = false, end = false;
    export default {
    name:'first',
        data () {
             return {
               isload:false,
               data:'',
               noData: '',
               items: [],
               allLoaded: false,
               scrollMode:"auto",
               topStatus: '',
               st:{},
               loadingshow:false
             };
         },
         mounted(){

           $('.backtop').scroll(()=> {
             this.scroll=$('.backtop').scrollTop();
           })

           this.type   = status;
           this.start  = start = 1;
           this.bottom = size //默认加载15条数据
           loading = end = false;
           var self      = this;

           //this.getData(this.type, this.start, this.bottom);

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

           //是否存在input焦点事件或图层打开事件
           $('input').focus(function(){
             //获取焦点
             let expireDays = 1000 * 60 * 60 ;
             setCookie("inputkey", 1, expireDays);
           });
         },
         methods: {
           back(){
             setCookie("inputkey", '', -1);
             //android.back1();
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
             topsearch=this.scroll;
             var self = this;
             setTimeout(()=> {
               this.start=1;
               self.$http.get(getOpenUrl() + '/user/newFriend', {
                 headers: {
                   "Authorization": "Bearer " + getToken()
                 },
                 params: {
                   kw: self.$refs.kw.value,
                   page: start,
                   limit: size
                 },
               }).then((res) => {
                 self.items.splice(0, self.items.length);
                 self.allLoaded = false;
                 self.loadingshow=false;
                 self.$refs.loadmore.onTopLoaded();
                 var data = res.body.data;
                 self.data = res.body.data;
                 console.log(res.body);
                 if (res.body.count > 0) {
                   $.each(data, function (key, val) {
                     self.items.push(val);
                   });
                 } else {
//                   end = true;
//                   self.noData = "没有更多数据"
                   self.allLoaded = true;
                   self.loadingshow=true;
                 }
                 loading = false;
                 $('.load').hide();
                 $('.first').show();
                 $('div[type="' + this.type + '"]').addClass('isload').show();
               });
             }, 2000);
           },
           loadBottom() { // 加载更多数据的操作
             //this.allLoaded = true;// 若数据已全部获取完毕
             topsearch=this.scroll;
             var self = this;
             self.start+=1;
             setTimeout(function() {
               self.getData(self.type, self.start,size);
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
           qcInputKey(mid){
             setCookie("inputkey", '', -1);
             this.$router.push({path: '/yesfriend',
               query:{uid: mid}
             });
           },
           getData(type, start, size){
             //this.items = [];
             //$('.load').show();
//            console.log(type, status)
             topsearch=0
             this.$store.commit('HOMESTOPF',topsearch)
             $(".backtop").animate({"scrollTop":this.scroll},0)

             if (status !== type && !loading){
               this.items = [];
               end        = false;
               loading    = false;
             }
             status = type;
             var self   = this;

             clearTimeout(this.fn);
             self.fn = setTimeout(function() {
               self.$http.get(getOpenUrl() + '/user/newFriend', {
                 headers: {
                   "Authorization": "Bearer " + getToken()
                 },
                 params: {
                   kw: self.$refs.kw.value,
                   page: start,
                   limit: size
                 },
               }).then((res) => {
                 self.isload = false;
                 $('.loading-layer span').removeClass('active');
                 $('.loading-layer div').removeClass('active');



                 var data = res.body.data;
                 self.data = res.body.data;
                 console.log(res.body);
                 if (res.body.count > 0) {
                   $.each(data, function (key, val) {
                     self.items.push(val);
                   });
                 } else {
//                   end = true;
//                   self.noData = "没有更多数据"
//                   $('.loading-layer div').addClass('active');
                   //self.allLoaded = true;
                   self.loadingshow=true;
                 }
//              console.log(self.items)
                 loading = false;
                 $('.load').hide();
                 $('.first').show();
                 $('div[type="' + type + '"]').addClass('isload').show();
               });
             },500)
           },
           getSearch(){
             this.items = [];
             //$('.load').show();
             this.isload = true;
             this.getData(this.type, start, size);
           },
           isTalking(id, name) {
             this.$http.get(getOpenUrl() + "/pandMsg", {
               headers: {
                 "Authorization": "Bearer " + getToken()
               },
               params: {
                 //type:'score'
                 to_id: id
               },
             }).then((res) => {
               if(res.body.code=="0000"){
                 setCookie("inputkey", '', -1);
                 this.$router.push({
                   path: '/sixin',
                   query: {
                     list_id: res.body.list_id,
                     to_id: id,
                     uname: name
                   }
                 });
               }
             });
           },
         },
          activated(){
            //路由缓存 前进后退
            $('.load').hide();

            console.log(this.scroll)
            $(".backtop").animate({"scrollTop":this.scroll},0)
          },
          beforeRouteLeave (to, from, next) {
            //路由离开时
            var isInputKey = parseInt(getCookie('inputkey'));
            if (isInputKey == 1){
              setCookie("inputkey", '', -1);
              next(false)
            }else{
            topsearch=this.scroll
              this.$store.commit('HOMESTOPF',topsearch)
              console.log(topsearch)
              next()
            }
          }
    }
</script>
<style scoped>
  .header{height: 0.7rem;width: 100%;z-index: 9999;position: fixed;top: 0;background: #fff;padding-top: 0.3rem;}
  .headerall{padding-left: 0.2rem;}
  .header .a1{width: 0.18rem;height: 0.7rem;display: block;background: url(../../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008DD3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}

  .navall{padding-top: 0.7rem;}
  .navall-t{background: #f5f5f5;width: 100%;padding: 0.31rem 0;z-index: 99;}
  .input{width: 5.98rem;height: 0.5rem;border: 1px solid #ebebeb;margin: 0 auto;background: #fff;border-radius: 0.05rem;}
  .input .p1{float:left;width:0.65rem;height:0.24rem;background: url(../../../images/searchb.png)no-repeat 0.21rem 50%;background-size: 0.24rem 0.24rem;border-right: 0.01rem solid #ebebeb;margin-top: 0.12rem;}
  .input input{display: block;float: left;}
  .input .btn{width: 1.12rem;height: 0.5rem;background: #008dd3;font-size: 0.24rem;color: #fff;line-height: 0.5rem;text-align: center;float: right;border-radius: 0.05rem;}
  .input .txt{height: 0.5rem;font-size: 0.24rem;line-height: 0.24rem;padding-left: 0.2rem;color: #242424;}


  .nav{padding-left: 0.2rem;}

  .nav ul{margin-top: 0.26rem;overflow: hidden;padding-bottom: 0.25rem;border-bottom: 0.01rem solid #ebebeb;position: relative;}
  .nav ul .l{float:left;width:100%;}
  .navp{width:0.34rem;height:0.28rem;background: url(../../../images/sixin.png)no-repeat;background-size: 0.34rem 0.28rem;display: block;position: absolute;right: 0.3rem;top: 0.25rem;}


  .li1{line-height:0.41rem;font-size:0.22rem;margin-left: 0.24rem;color: #242424;}
  .li1 .sp1{font-size: 0.2rem;color: #949494;margin-left: 0.08rem;}
  .li1 .sp2 img{width: 0.19rem;height: 0.19rem;margin-left: 0.08rem;}
  .nav .li2 {
    height: 0.62rem;
    width: 0.62rem;
    /*position: relative;*/
    /*overflow: hidden;*/
    border-radius: 50%;
    margin-top: 0.06rem;
    float: left;
  }

  .nav .li2 img {
    width:100%;
    height: 100%;
    object-fit: cover;
    display:block;
    border-radius: 50%;
    /*position: absolute;*/
    /*top: 50%;*/
    /*-webkit-transform: translateY(-50%);*/
    /*-moz-transform: translateY(-50%);*/
    /*-ms-transform: translateY(-50%);*/
    /*-o-transform: translateY(-50%);*/
    /*transform: translateY(-50%);*/
  }
  .nav .li3{height:1.24rem;-bottom:0.01rem solid #e0e0e0;width:4.87rem;float:right;position:relative;}
  .p{height:0.69rem;position: absolute;top: 50%;-webkit-transform: translateY(-50%);-moz-transform: translateY(-50%);-ms-transform: translateY(-50%);-o-transform: translateY(-50%);transform: translateY(-50%);}
  .nav .li3 .p1{font-size:0.26rem;line-height:0.38rem;}
  .nav .li3 p{font-size:0.20rem;}
  .nav .li3 .p2{float:left;line-height:0.31rem;}
  .nav .li3 .p3{margin-left:0.3rem;}
  .nav .li4{line-height: 0.38rem;color: #949494;font-size:0.18rem;margin-left: 0.24rem;}

</style>
