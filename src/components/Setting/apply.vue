<template>
	<div class="apply">
		<div class="back">
			<a href="javascript:history.back(-1);" class="a1"></a>
			<span class="forget">加圈申请</span>

			<a href="#/nofriend" class="a3"><span class="body">
	        <img v-lazy="this.listData.face"/>
	      </span></a>

		</div>
		<div class="center">
      <p class="p1">{{this.listData.uname}}</p>
			<div class="center-t">
				<!--<p class="p2" v-for="(data,index) in this.listData.user_group" :style="'background:'+data.bcolor" v-if="data.icon==''">{{data.title}}</p>-->
        <p class="p2">
          <img v-for="(data,index) in this.listData.user_group" v-lazy="data.icon" class="icon" v-if="data.icon!=''" />
        </p>
        <div style="clear:both;"></div>
			</div>
			<div class="center-b">
				<dl>
					<dt class="dt1"></dt>
					<dd class="dd1" v-text="this.listData.sex==1?'男':'女'"></dd>
				</dl>
				<dl>
					<dt class="dt2"></dt>
					<dd class="dd2">{{this.listData.province}}</dd>
				</dl>
				<dl>
					<dt class="dt3"></dt>
					<dd class="dd3">{{this.listData.city}}</dd>
				</dl>
				<dl>
					<dt class="dt4"></dt>
					<dd class="dd4">{{this.listData.ctime}}</dd>
				</dl>
			</div>
		</div>
		<div class="bottom">
			<ul class="bottom-ul">
				<li class="li1">申请加入</li>
				<li class="li2">{{this.listData.name}}</li>
				<li class="li3">{{this.listData.reason}}</li>
			</ul>
			<ul class="bottom-ul1">
				<li class="li1" @click="change(2)">
					<a class="a1">拒绝</a>
				</li>
				<li class="li2" @click="change(3)">
					<a class="a2">同意</a>
				</li>
			</ul>
		</div>
		<pop class="tip" :title="tip"></pop>
    <load v-show="isload"></load>
	</div>
