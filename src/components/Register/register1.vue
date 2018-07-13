<template>
	<div class="register" :style="adData">
		<div class="back">
			<a href="javascript:history.go(-1);"></a>
			<span class="forget">注册账号</span>
		</div>
		<div class="nav">
			<form>
				<div class="mt0 input">
					<input type="text" placeholder="用户名" class="write" v-model="username" ref="username" @blur="yzusername()">
				</div>
				<span class="sp1" ref="sp1"></span>
				<div class="input">
					<input type="password" placeholder="密码" class="write" v-model="password" ref="password" @blur="yzpassword()">
				</div>
				<span class="sp2" ref="sp2"></span>
				<div class="input">
					<input type="password" placeholder="确认密码" class="write" v-model="password1" ref="password1" @blur="yzpassword1()">
				</div>
				<span class="sp3" ref="sp3"></span>
				<div class="input" @click="toggle()">
					<input type="text" placeholder="省份" disabled="disabled" class="write" ref="cap">
				</div>
				<span class="sp4" ref="sp4"></span>
				<div class="input" @click="toggle2()">
					<input type="text" placeholder="城市" disabled="disabled" class="write" ref="city1">
				</div>
				<span class="sp5" ref="sp5"></span>
				<div style="position: relative;">
					<img src="../../images/login_loading.gif" style="position: absolute;width: 0.5rem;height: 0.5rem;top: 50%;transform: translateY(50%);left: 1.4rem;" alt="" v-show="loadinging">
					<input type="button" value="立即注册" class="btn input mt5" v-bind:class="{isDj:is_dianji}" @click="secondary()">
				</div>

			</form>
		</div>
		<div class="window" ref="window">
			<div class="window-header">
				<span class="window-forget">所在省份</span>
				<a class="window-a2" @click="toggle1()"></a>
			</div>
			<p><span>请选择</span></p>
			<ul>
				<li v-for="(address,index) in addressData" :key="index" @click="load(address,address.area_id);toggle1();load1('',address.area_id)" :data_id="address.area_id">{{address.title}}</li>
			</ul>
		</div>

		<div class="window" ref="city">
			<div class="window-header">
				<span class="window-forget">所在城市</span>
				<a class="window-a2" @click="toggle3()"></a>
			</div>
			<p><span>请选择</span></p>
			<ul>
				<li v-for="(city,index) in cityData" :key="index" @click="toggle3();load1(city,'',city.area_id)">{{city.title}}</li>
			</ul>
		</div>
		<div class="mark" ref="mark"></div>
		<pop class="tip" :title="tip"></pop>
	</div>
