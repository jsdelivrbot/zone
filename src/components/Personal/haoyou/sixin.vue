<template>
    <div class="first" id="first">
      <!--<my-header :title="tit"></my-header>-->
      <div class="header">
        <div class="headerall">
          <a href="javascript:history.back(-1);" class="a1"></a>
          <span class="forget">{{tit}}</span>
        </div>
      </div>
  		<!--<div id="first" class="first">-->
        <scroller :on-refresh="refresh"  ref="my_scroller" style="margin-top: 1rem;margin-bottom: 0.88rem;">
          <!--<div style="height:0.88rem"></div>-->
            <div class="nav" v-for="(data,index) in items" :key="index">
                <div class="nav-user">
                    <div class="img" v-bind:class="{self:data.is_self}">
                      <img v-if="data.face!=0"  :src="data.hao_face"/>
                      <img v-if="data.face==0" src="../../../images/personLogo.png" />
                    </div>
                    <ul class="nav-ul1" v-show="data.is_self">
                        <li class="ul-li1" v-html="data.content"></li>
                    </ul>
                    <ul class="nav-ul1-fri" v-show="!data.is_self">
                      <li class="ul-li1" v-html="data.content"></li>
                    </ul>
                    <div style="clear:both;"></div>
                </div>
            </div>
        </scroller>
        <!--</div>-->
      	<div class="footer">
            <div class="footer-all">
                <!--<input type="text" placeholder="回复" class="txt" ref="info" style="background-color: #fff;"/>-->
                <textarea placeholder="回复" class="txt" @keyup="ContentFn" ref="info" style="background-color: #fff;"></textarea>
                <input type="button" value="发送" @click="enterInfo" :disabled="isContent" :style="isContent ? 'background:#ccc;' : 'background:#39b6f4'" class="btn"/>
            </div>
        </div>
      <div class="load" style="display:none;">
        <div class="load-container load4"><div class="loader"> <i></i></div></div>
      </div>
      <pop style="text-align: center" class="tip" :title="tip"></pop>
    </div>
