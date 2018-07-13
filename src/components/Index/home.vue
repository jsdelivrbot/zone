<template>
  <div class="index">
    <div style="height:calc(100% - 0.98rem);position: relative;overflow: auto;">
      <div class="page-loadmore backtop" style="font-size:0.2rem;">
        <mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">
      <div class="banner">
        <div class="slide">
          <swiper :options="swiperOption">
            <swiper-slide v-for="slide in imgData">
              <router-link :to="{path:'/info1',query:{id:slide.app_id}}">
                <img :src="slide.content"/>
              </router-link>
              <p>{{slide.title}}</p>
              <!-- <div class="slide-bottom"></div> -->
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="banner-t">
          <div class="banner-user" id="banner-user">
            <a href="javascript:;" @click="jump('message')"></a>
            <!--<span></span>-->
          </div>
          <div class="banner-user" id="a2" @click="saoma">
            <a href="javascript:;"></a>
          </div>
        </div>

      </div>
      <div class="content">
        <dl>
          <a href="javascript:;" @click="jump('service')">
            <dt><img src="../../images/fw.png"/></dt>
            <dd>服务资源</dd>
          </a>
        </dl>
        <dl>
          <a href="javascript:;" @click="jump('circle')">
            <dt><img src="../../images/qz.png"/></dt>
            <dd>圈子</dd>
          </a>
        </dl>
        <dl>
          <a href="javascript:;" @click="jump('query')">
            <dt><img src="../../images/zjzy.png"/></dt>
            <dd>专家答疑</dd>
          </a>
        </dl>
        <dl>
          <a href="javascript:;" @click="sign()">
            <dt><img src="../../images/qd.png"/></dt>
            <dd>每日签到</dd>
          </a>
        </dl>
        <dl>
          <a href="#/info">
            <dt><img src="../../images/zx.png"/></dt>
            <dd>资讯</dd>
          </a>
        </dl>
        <dl>
          <a href="javascript:;" @click="jump('shopping')">
            <dt><img src="../../images/shop1.png"/></dt>
            <dd>礼品商城</dd>
          </a>
        </dl>
        <dl>
          <a href="javascript:;" @click="jump('paihang')">
            <dt><img src="../../images/phb.png"/></dt>
            <dd>排行榜</dd>
          </a>
        </dl>
        <dl>
          <a href="javascript:;" @click="jump('myrw')">
            <dt><img src="../../images/rw.png"/></dt>
            <dd>任务大厅</dd>
          </a>
        </dl>
      </div>
      <div class="line"></div>
      <div class="newsbox">
        <p>新闻资讯</p>
        <div class="tip-bottom" v-for="(list,index) in newsData" :key="index">
          <div class="tip-bottom-l">
            <router-link :to="'/info1?id='+list.document_id">
              <img v-lazy="list.thumb"/>
            </router-link>
          </div>
          <div class="tip-bottom-r">
            <router-link :to="'/info1?id='+list.document_id">
              <ul>
                <li class="li1">{{list.title}} </li>
                <li class="li2" v-html="list.content">{{list.content}}</li>
                <li class="li3">
                  <span class="li3-p1">{{list.ctime}}</span>
                  <span class="li3-p3">{{list.views}}</span>
                  <span class="li3-p2">{{list.comment_num}}</span>
                </li>
              </ul>
            </router-link>
          </div>
        </div>
      </div>
      <div style="height: 1.38rem;padding-top: 0.35rem;
        /*padding-bottom: 0.75rem;*/
      ">
        <a href="#/info">
          <input type="button" value="查看更多" class="btn"/>
        </a>
      </div>
        </mt-loadmore>
      </div>
    </div>
    <!--<my-footer></my-footer>-->
    <div class="load" style="display:none;">
      <div class="load-container load4">
        <div class="loader"><i></i></div>
      </div>
    </div>
    <transition name="fade">
      <div class="version-tip" v-show="needUp">
        <h1 style="font-size: 0.25rem;top: 2.8rem;left:0.3rem;position: absolute;letter-spacing: 0.02rem;">升级提醒:</h1>
        <p style="font-size: 0.25rem;top: 3.4rem;left:0.3rem;position: absolute;color:#757575;">
          {{newVersionData.title}}</p>
        <div class="version-info-box"
             style="position: absolute;left:0.3rem;top:4rem;background:#fff;width: 4rem;height: 1.6rem;overflow-y: scroll;overflow-x: hidden;">
          <p v-html="newVersionData.content"></p>
        </div>
        <div class="version-button" style="position: absolute;left:0.3rem;bottom: 0.2rem;">
          <button @click="toggle">稍后升级</button>
          <!--<button @click="goUp" style=" background-image:-webkit-linear-gradient(0deg,#36abff,#4cd2ff);background-image:linear-gradient(0deg,#36abff,#4cd2ff);color:#fff;border: none;">马上升级</button>-->
          <!--<a href="http://zhongx.iwsoft.net/data/app/android-debug.apk" download>马上升级</a>-->
          <a @click="versionUpPackage">马上升级</a>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="mark" @click="toggle" v-show="show"></div>
    </transition>
    <pop style="text-align: center" class="tips" :title="tip"></pop>
  </div>
