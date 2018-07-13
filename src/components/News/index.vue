<template>
  <div id="headed" style="overflow-y: scroll;">
    <my-header title="消息"></my-header>

    <!--<div style="padding-top: 1.4rem;">-->
    <swiper :options="swiperOptionTab" id="swiper-container2" ref="mySwiperTab">
      <swiper-slide class="active-nav body_bottom" type="1"><span>通知消息</span></swiper-slide>
      <swiper-slide class="body_bottom" type="2"><span>私信</span></swiper-slide>
    </swiper>
    <div class="page-loadmore backtop" style="position:relative;top:1.7rem;bottom:0;overflow:scroll;font-size: 0.2rem;height: calc(100% - 1.7rem);">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">

        <swiper :options="swiperOptionCon" id="swiper-container3" ref="mySwiperCon">
          <swiper-slide>
            <div class="first" type="1" contype="1">
              <router-link style="display: block;width:100%;" :to="{path:'/circular',
                query:{
                  type:1,
                  qz:1
                  //uid:member.hao_id
                }
              }" v-if="groupData">
                <div class="nav">
                  <div class="nav-user">
                    <img src="../../images/quanzi_icon.png"/>
                    <ul class="nav-ul1">
                      <li class="ul-li1">圈子通知</li>
                      <li class="ul-li2">{{groupData.data.msg}}</li>
                    </ul>
                    <ul class="nav-ul2">
                      <li class="ul-li1">{{groupData.ctime}}</li>
                      <li class="ul-li2" v-if="groupData.count>0" v-text="groupData.count>99?'99+':groupData.count"></li>
                    </ul>
                  </div>
                </div>
              </router-link>
              <!--<a href="#/notice">-->
              <router-link style="display: block;width:100%;" :to="{path:'/circular',
                query:{
                  type:2,
                  qz:2
                  //uid:member.hao_id
                }
              }" v-if="sysData">
                <div class="nav">
                  <div class="nav-user">
                    <img src="../../images/tongzhi.png"/>
                    <ul class="nav-ul1">
                      <li class="ul-li1">系统通知</li>
                      <li class="ul-li2">{{sysData.data.content}}</li>
                    </ul>
                    <ul class="nav-ul2">
                      <li class="ul-li1">{{sysData.ctime}}</li>
                      <li class="ul-li2" v-if="sysData.count>0">{{sysData.count}}</li>
                    </ul>
                  </div>
                </div>
              </router-link>
              <!--</a>-->
              <router-link style="display: block;width:100%;" :to="{path:'/notice',
                query:{
                  type:3
                }
              }" v-if="messageData">
                <div class="nav">
                  <div class="nav-user">
                    <img src="../../images/user_icon.png"/>
                    <ul class="nav-ul1">
                      <li class="ul-li1">验证通知</li>
                      <li class="ul-li2">{{messageData.content}}</li>
                    </ul>
                    <ul class="nav-ul2">
                      <li class="ul-li1">{{messageData.ctime}}</li>
                      <li class="ul-li2" v-if="messageData.count>0">{{messageData.count}}</li>
                    </ul>
                  </div>
                </div>
              </router-link>
              <router-link style="display: block;width:100%;" :to="{path:'/circular',
                query:{
                  type:4,
                  qz:3
                }
              }" v-if="workData">
                <div class="nav">
                  <div class="nav-user">
                    <img src="../../images/user_icon.png"/>
                    <ul class="nav-ul1">
                      <li class="ul-li1">答疑通知</li>
                      <li class="ul-li2">{{workData.data.msg}}</li>
                    </ul>
                    <ul class="nav-ul2">
                      <li class="ul-li1">{{workData.ctime}}</li>
                      <li class="ul-li2" v-if="workData.count>0">{{workData.count}}</li>
                    </ul>
                  </div>
                </div>
              </router-link>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="first1" type="2" contype="2" v-if="itemsAll && itemsAll.length>0">
              <!--<a href="#/sixin">-->
              <div class="nav" v-for="(data,index) in itemsAll" :key="index">
                <router-link style="display: block;width:100%;" :to="{path:'/sixin',
                    query:{
                      list_id:data.list_id,
                      uname:data.uname
                    }
                  }">
                  <div class="nav-user">
                    <div style="width: 0.68rem;height: 0.68rem;border-radius: 50%;overflow: hidden;position: relative;margin-top: 0.3rem;margin-right:0.2rem;float:left;">
                      <img :src="data.face" v-lazy="data.face"/>
                    </div>

                    <!--<img v-if="data.face==0" src="../../images/personLogo.png" />-->

                    <ul class="nav-ul1">
                      <li class="ul-li1">{{data.uname}}</li>
                      <li class="ul-li2" v-html="data.last_message.content"></li>
                    </ul>
                    <ul class="nav-ul2">
                      <li class="ul-li1">{{data.last_time}}</li>
                    </ul>
                  </div>
                </router-link>
              </div>
              <div class="loading-layer">
                <span class="spinner-holder"><img src="../../images/loading.gif" /></span>
                <div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
              </div>
              <!--</a>-->
            </div>
          </swiper-slide>
        </swiper>

      </mt-loadmore>
    </div>
    <!--</div>-->
    <div class="load" style="display:none;">
      <div class="load-container load4"><div class="loader"> <i></i></div></div>
    </div>
    <backtop></backtop>
  </div>
