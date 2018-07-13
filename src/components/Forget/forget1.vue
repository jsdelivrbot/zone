<template>
  <div class="forget1" :style="adData">
    <div class="back">
      <a href="javascript:history.go(-1);"></a>
      <span class="forget">忘记密码</span>
    </div>
    <div class="nav">
      <form>
        <div class="mt0 input">
          <input type="password" placeholder="新密码" class="write" v-model="password" ref="password" @blur="yzpassword()">
        </div>
        <span class="sp2" ref="sp2"></span>
        <div class="input">
          <input type="password" placeholder="确认密码" class="write" v-model="password1" ref="password1" @blur="yzpassword1()">
        </div>
        <span class="sp3" ref="sp3"></span>
        <input type="button" value="确认" class="btn input mt5" @click="resetpass()">
      </form>
    </div>
    <pop class="tip" :title="tip"></pop>
  </div>
</template>
<script>
	import {
		getOpenUrl,
    getToken
	} from "../../assets/js/common.js"
	import {
		setCookie,
		getCookie
	} from '../../assets/js/cookie.js'
	import qs from 'qs'
	export default {
		name: 'forget1',
		data() {
			return {
				tip: '',
				password: '',
				password1: '',
				adData: ''
			}
		},
		mounted() {
			$('.tip').hide()
			getCookie("session");
			this.get();
		},
		methods: {
			get() {
				this.$http.get(getOpenUrl() + "ads", {
					params: {
						type: 2
					},
          headers: {						'Authorization': 'Bearer ' + getToken()					}
				}).then((res) => {
					if (res.body.code == '0000') {
						var ads = res.body.data;
						for (var k in ads) {
							this.adData = "background-image:url(" + ads[k].content + ")";
						}
						$('.load').hide();
					}
				})
			},
			yzpassword() {
				var password = /^[a-zA-Z].{5,}/;
				var upassword = this.$refs.password
				var sp2 = this.$refs.sp2
				if (this.password == "") {
					sp2.innerHTML = "请输入密码";
					sp2.style.color = "red";
					sp2.style.display = "block";
				} else if (!password.test(upassword.value)) {
					sp2.innerHTML = "字母开头至少六位";
					sp2.style.color = "red";
					sp2.style.display = "block";
				} else {
					sp2.style.display = "none";
				}
			},
			yzpassword1() {
				var sp3 = this.$refs.sp3
				if (this.password == "") {
					sp3.innerHTML = "请确认密码";
					sp3.style.color = "red";
					sp3.style.display = "block";
				} else if (this.password != this.password1) {
					sp3.innerHTML = "两次输入的密码不一致";
					sp3.style.color = "red";
					sp3.style.display = "block";
				} else {
					sp3.style.display = "none";
				}
			},
			resetpass() {
				var sp2 = this.$refs.sp2;
				var sp3 = this.$refs.sp3;
				if (this.password == "") {
					sp2.innerHTML = "请输入密码";
					sp2.style.color = "red";
					sp2.style.display = "block";
				}
				if (this.password == "") {
					sp3.innerHTML = "请确认密码";
					sp3.style.color = "red";
					sp3.style.display = "block";
				} else {
					/*接口请求*/
					//       var data = qs.stringify({
					//         "password": this.password,
					//         "cpassword": this.password1,
					//         "skey":getCookie("session")
					//       })
					//       console.log(data)
					this.$http.post(getOpenUrl() + 'resetpass', {
							"password": this.password,
							"cpassword": this.password1,
							"skey": getCookie("session")
						})
						.then((res) => {
							//           console.log(res)
							//           getCookie("session");
							if (res.body.code == 0) {
								this.tip = "重置成功";
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
	.forget1 {
		/*max-width: 1080px;
		width: 100%;
		height: 100%;*/
		/*background: none;*/
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
		width: calc(100% - 0.41rem);
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

	.btn {
		font-size: 0.28rem;
		line-height: 0.8rem;
		color: #fff;
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
