<template>
	<!--<div class="footer">-->
    <div class="footer" :class="{footerHide:isHide}">
		<ul>
			<li>
				<router-link :to="{path:'/home'}">
        <!--<a @click="getCurRooute('home')" id="home">-->
					<div>
						<span class="icon">
							<img v-if="homeb" src="../../images/syw_b.png" alt="">
							<img v-else src="../../images/syw.png"/>
						</span>
					</div>
					<!--<div><span class="text">首页</span></div>-->
          <div><span :class="'text' + (homeb ? ' active' : '')">首页</span></div>
        <!--</a>-->
				</router-link>
			</li>
			<li>
				<a @click="groupviewpriv">
        <!--<a @click="getCurRooute('circle')" id="circle">-->
				<!--<router-link :to="{path:'/mycircle'}">-->
					<div>
						<span class="icon">
							<img v-if="quanzib" src="../../images/qzw_b.png"/>
							<img v-else src="../../images/qzw.png"/>
						</span>
					</div>
					<div><span :class="'text' + (quanzib ? ' active' : '')">圈子</span></div>
				<!--</router-link>-->
				</a>
			</li>
			<li>
				<!--<router-link :to="{path:'/find'}">-->
				<a @click="goFind">
        <!--<a @click="getCurRooute('find')" id="find">-->
					<div>
						<span class="icon">
							<img v-if="findb" src="../../images/fxw_b.png"/>
							<img v-else src="../../images/fxw.png"/>
						</span>
					</div>
					<div><span class="text" v-bind:class="{finds:findbs}">发现</span></div>
				</a>
				<!--</router-link>-->
			</li>
			<li>
				<router-link :to="{path:'/personal'}">
        <!--<a @click="getCurRooute('personal')" id="personal">-->
					<div>
						<span class="icon">
							<img v-if="personalb" src="../../images/grzxb.png"/>
							<img v-else src="../../images/grzxw.png"/>
						</span>
					</div>
					<!--<div><span class="text">个人中心</span></div>-->
          <div><span :class="'text' + (personalb ? ' active' : '')">个人中心</span></div>
        <!--</a>-->
				</router-link>
			</li>
		</ul>
		<pop style="text-align: center" class="tip" :title="tip"></pop>
	</div>
</template>

