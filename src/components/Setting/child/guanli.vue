<template>
	<div id="headed" ref="a1" style="overflow-y: scroll;">
		<my-header title="成员管理"></my-header>

		<swiper :options="swiperOptionTab" id="swiper-container2" ref="mySwiperTab">
			<swiper-slide class="active-nav body_bottom" type="1"><span>所有成员</span></swiper-slide>
			<swiper-slide class="body_bottom" type="2"><span>申请加入的人</span></swiper-slide>
		</swiper>
		<div class="page-loadmore" style="font-size: 0.2rem;height: 100%;padding-top: 1.7rem;">
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">

		<swiper :options="swiperOptionCon" id="swiper-container3" ref="mySwiperCon">
			<!--所有成员-->
			<swiper-slide>
				<div class="first" type="1">
					<div class="figure" v-show="ifshow">
						<span class="f-t"><span style="padding-left: 0.2rem;">管理员</span></span>
						<div class="figure-t" v-for="(list,index) in adminData" :key="index" v-if="list.length!=0">
							<ul class="top-b">
								<router-link :to="'/yesfriend?uid='+list.uid">
									<li class="li1">
										<img v-lazy="list.face"/>
									</li>
									<!--<li class="li2"></li>-->
									<li class="li6" style="margin-left: 0.1rem;">{{list.uname}}</li>
									<li class="li3" v-text="list.level==1?'创建者':(list.level==2?'管理员':'')" :style="{background:list.level==1?yellow:(list.level==2?blue:'')}">创建者</li>

									<!--<li class="li5"><span v-if="list.note.length>0">(</span>{{list.note}}<span v-if="list.note.length>0">)</span></li>-->
								</router-link>
								<li class="b" @click="toggle1(list.id,2)"></li>
								<li class="a1" @click="toggle1(list.id,3)"></li>
							</ul>
						</div>
					</div>
          <div v-for="(list,index) in userData" :key="index">
            <span class="f-t"><span style="padding-left: 0.2rem;">{{list[0].ktzm}}</span></span>
            <div class="figure" v-for="(list,index) in list" :key="index">
              <div class="figure-t">
                <ul class="top-b">
                  <router-link :to="'/yesfriend?uid='+list.uid">
                    <li class="li1">
                      <img v-lazy="list.face"/>
                    </li>
                    <!--<li class="li2"></li>-->
                    <li class="li6" style="margin-left: 0.1rem;">{{list.uname}}</li>
                    <li class="li3" :style="{background:green}">普通用户</li>

                    <li class="li5"><span v-if="list.note.length>0">(</span>{{list.note}}<span v-if="list.note.length>0">)</span></li>
                    <li class="li4"></li>
                  </router-link>
                  <li class="b" @click="toggle1(list.id,2)"></li>
                  <li class="a" @click="toggle1(list.id,1)"></li>
                </ul>
              </div>
            </div>
          </div>

					<div class="loading-layer">
						<span class="spinner-holder"><img src="../../../images/loading.gif" /></span>
						<div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
					</div>
				</div>
				<div v-if="noshow" style="font-size: 0.26rem;text-align: center;line-height: 1rem;">暂无成员</div>
			</swiper-slide>
			<!--申请加入的人-->
			<swiper-slide>
				<div class="first" type="2">
					<div class="setting2">
						<div class="setting2-all" v-for="(list,index) in shenhData" :key="index" v-if="list.length!=0">
							<router-link :to="'/apply?id='+list.id">
								<div class="sl">
									<img  v-lazy="list.face"/>
								</div>
								<div class="sr">
									<ul class="sr-ul">
										<li class="sr-ul-li1">
											<div class="sr-ul-li1-t">
												<p class="t-p1">{{list.name}}</p>
												<p class="t-p2">加入{{name}}</p>
											</div>
											<!--<div class="sr-ul-li1-b">
												<p class="b-p1">同意</p>
												<p class="b-p2">拒绝</p>
											</div>-->
										</li>
										<li class="sr-ul-li2">{{list.reason}}</li>
									</ul>
								</div>
							</router-link>
						</div>
					</div>
					<div class="loading-layer">
						<span class="spinner-holder"><img src="../../../images/loading.gif" /></span>
						<div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
					</div>
				</div>
				<div v-if="show" style="font-size: 0.26rem;text-align: center;line-height: 1rem;">暂无加圈的人</div>
			</swiper-slide>
		</swiper>

		</mt-loadmore>
		</div>
		<div class="mark" v-show="mark" @click="none()"></div>
		<div class="yzall" v-show="isshow">
			<p class="forget1">
				<span class="sp1" v-text="type==1?'确认升级为管理员吗?':(type==2?'确认踢出圈子吗?':(type==3?'确认降级吗?':''))"></span>
				<span class="sp2">
					<!--<input type="text" name="" id="" value="" ref="val"/>-->
				</span>
				<span class="sp3">
					<input type="button" name="" id="btn1" value="取消" @click="toggle1();a1()"/>
				</span>
				<span class="sp3" id="btn2">
					<input type="button" name=""  value="确认" @click="change()"/>
				</span>
			</p>
		</div>
		<div class="load" style="display:none;">
			<div class="load-container load4"><div class="loader"> <i></i></div></div>
		</div>
		<pop class="tips" :title="tips"></pop>
	</div>
