<template>
	<div class="listcircle" ref="all">
		<div class="listbanner" :style="'background-image:url('+this.groupData.backdrop+')'">
			<div class="listmark" :style="'background:'+(this.groupData.cover ? this.groupData.cover : '#2cafbb')+(groupData.backdrop ? ';opacity:0.2;' : ';opacity:1')"></div>
			<div class="header">
				<div class="header-top">
					<a href="javascript:history.back(-1);" class="a1"></a>
					<ul class="post">
						<li class="li1" @click="toggle()" ref="a1">全部帖子</li>
						<li class="li2"></li>
						<ul class="post-child" v-show="show">
							<li @click="opbtn('')" ref="a2">全部帖子</li>
							<li @click="opbtn('dist')" ref="a4">精华帖子</li>
							<li @click="opbtn('my')" ref="a5">我的帖子</li>
						</ul>
					</ul>
					<span class="forget">{{this.groupData.name}}</span>
					<router-link :to="'/boss?gid='+this.$route.query.gid" v-if="this.is_show!=0">
						<div class="user"></div>
					</router-link>
					<div class="ld" @click="toggle3()"></div>
				</div>
				<div class="header-bottom">
					<div class="header-bottom-top">
						<div class="tip-bottom-l">
							<img src="" v-lazy="groupData.logo" />
						</div>
						<div class="tip-bottom-r">
							<ul>
								<li class="li1">
									<span class="sp1">{{this.groupData.name}}</span>
									<div class="sp2">
										<li class="li4">
											<label>
					                            <input type="checkbox" ref="check" @click="collect()"><b></b>
					                        </label>
										</li>
									</div>
								</li>
								<li class="li2">{{this.groupData.intro}}</li>
							</ul>
						</div>
					</div>
					<div class="header-bottom-bottom">
						<ul>
							<li class="li1">成员数：</li>
							<li class="li1">{{this.groupData.membercount}}</li>
							<li class="li2 mt70">帖子数：</li>
							<li class="li1">{{this.groupData.threadcount}}</li>
							<li class="li3" v-if="this.groupData.is_join==1&&this.groupData.is_level!=1">已加入</li>
							<li class="li3" v-if="this.groupData.is_join==0&&this.groupData.is_level!=1" @click="join()">+加入</li>
						</ul>
					</div>
					<div class="header-bottom-down">{{this.groupData.intro}}</div>
				</div>
			</div>
		</div>
			
		<!--内容-->
		<div style="font-size: 0.26rem;text-align: center;" v-if="this.is_show==0">您没有权限访问该圈子</div>
		<div style="z-index: 5;position: fixed;top: 4.07rem;width: 100%;background: #fff;" v-else>
			<swiper :options="swiperOptionTab" id="swiper-container2" ref="mySwiperTab">
				<swiper-slide :class="key==0 ? 'active-nav' : ''" v-for="(list, key) in catsData" :cid="list.id"><span>{{list.title}}</span></swiper-slide>
			</swiper>
		</div>

		<swiper style="padding-top: 4.8rem;" :options="swiperOptionCon" id="swiper-container3" ref="mySwiperCon">
			<swiper-slide v-for="(cat, key) in catsData">
				<div class="first" :catid="cat.id">
					<div v-for="(list,index) in cat.listData" :key="index">
						<!--显示多张图片-->
						<div class="tip-bottom-all21" v-if="list.url.length>1">
							<div class="tip-bottom21">
								<div class="tip-bottom-l1">
									<ul class="tip-bottom-l-t1">
										<li class="li1">
											<img :src="list.face==0?'../../../static/loading.png':list.face" />
										</li>
										<li class="li2">{{list.name}}</li>
										<li class="li3" v-for="(user,index) in list.userGroup" v-if="user.type=='member'" :style="'background:'+user.bcolor">{{user.title}}</li>
										<img  :src="user.icon" alt="" style="height:0.3rem;float: left;margin-top: 0.14rem;"v-for="(user,index) in list.userGroup"v-if="user.icon!=''">
										<li class="li4">{{list.addtime}}</li>

									</ul>
									<input type="checkbox" style="display: block;float: left;margin-top: 0.13rem;"/>
									<router-link :to="'/vote?id='+list.id+'&gid='+gid">
										<p :style="list.highlight==1?'color:'+list.highstyle:''">
											<span v-text="list.topic_type==1?toupiao:((list.topic_type==2)?huodong:'')"></span>{{list.title}}

										</p>
									</router-link>
									<li class="li5">
										<span class="p1 mt50 p2" v-if="list.dist>0">精</span>
										<span class="p1 mt6 p3" v-if="list.top>0">置</span>
										<span class="p1 mt6 p4" v-if="list.url.length>0">图</span>
									</li>
								</div>
								<div class="tip-bottom-r1">
									<router-link :to="'/vote?id='+list.id+'&gid='+gid" style="height: 1.42rem;display: block;">
										<div class="tip-bottom-r-img">
											<div class="tip-bottom-r-all1">
												<swiper :options="swiperOptionImg" id="swiper-container2" ref="mySwiperImg">
													<swiper-slide v-for="(img, key) in list.url" :cid="list.id">
														<img :src="img" />
													</swiper-slide>
												</swiper>
											</div>
										</div>
									</router-link>
									<ul>
										<li class="li1"></li>
										<li class="li2">{{list.shoucannum}}</li>
										<li class="li3">{{list.replycount}}</li>
									</ul>
								</div>
							</div>

						</div>
						<!--显示一张照片-->
						<div class="tip-bottom-allone" v-else>
							<div class="tip-bottomone">
								<div class="tip-bottom-lone" :style="list.url.length == 0 ? 'width:100%' : ''">
									<ul class="tip-bottom-l-tone">
										<li class="li1">
											<img :src="list.face==0?'../../../static/loading.png':list.face" />
										</li>
										<li class="li2">{{list.name}}</li>
										<li class="li3" v-for="(user,index) in list.userGroup" v-if="user.type=='member'" :style="'background:'+user.bcolor">{{user.title}}</li>
										<img  :src="user.icon" alt="" style="height:0.3rem;float: left;margin-top: 0.14rem;"v-for="(user,index) in list.userGroup"v-if="user.icon!=''">
										<li class="li4">{{list.addtime}}</li>
									</ul>
									<!--color:index+1==1?orange:((index+1==2)?yellow:((index+1==3)?red:other))-->
									<input type="checkbox" style="display: block;float: left;margin-top: 0.13rem;"/>
									<router-link :to="'/vote?id='+list.id+'&gid='+gid">
										<!-- :style="list.url.length == 0 ? 'width:100%' : ''"-->
										<p :style="list.highlight==1?'color:'+list.highstyle:''">
											<span v-text="list.topic_type==1?toupiao:((list.topic_type==2)?huodong:'')"></span>{{list.title}}
										</p>
									</router-link>
									<li class="li5">
										<span class="p1 mt50 p2" v-if="list.dist>0">精</span>
										<span class="p1 mt6 p3" v-if="list.top>0">置</span>
										<span class="p1 mt6 p4" v-if="list.url.length>0">图</span>
									</li>
								</div>
								<div class="tip-bottom-rone">
									<router-link :to="'/vote?id='+list.id+'&gid='+gid">
										<div class="img" v-if="list.url.length>0"><img :src="list.url[0]" /></div>
									</router-link>
									<ul :style="list.url.length == 0 ? 'float:right' : ''">
										<li class="li1"></li>
										<li class="li2">{{list.shoucannum}}</li>
										<li class="li3">{{list.replycount}}</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="line"></div>
					</div>
					<div class="loading-layer">
						<span class="spinner-holder"><img src="../../images/loading.gif" /></span>
						<div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
					</div>
				</div>
			</swiper-slide>
		</swiper>

		<!--弹出-->
		<div class="load" style="display:none;">
			<div class="load-container load4">
				<div class="loader"> <i></i></div>
			</div>
		</div>
		<div class="tj" @click="toggle2()"></div>
		<transition name="fade">
			<div class="bigc" v-show="isshow"></div>
		</transition>
		<!--活动-->
		<router-link :to="'/activity?gid='+this.$route.query.gid+'&cid='+catid">
			<transition name="fade">
				<div class="hd" v-show="isshow"></div>
			</transition>
		</router-link>
		<!--发帖-->
		<router-link :to="'/message?gid='+this.$route.query.gid">
			<transition name="fade">
				<div class="ft" v-show="isshow"></div>
			</transition>
		</router-link>
		<!--投票-->
		<router-link :to="'/poll?gid='+this.$route.query.gid">
			<transition name="fade">
				<div class="js" v-show="isshow"></div>
			</transition>
		</router-link>
		<div class="mark" v-show="toshow"></div>

		<transition name="fade">
			<div class="jubao" v-show="toshow">
				<div class="jubaoall">

					<div class="jubao-t">
						<span>本圈公告</span>
						<a class="a2" @click="togglemore()">X</a>
					</div>
					<div class="jubao-b">
						<p>{{this.groupData.announce}}</p>
					</div>
				</div>
			</div>
		</transition>
		<div class="yzall" v-show="forshow">
			<p class="forget1">
				<span class="sp1">圈子需要验证</span>
				<span class="sp2">
					<input type="text" ref="val"/>
				</span>
				<span class="sp3">
					<input type="button" name="" id="" value="提交" @click="submit()"/>
				</span>
			</p>
		</div>
		<div class="mark" v-show="forshow" @click="toggle4()"></div>
		<pop class="tip" :title="tip"></pop>
	</div>
