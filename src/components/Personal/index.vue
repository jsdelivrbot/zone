<template>
	<div class="index" v-if="data">
    <div style="height: calc(100% - 0.98rem);overflow: auto;position: relative;padding-bottom:0.98rem;">
      <div class="page-loadmore backtop" style="font-size:0.2rem;">
        <mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">
      <div class="top" :style="'background:url('+data.background+');background-size:cover;background-color: #0993d6;'">
        <div class="topall">
          <div class="top-left">
            <a href="#/myzl">
              <img id="logo" v-if="data.face!=0" :src="data.face" />
              <img id="logo" v-if="data.face==0" src="../../images/personLogo.png" />
              <!--<img v-if="data.face==0" src="../../images/indexbanner.png" />-->
            </a>
          </div>
          <div class="top-right">
            <ul class="ul1">
              <li class="li1" style="cursor:pointer;display: block;width:calc(100% - 0.3rem);position: relative;line-height: 0.6rem">
                <router-link style="color:#fff;" :to="{path:'/yesfriend',query:{uid:data.uid}}">
                  {{data.uname}}
                </router-link>
              </li>
              <!--<li v-for="(data,index) in data.userGroup" :key="index" v-if="data.is_level" class="li2">-->
              <!--vip2-->
              <!--</li>-->
              <!--<li class="li2" v-for="(data,index) in data.userGroup" :key="index" v-bind:class="{isColor:data.icon!=''}" :style="data.bcolor ? 'background-color:'+data.bcolor : ''">-->
              <!--<img v-if="data.icon!=''" :src="data.icon" alt="" style="height:.5rem;">-->
              <!--<em v-if="data.icon==''" style="font-style:normal;">{{data.title}}</em>-->
              <!--</li>-->
              <li class="li4">
                <a href="#/bjzl"></a>
              </li>
              <li style="height: 0.3rem;">
                <img  :src="data.icon" alt="" style="margin-right:0.1rem;height:0.3rem;float: left;" v-for="(data,index) in data.userGroup" v-if="data.icon!=''">
                <!--<span class="li" style="line-height: 0;height: 0;padding: 0.1rem 0.1rem;border-radius: 0.05rem;font-size:0.14rem;margin-right: 0.05rem;margin-top: 0.04rem;color: #fff;margin-left: 0.05rem;float: left;" v-for="(data,index) in data.userGroup" v-if="data.type=='member'" :style="'background:'+data.bcolor">{{data.title}}</span>-->
              </li>
              <!--<li class="li2" v-for="(data,index) in data.userGroup" :key="index" v-if="data.type=='member'">-->
              <!--{{data.title}}-->
              <!--</li>-->
              <!--<li class="li3">铜牌会员</li>-->

            </ul>
            <div class="ul2" v-show="data.is_level==1">
              <span class="li1">还差<span>{{data.remain_integral}}分升级</span></span>
              <span class="li2"><span>{{data.experience}}</span>/<span>{{data.nextPoints}}</span></span>
              <div class="jindu-div" ref="allJindu" style="width:3.32rem;">
                <div class="jindu" id="jindu" ref="jindu" style="width:0.1rem;"></div>
              </div>
            </div>
          </div>

        </div>

      </div>
      <div class="nav">
        <div class="center">
          <div class="center-top">
            <img src="../../images/other/wode.png" />
          </div>
          <div class="center-bottom">
            <table border="0" cellspacing="0" cellpadding="0" frame=below>
              <tr>
                <td class="border">
                  <a href="#/myqz">
                    <dl>
                      <dt><img src="../../images/other/quanzi.png"/></dt>
                      <dd>圈子</dd>
                    </dl>
                  </a>
                </td>
                <td class="border">
                  <a @click="goDaYi">
                    <dl>
                      <dt><img src="../../images/other/dayi.png"/></dt>
                      <dd>答疑</dd>
                    </dl>
                  </a>
                </td>
                <td class="border">
                  <a href="#/myrw">
                    <dl>
                      <dt><img src="../../images/other/renwu.png"/></dt>
                      <dd>任务</dd>
                    </dl>
                  </a>
                </td>
                <td class="border">
                  <a href="#/news">
                    <dl>
                      <dt><img src="../../images/other/xiaoxi.png"/></dt>
                      <dd>消息</dd>
                    </dl>
                  </a>
                </td>
              </tr>
              <tr>
                <td class="border">
                  <a href="#/mytz">
                    <dl>
                      <dt><img src="../../images/other/tiezi.png"/></dt>
                      <dd>帖子</dd>
                    </dl>
                  </a>
                </td>
                <td class="border">
                  <a href="#/mydd">
                    <dl>
                      <dt><img src="../../images/other/dingdan.png"/></dt>
                      <dd>订单</dd>
                    </dl>
                  </a>
                </td>
                <td class="border">
                  <a href="#/shoucang">
                    <dl>
                      <dt><img src="../../images/other/shoucang.png"/></dt>
                      <dd>收藏</dd>
                    </dl>
                  </a>
                </td>
                <td class="border">
                  <a href="#/myhy">
                    <dl>
                      <dt><img src="../../images/other/haoyou.png"/></dt>
                      <dd>好友</dd>
                    </dl>
                  </a>
                </td>
              </tr>
              <tr>
                <td class="border">
                  <a href="#/glshdz">
                    <dl>
                      <dt><img src="../../images/other/shouhuodizhi.png"/></dt>
                      <dd>收货地址</dd>
                    </dl>
                  </a>
                </td>
                <td class="border">
                  <a href="#/myjf">
                    <dl>
                      <dt><img src="../../images/other/jifen.png"/></dt>
                      <dd>积分</dd>
                    </dl>
                  </a>
                </td>
                <td class="border">
                  <a @click="goYaoQing">
                    <dl>
                      <dt><img src="../../images/other/yaoqing.png"/></dt>
                      <dd>邀请</dd>
                    </dl>
                  </a>
                </td>
                <td class="border">
                  <a href="#/zuji">
                    <dl>
                      <dt><img src="../../images/other/zuji.png"/></dt>
                      <dd>足迹</dd>
                    </dl>
                  </a>
                </td>
              </tr>
            </table>
          </div>

        </div>
        <div class="center">
          <div class="center-top border">
            <img src="../../images/other/qita.png" />
          </div>
          <div class="center-bottom" style="position: relative;">
            <a href="#/mysz" style="height: 1.3rem;
    display: block;
    float: left;">
              <dl class="dl">
                <dt><img src="../../images/other/shezhi.png"/></dt>
                <dd>设置</dd>
              </dl>
            </a>
            <a @click="goRz" style="height: 1.3rem;
    display: block;
    float: left;">
              <dl class="dl">
                <dt><img src="../../images/other/renzheng.png"/></dt>
                <dd>认证</dd>
              </dl>
            </a>
            <a href="#/vip" style="height: 1.3rem;display: block;float: left;" v-if="this.data.is_vnew==1">
              <dl class="dl">
                <dt><img src="../../images/other/vip.png"/></dt>
                <dd>vip专区</dd>
              </dl>
            </a>
            <a href="#/svip" style="height: 1.3rem;display: block;float: left;" v-if="this.data.is_svnew==1">
              <dl class="dl">
                <dt><img src="../../images/Svips.png"/></dt>
                <dd>svip专区</dd>
              </dl>
            </a>
            <a @click="jubao" style="height: 1.3rem;
    display: block;
    float: left;">
              <dl class="dl">
                <dt><img src="../../images/jb.png"/></dt>
                <dd>举报</dd>
              </dl>
            </a>
          </div>

        </div>

      </div>
        </mt-loadmore>
      </div>
      <transition name="fade">
        <div class="jubao" v-show="toshow">
          <div class="jubaoall">
            <div class="jubao-t">
              <span>联系方式：</span>
              <a class="a2" @click="jubao()">X</a>
            </div>
            <div class="jubao-b">
              <!--<p v-text="data.agency_name"></p>-->
              <!--<span style="display: block;float: left;">：</span>-->
              <p>010-87748155</p>
              <a href="tel:010-87748155"><img src="../../images/tel-icon.png" style="
    width: 0.4rem;
    object-fit: cover;
    margin-right: 0.1rem;
    vertical-align: middle;
    display: inline-block;
    position: relative;
    top: -.03rem;"></a>
              <!--<p @click="toCall(data.link_phone)" v-text="data.link_phone"></p>-->
            </div>
          </div>
        </div>
      </transition>
    </div>
		<!--<my-footer></my-footer>-->
		<div class="load" style="display:none;">
			<div class="load-container load4">
				<div class="loader"> <i></i></div>
			</div>
		</div>
		<pop style="text-align: center" class="index_tip" :title="tip"></pop>
	</div>