</template>

<script>
var admin='';
import { getOpenUrl ,getToken} from "../../../assets/js/common.js"
import { setCookie, getCookie } from '../../../assets/js/cookie.js'
import { swiper, swiperSlide } from 'vue-awesome-swiper';
var end     = false,
	loading = false,
	size    = 5;
export default{
	data () {
		return {
			listData:{},
			adminData: [],
			userData: [],
			shenhData: [],
			changeData:{},
			yellow:"#eea314",
			blue:"#008dd3",
			green:"#00d314",
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
			isshow:false,
			mark:false,
			ifshow:false,
			show:false,
			noshow:false,
			id:'',
			type:'',
			jiaData:{},
			name:'',
			allLoaded:false,
			scrollMode: "auto",
			topStatus: '',
			tips:''
		};
	},
	mounted(){
		$(".tips").hide()

    setTimeout(()=>{
      this.$root.eventHub.$emit('newsSuccess');
    },500)

		this.gid  = this.$route.query.gid;
		this.type = 1;
		this.pge  = 1;
		this.name = this.$route.query.name;
		end = loading = false;
		var self = this;

		//获取数据
		this.getData(this.gid, this.type, this.page);


		//申请加入
		/*this.$http.get(getOpenUrl() + "groupMember", {
			headers: {
				'Authorization': 'Bearer ' + getToken()
			},
			params: {
				gid: this.$route.query.gid,
				type: 2,
				page: 1
			}
		}).then((res) => {
			this.jiaData = res.body.data;
			if(this.jiaData.length==0){
				this.show=true
			}
		});*/
		//swiper
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
		swiperCon.on('slideChangeEnd', function(obj){
			self.type = parseInt($('#swiper-container2 .active-nav').attr('type'));
			self.page  = 1;
			end        = false;
			//setTimeout(() => {
				self.getData(self.gid, self.type, self.page);
			//}, 500);
			return ;
		});

//		this.tabScroll();
	},
	methods: {
		loadTop() { // 刷新数据的操作

			var $self   = this;
			$self.page = 1
			switch(this.type){
				case 1:
					//全部成员
//					if ($self.page <= $self.cyPage && this.userData.length > 0){
//						$self.page = $self.cyPage;
//						end = $self.cyEnd;
//						$('div[type="'+type+'"]').parent().parent().css('height', $self.cyHeight);
//						$('div[type="'+type+'"] .loading-layer span').removeClass('active');
//						if (end){
//							$('div[type="'+type+'"] .loading-layer div').addClass('active');
//						}else{
//							$('div[type="'+type+'"] .loading-layer div').removeClass('active');
//						}
//						return ;
//					}
					break;
				case 2:
					//申请加入
//					if ($self.page <= $self.jrPage && this.shenhData.length > 0){
//						$self.page = $self.jrPage;
//						end = $self.jrEnd;
//						$('div[type="'+type+'"]').parent().parent().css('height', $self.jrHeight);
//						$('div[type="'+type+'"] .loading-layer span').removeClass('active');
//						if (end){
//							$('div[type="'+type+'"] .loading-layer div').addClass('active');
//						}else{
//							$('div[type="'+type+'"] .loading-layer div').removeClass('active');
//						}
//						return ;
//					}
					break;
			}
			if ($self.page <= 1){
				$('.load').show();
			}
			this.$http.get(getOpenUrl() + "groupMember", {
				headers: {
					'Authorization': 'Bearer ' + getToken()
				},
				params: {
					gid: this.gid,
					type: this.type,
					page: 1,
					limit: size
				}
			}).then((res) => {

				this.$refs.loadmore.onTopLoaded();
				var data = res.body.data;
				$('.load').hide();
				$('div[type="'+this.type+'"] .loading-layer div').removeClass('active');
				$('div[type="'+this.type+'"] .loading-layer span').removeClass('active');
				switch(this.type){
					case 1:
						$self.cyPage = 1;
						if (typeof data.length != 'undefined' && data.length == 0){
							$('div[type="'+this.type+'"] .loading-layer div').addClass('active');
							end = cyEnd = true;
						}else{
							this.adminData = data.user_admin;
							this.ifshow = this.adminData.length == 0 ? false : true;
							if (data.mcount > 0){
                this.userData.splice(0, this.userData.length);
								$.each(data.user_plain, function(k, v){
									$self.userData.push(v);
								})
							}else{
								$('div[type="'+this.type+'"] .loading-layer div').addClass('active');
								end = cyEnd = true;
							}
						}

						break;
					case 2:

						$self.jrPage = 1;
						if (typeof data.length != 'undefined' && data.length == 0){
							$('div[type="'+this.type+'"] .loading-layer div').addClass('active');
							end = jrEnd = true;
						}else{
							if (data.mcount > 0){
                this.shenhData.splice(0, this.shenhData.length);
								$.each(data.user_plain, function(k, v){
									$self.shenhData.push(v);
								})
							}else{
								$('div[type="'+this.type+'"] .loading-layer div').addClass('active');
								end = jrEnd = true;
							}
						}
						break;
				}
				$('.load').hide();
				loading = false;
			});
		},
		loadBottom() { // 加载更多数据的操作
			//this.allLoaded = true;// 若数据已全部获取完毕
			this.page += 1;
			this.getData(this.gid, this.type, this.page);

		},
		handleTopChange(status) {
			this.topStatus = status;
		},
		handleBottomChange(status) {
			this.bottomStatus = status;
		},
		mem(){
			this.$http.get(getOpenUrl() + "groupMember", {
				headers: {
					'Authorization': 'Bearer ' + getToken()
				},
				params: {
					gid: this.$route.query.gid,
					type: 1,
					page: 1
				}
			}).then((res) => {
				this.listData = res.body.data;
				if(this.listData.length==0){
					this.noshow=true
				}else{
					admin=this.listData.user_admin.length
					if(admin==0){
						this.ifshow=false
					}else{
						this.ifshow=true
					}
				}
			});
		},
		change(){
			this.$http.post(getOpenUrl() + "groupUserChange", {
				id: this.id,
				type: this.type,
			},{
				headers: {
					'Authorization': 'Bearer ' + getToken()
				}
			}).then((res) => {
				if(res.body.code==0){
					this.listData = res.body.data;
					this.mark=false;
					this.isshow=false;
					this.tips = "操作成功"
					$(".tips").show()
					setTimeout(()=>{
						$(".tips").hide()
						this.$router.go(0)
					},1000)
				}else{
					this.tips = res.body.error_description;
					this.mark=false;
					this.isshow=false;
					$(".tips").show()
					setTimeout(()=>{
						$(".tips").hide()
					},1000)
				}

			});

		},
		toggle1(id,type){
			this.id=id
			this.type=type
			this.mark=true;
			this.isshow=true;

		},
		a1(){
			this.mark=false;
			this.isshow=false;
			this.$refs.a1.style.height="";
			this.$refs.a1.style.overflow="";
		},
		getData(gid, type, page){
			var $self   = this;
			$self.page  = page ? page : 1;
			switch(type){
				case 1:
					//全部成员
					if ($self.page <= $self.cyPage && this.userData.length > 0){
						$self.page = $self.cyPage;
						end = $self.cyEnd;
						$('div[type="'+type+'"]').parent().parent().css('height', $self.cyHeight);
						$('div[type="'+type+'"] .loading-layer span').removeClass('active');
						if (end){
							$('div[type="'+type+'"] .loading-layer div').addClass('active');
						}else{
							$('div[type="'+type+'"] .loading-layer div').removeClass('active');
						}
						return ;
					}
					break;
				case 2:
					//申请加入
					if ($self.page <= $self.jrPage && this.shenhData.length > 0){
						$self.page = $self.jrPage;
						end = $self.jrEnd;
						$('div[type="'+type+'"]').parent().parent().css('height', $self.jrHeight);
						$('div[type="'+type+'"] .loading-layer span').removeClass('active');
						if (end){
							$('div[type="'+type+'"] .loading-layer div').addClass('active');
						}else{
							$('div[type="'+type+'"] .loading-layer div').removeClass('active');
						}
						return ;
					}
					break;
			}
			if ($self.page <= 1){
				$('.load').show();
			}
			this.$http.get(getOpenUrl() + "groupMember", {
				headers: {
					'Authorization': 'Bearer ' + getToken()
				},
				params: {
					gid: gid,
					type: type,
					page: $self.page,
					limit: size
				}
			}).then((res) => {
				this.$refs.loadmore.onBottomLoaded();
				var data = res.body.data;
				$('.load').hide();
				$('div[type="'+type+'"] .loading-layer div').removeClass('active');
				$('div[type="'+type+'"] .loading-layer span').removeClass('active');
				switch(type){
					case 1:
						$self.cyPage = $self.page;
						if (typeof data.length != 'undefined' && data.length == 0){
							$('div[type="'+type+'"] .loading-layer div').addClass('active');
							end = cyEnd = true;
						}else{
							this.adminData = data.user_admin;
							this.ifshow = this.adminData.length == 0 ? false : true;
							if (data.mcount > 0){
								$.each(data.user_plain, function(k, v){
									$self.userData.push(v);
								})
							}else{
								$('div[type="'+type+'"] .loading-layer div').addClass('active');
								end = cyEnd = true;
							}
						}

						break;
					case 2:
						$self.jrPage = $self.page;
						if (typeof data.length != 'undefined' && data.length == 0){
							$('div[type="'+type+'"] .loading-layer div').addClass('active');
							end = jrEnd = true;
						}else{
							if (data.mcount > 0){
								$.each(data.user_plain, function(k, v){
									$self.shenhData.push(v);
								})
							}else{
								$('div[type="'+type+'"] .loading-layer div').addClass('active');
								end = jrEnd = true;
							}
						}
						break;
				}
				$('.load').hide();
				loading = false;
			});
		}
	},
	components: {
		//组件
		swiper,
		swiperSlide
	},
	computed: {
		swiperCon() {
			return this.$refs.mySwiperCon.swiper
		},
		swiperTab() {
			return this.$refs.mySwiperTab.swiper
		},
	},
//	beforeDestroy(){
//		window.removeEventListener("scroll", this.toScroll);
//	},
	updated(){
		$('#swiper-container3 .swiper-wrapper').css('min-height', $(window).height() - $('.header').outerHeight() - $('#swiper-container2').outerHeight());
	},
	activated(){
		//路由缓存 前进后退
		$('.load').hide();
		end = loading = false;
		this.gid  = this.$route.query.gid

		switch(this.type){
			case 1:
				end       = this.cyEnd;
				this.page = this.cyPage;
				this.cyHeight = $('div[type="'+this.type+'"]').parent().parent().height();
				break;
			case 2:
				end       = this.jrEnd;
				this.page = this.jrPage;
				this.jrHeight = $('div[type="'+this.type+'"]').parent().parent().height();
				break;
		}
	}
}
</script>

