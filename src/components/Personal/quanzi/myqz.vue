<template>
  <div id="headed" style="overflow-y: scroll;">
    <div class="header">
      <div class="headerall">
        <a href="javascript:history.back(-1);" @click="back" class="a1"></a>
        <!--<a @click="back" class="a1"></a>-->
        <span class="forget">我的圈子</span>
        <a class="a2" href="#/fenlei">创建</a>
      </div>
    </div>
    <!--<div style="padding-top:1.4rem">-->
    <swiper :options="swiperOptionTab" id="swiper-container2" ref="mySwiperTab">
      <swiper-slide class="active-nav body_bottom" type="1"><span>创建的</span></swiper-slide>
      <swiper-slide class="body_bottom" type="2"><span>加入的</span></swiper-slide>
    </swiper>
    <!--<div style="position:relative;top:1.4rem;bottom:0;overflow:scroll;">-->
    <div class="page-loadmore backtop" style="position:relative;top:1.7rem;bottom:0;overflow:scroll;font-size: 0.2rem;height: calc(100% - 1.7rem);">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">

        <swiper :options="swiperOptionCon" id="swiper-container3" ref="mySwiperCon">
          <swiper-slide>
            <div class="first" type="1" :type="1" contype="1" v-if="cjItems.length>0">
              <div class="nav" v-for="(data,index) in cjItems" :key="index">
                <!--<a href="#/listcircle">-->
                <div class="nav-bottom">
                  <div class="tip-bottom">
                    <router-link :to="{path:'/listcircle',query:{
                          gid:data.id,
                          id:data.id
                      }}">
                      <div class="tip-bottom-l">
                        <img :src="data.logo" v-lazy="data.logo" />
                      </div>
                    </router-link>
                    <div class="tip-bottom-r">
                      <router-link :to="{path:'/listcircle',query:{
                            gid:data.id,
                            id:data.id
                          }}">
                        <div class="nav-left" :style="!data.is_jiaru?'width:'+'100%':'2.7rem'">
                          <ul>
                            <li class="li1">{{data.name}}</li>
                            <li class="li2" v-html="data.intro"></li>
                            <li class="li3">
                              <span class="li3-p1">成员数：</span>
                              <span class="li3-p2">{{data.membercount}}</span>
                            </li>
                          </ul>
                        </div>
                      </router-link>
                      <!--<div class="nav-right">-->
                      <!--<li class="li4" @click="joinQz(data.id,data.jtime)" :id="'join_'+data.id" v-show='data.jtime==0'>加入</li>-->
                      <!--<li class="li4" @click="delQz(data.id,data.jtime)" :id="'out_'+data.id" v-show='data.jtime!=0'>退出</li>-->
                      <!--</div>-->
                    </div>
                  </div>
                </div>
                <!--</a>-->
              </div>
              <div class="loading-layer">
                <span class="spinner-holder"><img src="../../../images/loading.gif" /></span>
                <div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="first" type="2" :type="2" contype="2" v-if="jrItems.length>0">
              <div class="nav" v-for="(data,index) in jrItems" :key="index">
                <!--<a href="#/listcircle">-->
                <div class="nav-bottom">
                  <div class="tip-bottom">
                    <router-link :to="{path:'/listcircle',query:{
                          gid:data.id,
                          id:data.id
                      }}">
                      <div class="tip-bottom-l">
                        <img :src="data.logo" v-lazy="data.logo" />
                      </div>
                    </router-link>
                    <div class="tip-bottom-r">
                      <router-link :to="{path:'/listcircle',query:{
                            gid:data.id,
                            id:data.id
                          }}">
                        <div class="nav-left">
                          <ul>
                            <li class="li1">{{data.name}}</li>
                            <li class="li2" v-html="data.intro"></li>
                            <li class="li3">
                              <span class="li3-p1">成员数：</span>
                              <span class="li3-p2">{{data.membercount}}</span>
                            </li>
                          </ul>
                        </div>
                      </router-link>
                      <div class="nav-right">
                        <li class="li4" @click="joinQz(data.id,data.jtime)" :id="'join_'+data.id" v-show='!data.is_jiaru'>加入</li>
                        <li class="li4" @click="delQz(data.id,data.jtime)" :id="'out_'+data.id" v-show='data.is_jiaru'>退出</li>
                      </div>
                    </div>
                  </div>
                </div>
                <!--</a>-->
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
    <!--</div>-->
    <!--</div>-->
    <div class="yzall" v-show="show">
      <p class="forget">
        <span class="sp1" style="color:#008dd3">圈子需要验证</span>
        <span class="sp2">
					<input type="text" ref="val"/>
				</span>
        <span class="sp3">
					<input type="button" name="" id="" value="提交" @click="submit()"/>
				</span>
      </p>

    </div>
    <div class="mark" v-show="show" @click="toggle()"></div>
    <div class="load" style="display:none;">
      <div class="load-container load4">
        <div class="loader"> <i></i></div>
      </div>
    </div>
    <load v-show="isload"></load>
    <pop style="text-align: center" class="tip" :title="tip"></pop>
    <!--<a href="#top" class="top_btn" style="display: inline;">回到顶部</a>-->
    <backtop></backtop>
  </div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import { setCookie, getCookie } from '../../../assets/js/cookie.js';
	import { getOpenUrl,getToken} from '../../../assets/js/common.js'
  var top=''
	var status = 1,
		start = 1,
		size = 7,
		loading = false,
		end = false;
	export default {
		data() {
			return {
			  isload:false,
				show: false,
				tip: '',
				cjItems: [],
				jrItems: [],
				noData: '',
				swiperOptionTab: {
					watchSlidesProgress: true,
					watchSlidesVisibility: true,
					notNextTick: true,
					slidesPerView: 2
				},
				swiperOptionCon: {
					autoHeight: true,
					notNextTick: true
				},
				border1: "1px solid #ebebeb",
				borderNone: 0,
				allLoaded: false,
				scrollMode: "auto",
				topStatus: '',
			}
		},
		methods: {
			//		      tabScroll(){
			//          window.addEventListener("scroll",this.toScroll);
			//        },
			//        toScroll(){
			//          if(loading || end || this.scrollTop > $(window).scrollTop()) return;
			//          this.srcollTop = $(window).scrollTop();
			//          if($(document).height() - $(window).height() - $(window).scrollTop() < 80) {
			//            $('div[contype="' + this.type + '"] .loading-layer span').addClass('active');
			//            loading = true;
			//            //self.start += size;
			//            switch(this.type){
			//              case 1:
			//                if (this.cjStart > 0) {
			//                  start = this.cjStart;
			//                }
			//                break;
			//              case 2:
			//                if (this.jrStart > 0) {
			//                  start = this.jrStart;
			//                }
			//                break;
			//            }
			//            start += 1;
			//            setTimeout(() => {
			//              this.getData(this.type, start, size);
			//            }, 1500);
			//          }
			//        },
      back(){
        //android.back1();
        this.$router.goBack();
      },
			toggle() {
				this.show = !this.show;
			},
			submit() {
				//this.idData = [];
				this.$http.post(getOpenUrl() + "joinValidateGroup", {
					gids: this.idData,
					text: this.$refs.val.value
				}, {
					headers: {
						"Authorization": "Bearer " + getToken()
					}
				}).then((res) => {
					if(res.body.code == 0) {
						this.tip = res.body.msg;
						$('.tip').show();
						setTimeout(function() {
							$('.tip').hide();
						}, 1000)
						$('#join_' + this.id).hide();
						this.show = false;
					}
				})
			},
			loadTop() { // 刷新数据的操作
        top=this.scroll;
				var self = this;
				start = 1;

//				self.getData(self.type, start, size);
//				console.log(self.cjItems)
				setTimeout(() => {
					self.status = self.type;
					self.start = 1;
					if(this.type == 1) {
						this.$http.get(getOpenUrl() + "myGroup", {
							headers: {
								"Authorization": "Bearer " + getToken()
							},
							params: {
								typen: this.type,
								page: this.start,
								limit: size
							},
						}).then((res) => {
							self.cjItems.splice(0, self.cjItems.length);
							self.allLoaded = false;
							$('div[contype="' + this.type + '"] .loading-layer span').removeClass('active');
							$('div[contype="' + this.type + '"] .loading-layer div').removeClass('active');
							var data = res.body.data;
							if(res.body.count > 0) {
								this.cjStart = start;
								$.each(data, function(key, val) {
									self.cjItems.push(val);
								});
								//$('div[contype="'+type+'"]').parent().parent().css('height', '100%');
								//$('div[contype="'+type+'"]').parent().css('height', '100%');
							} else {
								////		                  end = true;
								//		                  if(type == 1){
								//		                    this.cjEnd  = true;
								//		                  }
								//		                  self.noData = "没有更多数据"
								//self.allLoaded = true;
								$('div[contype="' + this.type + '"] .loading-layer div').addClass('active');
							}
							//		                loading = false;
							$('.load').hide();
						}, function(err) {
							this.$router.push({
								path: '/login'
							});
							console.log('请求失败', err);
						});
					} else if(this.type == 2) {
						this.$http.get(getOpenUrl() + "user/personalGroup", {
							headers: {
								"Authorization": "Bearer " + getToken()
							},
							params: {
								typen: this.type,
								page: this.start,
								limit: size
							}
						}).then((res) => {
							self.jrItems.splice(0, self.jrItems.length);
							$('div[contype="' + this.type + '"] .loading-layer span').removeClass('active');
							$('div[contype="' + this.type + '"] .loading-layer div').removeClass('active');

							var data = res.body.data;
							if(res.body.count > 0) {
								this.jrStart = start;
								$.each(data, function(key, val) {
									self.jrItems.push(val);
								});
								//$('div[contype="'+type+'"]').parent().parent().css('height', '100%');
								//$('div[contype="'+type+'"]').parent().css('height', '100%');
							} else {
								//		                  end = true;
//								if(type == 1) {
//									this.jrEnd = true;
//								}
//								self.noData = "没有更多数据"
								$('div[contype="' + this.type + '"] .loading-layer div').addClass('active');
							}
							//		                loading = false;
							$('.load').hide();
						}, function(err) {
							this.$router.push({
								path: '/login'
							});
							console.log('请求失败', err);
						});
					}
					self.allLoaded = false;
					self.$refs.loadmore.onTopLoaded();
				}, 2000);
			},
			loadBottom() { // 加载更多数据的操作
				//this.allLoaded = true;// 若数据已全部获取完毕
        top=this.scroll;
				var self = this;
				self.start += 1;
				setTimeout(()=> {
					self.getData(this.type,this.start, size);
					self.$refs.loadmore.onBottomLoaded();
				}, 2000);

			},
			handleTopChange(status) {
				this.topStatus = status;
			},
			handleBottomChange(status) {
				this.bottomStatus = status;
			},
			getData(type, start, size) {
        top=0
        this.$store.commit('HOMESTOPF',top)
        $(".backtop").animate({"scrollTop":this.scroll},0)

				status = type;
				var self = this;
				//self.start = start ? start : 0;
				if(type == 1) {
					if(this.cjItems.length > 0 && start <= this.cjStart) {
						start = this.cjStart;
						end = this.cjEnd;
						$('div[type="'+type+'"]').parent().parent().css('height', this.czlistH);
						$('div[contype="' + type + '"] .loading-layer span').removeClass('active');
						if(end) {
							$('div[contype="' + type + '"] .loading-layer div').addClass('active');
						} else {
							$('div[contype="' + type + '"] .loading-layer div').removeClass('active');
						}
						return;
					}
					if(start == 1) { //第一次加载显示居中loading
						//$('.load').show();
            this.isload = true;
					}
					this.$http.get(getOpenUrl() + "myGroup", {
						headers: {
							"Authorization": "Bearer " + getToken()
						},
						params: {
							typen: type,
							page: start,
							limit: size
						},
					}).then((res) => {
            this.isload = false;
						$('div[contype="' + type + '"] .loading-layer span').removeClass('active');
						$('div[contype="' + type + '"] .loading-layer div').removeClass('active');
						var data = res.body.data;
						if(res.body.count > 0) {
							this.cjStart = start;
							$.each(data, function(key, val) {
								self.cjItems.push(val);
							});
							//$('div[contype="'+type+'"]').parent().parent().css('height', '100%');
							//$('div[contype="'+type+'"]').parent().css('height', '100%');
							self.allLoaded = false;
						} else {
 							//self.allLoaded = true;
//							end = true;
							if(type == 1) {
								this.cjEnd = true;
							}
							self.noData = "没有更多数据"
							$('div[contype="' + type + '"] .loading-layer div').addClass('active');
						}
						loading = false;
						$('.load').hide();
					}, function(err) {
						this.$router.push({
							path: '/login'
						});
						console.log('请求失败', err);
					});
				} else if(type == 2) {
					if(this.jrItems.length > 0 && start <= this.jrStart) {
						start = this.jrStart;
						end = this.jrEnd;
						$('div[contype="' + type + '"]').parent().parent().css('height', this.jrlistH);
						$('div[contype="' + type + '"] .loading-layer span').removeClass('active');
						if(end) {
							$('div[contype="' + type + '"] .loading-layer div').addClass('active');
						} else {
							$('div[contype="' + type + '"] .loading-layer div').removeClass('active');
						}
						return;
					}
					if(start == 1) { //第一次加载显示居中loading
						//$('.load').show();
            this.isload = true;
					}
					this.$http.get(getOpenUrl() + "user/personalGroup", {
						headers: {
							"Authorization": "Bearer " + getToken()
						},
						params: {
							typen: type,
							page: start,
							limit: size
						}
					}).then((res) => {
            this.isload = false;
						$('div[contype="' + type + '"] .loading-layer span').removeClass('active');
						$('div[contype="' + type + '"] .loading-layer div').removeClass('active');

            $('.backtop').scroll(()=> {
              this.scroll=$('.backtop').scrollTop();
            })
						var data = res.body.data;
						if(res.body.count > 0) {
							this.jrStart = start;
							$.each(data, function(key, val) {
								self.jrItems.push(val);
							});
							self.allLoaded = false;
							//$('div[contype="'+type+'"]').parent().parent().css('height', '100%');
							//$('div[contype="'+type+'"]').parent().css('height', '100%');
						} else {
							//                end = true;
							//self.allLoaded = true;
							if(type == 1) {
								this.jrEnd = true;
							}
							self.noData = "没有更多数据"
							$('div[contype="' + type + '"] .loading-layer div').addClass('active');
						}
						loading = false;
						$('.load').hide();
					}, function(err) {
						this.$router.push({
							path: '/login'
						});
						console.log('请求失败', err);
					});
				}
			},
			joinQz(id, time) {
				this.idData = [];
				this.idData.push(id);
				console.log(this.idData);
				if(time == 0) {
					this.toggle();
				} else {
					this.$http.post(getOpenUrl() + "/joingroup", {
						gids: [id]
					}, {
						headers: {
							"Authorization": "Bearer " + getToken()
						}
					}).then((res) => {
						if(res.body.status == 1) {
              this.$root.eventHub.$emit('tjqzSuccess');
							$('#join_' + this.id).hide();
						} else {
							this.tip = res.body.error_description;
							$('.tip').show();
							setTimeout(function() {
								$('.tip').hide();
							}, 1000)
						}
					});
				}
			},
			delQz(id) {
        this.isload = true;
				//$('.load').show();
				this.$http.get(getOpenUrl() + "/outGroup", {
					headers: {
						"Authorization": "Bearer " + getToken()
					},
					params: {
						gid: id
					}
				}).then((res) => {
				  this.isload = false;
					if(res.body.code === '0000') {
            this.$root.eventHub.$emit('tjqzSuccess');
						this.tip = res.body.data;
						$('.tip').show();
						setTimeout(function() {
							$('.tip').hide();
						}, 1000)
						$('#join_' + id).show();
						$('#out_' + id).hide();
						$('#out_' + id).parent().parent().parent().parent().parent().hide();
					} else {
						this.tip = res.body.error_description;
						$('.tip').show();
						setTimeout(function() {
							$('.tip').hide();
						}, 1000)
					}
					$('.load').hide();
				});
			}
		},
		mounted() {
			//获取全部答疑
			this.type = status;
			this.start = start;
			this.bottom = size //默认加载5条数据
			$('.load').show();

      this.$root.eventHub.$on('tjqzSuccess',()=>{
        this.cjItems = [];
        this.jrItems = [];
        this.getData(this.type, this.start, size);
      })

			var swiperTab = this.swiperTab;
			var swiperCon = this.swiperCon;
			var self = this;
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
				loading = false;
				self.type = parseInt($('#swiper-container2 .active-nav').attr('type'));
				end = false;
				start = 1;
				//$('#swiper-container3 .swiper-wrapper').css('height', 0);
				self.getData(self.type, start, size);
				return;
			});

			$('#swiper-container3 .swiper-wrapper').css('min-height', $(window).height() - $('div.header').outerHeight() - $('#swiper-container2').outerHeight());

			//			      this.tabScroll();

		},
		components: {
			//组件
			swiper,
			swiperSlide
		},
		computed: {
			swiperTab() {
				return this.$refs.mySwiperTab.swiper
			},
			swiperCon() {
				return this.$refs.mySwiperCon.swiper
			}
		},
		created() {
			this.type = 1; //默认加载数据类型
			this.end = end = false; //是否加载完成
			this.loading = loading = false; //是否正在加载
			this.start = 1; //数据开始条数
			this.getData(this.type, this.start, size);
		},
		watch: {
			//监听
		},
		updated() {
			var self = this;
			if(self.type == 1) {
				self.cjlistH = $('div[contype="' + self.type + '"]').parent().parent().height();
				end = self.cjEnd;
			} else {
				self.jrlistH = $('div[contype="' + self.type + '"]').parent().parent().height();
				end = self.jrEnd;
			}
		},
		//	   beforeDestroy(){
		//      window.removeEventListener("scroll",this.toScroll);
		//    },
		activated() {
			//路由缓存 前进后退
			$('.load').hide();
      $(".backtop").animate({"scrollTop":this.scroll},0)
		},
    beforeRouteLeave(to,from,next){
      top=this.scroll
      this.$store.commit('HOMESTOPF',top)
      next();
    },
	}
