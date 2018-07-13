<template>
	<div class="circle" ref="a1" style="height:100%;">
		<!--<my-header title="圈子"></my-header>-->
		<!--<div class="banner">-->
			<!--<div class="slide" style="position: relative;">-->
				<!--<img src="../../images/groupbanner.jpg" />-->
				<!--<ul class="groupbanner" style="text-align: center;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);width: 100%;">-->
					<!--<li style="color: #272727;font-size: 0.4rem;"><span>{{this.imgData}}</span><span>个圈子等你来玩</span></li>-->
					<!--<li style="color: #242424;font-size: 0.3rem;">立即选择加入</li>-->
				<!--</ul>-->
			<!--</div>-->
		<!--</div>-->
		<div class="nav" style="overflow: auto;
    height:calc(100% - 1.54rem);
    position: relative;">
      <div class="page-loadmore backtop" style="font-size:0.2rem;">
        <mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">
			<div class="nav-list">
				<div class="nav-top" style="padding-top: 0.3rem;">
					<a>
						<p>常去的圈子</p>
					</a>
				</div>
				<div class="nav-bottom no" v-show="oftengroupshow">您还没有看过任何圈子</div>
				<div class="nav-bottom" v-for="(oftengroup,index) in oftengroupData">
					<div class="tip-bottom">
						<div class="tip-bottom-l">
							<router-link :to="'/listcircle?gid='+oftengroup.id">
								<img v-lazy="oftengroup.logo" />
							</router-link>
						</div>
						<div class="tip-bottom-r">
							<div class="nav-left" :style="oftengroup.jtime!=0?'width:'+'100%':'3.21rem'">
								<router-link :to="'/listcircle?gid='+oftengroup.id">
									<ul>
										<li class="li1">{{oftengroup.name}}</li>
										<li class="li2" v-html="oftengroup.intro"></li>
										<li class="li3">
											<span class="li3-p1">{{oftengroup.membercount}}</span>
											<span class="li3-p2">{{oftengroup.threadcount}}</span>
										</li>
									</ul>
								</router-link>
							</div>
							<input type="button" class="nav-right" @click="blue(oftengroup.id)" ref="join" :id="'join_'+oftengroup.id" :name="oftengroup.id" v-show="oftengroup.jtime==0" v-if="oftengroup.need_invite!=2"/>
						</div>
					</div>
				</div>
			</div>
			<div class="line"></div>
			<div class="nav-list">
				<div class="nav-top">
					<p class="p2">我创建的</p>
				</div>
				<div class="nav-bottom no" v-show="mygroupshow">您还没有创建过圈子</div>
				<div class="nav-bottom" v-for="(mygroup,index) in mygroupData">
					<div class="tip-bottom">
						<div class="tip-bottom-l">
							<router-link :to="'/listcircle?gid='+mygroup.id">
								<img v-lazy="mygroup.logo" />
							</router-link>
						</div>
						<div class="tip-bottom-r">
							<div class="nav-left" :style="mygroup.jtime!=0?'width:'+'100%':'3.21rem'">
								<router-link :to="'/listcircle?gid='+mygroup.id">
									<ul>
										<li class="li1">{{mygroup.name}}</li>
										<li class="li2" v-html="mygroup.intro"></li>
										<li class="li3">
											<span class="li3-p1">{{mygroup.membercount}}</span>
											<span class="li3-p2">{{mygroup.threadcount}}</span>
										</li>
									</ul>
								</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="line"></div>
			<div class="nav-list">
				<div class="nav-top">
					<p class="p3">我加入的</p>
				</div>
				<div class="nav-bottom no" v-show="usergroupshow">您还没有加过任何圈子</div>
				<div class="nav-bottom" v-for="(usergroup,index) in usergroupData">
					<div class="tip-bottom">
						<div class="tip-bottom-l">
							<router-link :to="'/listcircle?gid='+usergroup.id">
								<img v-lazy="usergroup.logo" />
							</router-link>
						</div>
						<div class="tip-bottom-r">
							<div class="nav-left" :style="usergroup.jtime!=0?'width:'+'100%':'3.21rem'">
								<router-link :to="'/listcircle?gid='+usergroup.id">
									<ul>
										<li class="li1">{{usergroup.name}}</li>
										<li class="li2" v-html="usergroup.intro"></li>
										<li class="li3">
											<span class="li3-p1">{{usergroup.membercount}}</span>
											<span class="li3-p2">{{usergroup.threadcount}}</span>
										</li>
									</ul>
								</router-link>
							</div>
						</div>
					</div>
				</div>
				<!--<div v-show="noshow" class="no">暂无相关圈子</div>-->
			</div>
        </mt-loadmore>
      </div>
		</div>
		<div class="down">
			<div class="down-all">
				<a href="#/circle">
					<div class="down-all-1">查看更多圈子</div>
				</a>
			</div>
		</div>
		<div class="yzall" v-show="show">
			<p class="forget">
				<span class="sp1">圈子需要验证</span>
				<span class="sp2">
					<input type="text" ref="val"/>
				</span>
				<span class="sp3">
					<input type="button" name="" id="" value="提交" @click="submit()"/>
				</span>
			</p>
		</div>
		<div class="mark" v-show="show" @click="toggle()"></div>
		<pop class="tipcircle" :title="tip"></pop>
		<!--<my-footer></my-footer>-->
	</div>