<style scoped="scoped">
	/*所有成员*/
	.figure-t{border-bottom: 1px solid #e0e0e0;}
	.f-t{height: 0.5rem;background: #f6f7fb;font-size: 0.22rem;line-height: 0.5rem;height: 0.5rem;width: 100%;background: #f6f7fb;font-size: 0.22rem;line-height: 0.5rem;display: block;}
	.top-b{overflow:hidden;width:6rem;margin:0 auto;}
	.top-b .li6{float:left;height:1.19rem;line-height:1.19rem;font-size:0.22rem;color:#999999;}
	.top-b .li1{width:0.68rem;height:0.68rem;
    /*overflow: hidden;position: relative;*/
    border-radius: 50%;
    margin-top:0.3rem;float:left;font-size:0.26rem;color:#999999;}
	.top-b .li1 img{width:100%;
    height: 100%;border-radius: 50%;object-fit: cover;
    /*position:absolute;top:50%;transform:translateY(-50%);*/
    display:block;}
	.top-b .li2{margin-left:0.16rem;margin-right:0.09rem;float:left;font-size:0.26rem;color:#999999;height:1.19rem;line-height:1.19rem;}
	.top-b .li3{padding: 0 0.06rem;line-height: 0.3rem;color: #fff;background: #eea314;font-size: 0.18rem;float:left;border-radius: 0.05rem;margin-top: 0.47rem;margin-right: 0.05rem;margin-left: 0.1rem;}
	.figure1 .top-b .li3{width:1rem;background:url(../../../images/ptcy.png)no-repeat 0 50%;background-size:1rem 0.30rem;}
	.top-b .li4{float:right;font-size:0.26rem;color:#999999;}
	.top-b .li5{font-size:0.2rem;color:#adadad;margin-right:0.2rem;float:left;height:1.19rem;line-height:1.19rem;}
	.a{width: 0.44rem;height:  1.19rem;background: url(../../../images/tianjia.png) no-repeat 0 50%;background-size: 0.44rem 0.44rem;float: right;margin-right: 0.2rem;}
	.a1{width: 0.44rem;height:  1.19rem;background: url(../../../images/jianshao.png) no-repeat 0 50%;background-size: 0.44rem 0.44rem;float: right;margin-right: 0.2rem;}
	.b{width: 0.44rem;height:  1.19rem;background: url(../../../images/tichu.png) no-repeat 0 50%;background-size: 0.44rem 0.44rem;float: right;}
	.figure1 .li4{width: 1.07rem;height:  1.19rem;float: right;}
	.figure1 .li4-l{width: 0.35rem;height:  1.19rem;float: left;background:url(../../../images/tianjia.png)no-repeat 0 50%;background-size:0.35rem 0.35rem;}
	.figure1 .li4-r{width: 0.35rem;height:  1.19rem;float: left;margin-left: 0.25rem;background:url(../../../images/tichu.png)no-repeat 0 50%;background-size:0.35rem 0.35rem;}

	/*申请加入的人*/
	.setting2{width:100%;overflow:hidden;box-shadow:0 0 5px #ebebeb;}
	.setting2-all{width:6rem;overflow:hidden;margin:0 auto;margin-top:0.3rem;}
	.setting2 .sl{width:0.68rem;height:0.68rem;
    /*overflow:hidden;position: relative;*/
    border-radius: 50%;
    float:left;}
	.setting2 .sl img{width:100%;
    height: 100%;
    border-radius: 50%;
    object-fit:cover;
    /*position: absolute;*/
    /*top:50%;*/
    /*transform: translateY(-50%);*/
    float:left;display:block;}
	.setting2 .fenlei{width:0.99rem;height:1.14rem;float:left;background:url(../../../images/fenlei.png) no-repeat 50% 50%;background-size:0.35rem 0.35rem;}
	.setting2 .sr{width:calc(100% - 0.99rem);padding-bottom:0.2rem;float:right;}
	.setting2 .bt0{border-bottom:0;}
	.setting2 .sr-ul{overflow:hidden;float:left;}
	.sr-ul-li1-t{float:left;}
	.sr-ul-li1-b{float:right;}
	.setting2 .sr-ul-li1 .t-p1{font-size:0.23rem;color:#1a1a1a;line-height:0.37rem;}
	.setting2 .sr-ul-li1 .t-p2{font-size:0.2rem;color:#008dd3;line-height:0.37rem;}
	.setting2 .sr-ul-li1-b p{width:0.98rem;height:0.52rem;font-size:0.2rem;border-radius:0.26rem;float:left;line-height:0.52rem;text-align:center;}
	.setting2 .sr-ul-li1-b .b-p1{background:#54c2f0;border: 1px solid #54c2f0;color:#d4f0fb;}
	.setting2 .sr-ul-li1-b .b-p2{color:#c7c7c7;border: 1px solid #c7c7c7;margin-left:0.14rem;}
	.setting2 .sr-ul-li2{font-size:0.22rem;color:#949494;float:left;width:4.9rem;margin-top:0.2rem;line-height:0.33rem;overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
	/*swiper*/
	#swiper-container2 {
		border-bottom: 1px solid #ccc;
		overflow: visible;
		background: #Fff;
		z-index: 6;
		width: 100%;
		position: fixed;
		top:1rem;
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
		/*line-height:300px;*/
		/*text-align:center;*/
		/*font-size:50px;*/
	}

	#swiper-container2 .swiper-slide.shux:after {
		content: "";
		position: absolute;
		top: 25%;
		right: 0;
		height: 50%;
		width: 1px;
		background: #ccc;
	}
	/*弹窗*/
	.forget1 {
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
		/*background: rgba(0, 0, 0, 0.7);*/
		background:#fff;
		padding: 0rem 0.2rem;
		color: #242424;
		width: 5rem;
		font-size: 0.3rem;
		padding-bottom: 0.3rem;
	}
	.sp2 {
		display: block;
		border-radius: 0.1rem;
	}

	.sp2 input {
		display: block;
		width: 100%;
		color: #fff;
		height: 0.5rem;
		padding-left: 0.2rem;
	}
	.mark {
		width: 100%;
		height: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 12;
	}
	.sp3 {
		width: 45%;
		background: #008DD3;
		display: block;
		margin: 0 auto;
		text-align: center;
		margin-top: 0.2rem;
		border-radius: 0.1rem;
		float: left;
	}
	#btn1{
		float: left;
	}
	#btn2{
		float: right;
	}
	.sp3 input {
		display: block;
		width: 100%;
		color: #fff;
		height: 0.5rem;
	}
</style>