</template>
<script src="register1.vue" type="text/javascript" charset="utf-8"></script>
<script>
	var pid = '';
	var agencyid = '';
	var province = '';
	var cityid = '';
	import { getOpenUrl, getToken } from "../../assets/js/common.js"
	import { setCookie, getCookie } from '../../assets/js/cookie.js'
	import qs from 'qs'
	export default {
		name: 'register',
		data() {
			return {
				loadinging: false,
				is_dianji: false,
				tip: '',
				username: '',
				password: '',
				password1: '',
				addressData: {},
				cityData: {},
				adData: ''
			}
		},
		mounted() {
			$('.tip').hide()
			this.$http.get(getOpenUrl() + "areaData", {
					params: {

					},
					headers: {
						"Authorization": "Bearer " + getToken()
					}
				})
				.then((res) => {
					this.addressData = res.body.data
					console.log(res)
				});
			this.get();
		},
		methods: {
			get() {
				this.$http.get(getOpenUrl() + "ads", {
					params: {
						type: 2
					},
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					if(res.body.code == '0000') {
						var ads = res.body.data;
						for(var k in ads) {
							this.adData = "background-image:url(" + ads[k].content + ")";
						}
						$('.load').hide();
					}
				})
			},
			toggle: function() {
				this.isKey = true;
				this.$refs.mark.style.display = "block";
				this.$refs.window.style.display = "block";
				let expireDays = 1000 * 60 * 60;
				setCookie("inputkey", 1, expireDays);
			},
			toggle1: function() {
				this.isKey = false;
				this.$refs.mark.style.display = "none";
				this.$refs.window.style.display = "none";
				setCookie("inputkey", '', -1);
			},
			toggle2: function() {
				this.isKey = true;
				this.$refs.mark.style.display = "block";
				this.$refs.city.style.display = "block";
				let expireDays = 1000 * 60 * 60;
				setCookie("inputkey", 1, expireDays);
			},
			toggle3: function() {
				this.isKey = false;
				this.$refs.mark.style.display = "none";
				this.$refs.city.style.display = "none";
				setCookie("inputkey", '', -1);
			},
			load(value, id) {
				pid = id;
				this.$http.get(getOpenUrl() + "areaData", {
						params: {

						},
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Authorization': 'Basic ' + getToken()
						}
					})
					.then((res) => {
						this.addressData = res.body.data
						for(var i = 0; i < this.addressData.length; i++) {
							this.$refs.cap.value = value.title;
						}

					})
			},
			load1(value, id, cityid) {
				cityid = cityid;
				if(id = '') {
					id = pid;
				}
				this.$http.get(getOpenUrl() + "cityData?pid=" + pid, {
						headers: {
							"Authorization": "Bearer " + getToken()
						}
					})
					.then((res) => {
						this.cityData = res.body.data;
						for(var i = 0; i < this.cityData.length; i++) {
							if(value.title == undefined) {
								this.$refs.city1.value = "";
							} else {
								this.$refs.city1.value = value.title;
								this.cityId = cityid;
							}
						}
					})
			},
			yzusername() {
				var username = /^[a-zA-Z][0-9a-zA-Z]{3,19}$/;
				var uname = this.$refs.username
				var sp1 = this.$refs.sp1
				if(this.username == "") {
					sp1.innerHTML = "请输入用户名";
					sp1.style.color = "red";
					sp1.style.display = "block";
				} else if(!username.test(uname.value)) {
					sp1.innerHTML = "只能是字母开头的字母和数字组合最少4位最多20位";
					sp1.style.color = "red";
					sp1.style.display = "block";
				} else {
					sp1.style.display = "none";
				}
			},
			yzpassword() {
				var password = /^[a-zA-Z].{5,}/;
				var upassword = this.$refs.password
				var sp2 = this.$refs.sp2
				if(this.password == "") {
					sp2.innerHTML = "请输入密码";
					sp2.style.color = "red";
					sp2.style.display = "block";
				} else if(!password.test(upassword.value)) {
					sp2.innerHTML = "字母开头至少六位";
					sp2.style.color = "red";
					sp2.style.display = "block";
				} else {
					sp2.style.display = "none";
				}
			},
			yzpassword1() {
				var sp3 = this.$refs.sp3
				if(this.password == "") {
					sp3.innerHTML = "请确认密码";
					sp3.style.color = "red";
					sp3.style.display = "block";
				} else if(this.password != this.password1) {
					sp3.innerHTML = "两次输入的密码不一致";
					sp3.style.color = "red";
					sp3.style.display = "block";
				} else {
					sp3.style.display = "none";
				}
			},
			secondary() {
				this.is_dianji = true;
				this.loadinging = true;
				var sp1 = this.$refs.sp1;
				var sp2 = this.$refs.sp2;
				var sp3 = this.$refs.sp3;
				var sp4 = this.$refs.sp4;
				if(this.username == "") {
					sp1.innerHTML = "请输入用户名";
					sp1.style.color = "red";
					sp1.style.display = "block";
					this.is_dianji = false;
					this.loadinging = false;
				}
				if(this.password == "") {
					sp2.innerHTML = "请输入密码";
					sp2.style.color = "red";
					sp2.style.display = "block";
					this.is_dianji = false;
					this.loadinging = false;
				}
				if(this.password1 == "") {
					sp3.innerHTML = "请确认密码";
					sp3.style.color = "red";
					sp3.style.display = "block";
					this.is_dianji = false;
					this.loadinging = false;
				}
				if(this.$refs.cap.value == "") {
					sp4.innerHTML = "请选择省份";
					sp4.style.color = "red";
					sp4.style.display = "block";
					this.is_dianji = false;
					this.loadinging = false;
				} else {
					this.$http.post(getOpenUrl() + "secondary", {
						"client_secret": "4d996cfcd7040021f797ccacfbff869c",
						"client_id": "ZTEAPP",
						"username": this.username,
						"password": this.password,
						"cpassword": this.password1,
						"skey": getCookie("session"),
						"grant_type": "password",
						province: pid,
						city: this.cityId,
					})
					.then((res) => {
						this.is_dianji = false;
						this.loadinging = false;
						if(res.data.code == 0) {
							this.tip = '注册成功';
							$('.tip').show();
							setTimeout(() => {
								$('.tip').hide();
								this.$router.push('/login')
							}, 1000)
						} else {
							this.tip = res.body.error_description;
							$('.tip').show();
							setTimeout(function() {
								$('.tip').hide();
							}, 1000)
							return;
						}
						let expireDays = res.body.data.expires_in;
						setCookie("token", res.body.data.access_token, expireDays);
					})
				}
			}
		},
		activated() {
			this.get()
		}
	}
