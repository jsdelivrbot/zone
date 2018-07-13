<template>
  <div class="order">
    <my-header title="填写订单"></my-header>
    <div class="top">
      <div class="linebn mt30"></div>
      <a href="#/delivery">
      	<div class="top-center">
	        <ul class="c-ul">
	          <li class="c-li1" v-if="this.add.length>0"><span class="c-li1">{{this.addressData.consignee}}</span><span class="c-li2">{{this.addressData.mobile}}</span></li>
	           <li class="c-li1" v-else>请添加收货地址</li>
	          <li class="c-li2" v-if="this.add.length!=''"><span>{{this.addressData.address}}</span><span>(</span><span>{{this.addressData.zipcode}}</span><span>)</span></li>
	          <li class="c-li3"></li>
	        </ul>
	      </div>
      </a>
      <div class="linebn mb30"></div>
    </div>
    <div class="line"></div>
    <div class="order-line">
      <div class="order-top">
        <p>商品清单</p>
      </div>
      <div class="order-bottom">
        <div class="order-b-l"><img v-lazy="this.giftData.img"/></div>
        <div class="order-b-r">
          <ul>
            <li class="oli1">{{this.giftData.name}}</li>
            <li class="oli2"><span>{{this.giftData.price}}</span>积分</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="order-line">
      <div class="order-top bt0">
        <p>订单备注</p>
      </div>
      <div class="order-bottom2">
        <textarea v-model="content"></textarea>
      </div>
    </div>
    <div class="line"></div>
    <div class="bottom">
      <ul>
        <li class="bli2"><span class="sp1">商品积分</span><span class="sp2">{{this.giftData.price}}<span></span>积分</span></li>
      </ul>
    </div>
     <div class="footer">
        <div class="footer-dh" @click="submit()">提交订单</div>
    </div>
    <load v-show="isload"></load>
    <pop style="text-align: center" class="tip" :title="tip"></pop>
  </div>
</template>
<script>
import { getOpenUrl,getToken } from "../../assets/js/common.js"
import {setCookie,getCookie} from '../../assets/js/cookie.js'
import qs from 'qs'
export default {
  data () {
    return{
        isload:false,
        addressData:{},
        add:{},
        giftData:{},
        giftOrder:{},
        content:'',
        tip:'',
    }
  },
  mounted(){
  	$('.tip').hide();
    this.$http.get(getOpenUrl() + "userAddress", {
			params:{
				type:0
			},
			headers: {
				'Authorization': 'Bearer ' + getToken()
			}
		}).then((res) => {
			if(res.body.data[0]!=undefined){
				  this.addressData=res.body.data[0]
			}else{
					this.addressData=res.body.data
			}
			this.add=res.body.data
			this.$http.get(getOpenUrl() + "giftData", {
				params:{
					gift_id:this.$route.query.gift_id
				},
				headers: {
					'Authorization': 'Bearer ' + getToken()
				}
			}).then((res) => {
					this.giftData=res.body.data
			})
		});
		//是否存在input焦点事件或图层打开事件
			$('textarea').focus(function(){
				//获取焦点
				let expireDays = 1000 * 60 * 60 ;
				setCookie("inputkey", 1, expireDays);
			});
		$(document).bind('click', function(e){
			var target = $(e.target);
			if(target.closest("textarea").length == 0 && target.closest('.a1').length == 0){
				setCookie("inputkey", '', -1);
			}
		});
  },
  methods:{
    submit(){
    	if(this.addressData==''){
    		this.tip = '请选择地址';
			$('.tip').show();
			setTimeout(function(){
				$('.tip').hide();
			},1000)
    	}else{
    	  this.isload = true;
    		this.$http.post(getOpenUrl() + "giftOrder", {
				giftid:this.$route.query.gift_id,
				address_id:this.addressData.address_id,
				postscript:this.content,
			},{
				headers: {
					'Authorization': 'Bearer ' + getToken()
				},
			}).then((res) => {
          this.isload = false;
				this.giftOrder=res.body.data
				if(res.data.code==0){
					this.$root.eventHub.$emit('ddSuccess');
					this.$router.push('/finished')
				}else{
					this.tip = res.body.error_description;
					$('.tip').show();
					setTimeout(function(){
						$('.tip').hide();
					},1000)
				}
			})
    	}

    }
  },
	beforeRouteLeave (to, from, next) {
			//路由离开时
			var isInputKey = parseInt(getCookie('inputkey'));
			if (isInputKey == 1){
				setCookie("inputkey", '', -1);
				this.isshowe=false;
//				this.toggle1();
//				this.toggle3();
				next(false)
			}else{
				next()
			}
		}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .mb30{margin-bottom:0.3rem;}
    .top{margin: 1.48rem 0.2rem 0 0.2rem;}
    .linebn{height:0.04rem;width:100%;background:url(../../images/line.png)no-repeat;background-size:cover;}
    .top-center{font-size:0.22rem;color:#242424;line-height:0.42rem;padding:0.22rem 0;position:relative;}
    .c-li1 .c-li2{margin-left:0.15rem;}
    .c-li3{height:0.24rem;width:0.12rem;position:absolute;top:50%;right:0;transform:translateY(-50%);background:url(../../images/backright.png) no-repeat;background-size:cover;}
    .c-sp1{margin-left:0.13rem;}
    .order-top{width:100%;border-bottom:0.01rem solid #ebebeb;}
    .order-top p{padding-left: 0.2rem;font-size:0.22rem;color:#242424;line-height:0.89rem;}
    .order-bottom{display:flex;margin:0.3rem 0 0.3rem 0.2rem;}
    .order-b-l{width:1.2rem;height:1.2rem;float:left;}
    .order-b-l img{width:1.2rem;height:1.2rem;display:block;}
    .order-b-r ul{padding-left:0.21rem;}
    .order-b-r .oli1{line-height:0.29rem;font-size:0.22rem;color:#242424;margin-top:0.09rem;overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
    .order-b-r .oli2{color:#1094d6;font-size:0.2rem;line-height:0.49rem;margin-top:0.03rem;}
    .order-bottom2{width: calc(100% - 0.4rem);margin-bottom:0.29rem;padding: 0 0.2rem;}
    .order-bottom2 textarea{width:5.95rem;height:1.56rem;border:0.01rem solid #ebebeb;padding-left: 0.05rem;padding-top: 0.05rem;width: 100%;}
    .bt0{border-bottom:0;}

    .bottom{line-height:0.53rem;font-size:0.22rem;margin:0.18rem 0.2rem;overflow:hidden;}
    .bottom li{float:left;width:100%;}
    .bli1{color:#242424;}
    .bli2{color:#54c2f0;}
    .sp1{float:left;}
    .sp2{float:right;}
    .footer{height:1.36rem;width:100%;background:#f5f5f5;position:fixed;bottom: 0;}
    .footer-dh{width:3.79rem;height:0.82rem;line-height:0.82rem;background:#54c2f0;border-radius:0.41rem;text-align:center;color:#fff;font-size:0.26rem;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);}

</style>