<script>
	import { setCookie, getCookie } from '../../assets/js/cookie.js';
	import { getOpenUrl ,getToken} from '../../assets/js/common.js'
	var curindex = 0;
	export default {
		name: 'my-footer',
		data() {
			return {
        isHide:false,
				tip: '',
				vprivData: {},
				ishasgroup: 0,
				groupview: 0,
        findView:0,
				homeb: false,
				quanzib: false,
				findb: false,
				personalb: false,
				findbs: false
			}
		},
		props: {

    },
		methods: {
			getCurRooute(root) {
				this.ishasgroup = getCookie('ishasgroup');
				this.islogin    = getCookie('islogin');
				this.groupview  = getCookie('groupview');
        this.findView   = getCookie('findview');
				this.homeb = false;
				this.quanzib = false;
				this.findb = false;
				this.personalb = false;
				//console.log(this.$route.path)
				switch(this.$route.path) {
					case '/home':
						this.findbs = false;
						this.homeb = true;
						break;
					case '/circle':
					case '/mycircle':
						this.findbs = false;
						this.quanzib = true;

						break;
					case '/find':
						this.findb = true;
						break;
					case '/personal':
						this.findbs = false;
						this.personalb = true;
						break;
				}
        if(this.$route.path == '/home' || this.$route.path == '/mycircle' || this.$route.path == '/circle' || this.$route.path == '/find' || this.$route.path == '/personal'){
          this.isHide = true;
        }else{
          this.isHide = false;
        }
//        switch(root) {
//          case 'home':
//            this.findbs = false;
//            this.homeb = true;
//            document.getElementById('home').href='#/home';
//            this.isHide = true;
//            break;
//          case 'circle':
//            this.findbs = false;
//            this.quanzib = true;
//            this.isHide = true;
//            if(this.groupview>0){
//              this.quanzib = true;
//              if (this.ishasgroup>0){
//                document.getElementById('circle').href='#/mycircle';
//              }else{
//                document.getElementById('circle').href='#/circle';
//              }
//            }else{
//              this.tip = '无权访问';
//              $('.tip').show();
//              setTimeout(() => {
//                $('.tip').hide();
//                if(this.islogin == 0) {
//                  this.$router.push('/login');
//                  this.isHide = false;
//                }
//              }, 1000)
//            }
//            break;
//          case 'find':
//            this.findb = true;
//            this.isHide = true;
//            if(this.findView  == 1) {
//              this.findbs = true;
//              document.getElementById('find').href='#/find';
//            } else {
//              this.tip = '无权访问';
//              $('.tip').show();
//              setTimeout(() => {
//                $('.tip').hide();
//                if(this.islogin == 0) {
//                  this.$router.push('/login');
//                  this.isHide = false;
//                }
//              }, 1000)
//            }
//            break;
//          case 'personal':
//            this.isHide = true;
//            this.findbs = false;
//            this.personalb = true;
//            document.getElementById('personal').href='#/personal';
//            break;
//        }
			},
			goFind() {
        this.islogin    = getCookie('islogin');
        this.findView   = getCookie('findview');

        if(this.findView  == 1) {
          this.findbs = true;
          this.$router.push({
            path: '/find'
          });
          cordova.plugins.Keyboard.shrinkView(false);
          cordova.plugins.Keyboard.disableScrollingInShrinkView(false);
        } else {
          this.tip = '无权访问';
          $('.tip').show();
          setTimeout(() => {
            $('.tip').hide();
            if(this.islogin == 0) {
              this.$router.push('/login');
            }
          }, 1000)
        }
			},
			groupviewpriv() {
				this.ishasgroup = getCookie('ishasgroup');
				this.islogin    = getCookie('islogin');
				this.groupview  = getCookie('groupview');
        this.findView   = getCookie('findview');
				if(this.groupview>0){
					this.quanzib = true;
					if (this.ishasgroup>0){
						this.$router.push({
							path: '/mycircle',
						});
					}else{
						this.$router.push({
							path: '/circle',
						});
					}
				}else{
					this.tip = '无权访问';
					$('.tip').show();
					setTimeout(() => {
						$('.tip').hide();
						if(this.islogin == 0) {
							this.$router.push('/login');
						}
					}, 1000)
				}
			}
		},
		mounted() {
			if(this.$route.path == '/find') {
				this.findbs = true;
			} else {
				this.findbs = false;
			}
      this.getCurRooute();
		},
		created() {
			this.ishasgroup = getCookie('ishasgroup');
			this.islogin    = getCookie('islogin');
			this.groupview  = getCookie('groupview');
      this.findView   = getCookie('findview');
		},
		activated() {
			//路由缓存 前进后退
			$('.load').hide();
			$('.tip').hide();
			this.getCurRooute();
		},
    watch: {
      '$route'(to, from) {
        this.getCurRooute();
      }
    }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.tip {
		display: none;
	}

  .footer.footerHide{
    display: block;
  }
	.footer {
    position: absolute;
		/*position: fixed;*/
		bottom: 0;
		left: 0;
		width: 100%;
		border-top: 0.01rem solid #ebebeb;
		background: #fff;
		z-index: 10;
    display: none;
	}

	.footer ul {
		height: 0.98rem;
	}

	.footer ul li {
		float: left;
		height: 0.98rem;
		width: 25%;
	}

	.footer a {
		display: block;
		width: 100%;
    height:calc(100% - 0.15rem);
		font-size: 0.2rem;
		text-align: center;
		margin-top: 0.15rem;
		color: #c7c7c7;
		-webkit-tap-highlight-color: transparent;
    cursor: pointer;
	}

	.footer .active {
		color: #54c2f0;
	}

	.router-link-active {
		color: #54c2f0 !important;
	}

	.text.finds {
		color: #54c2f0 !important;
	}

	.icon img {
		height: 0.4rem;
		width: auto;
	}
</style>