</script>
<style scoped>
	.mt0 {
		margin-top: 0!important;
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
		padding-top: 1rem;
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
    position: relative;
	}

	.write {
		line-height: 0.8rem;
		float: left;
		font-size: 0.21rem;
		padding-left: 0.41rem;
		width: calc(100% - 0.41rem);
    position: absolute;
    top:50%;
    transform:translateY(-50%);
	}

	input::-webkit-input-placeholder {
		color: #54c2f0;
	}

	.mt5 {
		margin-top: 1rem;
		text-align: center;
		background: rgba(18, 157, 222, 0.8);
		padding-bottom: 0.2rem;
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

	.btn.isDj {
		pointer-events: none;
		background: rgba(172, 207, 224, 0.8);
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

	.sp4 {
		font-size: 0.21rem;
		height: 0.21rem;
		float: left;
		display: none;
	}

	.sp5 {
		font-size: 0.21rem;
		height: 0.21rem;
		float: left;
		display: none;
	}
	/**/

	.mark {
		width: 100%;
		height: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		background: rgba(36, 153, 200, 0.3);
		display: none;
		z-index: 5;
	}

	.window {
		width: 100%;
		height: 6rem;
		z-index: 10;
		display: none;
		position: fixed;
		bottom: 0;
		background: #fff;
	}

	.window-header {
		height: 0.9rem;
		padding-left: 0.38rem;
		padding-right: 0.25rem;
		position: relative;
	}

	.window-a2 {
		width: 0.28rem;
		height: 0.28rem;
		display: block;
		background: url(../../images/close.png) no-repeat;
		background-size: cover;
		float: right;
		margin-top: 0.34rem;
	}

	.window-forget {
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

	.window p {
		height: 0.86rem;
		border-top: 1px solid #e0e0e0;
		border-bottom: 1px solid #e0e0e0;
	}

	.window p span {
		line-height: 0.84rem;
		width: 0.84rem;
		border-bottom: 0.03rem solid #008dd3;
		color: #008dd3;
		font-size: 0.22rem;
		display: block;
		margin-left: 0.17rem;
		text-align: center;
	}

	.window ul {
		margin-top: 0.16rem;
		margin-left: 0.20rem;
		height: calc(100% - 1rem);
		overflow-y: auto;
	}

	.window ul li {
		line-height: 0.48rem;
		font-size: 0.2rem;
		color: #242424;
	}
</style>