</template>
<script>
	import { setCookie, getCookie } from '../../assets/js/cookie.js'
	import { getOpenUrl,getToken} from '../../assets/js/common.js'
	import qs from 'qs'
	export default {
		data() {
			return {
        toshow:false,
				tip: '',
				data: '',
				changdu: '',
        allLoaded: false,
        scrollMode:"auto",
        topStatus: '',
			}
		},
		created() {
      this.getData();
      this.getTs();
		},
		mounted() {
			$('.load').show();
			//var token = localStorage.getItem("token");
			//console.log(token);

			      this.$root.eventHub.$on('refreshed', ()=>{
			        //console.log('刷新');
			        this.getData();
              this.getTs();
			      });
			//this.$mount(this.$refs);
			//console.log(this.$refs);
		},
		methods: {
      jubao(){
        this.toshow = !this.toshow;
      },
      loadTop() { // 刷新数据的操作
        setTimeout(()=> {
          this.getData();
          this.allLoaded = false;
          this.$refs.loadmore.onTopLoaded();
          this.getTs();
        },2000)
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      handleBottomChange(status){
        this.bottomStatus = status;
      },
			//      noQxFn(){
			//        this.tip = '无权访问';
			//        $('.tip').show();
			//        setTimeout(function(){
			//          $('.tip').hide();
			//        },1000)
			//      },
      goDaYi(){
        this.$router.push('/query')
//        if(this.data.dayi_auth == 1){
//          if(getCookie('isexpert') == 1){
//            this.$router.push('/zjquery')
//          }else{
//            this.$router.push('/query')
//          }
//        }else{
//          this.tip = '无权访问';
//          $('.index_tip').show();
//          setTimeout(function() {
//            $('.index_tip').hide();
//          }, 1000)
//        }
      },
      goRz(){
//        if(this.data.invite_auth == 1){
          this.$router.push('/yhrz');
//        }else{
//          this.tip = '无权访问';
//          $('.index_tip').show();
//          setTimeout(function() {
//            $('.index_tip').hide();
//          }, 1000)
//        }
      },
			getTs() {
				let date = new Date();
				let seperator = ":";
				let currentdate = date.getHours() + seperator + date.getMinutes() +
					seperator + date.getSeconds();
				this.timeRange(getCookie('wrStartTime'), getCookie('wrEndTime'), currentdate);
				window['plugins'].jPushPlugin.init();
			},
			timeRange(beginTime, endTime, nowTime) {
				var strb = beginTime.split(":");
				if(strb.length != 2) {
					return false;
				}

				var stre = endTime.split(":");
				if(stre.length != 2) {
					return false;
				}

				var strn = nowTime.split(":");
				if(stre.length != 2) {
					return false;
				}
				var b = new Date();
				var e = new Date();
				var n = new Date();

				b.setHours(strb[0]);
				b.setMinutes(strb[1]);
				e.setHours(stre[0]);
				e.setMinutes(stre[1]);
				n.setHours(strn[0]);
				n.setMinutes(strn[1]);

				if(n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
					window['plugins'].jPushPlugin.stopPush();
					return true;
				} else {
					//alert ("当前时间是：" + n.getHours () + ":" + n.getMinutes () + "，不在该时间范围内！");
					window['plugins'].jPushPlugin.resumePush();
					return false;
				}
			},
			getData() {
				this.$http.get(getOpenUrl() + "/user/index?t=" + Math.random(), {
					headers: {
						"Authorization": "Bearer " + getToken()
					}
				}).then((res) => {
					console.log(res.body);
					this.data = res.body.data;
					$('.load').hide();
					if(res.body.status === 0) {
						this.$router.push({
							path: '/login',
						});
					}
          if(this.data.remain_integral>9999){
            this.data.remain_integral = '9999+';
          }
					if(this.data.face != 0) {
						this.data.face = this.data.face + '?t=' + Math.random();
					}
					if(this.data.background === '') {
						this.data.background = '../../static/finishied.png';
					} else {
						this.data.background = this.data.background + '?t=' + Math.random();
					}
					let bili = this.data.experience / this.data.nextPoints;
					this.changdu = bili;
					this.$mount(this.$refs);
					this.$refs.jindu.style.width = bili * parseInt(this.$refs.allJindu.style.width) + 'rem';
					//console.log(bili,parseInt(this.$refs.allJindu.style.width) + 'rem')

				}, function(err) {
					this.$router.push({
						path: '/login',
						//query:{gid: res.body.data.gid}
					});
					console.log('请求失败', err);

				});
			},
			goYaoQing() {
				if(this.data.invite_auth == 1) {
					this.$router.push({
						path: '/myyq',
						//query:{gid: res.body.data.gid}
					});
				} else {
					this.tip = '无权访问';
					$('.index_tip').show();
					setTimeout(function() {
						$('.index_tip').hide();
					}, 1000)
				}
			}
		},
		activated() {
			//路由缓存 前进后退
			$('.load').hide();
      $('.index_tip').hide();
      //this.getData();
			//this.getTs();
      let isLogin  = getCookie('islogin');
      if(isLogin==0){
        this.$router.push({path: '/login'});
      }
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index_tip {
    display: none;
  }

  .index {
    height: 100%;
    /*padding-bottom: 0.98rem;*/
  }

  .top {
    width: 100%;
    height: 3.64rem;
    background-color: #0993d6;
    background-size: 100% 100% !important;
  }

  .topall {
    width: 5.1rem;
    margin: 0 auto;
    display: flex;
    padding-top: 1.02rem;
  }

  .top-left {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    float: left;
    padding: 0.1rem;
    background-color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
  }

  .top-left img {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    display: block;
    float: left;
    object-fit:cover;
  }

  .top-right {
    float: left;
    margin-left: 0.21rem;
    flex: 1;
    color: #fff;
  }

  .ul1 {
    line-height: 0.76rem;
    font-size: 0.16rem;
  }

  .ul1 li {
    float: left;
  }

  .ul1 .li1 {
    font-size: 0.26rem;
  }

  .ul1 .li2.isColor {
    width: auto;
    background: transparent;
    margin-top: 0.15rem;
  }

  .ul1 .li2 {
    margin-top: 0.27rem;
    margin-left: 0.13rem;
    line-height: normal;
    padding: .02rem 0.1rem;
    background: #39b6f4;
    border-radius: 0.05rem;
    text-align: center;
  }

  .ul1 .li4 {
    width: 0.26rem;
    height: 0.76rem;
    background: url(../../images/other/ziliao.png)no-repeat 0 50%;
    background-size: 0.22rem 0.26rem;
    float: right;
  }

  .ul1 .li4 a {
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .ul2 {
    width: 100%;
    line-height: 0.26rem;
    font-size: 0.18rem;
    float: left;
  }

  .ul2 .li2 {
    float: right;
  }

  .ul2 div {
    height: 0.09rem;
    width: 3.32rem;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 0.045rem;
    margin-top: 0.15rem;
    /*margin-top: 0.3rem;*/
  }

  .ul2 div .jindu {
    height: 0.09rem;
    width: 3rem;
    background: #fff;
    border-radius: 0.045rem;
    display: block;
  }

  .center-top {
    height: 0.77rem;
    border-bottom: 1px solid #ebebeb;
    position: relative;
  }

  .center-top img {
    width: 0.33rem;
    height: 0.33rem;
    position: absolute;
    top: 50%;
    left: 0.3rem;
    transform: translateY(-50%);
  }

  .center-bottom table {
    width: 100%;
    border-collapse: collapse;
  }

  .center-bottom tr {
    border: 1px solid #ebebeb;
  }

  .center-bottom td {
    width: 25%;
    border: 1px solid #ebebeb;
  }

  .center-bottom dl {
    height: 1.3rem;
    cursor: pointer;
  }

  .center-bottom dt img {
    height: 0.36rem;
    margin: 0 auto;
    display: block;
    padding-top: 0.29rem;
  }

  .center-bottom dd {
    font-size: 0.18rem;
    color: #242424;
    text-align: center;
    margin-top: 0.19rem;
  }

  .dl {
    float: left;
    width: 1.6rem;
  }


  .jubao {
    width: 5.36rem;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -1.9rem;
    margin-left: -2.68rem;
    z-index: 999;
  }
  .jubaoall {
    width: 5.36rem;
    position: relative;
    background: #fff;
    box-shadow: 0 0 0.05rem #000;
    color: #242424;
    font-size: 0.22rem;
  }

  .jubao-t {
    background: #54C2F0;
    height: 0.5rem;
    line-height: 0.5rem;
    padding: 0 0.2rem;
  }

  .jubao-t span {
    color: #fff;
  }

  .jubao-t .a2 {
    color: #fff;
    float: right;
  }

  .jubao-b {
    /*padding-left: 0.2rem;*/
    overflow-y: scroll;
    line-height: 0.5rem;
    min-height:0;
    /*position: absolute;*/
    /*top:50%;*/
    /*left:50%;*/
    /*transform: translate(-50%,-50%);*/
    padding: 0.15rem 0;
    text-align: center;
  }
  .jubao-b.isMinHeight{
    min-height: 1.5rem;
  }

  .jubao-b p {
    /*float: left;*/
    /*line-height: 0.5rem;*/
    display: inline-block;
  }
</style>
