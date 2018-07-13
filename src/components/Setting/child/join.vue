<template>
	<div class="content">
		<div class="header">
			<a class="a1" href="javascript:history.back(-1);"></a>
			<span class="forget">加入方式</span>
			<a class="a2" @click="submit()"></a>
		</div>
		<div class="nav-all">
			<div class="nav">
				<div class="nav-a">
					<div class="nav-l">任何人均可加入</div>
					<div class="nav-r">
						<li class="li4">
							<label>
	                <input type="radio" name="a" ref="a" value="a"/><b></b>
	            </label>
						</li>
					</div>
				</div>
			</div>
			<div class="nav">
				<div class="nav-a">
					<div class="nav-l">需管理员批准后方可加入</div>
					<div class="nav-r">
						<li class="li4">
							<label>
	                <input type="radio" name="a" ref="b" value="b"/><b></b>
	            </label>
						</li>
					</div>
				</div>
			</div>
			<div class="nav">
				<div class="nav-a">
					<div class="nav-l">邀请加入</div>
					<div class="nav-r">
						<li class="li4">
							<label>
	                <input type="radio" name="a" ref="c" value="c"/><b></b>
	            </label>
						</li>
					</div>
				</div>
			</div>
		</div>
    <load v-show="isload"></load>
		<pop class="tip" :title="tip"></pop>
	</div>
</template>

<script>
	var group=''
	import qs from 'qs'
	import { getOpenUrl ,getToken} from "../../../assets/js/common.js"
	import { setCookie, getCookie } from '../../../assets/js/cookie.js'
	export default {
		name: 'content',
		data() {
			return {
			  isload:false,
				tip:'',
				listData:{}
			};
		},
		mounted() {
			$('.tip').hide();
			this.$http.get(getOpenUrl() + "groupPower", {
        headers: {						'Authorization': 'Bearer ' + getToken()					},
				params: {
					gid: this.$route.query.gid
				}
			}).then((res) => {
				this.listData = res.body.data;
				if(this.listData.need_invite == 0) {
					this.$refs.a.checked = true;
				} else if(this.listData.need_invite == 1) {
					this.$refs.b.checked = true;
				} else if(this.listData.need_invite == 2) {
					this.$refs.c.checked = true;
				}
				if(group==''){
	    		group=this.listData.need_invite
	    	}
			});
			var $self = this;
			$('input[name="a"]').click(function(){
				if ($(this).val() == 'c'){
					group=2;
				}else if ($(this).val() == 'b'){
					group=1
				}else if($(this).val() == 'a'){
					group=9
				}
			})
		},
		methods: {
			submit(){
			  this.isload = true;
	    	this.$http.post(getOpenUrl() + "groupPowerDo", {
					gid: this.$route.query.gid,
					need_invite:group,
				},{
					headers: {						'Authorization': 'Bearer ' + getToken()					}

				}).then((res) => {
	    	  this.isload = false;
					if(res.body.code==0){
						this.tip = "提交成功";
			            $('.tip').show();
			            setTimeout(function(){
			              $('.tip').hide();
			              history.go(-1)
			            },1000)

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
	}
</script>
<style scoped>
	.header{padding-top:0.3rem;height: 0.7rem;padding-left: 0.2rem;padding-right: 0.2rem;position: relative;box-shadow:0 0 5px #ebebeb;position: fixed;width: calc(100% - 0.4rem);background: #fff;z-index: 11;}
    .header .a1{width: 0.18rem;height: 0.7rem;display: block;background: url(../../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
    .header .a2{width: 0.32rem;height: 0.7rem;display: block;background: url(../../../images/ok.png) no-repeat 0 50%;background-size: 0.32rem 0.2rem;float:right;}
    .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}
	.nav-all{overflow: hidden;padding-top: 1rem;}


	.nav {
		line-height: 0.85rem;
		font-size: 0.22rem;
		color: #272727;
		overflow: hidden;
		border-bottom: 1px solid #e0e0e0;
	}

	.nav-a {
		width: 6rem;
		margin: 0 auto;
	}

	.nav-l {
		float: left;
	}

	.nav-r {
		width: 0.24rem;
		height: 0.85rem;
		float: right;
	}

	.nav-r .li4 {
		width: 0.25rem;
		height: 0.85rem;
		float: right;
		position: relative;
	}

	label {
		width: 0.24rem;
		height: 0.24rem;
		border-radius: 50%;
		display: block;
		position: relative;
		z-index: 10;
		top: 50%;
		transform: translateY(-50%);
	}

	input[type="radio"] {
		display: none;
		position: absolute;
	}

	input[type="radio"]+b {
		position: absolute;
		top: 0;
		left: 0;
		display: inline-block;
		width: 0.24rem;
		height: 0.24rem;
		border: 1px solid #ccc;
		cursor: pointer;
		border-radius: 50%;
		vertical-align: middle;
	}

	input[type="radio"]:checked+b {
		background: url(../../../images/checkbox.png)no-repeat;
		background-size: cover;
		border: none;
	}
</style>
