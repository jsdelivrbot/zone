<template>
  <div class="mytz" style="overflow-y: scroll;" name="top">
    <my-header title="我的帖子"></my-header>
    <div class="page-loadmore backtop" style="position:relative;top:1rem;bottom:0;overflow:scroll;font-size: 0.2rem;height: calc(100% - 1rem);">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">
        <div class="first" v-if="items.length>0">
          <!--<a href="#/vote">-->
          <div class="nav" v-for="(data,index) in items" :key="index">
            <router-link :to="{path:'/vote',query:{
                    id:data.id,
                    gid:data.gid
              }}">
              <p class="li2">
                <img :src="data.face" v-lazy="data.face" />
                <!--<img v-if="data.img==''||data.img==null" src="../../../images/indexbanner.png" />-->
              </p>
              <ul>
                <li style="color: #292929;" class="li1">{{data.title}}</li>
                <li class="li4">{{data.uname}}</li>
                <li class="li5"><span class="sp1">{{data.addtime}}</span><span class="sp2">{{data.viewcount}}</span><span class="sp3">{{data.replycount}}</span></li>
              </ul>
            </router-link>
          </div>
          <div class="loading-layer" v-show="loadingshow" style="color: rgb(170, 170, 170);">没有更多数据</div>
          <!--</a>-->
        </div>
        <!--<div class="load" style="display:none;">
                    <div class="load-container load4">
                        <div class="loader"> <i></i></div>
                    </div>
                </div>-->
      </mt-loadmore>

    </div>
    <load v-show="isload"></load>
    <backtop></backtop>
  </div>

