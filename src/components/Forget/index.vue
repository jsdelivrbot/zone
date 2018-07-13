<template>
	<div class="forget1" :style="adData">
		<div class="back">
			<a href="javascript:history.go(-1);"></a>
			<span class="forget">忘记密码</span>
		</div>
		<div class="nav">
			<form>
				<div class="mt0 input">
					<input type="text" style="width: calc(100% - 0.41rem);" placeholder="请输入手机号" class="write" v-model="username" ref="username" @blur="yzusername()">
				</div>
				<span class="sp1" ref="sp1"></span>
				<div class="input" style="display: flex;">
					<input type="password" placeholder="输入验证码" class="write" v-model="yzm" @blur="yzyzm()">
					<img :src="yzmData" class="yzm" @click="captcha()">
				</div>
				<span class="sp2" ref="sp2"></span>
				<div class="input" style="display: flex;">
					<input type="password" placeholder="短信验证码" class="write" v-model="dxyzm" @blur="yzdxyzm()">
					<input type="button" value="获取验证码" class="yzm" @click="sms()" id="btnmsg">
				</div>
				<span class="sp3" ref="sp3"></span>
				<input type="button" value="确认" class="btn input mt5" @click="backpass()">
			</form>
			<ul class="bottom">
				<a href="#/register">
					<li class="li1">立即注册</li>
				</a>
				<li class="li2"></li>
				<a href="#/login">
					<li>已有账号，登录</li>
				</a>
			</ul>
		</div>
    <pop class="tip" :title="tip"></pop>
	</div>
</template>
<script>
  import Vue from 'vue'
	import { getOpenUrl,getToken} from "../../assets/js/common.js"
	import { setCookie, getCookie } from '../../assets/js/cookie.js'
	import qs from 'qs'
	export default {
		name: 'forget1',
		data() {
			return {
				tip:'',
				yzmData: {},
				username: '',
				yzm: '',
				dxyzm: '',
				skey: {},
				token: {},
				adData:''
			}
		},
		mounted() {
      $(".tip").hide();
			//  var skey = getCookie('token');
			//  var data = qs.stringify({
			//    'skey': skey
			//  })
			this.$http.post(getOpenUrl() + 'captcha', {

			})
			.then((res) => {
				console.log(res.body.data.captcha)
				this.yzmData = res.body.data.captcha;
				this.skey = res.body.data.captcha_key
				Vue.set(this.yzmData, this.yzmData);
			}),
			this.get();
		},
		methods: {
			get(){
				this.$http.get(getOpenUrl() + "ads",{
					params:{
						type:2
					},
          headers: {						'Authorization': 'Bearer ' + getToken()					}
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
				/*接口请求*/
				//    var skey = getCookie('token');
				//    var data = qs.stringify({
				//        'skey': skey
				//    });
				this.$http.post(getOpenUrl() + 'captcha', {
						skey: this.skey
					})
					.then((res) => {
						console.log(res);
						this.yzmData = res.body.data.captcha;
						console.log(this.yzmData)
						Vue.set(this.yzmData, this.yzmData);
						let expireDays = 1000 * 60 * 60;
						this.setCookie("token", res.body.data.captcha_key, expireDays);
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
					/*接口请求*/
//					var data = qs.stringify({
//						"mobile": this.username,
//						"type": "register",
//						"captcha": this.yzm,
//						"skey": this.skey,
//					});

					this.$http.post(getOpenUrl() + 'sms', {
							"mobile": this.username,
							"type": "findpwd",
							"captcha": this.yzm,
							"skey": this.skey,
						})
						.then((res) => {
							var sp2 = this.$refs.sp2;
							if(res.body.code != 0) {
								sp2.innerHTML = res.body.error_description;;
								sp2.style.color = "red";
								sp2.style.display = "block";
							} else {

								this.time();
								this.token = res.body.data.token;
								let expireDays = 1000 * 60 * 60;
								setCookie("session", res.body.data.key, expireDays);
								console.log(res.body.data.key)
							}
							//this.yzmData = res.body.data.captcha;
							//Vue.set(this.yzmData, this.yzmData);
						})
				}
			},
			backpass() {
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
					/*接口请求*/
					var data = qs.stringify({
						"mobile": this.username,
						"captcha": this.yzm,
						"sms": this.dxyzm,
						"skey": this.skey
					})
					console.log(data)
					this.$http.post(getOpenUrl() + 'backpass', {
							"mobile": this.username,
							"captcha": this.yzm,
							"sms": this.dxyzm,
							"skey": this.skey
						})
						.then((res) => {
							if(res.body.code == 0) {
								this.$router.push('/forget1')
							}
							var sp2 = this.$refs.sp2;
							if(res.body.code != 0) {
								sp2.innerHTML = res.body.error_description;
								sp2.style.color = "red";
								sp2.style.display = "block";
							}
							console.log(res.body);
						})
				}
			}
		},
		activated() {
			this.get()
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.mt0 {
		margin-top: 0!important;
	}

	.forget1 {
		/*max-width:1080px;width:100%;height:100%;background:none;*/
		height: 100%;
		overflow-y: auto;
		background-size: cover;
	}

	.back {
		height: 0.88rem;
		padding-left: 0.38rem;
		position: relative;
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
		padding-top: 3.11rem;
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
		line-height: 0.8rem;
		float: left;
		font-size: 0.21rem;
		padding-left: 0.41rem;
		flex: 1;
	}

	input::-webkit-input-placeholder {
		color: #54c2f0;
	}

	.mt5 {
		margin-top: 1rem;
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
		width: 3.1rem;
		height: 0.2rem;
		color: #fff;
		line-height: 0.2rem;
		font-size: 0.2rem;
		margin: 0 auto;
		margin-top: 0.4rem;
		padding-bottom: 0.2rem;
	}

	.bottom li {
		float: left
	}

	.bottom a {
		color: #fff;
	}

	.li1 {
		margin-left: 0.22rem;
	}

	.li2 {
		width: 0.02rem;
		height: 0.2rem;
		background: #fff;
		margin-left: 0.29rem;
		margin-right: 0.22rem;
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
