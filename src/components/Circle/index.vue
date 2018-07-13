<template>
	<div class="circle" ref="a1" style="overflow: auto;">
		<!--<my-header title="圈子"></my-header>-->
    <div class="page-loadmore backtop" style="font-size:0.2rem;">
      <mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">
		<div class="banner">
    <div class="slide" style="position: relative;">
      <img src="../../images/groupbanner.jpg" />
      <ul class="groupbanner" style="text-align: center;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);width: 100%;">
        <li style="color: #272727;font-size: 0.4rem;"><span>{{groupNum}}</span><span>个圈子等你来玩</span></li>
        <li style="color: #242424;font-size: 0.3rem;">立即选择加入</li>
      </ul>
    </div>
  </div>
		<div class="nav">
			<div>
				<div class="nav-list">
					<div class="nav-top">
						<!-- '/fujin?pid='+fujin.id-->
						<router-link class="a1" to="/fujin">
							<img src="../../images/address.png" />
							<p>附近的圈子</p>
						</router-link>
					</div>
					<div class="nav-bottom"  v-for="(fujin,index) in fujinData" :key="index" >
						<div class="tip-bottom">
							<router-link :to="'/listcircle?gid='+fujin.id">
							<div class="tip-bottom-l">
								<img alt="no" v-lazy="fujin.logo" />
							</div>
							</router-link>
							<div class="tip-bottom-r">
								<div class="nav-left" :style="fujin.jtime!=0?'width:'+'100%':'3.21rem'">
									<router-link :to="'/listcircle?gid='+fujin.id">
									<ul>
										<li class="li1">{{fujin.name}}</li>
										<li class="li2" v-html="fujin.intro"></li>
										<li class="li3">
											<span class="li3-p1">{{fujin.membercount}}</span>
											<span class="li3-p2">{{fujin.threadcount}}</span>
										</li>
									</ul>
									</router-link>
								</div>
								<div class="nav-right" ref="cb" v-show='fujin.is_level==null&&fujin.need_invite!=2' :id="'join_'+fujin.id" v-if="fujin.need_invite!=2">
									<li class="li4">
										<label>
											<input type="checkbox" ref="check" :value="fujin.id" ><b></b>
										</label>
									</li>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="line"></div>
			</div>

			<div v-for="(groupcate,index) in groupcateData" :key="index" v-if="groupcate.groupList.length > 0">
				<div class="nav-list">
					<div class="nav-top">
						<router-link class="a1" :to="'/livecircle?pid='+groupcate.id+'&title='+groupcate.title">
							<img :src="groupcate.icon" />
							<p>{{groupcate.title}}</p>
						</router-link>
					</div>
					<div class="nav-bottom" v-for="(cate,index) in groupcate.groupList" :key="index">
						<div class="tip-bottom">
							<router-link :to="'/listcircle?gid='+cate.id">
							<div class="tip-bottom-l">
								<img alt="no" v-lazy="cate.logo" />
							</div>
							</router-link>
							<div class="tip-bottom-r">
								<div class="nav-left" :style="cate.jtime!=0&&cate.need_invite==2?'width:'+'100%':'3.21rem'">
									<router-link :to="'/listcircle?gid='+cate.id">
									<ul>
										<li class="li1">{{cate.name}}</li>
										<li class="li2" v-html="cate.intro"></li>
										<li class="li3">
											<span class="li3-p1">{{cate.membercount}}</span>
											<span class="li3-p2">{{cate.threadcount}}</span>
										</li>
									</ul>
									</router-link>
								</div>
								<div class="nav-right" ref="cb"  v-show='cate.is_level==null&&cate.need_invite!=2' :id="'join_'+cate.id">
									<li class="li4">
										<label>
											<input type="checkbox" ref="check" :value="cate.id" ><b></b>
										</label>
									</li>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="line"></div>
			</div>
		</div>
      </mt-loadmore>
    </div>
		<div class="down">
			<div class="down-all">
				<div class="down-all-1" @click="getData()">换一换</div>
				<div class="down-all-2" @click="blue()">选好了，加入圈子</div>
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
		<pop class="tipcircle" :title="tip" v-show="istip"></pop>
		<div class="load" style="display:none;">
			<div class="load-container load4"><div class="loader"> <i></i></div></div>
		</div>
    <load v-show="isload"></load>
		<!--<div style="position: fixed;top: 0;z-index: 11111111;"@click="getPosition()">dian</div>-->
		<!--<my-footer></my-footer>-->
	</div>