</template>
<script>
    import qs from 'qs'
    import { setCookie, getCookie } from '../../../assets/js/cookie.js'
    import {getOpenUrl,getToken} from '../../../assets/js/common.js'
    var status = 1, start = 0, size = 5, loading = false, end = false;
    export default {
    name:'first',
        data () {
             return {
                isContent:true,
                noData: '',
                items: [],
                show:false,
                isshow:false,
                isSixin:'',
                tip:'',
                tit:'',
                listId:''
             };
         },
         mounted(){
           this.type   = status;
           this.start  = start = 0;
           this.bottom = size //默认加载5条数据
           loading = end = false;
           $('.load').show();
           var self      = this;

           //this.goBottom();
           this.getListID();
           this.getData(this.type, this.start, this.bottom);
           this.tit = this.$route.query.uname;
         },
         methods: {
           ContentFn(){
             let input  = /^[\s]*$/;
             if (input.test(this.$refs.info.value) == false){
               this.isContent = false;
             }else{
               this.isContent = true;
             }
           },
             toggle(){
             	this.show=!this.show
             },
             toggle1(){
             	this.isshow=!this.isshow
             },
             getListID(){
               this.listId = this.$route.query.list_id;
             },
           refresh(done) {
             setTimeout(() => {
               start += size;
               this.getData(this.type, start, size)
               done()
             }, 1500)
           },
//           infinite(done) {
//             done(true);
//           },
           getData(type, start, size, op){
//            console.log(type, status)
             if (status !== type && !loading){
               this.items = [];
               end        = false;
               loading    = false;
             }
             status = type;
             var self   = this;

             this.$http.get(getOpenUrl() + '/aloneMsg', {
               headers: {
                 "Authorization": "Bearer " + getToken()
               },
               params:{
                 list_id:this.listId,
                 //to_id:this.$route.query.to_id,
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
                   if (op == 'push'){
                     self.items.push(val);
                   }else {
                     self.items.unshift(val);
                   }
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
           isTalking(){
             if(this.$route.query.list_id==0){
               this.$http.get(getOpenUrl() + "/pandMsg", {
                 headers: {
                   "Authorization": "Bearer " + getToken()
                 },
                 params:{
                   //type:'score'
                 },
               }).then((res)=>{
                 //this.isSixin = res.body.data;
               });
             }else{
               return false;
             }
           },
           enterInfo(){
             setTimeout(()=>{
               this.goBottom();
             },500)
             if(this.$route.query.list_id==0){
               this.$http.post(getOpenUrl() + "/setupMsg", {
                 content:this.$refs.info.value,
                 to_id:this.$route.query.to_id
               },{
                 headers:{"Authorization": "Bearer " + getToken()}
               }).then((res)=>{
                 this.$refs.info.value = '';
                 if (res.body.code == '0000'){
                   this.$root.eventHub.$emit('newsSuccess');
                   this.listId = res.body.list_id;
                   this.getData(this.type, 0, 1, 'push');
                 }else{
                   this.tip = res.body.error_description;
                   $('.tip').show();
                   setTimeout(function(){
                     $('.tip').hide();
                   },1000)
                 }
               });
             }else{
               this.$http.post(getOpenUrl() + "/atOnceMsg", {
                 content:this.$refs.info.value,
                 list_id:this.$route.query.list_id
               },{
                 headers:{"Authorization": "Bearer " + getToken()}
               }).then((res)=>{
                 this.$refs.info.value = '';
                 if (res.body.code == '0000'){
                   this.$root.eventHub.$emit('newsSuccess');
                   this.getData(this.type, 0, 1, 'push');
                 }else{
                   this.tip = res.body.error_description;
                   $('.tip').show();
                   setTimeout(function(){
                     $('.tip').hide();
                   },1000)
                 }
               });
             }
           },
           goBottom(){
             var height = - ((document.getElementsByClassName('_v-content')[0].scrollHeight) - $('._v-container').height());
             if(document.getElementsByClassName('_v-content')[0].scrollHeight > 500){
               document.getElementsByClassName('_v-content')[0].style.webkitTransform="translate(0px,"+height+"px) scale(1)";
             }
           }
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
  .header a{width: 0.18rem;height: 0.7rem;display: block;background: url(../../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}
  .tip{display: none;}
  ._v-container{position: inherit;
    height: calc(100% - 1.76rem) !important;
  }
  .header{position: fixed;top:0;}
  /*.first{padding-bottom:0.88rem;margin-top: 0.48rem;}*/
  .nav{width:6rem;margin:0 auto;}
  .nav-user{width:100%;overflow: hidden;}
  .nav-user .img{width:0.68rem;height:0.68rem;
    border-radius:50%;
    /*overflow:hidden;position:relative;*/
    display:block;float:left;margin-top: .3rem;}
  .nav-user .img img{
    width:100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    /*position:absolute;top:50%;transform:translateY(-50%);*/
    display:block;}
  .nav-user .img.self{float:right;}

  .nav-ul1{background-color:#39b6f4;position:relative;float:right;margin-right:.3rem;box-shadow:0 0 0.2rem #d3eefa;margin-top:0.42rem;border-radius: .1rem;}
  .nav-ul1 .ul-li1{color:#fff;line-height:0.31rem;font-size:0.18rem;max-width: 200px;
    word-break: break-word;
    padding: 0.13rem 0.33rem;}
  .first>>>.nav-ul1 .ul-li1 p img{
    width: 100% !important;
    height: 100% !important;
  }
  .nav-ul1:after{content:"";position:absolute;right:-.15rem;top:.2rem;display:block;
    width: 0;
    height: 0;
    border-top: .1rem solid transparent;
    border-left: .15rem solid #39b6f4;
    border-bottom: .1rem solid transparent;}

  .nav-ul1-fri{position: relative;
    float:left;
    -webkit-box-shadow: 0 0 0.2rem #d3eefa;
    box-shadow: 0 0 0.2rem #d3eefa;
    margin-top: 0.32rem;
    border-radius: .1rem;
    left: 0.3rem;}
  .nav-ul1-fri .ul-li1{color:#333;line-height:0.31rem;font-size:0.18rem;
    /*color:#242424;*/
    padding: 0.13rem 0.33rem;}
  .nav-ul1-fri:after{content:"";position:absolute;left:-.15rem;top:.2rem;display:block;
    width: 0;
    height: 0;
    border-top: .1rem solid transparent;
    border-right: .15rem solid #fff;
    border-bottom: .1rem solid transparent;}

  .footer{position: fixed;bottom:0;height:0.88rem;width:100%;background:#f5f5f5;position:fixed;bottom:0;left:0;}
  .footer-all{width:5.78rem;height:0.52rem;margin:0 auto;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);}
  input{display:block;}
  .txt{
    /*line-height:0.52rem;*/padding-top: 0.15rem;font-size: 0.2rem;
    padding-left:0.77rem;width:3.61rem;height:0.35rem;border: 1px solid #e0e0e0;border-radius:0.4rem;background:url(../../../images/tianxie.png) no-repeat 0.24rem 50%;background-size:0.35rem 0.31rem;float:left;}

  .btn{float: left;width: 1.16rem;height: 0.52rem;line-height: 0.52rem;border-radius:0.4rem;text-align: center;color: #fff;background: #39b6f4;font-size: 0.2rem;float: right;}

</style>
