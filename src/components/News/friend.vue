<template>
  <div class="friend">
    <div class="back">
      <a href="javascript:history.back(-1);"></a>
      <!--<a @click="back"></a>-->
      <span class="forget">好友申请</span>
      <span class="body">
        <img :src="data.face" v-lazy="data.face"/>
        <!--<img v-if="data.face==0" src="../../images/personLogo.png" />-->
      </span>
    </div>
    <div class="center">
        <div class="center-t">
            <p class="p1">{{data.uname}}</p>
        </div>
        <div class="center-b">
            <dl>
                <dt class="dt1"></dt>
                <dd class="dd1" v-if="data.sex==1">男</dd>
                <dd class="dd1" v-if="data.sex==0">女</dd>
            </dl>
            <dl>
                <dt class="dt2"></dt>
                <dd class="dd2">{{data.province}}</dd>
            </dl>
            <dl>
                <dt class="dt3"></dt>
                <dd class="dd3">{{data.city}}</dd>
            </dl>
        </div>
    </div>
    <div class="bottom">
        <ul class="bottom-ul">
            <li class="li1">附加消息</li>
            <li class="li3">{{data.content}}</li>
        </ul>
        <ul class="bottom-ul1" v-if="data.type==0">
            <li class="li1" @click="rejected(data.message_id)"><a>拒绝</a></li>
            <li class="li2" @click="tongyi(data.message_id)"><a>同意</a></li>
        </ul>
        <ul class="bottom-ul" v-if="data.type==1">
          <li class="li1">已拒绝该申请</li>
        </ul>
        <ul class="bottom-ul" v-if="data.type==2">
          <li class="li1">已同意该申请</li>
        </ul>
    </div>
    <pop style="text-align: center" class="tip" :title="tip"></pop>
  </div>
</template>
<script>
import {setCookie,getCookie} from '../../assets/js/cookie.js'
import {getOpenUrl,getToken} from '../../assets/js/common.js'
import qs from 'qs'
export default {
  name: 'login',
  data () {
    return{
      data:{},
      tip:''
    }
  },
  mounted(){
    this.getData();
  },
  methods:{
    back(){
      android.back1();
    },
    getData(){
      this.$http.get(getOpenUrl() + "/msgValidate", {
        headers: {
          "Authorization": "Bearer " + getToken()
        },
        params:{
          id:this.$route.query.id
        },
      }).then((res)=>{
        this.data = res.body.data;
      });
    },
    tongyi(id){
      this.$http.get(getOpenUrl() + "/validateSet", {
        headers: {
          "Authorization": "Bearer " + getToken()
        },
        params:{
          type:2,
          id:id
        },
      }).then((res)=>{
        if(res.body.code==='0000'){
          this.getData();
          this.tip = res.body.data;
          $('.tip').show();
          setTimeout(function(){
            $('.tip').hide();
          },1000)
        }
      });
    },
    rejected(id){
      this.$http.get(getOpenUrl() + "/validateSet", {
        headers: {
          "Authorization": "Bearer " + getToken()
        },
        params:{
          type:1,
          id:id
        },
      }).then((res)=>{
        if(res.body.code==='0000'){
          this.getData();
          this.tip = res.body.data;
          $('.tip').show();
          setTimeout(function(){
            $('.tip').hide();
          },1000)
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tip{display: none;}
  .nav{margin:0 auto;width:78%;max-width:500px;padding-top:1rem;}
  .login{height:100%;}
  .back{height:4.43rem;width:100%;background:url(../../images/topbanner.png) no-repeat;background-size:cover;position:relative;}
  .back a{width: 0.18rem;height: 0.34rem;background: url(../../images/back.png) no-repeat;background-size: cover;position: absolute;top: 0.57rem;left: 0.28rem;display: block;}
  .forget{padding-top:0.3rem;line-height:0.88rem;font-size:0.34rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}
  .body{width:1.8rem;height:1.8rem;border-radius:50%;display:block;position:absolute;bottom:-1rem;left:50%;margin-left:-0.9rem;padding:0.1rem;background:#fff;}
  .body img{width:1.8rem;height:1.8rem;border-radius:50%;}

  .center{line-height:0.78rem;color:#51667e;font-size:0.24rem;margin-top:1.03rem;position:relative;text-align:center;}
  .center-t{height:100%;margin:0 auto;width:6rem;display:inline;}
  .center .p1{display:inline;}
  .center-b{padding: 0 0.2rem;border-bottom:0.01rem solid #f0f0f0;overflow:hidden;margin:0 auto;}
  .center-b dl{float:left;width:33.3%;}
  .center-b dt{margin:0 auto;}
  .center-b .dt1{width:0.38rem;height:0.31rem;background:url(../../images/sex.png) no-repeat;background-size:cover;}
  .center-b .dt2{width:0.40rem;height:0.37rem;background:url(../../images/beijing.png) no-repeat;background-size:cover;}
  .center-b .dt3{width:0.40rem;height:0.38rem;background:url(../../images/captail.png) no-repeat;background-size:cover;}
  .center-b .dd1{margin-top:0.07rem;}
  .center-b .dd2{margin-top:0.01rem;}
  .center-b .dd4{margin-top:0.06rem;}

  .bottom-ul .li1{width:100%;height:0.26rem;font-size:0.26rem;text-align:center;color:#000014;margin-top:0.3rem;}
  .bottom-ul .li3{width:4.45rem;line-height:0.32rem;font-size:0.2rem;text-align:center;color:#bcc3cd;margin:0 auto;margin-top:0.24rem;color:#5c7086;}

  .bottom-ul1{width:4.6rem;height:0.56rem;margin:0 auto;margin-top:0.72rem;}
  .bottom-ul1 li{width:2.08rem;height:0.54rem;float:left;border-radius:0.28rem;border: 1px solid #008dd3;}
  .bottom-ul1 li a{width:2.08rem;height:0.54rem;line-height:0.54rem;color:#008dd3;font-size:0.22rem;display:block;text-align:center;border-radius:0.28rem;}
  .bottom-ul1 li a:hover{color:#fff;background:#008dd3;}
  .bottom-ul1 .li2{float:right;}
</style>