</template>
<script>
import { getOpenUrl,getToken } from "../../assets/js/common.js"
import {setCookie,getCookie} from '../../assets/js/cookie.js'
export default {
	name: 'details',
	data() {
		return {
		  isload:false,
			tip:"",
			istip: false,
			show: false,
			groupNum: 0,
			idData: [],
			gids: [],
			id: '',
			groupcateData: {},
			categroup: '',
			icon: {},
			fujinData:{},
			province:'',
			city:'',
			swiperOption: {
				pagination: '.swiper-pagination',
				paginationClickable: true,
				autoplay: 2500,
				spaceBetween: 0
			},
      allLoaded: false,
      scrollMode:"auto",
      topStatus: '',
		};
	},
	created(){
		setTimeout(()=>{
			this.getPosition();
		},10)

	},
	mounted() {

		//$('.load').show();
		$('.tipcircle').hide();
		this.getGroupNum();
		this.getData();
		this.fujin();

	},

	methods: {
    loadTop() { // 刷新数据的操作
      setTimeout(()=> {
        this.getGroupNum();
        this.getData();
        this.fujin();
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
			this.$refs.a1.style.overflow = "auto";
		},
		getPosition(){
		      let geolocation = new AMap.Geolocation({
		        enableHighAccuracy: true,//是否使用高精度定位，默认:true
//		        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
		        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
		        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
		        showButton: true,        //显示定位按钮，默认：true
		        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
		        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
		        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
		        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
		        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
		        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
		      });

		      geolocation.getCityInfo(function(status,result){
		        //if (status == 'complete' && result.info == 'OK') {

//		          let self=this
		          if(result.province=='北京市'){
		          	result.province='北京'
		          }
		          if(result.province=='天津市'){
		          	result.province='天津'
		          }
		          if(result.province=='上海市'){
		          	result.province='上海'
		          }
		          if(result.province=='重庆市'){
		          	result.province='重庆'
		          }
		          let expireDays = 1000*60*60;
				  setCookie("province",result.province, expireDays);
				  setCookie("city",result.city, expireDays);

		        //}
		      })
		    },
		fujin(){
			this.$http.post(getOpenUrl() + "nearbyGroup", {
				province:getCookie('province'),
				city:getCookie('city')
//        province:android.getProvince(),
//        city:android.getCity()
			},{
				headers:{
					'Authorization':'Bearer '+getToken()
				}
			}).then((res) => {
				this.fujinData=res.body.data
			})
		},
		blue() {
			this.idData = [];
			for(var i = 0; i < this.$refs.check.length; i++) {
				var ch = this.$refs.check[i].checked;
				if(ch) {
					this.idData.push(this.$refs.check[i].value);
				}
			}
			console.log(this.idData)
			if(this.idData.length <= 0) {
				this.tip = '请选择圈子';
				$('.tipcircle').show();
				setTimeout(function(){
					$('.tipcircle').hide();
				},1000)
			} else {
				this.$http.post(getOpenUrl() + "joingroup", {
					gids: this.idData
				},{
					headers:{
						'Authorization':'Bearer '+getToken()
					}
				}).then((res) => {
					console.log(res);
					this.joingroup = res.body.data;
					this.id = res.body.gids;
					if (res.body.code == '1001'){
						this.$router.push('/login');
					}else if(res.body.code != 0) {
						this.show = true;
						this.$refs.a1.style.height = "calc(100% - 1.64rem)";
						this.$refs.a1.style.overflow = "hidden";
					} else {
						this.tip = '加入成功';
						$('.tipcircle').show();
						setTimeout(()=>{
							$('.tipcircle').hide();
							this.$router.push('/mycircle')
						},1000)

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
				text: this.$refs.val.value
			}, {
				headers:{
					'Authorization':'Bearer '+getToken()
				}
			}).then((res) => {
				console.log(res);
				this.joingroup = res.body.data;
				console.log(res.body.code)
				if(res.body.code == 0) {
					this.$root.eventHub.$emit('submitSuccess');
					this.$root.eventHub.$emit('tjqzSuccess');
					this.tip = '提交成功';
					$('.tipcircle').show();
					setTimeout(function(){
						$('.tipcircle').hide();
					},1000)
					this.$router.push('/mycircle')
					this.show = false;
					this.$refs.a1.style.height = "100%";
					this.$refs.a1.style.overflow = "auto";
				}else{
					this.tip = res.body.error_description;
					$('.tipcircle').show();
					setTimeout(function(){
						$('.tipcircle').hide();
					},1000)
				}
			})
		},

		getData(){
			//$('.load').show();
			this.$http.get(getOpenUrl() + "groupcate", {
				headers:{
					'Authorization':'Bearer '+getToken()
				},
				params: {
					pid: 0,
					style: 1
				}
			}).then((res) => {
				this.groupcateData = res.body.data;
				$('.load').hide();
			});
		},

		getGroupNum(){
				this.$http.get(getOpenUrl() + "groupNum", {
				headers:{
					'Authorization':'Bearer '+getToken()
				}
			}).then((res) => {
				this.groupNum = res.body.groupNum
			});
		}
	},
	activated(){
		//路由缓存 前进后退
		$('.load').hide();
		this.istip = false;
		this.getGroupNum();
		this.getData();

    android.showTabs();
	}
}
</script>
<style scoped>
  .footer{
    position:fixed !important;
  }
	.tip{display:none;}
	a {
		color: #242424;
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

	.a1 {
		display: inline-block;
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
		font-size:0;
	}

	.nav-top img {
		width: 0.28rem;
		height: 0.28rem;
		display: block;
		float: left;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	.nav-top a {
		position: relative;
	}

	.nav-top p {
		padding-left: 0.4rem;
		line-height: 0.79rem;
		font-size: 0.22rem;
		color: #1c80f3;
		border-bottom: 0.03rem solid #1c80f3;
		margin: 0 auto;
	}
	.nav-list{

	}

	.tip-bottom {
		margin: 0 10px;
		display: flex;
		padding-bottom: 0.3rem;
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
    object-fit: cover;
	}

	.tip-bottom-r {
		width: 3.9rem;
		height: 1.42rem;
		margin-top: 0.3rem;
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
		/*line-height: 0.49rem;*/
		font-size: 0.22rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
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
		color:#949494;
		word-break: break-word;
		margin-top: 0.1rem;
	}

	.tip-bottom-r .li3 {
		line-height: 0.2rem;
		height: 0.2rem;
		font-size: 0.22rem;
		margin-top: 0.15rem;
		color:#949494;
		position: absolute;
		bottom: 0;
	}

	.tip-bottom-r span {
		display: block;
		float: left;
		height: 0.2rem;
	}

	.tip-bottom-r .li3-p1 {
		background: url(../../images/pa.png) no-repeat;
		background-size: auto 0.2rem;
		padding-left: 0.3rem;
		margin-right: 0.27rem;
		float: left;
	}

	.tip-bottom-r .li3-p2 {
		background: url(../../images/tz.png) no-repeat;
		background-size: auto 0.2rem;
		padding-left: 0.32rem;
		float: left;
	}

	.nav {
		padding-bottom: 1.86rem;
	}

	.nav-right {
		height: 1.42rem;
		float: right;
	}

	.nav-right .li4 {
    width: 0.42rem;
    height: 0.42rem;
    border-radius: 50%;
    display: block;
    position: relative;
    z-index: 10;
    top: 40%;
    border: 1px solid #ccc;
    float: right;
	}

	label {
		width: 0.44rem;
		height: 0.44rem;
    position: absolute;
    top:50%;
    left:50%;
		transform: translate(-50%,-50%);
	}

	input[type="checkbox"] {
		display: none;
		position: absolute;
	}

	input[type="checkbox"]+b {
		position: absolute;
		display: inline-block;
		width: 0.46rem;
		height: 0.46rem;
		border-radius: 50%;
		vertical-align: middle;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
	}

	input[type="checkbox"]:checked+b {
		background: url(../../images/checkbox.png)no-repeat;
		background-size: cover;
		border: none;
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
		height: 100%;
		margin: 0 10px;
		position: relative;
	}

	.down-all-1 {
		width: 0.98rem;
		line-height: 0.57rem;
		background: url(../../images/h.png) no-repeat 0 50%;
		background-size: auto 0.25rem;
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
		box-shadow: 0 0 0.1rem #fff;
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
		background: rgba(0, 0, 0, 0.2);
		z-index: 12;
	}

	.sp2 {
		border: 1px solid #242424;
		display: block;
		/*border-radius: 0.1rem;*/
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
