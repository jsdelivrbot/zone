<template>
	<div>
		<div class="header">
			<a href="javascript:history.back(-1);" @click="back"></a>
      <!--<a @click="back"></a>-->
			<span class="forget">礼品商城</span>
		</div>
    <div class="friend" style="height:100%;overflow: auto;position:relative;">
      <div class="page-loadmore backtop" style="font-size:0.2rem;">
        <mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">
      <div class="top">
			<span class="body">
            <img  v-lazy="this.face" />
        </span>
        <div class="t-b">
          <p class="p1">{{this.userData.uname}}</p>
          <p class="p2">我的积分</p>
          <p class="p3">{{this.userData.score}}</p>
        </div>
      </div>
      <div class="center">
        <div v-for="(list,index) in listData" :key="index">
          <div class="c-t">
            <ul>
              <li class="c-t-li1" :class="list.min_points - min>0?'bb':'bw'">
                <img v-if="list.icon" v-lazy="list.icon" />
                <font v-else>{{list.name}}</font>
              </li>
              <!--<li class="c-t-li2" :class="list.min_points - min>0?'light':'gray'">成长值需满{{list.min_points}}<span v-if="list.min_points - min>0">当前还差{{list.min_points - min}}</span></li>-->
            </ul>
          </div>
          <div class="c-b">
            <div class="c-b-all">
              <div class="c-b-all-l" :class="list.min_points - min>0?'b0':'b1'">
                <dl v-for="(gift,index) in list.gifts" :key="index">
                  <router-link :to="'/gift?gift_id='+gift.id">
                    <dt><img v-lazy="gift.img"/></dt>
                  </router-link>
                  <dd class="d1">{{gift.name}}</dd>
                  <dd class="d2">积分<span>{{gift.price}}</span></dd>
                  <a v-if="gift.num<=0&&gift.is_suo">
                    <dd class="btnw">补货中</dd>
                  </a>
                  <a v-if="gift.is_suo==false">
                    <dd class="btnw">未解锁</dd>
                  </a>
                  <router-link :to="'/order?gift_id='+gift.id" class="a2" v-if="gift.num>0&&gift.is_suo">
                    <dd class="btnw">立即兑换</dd>
                  </router-link>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
        </mt-loadmore>
      </div>
    </div>
    <load v-show="isload"></load>
	</div>
