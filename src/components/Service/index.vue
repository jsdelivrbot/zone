<template>
	<div id="headed" style="overflow-y:scroll;font-size: 0.2rem;width: 100%;">
		<my-header title="服务资源" uri="#/home"></my-header>
		<!--<div style="padding-top: 1.4rem;">-->
			<swiper :options="swiperOptionTab" id="swiper-container2" ref="mySwiperTab">
				<swiper-slide style="width:1.5rem;" :class="key==0 ? 'swiper-slide active-nav' : 'swiper-slide'" v-for="(list, key) in catData" :cid="list.catid"><span>{{list.catname}}</span></swiper-slide>
			</swiper>
			<div class="page-loadmore backtop" style="position:relative;top:1.7rem;bottom:0;overflow:scroll;font-size: 0.2rem;height: calc(100% - 1.7rem);">
				<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">

					<swiper :options="swiperOptionCon" id="swiper-container3" ref="mySwiperCon">
						<swiper-slide class="swiper-slide" v-for="(cat, key) in catData">
							<div class="first" :catid="cat.catid">
								<div class="tip-bottom" v-for="(list,index) in cat.listData" :key="index">
									<router-link :to="'/details?id='+list.ziy_id+'&type='+list.catid" style="display: flex;width: 100%;margin: 0 0.2rem;border-bottom: 1px solid #ebebeb;">
										<div class="tip-bottom-l">
											<img :src="list.thumb" />
										</div>
										<div class="tip-bottom-r">
											<ul>
												<li class="li1">{{list.title}}</li>
												<li class="li3">
													<span class="li3-p1">{{list.ctime}}</span>
													<span class="li3-p3">{{list.msgnum}}</span>
													<span class="li3-p2">{{list.lognum}}</span>
												</li>
											</ul>
										</div>
									</router-link>
								</div>
								<div class="loading-layer">
									<span class="spinner-holder"><img src="../../images/loading.gif"/></span>
									<div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
								</div>
							</div>
						</swiper-slide>
					</swiper>
				</mt-loadmore>
			</div>
		<!--</div>-->
		<div class="load" style="display:none;">
			<div class="load-container load4">
				<div class="loader"> <i></i></div>
			</div>
		</div>
		<pop v-show="ispop" :title="popmsg" class="tips"></pop>
    <load v-show="isload"></load>
		<backtop></backtop>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import { setCookie, getCookie } from '../../assets/js/cookie.js';
	import { getOpenUrl ,getToken} from '../../assets/js/common.js';
	var catid = 0,
		end = false,
		loading = false,
		topservice=''

	export default {
		data() {
			return {
			  isload:false,
				catData: [],
				swiperOptionTab: {
					watchSlidesProgress: true,
					watchSlidesVisibility: true,
					notNextTick: true,
					slidesPerView:'auto'
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
			//获取指定分类下的资源内容
			getData(catid, page, index) {
				var $self = this;
				$self.page = page ? page : 1;
				if($self.catData[index].listData.length > 0 && $self.page <= $self.catData[index].listPage) {
					$self.page = $self.catData[index].listPage;
					end = $self.catData[index].listEnd;
					$('div[catid="' + catid + '"]').parent().parent().css('height', $self.catData[index].listH);
					$('div[catid="' + catid + '"] .loading-layer span').removeClass('active');
//					if(end) {
//						$('div[catid="' + catid + '"] .loading-layer div').addClass('active');
//					} else {
//						$('div[catid="' + catid + '"] .loading-layer div').removeClass('active');
//					}
					return;
				}
				if($self.page <= 1) {
				  this.isload = true;
					$('.load').show();
				}
				//获取资源内容
				this.$http.get(getOpenUrl() + "resource", {
					headers: {
						'Authorization': 'Bearer ' + getToken()
					},
					params: {
						type: catid,
						page: $self.page
					},
				}).then((res) => {
				  this.isload = false;
//					loading = false;
//					self.allLoaded = true;
					$('.load').hide();
					$('div[catid="' + catid + '"] .loading-layer span').removeClass('active');
					$('div[catid="' + catid + '"] .loading-layer div').removeClass('active');
					if(res.body.code == '0000') {

						$self.catData[index].listPage = $self.page;
						if(res.body.ccount > 0) {
							var data = res.body.data;
							$.each(data, function(k, v) {
								$self.catData[index].listData.push(v);
							});
							$('div[catid="' + catid + '"]').parent().parent().css('height', '100%');
							$('div[catid="' + catid + '"]').parent().css('height', '100%');
							$self.allLoaded=false;
						} else {
//							$self.catData[index].listEnd = end = true;
//							$self.allLoaded=true;
							$('div[catid="' + catid + '"] .loading-layer div').addClass('active');
						}
						$self.$refs.loadmore.onBottomLoaded();
					} else {
						//this.ispop = true;
						this.popmsg = res.body.error_description;
            this.$toast(this.popmsg,{
              duration:'1500'
            });
						setTimeout(() => {
							this.ispop = false
						}, 1500);
						$self.$refs.loadmore.onBottomLoaded();
					}
					$('.load').hide();
				});
			},
			//加载更多
			loadTop() {
				topservice=this.scroll;
				var $self = this;
				$self.page = 1;

				this.$http.get(getOpenUrl() + "resource", {
					headers: {
						'Authorization': 'Bearer ' + getToken()
					},
					params: {
						type: $self.catid,
						page: $self.page
					},
				}).then((res) => {
					$self.catData[$self.index].listData.splice(0, $self.catData[$self.index].listData.length);

					$self.$refs.loadmore.onTopLoaded();
//					loading = false;
					$('.load').hide();
					$('div[catid="' + $self.catid + '"] .loading-layer span').removeClass('active');
					$('div[catid="' + $self.catid + '"] .loading-layer div').removeClass('active');
					if(res.body.code == '0000') {
//						$self.catData[$self.index].listPage = $self.page;

						if(res.body.ccount > 0) {
							var data = res.body.data;
							$.each(data, function(k, v) {
								$self.catData[$self.index].listData.push(v);
							});
							self.allLoaded = false;
							$('div[catid="' + $self.catid + '"]').parent().parent().css('height', '100%');
							$('div[catid="' + $self.catid + '"]').parent().css('height', '100%');
//							$self.allLoaded=false;
						} else {
							$self.catData[$self.index].listEnd = end = true;
							$('div[catid="' + $self.catid + '"] .loading-layer div').addClass('active');
							$self.allLoaded=true
						}
						console.log(this.catData);
					} else {
						//this.ispop = true;
						this.popmsg = res.body.error_description;
            this.$toast(this.popmsg,{
              duration:'1500'
            });
						setTimeout(() => {
							this.ispop = false
						}, 1500);
					}
					$('.load').hide();
				});
			},
			loadBottom() {
				topservice=this.scroll;
				var $self = this;
				$self.page += 1;
				$self.getData($self.catid, $self.page, $self.index);

			},
			handleTopChange(status) {
				this.topStatus = status;
			},
			handleBottomChange(status) {
				this.bottomStatus = status;
			},
			//		tabScroll(){
			//			window.addEventListener("scroll", this.toScroll);
			//		},
			//		toScroll(){
			//			if(loading || end) return;
			//			if($(document).height() - $(window).height() - $(window).scrollTop() < 80){
			//				$('div[catid="'+this.catid+'"] .loading-layer span').addClass('active');
			//				loading = true;
			//				this.page += 1;
			//				setTimeout(() => {
			//					this.getData(this.catid, this.page, this.index);
			//				}, 1000);
			//			}
			//		}
		},
		mounted() {
			var swiperTab = this.swiperTab;
			var swiperCon = this.swiperCon;
			var $self = this;
			swiperTab.on('tap', function(obj) {
				swiperCon.slideTo(obj.clickedIndex);
			});
			swiperCon.on('slideChangeStart', function(obj) {
				$('#swiper-container2 .active-nav').removeClass('active-nav')
				var activeNav = $('#swiper-container2 .swiper-slide').eq(obj.activeIndex).addClass('active-nav');
				//if (!activeNav.hasClass('swiper-slide-visible')){
				if(activeNav.index() > swiperTab.activeIndex) {
					var thumbsPerNav = Math.floor(swiperTab.width / activeNav.width()) - 1
					swiperTab.slideTo(activeNav.index() - thumbsPerNav)
				} else {
					swiperTab.slideTo(activeNav.index())
				}
				//}
			});
			swiperCon.on('slideChangeEnd', function(obj) {
				$self.catid = parseInt($('#swiper-container2 .active-nav').attr('cid'));
				$self.page = 1;
				$self.index = obj.activeIndex;
				end = false;
				$self.getData($self.catid, $self.page, $self.index);
				return;
			});
			$('#swiper-container3 .swiper-wrapper').css('min-height', $(window).height() - $('div.header').outerHeight() - $('#swiper-container2').outerHeight());
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
			swiperSlide,
		},
		service(){

		},
		created() {
			//一载入页面
			var $self = this;
			this.end = end = false;
			this.loading = loading = false;
			this.page = 1;
			this.index = 0;

			//获取资源分类
			this.$http.get(getOpenUrl() + "resource/resource_cate", {
				headers: {
					'Authorization': 'Bearer ' + getToken()
				},
			}).then((res) => {
				if(res.body.code == '0000') {
//					top=0
//					this.$store.commit('HOMESTOPF',top)
//					$(".backtop").animate({"scrollTop":this.scroll},0)
					$('.backtop').scroll(()=> {
						this.scroll=$('.backtop').scrollTop();
//						console.log(this.scroll)
					})
					var data = res.body.data;
					if(data) {
						$.each(data, function(k, v) {
							v.listData = []; //列表数据
							v.listPage = $self.page; //列表数据分页数
							v.listEnd = $self.end; //数据是否载入完成
							if(k == 0) {
								$self.catid = catid = v.catid;
							}
							$self.catData.push(v);
						});
					}
					if(catid > 0) {
						$('.load').show();
						this.getData(this.catid, this.page, this.index);
					}
				} else {
					//this.ispop = true;
					this.popmsg = res.body.error_description;
          this.$toast(this.popmsg,{
            duration:'1500'
          });
					setTimeout(() => {
						this.ispop = false
						if(res.body.code == '1001') {
							this.$router.push('/login')
						} else {
							this.$router.go(-1);
						}
					}, 1500)
				}
			});
		},
		watch: {
			//监听
		},
		updated() {
			this.catData[this.index].listH = $('div[catid="' + this.catid + '"]').parent().parent().height();
			end = this.catData[this.index].listEnd;
			this.page = this.catData[this.index].listPage;
			$('.load').hide();
			this.$nextTick(()=>{
				this.scroll=topservice
			    $(".backtop").animate({"scrollTop":this.scroll},0)
			})
		},
		activated() {
			//路由缓存 前进后退
			$('.load').hide();
			$('.tips').hide();
			this.$store.commit('HOMESTOPF',top)
			$(".backtop").animate({"scrollTop":this.scroll},0)
		},
		beforeRouteLeave(to,from,next){
//			sessionStorage.scrollTip=this.scroll
//			next();
			topservice=this.scroll
//			this.scroll;
			this.$store.commit('HOMESTOPF',topservice)
			next();
			console.log(topservice)
		}
	}
</script>

<style scoped="scoped">
	.tips {
		display: none;
	}

	.tip-bottom {
		display: flex;
	}

	.tip-bottom-l {
		width: 2.11rem;
		height: 1.42rem;
		/*background: red;*/
		float: left;
		margin-top: 0.3rem;
		overflow: hidden;
		border-radius: 5px;
		text-align: center;
	}

	.tip-bottom-l img {
		max-width: 2.11rem;
		height: auto;
		border: 0;
		display: block;
		margin: 0 auto;
		border-radius: 5px
	}

	.tip-bottom-r {
		width: 3.9rem;
		margin-top: 0.3rem;
		flex: 1;
	}

	.tip-bottom-r ul {
		height: 1.42rem;

		margin-left: 0.24rem;
	}

	.tip-bottom-r .li1 {
		line-height: 0.47rem;
		font-size: 0.22rem;
		color: #008dd3;
		text-align: left;
	}

	.tip-bottom-r .li3 {
		line-height: 0.3rem;
		height: 0.3rem;
		font-size: 0.2rem;
		margin-top: 0.47rem;
		color: #242424;
	}

	.tip-bottom-r span {
		display: block;
		float: left;
		height: 0.3rem;
	}

	.tip-bottom-r .li3-p1 {
		background: url(../../images/fbsj.png) no-repeat;
		background-size: 0.3rem auto;
		padding-left: 0.4rem;
		float: left;
	}

	.tip-bottom-r .li3-p2 {
		background: url(../../images/sl.png) no-repeat;
		background-size: 0.3rem auto;
		padding-left: 0.4rem;
		float: right;
		width: .4rem;
		text-align: left;
	}

	.tip-bottom-r .li3-p3 {
		/*background: url(../../images/hf.png) no-repeat;*/
    background: url(../../images/zixun.png) no-repeat;
		background-size: 0.3rem auto;
		padding-left: 0.4rem;
		margin-left: 0.21rem;
		float: right;
		width: .4rem;
		text-align: left;
	}

	#headed {
		width: 100%;
		float: left;
	}

	.header {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 10!important;
	}

	#swiper-container2 {
		border-bottom: 1px solid #ccc;
		/*overflow:visible;*/
	}

	#swiper-container2 .swiper-slide {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:1;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    height: 0.72rem;
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

	#swiper-container2 {
		border-bottom: 1px solid #ccc;
		overflow: visible;
		position: fixed;
		background: #Fff;
		z-index: 6;
		top: 1rem;
		width: 100%;
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
</style>
