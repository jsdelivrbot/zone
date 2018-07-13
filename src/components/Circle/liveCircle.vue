<template>
	<div id="headed" class="backtop" style="overflow-y:scroll;font-size: 0.2rem;width: 100%;">
		<my-header :title="this.$route.query.title"></my-header>
		<div>
			<swiper :options="swiperOptionTab" id="swiper-container2" ref="mySwiperTab" v-show="catData.length > 1">
				<swiper-slide :class="key==0 ? 'active-nav' : ''" v-for="(cat, key) in catData" :cid="cat.id"><span>{{cat.title}}</span></swiper-slide>
			</swiper>
			<div class="page-loadmore" style="padding-top: 1.4rem;">
				<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">

					<swiper :options="swiperOptionCon" id="swiper-container3" ref="mySwiperCon">
						<swiper-slide v-for="(cat, key) in catData">
							<div class="first" :catid="cat.id" :style="catData.length <= 1 ? 'padding-top:0.7rem;' : ''">
								<div class="tip-bottom" v-for="(list,index) in cat.listData" :key="index">
									<div class="tip-bottom-l">
										<router-link :to="'/listcircle?gid='+list.id">
											<img v-lazy="list.logo" />
										</router-link>
									</div>
									<div class="tip-bottom-r">
										<router-link :to="'/listcircle?gid='+list.id">
											<div class="nav-left" :style="list.jtime!=0?'width:'+'100%':'3.21rem'">
												<ul>
													<li class="li1">{{list.name}}</li>
													<li class="li2">{{list.intro}}</li>
													<li class="li3">
														<span class="li3-p1">{{list.membercount}}</span>
														<span class="li3-p2">{{list.threadcount}}</span>
													</li>
												</ul>
											</div>
										</router-link>
										<div class="nav-right" ref="cb" v-show='list.is_level==null&&list.need_invite!=2' :id="'join_'+list.id">
											<li class="li4">
												<label>
													<input type="checkbox" ref="check" :value="list.id" ><b></b>
												</label>
											</li>
										</div>
									</div>
								</div>
								<div class="loading-layer">
									<span class="spinner-holder"><img src="../../images/loading.gif" /></span>
									<div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
								</div>
							</div>
						</swiper-slide>
					</swiper>
				</mt-loadmore>
			</div>

			<div class="down">
				<div class="down-all">
					<div class="down-all-2" @click="blue()">选好了，加入圈子</div>
				</div>
			</div>
		</div>
		<div class="load" style="display:none;">
			<div class="load-container load4">
				<div class="loader"> <i></i></div>
			</div>
		</div>
		<div class="yzall" v-show="show">
			<p class="forget">
				<span class="sp1">圈子需要验证</span>
				<span class="sp2">
					<input type="text" name="" id="" value="" ref="val"/>
				</span>
				<span class="sp3">
					<input type="button" name="" id="" value="提交" @click="submit()"/>
				</span>
			</p>

		</div>
		<div class="mark" v-show="show" @click="toggle()"></div>
		<pop v-show="ispop" :title="popmsg" class="tips"></pop>
		<backtop></backtop>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import { setCookie, getCookie } from '../../assets/js/cookie.js';
	import { getOpenUrl ,getToken} from '../../assets/js/common.js'
	var catid = 0;
	var page = 1,
		size = 10,
		loading = false,
		end = false;

	export default {
		data() {
			return {
				show: false,
				catData: [],
				swiperOptionTab: {
					watchSlidesProgress: true,
					watchSlidesVisibility: true,
					notNextTick: true,
					slidesPerView: 4
				},
				swiperOptionCon: {
					notNextTick: true,
					autoHeight: true
				},
				ispop: false,
				popmsg: '',
				allLoaded: false,
				topStatus: '',
			}
		},
		methods: {
			//函数方法
			loadTop() { // 刷新数据的操作
				
				var $self = this;
				$self.page=1;

				//获取内容
				this.$http.get(getOpenUrl() + "cateGroup", {
					params: {
						pid: $self.pid,
						cid: $self.catid,
						page: 1,
						limit: 10
					},
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					$self.catData[$self.index].listData.splice(0, $self.catData[$self.index].listData.length);
					this.$refs.loadmore.onTopLoaded();
					$('div[catid="' + $self.catid + '"] .loading-layer span').removeClass('active');
					$('div[catid="' + $self.catid + '"] .loading-layer div').removeClass('active');
					if(res.body.code == '0000') {
						page = $self.catData[$self.index].listPage = $self.page; //当前页数
						if(res.body.ccount > 0) {
//							$self.allLoaded=false;
							var data = res.body.data;
							$.each(data, function(k, v) {
								$self.catData[$self.index].listData.push(v);
							});
//							$('div[catid="' + $self.catid + '"]').parent().parent().css('height', '100%');
//							$('div[catid="' + $self.catid + '"]').parent().css('height', '100%');
						} else {
//							$self.allLoaded=true;
//							$self.catData[index].listEnd = end = true;
							$('div[catid="' + $self.catid + '"] .loading-layer div').addClass('active');
						}
					} else {
						this.ispop = true;
						this.popmsg = res.body.error_description;
						setTimeout(() => {
							this.ispop = false
						}, 1500);
					}
					$('.load').hide();
					loading = false;
				});
			},
			loadBottom() { // 加载更多数据的操作
				// 若数据已全部获取完毕
				var self = this;
				self.page += 1;
				console.log(self.page)
				self.getData(self.catid, self.page, self.pid, self.index)
//				if($self.catData.ccount==0){
//					allLoaded=true;
//				}
				
			},
			handleTopChange(status) {
				this.topStatus = status;
			},
			handleBottomChange(status){
				this.bottomStatus = status;
			},
			//获取指定子栏目
			getCatData(pid, index) {
				$('.load').show();
				var $self = this;
				this.$http.get(getOpenUrl() + "groupcate", {
					params: {
						pid: pid,
					},
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					if(res.body.code == '0000') {
						var list = {};
						list.id = 0;
						list.title = '全部';
						list.listData = [];
						list.listPage = this.page
						list.listEnd = this.end;
						$self.catData.push(list);

						var data = res.body.data;
						if(res.body.ccount > 0) {
							$.each(data, function(k, v) {
								v.listData = []; //列表数据
								v.listPage = $self.page; //列表数据分页数
								v.listEnd = $self.end; //数据是否载入完成
								$self.catData.push(v);
							});
						}
						//获取分类下的圈子列表
						this.getData(0, 1, pid, index);
					}
				});
			},
			//获取指定分类下的内容
			getData(catid, page, pid, index) {
				var $self = this;
				page = $self.page = page ? page : 1;
				if($self.catData[index].listData.length > 0 && $self.page <= $self.catData[index].listPage) {
					$self.page = $self.catData[index].listPage;
					end = $self.catData[index].listEnd;
					$('div[catid="' + catid + '"]').parent().parent().css('height', $self.catData[index].listH);
					$('div[catid="' + catid + '"] .loading-layer span').removeClass('active');
					if(end) {
						$('div[catid="' + catid + '"] .loading-layer div').addClass('active');
					} else {
						$('div[catid="' + catid + '"] .loading-layer div').removeClass('active');
					}
					return;
				}

				if(page <= 1) {
					$('.load').show();
				}

				//获取内容
				this.$http.get(getOpenUrl() + "cateGroup", {
					params: {
						pid: pid,
						cid: catid,
						page: page,
						limit: size
					},
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					this.$refs.loadmore.onBottomLoaded();
					$('div[catid="' + catid + '"] .loading-layer span').removeClass('active');
					$('div[catid="' + catid + '"] .loading-layer div').removeClass('active');
					if(res.body.code == '0000') {
						
						page = $self.catData[index].listPage = $self.page; //当前页数
						if(res.body.ccount > 0) {
//							$self.allLoaded=false;
							var data = res.body.data;
							$.each(data, function(k, v) {
								$self.catData[index].listData.push(v);
							});
							$('div[catid="' + catid + '"]').parent().parent().css('height', '100%');
							$('div[catid="' + catid + '"]').parent().css('height', '100%');
						} else {

//							$self.allLoaded=true;
							$('div[catid="' + catid + '"] .loading-layer div').addClass('active');
						}
					} else {
						this.ispop = true;

						this.popmsg = res.body.error_description;
						setTimeout(() => {
							this.ispop = false
						}, 1500);
					}
					$('.load').hide();
					loading = false;
				});
			},
			toggle() {
				this.show = !this.show;
				this.$refs.a1.style.height = "100%";
				this.$refs.a1.style.overflow = "auto";
			},
			blue() {
				this.idData = [];
				for(var i = 0; i < this.$refs.check.length; i++) {
					var ch = this.$refs.check[i].checked;
					if(ch) {
						this.idData.push(this.$refs.check[i].value);
					}
				}
				if(this.idData.length <= 0) {
					this.ispop = true;
					this.popmsg = "请选择圈子";
					setTimeout(() => {
						this.ispop = false
					}, 1500);
				} else {
					this.$http.post(getOpenUrl() + "joingroup", {
						gids: this.idData,
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					}).then((res) => {
						this.joingroup = res.body.data;
						this.id = res.body.gids;
						if(res.body.code != 0) {
							this.show = true;
							this.$refs.a1.style.height = "calc(100% - 1.64rem)";
							this.$refs.a1.style.overflow = "hidden";
						} else {
							this.ispop = true;
							this.popmsg = "加入成功";
							setTimeout(() => {
								this.ispop = false
							}, 1500);
							this.$router.push('/mycircle')
						}
					})
				}
			},

			submit() {
				this.idData = [];
				for(var i = 0; i < this.$refs.check.length; i++) {
					var ch = this.$refs.check[i].checked;
					if(ch) {
						this.idData.push(this.$refs.check[i].value);
					}
				}
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
						this.$root.eventHub.$emit('submitSuccess');
						this.$root.eventHub.$emit('tjqzSuccess');
						this.ispop = true;
						this.popmsg = "提交成功";
						setTimeout(() => {
							this.ispop = false
						}, 1500);
						this.$router.push('/mycircle')
						this.show = false;
						this.$refs.a1.style.height = "100%";
						this.$refs.a1.style.overflow = "auto";
					}
				})
			}
		},
		mounted() {
			this.end = end = false;
			this.loading = loading = false;
			this.page = page = 1;
			this.index = 0;
			this.pid = this.$route.query.pid;
			this.catid = 0;

			var swiperTab = this.swiperTab;
			var swiperCon = this.swiperCon;
			var self = this;

			//tab选项卡
			swiperTab.on('tap', function(obj) {
				swiperCon.slideTo(obj.clickedIndex);
			});
			swiperCon.on('slideChangeStart', function(obj) {
				$('#swiper-container2 .active-nav').removeClass('active-nav')
				var activeNav = $('#swiper-container2 .swiper-slide').eq(obj.activeIndex).addClass('active-nav');
				if(!activeNav.hasClass('swiper-slide-visible')) {
					if(activeNav.index() > swiperTab.activeIndex) {
						var thumbsPerNav = Math.floor(swiperTab.width / activeNav.width()) - 1
						swiperTab.slideTo(activeNav.index() - thumbsPerNav)
					} else {
						swiperTab.slideTo(activeNav.index())
					}
				}
				return;
			});
			swiperCon.on('slideChangeEnd', function(obj) {
				self.catid = parseInt($('#swiper-container2 .active-nav').attr('cid'));
				self.page = 1;
				self.index = obj.activeIndex;
				end = false;
				self.getData(self.catid, 0, self.pid, self.index);
				return;
			});
		},
		computed: {
			swiperTab() {
				return this.$refs.mySwiperTab.swiper
			},
			swiperCon() {
				return this.$refs.mySwiperCon.swiper
			}
		},
		components: {
			//组件
			swiper,
			swiperSlide
		},
		created() {
			//一载入页面
			this.end = end = false;
			this.loading = loading = false;
			this.page = page = 1;
			this.index = 0;
			this.pid = this.$route.query.pid;
			this.catid = 0;

			//载入圈子子分类
			this.getCatData(this.pid, this.index);
		},
		updated() {
			this.catData[this.index].listH = $('div[catid="' + this.catid + '"]').parent().parent().height();
			end = this.catData[this.index].listEnd;
			page = this.page = this.catData[this.index].listPage;
			$('#swiper-container3 .swiper-slide').css('min-height', $(window).height() - $('div.header').outerHeight()-$('.swiper-slide').outerHeight()-$('.down').outerHeight());
		},
		activated() {
			//路由缓存 前进后退
			$('.load').hide();
			$('.tips').hide();
		}
	}