</template>
<script>
	import { getOpenUrl ,getToken} from "../../assets/js/common.js"
	import { setCookie, getCookie } from '../../assets/js/cookie.js'
	import qs from 'qs'
	export default {
		name: 'login',
		data() {
			return {
			  isload:false,
				tip: '',
				listData: {}
			}
		},
		mounted() {
			$('.tip').hide();
			this.$http.get(getOpenUrl() + "groupApply", {
        headers: {						'Authorization': 'Bearer ' + getToken()					},
				params: {
					id: this.$route.query.id
				}
			}).then((res) => {
				this.listData = res.body.data
			});
		},
		methods: {
			change(type) {
			  this.isload = true;
				this.$http.post(getOpenUrl() + "groupUserChange", {

					id: this.$route.query.id,
					type: type
				}, {
					headers: {						'Authorization': 'Bearer ' + getToken()					}
				}).then((res) => {
          this.isload = false;
					if(res.body.code == 0) {
						this.tip = '操作成功';
						$('.tip').show();
						setTimeout(()=>{
							$('.tip').hide();
							this.$router.go(-1)
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
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.a3 {
		display: block;
	}

	.nav {
		margin: 0 auto;
		width: 78%;
		max-width: 500px;
		padding-top: 1rem;
	}

	.login {
		height: 100%;
	}

	.back {
		height: 4.43rem;
		width: 100%;
		background: url(../../images/topbanner.png) no-repeat;
		background-size: cover;
		position: relative;
	}

	.back .a1 {
		width: 0.18rem;
		height: 0.34rem;
		background: url(../../images/back.png) no-repeat;
		background-size: cover;
		position: absolute;
		top: 0.47rem;
		left: 0.28rem;
		display: block;
	}

	.forget {
		line-height: 0.7rem;
		font-size: 0.26rem;
		display: block;
		float: left;
		color: #008dd3;
		position: absolute;
		top: 0.3rem;
		left: 50%;
		-webkit-transform: translateX(-50%);
		-moz-transform: translateX(-50%);
		-ms-transform: translateX(-50%);
		-o-transform: translateX(-50%);
		transform: translateX(-50%);
	}

	.body {
		width: 1.8rem;
		height: 1.8rem;
		border-radius: 50%;
		display: block;
		position: absolute;
		bottom: -1rem;
		left: 50%;
		margin-left: -0.9rem;
		padding: 0.1rem;
		background: #fff;
	}

	.body img {
		width: 1.8rem;
		height: 1.8rem;
		border-radius: 50%;
	}

	.center {
		line-height: 0.78rem;
		color: #51667e;
		font-size: 0.24rem;
		margin-top: 1.03rem;
		position: relative;
		text-align: center;
	}

	.center-t {
		height: 100%;
		margin: 0 auto;
		width: 6rem;
		position: relative;
	}

	.center-t .icon {
		display: block;
		width: 0.3rem;
		height: 0.3rem;
		float: left;
		/*margin-top: 0.2rem;*/
		margin-left: 0.1rem;
	}

	.center p {
		float: left;
	}

	.center .p1 {
		display: inline;
		/*margin-left: 2.95rem;*/
    width: 100%;
    text-align: center;
    line-height: normal;
	}

	.center .p2 {
    float: none;
    display: inline-block;
    margin: 0px 0 0px 0px;
    line-height: 0;
    padding: 0;
    height: .3rem;
    width: auto;
    background: transparent;
    vertical-align: middle;
    color: #fff;
    border-radius: 0.05rem;
    text-align: center;
    font-size: 0.2rem;
	}

	.center-b {
		width: 5.8rem;
		border-bottom: 1px solid #f0f0f0;
		overflow: hidden;
		margin: 0 auto;
	}

	.center-b dl {
		float: left;
		width: 25%;
	}

	.center-b dt {
		margin: 0 auto;
	}

	.center-b .dt1 {
		width: 0.38rem;
		height: 0.31rem;
		background: url(../../images/sex.png) no-repeat;
		background-size: cover;
	}

	.center-b .dt2 {
		width: 0.40rem;
		height: 0.37rem;
		background: url(../../images/beijing.png) no-repeat;
		background-size: cover;
	}

	.center-b .dt3 {
		width: 0.40rem;
		height: 0.38rem;
		background: url(../../images/captail.png) no-repeat;
		background-size: cover;
	}

	.center-b .dt4 {
		width: 0.37rem;
		height: 0.32rem;
		background: url(../../images/click.png) no-repeat;
		background-size: cover;
	}

	.center-b .dd1 {
		margin-top: 0.07rem;
	}

	.center-b .dd2 {
		margin-top: 1px;
	}

	.center-b .dd4 {
		margin-top: 0.06rem;
	}

	.bottom-ul .li1 {
		width: 100%;
		height: 0.26rem;
		font-size: 0.26rem;
		text-align: center;
		color: #000014;
		margin-top: 0.3rem;
	}

	.bottom-ul .li2 {
		width: 100%;
		height: 0.2rem;
		font-size: 0.2rem;
		text-align: center;
		color: #bcc3cd;
		margin-top: 0.15rem;
	}

	.bottom-ul .li3 {
		width: 4.45rem;
		line-height: 0.32rem;
		font-size: 0.2rem;
		text-align: center;
		color: #bcc3cd;
		margin: 0 auto;
		margin-top: 0.24rem;
		color: #5c7086;
	}

	.bottom-ul1 {
		width: 4.6rem;
		height: 0.56rem;
		margin: 0 auto;
		margin-top: 0.72rem;
	}

	.bottom-ul1 li {
		width: 2.08rem;
		height: 0.54rem;
		float: left;
		border-radius: 0.28rem;
	}

	.bottom-ul1 li a {
		width: 2.08rem;
		height: 0.54rem;
		line-height: 0.54rem;
		color: #008dd3;
		font-size: 0.22rem;
		display: block;
		text-align: center;
		border-radius: 0.28rem;
	}

	.bottom-ul1 .a1 {
		width: 2.08rem;
		height: 0.54rem;
		color: #008dd3;
		border: 1px solid #008dd3;
	}

	.bottom-ul1 .a2 {
		width: 2.08rem;
		height: 0.54rem;
		color: #fff;
		background: #008dd3;
		border: 1px solid #008dd3;
	}

	.bottom-ul1 .li2 {
		float: right;
	}
</style>
