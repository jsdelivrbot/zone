<template>
	<div id="headed" class="backtop" style="overflow-y:scroll;font-size: 0.2rem;width: 100%;">
		<my-header title="vip专区"></my-header>
		<div class="wrapper" style="padding-top: 1.7rem;">
			<swiper :options="swiperOptionTab" id="swiper-container2" ref="mySwiperTab">
				<swiper-slide :class="key==0 ? 'swiper-slide active-nav' : 'swiper-slide'" v-for="(list, key) in catData" :cid="list.catid"><span>{{list.catname}}</span></swiper-slide>
			</swiper>
			<div class="page-loadmore" style="">
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange"  @bottom-status-change="handleBottomChange" ref="loadmore">

			<swiper :options="swiperOptionCon" id="swiper-container3" ref="mySwiperCon">
				<swiper-slide class="swiper-slide" v-for="(cat, key) in catData">
					<div class="banner">
						<div class="slide">
							<swiper :options="swiperOption">
								<swiper-slide class="banner-slide" v-for="slide in cat.recommData">
									<router-link :to="'/info1?id='+slide.document_id">
										<img :src="slide.thumb" />
										<p>{{slide.title}}</p>
									</router-link>
								</swiper-slide>
								<div class="swiper-pagination" slot="pagination"></div>
							</swiper>
						</div>
					</div>
					<div class="first" :catid="cat.catid">
						<div class="tip-bottom" v-for="(list,index) in cat.listData" :key="index">
							<router-link :to="'/info1?id='+list.document_id" style="display: flex;width: 100%;">
							<div class="tip-bottom-r">
								<ul>
									<li class="li1">{{list.title}}</li>
									<li class="li3">
										<span class="li3-p1">{{list.ctime}}</span>
										<span class="li3-p3">{{list.views}}</span>
										<span class="li3-p2">{{list.comment_num}}</span>
									</li>
								</ul>
							</div>
							<div class="tip-bottom-l">
								<img :src="list.thumb" />
							</div>
							</router-link>
						</div>
						<div class="loading-layer">
							<span class="spinner-holder"><img src="../../../images/loading.gif" /></span>
							<div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
						</div>
					</div>
				</swiper-slide>
			</swiper>
			</mt-loadmore>
			</div>
		</div>
		<div class="load" style="display:none;">
			<div class="load-container load4"><div class="loader"> <i></i></div></div>
		</div>
		<pop v-show="ispop" :title="popmsg" class="tips"></pop>
		<backtop></backtop>
    <load v-show="isload"></load>
	</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import {setCookie,getCookie} from '../../../assets/js/cookie.js';
import {getOpenUrl,getToken} from '../../../assets/js/common.js'