</template>
<script>
	import { setCookie, getCookie } from '../../assets/js/cookie.js'
	import { getOpenUrl, getToken } from "../../assets/js/common.js"
	import qs from 'qs'
	var token = getToken();
	var topshop = ''
	export default {
		name: 'login',
		data() {
			return {
			  isload:false,
				userData: {},
				listData: {},
				face: {},
				min: '',
        allLoaded: false,
        scrollMode:"auto",
        topStatus: '',
			}
		},
		mounted() {
			this.$root.eventHub.$on('ddSuccess', () => {
				this.getData()
			})
      this.isload = true;
			this.getData()
//			console.log($(".friend").scrollTop())
//			console.log(this.scroll)
//			var islogin = getCookie("islogin");
//			if(islogin == 0) {
//				this.$router.push('/login')
//			}
//			this.$http.get(getOpenUrl() + "userGift", {
//					headers: {
//						'Authorization': 'Bearer ' + token
//					}
//				}).then((res) => {
//					this.userData = res.body.data
//					this.min = this.userData.score
//					this.face = this.userData.face
//					console.log(this.userData)
//
//				}),
//				this.$http.get(getOpenUrl() + "giftGoodsList", {
//					headers: {
//						'Authorization': 'Bearer ' + token
//					}
//				}).then((res) => {
//					this.listData = res.body.data
//					$(".friend").scroll(function() {
//						if($(".friend").scrollTop() > $('.top').height() - $('.top .p3').height() - $('.top .p3').height()) {
//							$('.header').addClass('on')
//						} else {
//							$('.header').removeClass('on')
//						}
//
//					});
//				});
		},
		methods: {
      loadTop() { // 刷新数据的操作
        setTimeout(()=> {
          this.getData()
          this.allLoaded = false;
          this.$refs.loadmore.onTopLoaded();
        },2000)
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      handleBottomChange(status){
        this.bottomStatus = status;
      },
		  back(){
        this.$router.goBack();
		    //android.back1();
      },
			getData() {
		    //android上要注释
				var islogin = getCookie("islogin");
				if(islogin == 0) {
					this.$router.push('/login')
				}
				this.$http.get(getOpenUrl() + "userGift", {
					headers: {
						'Authorization': 'Bearer ' + token
					}
				}).then((res) => {
          this.isload = false;
					this.userData = res.body.data
					this.min = this.userData.score
					this.face = this.userData.face
					console.log(this.userData)

				}),
				this.$http.get(getOpenUrl() + "giftGoodsList", {
					headers: {
						'Authorization': 'Bearer ' + token
					}
				}).then((res) => {
          this.isload = false;
					this.listData = res.body.data
					$(".friend").scroll(function() {
						if($(".friend").scrollTop() > $('.top').height() - $('.top .p3').height() - $('.top .p3').height()) {
							$('.header').addClass('on')
						} else {
							$('.header').removeClass('on')
						}

					});
				});
			}
		},
		activated() {
			//路由缓存 前进后退
			$('.load').hide();
			$(".friend").animate({
				"scrollTop": topshop
			}, 0)
		},
		beforeRouteLeave(to, from, next) {
			topshop = $(".friend").scrollTop()
			console.log($(".friend").scrollTop())
			this.$store.commit('HOMESTOPF', topshop)
			next();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.l {
		margin-left: 0.03rem;
	}

	.header {
		height: 0.7rem;
		padding-left: 0.28rem;
		position: fixed;
		width: 100%;
		z-index: 1;
    padding-top: 0.3rem;
	}

	.header a {
		width: 0.18rem;
		height: 0.34rem;
		display: block;
		background: url(../../images/backw.png) no-repeat;
		background-size: cover;
		float: left;
		margin-top: 0.2rem;
	}

	.forget {
		line-height: 0.7rem;
		font-size: 0.26rem;
		display: block;
		float: left;
		color: #fff;
		position: absolute;
		left: 50%;
		-webkit-transform: translateX(-50%);
		-moz-transform: translateX(-50%);
		-ms-transform: translateX(-50%);
		-o-transform: translateX(-50%);
		transform: translateX(-50%);
	}

	.header.on {
		background: #fff;
		color: #008dd3;
		z-index: 9
	}

	.header.on .forget {
		color: #008dd3
	}

	.header.on a {
		background: url(../../images/back.png) no-repeat;
		background-size: cover;
	}

	.top {
		height: 4.82rem;
		width: 100%;
		background: url(../../images/jifenbanner.png) no-repeat;
		background-size: cover;
		position: relative;
		margin-bottom: 0.41rem;
	}

	.body {
		width: 1.8rem;
		height: 1.8rem;
		border-radius: 50%;
		display: block;
		position: absolute;
		left: 50%;
		margin-left: -0.9rem;
		background: #fff;
		margin-top: 1.2rem;
	}

	.body img {
		width: 1.8rem;
		height: 1.8rem;
		margin: 0 auto;
		/*position: absolute;*/
		/*left: 50%;*/
		/*top: 50%;*/
		/*transform: translate(-50%, -50%);*/
    object-fit: cover;
		border-radius: 50%;
	}

	.t-b {
		position: absolute;
		bottom: 0;
		width: 100%;
	}

	.top .p1 {
		font-size: 0.22rem;
		text-align: center;
		line-height: 0.66rem;
		color: #fff;
	}

	.top .p2 {
		font-size: 0.22rem;
		text-align: center;
		line-height: 0.37rem;
		color: #fff;
	}

	.top .p3 {
		font-size: 0.24rem;
		text-align: center;
		line-height: 0.37rem;
		color: #fff;
		margin-bottom: 0.1rem;
	}

	.center {
		width: 6rem;
		margin: 0 auto;
	}

	.c-t {
		overflow: hidden;
	}

	.c-t ul {
		overflow: hidden;
		margin-left: 0.3rem;
	}

	.c-t li {
		float: left;
	}

	.c-t-li1 {
		width: 0.48rem;
		height: 0.48rem;
		border: 1px solid #54c2f0;
		border-radius: 50%;
		position: relative;
		text-align: center;
		line-height: 0.48rem;
	}

	.c-t-li1 img {
		width: 0.48rem;
		height: 0.48rem;
		border-radius: 50%;
		display: block;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.c-t-li1 font {
		font-size: 0.22rem;
		display: inherit;
		color: #55c2f0
	}

	.c-t-li2 {
		line-height: 0.48rem;
		font-size: 0.22rem;
		color: #fff;
		text-align: center;
		border-radius: 0.24rem;
		background: #54c2f0;
		padding: 0 0.2rem;
		margin-left: 0.3rem;
	}

	.c-b,
	.c-b-all,
	.c-b-all-l {
		overflow: hidden;
	}

	.c-b-all-l {
		width: 4.92rem;
		min-height: 3.23rem;
		border: 1px solid #fff;
		float: right;
		padding-top: 0.2rem;
		padding-left: 0.5rem;
		border-left: 0.02rem solid #54c2f0;
	}

	.c-b-all dl {
		float: left;
		margin-right: 0.02rem;
    margin-bottom: 0.1rem;
	}

	.c-b-all dd {
		text-align: center;
	}

	.c-b-all dt {
		width: 1.62rem;
		height: 1.62rem;
		overflow: hidden;
	}

	.c-b-all dt img {
		width: 1.52rem;
		height: 100%;
		display: block;
	}

	.d1 {
		font-size: 0.22rem;
		color: #242424;
		line-height: 0.38rem;
	}

	.d2 {
		font-size: 0.2rem;
		color: #008dd3;
		line-height: 0.38rem;
	}

	.btnw {
		width: 1.42rem;
		line-height: 0.46rem;
		font-size: 0.2rem;
		color: #757575;
		background: url(../../images/btnw.png) no-repeat;
		background-size: cover;
		margin: 0 auto;
	}

	.a2 .btnw {
		background: #54C2F0;
		color: #fff;
		border-radius: 0.23rem;
	}

	.light {
		background: #f0f3f5;
		color: #757575;
	}

	.gray {
		background: #55c2f0;
		color: #fff;
	}

	.b0 {
		border-left: 0.02rem solid #edeeef;
	}

	.b1 {
		border-left: 0.02rem solid #55c2f0;
	}

	.bb {
		border: 0.02rem solid #edeeef;
	}

	.b2 {
		border: 0.02rem solid #55c2f0;
	}
</style>