</template>

<script>
//    import first from './child/first.vue';
//    import second from './child/second.vue';
import {swiper,swiperSlide} from 'vue-awesome-swiper';
import {setCookie,getCookie} from '../../assets/js/cookie.js';
import {getOpenUrl,getToken} from '../../assets/js/common.js'

////var token  = getToken();
var top = ''
var status = 1,
  start = 1,
  size = 10,
  loading = false,
  end = false;
    export default{
        data(){
            return {
              data:{},
              groupData:'',
              messageData:'',
              sysData:'',
              workData:'',
              noData: '',
              items: '',
              itemsAll: [],
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
              allLoaded: false,
              scrollMode: "auto",
              topStatus: ''
            }
        },
        mounted(){
//            //路由组件的数量
//            this.boxNum =2;
          this.type = status;
          this.start = start = 1;
          this.bottom = size //默认加载10条数据
          $('.load').show();
          //loading = end = false;
          //this.getData(this.type, this.start, this.bottom);

          this.$root.eventHub.$on('newsSuccess',()=>{
            this.loadTop();
          });

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
//				$('.first').hide();
//				$('.load').show();
            return;
          });

          swiperCon.on('slideChangeEnd', function(obj){
            self.type = parseInt($('#swiper-container2 .active-nav').attr('type'));
            end       = false;
            start     = 1;
            self.getData(self.type, start, size);
            return ;
          });

          $('#swiper-container3 .swiper-wrapper').css('min-height', $(window).height() - $('div.header').outerHeight() - $('#swiper-container2').outerHeight());
