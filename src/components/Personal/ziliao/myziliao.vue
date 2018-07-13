<template>
  <div class="tjshdz" style="overflow: auto;">
    <div class="header">
        <div class="header1">
            <a href="javascript:history.back(-1);" @click="back" class="a1"></a>
          <!--<a @click="back" class="a1"></a>-->
            <span class="forget">我的资料</span>
            <a class="a2" href="#/bjzl">编辑</a>
        </div>
    </div>
    <div class="body">
    	<div class="list">
    		<span class="sp1 lh1">头像：</span>
    		<span class="r">
          <img id="logo" v-if="data.face!=0" :src="data.face"/>
          <img id="logo" v-if="data.face==0" src="../../../images/personLogo.png"/>
          <!--<img v-if="data.face==0" src="../../images/indexbanner.png" />-->
        </span>
    	</div>
    	<div class="list">
    		<span class="sp1">用户名：</span>
    		<span class="r">{{data.uname}}</span>
    	</div>
    	<div class="list">
    		<span class="sp1">性别：</span>
    		<span class="r">{{data.str_sex}}</span>
    	</div>
    	<div class="list">
    		<span class="sp1">出生日期：</span>
    		<span class="r">{{data.birthday}}</span>
    	</div>
    	<div class="list">
    		<span class="sp1">地区</span>
    		<span class="r">{{data.str_province}}-{{data.str_city}}</span>
    	</div>
    	<div class="line"></div>
    	<div class="list">
    		<span class="sp1">个性标签</span>
    		<span class="r">{{data.signature}}</span>
    	</div>
    	<div class="list">
    		<span class="sp1">主页权限</span>
    		<span class="r">{{data.str_space}}</span>
    	</div>
    	<div class="list mb41">
    		<p class="sp2">背景图片</p>
    		<p class="sp3">
          <img :src="data.background" alt="">
          <!--<img src="../../../images/listbanner.png"/>-->
        </p>
    	</div>
    </div>
    <load v-show="isload"></load>
    <div class="load" style="display:none;">
      <div class="load-container load4"><div class="loader"> <i></i></div></div>
    </div>
  </div>
</template>
<script>
import {setCookie,getCookie} from '../../../assets/js/cookie.js'
import {getOpenUrl,getToken} from '../../../assets/js/common.js'
import qs from 'qs'
export default {
  data () {
    return{
      isload:false,
      data:{}
    }
  },
  mounted(){
    //$('.load').show();
    this.isload = true;
    this.getData();
  },
  methods:{
    back(){
      this.$router.goBack();
      //android.back1();
    },
    getData(){
//      $('.load').show();
      this.$http.get(getOpenUrl() + "/user/myprofile?t="+Math.random(), {
        headers: {
          "Authorization": "Bearer " + getToken()
        },
        params:{
//          page: start,
//          limit: size
        },
      }).then((res)=>{
        this.isload = false;
        console.log(res.body);
        if (res.status){
          this.data = res.body.data;
          if(this.data.face!=0){
            this.data.face = this.data.face + '?t=' + Math.random();
          }
          if(res.body.data.signature==''){
            res.body.data.signature = '说点什么吧';
          }
          $('.load').hide();
        }
      },function(err) {
        this.$router.push({
          path: '/login',
          //query:{gid: res.body.data.gid}
        });
        console.log('请求失败', err);

      });
    }
  },
  activated(){
    //路由缓存 前进后退
    $('.load').hide();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header{height: 0.7rem;position: fixed;top:0;box-shadow:0 0 5px #ebebeb;width: 100%;background: #fff;padding-top:0.3rem;}
  .header1{padding:0 0.2rem;margin:0 auto;overflow:hidden;}
  .header .a1{width: 0.18rem;height: 0.7rem;background: url(../../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;display: block;}
  .header .a2{width: 0.73rem;height: 0.7rem;float:right;display: block;color:#008dd3;line-height:0.7rem;text-align:center;font-size:0.22rem;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}
  .body{padding-top: 1.1rem;padding-bottom: 0.2rem;}
  .list{border-bottom: 1px solid #ebebeb;padding-left: 0.23rem;font-size: 0.22rem;overflow: hidden;}
  .sp1{color: #242424;display: block;float: left;line-height:0.97rem;}
  .sp2{color: #242424;display: block;height: 0.97rem;line-height: 0.97rem;width: 100%;}
  .sp3{width: 6rem;height: 2.8rem;}
  .sp3 img{width: 6rem;height: 2.8rem;display: block;border-radius: 0.05rem;}
  .mb41{margin-bottom: 0.41rem;border-bottom: 0;}
  .r{line-height: 0.97rem;float: right;padding-right: 0.2rem;color: #9F9F9F;font-size: 0.2rem;}
  .r img{width: 0.9rem;height: 0.9rem;border-radius: 50%;display: block;padding: 0.3rem 0;object-fit: cover;}
  .lh1{line-height: 1.57rem;}
</style>