</template>
<script>
	import qs from 'qs'
	import { setCookie, getCookie } from '../../../assets/js/cookie.js'
	import { getOpenUrl,getToken} from '../../../assets/js/common.js'
  var top = ''
	var status = '',
		uid = '',
		start = 1,
		end = false;
	export default {
		data() {
			return {
			  isload:false,
				noData: '',
				items: [],
				list: [],
				allLoaded: false,
				scrollMode:"touch",
				topStatus: '',
				data:{},
				st:{},
				loadingshow:false
			};
		},
		created(){
			var self = this;
			this.getData(self.type, 1);
		},
		mounted() {
			this.type = status;
			this.id = uid;
			this.start = start = 1;
			//$('.load').show();
      this.isload = true;

      this.$root.eventHub.$on('submitSuccess',()=>{
        this.items = [];
        this.getData(this.type, 1);
      })

      $('.first').css('min-height', $(window).height() - $('div.header').outerHeight());

		},
		methods: {
			loadTop() { // 刷新数据的操作
        top=this.scroll;
				var self = this;
				setTimeout(()=>{
					self.start=1;
          this.$http.get(getOpenUrl() + "/user/mytopic", {
            headers: {
              "Authorization": "Bearer " + getToken()
            },
            params: {
              //status: type,
              uid: '',
              page: self.start,
              limit: 10
            },
          }).then((res) => {
            //self.st=res.body
            self.data = res.body.data;
            if(res.body.count > 0) {
              self.items.splice(0, self.items.length);
              self.allLoaded = false;
              self.loadingshow=false;
              self.$refs.loadmore.onTopLoaded();
              $.each(self.data, function(key, val) {
                self.items.push(val);
              });
            }else{
              self.allLoaded = true;
              self.loadingshow=true;
            }
          }, function(err) {
            this.$router.push({
              path: '/login',
              //query:{gid: res.body.data.gid}
            });
            console.log('请求失败', err);

          });
				}, 2000);
			},
			loadBottom() { // 加载更多数据的操作
				//this.allLoaded = true;// 若数据已全部获取完毕
        top=this.scroll;
				var self = this;
				self.start+=1;
				setTimeout(function() {
					self.getData(self.type, self.start);
					if(self.st.status==0){
						self.allLoaded = true;
            self.loadingshow=true;
					}
					self.$refs.loadmore.onBottomLoaded();
				}, 2000);

			},
			handleTopChange(status) {
				this.topStatus = status;
			},
			handleBottomChange(status){
				this.bottomStatus = status;
			},
			getData(type, start) {
        top=0
        this.$store.commit('HOMESTOPF',top)
        $(".backtop").animate({"scrollTop":this.scroll},0)

				this.start = start ? start : 1;
				var self = this;
				this.$http.get(getOpenUrl() + "/user/mytopic", {
					headers: {
						"Authorization": "Bearer " + getToken()
					},
					params: {
						//status: type,
						uid: '',
						page: start,
						limit: 10
					},
				}).then((res) => {
          this.isload = false;

          $('.backtop').scroll(()=> {
            this.scroll=$('.backtop').scrollTop();
          })

					self.st=res.body
					self.data = res.body.data;
					if(res.body.count > 0) {
						$.each(self.data, function(key, val) {
							self.items.push(val);
						});
					}else{
            //self.allLoaded = true;
            self.loadingshow=true;
          }
				}, function(err) {
					this.$router.push({
						path: '/login',
						//query:{gid: res.body.data.gid}
					});
					console.log('请求失败', err);

				});
			},
		},
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
<style scoped>
	.header {
		position: fixed;
		top: 0;
	}

	/*.first {
		padding-top: 0.88rem;
	}*/

	.nav {
		margin: 0 auto;
		color: #242424;
		padding: 0 0.2rem;
	}

	.nav ul {
		margin-top: 0.26rem;
		overflow: hidden;
		padding-bottom: 0.25rem;
		border-bottom: 0.01rem solid #ebebeb;
	}

	.nav ul li {
		float: left;
		width: 100%;
	}

	.li1 {
		line-height: 0.41rem;
		font-size: 0.22rem;
		margin-left: 0.24rem;
	}

	.nav .li2 {
		height: 0.62rem;
		width: 0.62rem;
		/*position: relative;*/
    /*overflow: hidden;*/
    border-radius: 50%;
		margin-top: 0.06rem;
		float: left;
	}

	.nav .li2 img {
		width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
		border-radius: 50%;
		/*position: absolute;*/
		/*top: 50%;*/
		/*-webkit-transform: translateY(-50%);*/
		/*-moz-transform: translateY(-50%);*/
		/*-ms-transform: translateY(-50%);*/
		/*-o-transform: translateY(-50%);*/
		/*transform: translateY(-50%);*/
	}

	.nav .li3 {
		height: 1.24rem;
		-bottom: 0.01rem solid #e0e0e0;
		width: 4.87rem;
		float: right;
		position: relative;
	}

	.p {
		height: 0.69rem;
		position: absolute;
		top: 50%;
		-webkit-transform: translateY(-50%);
		-moz-transform: translateY(-50%);
		-ms-transform: translateY(-50%);
		-o-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	.nav .li3 .p1 {
		font-size: 0.26rem;
		line-height: 0.38rem;
	}

	p {
		font-size: 0.20rem;
	}

	.nav .li3 .p2 {
		float: left;
		line-height: 0.31rem;
	}

	.nav .li3 .p3 {
		margin-left: 0.3rem;
	}

	.nav .li4 {
		line-height: 0.38rem;
		color: #54c2f0;
		font-size: 0.2rem;
		margin-left: 0.24rem;
	}

	.li5 span {
		float: left;
		margin-left: 0.24rem;
	}

	.li5 {
		line-height: 0.25rem;
		color: #949494;
		font-size: 0.2rem;
	}

	.sp1 {
		background: url(../../../images/fbsj.png) no-repeat 0 50%;
		background-size: 0.25rem auto;
		padding-left: 0.3rem;
	}

	.sp2 {
		background: url(../../../images/sl.png) no-repeat 0 50%;
		background-size: 0.25rem auto;
		padding-left: 0.26rem;
	}

	.sp3 {
		background: url(../../../images/hf.png) no-repeat 0 50%;
		background-size: 0.25rem auto;
		padding-left: 0.28rem;
	}
</style>
