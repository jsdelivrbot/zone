<template>
	<div class="first" ref="a1">
		<div class="header">
			<div class="headerall">
				<a @click="tui" href="javascript:history.back(-1);" class="a1"></a>
        <!--<a @click="tui" class="a1"></a>-->
				<span class="forget">我的好友</span>
				<!--<a class="a2" href="#/searchfriend"></a>-->
				<div class="dian" @click="toggles()"></div>
			</div>
		</div>
		<div class="navall">
			<div class="navall-t">
				<div class="input">
					<p class="p1"></p>
					<input type="text" class="txt" @keyup.13="searchHy" ref="hy" />
					<input type="button" @click="searchHy" class="btn" value="搜索" />
				</div>
			</div>
			<div v-show="isSearch">
				<div class="fri" v-for="(data,index) in items" :key="index" @click="getFenZu(data.friend_group_id,index)">
					<div class="fri-t" @click="toggle(index)">
            <em style="height: 0.78rem;display: block;float: left;width: 0.78rem;">
              <img src="../../../images/other/backbl.png"/>
            </em>
						<p class="fri-p1">{{data.title}}</p>
						<span>{{data.count}}</span>
					</div>
					<transition name="bounce">
						<div class="friendbox" :id="index">
							<div class="nav" v-for="(member,indexs) in data.member" :key="indexs">
								<router-link :to="{path:'/yesfriend',query:{uid:member.hao_id}}">
									<!--<a href="#/yesfriend">-->
									<p class="li2">
										<img v-if="member.face!=0" :src="member.face" />
										<img v-if="member.face==0" src="../../../images/personLogo.png" />
									</p>
									<!--</a>-->
								</router-link>
								<ul>
									<router-link style="z-index:10;display: block;width:100%;position: relative;" :to="{path:'/yesfriend',query:{uid:member.hao_id}}">
										<li class="li1">{{member.uname}}
											<span class="sp1" v-if="member.note">({{member.note}})</span>
											<span class="sp2">
												<img v-if="member.sex==1" src="../../../images/men.png"/>
												<img v-if="member.sex==0" src="../../../images/girl.png"/>

												<!--<span class="li22" v-for="(data,index) in member.usergroup" :key="index" v-bind:class="{isColor:data.icon!=''}" :style="data.bcolor ? 'background-color:'+data.bcolor : ''">
													<img v-if="data.icon!=''" :src="data.icon" alt="" style="height:.5rem;">
													<em v-if="data.icon==''" style="font-style:normal">{{data.title}}</em>
												</span>-->
											</span>

										</li>
										<li style="height: 0.3rem;margin-left: 0.22rem;">
											<img  :src="data.icon" alt="" style="height:0.3rem;margin-right:0.1rem;float: left;" v-for="(data,index) in member.usergroup" v-if="data.icon!=''">
											<span class="li" style="line-height: 0;height: 0;padding: 0.1rem 0.1rem;border-radius: 0.05rem;font-size:0.14rem;margin-right: 0.05rem;margin-top: 0.04rem;color: #fff;margin-left: 0.05rem;float: left;" v-for="(data,index) in member.usergroup" v-if="data.type=='member'" :style="'background:'+data.bcolor">{{data.title}}</span>
										</li>
									</router-link>
									<!--<a href="#/sixin">-->

									 <!--v-if="member.signature!=''"-->
									<li class="li4 l" v-text="member.signature==''?'暂无':member.signature"></li>
                  <!--<router-link style="display: block;width:100%;" :to="{path:'/sixin',query:{uname:'',uid:member.hao_id}}">-->
                  <li class="navp" @click="isTalking(member.hao_id,member.uname)"></li>
									<!--</router-link>-->
									<!--</a>-->
								</ul>
							</div>
						</div>
					</transition>
				</div>
				<div class="line"></div>

			</div>
			<div v-show="!isSearch">
				<div class="nav" v-for="(member,index) in searchs" :key="index">
					<router-link :to="{path:'/yesfriend',query:{uid:member.hao_id}}">
						<!--<a href="#/yesfriend">-->
						<p class="li2">
							<img v-if="member.face!=0" :src="member.face" />
							<img v-if="member.face==0" src="../../../images/personLogo.png" />
						</p>
						<!--</a>-->
					</router-link>
					<ul>
						<router-link style="z-index:10;display: block;width:100%;" :to="{path:'/yesfriend',query:{uid:member.hao_id}}">
							<li class="li1">{{member.uname}}<span class="sp1" v-if="member.note">({{member.note}})</span><span class="sp2"><img v-if="member.sex==1" src="../../../images/men.png"/><img v-if="member.sex==0" src="../../../images/girl.png"/></span></li>

              <li style="height: 0.3rem;margin-left: 0.22rem;">
                <img  :src="data.icon" alt="" style="height:0.3rem;margin-right:0.1rem;float: left;"v-for="(data,index) in member.usergroup" v-if="data.icon!=''">
                <span class="li" style="line-height: 0;height: 0;padding: 0.1rem 0.1rem;border-radius: 0.05rem;font-size:0.14rem;margin-right: 0.05rem;margin-top: 0.04rem;color: #fff;margin-left: 0.05rem;float: left;" v-for="(data,index) in member.usergroup" v-if="data.type=='member'" :style="'background:'+data.bcolor">{{data.title}}</span>

              </li>
						</router-link>

            <li class="li4 l" v-text="member.signature==''?'暂无':member.signature"></li>
						<!--<router-link style="display: block;width:100%;" :to="{path:'/sixin',query:{uname:'',uid:member.hao_id}}">-->
						<li class="navp" @click="isTalking(member.hao_id,member.uname)"></li>
						<!--</router-link>-->
						<!--</a>-->
					</ul>
				</div>
			</div>
		</div>
		<div class="load" style="display:none;">
			<div class="load-container load4">
				<div class="loader"> <i></i></div>
			</div>
		</div>
		<!--<div class="mark" v-show="mark" @click="none()"></div>-->
    <mt-popup v-model="show" position="bottom" class="up">
		<!--<div class="up" v-show="show">-->
			<ul>
				<a @click="goAddFriend">
					<li style="color: #00CCFF;">添加好友</li>
				</a>
				<a @click="goFz">
					<li style="color: #00CCFF;">设置分组</li>
				</a>
				<div class="line"></div>
				<li style="color: #ff0000;" @click="toggles();a1()">取消</li>
			</ul>
		<!--</div>-->
    </mt-popup>
    <load v-show="isload"></load>
	</div>