</template>
<script>
  import qs from 'qs';
  import { MessageBox } from 'mint-ui';
  import {setCookie, getCookie} from '../../assets/js/cookie.js';
  import {getOpenUrl, getToken} from '../../assets/js/common.js'

  export default {
    name: 'index',
    data() {
      return {
        needUp: false,
        show: false,
        versionData: '',
        newVersionData: '',
        newsData: {},
        imgData: {},
        vprivData: {},
        islogin: false,
        isexpert: false,
        ishasgroup: 0,
        timer: null, //定时器
        mark: 0, //比对图片索引的变量
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          autoplay: 2500,
          loop: true,
          spaceBetween: 0,
          autoplayDisableOnInteraction: false,
          observer: true,
          observeParents: true
        },
        tip: '',
        allLoaded: false,
        scrollMode:"auto",
        topStatus: '',
      }
    },
    methods: {
      loadTop() { // 刷新数据的操作
        setTimeout(()=> {
          this.getAdData();
          this.getView();
          this.getNewsData();
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
        this.needUp = !this.needUp;
      },
      saoma() {
        let self = this;

        if(self.islogin){
          QRScanner.prepare(onDone); // show the prompt
        }else{
          self.$toast('请先登录',{
            duration:'1500'
          });
          self.$router.push({
            path: '/login'
          });
        }

        function onDone(err, status){
          if (err) {
            // here we can handle errors and clean up any loose ends.
            console.error(err);
          }
          if (status.authorized) {
//            self.$toast('同意授权',{
//              duration:'1500'
//            });
              self.$router.push({
                path: '/saoma'
              });
            // W00t, you have camera access and the scanner is initialized.
            // QRscanner.show() should feel very fast.
          } else if (status.denied) {
            // The video preview will remain black, and scanning is disabled. We can
            // try to ask the user to change their mind, but we'll have to send them
            // to their device settings with `QRScanner.openSettings()`.
            self.$toast('取消扫码',{
              duration:'1500'
            });
          } else {
            // we didn't get permission, but we didn't get permanently denied. (On
            // Android, a denial isn't permanent unless the user checks the "Don't
            // ask again" box.) We can ask again at the next relevant opportunity.
          }
        }
//        cordova.plugins.barcodeScanner.scan(
//          function (result) {
//            self.$http.get(getOpenUrl() + 'user/invite', {
//              headers: {'Authorization': 'Bearer ' + getToken()},
//              params: {
//                invitecode: result.text
//              }
//            }).then((res) => {
//              if (res.body.code == '0000') {
//                self.tip = res.body.data.info;
//                $('.tips').show();
//                setTimeout(function () {
//                  $('.tips').hide();
//                }, 1000)
//              } else if (res.body.code == '7001') {
//                let expireDays = 1000 * 60 * 60;
//                setCookie('qrCode', result.text, expireDays);
//                this.$router.push({
//                  path: '/login'
//                });
//                self.tip = res.body.error_description;
//                $('.tips').show();
//                setTimeout(function () {
//                  $('.tips').hide();
//                }, 1000)
//              } else {
//                self.tip = '取消扫码';
//                $('.tips').show();
//                setTimeout(function () {
//                  $('.tips').hide();
//                }, 1000)
//              }
//            });
//          },
//          function (error) {
//
//          }, {
//            preferFrontCamera : true, // iOS and Android
//            showFlipCameraButton : true, // iOS and Android
//            showTorchButton: true, // iOS and Android
//            torchOn: true, // Android, launch with the torch switched on (if available)
//            saveHistory: true, // Android, save scan history (default false)
//            prompt: "请将条码置于取景框内扫描", // Android
//            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
//            formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
//            orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
//            disableAnimations : true, // iOS
//            disableSuccessBeep: false // iOS and Android
//          });
      },
      sign() {
        let self = this;
        if (this.islogin) {
          //签到
          this.$http.post(getOpenUrl() + 'sign', {}, {
            headers: {'Authorization': 'Bearer ' + getToken()}
          }).then((res) => {
            if (res.body.code == '0000') {
              this.tip = "签到成功。" + res.body.data;
              this.$root.eventHub.$emit('jfSuccess');
              this.$root.eventHub.$emit('datiSuccess');
              $('.tips').show();
              setTimeout(function () {
                $('.tips').hide();
                self.$router.push("/qiandao")
              }, 1000)
            } else {
              this.tip = res.body.error_description;
              $('.tips').show();
              setTimeout(function () {
                $('.tips').hide();
                self.$router.push("/qiandao")
              }, 1000)
            }
          });
        } else {
          this.tip = '无权访问';
          $('.tips').show();
          setTimeout(function () {
            $('.tips').hide();
            self.$router.push('/login')
          }, 1000)
        }
      },

      jump(type) {
        let self = this;
        //自定义跳转
        switch (type) {
          case 'service':
            //服务资源
            if (this.vprivData.ziyuan.view) {
              this.$router.push('/service')
            } else {
              this.tip = '无权访问';
              $('.tips').show();
              setTimeout(() => {
                $('.tips').hide();
                if (this.islogin == 0) {
                  self.$router.push('/login')
                }
                //              				self.$router.push('/login')
              }, 1000)
            }
            break;
          case 'circle':
            //圈子
            if (this.vprivData.group.view) {
              if (this.ishasgroup > 0) {
                this.$router.push('/mycircle')
              } else {
                this.$router.push('/circle')
              }
            } else {
              this.tip = '无权访问';
              $('.tips').show();
              setTimeout(() => {
                $('.tips').hide();
                if (this.islogin == 0) {
                  self.$router.push('/login')
                }
              }, 1000)
            }
            break;
          case 'query':
            //专家答疑
            if (this.islogin) {
              if (this.vprivData.dayi.view) {
                this.$router.push('/zjquery')
              } else {
                this.tip = '无权访问';
                $('.tips').show();
                setTimeout(function () {
                  $('.tips').hide();
                }, 1000)
              }
            } else {
              this.tip = '无权访问';
              $('.tips').show();
              setTimeout(() => {
                $('.tips').hide();
                if (this.islogin == 0) {
                  self.$router.push('/login')
                }
              }, 1000)
            }
            break;
          case 'shopping':
            //积分商城
            this.$router.push('/shopping')
//						if(this.islogin) {
//							this.$router.push('/shopping')
//						} else {
//							this.tip = '无权访问';
//							$('.tips').show();
//							setTimeout(() => {
//								$('.tips').hide();
//								if(this.islogin == 0) {
//									self.$router.push('/login')
//								}
//							}, 1000)
//						}
            break;
          case 'message':
            //消息
            if (this.islogin) {
              this.$router.push('/news')
            } else {
              this.tip = '无权访问';
              $('.tips').show();
              setTimeout(() => {
                $('.tips').hide();
                if (this.islogin == 0) {
                  self.$router.push('/login')
                }
              }, 1000)
            }
            break;
          case 'paihang':
            //排行榜
//            if(this.isRank == 0){
//              MessageBox.confirm('是否允许上传个人资料到排行榜'+'</br>'+'如需再次修改请移至个人中心',{title: '权限',confirmButtonText:'允许',cancelButtonText:'拒绝'}).then(action => {
//                  this.$http.post(getOpenUrl() + "/user/setIsrank",{
//                    isrank:1
//                  },{
//                    headers:{"Authorization": "Bearer " + getToken()}
//                  })
//                    .then((res) => {
//                      if(res.body.code=="0000"){
//                        if (this.vprivData.top.view) {
//                          this.$root.eventHub.$emit('chartSuccess');
//                          this.tip = res.body.data.info;
//                          $('.tips').show();
//                          setTimeout(()=>{
//                            $('.tips').hide();
//                            this.$router.push('/chart');
//                          }, 1500)
//                        } else {
//                          this.tip = '无权访问';
//                          $('.tips').show();
//                          setTimeout(() => {
//                            $('.tips').hide();
//                            if (this.islogin == 0) {
//                              self.$router.push('/login')
//                            }
//                          }, 1000)
//                        }
//                      }
//                    })
//              },(err)=>{
//                  this.$http.post(getOpenUrl() + "/user/setIsrank",{
//                    isrank:2
//                  },{
//                    headers:{"Authorization": "Bearer " + getToken()}
//                  })
//                    .then((res) => {
//                      if(res.body.code=="0000"){
//                        if (this.vprivData.top.view) {
//                          this.$root.eventHub.$emit('chartSuccess');
//                          this.tip = res.body.data.info;
//                          $('.tips').show();
//                          setTimeout(()=>{
//                            $('.tips').hide();
//                            this.$router.push('/chart');
//                          }, 1500)
//                        } else {
//                          this.tip = '无权访问';
//                          $('.tips').show();
//                          setTimeout(() => {
//                            $('.tips').hide();
//                            if (this.islogin == 0) {
//                              self.$router.push('/login')
//                            }
//                          }, 1000)
//                        }
//                      }
//                    })
//              })
//            }else{
//              if (this.vprivData.top.view) {
//                this.$router.push('/chart');
//              } else {
//                this.tip = '无权访问';
//                $('.tips').show();
//                setTimeout(() => {
//                  $('.tips').hide();
//                  if (this.islogin == 0) {
//                    self.$router.push('/login')
//                  }
//                }, 1000)
//              }
//            }
              if (this.vprivData.top.view) {
                this.$router.push('/chart');
              } else {
                this.tip = '无权访问';
                $('.tips').show();
                setTimeout(() => {
                  $('.tips').hide();
                  if (this.islogin == 0) {
                    self.$router.push('/login')
                  }
                }, 1000)
              }
            break;
          case 'myrw':
            //任务大厅
            if (this.islogin) {
              this.$router.push('/myrw')
            } else {
              //this.$router.push('/login')
              this.tip = '无权访问';
              $('.tips').show();
              setTimeout(() => {
                $('.tips').hide();
                if (this.islogin == 0) {
                  self.$router.push('/login')
                }
              }, 1000)
            }
            break;
          case 'news':
            this.$router.push('/info1', {
              query
            });
            break;
        }
      },

      getView() {
        //获取模块访问权限
        this.$http.get(getOpenUrl() + 'viewpriv', {
          headers: {'Authorization': 'Bearer ' + getToken()}
        }).then((res) => {
          this.vprivData = res.body.data;
          this.islogin = res.body.islogin;
          this.isexpert = res.body.isexpert;
          this.ishasgroup = res.body.ishasgroup;
          this.isRank = res.body.data.isrank.view;


          let expireDays = 1000 * 60 * 60;
          setCookie("islogin", res.body.islogin, expireDays);
          setCookie("isexpert", res.body.isexpert, expireDays);
          setCookie("ishasgroup", res.body.ishasgroup, expireDays);
          setCookie("groupview", this.vprivData.group.view, expireDays);
          setCookie("findview", res.body.data.find_view.view, expireDays);

          let date = new Date();
          let seperator = ":";
          let currentdate = date.getHours() + seperator + date.getMinutes() +
            seperator + date.getSeconds();
          this.timeRange(getCookie('wrStartTime'), getCookie('wrEndTime'), currentdate);
          window['plugins'].jPushPlugin.init();
        });
      },
      timeRange(beginTime, endTime, nowTime) {
        var strb = beginTime.split(":");
        if (strb.length != 2) {
          return false;
        }

        var stre = endTime.split(":");
        if (stre.length != 2) {
          return false;
        }

        var strn = nowTime.split(":");
        if (stre.length != 2) {
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

        if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
          window['plugins'].jPushPlugin.stopPush();
          return true;
        } else {
          //alert ("当前时间是：" + n.getHours () + ":" + n.getMinutes () + "，不在该时间范围内！");
          window['plugins'].jPushPlugin.resumePush();
          return false;
        }
      },
      getNewsData() {
        //新闻
        this.$http.get(getOpenUrl() + 'newsList', {
          headers: {'Authorization': 'Bearer ' + getToken()},
          params: {
            recommend: 1
          }
        }).then((res) => {
          this.newsData = res.body.data
          $('.load').hide();
        });
      },
      getAdData() {
        this.$http.get(getOpenUrl() + "ads", {
          headers: {'Authorization': 'Bearer ' + getToken()},
          params: {
            type: 1
          }
        }).then((res) => {
          this.imgData = res.body.data
        });
      },
      //			getVersion() {
      //
      //			},
      versionUp() {
        let self = this;
        this.$http.get(getOpenUrl() + "ads", {
          headers: {'Authorization': 'Bearer ' + getToken()},
          params: {
            type: 15
          }
        }).then((res) => {
          this.downurl = res.body.data[0].ad_link;
          //let old_version = getCookie('versionCode');
          cordova.getAppVersion.getVersionNumber().then(function (version) {
            //let old_version = parseInt(version.toString().replace(/\./g,''));
            let old_version = version;
            console.log(old_version, res.body.data[0].app_id);
            // 1.获取当前版本号
            // 2.获取服务器端的最新版本的数据源
            // 3.进行版本比较,如果当前的版本号与服务器的版本号不一致时,下载并安装最新的应用程序安装包
            if (res.body.data[0].app_id != old_version) {
              self.newVersionData = res.body.data[0];
              self.show = true;
              self.needUp = true;
            }
          });
        });
      },
      goUp() {
        this.toggle();
        this.tip = '敬请期待';
        $('.tips').show();
        setTimeout(function () {
          $('.tips').hide();
        }, 2000)
      },
      versionUpPackage() {
        if (!cordova.InAppBrowser) {
          return;
        }
        // toolbar=yes 仅iOS有效,提供关闭、返回、前进三个按钮
        // toolbarposition=top/bottom 仅iOS有效,决定toolbar的位置
        // closebuttoncaption=关闭 仅iOS有效
        cordova.InAppBrowser.open(this.downurl, '_system', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
      },
      //滚动
      //		handleScroll(){
      //			$(window).scroll(function(){
      //				if ($(window).scrollTop() > ($('.banner').height() - $('.banner-t').height())){
      //			        $('.banner-t').addClass('on')
      //			    }else{
      //			        $('.banner-t').removeClass('on')
      //			    }
      //		    });
      //		}

      onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
      },

      //Cordova加载完毕
      onDeviceReady() {
        //监听返回键按钮事件
        document.addEventListener("backbutton", eventBackButton, false);
      },

      //返回键点击响应
      eventBackButton() {
        //使用toast插件显示 提示信息

        window.plugins.toast.showLongCenter('再点击一次退出!');
        document.removeEventListener("backbutton", eventBackButton, false); //注销返回键
        //3秒后重新注册
        var intervalID = window.setInterval(
          function () {
            window.clearInterval(intervalID);
            document.addEventListener("backbutton", eventBackButton, false); //返回键
          },
          1000
        )
      }
    },
    created() {
      $('.banner-t').removeClass('on')
    },
    mounted() {
      $('.load').show();

      this.getAdData();
      this.getView();
      this.getNewsData();
      //this.versionUp();

      //      this.$http.get(getOpenUrl() + "ads", {
      //        headers: {
      //          'Authorization': 'Bearer ' + getCookie('token')
      //        },
      //        params: {
      //          type: 15
      //        }
      //      }).then((res) => {
      //        this.versionData = res.body.data;
      //        let expireDays = 1000 * 60 * 60;
      //        setCookie("versionCode", this.versionData[0].ad_link, expireDays);
      //      });

//			$(window).scroll(function() {
//				if($(window).scrollTop() > ($('.banner').height() - $('.banner-t').height())) {
//					$('.banner-t').addClass('on')
//				} else {
//					$('.banner-t').removeClass('on')
//				}
//				//console.log($(window).scrollTop(),$('.banner').height(),$('.banner-t').height())
//			});

    },
    activated() {
      //路由缓存 前进后退
      $('.load').hide();
      $('.tips').hide();
      this.getView();
      this.getNewsData();
//			$(window).scroll(function() {
//				if($(window).scrollTop() > ($('.banner').height() - $('.banner-t').height())) {
//					$('.banner-t').addClass('on')
//				} else {
//					$('.banner-t').removeClass('on')
//				}
//				//console.log($(window).scrollTop(),$('.banner').height(),$('.banner-t').height())
//			});
    },
    beforeRouteLeave(to, from, next) {
      //路由离开时
      console.log(to, from)
      //next(false);
      if (to.path == '/') {
        this.tip = '再点击一次退出';
        $('.tips').show();
        setTimeout(() => {
          $('.tips').hide();
        }, 1000)
        this.onLoad()
        next(false);
      } else if (to.path == '/login') {
        let isLogin = getCookie("islogin");
        if (isLogin == 1) {
          next(false);
        } else {
          next();
        }
      } else {
        next();
      }
    }
  };
</script>

<style scoped>
  .tips {
    display: none;
  }

  .version-tip {
    background: url(../../images/version.png) no-repeat top center #fff;
    background-size: 5rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 5rem;
    height: 7rem;
    z-index: 11;
    border-radius: 0.15rem;
  }

  .version-info-box p {
    color: #757575;
    font-size: 0.2rem;
    margin-bottom: 0.2rem;
  }

  .version-button button {
    width: 2rem;
    height: 0.5rem;
    border-radius: 1rem;
    background: #fff;
    border: 1px solid #36acff;
    outline: none;
  }

  .version-button a {
    width: 2rem;
    height: 0.5rem;
    border-radius: 1rem;
    background-image: -webkit-linear-gradient(0deg, #36abff, #4cd2ff);
    background-image: linear-gradient(0deg, #36abff, #4cd2ff);
    color: #fff;
    border: none;
    display: inline-block;
    line-height: 0.5rem;
    text-align: center;
    font-size: 0.25rem;
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

  a {
    color: #3d3d3d;
    font-style: normal;
  }

  .index {
    width: 100%;
  }

  .banner {
    height: 3.98rem;
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
    height: 3.98rem;
    object-fit: cover;
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
    bottom: .7rem;
    font-size: 0;
  }

  .slide .swiper-pagination .swiper-pagination-bullet {
    background: #fff;
  }

  /*登录图标*/

  .banner-t.on {
    background: #008DD3;
  }

  .banner-t.in {
    opacity: 0;
  }

  .banner-t {
    width: 100%;
    height: 0.88rem;
    position: absolute;
    /*top: 0.3rem;*/
    top: 1rem;
    z-index: 9;
  }

  .banner-user {
    width: 0.5rem;
    height: 0.5rem;
    background: url(../../images/loginpic.png) no-repeat;
    background-size: 95%;
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    z-index: 7;
  }

  .banner-user a {
    width: 0.5rem;
    height: 0.5rem;
    display: block;
  }

  #a2 {
    background: url(../../images/saoma.png) no-repeat;
    background-size: 95%;
    left: 15px !important;
  }

  #banner-user span {
    background: #ff0000;
    width: 0.04rem;
    height: 0.04rem;
    border-radius: 50%;
    display: block;
    position: absolute;
    top: 0.1rem;
    right: 0.16rem;
  }

  /*功能区*/

  .content {
    font-size: 0.2rem;
    padding-bottom: .35rem
  }

  .content:after {
    content: "";
    display: block;
    clear: both;
    overflow: hidden;
    height: 0;
  }

  .content dl {
    width: 25%;
    padding: .35rem 0 0;
    float: left;
    text-align: center;
    cursor: pointer;
  }

  .content dl dt {
    /*margin-top: 0.3rem;*/
  }

  .content dl dt img {
    height: 0.38rem;
    width: auto;
  }

  .content dl dd {
    padding-top: 0.1rem;
  }

  .line {
    height: 0.2rem;
    background: #f0f0f0;
  }

  /*列表*/

  .newsbox {
    margin-left: 0.21rem;
  }

  .newsbox p {
    height: 0.78rem;
    border-bottom: 1px solid #e0e0e0;
    line-height: 0.78rem;
    font-size: 0.22rem;
    margin-right: 0.2rem;
  }

  .tip-bottom {
    height: 2.02rem;
    display: flex;
    border-bottom: 0.01rem solid #ebebeb;
    margin-right: 0.2rem;
  }

  .tip-bottom-l {
    width: 2.11rem;
    height: 1.42rem;
    /*background: red;*/
    float: left;
    margin-top: 0.3rem;
    overflow: hidden;

  }

  .tip-bottom-l img {
    width: 100%;
    height: 100%;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
  }

  .tip-bottom-r {
    width: 3.9rem;
    height: 1.72rem;
    margin-top: 0.3rem;

    flex: 1;
  }

  .tip-bottom-r ul {
    height: 1.42rem;
    position: relative;
  }

  .tip-bottom-r .li1 {
    width: 3.6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #1a1a1a;
    /*line-height: 0.49rem;*/
    font-size: 0.22rem;
    padding: 0 0.15rem;
  }

  .tip-bottom-r .li2 {
    color: #afafaf;
    line-height: 0.31rem;
    font-size: 0.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    padding: 0 0.15rem;
    word-wrap: break-word;
    margin-top: 0.1rem;
  }

  .tip-bottom-r .li3 {
    color: #afafaf;
    line-height: 0.25rem;
    height: 0.25rem;
    font-size: 0.2rem;
    padding: 0 0.15rem;
    margin-top: 0.15rem;
    position: absolute;
    bottom: 0;
    width: calc(100% - 0.2rem);
  }

  .tip-bottom-r span {
    display: block;
    float: left;
    height: 0.25rem;
  }

  .tip-bottom-r .li3-p1 {
    background: url(../../images/fbsj.png) no-repeat;
    background-size: 0.25rem auto;
    padding-left: 0.28rem;
    float: left;
  }

  .tip-bottom-r .li3-p2 {
    background: url(../../images/hf.png) no-repeat;
    background-size: 0.25rem auto;
    padding-left: 0.28rem;
    float: right;
  }

  .tip-bottom-r .li3-p3 {
    background: url(../../images/sl.png) no-repeat;
    background-size: 0.25rem auto;
    padding-left: 0.28rem;
    margin-left: 0.21rem;
    float: right;
  }

  .btn {
    height: 0.62rem;
    width: 2.4rem;
    font-size: 0.24rem;
    background: #54c2f0;
    border-radius: 0.62rem;
    display: block;
    margin: 0 auto;
    /*margin-top: 0.35rem;*/
    /*margin-bottom: 1.33rem;*/
  }
</style>
