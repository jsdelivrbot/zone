<template>
	<div class="register" :style="adData">
		<div class="back">
			<a href="javascript:history.go(-1);"></a>
			<span class="forget">注册账号</span>
		</div>
		<div class="nav">
			<form>
				<div class="mt0 input" style="position: relative;">
					<input  type="text" style="width: calc(100% - 0.41rem);line-height: normal;position: absolute;top:50%;transform: translateY(-50%);" placeholder="请输入手机号" class="write" v-model="username" ref="username" @blur="yzusername()">
				</div>
				<span class="sp1" ref="sp1"></span>
				<div class="input" style="display: flex;">
					<input type="text" placeholder="输入验证码" class="write" v-model="yzm" ref="yzm" @blur="yzyzm()">
					<img :src="yzmData" class="yzm" @click="captcha()">
				</div>
				<span class="sp2" ref="sp2"></span>
				<div class="input" style="display: flex;">
					<input type="text" placeholder="短信验证码" class="write" v-model="dxyzm" ref="dxyzm" @blur="yzdxyzm()">
					<input type="button" value="获取验证码" class="yzm" @click="sms()" id="btnmsg">
				</div>
        <div class="xiey" style="color:#fff;font-size: 0.2rem;line-height: 0.2rem;margin-top: 0.2rem;">
          <input type="checkbox" checked="checked" name="agreement" style="margin-right: 0.05rem;vertical-align: middle;">我已经阅读并同意
          <a class="zcxy" style="text-decoration:underline;" @click="showXieyi">《中兴社区注册协议》</a>
        </div>
				<span class="sp3" ref="sp3"></span>
				<input type="button" value="下一步" class="btn input mt5" @click="register()">
			</form>
			<div class="bottom">
				<a href="#/login">已有账号，登录</a>
			</div>
		</div>
		<pop class="tip" :title="tip"></pop>
    <transition name="fade">
      <div class="mark" v-show="show" @click="showXieyi"></div>
    </transition>
    <transition name="fade">
      <div class="xy-box" v-show="show">
        <div class="xy-content" style="padding: 0.2rem 0.2rem" v-html="xyContent"></div>
      </div>
    </transition>
	</div>
