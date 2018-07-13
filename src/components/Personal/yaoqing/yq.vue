<template>
	<div class="index">
		<div class="header">
			<div class="headerall">
				<a href="javascript:history.back(-1);"></a>
        <!--<a @click="back"></a>-->
				<span class="forget">我的邀请</span>
			</div>
	    </div>
	    <div class="body">
	    	<div class="er">
	    		<div class="er-t">
	    			<!--<img src="../../../images/listbanner.png"/>-->
            <img :src="data.img" alt="">
	    		</div>
	    		<div class="er-b">
	    			<p class="p1">你的专属邀请码</p>
	    			<p class="p2">{{data.invitecode}}</p>
	    		</div>
	    	</div>
	    	<div class="body-d">
	    		<p>邀请用户成功你将获得<span>{{data.setting.invite_friend}}</span></p>
	    		<p>为用户申请VIP您将获取<span>{{data.setting.set_vip}}</span></p>
	    	</div>
	    	<div class="body-f">不支持微信扫一扫</div>
	    </div>
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
      data:''
    }
  },
  mounted(){
    $('.load').show();
    this.getErwei()
  },
  methods:{
    back(){
      android.back1();
    },
    getErwei(){
      this.$http.get(getOpenUrl() +"/user/qrcode", {
        headers: {
          "Authorization": "Bearer " + getToken()
        },
//        params:{
//          type:'score'
//        },
      }).then((res)=>{
        if(res.body.status){
          console.log(res.body);
          this.data = res.body.data;
        }
        $('.load').hide();
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
  .index{height: 100%;background: url(../../../images/ewmBk.jpg) no-repeat;background-size: cover;}
  .header{height: 0.88rem;width: 100%;z-index: 1;padding-top: 0.3rem;}
  .headerall{padding: 0 0.2rem;}
  .header a{width: 0.18rem;height: 0.88rem;display: block;background: url(../../../images/backw.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
  .forget{line-height:0.88rem;font-size:0.34rem;display:block;float:left;color: #fff;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}

  .body .er{width: 3.29rem;margin: 0 auto;margin-top: 0.88rem;background: #fff;}
  .body .er-t{width:2.85rem;padding: 0.2rem;border-bottom: 0.01rem dashed #ebebeb;}
  .body img{height: 2.85rem;width: 2.85rem;display: block;}
  .er-b p{text-align: center;}
  .er-b .p1{line-height: 0.41rem;font-size: 0.26rem;color: #39b6f4;margin-top: 0.2rem;}
  .er-b .p2{line-height: 0.35rem;font-size: 0.2rem;color: #242424;padding-bottom: 0.14rem;}
  .body-d{border-bottom: 0.01rem dashed #ebebeb;margin-left: 0.3rem;margin-right: 0.3rem;margin-top: 1.11rem;padding-bottom: 0.48rem;}
  .body-d p{line-height: 0.46rem;font-size: 0.26rem;text-align: center;color: #01a9f8;}

  .body-f{color: #f29112;font-size: 0.26rem;text-align: center;margin-top: 0.96rem;}
</style>