</template>
<script>
	import qs from 'qs'
	import { getOpenUrl ,getToken} from "../../assets/js/common.js"
	import { setCookie, getCookie } from '../../assets/js/cookie.js'
	export default {
		name: 'details',
		data() {
			return {
				//				j:false,
//				noshow: false,
				show: false,
				oftengroupshow:false,
				mygroupshow:false,
				usergroupshow:false,
				imgData: 0,
				mygroupData: {},
				usergroupData: {},
				oftengroupData: {},
				id: '',
				swiperOption: {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					autoplay: 2500,
					spaceBetween: 0
				},

				tip: '',
        allLoaded: false,
        scrollMode:"auto",
        topStatus: '',
			};
		},
		mounted() {
			$('.tipcircle').hide();
			this.getGroupNum()
			this.oftenGroup()
			this.myGroup()
			this.usergroup()
		},
		methods: {
      loadTop() { // 刷新数据的操作
        setTimeout(()=> {
          this.getGroupNum()
          this.oftenGroup()
          this.myGroup()
          this.usergroup()
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
			toggle() {
				this.show = !this.show;
				this.$refs.a1.style.height = "100%";
				this.$refs.a1.style.overflow = "";
			},
			blue(id) {
				this.idData = [];
				this.idData.push(id);
				console.log(this.idData)
				this.$http.post(getOpenUrl() + "joingroup", {
					gids: this.idData,
				}, {
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					this.joingroup = res.body.data;
					this.id = res.body.gids;
					if(res.body.code == 0) {
						this.tip = "添加成功";
						$('.tipcircle').show();
						setTimeout(() => {
							$('.tipcircle').hide();
						}, 1500);
						$("#join_" + id).hide()
					} else {
						this.show = true;
						this.$refs.a1.style.height = "100%";
						this.$refs.a1.style.overflow = "";
					}
				})
			},
			getGroupNum() {
				this.$http.get(getOpenUrl() + "groupNum", {
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					//					console.log(res)
					this.imgData = res.body.groupNum
				})
			},
			oftenGroup() {
				//用户常去圈子列表
				this.$http.get(getOpenUrl() + "oftenGroup", {
					params: {
						page: 0,
						limit: 10
					},
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					if(res.body.code==0){
						this.oftengroupData = res.body.data
					}else{
						this.oftengroupData = {}
						this.oftengroupshow=true
					}

					//					for(var i=0;i<this.oftengroupData.length;i++){
					//						console.log(res.body.data[i].id)
					//					}
					//					console.log(this.oftengroupData)
				})
			},
			myGroup() {
				//获取用户创建的圈子
				this.$http.get(getOpenUrl() + "myGroup", {
					params: {
						page: 0,
						limit: 10
					},
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					if(res.body.code==0){
						this.mygroupData = res.body.data
					}else{
						this.mygroupData = {}
						this.mygroupshow=true
					}

				})
			},
			usergroup() {
				//获取用户加入的圈子
				this.$http.get(getOpenUrl() + "usergroup", {
					params: {
						page: 0,
						limit: 10
					},
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					if(res.body.code==0){
						this.usergroupData = res.body.data
					}else{
						this.usergroupData = {};
						this.usergroupshow=true
					}
				})
			},
			submit() {
				this.idData = [];
				this.$http.post(getOpenUrl() + "joinValidateGroup", {
					gids: this.id,
					text: this.$refs.val.value,
				}, {
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					this.joingroup = res.body.data;
					if(res.body.code == 0) {
						this.$root.eventHub.$emit('tjqzSuccess');
						this.tip = "提交成功";
						$('.tipcircle').show();
						setTimeout(() => {
							$('.tipcircle').hide();
						}, 1500);
						this.show = false;
						this.$refs.a1.style.height = "100%";
						this.$refs.a1.style.overflow = "";
					} else {
						this.tip = res.body.error_description;
						$('.tipcircle').show();
						setTimeout(() => {
							$('.tipcircle').hide();
						}, 1500);
					}
				})
			}
		},
		activated() {
			//路由缓存 前进后退
			$('.load').hide();
			this.istip = false;

			this.usergroupshow=false
			this.mygroupshow=false
			this.oftengroupshow=false

			this.getGroupNum()
			this.oftenGroup()
			this.myGroup()
			this.usergroup()

      android.showTabs();
		}
	}
</script>
<style scoped>
	.no{font-size: 0.22rem;text-align: center;}
	.tip {
		display: none
	}
	/*没有相关圈子*/

	.no {
		color: #242424;
		font-size: 0.24rem;
		z-index: 10000000;
		margin: 0 auto;
		text-align: center;
		padding: 0.2rem 0;
	}
	/*轮播图*/

	.slide {
		position: relative;
	}

	.swiper-container .swiper-slide {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.swiper-container .swiper-slide img {
		display: block;
		width: 100%;
	}

	.swiper-container .swiper-slide p {
		position: absolute;
		bottom: 0;
		left: 0;
		height: .6rem;
		line-height: .6rem;
		padding: 0 .2rem;
		color: #fff;
		font-size: .2rem;
		width: 100%;
		background: rgba(0, 0, 0, .4);
		text-align: left;
	}

	.slide .swiper-pagination {
		bottom: .2rem;
		font-size: 0;
	}

	.slide .swiper-pagination .swiper-pagination-bullet {
		background: #fff;
	}

	.header {
		position: fixed;
		top: 0;
		width: 100%;
	}

	a {
		color: #242424;
	}

	.line {
		height: 0.2rem;
		background: #f5f5f5;
	}

	.banner {
		width: 100%;
		height: 3.73rem;
	}

	.banner img {
		width: 100%;
		height: 3.73rem;
	}

	.nav-top {
		border-bottom: 1px solid #e0e0e0;
		text-align: center;
		font-size: 0;
	}

	.nav-top p {
		display: inline-block;
		line-height: 0.79rem;
		font-size: 0.22rem;
		color: #5563ea;
		border-bottom: 0.03rem solid #5563ea;
		margin: 0 auto;
		background: url(../../images/cq.png) no-repeat 0.06rem 50%;
		background-size: 0.25rem 0.29rem;
		padding-left: 0.39rem;
	}

	.nav-list .nav-top .p2 {
		color: #1c99f6;
		background: url(../../images/my.png) no-repeat 0.06rem 50%;
		background-size: 0.24rem 0.26rem;
		border-bottom: 0.03rem solid #1c99f6;
		padding-left: 0.32rem;
	}

	.nav-list .nav-top .p3 {
		color: #ff427d;
		background: url(../../images/join.png) no-repeat 0.06rem 50%;
		background-size: 0.22rem 0.24rem;
		border-bottom: 0.03rem solid #ff427d;
		padding-left: 0.31rem;
	}

	.nav-bottom {

	}

	.tip-bottom {
		padding: 0.3rem 0;
		display: flex;
		margin-left: 0.2rem;
		margin-right: 0.2rem;
		border-bottom: 1px solid #e0e0e0;
	}

	.tip-bottom-l {
		width: 2.11rem;
		height: 1.42rem;
		float: left;
		border-radius: 0.1rem;
		overflow: hidden;
	}

	.tip-bottom-l img {
		width: 2.11rem;
		height: 1.42rem;
    object-fit:fill;
	}

	.tip-bottom-r {
		width: 3.9rem;
		height: 1.42rem;
		flex: 1;
	}

	.nav-left {
		width: 3.21rem;
		float: left;
	}

	.tip-bottom-r ul {
		height: 1.42rem;
		margin-left: 0.15rem;
		position: relative;
	}

	.tip-bottom-r .li1 {
		font-size: 0.22rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		color: #008DD3;
	}

	.tip-bottom-r .li2 {
		line-height: 0.31rem;
		font-size: 0.2rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		color: #949494;
		margin-top: 0.1rem;
	}

	.tip-bottom-r .li3 {
		line-height: 0.25rem;
		height: 0.25rem;
		font-size: 0.2rem;
		margin-top: 0.15rem;
		position: absolute;
		bottom: 0.1rem;
	}

	.tip-bottom-r span {
		display: block;
		float: left;
		height: 0.25rem;
		padding-top: 2px;
	}

	.tip-bottom-r .li3-p1 {
		background: url(../../images/pa.png) no-repeat 0 50%;
		background-size: 0.24rem auto;
		padding-left: 0.28rem;
		margin-right: 0.27rem;
		float: left;
		color: #949494
	}

	.tip-bottom-r .li3-p2 {
		background: url(../../images/tz.png) no-repeat 0 50%;
		background-size: 0.2rem auto;
		padding-left: 0.28rem;
		float: left;
		color: #949494
	}

	.nav {
		/*padding-bottom: 1.86rem;*/
	}

	.nav-right {
		width: 0.46rem;
		height: 0.47rem;
		float: right;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
		background: url(../../images/joinbutton.png)no-repeat;
		background-size: cover;
		/*margin-right: 0.2rem;*/
	}

	.down {
		height: 0.57rem;
		border-bottom: 1px solid #dddddd;
		box-shadow: 0 -0.05rem 0.05rem #dddddd;
		position: fixed;
		bottom: 0.98rem;
		width: 100%;
		background: #fff;
		z-index: 11;
	}

	.down-all {
		width: 6rem;
		height: 100%;
		margin: 0 auto;
		position: relative;
	}

	.down-all-1 {
		width: 1.6rem;
		line-height: 0.57rem;
		background: url(../../images/h.png) no-repeat 0 50%;
		background-size: 0.2rem 0.2rem;
		color: #008dd3;
		font-size: 0.2rem;
		padding-left: 0.32rem;
		margin: 0 auto;
	}

	.forget {
		text-align: center;
		line-height: 1.25rem;
		z-index: 13;
		margin-bottom: 0.05rem;
		border-radius: 0.1rem;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 0 0 0.1rem #000;
		background: #fff;
		padding: 0rem 0.2rem;
		color: #242424;
		width: 5rem;
		font-size: 0.3rem;
		padding-bottom: 0.3rem;
	}

	.mark {
		width: 100%;
		height: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 12;
	}

	.sp2 {
		border: 1px solid #242424;
		display: block;
		border-radius: 0.1rem;
	}

	.sp2 input {
		display: block;
		width: 100%;
		color: #242424;
		height: 0.5rem;
		padding-left: 0.2rem;
	}

	.sp3 {
		width: 1.4rem;
		background: #008DD3;
		display: block;
		margin: 0 auto;
		text-align: center;
		margin-top: 0.2rem;
		border-radius: 0.1rem;
	}

	.sp3 input {
		display: block;
		width: 100%;
		color: #fff;
		height: 0.5rem;
	}
</style>