var token  = getToken();
var apiurl = getOpenUrl();
var catid  = 0;
var size = 15, loading = false, end = false;
var topinfo=0
export default{
	data(){
		return {
		  isload:false,
			catData:[],
			swiperOption: {
				pagination: '.swiper-pagination'
				,paginationClickable: true
				,autoplay: 2500
				,spaceBetween: 0
			},
			swiperOptionTab: {
				watchSlidesProgress: true
				,watchSlidesVisibility: true
				,notNextTick: true
				,slidesPerView : 4
			},
			swiperOptionCon: {
				notNextTick: true
				,autoHeight: true
			},
			ispop: false,
			popmsg: '',
			allLoaded: false,
			topStatus: '',
		}
	},
	methods: {
		loadTop() { // 刷新数据的操作
			topinfo=this.scroll;
			var $self   = this;
			$self.page=1
			//获取当前分类内容
			this.$http.get(getOpenUrl() + "vnewsList", {
				headers: {
					'Authorization': 'Bearer ' +  token
				},
				params:{
					cate_id: $self.catid,
					page: $self.page,
					size: size
				},
			}).then((res)=>{
				$self.catData[$self.index].listData.splice(0, $self.catData[$self.index].listData.length);
//				loading = false;
				$('.load').hide();
				$('div[catid="'+$self.catid+'"] .loading-layer span').removeClass('active');
				$('div[catid="'+$self.catid+'"] .loading-layer div').removeClass('active');
				if (res.body.code == '0000'){
					this.$refs.loadmore.onTopLoaded();
					$self.catData[$self.index].listPage   = $self.page;
					if (res.body.ccount > 0){
						var data = res.body.data;
						$.each(data, function(k, v){
							$self.catData[$self.index].listData.push(v);
						});
						$('div[catid="'+$self.catid+'"]').parent().parent().css('height', '100%');
						$('div[catid="'+$self.catid+'"]').parent().css('height', '100%');
					}else{
//						$self.catData[$self.index].listEnd = end = true;
						$('div[catid="'+$self.catid+'"] .loading-layer div').addClass('active');
					}
				}else{
					this.$refs.loadmore.onTopLoaded();
					this.ispop  = true;
					this.popmsg = res.body.error_description;
					setTimeout(() => {
						this.ispop = false
					}, 1000);
				}
			});
//
			},
			loadBottom() { // 加载更多数据的操作
				topinfo=this.scroll;
				// 若数据已全部获取完毕
				var self = this;
				this.page += 1;
				self.getData(self.catid, self.page, self.index)

			},
			handleTopChange(status) {
				this.topStatus = status;
			},
			handleBottomChange(status){
				this.bottomStatus = status;
			},
		//函数方法
		//获取指定分类下的资源内容
		getData(catid, page, index){
			var $self   = this;
			$self.page  = page ? page : 1;
			if ($self.catData[index].listData.length > 0 && $self.page <= $self.catData[index].listPage){
				$self.page = $self.catData[index].listPage;
				end = $self.catData[index].listEnd;
				$('div[catid="'+catid+'"]').parent().parent().css('height', $self.catData[index].listH);
				$('div[catid="'+catid+'"] .loading-layer span').removeClass('active');
				if (end){
					$('div[catid="'+catid+'"] .loading-layer div').addClass('active');
				}else{
					$('div[catid="'+catid+'"] .loading-layer div').removeClass('active');
				}
				return ;
			}
			if ($self.page <= 1){
			  this.isload = true;
				//$('.load').show();
			}
			//获取当前分类内容
			this.$http.get(getOpenUrl() + "vnewsList", {
				headers: {
					'Authorization': 'Bearer ' +  token
				},
				params:{
					cate_id: catid,
					page: $self.page,
					size: size
				},
			}).then((res)=>{
        this.isload = false;
				loading = false;
				this.$refs.loadmore.onBottomLoaded();
				$('.load').hide();
				$('div[catid="'+catid+'"] .loading-layer span').removeClass('active');
				$('div[catid="'+catid+'"] .loading-layer div').removeClass('active');
				if (res.body.code == '0000'){
					$self.catData[index].listPage   = $self.page;
					if (res.body.ccount > 0){
						var data = res.body.data;
						$.each(data, function(k, v){
							$self.catData[index].listData.push(v);
						});
						$('div[catid="'+catid+'"]').parent().parent().css('height', '100%');
						$('div[catid="'+catid+'"]').parent().css('height', '100%');
					}else{
						$self.catData[index].listEnd = end = true;
						$('div[catid="'+catid+'"] .loading-layer div').addClass('active');
					}
				}else{
					this.ispop  = true;
					this.popmsg = res.body.error_description;
					setTimeout(() => {
						this.ispop = false
					}, 1000);
				}
			});
		},

		getRecomData(catid, index){
			var $self     = this;
			var isCurData = false;//是否存在当前数据
			if ($self.catData[index].recommData.length > 0){
				return ;
			}
			//推荐新闻
			this.$http.get(getOpenUrl() + 'vnewsList',{
				headers:{
					'Authorization' : 'Bearer '+getToken()
				},
				params:{
					cate_id: catid,
					recommend:1
				}
			}).then((res)=>{
				if (res.body.code == '0000'){
					$self.catData[index].recommData = res.body.data;
					$('div[catid="'+catid+'"]').parent().parent().css('height', '100%');
					$('div[catid="'+catid+'"]').parent().css('height', '100%');
				}
			});
		}
	},
	mounted(){
    this.isload = true;
		this.scroll = topinfo = 0;
		$('.backtop').scroll(()=> {
			this.scroll=$('.backtop').scrollTop();
		})
		this.end = end = false;
		this.loading = loading = false;
		this.page    = 1;
		this.index   = 0;

		var swiperTab = this.swiperTab;
		var swiperCon = this.swiperCon;
		var self      = this;

		//tab选项卡
		swiperTab.on('tap', function(obj){
			swiperCon.slideTo(obj.clickedIndex);
		});
		swiperCon.on('slideChangeStart', function(obj){
			$('#swiper-container2 .active-nav').removeClass('active-nav')
			var activeNav = $('#swiper-container2 .swiper-slide').eq(obj.activeIndex).addClass('active-nav');
			if (!activeNav.hasClass('swiper-slide-visible')){
				if (activeNav.index()>swiperTab.activeIndex){
					var thumbsPerNav = Math.floor(swiperTab.width/activeNav.width())-1
					swiperTab.slideTo(activeNav.index()-thumbsPerNav)
				}else{
					swiperTab.slideTo(activeNav.index())
				}
			}
		});
		swiperCon.on('slideChangeEnd', function(obj){
			self.catid = parseInt($('#swiper-container2 .active-nav').attr('cid'));
			self.page  = 1;
			self.index = obj.activeIndex;
			end        = false;
			self.getRecomData(self.catid, self.index);
			setTimeout(() => {
				self.getData(self.catid, 1, self.index);
			}, 500);
			return ;
		});
		$('#swiper-container3 .swiper-wrapper').css('min-height', $(window).height() - $('.header').outerHeight() - $('#swiper-container2').outerHeight());
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
	directives: {
		scroll: {
			bind: function (el, binding){
				/*window.addEventListener('scroll', ()=> {
					if(loading || end) return;
					if(document.body.scrollTop + window.innerHeight >= el.clientHeight) {
						loading = true;
						let fnc = binding.value;
						fnc();
						console.log('load data');
					}
				})*/
			}
		}
	},
//	beforeDestroy(){
//		window.removeEventListener("scroll", this.toScroll);
//	},
	deactivated() {
		window.removeEventListener('scroll', this.toScroll);
	},
	created(){

		console.log(this.scroll)
		//一载入页面
		var $self = this;
		this.end = end = false;
		this.loading = loading = false;
		this.page    = 1;
		this.index   = 0;

		//获取资源分类
		this.$http.get(getOpenUrl() + "vnewscates", {
			headers: {
				'Authorization':'Bearer ' +  token
			},
		}).then((res)=>{
			if (res.body.code == '0000'){

				var data = res.body.data;
				if (data){
					$.each(res.body.data, function(k, v){
						v.recommData = [];//推荐数据
						v.listData   = [];//列表数据
						v.listPage   = $self.page;//列表数据分页数
						v.listEnd    = $self.end;//数据是否载入完成
						if (k == 0){
							$self.catid = catid = v.catid;
						}
						$self.catData.push(v);
					});
				}
				if (catid > 0){
					this.getRecomData(catid, this.index);
					setTimeout(() => {
						this.getData(catid, 1, 0);
					}, 500);
				}
			}else{
				this.ispop  = true;
				this.popmsg = res.body.error_description;
				setTimeout(() => {
					this.ispop = false
					this.$router.go(-1);
				}, 1000)
			}
		});
	},
	updated() {
		this.catData[this.index].listH = $('div[catid="'+this.catid+'"]').parent().parent().height();
		end = this.catData[this.index].listEnd;
		this.page = this.catData[this.index].listPage;
		$('.load').hide();
	},
	activated(){
		//路由缓存 前进后退
		$('.load').hide();
		$('.tips').hide();
		$(".backtop").animate({"scrollTop":this.scroll},0)
	},
	beforeRouteLeave(to,from,next){
		topinfo=this.scroll
		this.$store.commit('HOMESTOPF',topinfo)
		next();
	}
}
</script>

<style scoped="scoped">
.wl{margin: 0 auto;width:100%;overflow: hidden;}
.first{float:left;width:100%;}
#headed{width: 100%;float:left;}
.slide{position: relative;margin-bottom:.3rem}
.swiper-container .swiper-slide {width:100%;height:100%;overflow:hidden;}
.swiper-container .swiper-slide img{display: block;width:100%;}
.swiper-container .swiper-slide p{position:absolute;bottom:0;left:0;height:.6rem;line-height:.6rem;padding:0 .2rem;color:#fff;font-size:.2rem;width:100%;background:rgba(0,0,0,.4);text-align:left;}

.swiper-container .banner-slide{height:3.5rem;}

.slide .swiper-pagination{bottom:.7rem;font-size: 0;}
.slide .swiper-pagination .swiper-pagination-bullet{background:#fff;}

#swiper-container2{border-bottom: 1px solid #ccc;/*overflow:visible;*/}
#swiper-container2 .swiper-slide{
	line-height:0.7rem !important;
	color:#666 !important;
	font-size:0.22rem !important;
	background:#fff !important;
	text-align: center;
}
#swiper-container2 .active-nav{
	background:#fff !important;
}
#swiper-container2 .active-nav span{
	display:inline-block;
	border-bottom: 2px solid #008dd3;
    color: #008dd3 !important;
    margin-bottom: -1px;
}
.swiper-slide{
	color:#000;
	/*line-height:300px;*/
	text-align:center;
	font-size:0.22rem;
}
.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10!important;
}
#swiper-container2{border-bottom: 1px solid #ccc;overflow:visible;    position: fixed;background: #Fff;z-index: 6;top:1rem;width: 100%;}
.swiper-slide a{color:#000;}
.blue-slide{
	background: #4390EE;
}
.red-slide {
	background: #CA4040;
}
.orange-slide {
	background: #FF8604;
}


.shift {
	transition-property: margin-left;
	transition-duration: 1s;
}

.tip-bottom{display: flex;border-bottom: 1px solid #ebebeb;margin: 0 0.2rem;}
.tip-bottom-l{width: 2.11rem;height: 1.72rem;/*background: red;*/float: left;overflow:hidden;margin:0 auto;}
.tip-bottom-l img{width:100%;border-radius: 5px;max-height:1.72rem;margin-top: 0.2rem;}
.tip-bottom-r{width: 3.7rem;height: 1.72rem;flex: 1;border-radius: 5px;}
.tip-bottom-r ul{height: 1.42rem;}
.tip-bottom-r .li1{height:0.98rem;line-height:0.49rem;height: 0.98rem;font-size: 0.22rem;margin-top:.1rem;/*padding-left: 0.15rem;*/text-align:left;overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
.tip-bottom-r .li2{line-height: 0.31rem;font-size: 0.22rem;overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;padding-left: 0.15rem;}
.tip-bottom-r .li3{color: #afafaf;line-height: 0.25rem;height: 0.25rem;font-size: 0.2rem;/*margin-left: 0.15rem;*/margin-top: 0.15rem;padding: 0 0.15rem;}
.tip-bottom-r span{display: block;float: left;height: 0.25rem;}
.tip-bottom-r .li3-p1{background: url(../../../images/fbsj.png) no-repeat;background-size: 0.25rem auto;padding-left: 0.28rem;float: left;}
.tip-bottom-r .li3-p2{background: url(../../../images/hf.png) no-repeat;background-size: 0.25rem auto;padding-left: 0.28rem;float: right;}
.tip-bottom-r .li3-p3{background: url(../../../images/sl.png) no-repeat;background-size: 0.25rem auto;padding-left: 0.28rem;margin-left:0.21rem;float: right;}
</style>
