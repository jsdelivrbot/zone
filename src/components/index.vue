<template>
	<div class="index" :style="adData">
		<div class="bottom">
			<span>Powered by zone© 2001-2013</span>
		</div>
		<div class="up"><a @click="jump()">跳过<span id="sp1">5</span></a></div>
		<div class="load" style="display:none;">
			<div class="load-container load4"><div class="loader"> <i></i></div></div>
		</div>
	</div>
</template>
<script>
var t = 5;
import {setCookie,getCookie} from '../assets/js/cookie.js'
import {getOpenUrl,getToken} from '../assets/js/common.js'
import qs from 'qs'
export default {
	data () {
		return{
			timer:null,
			adData:''
		}
	},
	mounted(){
		$('.load').show();
		this.$http.get(getOpenUrl() + "ads",{
			params:{
				type:7
			},
			headers: {
				'Authorization': 'Bearer ' +  getToken()
			}
		}).then((res)=>{
			if (res.body.code == '0000'){
				var ads = res.body.data;
				for (var k in ads){
					this.adData = "background-image:url("+ads[k].content+")";
				}
				$('.load').hide();
			}
		});

		var self = this;
		self.timer = setInterval(function () {
			t--;
			var sp=document.getElementById("sp1");
			sp.innerHTML=t;
			if (t <=0) {
				window.location.href="#/home";
        clearInterval(self.timer);
				t=5
			}
		}, 1000);
	},
	methods:{
		jump(){
			clearInterval(this.timer);
			this.$router.push('/home')
		}
	}
}
</script>

<style scoped>
a{color:#54c2f0;}
.index{max-width:1080px;width:100%;height:100%;background:none;background-size:cover;margin:0 auto;position:relative;}
.bottom{max-width:1080px;height:1.7rem;width:100%;background:url(../images/startbottom.png) no-repeat;background-size:cover;position:absolute;bottom:0;margin:0 auto;}
.bottom span{    color: #b8b8b8;
font-size: 0.2rem;
display: block;
position: absolute;
bottom: 0.25rem;
left: 50%;
width: 100%;
transform: translateX(-50%);
text-align: center;}
	#sp1{padding-left: 0.05rem;}
.up{width: 0.923rem;
  height: 0.42rem;
  position: absolute;
  top: 0.6rem;
  right: 0.3rem;
  font-size: 0.2rem;
  color: #fff;
  background: rgba(255,255,255,0.1);
  text-align: center;
  line-height: 0.42rem;
  border-radius: 0.1rem;
  border: 1px solid #54c2f0;}
</style>
