<template>
  <div class="login" :style="adData">
    <a href="#/home" style="width:0.5rem;height: 1rem;display:block;padding-top: 0.3rem;">
      <div class="back1"></div>
    </a>
    <div class="nav">
      <div class="logo">
				<img src="../../images/logo.png" />
      </div>
      <form @keyup.13="login()">
        <div class="input">
          <p class="up up1"></p>
          <input type="text" placeholder="请输入用户名" autocapitalize="off" class="write" v-model="username" style="width: calc(100% - 1.1rem);">
        </div>
        <div class="input">
          <p class="up up2"></p>
          <input type="password" placeholder="密码" class="write" v-model="password" style="width: calc(100% - 1.1rem);">
        </div>
        <div style="position: relative;">
          <img src="../../images/login_loading.gif" style="    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    top:50%;
    transform: translateY(50%);
    left: 1.65rem;" alt="" v-show="loadinging">
          <input type="button" value="登入" class="btn input mt5" v-bind:class="{isDj:is_dianji}" @click="login()">
        </div>
      </form>
      <ul class="bottom">
        <a href="#/register"><li class="li1">立即注册</li></a>
        <li class="li2"></li>
        <a href="#/forget"><li>忘记密码？</li></a>
      </ul>
    </div>
    <div class="load" style="display:none;">
      <div class="load-container load4"><div class="loader"> <i></i></div></div>
    </div>
    <div class="mark" v-show="mark" @click="none()"></div>
    <pop style="text-align: center" class="tip" :title="tip"></pop>
    <load v-show="isload"></load>
  </div>
</template>
<script>
	import {
		setCookie,
		getCookie
	} from '../../assets/js/cookie.js'
	import {
		getOpenUrl
	} from '../../assets/js/common.js'
	import qs from 'qs'
	export default {
		name: 'login',
		data() {
			return {
			  isload:false,
				tip: '',
				loadinging: false,
				is_dianji: false,
				mark: false,
				showLogin: true,
				showTishi: false,
				tishi: '',
				username: '',
				password: '',
				adData:''
			}
		},
		mounted() {
			this.isLogin();
			var token = localStorage.getItem("token");
			let isLogin = getCookie("islogin");
			if (isLogin == 1) {
				this.$router.push({
					path: '/home'
				});
			}
			this.get();
		},
		methods: {
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
			isLogin() {
				var islogin = getCookie("islogin");
				if (islogin == 0) {
					this.tip = '用户失效,请重新登录';
					//$('.tip').show();
					setTimeout(function() {
						//$('.tip').hide();
					}, 1000)
				}
			},
			login() {
				this.is_dianji = true;
				this.loadinging = true;
				if (this.username == "" || this.password == "") {
					this.tip = '请输入用户名或密码';
					$('.tip').show();
					setTimeout(function() {
						$('.tip').hide();
					}, 1000)
					this.is_dianji = false;
					this.loadinging = false;
				} else {
					/*接口请求*/
					var data = qs.stringify({
						"client_secret": "4d996cfcd7040021f797ccacfbff869c",
						"client_id": "ZTEAPP",
						"username": this.username,
						"password": this.password,
						"grant_type": "password"
					})
					console.log(data)
					let self = this;
					clearTimeout(this.fn);
					self.fn = setTimeout(()=> {
					  //self.isload = true;
						self.$http.post(getOpenUrl() + 'login', data, {
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded',
									//              "Authorization": "Bearer token"
								},
							})
							.then((res) => {
                //self.isload = false;
								/*接口的传值是(0000,用户存在),(其他账号或密码输入错误)，同时还会检测管理员账号的值*/
								if (res.body.code == 0) {
									self.tishi = "登陆成功"
									self.showTishi = true;
                  self.$router.push('/home')
									self.is_dianji = false;
									self.loadinging = false;
                  window.location.reload();
									localStorage.setItem("token", res.body.data.access_token);
									let expireDays = 1000 * 60 * 60;
									setCookie("token", res.body.data.access_token, expireDays);
									//获取模块访问权限
									this.$http.get(getOpenUrl() + 'viewpriv', {
										headers: {
											'Authorization': 'Bearer ' + getCookie('token')
										}
									}).then((res) => {
										setCookie("islogin", 1, expireDays);
										setCookie("isexpert", res.body.isexpert, expireDays);
										setCookie("ishasgroup", res.body.ishasgroup, expireDays);
										setCookie("groupview", res.body.data.group.view, expireDays);
                    setCookie("findview", res.body.data.find_view.view, expireDays);
									});
									let qr_code = getCookie('qrCode');
									if (qr_code != '') {
										self.$http.get(getOpenUrl() + 'user/invite', {
											headers: {
												'Authorization': 'Bearer ' + getCookie('token')
											},
											params: {
												invitecode: qr_code
											}
										}).then((res) => {
											if (res.body.code == '0000') {
												self.tip = res.body.data.info;
												$('.tip').show();
												setTimeout(function() {
													$('.tip').hide();
												}, 1000)
											} else {
												self.tip = res.body.error_description;
												$('.tip').show();
												setTimeout(function() {
													$('.tip').hide();
												}, 1000)
											}
										});
									}
								} else {
									self.tip = res.body.error_description;
									$('.tip').show();
									setTimeout(function() {
										$('.tip').hide();
									}, 1000)
									self.is_dianji = false;
									self.loadinging = false;
								}
								console.log(res.body.data)
								if (res.body.data.access_token == undefined) {
									self.tip = '账号或密码不存在';
									self.is_dianji = false;
									self.loadinging = false;
									$('.tip').show();
									setTimeout(function() {
										$('.tip').hide();
									}, 1000)
								}
							})
					}, 500)
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
  .back1{
    width: 0.18rem;
    height: 0.34rem;
    display: block;
    background: url(../../images/back.png) no-repeat;
    background-size: cover;
    float: left;
    margin-top: 0.27rem;
    margin-left: 0.3rem;
  }
	.mark {
		width: 100%;
		height: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 12;
		background: rgba(0, 0, 0, 0.3);
	}

	.tip {
		display: none;
	}

	.nav {
		margin: 0 auto;
		width: 78%;
		max-width: 500px;
		padding-top: 0.6rem;
	}

	.login {
		/*max-width:1080px;width:100%;height:100%;background:none;*/
		height: 100%;
		overflow-y: auto;
		background-size:cover;
	}

	.logo img {
		width: 2.57rem;
		height: 1.92rem;
		display: block;
		margin: 0 auto;
		margin-bottom: 1.2rem;
	}

	.input {
		width: 100%;
		height: 0.8rem;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 0.05rem;
		margin-top: 0.2rem;
	}

	.up {
		width: 0.22rem;
		height: 0.26rem;
		background: url(../../images/passage-3.png) no-repeat;
		float: left;
		margin-left: 0.38rem;
		margin-top: 0.27rem;
		margin-right: 0.2rem;
	}

	.up1 {
		background: url(../../images/user.png) no-repeat;
		background-size: 100% 100%;
	}

	.up2 {
		background: url(../../images/passage-3.png) no-repeat;
		background-size: 100% 100%;
	}

	.write {
		  line-height: 0.3rem;
	    height: 0.3rem;
	    border-left: 1px solid #54c2f0;
	    border-radius: 0;
	    float: left;
	    margin-top: 0.26rem;
	    font-size: 0.21rem;
	    padding-left: 0.2rem;
	}
	input::-webkit-input-placeholder {
		color: #54c2f0;
	}

	.mt5 {
		margin-top: 1rem;
		text-align: center;
		background: rgba(18, 157, 222, 0.8);
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
</style>