</script>

<style scoped="scoped">
	.tip {
		display: none;
	}

	.header {
		height: 0.7rem;
		box-shadow: 0 0 5px #ebebeb;
		position: fixed;
		top: 0;
		width: 100%;
		background: #fff;
		z-index: 10;
    padding-top: 0.3rem;
	}

	.headerall {
		padding: 0 0.2rem;
	}

	.header .a1 {
		width: 0.18rem;
		height: 0.34rem;
		display: block;
		background: url(../../../images/back.png) no-repeat;
		background-size: cover;
		float: left;
		margin-top: 0.2rem;
	}

	.header .a2 {
		width: 0.73rem;
		height: 0.42rem;
		display: block;
		float: right;
		border: 1px solid #008DD3;
		font-size: 0.2rem;
		line-height: 0.42rem;
		text-align: center;
		border-radius: 0.05rem;
		color: #008DD3;
		margin-top: 0.14rem;
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

	.wl {
		margin: 0 auto;
		width: 6.4rem;
		overflow: hidden;
		position: absolute;
		top: 1.66rem;
		left: 50%;
		transform: translateX(-50%);
	}

	.first {
		/*float:left;width:6.4rem;*/
		padding: 0 0.2rem;
	}

	#headed {
		width: 100%;
		/*overflow: hidden;*/
		float: left;
	}

	#swiper-container2 {
		border-bottom: 1px solid #ccc;
		overflow: visible;
		position: fixed;
		background: #Fff;
		z-index: 6;
		top:1rem;
		width: 100%;
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
	/*.swiper-slide{*/
	/*color:#000;*/
	/*line-height:300px;*/
	/*text-align:center;*/
	/*font-size:50px;*/
	/*}*/

	#swiper-container2 .swiper-slide.shux:after {
		content: "";
		position: absolute;
		top: 25%;
		right: 0;
		height: 50%;
		width: 1px;
		background: #ccc;
	}

	.taball {
		border-bottom: 0.01rem solid #ebebeb;
		position: fixed;
		top: 0.88rem;
		width: 100%;
		background: #fff;
		z-index: 5;
	}

	.tab {
		width: 6rem;
		overflow: hidden;
		padding: 0;
		margin: 0 auto;
		height: 0.76rem;
		line-height: 0.76rem;
	}

	.tab li {
		float: left;
		list-style: none;
		width: 50%;
		text-align: center;
	}

	.body_bottom {
		/*height: 0.73rem;*/
		margin: 0 auto;
		text-align: center;
		font-size: 0.22rem;
	}

	.active_color {
		color: #008dd3;
		border-bottom: 0.03rem solid #008dd3 !important;
	}

	.first .nav-bottom {
		padding-bottom: 0.3rem;
		border-bottom: 1px solid #e0e0e0;
	}

	.first .tip-bottom {
		/*width: 6rem;*/
		/*margin: 0 auto;*/
		display: flex;
	}

	.first1 .tip-bottom a {
		margin: 0 auto;
	}

	.first .tip-bottom-l {
		width: 2.11rem;
		height: 1.42rem;
		float: left;
		margin-top: 0.3rem;
		border-radius: 0.1rem;
		overflow: hidden;
	}

	.first .tip-bottom-l img {
		width: 2.11rem;
		height: 1.42rem;
	}

	.first .tip-bottom-r {
		width: 3.9rem;
		height: 1.42rem;
		margin-top: 0.3rem;
		flex: 1;
		position: relative;
		margin-left: 0.15rem;
	}

	.first .nav-left {
		float: left;
		width: 2.7rem;
	}

	.first .tip-bottom-r ul {
		height: 1.42rem;
	}

	.first .tip-bottom-r .li1 {
		line-height: 0.49rem;
		font-size: 0.22rem;
		color: #008dd3;
	}

	.first .tip-bottom-r .li2 {
		line-height: 0.31rem;
		font-size: 0.2rem;
		color: #afafaf;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		height: 0.56rem;
	}

	.first .tip-bottom-r .li3 {
		line-height: 0.18rem;
		height: 0.18rem;
		font-size: 0.2rem;
		margin-top: 0.15rem;
		color: #afafaf;
	}

	.first .tip-bottom-r span {
		display: block;
		float: left;
		height: 0.18rem;
	}

	.first .nav-right {
		float: right;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.first .nav-right .li4 {
		width: 0.96rem;
		height: 0.46rem;
		line-height: 0.46rem;
		text-align: center;
		float: right;
		color: #008dd3;
		border: 1px solid #008dd3;
		border-radius: 0.23rem;
		font-size: 0.2rem;
	}

	.yzall .forget {
		text-align: center;
		line-height: 1.25rem;
		z-index: 13;
		margin-bottom: 0.05rem;
		border-radius: 0.1rem;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		/*box-shadow: 0 0 0.1rem #000;*/
		/*background: rgba(0, 0, 0, 0.7);*/
		background: #fff;
		padding: 0rem 0.2rem;
		color: #fff;
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
		z-index: 10;
		background: rgba(0, 0, 0, 0.3);
	}

	.yzall .sp2 {
		border: 1px solid #e0e0e0;
		display: block;
		border-radius: 0.1rem;
	}

	.yzall .sp2 input {
		display: block;
		width: 100%;
		height: 0.5rem;
		padding-left: 0.2rem;
	}

	.yzall .sp3 {
		width: 1.4rem;
		background: #fff;
		display: block;
		margin: 0 auto;
		text-align: center;
		margin-top: 0.2rem;
		border-radius: 0.1rem;
	}

	.yzall .sp3 input {
		display: block;
		width: 100%;
		color: #008DD3;
		height: 0.5rem;
		border: 1px solid #008DD3;
		border-radius: 0.28rem;
	}
</style>
