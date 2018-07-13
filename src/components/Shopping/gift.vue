<template>
  <div class="gift">
    <!--<my-header title="礼品商城"></my-header>-->
    <div class="header">
      <div class="headerall">
        <a href="javascript:history.back(-1);" class="a1"></a>
        <span class="forget">礼品商城</span>
      </div>
    </div>
    <div class="nav">
        <div class="nav-t">
            <div class="nav-t-t">
                <div class="nav-l nav-c"></div>
                <div class="shopimg">
                    <img :src="this.giftData.img" v-lazy="this.giftData.img"/>
                </div>
                <div class="nav-r nav-c"></div>
            </div>
            <div class="nav-t-b">
                <ul class="nav-ul">
                    <li class="li1">{{this.giftData.name}}</li>
                    <li class="li2"><span class="sp1">{{this.giftData.price}}积分</span><span class="sp2">已有<span class="sp3">{{this.giftData.order_count}}</span>人兑换</span></li>
                </ul>
            </div>
        </div>
        <div class="nav-b">
            <ul class="nav-b-ul">
                <li class="ul-li1">商品详情：</li>
                <li class="ul-li2">{{this.giftData.gift_desc}}</li>
            </ul>
        </div>
    </div>
    <div class="footer" v-if="this.giftData.num > 0&&this.giftData.is_suo==true">
    	<router-link :to="'/order?gift_id='+this.$route.query.gift_id">
		    <div class="footer-dh">兑换</div>
		  </router-link>
    </div>
    <div class="footer" v-if="this.giftData.num<=0&&this.giftData.is_suo">
        <div class="footer-dh a2">补货中</div>
    </div>
    <div class="footer" v-if="this.giftData.is_suo==false">
        <div class="footer-dh a2">未解锁</div>
    </div>
    <load v-show="isload"></load>
  </div>
</template>
<script>
import { getOpenUrl,getToken} from "../../assets/js/common.js"
import {setCookie,getCookie} from '../../assets/js/cookie.js'
import qs from 'qs'
export default {
  data () {
    return{
      isload:false,
        giftData:{}
    }
  },
  mounted(){
    this.isload = true;
    this.$http.get(getOpenUrl() + "giftData", {
				params:{
					gift_id:this.$route.query.gift_id
				},
				headers: {
					'Authorization': 'Bearer ' + getToken()
				},
		}).then((res) => {
      this.isload = false;
			if(res.body.code==0){
				this.giftData=res.body.data
			}

		})
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header{height: 0.7rem;box-shadow:0 0 5px #ebebeb;width: 100%;background: #fff;z-index: 11;margin-bottom: 0.05rem; position:fixed;padding-top: 0.3rem;}
  .headerall{padding: 0 0.2rem;}
  .header a{width: 0.18rem;height: 0.7rem;display: block;background: url(../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}
  .nav{width:100%;background:#008dd3;padding-top:1.4rem;padding-bottom:1.36rem;}
  .nav-t{width:6rem;height:6.4rem;background:#fff;margin: 0 auto;margin-bottom:0.1rem;}
  .nav-c{width:0.25rem;height:0.25rem;background:#008dd3;border-radius:50%;position:absolute;top: 4.65rem;}
  .nav-l{left: -0.3rem;}
  .nav-r{right: -0.3rem;}
  .nav-t-t{height:4.8rem;width:5.7rem;margin: 0 auto;position:relative;border-bottom:0.01rem solid #ebebeb;}
  .nav-t-b{width:5.34rem;margin: 0 auto;}
  .li1{line-height:0.31rem;font-size:0.22rem;color:#242424;margin-top:0.27rem;}
  .li2{line-height:0.55rem;font-size:0.2rem;}
  .li2 .sp1{color:#1094d6;}
  .li2 .sp2{color:#b7b7b7;float:right;}
  .li2 .sp3{color:#1094d6;}
  .shopimg{width:2.2rem;height:2.2rem;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);}
  .shopimg img{width:2.2rem;height:2.2rem;display:block;}

  .nav-b{width:6rem;height:1.6rem;background:#fff;margin: 0 auto;margin-bottom:0.3rem;}
  .nav-b-ul{width:5.15rem;margin:0 auto;}
  .ul-li1{font-size:0.22rem;line-height:0.6rem;margin-top:0.12rem;color:#242424;}
  .ul-li2{font-size:0.2rem;line-height:0.32rem;color:#8f8f8f;}
  .footer{height:1.36rem;width:100%;position:fixed;bottom:0;background:#fff;}
  .footer-dh{width:3.79rem;height:0.82rem;line-height:0.82rem;background:#54c2f0;border-radius:0.41rem;text-align:center;color:#fff;font-size:0.26rem;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);}


  .a2{background: #eef0f2;color: #757575;}
</style>