//          $(window).scroll(function(){
//            if(loading || end || this.scrollTop > $(window).scrollTop()) return;
//            this.srcollTop = $(window).scrollTop();
//            if($(document).height() - $(window).height() - $(window).scrollTop() < 80) {
//              $('div[contype="' + self.type + '"] .loading-layer span').addClass('active');
//              loading = true;
//              //self.start += size;
//              self.start += 1;
//              setTimeout(() => {
//                self.getData(self.type, self.start, size);
//              }, 1500);
//            }
//          });
          //this.tabScroll();
        },
      methods: {
//        tabScroll(){
//          window.addEventListener("scroll",this.toScroll);
//        },
//        toScroll(){
//          if(loading || end || this.scrollTop > $(window).scrollTop()) return;
//          this.srcollTop = $(window).scrollTop();
//          if($(document).height() - $(window).height() - $(window).scrollTop() < 80) {
//            $('div[contype="' + this.type + '"] .loading-layer span').addClass('active');
//            loading = true;
//            //self.start += size;
//            start += 1;
//            setTimeout(() => {
//              self.getData(this.type, start, size);
//            }, 1500);
//          }
//        },
        loadTop() { // 刷新数据的操作
          top=this.scroll;
          var self = this;
          start = 1;
          setTimeout(() => {
            self.status = self.type;
            self.start = 1;

            var url = '';
            if(this.type == 1) {
              url = getOpenUrl() + "/notifyList";
              this.typeUid = '';
            } else if(this.type == 2) {
              this.typeUid = this.$route.query.uid;
              url = getOpenUrl() + '/aloneList';
            }

//              if(this.start == 0) { //第一次加载显示居中loading
//                $('.load').show();
//              }
              this.$http.get(url, {
                headers: {
                  'Authorization': 'Bearer ' +  getToken()
                },
                params: {
                  //uid: this.typeUid,
                  type: this.type,
                  page: this.start,
                  limit: size,
                  //keyword: keywords
                },
              }).then((res) => {
                var data = res.body.data;
                switch(this.type){
                  case 1:
                    this.groupData   = data.group;
                    this.messageData = data.message_data;
                    this.sysData     = data.system;
                    this.workData    = data.work;
                    self.items = data;
                    break;
                  case 2:
                    if(res.body.limit > 0) {
                      self.itemsAll.splice(0, self.itemsAll.length);
                      self.allLoaded = false;
                      $.each(data, function(key, val) {
                        self.itemsAll.push(val);
                      });
                      self.itemsAllStart = start;
                    } else {
                      self.allLoaded = true;
                      if(type == 1){
                        this.itemsEnd  = true;
                      }else if(type == 2){
                        this.itemsAllEnd  = true;
                      }
                      $('div[contype="'+this.type+'"] .loading-layer div').addClass('active');
                    }
                    break;
                }
                $('.load').hide();
              }, function(err) {
                this.$router.push({
                  path: '/login'
                });
                console.log('请求失败', err);
              });

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
          type = parseInt(type)
          var self = this;

          var url = '';
          self.start = start ? start : 1;
          if(type == 1) {
            url = getOpenUrl() + "/notifyList";
            this.typeUid = '';

            if (this.items){
              $('div[contype="'+type+'"]').parent().parent().css('height', this.itemslistH);
              return;
            }
          } else if(type == 2) {
            this.typeUid = this.$route.query.uid;
            url = getOpenUrl() + '/aloneList';

            if (this.itemsAll.length > 0 && start <= this.itemsAllStart){
              start = this.itemsAllStart;
              end   = this.itemsAllEnd;
              $('div[contype="'+type+'"]').parent().parent().css('height', this.itemsAlllistH);
              $('div[contype="'+type+'"] .loading-layer span').removeClass('active');
              if (end){
                $('div[contype="'+type+'"] .loading-layer div').addClass('active');
              }else{
                $('div[contype="'+type+'"] .loading-layer div').removeClass('active');
              }
              return;
            }
          }

          if (start == 1){//第一次加载显示居中loading
            $('.load').show();
          }
          this.$http.get(url, {
            headers: {
              'Authorization': 'Bearer ' +  getToken()
            },
            params: {
              //uid: this.typeUid,
              type: type,
              page: start,
              limit: 10,
              //keyword: keywords
            },
          }).then((res) => {
            $('div[contype="'+type+'"] .loading-layer span').removeClass('active');
            $('div[contype="'+type+'"] .loading-layer div').removeClass('active');

            $('.backtop').scroll(()=> {
              this.scroll=$('.backtop').scrollTop();
            })

            var data = res.body.data;
              switch(type){
                case 1:
                  this.groupData   = data.group;
                  this.messageData = data.message_data;
                  this.sysData     = data.system;
                  this.workData    = data.work;
                  self.items = data;
                  break;
                case 2:
                  if(res.body.limit > 0) {
                    $.each(data, function(key, val) {
                      self.itemsAll.push(val);
                    });
                    self.allLoaded = false;
                    self.itemsAllStart = start;
                  } else {
                    //self.allLoaded = true;
                  //end = true;
                  if(type == 1){
                    this.itemsEnd  = true;
                  }else if(type == 2){
                    this.itemsAllEnd  = true;
                  }
                  //self.noData = "没有更多数据"
                  $('div[contype="'+type+'"] .loading-layer div').addClass('active');
                }
                break;
              }

            loading = false;
            $('.load').hide();
            $('.first').show();
            //$('div[type="' + type + '"]').addClass('isload').show();
          },function(err) {
            this.$router.push({
              path: '/login',
              //query:{gid: res.body.data.gid}
            });
            console.log('请求失败', err);

          });
        },
      },
        components: {
            //组件的名称
          swiper,
          swiperSlide
        },
      computed: {
        swiperCon() {
          console.log(this.$refs.mySwiperCon)
          return this.$refs.mySwiperCon.swiper
        },
        swiperTab() {
          return this.$refs.mySwiperTab.swiper
        },
      },
      created(){
        this.type = 1;//默认加载数据类型
        this.end  = end = false;//是否加载完成
        this.loading = loading = false;//是否正在加载
        this.start   = 1;//数据开始条数
        this.getData(this.type, this.start, size);
      },
      watch: {
        //监听
      },
      updated() {
        var self      = this;
        if (self.type == 1){
          this.itemslistH = $('div[contype="'+this.type+'"]').parent().parent().height();
          end          = this.itemsEnd;
        }else if(self.type == 2){
          this.itemsAlllistH = $('div[contype="'+this.type+'"]').parent().parent().height();
          end          = this.itemsAllEnd;
        }
      },
      beforeDestroy(){
        window.removeEventListener("scroll",this.toScroll);
      },
      activated(){
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
    .wl{margin: 0 auto;width: 6.4rem;overflow: hidden;padding-top: 1.6rem;}
    .first{padding: 0 0.2rem;}
    .header {
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 10!important;
    }
    #headed{
      width: 100%;
      overflow: hidden;
      float:left;
    }
    .taball{border-bottom: 0.01rem solid #ebebeb;    position: fixed;
      top: 0.88rem;
      width: 100%;}
    .tab{
      width:6rem;
      overflow: hidden;
      padding: 0;
      margin: 0 auto;
      height: 0.76rem;
      line-height: 0.76rem;

    }
    #swiper-container2 {
      border-bottom: 1px solid #ccc;
      overflow: visible;
      background: #Fff;
      z-index: 6;
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
      height:0.73rem
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
    #swiper-container2{border-bottom: 1px solid #ccc;overflow:visible;    position: fixed;background: #Fff;z-index: 6;top:1rem;width: 100%;}
    .tab li{
      float: left;
      list-style: none;
      width: 50%;
      text-align: center;
    }
    .body_bottom{
      /*height: 0.73rem;*/
      margin: 0 auto;
      text-align: center;
      font-size: 0.22rem;
    }
    .active_color{
      color: #008dd3;
      border-bottom: 0.03rem solid #008dd3 !important;
    }
    .shift {
      transition-property: margin-left;
      transition-duration: 1s;
    }

    /*.first{padding-bottom:0.98rem;}*/
    .first .nav{}
    .first .nav-user{height:1.28rem;width:100%;border-bottom:0.01rem solid #ebebeb;}
    .first .nav-user img{width:0.68rem;height:0.68rem;border-radius:50%;display:block;float:left;margin:0.3rem 0.18rem 0 0.1rem;}

    .first .nav-ul1{float:left;margin-top:0.26rem;}
    .first .nav-ul1 .ul-li1{line-height:0.39rem;font-size:0.22rem;color:#292929;}
    .first .nav-ul1 .ul-li2{line-height:0.37rem;font-size:0.2rem;color:#949494;}

    .first .nav-ul2{float:right;margin-top:0.26rem;}
    .first .nav-ul2 .ul-li1{line-height:0.39rem;font-size:0.2rem;color:#949494;}
    .first .nav-ul2 .ul-li2
    {
      height: 0.35rem;
      line-height: 0.35rem;
      width: 0.35rem;
      text-align: center;
      font-size: 0.14rem;
      border: 1px solid #0892d5;
      border-radius: 50%;
      color: #54c2f0;
      float: right;
      margin-right: 0.13rem;
      margin-top: 0.07rem;
    }


    /*.first1{padding-bottom:0.98rem;}*/
    .first1 .nav{padding: 0 0.2rem;}
    .first1 .nav-user{height:1.28rem;width:100%;border-bottom:0.01rem solid #ebebeb;overflow: hidden;}
    .first1 .nav-user img{width:100%;height: 100%;border-radius: 50%;object-fit: cover;
      /*position:absolute;top:50%;transform:translateY(-50%);*/
      display:block;float:left;}

    .first1 .nav-ul1{float:left;margin-top:0.26rem;}
    .first1 .nav-ul1 .ul-li1{line-height:0.39rem;font-size:0.22rem;color:#292929;}
    .first1 .nav-ul1 .ul-li2{line-height:0.37rem;font-size:0.2rem;color:#949494;width:4rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      /*padding: 0 0.15rem;*/
      word-wrap: break-word
    }

    .first1 .nav-ul2{float:right;margin-top:0.26rem;}
    .first1 .nav-ul2 .ul-li1{line-height:0.39rem;font-size:0.2rem;color:#949494;}
  </style>