</script>

<style scoped="scoped">
	.tips {
		display: none;
	}
	
	.header {
		position: fixed;
		top: 0;
		width: 100%;
	}
	
	/*.first {
		padding-bottom: 0.2rem;
		padding-top: 1.4rem;
	}*/
	
	.first.all {
		padding-top: 0.88rem;
	}
	
	.tip-bottom {
		display: flex;
		padding-left: 0.2rem;
		padding-right: 0.2rem;
		padding-bottom: 0.2rem;
		border-bottom: 1px solid #e0e0e0;
	}
	
	.tip-bottom-l {
		width: 2.11rem;
		height: 1.42rem;
		float: left;
		margin-top: 0.3rem;
		border-radius: 0.1rem;
		overflow: hidden;
	}
	
	.tip-bottom-l img {
		width: 2.11rem;
		height: 1.42rem;
		display: block;
	}
	
	.tip-bottom-r {
		width: 3.9rem;
		height: 1.42rem;
		margin-top: 0.29rem;
		flex: 1;
	}
	
	a {
		color: #242424;
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
		text-align: left;
		line-height: 0.49rem;
		font-size: 0.22rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		color: #008DD3;
	}
	
	.tip-bottom-r .li2 {
		text-align: left;
		line-height: 0.31rem;
		font-size: 0.2rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		color: #949494;
	}
	
	.tip-bottom-r .li3 {
		line-height: 0.25rem;
		height: 0.25rem;
		font-size: 0.16rem;
		margin-top: 0.15rem;
		color: #949494;
		position: absolute;
		bottom: 0;
	}
	
	.tip-bottom-r span {
		display: block;
		float: left;
		height: 0.25rem;
	}
	
	.tip-bottom-r .li3-p1 {
		background: url(../../images/pa.png) no-repeat;
		background-size: 0.25rem auto;
		padding-left: 0.28rem;
		margin-right: 0.27rem;
		float: left;
	}
	
	.tip-bottom-r .li3-p2 {
		background: url(../../images/tz.png) no-repeat;
		background-size: 0.2rem auto;
		padding-left: 0.28rem;
		float: left;
	}
	
	.nav-right {
		width: 0.46rem;
		height: 1.42rem;
		float: right;
	}
	
	.nav-right .li4 {
		width: 0.46rem;
		height: 1.42rem;
		float: right;
		position: relative;
	}
	
	label {
		width: 0.46rem;
		height: 0.46rem;
		border-radius: 50%;
		display: block;
		position: relative;
		right: 0.2rem;
		z-index: 1;
		top: 50%;
		transform: translateY(-50%);
		margin-right: 0.2rem;
	}
	
	input[type="checkbox"] {
		display: none;
		position: absolute;
	}
	
	input[type="checkbox"]+b {
		position: absolute;
		top: 0;
		left: 0;
		display: inline-block;
		width: 0.46rem;
		height: 0.46rem;
		border: 1px solid #ccc;
		border-radius: 50%;
		vertical-align: middle;
	}
	
	input[type="checkbox"]:checked+b {
		background: url(../../images/checkbox.png)no-repeat;
		background-size: cover;
		border: none;
	}
	
	.down {
		background: #fff;
		height: 0.87rem;
		border-bottom: 1px solid #dddddd;
		box-shadow: 0 -0.05rem 0.05rem #dddddd;
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 3;
	}
	
	.down-all {
		width: 6rem;
		height: 100%;
		margin: 0 auto;
		position: relative;
	}
	
	.down-all-1 {
		width: 0.98rem;
		line-height: 0.87rem;
		background: url(../../images/h.png) no-repeat 0 50%;
		background-size: 0.2rem 0.2rem;
		color: #008dd3;
		font-size: 0.2rem;
		padding-left: 0.32rem;
		float: left;
	}
	
	.down-all-2 {
		width: 2.42rem;
		line-height: 0.48rem;
		background: #54c2f0;
		color: #fff;
		font-size: 0.2rem;
		right: 0;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		text-align: center;
		border-radius: 0.24rem;
	}
	
	#swiper-container2 {
		position: fixed;
		top: 0.7rem;
		background: #fff;
		z-index: 3;
		width: 100%;
		border-bottom: 1px solid #ccc;
		overflow: visible;
	}
	
	#swiper-container2 .swiper-slide {
		line-height: 0.7rem !important;
		color: #666 !important;
		font-size: 0.22rem !important;
		background: #fff !important;
		text-align: center;
	}
	
	#swiper-container2 .active-nav {
		background: #fff !important;
	}
	
	#swiper-container2 .active-nav span {
		display: inline-block;
		border-bottom: 2px solid #008dd3;
		color: #008dd3 !important;
		margin-bottom: -1px;
	}
	
	.swiper-slide {
		color: #000;
		line-height: 300px;
		text-align: center;
		font-size: 50px;
	}
	
	.blue-slide {
		background: #4390EE;
	}
	
	.red-slide {
		background: #CA4040;
	}
	
	.orange-slide {
		background: #FF8604;
	}
	
	#swiper-container3 {
		padding-bottom: 0.93rem;
	}
	
	.forget {
		text-align: center;
		line-height: 1.25rem;
		z-index: 13;
		margin-bottom: 0.05rem;
		border-radius: 0.1rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		/*box-shadow: 0 0 0.1rem #000;*/
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
		background: rgba(0, 0, 0, 0.2);
	}
	
	.yzall .forget .sp2 {
		border: 1px solid #242424;
		display: block;
		border-radius: 0.1rem;
	}
	
	.yzall .forget .sp2 input {
		display: block;
		width: 100%;
		color: #242424;
		height: 0.5rem;
		padding-left: 0.2rem;
	}
	
	.yzall .forget .sp3 {
		width: 1.4rem;
		background: #008DD3;
		display: block;
		margin: 0 auto;
		text-align: center;
		margin-top: 0.2rem;
		border-radius: 0.1rem;
	}
	
	.yzall .forget .sp3 input {
		display: block;
		width: 100%;
		color: #fff;
		height: 0.5rem;
	}
</style>