</template>
<script>
	import qs from 'qs'
	import Vue from 'vue'
	import { setCookie, getCookie } from '../../../assets/js/cookie.js'
	import { getOpenUrl,getToken} from '../../../assets/js/common.js'
	export default {
		name: 'first',
		data() {
			return {
			  isload:false,
				show: false,
				mark: false,
				//show:[],
				items: [],
				members: [],
				searchs: [],
				i: -1,
				hy: '',
				//back:this.goBack,
				isSearch: true
				//isActive:false
			};
		},
		mounted() {
			//$('.load').show();
      this.isload = true;
			this.gid = 0;
			this.frendsList();

      this.$root.eventHub.$on('hySuccess',()=>{
        this.items = [];
        this.frendsList();
      })

      //是否存在input焦点事件或图层打开事件
      $('input').focus(function(){
        //获取焦点
        let expireDays = 1000 * 60 * 60 ;
        setCookie("inputkey", 1, expireDays);
      });
      let self = this;
      $(document).bind('click', function(e){
        var target = $(e.target);
        if(target.closest("input").length == 0 && target.closest('.a1').length == 0 && !self.isKey){
          setCookie("inputkey", '', -1);
        }
      });
		},
		methods: {
			tui() {
        setCookie("inputkey", '', -1);
        this.$router.goBack();
        //android.back1();
			},
			toggles() {
        let expireDays = 1000 * 60 * 60;
        if(!this.show){
          this.isKey = true;
          setCookie("inputkey", 1, expireDays);
        }else{
          this.isKey = false;
          setCookie("inputkey", '', -1);
        }
				this.show = !this.show;
				this.mark = !this.mark;
//				this.$refs.a1.style.height = "calc(100% - 1.64rem)";
//				this.$refs.a1.style.overflow = "hidden";
			},
			a1() {
				this.mark = false;
				this.isshow = false;
				this.$refs.a1.style.height = "";
				this.$refs.a1.style.overflow = "";
			},
			none() {
				this.show = false;
				this.mark = false;
				this.isshow = false;
				this.$refs.a1.style.height = "";
				this.$refs.a1.style.overflow = "";
			},
			toggle(index) {
				//this.show.splice(index,1,!this.show[index])
				this.i = index;
				//console.log(this.i);
			},
			isTalking(id, name) {
				this.$http.get(getOpenUrl() + "/pandMsg", {
					headers: {
						"Authorization": "Bearer " + getToken()
					},
					params: {
						//type:'score'
						to_id: id
					},
				}).then((res) => {
					this.$router.push({
						path: '/sixin',
						query: {
							list_id: res.body.list_id,
							to_id: id,
							uname: name
						}
					});
				});
			},
			frendsList() {
				var $self = this;
				this.$http.get(getOpenUrl() + "/user/myfriend", {
					headers: {
						"Authorization": "Bearer " + getToken()
					},
					params: {
						uid: ''
					},
				}).then((res) => {
          this.isload = false;
					if(res.body.status) {
						console.log(res.body);
						var data = res.body.data;
						$.each(data, function(k, v) {
							if(!v.member) {
								v.member = []
							}
							$self.items.push(v);
						})
						console.log(this.items);
						//var data = {};
						//data.groupid = 0;
						//data.list    = this.items[0].member;
						//this.members.push(data);
						//                 this.tip = res.body.data.info;
						//                 $('.tip').show();
						//                 setTimeout(function(){
						//                   $('.tip').hide();
						//                 },1000)
					}
					$('.load').hide();
				}, function(err) {
					this.$router.push({
						path: '/login',
						//query:{gid: res.body.data.gid}
					});
					console.log('请求失败', err);

				});
			},
			getFenZu(fid, index) {
				if(this.items[index].member.length > 0) {
					$('.friendbox').each(function() {
						if($(this).attr('id') == index) {
							if($(this).is(':hidden')) {
								$(this).show();
								$(this).parent().find('.fri-t em').addClass('active');
							} else {
								$(this).hide();
                $(this).parent().find('.fri-t em').removeClass('active');
							}
						} else {
							$(this).hide();
              $(this).parent().find('.fri-t em').removeClass('active');
						}
					});
//          $('.fri-t img').each(function() {
//            if($(this).attr('imgid') == index) {
//              if($(this).is(':hidden')) {
//                $(this).addClass('active');
//              }else{
//                $(this).removeClass('active');
//              }
//            }else{
//              $(this).removeClass('active');
//            }
//          });
					this.isload = false;
					$('.load').hide();
					return;
				}
				//$('.load').show();
        this.isload = true;
				/*if (this.items[index].isActive) {
				  this.i = -1;
				  //alert(1);
				  return false;
				}

				for(let i = 0;i<this.items.length;i++){
				  console.log(1213);
				  this.items[i].isActive = false;
				}
				this.items[index].isActive = true;*/

				this.$http.get(getOpenUrl() + "/user/friend", {
					headers: {
						"Authorization": "Bearer " + getToken()
					},
					params: {
						groupid: fid
					},
				}).then((res) => {
					if(res.body.status) {
						console.log(res.body);
						this.items[index].member = res.body.data;
						$('.friendbox').each(function() {
              if($(this).attr('id') == index) {
                if($(this).is(':hidden')) {
                  $(this).show();
                  $(this).parent().find('.fri-t em').addClass('active');
                } else {
                  $(this).hide();
                  $(this).parent().find('.fri-t em').removeClass('active');
                }
              } else {
                $(this).hide();
                $(this).parent().find('.fri-t em').removeClass('active');
              }
						});
            this.isload = false;
						$('.load').hide();
					}
				});
			},
			searchHy() {
				if(this.$refs.hy.value == '') {
					this.isSearch = true;
				} else {
					//$('.load').show();
          this.isload = true;
					this.searchs = [];
					let self = this;
					clearTimeout(this.fn);
					self.fn = setTimeout(function() {
						self.$http.get(getOpenUrl() + "/user/friend", {
							headers: {
								"Authorization": "Bearer " + getToken()
							},
							params: {
								kw: self.$refs.hy.value
							},
						}).then((res) => {
              self.isload = false;
							console.log(res.body);
							if(res.body.status) {
								self.searchs = res.body.data;
								self.isSearch = false;
							}
							$('.load').hide();
						});
					}, 500)
				}
			},
      goAddFriend(){
        setCookie("inputkey", '', -1);
        this.$router.push({
          path: '/searchfriend',
          //query:{gid: res.body.data.gid}
        });
      },
      goFz(){
        setCookie("inputkey", '', -1);
        this.$router.push({
          path: '/fenzu',
          //query:{gid: res.body.data.gid}
        });
      }
		},
    beforeRouteLeave (to, from, next) {
      //路由离开时
      if(this.show){
        this.toggles();
      }
      var isInputKey = parseInt(getCookie('inputkey'));
      if (isInputKey == 1){
        setCookie("inputkey", '', -1);
        //this.toggle1();
        next(false)
      }else{
        next()
      }
    },
		activated() {
			//路由缓存 前进后退
			$('.load').hide();
		}
		//          computed: {
		//              getItemIndex(){
		//                for(let i = 0;i<this.items.length;i++){
		//                  console.log(1213);
		//                  this.items[i].isActive = false;
		//                }
		//              }
		//          }
	}
