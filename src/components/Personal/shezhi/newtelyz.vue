<template>
	<div class="tjshdz">
		<div class="header">
			<div class="header1">
				<a @click="back" href="javascript:history.back(-1);" class="a1"></a>
				<!--<a @click="back" class="a1"></a>-->
				<span class="forget">新手机号验证</span>
				<a class="a2" @click="wancheng">确定</a>
			</div>
		</div>
		<div class="body">
			<div class="bodyall">
				<div class="body-top">
					<input type="text" placeholder="请输入新手机号" class="txt" ref="mobile" />
					<input id="btnmsg" type="button" value="获取验证码" @click="getKey" class="btn" />
				</div>
				<div class="body-top">
					<input type="text" placeholder="请输入图形验证码" class="txt" v-model="yzm" ref="yzm">
					<img :src="yzmData" style="    float: right;
    width: 1.9rem;
    height: 0.7rem;
    /*border-radius: 0.35rem;*/
    color: #fff;" class="yzm" @click="captcha()">
				</div>
				<div class="body-top">
					<input type="text" placeholder="请输入验证码" class="txt" ref="vericode" />
				</div>
			</div>

		</div>
		<pop style="text-align: center" class="tip" :title="tip"></pop>
    <load v-show="isload"></load>
	</div>
</template>
<script>
	import Vue from 'vue'
	import { setCookie, getCookie } from '../../../assets/js/cookie.js'
	import { getOpenUrl, getToken } from '../../../assets/js/common.js'
	import qs from 'qs'
	export default {
		data() {
			return {
			  isload:false,
				tip: '',
				key: '',
				yzmData: {},
				yzm: '',
				skey: {}
			}
		},
		mounted() {
			var skey = getToken();
			this.$http.post(getOpenUrl() + "captcha", {

			},{
					headers: {
						"Authorization": "Bearer " + getToken()
					}
				})
				.then((res) => {
					this.yzmData = res.body.data.captcha;
					this.skey = res.body.data.captcha_key
				})

			//是否存在input焦点事件或图层打开事件
			$('input').focus(function() {
				//获取焦点
				let expireDays = 1000 * 60 * 60;
				setCookie("inputkey", 1, expireDays);
			});
			let self = this;
			$(document).bind('click', function(e) {
				var target = $(e.target);
				if(target.closest("input").length == 0 && target.closest('.a1').length == 0) {
					setCookie("inputkey", '', -1);
				}
			});
		},
		methods: {
			back() {
				setCookie("inputkey", '', -1);
				//        android.back1();
			},
			time() {
				var wait = 60; //时间
				$("#btnmsg").attr("disabled", true).val("正在获取...");
				var self = this;
				this.timer = setInterval(function() {
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
			captcha() {
				this.$http.post(getOpenUrl() + 'captcha', {
					'skey': this.skey
				},{
						headers: {
							"Authorization": "Bearer " + getToken()
						}
					})
					.then((res) => {
						console.log(res);
						this.yzmData = res.body.data.captcha;
						console.log(this.yzmData);
						Vue.set(this.yzmData, this.yzmData);
						//          let expireDays = 1000 * 60 * 60;
						//          this.setCookie("capKey",res.body.data.captcha_key,expireDays);
					})
			},
			getKey() {
				this.$http.post(getOpenUrl() + "sms", {
					mobile: this.$refs.mobile.value,
					captcha: this.yzm,
					skey: this.skey,
					type: 'bindmobile',
					is_time: 60
				}, {
					headers: {
						"Authorization": "Bearer " + getToken()
					}
				}).then((res) => {
					if(res.body.code == '0000') {
						this.time();
						this.tip = '发送成功';
						$('.tip').show();
						setTimeout(function() {
							$('.tip').hide();
						}, 1000)
						this.key = res.body.data.key;
					} else {
						this.tip = res.body.error_description;
						$('.tip').show();
						this.captcha();
						setTimeout(function() {
							$('.tip').hide();
						}, 1000)
					}
				});
			},
			wancheng() {
				if(this.$refs.mobile.value == '') {
					this.tip = '请输入原绑定手机号'
					$('.tip').show();
					setTimeout(function() {
						$('.tip').hide();
					}, 1000)
				} else if(this.$refs.mobile.value != '' && this.$refs.yzm.value == '') {
					this.tip = '请输入图文验证码'
					$('.tip').show();
					setTimeout(function() {
						$('.tip').hide();
					}, 1000)
				} else if(this.$refs.mobile.value != '' && this.$refs.yzm.value != '' && this.$refs.vericode.value == '') {
					this.tip = '请输入验证码'
					$('.tip').show();
					setTimeout(function() {
						$('.tip').hide();
					}, 1000)
				} else if(this.key == '') {
					this.tip = '验证码错误'
					$('.tip').show();
					setTimeout(function() {
						$('.tip').hide();
					}, 1000)
				} else {
				  this.isload = true;
					this.$http.post(getOpenUrl() + "user/mobileVerify", {
						type: 'new',
						mobile: this.$refs.mobile.value,
						mobileCode: this.$refs.vericode.value,
						skey: this.key
					}, {
						headers: {
							"Authorization": "Bearer " + getToken()
						}
					}).then((res) => {
					  this.isload = false;
						if(res.body.status) {
							this.tip = res.body.data.info;
							$('.tip').show();
							setCookie("inputkey", '', -1);
							setTimeout(() => {
								$('.tip').hide();
								this.$router.push({
									path: '/mysz',

								});
							}, 1000)
						} else {
							this.tip = res.body.error_description;
							$('.tip').show();
							setTimeout(function() {
								$('.tip').hide();
							}, 1000)
						}
					});
				}
			}
		},
		beforeRouteLeave(to, from, next) {
			//路由离开时
			var isInputKey = parseInt(getCookie('inputkey'));
			if(isInputKey == 1) {
				setCookie("inputkey", '', -1);
				next(false)
			} else {
				next()
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.tip {
		display: none;
	}

	.header {
		height: 0.7rem;
		position: fixed;
		top: 0;
		box-shadow: 0 0 5px #ebebeb;
		width: 100%;
		background: #fff;
    padding-top: 0.3rem;
	}

	.header1 {
		padding: 0 0.2rem;
		overflow: hidden;
	}

	.header .a1 {
		width: 0.18rem;
		height: 0.34rem;
		background: url(../../../images/back.png) no-repeat;
		background-size: cover;
		float: left;
		display: block;
		margin-top: 0.2rem;
	}

	.header .a2 {
		width: 0.73rem;
		height: 0.7rem;
		float: right;
		display: block;
		color: #008dd3;
		line-height: 0.7rem;
		text-align: center;
		font-size: 0.22rem;
	}

	.forget {
		line-height: 0.7rem;
		font-size: 0.26rem;
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

	.body {
		padding-top: 1rem;
		padding-bottom: 0.98rem;
		width: 5.84rem;
		margin: 0 auto;
	}

	.bodyall {
		margin-top: 0.62rem;
	}

	.body-top {
		width: 5.84rem;
		height: 0.7rem;
		background: #f0f0f0;
		/*border-radius: 0.35rem;*/
		margin-bottom: 0.37rem;
	}

	.body-top input {
		display: block;
		float: left;
	}

	.body-top .txt {
		color: #fff;
		line-height: 0.7rem;
		padding-left: 0.31rem;
		font-size: 0.2rem;
		color: #adadad;
	}

	.body-top .btn {
		width: 1.9rem;
		height: 0.7rem;
		/*border-radius: 0.35rem;*/
		background: #46c2ff;
		color: #fff;
		float: right;
	}
</style>
