<template>
	<div class="listcircle backtop" style="overflow-y:scroll;font-size: 0.2rem;width: 100%;">

		<my-header title="圈子成员"></my-header>
		<div class="page-loadmore" style="padding-top: 1rem;">
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">

		<div class="nav1">
			<ul class="nav1-tip">
				<li class="nav1-li1">圈主，管理员{{adminData.length}}人</li>
			</ul>
		</div>
		<div v-for="(data,index) in adminData">
			<div class="line" style="height: 1px;"></div>
			<div class="figure">
				<div class="figure-t">
					<router-link :to="'/yesfriend?uid='+data.uid">
						<ul class="top-b">
							<li class="li1">
								<img :src="data.face!=0?data.face:''"/>
							</li>
							<li class="li2">{{data.uname}}</li>
						</ul>
					</router-link>
				</div>
			</div>
		</div>
		<div v-for="(list,index) in memberData" :key="index">
			<div class="line" style="font-size: 0.2rem;height: 0.3rem;line-height: 0.3rem;">
				<!--<span style="padding-left: 0.2rem;" ref="span">{{list.ktzm}}</span>-->
        <span style="padding-left: 0.2rem;" ref="span">{{list[0].ktzm}}</span>
			</div>
			<div class="figure" v-for="(list,index) in list" :key="index">
				<div class="figure-t">
					<router-link :to="'/yesfriend?uid='+list.uid">
						<ul class="top-b">
							<li class="li1">
								<img :src="list.face!=0?list.face:''"/>
							</li>
							<li class="li2">{{list.uname}}</li>
						</ul>
					</router-link>
				</div>
			</div>
		</div>

		<div class="loading-layer">
			<span class="spinner-holder"><img src="../../images/loading.gif" /></span>
			<div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
		</div>
		</mt-loadmore>
		</div>
		<div class="load" style="display:none;">
			<div class="load-container load4"><div class="loader"> <i></i></div></div>
		</div>
		<backtop></backtop>
	</div>
</template>

<script>
import qs from 'qs'
import { getOpenUrl ,getToken} from "../../assets/js/common.js"
import {setCookie,getCookie} from '../../assets/js/cookie.js'

var end     = false,
	loading = false,
	size    = 5,
	toplistdetail=''
//	var username = /^[a-zA-Z]$/;
export default {
	name:'listcircle',
		data () {
			return {
				adminData:{},
				memberData: [],
				allLoaded: false,
				topStatus: ''
			};
		},
		mounted(){
			end = loading = false;
			this.page = 1;
			this.gid = this.$route.query.gid;
			this.getData(this.gid, this.page);
		},
		methods: {
			getData(gid, page){
//				if (gid == this.$route.query.gid){
//					return ;
//				}
				if (page <= 1){
					$('.load').show();
				}
				var $self = this;
				this.$http.get(getOpenUrl() + "groupMember", {
					headers:{
						'Authorization':'Bearer '+getToken()
					},
					params: {
						gid: gid,
						type:4,
						page:page,
						limit: size
					}
				}).then((res) => {
					this.$refs.loadmore.onBottomLoaded();
					$('.loading-layer div').removeClass('active');
					$('.loading-layer span').removeClass('active');
					var data = res.body.data;
					this.adminData = data.user_admin;
					if (data.mcount > 0){
						$.each(data.user_plain, function(k, v){
							$self.memberData.push(v);
						});
						$('.backtop').scroll(()=> {
							this.scroll=$('.backtop').scrollTop();
						})
					}else{
						$('.loading-layer div').addClass('active');
						end = true;
					}
					$('.load').hide();
					loading = false;
				});
			},
			//加载更多
			loadTop() { // 刷新数据的操作
				var $self = this;
				$self.page = 1;
//				if ($self.page <= 1){
//					$('.load').show();
//				}
				var $self = this;
				this.$http.get(getOpenUrl() + "groupMember", {
					headers:{
						'Authorization':'Bearer '+getToken()
					},
					params: {
						gid: $self.gid,
						type:4,
						page:1,
						limit: 10
					}
				}).then((res) => {
					this.$refs.loadmore.onTopLoaded();
					$self.memberData.splice(0, $self.memberData.length);
					var data = res.body.data;
					this.adminData = data.user_admin;
					if (data.mcount > 0){
						$.each(data.user_plain, function(k, v){
							$self.memberData.push(v);
						});
					}else{
						end = true;
					}
					$('.load').hide();
					loading = false;
				});
			},
			loadBottom() { // 加载更多数据的操作
				this.page += 1;
				this.getData(this.gid, this.page);
			},
			handleTopChange(status) {
				this.topStatus = status;
			},
			handleBottomChange(status) {
				this.bottomStatus = status;
			},
		},
		updated(){
			$('#swiper-container3 .swiper-wrapper').css('min-height', $(window).height() - $('.header').outerHeight());
		},
		activated(){
			//路由缓存 前进后退
			$('.load').hide();
//			end = loading = false;
			this.gid  = this.$route.query.gid
			$(".backtop").animate({"scrollTop":this.scroll},0)
			console.log(toplistdetail)
		},
		beforeRouteLeave(to,from,next){
			toplistdetail=this.scroll
			this.$store.commit('HOMESTOPF',toplistdetail)
			next();
			console.log(toplistdetail)
		}
	}
</script>
<style scoped>

    .listcircle{height:100%;position:relative;}

    .nav1{overflow:hidden;}
    .nav1 .nav1-tip{width:6rem;margin:0 auto;height:0.76rem;overflow:hidden;position:relative;}
    .nav1-li1{font-size:0.22rem;line-height:0.27rem;border-left:3px solid #008dd3;float:left;color:#1a1a1a;padding-left:0.12rem;position:absolute;top:50%;transform:translateY(-50%);}
    .nav1-li2{width:0.24rem;height:0.76rem;background:url(../../images/backright.png) no-repeat right 50%;background-size:0.12rem 0.23rem;float:right;}

    .top-b{overflow:hidden;padding: 0 0.2rem;border-bottom: 1px solid #e0e0e0;}
    .top-b li{float:left;height:1.1rem;line-height:1.1rem;font-size:0.22rem;color:#999999;}
    .top-b .li1{width:0.66rem;height:0.66rem;margin-top:0.2rem;border: 1px solid #55c2f0;
      /*position:relative;overflow:hidden;*/
      border-radius:50%;}
    .top-b .li1 img{width:100%;
      height: 100%;border-radius: 50%;
      object-fit: cover;
      /*position:absolute;top:50%;transform:translateY(-50%);*/
      display:block;}
    .top-b .li2{margin-left:0.16rem;margin-right:0.09rem;}
</style>