</script>
<style scoped>
  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

  .header {
    height: 0.7rem;
    width: 100%;
    z-index: 1;
    position: fixed;
    top: 0;
    padding-top: 0.3rem;
  }

  .headerall {
    padding: 0 0.2rem;
  }

  .header .a1 {
    width: 0.18rem;
    height: 0.7rem;
    display: block;
    background: url(../../../images/back.png) no-repeat 0 50%;
    background-size: 0.18rem 0.34rem;
    float: left;
  }

  .header .a2 {
    width: 0.32rem;
    height: 0.7rem;
    display: block;
    background: url(../../../images/other/jia.png) no-repeat 0 50%;
    background-size: 0.32rem 0.32rem;
    float: right;
  }

  .forget {
    line-height: 0.7rem;
    font-size: 0.26rem;
    display: block;
    float: left;
    color: #008DD3;
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
  }

  .dian {
    width: 0.27rem;
    height: 0.7rem;
    float: right;
    background: url(../../../images/dian3.png) no-repeat 0 50%;
    background-size: 0.27rem 0.06rem;
    margin-left: 0.19rem;
  }

  .navall {
    padding-top: 1rem;
  }

  .navall-t {
    background: #f5f5f5;
    width: 100%;
    padding: 0.31rem 0;
  }

  .input {
    width: 5.98rem;
    height: 0.5rem;
    border: 1px solid #ebebeb;
    margin: 0 auto;
    background: #fff;
    border-radius: 0.05rem;
  }

  .input .p1 {
    float: left;
    width: 0.65rem;
    height: 0.24rem;
    background: url(../../../images/searchb.png)no-repeat 0.21rem 50%;
    background-size: 0.24rem 0.24rem;
    border-right: 1px solid #ebebeb;
    margin-top: 0.12rem;
  }

  .input input {
    display: block;
    float: left;
  }

  .input .btn {
    width: 1.12rem;
    height: 0.5rem;
    background: #008dd3;
    font-size: 0.22rem;
    color: #fff;
    line-height: 0.5rem;
    text-align: center;
    float: right;
    border-radius: 0.05rem;
  }

  .input .txt {
    height: 0.5rem;
    font-size: 0.24rem;
    line-height: 0.24rem;
    padding-left: 0.2rem;
    color: #242424;
  }

  .fri-t {
    height: 0.78rem;
    border-bottom: 1px solid #ebebeb;
    position: relative;
  }

  .fri-t img {
    width: 0.12rem;
    border-bottom: 1px solid #ebebeb;
    display: block;
    float: left;
    position: absolute;
    top: 50%;
    left: 0.27rem;
    transform: translateY(-50%);
  }
  .fri-t em{
    transition:all .2s ease-in;
    transform:rotate(0deg);
  }
  .fri-t em.active{
    transition:all .2s ease-in;
    transform:rotate(90deg);
  }

  .fri-t .fri-p1 {
    font-size: 0.22rem;
    color: #242424;
    float: left;
    line-height: 0.78rem;
    /*padding-left: 0.66rem;*/
  }

  .fri-t span {
    float: right;
    font-size: 0.22rem;
    color: #242424;
    line-height: 0.78rem;
    padding-right: 0.22rem;
    color: #008dd3;
  }

  .nav {
    padding-left: 0.2rem;
  }

  .friendbox {
    display: none;
  }

  .mark {
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.3);
  }

  .up {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 100;
    background: #fff;
    font-size: 0.22rem;
    text-align: center;
    line-height: 1rem;
  }

  .up li {
    border-bottom: 1px solid #E0E0E0;
  }

  .nav ul {
    margin-top: 0.26rem;
    overflow: hidden;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid #ebebeb;
    position: relative;
  }

  .nav ul .l {
    float: left;
    width: 4.46rem;
  }

  .li1 {
    line-height: 0.41rem;
    font-size: 0.2rem;
    margin-left: 0.24rem;
    color: #242424;
  }

  .li1 .sp1 {
    font-size: 0.2rem;
    color: #949494;
    margin-left: 0.08rem;
  }

  .li1 .sp2 img {
    width: 0.19rem;
    height: 0.19rem;
    margin-left: 0.08rem;
  }

  .li22.isColor {
    width: auto;
    background: transparent;
    margin-top: 0.12rem;
  }

  .li22 {
    font-size: 0.03rem;
    height: 0.2rem;
    color: #fff;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 0.1rem;
    line-height: normal;
    padding: .02rem 0.1rem;
    background: #39b6f4;
    border-radius: 0.05rem;
    text-align: center;
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
    width:100%;
    height: 100%;
    object-fit: cover;
    display:block;
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
    -bottom: 1px solid #e0e0e0;
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

  .nav .li3 p {
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
    height: 0.38rem;
    display: block;
    clear: both;
    line-height: 0.38rem;
    color: #949494;
    font-size: 0.2rem;
    margin-left: 0.24rem;
  }

  .navp {
    width: 0.34rem;
    height: 0.28rem;
    background: url(../../../images/sixin.png) no-repeat;
    background-size: 0.34rem 0.28rem;
    position: absolute;
    top: 0.25rem;
    right: 0.3rem;
    z-index: 12;
  }
</style>