</template>
<script>
	import { getOpenUrl } from "../../assets/js/common.js"
	import Vue from 'vue'
	import { setCookie, getCookie } from '../../assets/js/cookie.js'
	import qs from 'qs'
	export default {
		name: 'register',
		data() {
			return {
			  show:false,
        xyContent:'',
				tip: '',
				yzmData: {},
				username: '',
				yzm: '',
				dxyzm: '',
				skey: {},
				s:"",
				token: {},
				timer:null,
				adData:''
			}
		},
    created(){
      this.get();
      this.getXieYi();
    },
		mounted() {
			//  var skey = getCookie('token');
			//  var data = qs.stringify({
			//    'skey': skey
			//  })
			$(".tip").hide();
			this.$http.post(getOpenUrl() + 'captcha', {

			})
			.then((res) => {
				this.yzmData = res.body.data.captcha;
				this.skey = res.body.data.captcha_key
				Vue.set(this.yzmData, this.yzmData);
			})
			//this.get();
      //this.getXieYi();
		},
		methods: {
      showXieyi(){
        this.show = !this.show;
      },
		  getXieYi(){
        this.$http.get(getOpenUrl() + "ads",{
          headers:{
            'Authorization' : 'Bearer '+ getCookie('token')
          },
          params:{
            type:22
          }
        }).then((res)=>{
          if (res.body.code == '0000'){
            this.xyContent = res.body.data[0].content;
          }
        });
      },
			get(){
				this.$http.get(getOpenUrl() + "ads",{
					params:{
						type:2
					},
					headers: {
						'Authorization': 'Bearer ' +  getCookie('token')
					}
				}).then((res)=>{
					if (res.body.code == '0000'){
						var ads = res.body.data;
						for (var k in ads){
							this.adData = "background-image:url("+ads[k].content+")";
						}
						$('.load').hide();
					}
				})
			},
			yzusername() {
				var username = /^1[34578]\d{9}$/;
				var uname = this.$refs.username;
				var sp1 = this.$refs.sp1;
				if(this.username == "") {
					sp1.innerHTML = "请输入手机号";
					sp1.style.color = "red";
					sp1.style.display = "block";
				} else if(!username.test(uname.value)) {
					sp1.innerHTML = "手机号格式不正确";
					sp1.style.color = "red";
					sp1.style.display = "block";
				} else {
					sp1.style.display = "none";
				}
			},
			yzyzm() {
				var yzm = this.$refs.yzm;
				var sp2 = this.$refs.sp2;
				if(this.yzm == "") {
					sp2.innerHTML = "请输入验证码";
					sp2.style.color = "red";
					sp2.style.display = "block";
				} else {
					sp2.style.display = "none";
				}
			},
			yzdxyzm() {
				var sp3 = this.$refs.sp3;
				if(this.dxyzm == "") {
					sp3.innerHTML = "请输入短信验证码";
					sp3.style.color = "red";
					sp3.style.display = "block";
				} else {
					sp3.style.display = "none";
				}
			},
			captcha() {
				this.$http.post(getOpenUrl() + 'captcha', {
						skey:this.skey
					})
					.then((res) => {
						console.log(res);
						this.yzmData = res.body.data.captcha;
//						console.log(this.yzmData)
						Vue.set(this.yzmData, this.yzmData);
//						let expireDays = 1000 * 60 * 60;
//						this.setCookie("token", expireDays, res.body.data.captcha_key);
					})
			},
			time() {
				var wait = 60; //时间
				$("#btnmsg").attr("disabled", true).val("正在获取...");
				var self = this;
				this.timer=setInterval(function() {
					console.log(wait)
					if(wait > 0) {
						wait--;
						$("#btnmsg").attr("disabled", true).val(wait + "秒后重新获取");
					} else {
						clearInterval(self.timer);
						$("#btnmsg").attr("disabled", false).val("重新获取");

					}
				}, 1000);
			},

			sms() {
				if(this.username == "") {
					//alert("请输入手机号")
          this.tip = "请输入手机号";
          $('.tip').show();
          setTimeout(function() {
            $('.tip').hide();
          }, 1000)
				} else if(this.yzm == "") {
					//alert("请输入验证码")
          this.tip = "请输入验证码";
          $('.tip').show();
          setTimeout(function() {
            $('.tip').hide();
          }, 1000)
				} else {
//					/*接口请求*/
//					var data = qs.stringify({
//						"mobile": this.username,
//						"type": "register",
//						"captcha": this.yzm,
//						"skey": this.skey
//					});

					this.$http.post(getOpenUrl() + 'sms', {
						"mobile": this.username,
						"type": "register",
						"captcha": this.yzm,
						"skey": this.skey
					})
					.then((res) => {

						console.log(res);
						var sp2 = this.$refs.sp2;
						if(res.body.code != 0) {
							sp2.innerHTML = res.body.error_description;
							sp2.style.color = "red";
							sp2.style.display = "block";
						}else{
							this.time();
							this.token = res.body.data.token;
						}
						//this.yzmData = res.body.data.captcha;
						//Vue.set(this.yzmData, this.yzmData);
					})
				}
			},
			register() {
				var sp1 = this.$refs.sp1;
				var sp2 = this.$refs.sp2;
				var sp3 = this.$refs.sp3;
				if(this.username == "") {
					sp1.innerHTML = "请输入手机号";
					sp1.style.color = "red";
					sp1.style.display = "block";
				}
				if(this.yzm == "") {
					sp2.innerHTML = "请输入验证码";
					sp2.style.color = "red";
					sp2.style.display = "block";
				}
				if(this.dxyzm == "") {
					sp3.innerHTML = "请输入短信验证码";
					sp3.style.color = "red";
					sp3.style.display = "block";
				} else {
//					/*接口请求*/
//					var data = qs.stringify({
//						"mobile": this.username,
//						"captcha": this.yzm,
//						"sms": this.dxyzm,
//						"skey": this.skey
//					})
					console.log(this.username)
					this.$http.post(getOpenUrl() + 'register', {
						"mobile": this.username,
						"captcha": this.yzm,
						"sms": this.dxyzm,
						"skey": this.skey
					})
					.then((res) => {
						if(res.body.code == 0) {
							let expireDays = 1000 * 60 * 60;
							setCookie("session", res.body.data.skey, expireDays);
							this.$router.push('/register1')
						}else{
							this.tip = res.body.error_description;
							$('.tip').show();
							setTimeout(function() {
								$('.tip').hide();
							}, 1000)
						}
					})

				}
			}
	},
	activated() {

	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.mt0 {
		margin-top: 0!important;
	}
  .xy-box{
    margin: 0 0.6rem;
    position: absolute;
    top:50%;
    transform:translateY(-50%);
    background:#fff;
    overflow-y: scroll;
    overflow-x: hidden;
    font-size: 0.2rem;
    height: 8rem;
    z-index: 1000;
  }
  .mark{
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.3);
  }
	.register {
		/*max-width:1080px;width:100%;height:100%;background:none;*/
		height: 100%;
		overflow-y: auto;

		background-size: cover;
	}
	.back {
		height: 0.88rem;
		padding-left: 0.38rem;
		position: relative;
    padding-top: 0.3rem;
	}

	.back a {
		width: 0.18rem;
		height: 0.34rem;
		display: block;
		background: url(../../images/back.png) no-repeat;
		background-size: cover;
		float: left;
		margin-top: 0.27rem;
	}

	.forget {
		line-height: 0.88rem;
		font-size: 0.34rem;
		display: block;
		float: left;
		color: #008dd3;
		position: absolute;
		left: 50%;
		-webkit-transform: translateX(-50%);
		-moz-transform: translateX(-50%);
		-ms-transform: translateX(-50%);
		-o-transform: translateX(-50%);
		transform: translateX(-50%);
	}

	.nav {
		margin: 0 auto;
		width: 78%;
		max-width: 500px;
		padding-top: 2.81rem;
	}

	.logo img {
		width: 2.57rem;
		height: 1.92rem;
		display: block;
		margin: 0 auto;
		margin-bottom: 1.6rem;
	}

	.input {
		width: 100%;
		height: 0.8rem;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 0.05rem;
		margin-top: 0.3rem;

	}

	.write {
		/*line-height: 0.8rem;*/
		float: left;
		font-size: 0.21rem;
		padding-left: 0.41rem;
		flex: 1;
	}

	input::-webkit-input-placeholder {
		color: #54c2f0;
	}

	.mt5 {
		/*margin-top: 1rem;*/
		text-align: center;
		background: rgba(18, 157, 222, 0.8);
	}

	.yzm {
		width: 1.78rem;
		height: 100%;
		background: url(../../images/yzm 7.png) no-repeat;
		background-size: cover;
		float: right;
		font-size: 0.2rem;
		color: #fff;
		line-height: 0.88rem;
		text-align: center;
	}

	.btn {
		font-size: 0.28rem;
		line-height: 0.8rem;
		color: #fff;
	}

	.bottom {
		height: 0.2rem;
		color: #fff;
		line-height: 0.2rem;
		font-size: 0.2rem;
		margin: 0 auto;
		margin-top: 0.4rem;
		text-align: center;
		padding-bottom: 0.2rem;
	}

	.bottom a {
		color: #fff;
	}

	.sp1 {
		font-size: 0.21rem;
		height: 0.21rem;
		float: left;
		display: none;
	}

	.sp2 {
		font-size: 0.21rem;
		height: 0.21rem;
		float: left;
		display: none;
	}

	.sp3 {
		font-size: 0.21rem;
		height: 0.21rem;
		float: left;
		display: none;
	}
</style>