</template>

<script>
	var catid = 0;
	var size  = 3, loading = false, end = false , start = 0;
	import {Loadmore} from 'mint-ui';  
	import { getOpenUrl ,getToken} from "../../assets/js/common.js"
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import { setCookie, getCookie } from '../../assets/js/cookie.js'
	import qs from 'qs'
	export default {
		data() {
			
			return {
				tip:'',
				moveList: [],
				isshow: false,
				toshow: false,
				show: false,
				noshow: false,
				forshow: false,
				catData: {},
				items:[],
				listData: [],
				groupData: {},
				code: {},
				huodong: '[活动]',
				toupiao: '[投票]',
				tid: '',
				cid: '',
				gid: '',
				status: '',
				is_show: {},
				catsData:[],
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
				swiperOptionImg: {
					slidesPerView: 3.2,
					spaceBetween:10
				}
			}
		},
		methods: {
			getData(catid, type, page, index) {
				var self   = this;
				this.start = page ? page : 1;
				if (this.catsData[index].listData.length > 0 && this.start <= self.catsData[index].listPage){
					this.start = this.catsData[index].listPage;
					this.end   = end = this.catsData[index].listEnd;
					this.listH = this.catsData[index].listH;
					$('div[catid="'+catid+'"]').parent().parent().css('height', self.catsData[index].listH);
					$('div[catid="'+catid+'"] .loading-layer span').removeClass('active');
					if (end){
						$('div[catid="'+catid+'"] .loading-layer div').addClass('active');
					}else{
						$('div[catid="'+catid+'"] .loading-layer div').removeClass('active');
					}
					$('.load').hide();
					return;
				}
				//获取帖子
				this.$http.get(getOpenUrl() + "topicList", {
					params: {
						gid: this.gid,
						cid: catid,
						type: type,
						page: this.start,
						limit:size
					},
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					$('div[catid="'+catid+'"] .loading-layer span').removeClass('active');
					$('div[catid="'+catid+'"] .loading-layer div').removeClass('active');
					if (res.body.code == '0000'){
						var data = res.body.data;
						$.each(data, function(k, v){
							self.catsData[index].listData.push(v);
						});
						//$('div[catid="'+catid+'"]').parent().parent().css('height', '100%');
						//$('div[catid="'+catid+'"]').parent().css('height', '100%');
					}else{
						if (res.body.code == '7002'){
							self.catsData[index].listEnd = this.end = end = true;
							$('div[catid="'+catid+'"] .loading-layer div').addClass('active');
							//$('div[catid="'+catid+'"]').parent().parent().css('height', '100%');
							//$('div[catid="'+catid+'"]').parent().css('height', '100%');
						}else{
							this.tip = res.body.error_description;
							$('.tip').show();
							setTimeout(() => {
								$('.tip').hide();
							}, 1500);
						}
					}
					self.catsData[index].listPage = this.start;
					loading = false;
					$('.load').hide();
				})
			},
			toggle() {
				this.show = !this.show;
			},
			toggle3: function() {
				if(this.groupData.announce==''){
					this.tip = '本圈暂无公告';
					$('.tip').show();
					setTimeout(function(){
						$('.tip').hide();
					},1000)
				}else{
					this.toshow = !this.toshow;
					this.$refs.all.style.overflow = "hidden";
				}
			},
			togglemore() {
				this.toshow = !this.toshow;
				this.$refs.all.style.overflow = "";
			},
			toggle2: function() {
				this.isshow = !this.isshow;
			},
			opbtn(type) {
				//console.log(1)
				switch(type) {
					case 'dist':
						this.$refs.a1.innerText = this.$refs.a4.innerText
						break;
					case 'my':
						this.$refs.a1.innerText = this.$refs.a5.innerText
						break;
					default:
						this.$refs.a1.innerText = this.$refs.a2.innerText
				}
				this.type = type;
				this.getData(this.catid, type, this.start, this.index);
			},
			toggle4() {
				this.forshow = !this.forshow;
				this.$refs.all.style.height = "100%";
				this.$refs.all.style.overflow = "";
			},
			//加入圈子
			join() {
				var gid = [];
				gid.push(this.$route.query.gid)
				this.$http.post(getOpenUrl() + "joingroup", {
					gids: gid,
				},{
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					if(res.body.code == 0) {
						this.tip = '提交成功';
						$('.tip').show();
						setTimeout(function(){
							$('.tip').hide();
						},1000)
						this.load();
					} else {
						this.forshow = true;
						this.$refs.all.style.height = "100%";
						this.$refs.all.style.overflow = "hidden";
					}
				})
			},
			//加入圈子验证
			submit() {
				var gid = [];
				gid.push(this.$route.query.gid)
				this.$http.post(getOpenUrl() + "joinValidateGroup", {
					gids: gid,
					text: this.$refs.val.value,
				},{
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					this.joingroup = res.body.data;
					if(res.body.code == 0) {
						this.tip = '提交成功';
	                   	$('.tip').show();
	                   	setTimeout(function(){
	                     	$('.tip').hide();
	                   	},1000)
						this.load();
						this.forshow = false;
						this.$refs.all.style.height = "100%";
						this.$refs.all.style.overflow = "";
					}else{
						this.tip = res.body.error_description;
	                   	$('.tip').show();
	                   	setTimeout(function(){
	                     	$('.tip').hide();
	                   	},1000)
					}
				})
			},
			load() {
				$('.load').show();
				this.gid = this.$route.query.gid
				var self = this;
				this.catid = catid = 0;//分类id
				this.type  = '';//搜索条件
				this.start = start = 1;//分页数
				this.index = 0;//当前tab
				//一载入页面
				//获取圈子信息
				this.$http.get(getOpenUrl() + "groupData", {
					params: {
						gid: this.$route.query.gid
					},
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					$('.load').hide();
					this.groupData = res.body.data;
					this.is_show   = res.body.is_show;
					if(this.is_show == 1) {
						//获取圈子帖子分类
						this.$http.get(getOpenUrl() + "topicCate", {
							params: {
								gid: this.$route.query.gid
							},
							headers: {
								'Authorization': 'Bearer ' + getToken()
							}
						}).then((res) => {
							$('.load').hide();
							var cat      = {};
							cat.title    = '全部';
							cat.id       = 0;
							cat.listPage = 1;
							cat.listEnd  = false;
							cat.listData = [];
							cat.listH    = 0;
							this.catsData.push(cat);
							var data = res.body.data;
							if (data.length > 0){
								$.each(data, function(k, v){
									v.listData = [];
									v.listPage = 1;
									v.listEnd  = false;
									v.listH    = 0;
									self.catsData.push(v);
								})
							}
							//console.log(this.catsData);
							//this.is_show = res.body.is_show;
							
							this.getData(this.catid, this.type, this.start, this.index); //获取帖子
						});
					}
				})
			},
			//收藏
			collect() {
				if(this.$refs.check.checked) {
					this.status = 'add'
				} else {
					this.status = 'del'
				}
				this.$http.post(getOpenUrl() + "collectDo", {
					did: this.$route.query.gid,
					type: 2,
					status: this.status,
				},{
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {

					if(res.body.code == 0) {

						if(this.$refs.check.checked) {
							this.tip = '收藏成功';
		                   	$('.tip').show();
		                   	setTimeout(function(){
		                     	$('.tip').hide();
		                   	},1000)

						} else if(!this.$refs.check.checked) {
							this.tip = '取消成功';
		                   	$('.tip').show();
		                   	setTimeout(function(){
		                     	$('.tip').hide();
		                   	},1000)
						}
					}else{
						this.tip = res.body.error_description;
	                   	$('.tip').show();
	                   	setTimeout(function(){
	                    	$('.tip').hide();
		                },1000)
					}
				})
			}
		},
		mounted() {
			$('.tip').hide();
			if(this.groupData.is_collect != 0) {
				this.$refs.check.checked = true
			}
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
				return ;
			});
			swiperCon.on('slideChangeEnd', function(obj) {
				self.catid = parseInt($('#swiper-container2 .active-nav').attr('cid'));
				self.page  = 1;
				self.index = obj.activeIndex;
				end        = false;
				$('.load').show();
				self.getData(self.catid, self.type, self.page, self.index);
				return ;
			
			});
			$('#swiper-container3 .swiper-wrapper').css('min-height', $(window).height() - $('div.listbanner').outerHeight() - $('#swiper-container2').outerHeight());
			$(window).scroll(function(){
				if(loading || end || this.scrollTop > $(window).scrollTop()) return;
				this.srcollTop = $(window).scrollTop();
				if($(document).height() - $(window).height() - $(window).scrollTop() < 80){
					$('div[catid="'+self.catid+'"] .loading-layer span').addClass('active');
					loading = true;
					self.start += 1;
					setTimeout(() => {
						self.getData(self.catid, self.type, self.start, self.index);
					}, 1000);
				}
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
			swiperSlide,
		},
		created(){
			this.load();
		},
		updated() {
			console.log(this.catsData);
			console.log(this.catsData[0].listH);
			this.catsData[this.index].listH = $('div[catid="'+this.catid+'"]').parent().parent().height();
			end  = this.catsData[this.index].listEnd;
			start = this.start = this.catsData[this.index].listPage;
		},
	}
</script>
<style scoped>
	.listmark{position: absolute;opacity:0.2;top: 0;left: 0;width: 100%;height: 4.07rem;}
	/*内容*/
	/*第一种样式*/
	
	.tip-bottom-allone {
		overflow: hidden;
		border-bottom: 1px solid #ededed;
		padding: 0 0.2rem;
	}
	
	.tip-bottomone {}
	
	.tip-bottom-lone {
		float: left;
		width: calc(100% - 2.3rem);
		padding-right: 0.2rem;
	}
	
	.tip-bottom-l-tone {
		overflow: hidden;
	}
	
	.tip-bottom-l-tone li {
		float: left;
		height: 0.56rem;
		line-height: 0.56rem;
		font-size: 0.17rem;
		color: #999999;
	}
	
	.tip-bottom-l-tone .li1 {
		width: 0.36rem;
		height: 0.36rem;
		margin-top: 0.1rem;
	}
	
	.tip-bottom-l-tone .li1 img {
		width: 0.36rem;
		height: 0.36rem;
		border-radius: 50%;
		display: block;
	}
	
	.tip-bottom-l-tone .li2 {
		margin-left: 0.13rem;
		margin-right: 0.11rem;
	}
	
	.tip-bottom-l-tone .li3 {
		line-height: 0;
		height: 0;
		padding: 0.1rem 0.1rem;
		border-radius: 0.05rem;
		margin-right: 0.05rem;
		margin-top: 0.18rem;
		color: #fff;
	}
	
	.tip-bottom-l-tone .li4 {
		float: right;
	}
	
	.tip-bottom-lone .li5 {
		float: right;
	}
	
	.tip-bottom-lone p {
		width: 70%;
		float: left;
		text-align: left;
		font-size: 0.26rem;
		line-height: 0.36rem;
		margin-top: 0.06rem;
		color: #242424;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.tip-bottom-rone {
		float: right;
		padding-top: 0.2rem;
	}
	
	.tip-bottom-rone .img {
		width: 2.1rem;
		height: 1.42rem;
		border-radius: 0.1rem;
		display: block;
		float: left;
	}
	
	.tip-bottom-rone img {
		width: 2.1rem;
		height: 1.42rem;
		border-radius: 0.1rem;
		display: block;
		float: left;
	}
	
	.tip-bottom-rone ul {
		height: 0.77rem;
		line-height: 0.77rem;
		color: #949494;
		font-size: 0.2rem;
		float: left;
	}
	
	.tip-bottom-rone ul li {
		height: 0.77rem;
		float: left;
	}
	
	.tip-bottom-rone .li1 {
		width: 0.3rem;
		height: 0.77rem;
		background: url(../../images/ds.png)no-repeat 0 50%;
		background-size:auto 0.28rem;
		margin-left: 0.1rem;
	}
	
	.tip-bottom-rone .li2 {
		height: 0.77rem;
		background: url(../../images/xin1.png)no-repeat 0 50%;
		background-size:auto  0.3rem;
		padding-left: 0.4rem;
		margin-left: 0.2rem;
		width: .3rem;
		text-align:left;
	}
	
	.tip-bottom-rone .li3 {
		height: 0.77rem;
		background: url(../../images/hf.png)no-repeat 0 50%;
		background-size:auto 0.3rem;
		padding-left: 0.4rem;
		margin-left: 0.2rem;
		width: .3rem;
		text-align:left;
	}
	/*没有相关帖子*/
	
	.no {
		width: 5rem;
		color: #242424;
		font-size: 0.24rem;
		z-index: 10000000;
		margin: 0 auto;
	}
	
	.mt6 {
		margin-left: 0.06rem;
	}
	
	.line {
		height: 0.2rem;
		background: #f0f0f0;
	}
	
	/*.first {
		padding-bottom: 0.98rem;
	}*/
	
	.tip-bottom-all21 {
		overflow: hidden;
		border-bottom: 1px solid #ededed;
	}
	
	.tip-bottom1 {}
	
	.tip-bottom-l1 {}
	
	.tip-bottom-l-t1 {
		overflow: hidden;
	}
	
	.tip-bottom-l-t1 li {
		float: left;
		height: 0.56rem;
		line-height: 0.56rem;
		font-size: 0.17rem;
		color: #999999;
	}
	
	.tip-bottom-l-t1 .li1 {
		width: 0.36rem;
		height: 0.36rem;
		margin-top: 0.1rem;
	}
	
	.tip-bottom-l-t1 .li1 img {
		width: 0.36rem;
		height: 0.36rem;
		border-radius: 50%;
		display: block;
	}
	
	.tip-bottom-l-t1 .li2 {
		margin-left: 0.13rem;
		margin-right: 0.11rem;
	}
	
	.tip-bottom-l-t1 .li3 {
		line-height: 0;
		height: 0;
		padding: 0.1rem 0.1rem;
		border-radius: 0.05rem;
		margin-right: 0.05rem;
		margin-top: 0.18rem;
		color: #fff;
	}
	
	.tip-bottom-l1 .li4 {
		float: right
	}
	
	.tip-bottom-l1 .li5 {
		float: right
	}
	
	.tip-bottom-l1 p {
		width: 80%;
		float: left;
		text-align: left;
		font-size: 0.26rem;
		line-height: 0.36rem;
		margin-top: 0.06rem;
		color: #242424;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.tip-bottom-r1 {
		float: left;
		width: 100%;
		margin-top: 0.2rem;
	}
	
	.tip-bottom-r1 img {
		width: 100%;
		height: 1.42rem;
		border-radius: 0.1rem;
		display: block;
		float: left;
	}
	
	.tip-bottom-r1 ul {
		height: 0.77rem;
		line-height: 0.77rem;
		color: #949494;
		font-size: 0.15rem;
		float: right;
	}
	
	.tip-bottom-r1 ul li {
		height: 0.77rem;
		float: left;
	}
	
	.tip-bottom-r1 .li1 {
		width: 0.18rem;
		height: 0.77rem;
		background: url(../../images/ds.png)no-repeat 0 50%;
		background-size: 0.18rem 0.17rem;
		margin-left: 0.1rem;
	}
	
	.tip-bottom-r1 .li2 {
		height: 0.77rem;
		background: url(../../images/xin1.png)no-repeat 0 50%;
		background-size: 0.18rem 0.14rem;
		padding-left: 0.26rem;
		margin-left: 0.31rem;
	}
	
	.tip-bottom-r1 .li3 {
		height: 0.77rem;
		background: url(../../images/hf.png)no-repeat 0 50%;
		background-size: 0.18rem 0.15rem;
		padding-left: 0.25rem;
		margin-left: 0.3rem;
	}
	
	.tip-bottom21 {
		overflow: hidden;
		padding: 0 0.2rem;
	}
	
	.tip-bottom21 .tip-bottom-l {
		width: 6rem;
	}
	
	.tip-bottom21 .tip-bottom-l .li4 {
		float: right;
	}
	
	.tip-bottom21 .tip-bottom-r {
		margin-top: 0.28rem;
	}
	
	.tip-bottom21 .tip-bottom-r-img {
		height: 1.42rem;
	}
	
	.tip-bottom21 .tip-bottom-r-img #swiper-container2 {
		
		border: 0;
	}
	
	.tip-bottom21 .tip-bottom-r ul {
		float: right;
		margin-right: 0.4rem;
	}
	
	.p1 {
		display: block;
		width: 0.26rem;
		height: 0.26rem;
		margin-top: 0.1rem;
		float: left;
		font-size: 0.22rem;
		text-align: center;
		line-height: 0.26rem;
		color: #fff;
	}
	
	.p2 {
		background: url(../../images/j.png)no-repeat;
		background-size: cover;
	}
	
	.p3 {
		background: url(../../images/z.png)no-repeat;
		background-size: cover;
	}
	
	.p4 {
		background: url(../../images/t.png)no-repeat;
		background-size: cover;
	}
	
	.tip-bottom2 {
		width: 6rem;
		margin: 0 auto;
		overflow: hidden;
	}
	
	.tip-bottom2 .tip-bottom-l {
		width: 6rem;
	}
	
	.tip-bottom2 .tip-bottom-l .li4 {
		float: right;
	}
	
	.tip-bottom2 .tip-bottom-r {
		margin-top: 0.28rem;
	}
	
	.tip-bottom-r-all {
		width: 10rem;
		overflow: hidden;
	}
	
	.tip-bottom2 .tip-bottom-r-img {
		width: 6rem;
		height: 1.42rem;
		overflow: hidden;
	}
	
	.tip-bottom2 .tip-bottom-r ul {
		float: right;
		margin-right: 0.4rem;
	}
	/*swiper*/
	
	#headed {
		width: 100%;
		overflow: hidden;
		float: left;
	}
	
	#swiper-slide {
		width: 2.1rem!important;
	}
	
	#swiper-container2 {
		
    	z-index: 5;
		border-bottom: 1px solid #ccc;
		overflow: visible;
	}
	
	#swiper-container2 .swiper-slide {
		line-height: 3 !important;
		color: #666 !important;
		font-size: 14px !important;
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
	/*头部*/
	
	.header label {
		width: 0.4rem;
		height: 0.4rem;
		display: block;
		z-index: 1;
	}
	
	.header input[type="checkbox"] {
		display: none;
		position: absolute;
	}
	
	.header input[type="checkbox"]+b {
		position: absolute;
		display: inline-block;
		width: 0.4rem;
		height: 0.4rem;
		
		vertical-align: middle;
	}
	
	.header input[type="checkbox"]:checked+b {
		background: url(../../images/xinred.png)no-repeat;
		background-size: cover;
		border: none;
	}
	
	.mt70 {
		margin-left: 0.7rem;
	}
	
	.listcircle {
		height: 100%;
	}
	
	.listbanner {
		z-index: 10;
		position: fixed;
		top: 0;
		width: calc(100% - 0.4rem);
		padding: 0 0.2rem;
		height: 4.07rem;
		margin: 0 auto;
		background-size: cover;
	}
	
	.header {
		height: 0.88rem;
		margin: 0 auto;
		position: relative;
	}
	
	.header .a1 {
		width: 0.18rem;
		height: 0.34rem;
		display: block;
		background: url(../../images/backw.png) no-repeat;
		background-size: cover;
		float: left;
		margin-top: 0.27rem;
	}
	
	.header-top,
	.header-bottom {
		overflow: hidden;
	}
	
	.post {
		width: 1.44rem;
		border: 1px solid #fff;
		border-radius: 0.05rem;
		float: left;
		margin-top: 0.23rem;
		margin-left: 0.27rem;
	}
	
	.post li {
		line-height: 0.38rem;
		font-size: 0.16rem;
		color: #fff;
		text-align: center;
		float: left;
	}
	
	.post .li1 {
		margin-left: 0.21rem;
	}
	
	.post .li2 {
		width: 0.2rem;
		height: 0.1rem;
		margin-left: 0.1rem;
		background: url(../../images/backd.png) no-repeat;
		background-size: cover;
		margin-top: 0.13rem;
	}
	
	.post-child {
		width: 1.44rem;
		height: 1rem;
		border: 1px solid #ebebeb;
		border-radius: 0.05rem;
		margin-top: 0.38rem;
		border-top: 0;
		overflow-Y: scroll;
		background: #008DD3;
		position: absolute;
	}
	
	.post-child li {
		margin-left: 0.21rem;
	}
	
	.ld {
		width: 0.3rem;
		height: 0.88rem;
		float: right;
		background: url(../../images/ld.png) no-repeat 0 50%;
		background-size: 0.28rem auto;
	}
	
	.user {
		width: 0.3rem;
		height: 0.88rem;
		float: right;
		background: url(../../images/xxx.png) no-repeat 0 50%;
		background-size: 0.28rem auto;
		margin-left: 0.31rem;
	}
	
	.header-bottom {
		margin-top: 0.2rem;
		color: #fff;
	}
	
	.tip-bottom-l {
		width: 1.08rem;
		height: 1.08rem;
		float: left;
		border-radius: 50%;
	}
	
	.tip-bottom-l img {
		width: 1.08rem;
		height: 1.08rem;
		float: left;
		border-radius: 50%;
	}
	
	.tip-bottom-r .li1 {
		line-height: 0.43rem;
		font-size: 0.26rem;
		padding-left: 0.2rem;
		margin-top: 0.18rem;
		overflow: hidden;
	}
	
	.tip-bottom-r .li1 span {
		display: block;
		width: 4.22rem;
	}
	
	.tip-bottom-r .li1 .sp1 {
		line-height: 0.43rem;
		font-size: 0.26rem;
		float: left;
	}
	
	.tip-bottom-r .li1 .sp2 {
		width: 0.4rem;
		height: 0.4rem;
		background: url(../../images/xin.png)no-repeat;
		background-size: cover;
		float: right;
		margin-top: 0.1rem;
	}
	
	.tip-bottom-r .li2 {
		line-height: 0.38rem;
		font-size: 0.22rem;
		padding-left: 0.2rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	
	.header-bottom-top {
		overflow: hidden;
	}
	
	.header-bottom-bottom {
		line-height: 0.43rem;
		height: 0.43rem;
		margin-top: 0.11rem;
		border-bottom: 1px solid #b6effe;
		font-size: 0.2rem;
	}
	
	.header-bottom-bottom li {
		float: left;
	}
	
	.header-bottom-bottom .li3 {
		width: 0.8rem;
		height: 0.34rem;
		line-height: 0.34rem;
		
		text-align: center;
		background: #fff;
		color: #008dd3;
		border-radius: 0.05rem;
		float: right;
	}
	
	.header-bottom-down {
		font-size: 0.18rem;
		line-height: 0.3rem;
		margin-top: 0.2rem;
	}
	
	.forget {
		text-align: center;
		width: 20%;
		line-height: 0.88rem;
		font-size: 0.28rem;
		display: block;
		float: left;
		color: #fff;
		position: absolute;
		left: 50%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		-webkit-transform: translateX(-50%);
		-moz-transform: translateX(-50%);
		-ms-transform: translateX(-50%);
		-o-transform: translateX(-50%);
		transform: translateX(-50%);
	}
	/**/
	
	.father {
		height: 0.79rem;
		border-bottom: 1px solid #f5f5f5;
	}
	
	.father ul {
		height: 100%;
		display: flex;
	}
	
	.father li {
		height: 100%;
		float: left;
		flex: 1;
		color: #1a1a1a;
		font-size: 0.2rem;
		line-height: 0.79rem;
		text-align: center;
	}
	
	.father a {
		height: 0.76rem;
		width: 1rem;
		display: block;
		margin: 0 auto;
	}
	
	.father a:hover {
		color: #008dd3;
		border-bottom: 0.03rem solid #008dd3;
	}
	
	.tj {
		width: 1.42rem;
		height: 1.52rem;
		position: fixed;
		bottom: 2.6rem;
		right: -0.14rem;
		background: url(../../images/tzbt.png)no-repeat;
		background-size: cover;
		z-index: 5;
	}
	
	.bigc {
		width: 2.3rem;
		height: 2.3rem;
		position: fixed;
		bottom: 2.2rem;
		right: -0.6rem;
		background: url(../../images/bigc.png)no-repeat;
		background-size: contain;
		z-index: 3;
	}
	
	.hd {
		width: 0.70rem;
		height: 0.70rem;
		position: fixed;
		bottom: 4rem;
		right: 0.16rem;
		background: url(../../images/hd.png)no-repeat;
		background-size: contain;
		z-index: 4;
	}
	
	.ft {
		width: 0.70rem;
		height: 0.70rem;
		position: fixed;
		bottom: 3rem;
		right: 1.2rem;
		background: url(../../images/ft.png)no-repeat;
		background-size: contain;
		z-index: 4;
	}
	
	.js {
		width: 0.70rem;
		height: 0.70rem;
		position: fixed;
		bottom: 2rem;
		right: 0.16rem;
		background: url(../../images/js.png)no-repeat;
		background-size: contain;
		z-index: 4;
	}
	
	#headed {
		width: 100%;
		overflow: hidden;
		float: left;
	}
	
	.shift {
		transition-property: margin-left;
		transition-duration: 1s;
	}
	
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 1s;
	}
	
	.jubao {
		width: 5.36rem;
		position: absolute;
		top: 40%;
		left: 50%;
		margin-top: -1.9rem;
		margin-left: -2.68rem;
		z-index: 12;
	}
	
	.jubaoall {
		width: 5.36rem;
		position: relative;
		background: #fff;
		box-shadow: 0 0 0.05rem #000;
		color: #242424;
		font-size: 0.3rem;
	}
	
	.jubao-t {
		background: #54C2F0;
		height: 1rem;
		border-radius: 0.05rem;
		line-height: 1rem;
		padding: 0 0.2rem;
	}
	
	.jubao-t span {
		color: #fff;
	}
	
	.jubao-t .a2 {
		color: #fff;
		float: right;
	}
	
	.jubao-b p {
		text-align: center;
		padding: 0.3rem;
	}
	
	.mark {
		width: 100%;
		height: 100%;
		z-index: 11;
		position: absolute;
		top: 0;
		background: rgba(0, 0, 0, 0.2);
	}
	
	.yzall .forget1 {
		text-align: center;
		line-height: 1.25rem;
		z-index: 13;
		margin-bottom: 0.05rem;
		border-radius: 0.1rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 0 0 0.1rem #000;
		background: rgba(0, 0, 0, 0.7);
		padding: 0rem 0.2rem;
		color: #fff;
		width: 5rem;
		font-size: 0.3rem;
		padding-bottom: 0.3rem;
	}
	
	.yzall .sp2 {
		border: 1px solid #fff;
		display: block;
		border-radius: 0.1rem;
	}
	
	.yzall .sp2 input {
		display: block;
		width: 100%;
		color: #fff;
		height: 0.5rem;
		padding-left: 0.2rem;
	}
	
	.yzall .sp3 {
		width: 1.4rem;
		background: #008DD3;
		display: block;
		margin: 0 auto;
		text-align: center;
		margin-top: 0.2rem;
		border-radius: 0.1rem;
	}
	
	.yzall .sp3 input {
		display: block;
		width: 100%;
		color: #fff;
		height: 0.5rem;
	}
</style>