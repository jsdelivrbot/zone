<template>
  <div id="headed" style="overflow-y: scroll;">
    <my-header title="我的收藏"></my-header>
    <!--<div style="padding-top:1.4rem">-->
    <swiper :options="swiperOptionTab" id="swiper-container2" ref="mySwiperTab">
      <swiper-slide class="active-nav body_bottom" type="1"><span>圈子</span></swiper-slide>
      <swiper-slide class="body_bottom" type="2"><span>帖子</span></swiper-slide>
      <swiper-slide class="body_bottom" type="3"><span>文章</span></swiper-slide>
      <swiper-slide class="body_bottom" type="4"><span>资源</span></swiper-slide>
    </swiper>
    <div class="page-loadmore backtop" style="position:relative;top:1.7rem;bottom:0;overflow:scroll;font-size: 0.2rem;height: calc(100% - 1.7rem);">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">

        <swiper :options="swiperOptionCon" id="swiper-container3" ref="mySwiperCon">
          <swiper-slide>

            <div class="first" type="1" contype="1" v-if="items && items.length>0">
              <div class="nav" v-for="(data,index) in items" :key="index">
                <!--<a href="#/listcircle">-->
                <div class="nav-bottom">
                  <div class="tip-bottom">
                    <router-link :to="{path:'/listcircle',query:{
                          gid:data.id,
                          id:data.id
                      }}">
                      <div class="tip-bottom-l">
                        <img :src="data.logo" v-lazy="data.logo" />
                      </div>
                    </router-link>
                    <div class="tip-bottom-r">
                      <router-link :to="{path:'/listcircle',query:{
                            gid:data.id,
                            id:data.id
                          }}">
                        <div class="nav-left">
                          <ul>
                            <li class="li1">{{data.name}}</li>
                            <li class="li2">{{data.intro}}</li>
                            <li class="li3">
                              <span class="li3-p1">成员数：</span>
                              <span class="li3-p2">{{data.membercount}}</span>
                            </li>
                          </ul>
                        </div>
                      </router-link>
                      <div class="nav-right">
                        <li class="li4" @click="joinQz(data.id,data.add_time)" :id="'join_'+data.id" v-show='data.add_time==0'>加入</li>
                      </div>
                    </div>
                  </div>
                </div>
                <!--</a>-->
              </div>
              <div class="loading-layer">
                <span class="spinner-holder"><img src="../../../images/loading.gif" /></span>
                <div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="first" type="2" contype="2" v-if="itemsAll && itemsAll.length>0">
              <div class="nav1" v-for="(data,index) in itemsAll" :key="index">
                <router-link :to="{path:'/vote',query:{
                    id:data.id,
                    gid:data.gid
                }}">
                  <!--<p v-if="data.face==0" class="li2"><img src="../../../images/personLogo.png"/></p>-->
                  <p class="li2"><img :src="data.face" v-lazy="data.face" alt=""></p>
                  <ul>
                    <li class="li1" style="color: #292929;">{{data.title}}</li>
                    <li class="li4">{{data.uname}}</li>
                    <li class="li5"><span class="sp1">{{data.addtime}}</span><span class="sp2">{{data.viewcount}}</span><span class="sp3">{{data.replycount}}</span></li>
                  </ul>
                </router-link>
              </div>
              <div class="loading-layer">
                <span class="spinner-holder"><img src="../../../images/loading.gif" /></span>
                <div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="first" type="3" contype="3" v-if="itemsDoing && itemsDoing.length>0">
              <div class="nav2">
                <ul v-for="(data,index) in itemsDoing" :key="index">
                  <router-link :to="{path:'/info1',query:{
                    id:data.document_id
                  }}">
                    <li class="li1"><img :src="data.thumb" v-lazy="data.thumb"/></li>
                    <li class="li2" style="color:#000;">{{data.title}}</li>
                    <li class="li3" v-html="data.content"></li>
                    <li class="li4"><span class="sp1">{{data.mtime}}</span><span class="sp2">{{data.views}}</span></li>
                  </router-link>
                </ul>
              </div>
              <div class="loading-layer">
                <span class="spinner-holder"><img src="../../../images/loading.gif" /></span>
                <div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="first1" type="4" contype="4">
              <div class="tip-bottom" v-for="(list,index) in itemsZy" :key="index">
                <router-link :to="'/details?id='+list.ziy_id+'&type='+list.catid" style="display: flex;color: #242424;">
                  <div class="tip-bottom-l">
                    <img :src="list.thumb" v-lazy="list.thumb" />
                  </div>
                  <div class="tip-bottom-r">
                    <ul>
                      <li class="li1">{{list.title}}</li>
                      <li class="li3">
                        <span class="li3-p1">{{list.mtime}}</span>
                        <span class="li3-p3">{{list.msgnum}}</span>
                        <span class="li3-p2">{{list.views}}</span>
                      </li>
                    </ul>
                  </div>
                </router-link>
              </div>
              <div class="loading-layer">
                <span class="spinner-holder"><img src="../../../images/loading.gif" /></span>
                <div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
              </div>
            </div>
          </swiper-slide>
        </swiper>

      </mt-loadmore>
    </div>
    <!--</div>-->
    <div class="yzall" v-show="show">
      <p class="forget">
        <span class="sp1" style="color:#008dd3">圈子需要验证</span>
        <span class="sp2">
					<input type="text" ref="val"/>
				</span>
        <span class="sp3">
					<input type="button" name="" id="" value="提交" @click="submit()"/>
				</span>
      </p>

    </div>
    <div class="load" style="display:none;">
      <div class="load-container load4"><div class="loader"> <i></i></div></div>
    </div>
    <div class="mark" v-show="show" @click="toggle()"></div>
    <pop style="text-align: center" class="tip" :title="tip"></pop>
    <backtop></backtop>
  </div>
</template>

<script>
  import {swiper,swiperSlide} from 'vue-awesome-swiper';
  import {setCookie,getCookie} from '../../../assets/js/cookie.js';
  import {getOpenUrl,getToken} from '../../../assets/js/common.js'
  var top = ''
  var status = 1, start = 1, size = 7, loading = false, end = false;

	export default {
		data() {
				return {
          noData: '',
          items: [],
          tip:'',
          show:false,
          itemsAll: [],
          itemsDoing: [],
          itemsZy: [],
          //itemDone: [],
          swiperOptionTab: {
            watchSlidesProgress: true
            ,watchSlidesVisibility: true
            ,notNextTick: true
            ,slidesPerView : 3
          },
          swiperOptionCon: {
            autoHeight: true,
            notNextTick: true
          },
          border1:"1px solid #ebebeb",
          borderNone:0,
          allLoaded: false,
          scrollMode: "auto",
          topStatus: ''
				}
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
//            switch(this.type){
//              case 1:
//                if (this.itemsStart > 0) {
//                  start = this.itemsStart;
//                }
//                break;
//              case 2:
//                if (this.itemsAllStart > 0) {
//                  start = this.itemsAllStart;
//                }
//                break;
//              case 3:
//                if (this.itemsDoingStart > 0) {
//                  start = this.itemsDoingStart;
//                }
//                break;
//              case 4:
//                if (this.itemsZyStart > 0) {
//                  start = this.itemsZyStart;
//                }
//                break;
//            }
//            start += 1;
//            setTimeout(() => {
//              this.getData(this.type, start, size);
//            }, 1500);
//          }
//        },
        loadTop() { // 刷新数据的操作
          top=this.scroll;
          var self = this;
          setTimeout(() => {
            this.start = 1;
            this.$http.get(getOpenUrl() + "/user/collect", {
              headers: {
                "Authorization": "Bearer " + getToken()
              },
              params:{
                type: this.type,
                page: start,
                limit: size
              },
            }).then((res)=>{
              $('div[contype="'+this.type+'"] .loading-layer span').removeClass('active');
              $('div[contype="'+this.type+'"] .loading-layer div').removeClass('active');
              var data = res.body.data;
              if (res.body.count > 0){
                switch(self.type){
                  case 1:
                    if(res.body.code=='0000'){
                      self.items.splice(0, self.items.length);
                      $.each(data, function(key, val){
                        self.allLoaded = false;
                        self.items.push(val);
                        self.itemsStart = start;
                      });
                    }
                    break;
                  case 2:
                    if(res.body.code=='0000'){
                      self.itemsAll.splice(0, self.itemsAll.length);
                      $.each(data, function(key, val){
                        self.allLoaded = false;
                        self.itemsAll.push(val);
                        self.itemsAllStart = start;
                      });
                    }
                    break;
                  case 3:
                    if(res.body.code=='0000'){
                      self.itemsDoing.splice(0, self.itemsDoing.length);
                      $.each(data, function(key, val){
                        self.allLoaded = false;
                        self.itemsDoing.push(val);
                        self.itemsDoingStart = start;
                      });
                    }
                    break;
                  case 4:
                    if(res.body.code=='0000'){
                      self.itemsZy.splice(0, self.itemsZy.length);
                      $.each(data, function(key, val){
                        self.allLoaded = false;
                        self.itemsZy.push(val);
                        self.itemsZyStart = start;
                      });
                    }
                    break;
                }
              }else{
                //end = true;
                self.allLoaded = true;
                if(type == 1){
                  this.itemsEnd  = true;
                }else if(type == 2){
                  this.itemsAllEnd  = true;
                }else if(type == 3){
                  this.itemsDoingEnd  = true;
                }else if(type == 4){
                  this.itemsZyEnd  = true;
                }
                //self.noData = "没有更多数据"
                $('div[contype="'+type+'"] .loading-layer div').addClass('active');
              }
              loading = false;
              $('.load').hide();
            },function(err) {
              this.$router.push({
                path: '/login',
              });
              console.log('请求失败', err);
            });

            self.allLoaded = false;
            self.$refs.loadmore.onTopLoaded();
          }, 1500);
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
        toggle() {
          this.show = !this.show;
        },
        submit() {
          //this.idData = [];
          this.$http.post(getOpenUrl() + "joinValidateGroup", {
            gids: this.idData,
            text: this.$refs.val.value
          }).then((res) => {
            if(res.body.code == 0) {
              this.$root.eventHub.$emit('tjqzSuccess');
              this.tip = res.body.msg;
              $('.tip').show();
              setTimeout(function(){
                $('.tip').hide();
              },1000)
              $('#join_'+this.id).hide();
              this.show = false;
            }
          })
        },
        joinQz(id,time){
          this.idData = [];
          this.idData.push(id);
          console.log(this.idData);
          if(time==0){
            this.toggle();
          }else{
            this.$http.post(getOpenUrl() + "/joingroup", {
              gids:[id]
            }).then((res)=>{
              if(res.body.status==1){
                this.$root.eventHub.$emit('tjqzSuccess');
                $('#join_'+this.id).hide();
              }else{
                this.tip = res.body.error_description;
                $('.tip').show();
                setTimeout(function(){
                  $('.tip').hide();
                },1000)
              }
            });
          }
        },
        getData(type, start, size){
//          if (status != type){
//            //this.items = [];
//            end        = false;
//            loading    = false;
//          }
          top=0
          this.$store.commit('HOMESTOPF',top)
          $(".backtop").animate({"scrollTop":this.scroll},0)

          status = type;
          type = parseInt(type)
          var self   = this;

          self.start = start ? start : 1;
          if(type==1){
//            if (this.items.length > 0){
//              return;
//            }
            if (this.items.length > 0 && start <= this.itemsStart){
              start = this.itemsStart;
              end   = this.itemsEnd;
              loading = false;
              $('div[contype="'+type+'"]').parent().parent().css('height', this.itemslistH);
              $('div[contype="'+type+'"] .loading-layer span').removeClass('active');
              if (end){
                $('div[contype="'+type+'"] .loading-layer div').addClass('active');
              }else{
                $('div[contype="'+type+'"] .loading-layer div').removeClass('active');
              }
              return;
            }
          }else if(type==2){
//            if (this.itemsAll.length > 0){
//              return;
//            }
            if (this.itemsAll.length > 0 && start <= this.itemsAllStart){
              start = this.itemsAllStart;
              end   = this.itemsAllEnd;
              loading = false;
              $('div[contype="'+type+'"]').parent().parent().css('height', this.itemsAlllistH);
              $('div[contype="'+type+'"] .loading-layer span').removeClass('active');
              if (end){
                $('div[contype="'+type+'"] .loading-layer div').addClass('active');
              }else{
                $('div[contype="'+type+'"] .loading-layer div').removeClass('active');
              }
              return;
            }
          }else if(type==3){
//            if (this.itemDoing.length > 0){
//              return;
//            }
            if (this.itemsDoing.length > 0 && start <= this.itemsDoingStart){
              start = this.itemsDoingStart;
              end   = this.itemsDoingEnd;
              loading = false;
              $('div[contype="'+type+'"]').parent().parent().css('height', this.itemsDoinglistH);
              $('div[contype="'+type+'"] .loading-layer span').removeClass('active');
              if (end){
                $('div[contype="'+type+'"] .loading-layer div').addClass('active');
              }else{
                $('div[contype="'+type+'"] .loading-layer div').removeClass('active');
              }
              return;
            }
          }else if(type==4){
//            if (this.itemDoing.length > 0){
//              return;
//            }
            if (this.itemsZy.length > 0 && start <= this.itemsZyStart){
              start = this.itemsZyStart;
              end   = this.itemsZyEnd;
              loading = false;
              $('div[contype="'+type+'"]').parent().parent().css('height', this.itemsZylistH);
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
          this.$http.get(getOpenUrl() + "/user/collect", {
            headers: {
              "Authorization": "Bearer " + getToken()
            },
            params:{
              type: type,
              page: start,
              limit: size
            },
          }).then((res)=>{
            $('div[contype="'+type+'"] .loading-layer span').removeClass('active');
            $('div[contype="'+type+'"] .loading-layer div').removeClass('active');

            $('.backtop').scroll(()=> {
              this.scroll=$('.backtop').scrollTop();
            })

            var data = res.body.data;
            if (res.body.count > 0){
              $.each(data, function(key, val){
                switch(type){
                  case 1:
                    if(res.body.code=='0000'){
                      self.items.push(val);
                      self.itemsStart = start;
                    }
                    break;
                  case 2:
                    if(res.body.code=='0000'){
                      self.itemsAll.push(val);
                      self.itemsAllStart = start;
                    }
                    break;
                  case 3:
                    if(res.body.code=='0000'){
                      self.itemsDoing.push(val);
                      self.itemsDoingStart = start;
                    }
                    break;
                  case 4:
                    if(res.body.code=='0000'){
                      self.itemsZy.push(val);
                      self.itemsZyStart = start;
                    }
                    break;
                }
              });
            }else{
              //end = true;
              if(type == 1){
                this.itemsEnd  = true;
              }else if(type == 2){
                this.itemsAllEnd  = true;
              }else if(type == 3){
                this.itemsDoingEnd  = true;
              }else if(type == 4){
                this.itemsZyEnd  = true;
              }
              //self.noData = "没有更多数据"
              self.allLoaded = false;
              $('div[contype="'+type+'"] .loading-layer div').addClass('active');
            }
            loading = false;
            $('.load').hide();
          },function(err) {
            this.$router.push({
              path: '/login',
              //query:{gid: res.body.data.gid}
            });
            console.log('请求失败', err);

          });

        },
//        loadMore(){
//          console.log('loadMore')
//          setTimeout(() => {
//            done()
//          }, 1500)
//        }
			},
			mounted() {
        //获取全部答疑
        this.type   = status;
        this.start  = start;
        this.bottom = size //默认加载6条数据
        $('.load').show();
        //this.getData(this.type, this.start, this.bottom);

        var swiperTab = this.swiperTab;
        var swiperCon = this.swiperCon;
        var self      = this;
        swiperTab.on('tap', function(obj){
          swiperCon.slideTo(obj.clickedIndex);
        });

        swiperCon.on('slideChangeStart', function(obj){
          $('#swiper-container2 .active-nav').removeClass('active-nav')
          var activeNav = $('#swiper-container2 .swiper-slide').eq(obj.activeIndex).addClass('active-nav');
          if (!activeNav.hasClass('swiper-slide-visible')){
            if (activeNav.index()>swiperTab.activeIndex){
              var thumbsPerNav = Math.floor(swiperTab.width/activeNav.width())-1
              swiperTab.slideTo(activeNav.index()-thumbsPerNav)
            }else{
              swiperTab.slideTo(activeNav.index())
            }
          }
          return ;
        });

        swiperCon.on('slideChangeEnd', function(obj){
          loading = false;
          self.type = parseInt($('#swiper-container2 .active-nav').attr('type'));
          end       = false;
          start     = 1;
          $('#swiper-container3 .swiper-wrapper').css('height', 0);
          self.getData(self.type, start, size);
          return ;
        });

        $('#swiper-container3 .swiper-wrapper').css('min-height', $(window).height() - $('div.header').outerHeight() - $('#swiper-container2').outerHeight());
//        $(window).scroll(function(){
//          if(loading || end || this.scrollTop > $(window).scrollTop()) return;
//          this.srcollTop = $(window).scrollTop();
//          if($(document).height() - $(window).height() - $(window).scrollTop() < 80) {
//            $('div[contype="' + self.type + '"] .loading-layer span').addClass('active');
//            loading = true;
//            //self.start += size;
//            self.start += 1;
//            setTimeout(() => {
//              self.getData(self.type, self.start, size);
//            }, 1500);
//          }
//        });
        //this.tabScroll();
			},
      components: {
        //组件
        swiper,
        swiperSlide
      },
      computed: {
        swiperTab() {
          return this.$refs.mySwiperTab.swiper
        },
        swiperCon() {
          return this.$refs.mySwiperCon.swiper
        }
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
      }else if(self.type == 3){
        this.itemsDoinglistH = $('div[contype="'+this.type+'"]').parent().parent().height();
        end          = this.itemsDoingEnd;
      }else if(self.type == 4){
        this.itemsZylistH = $('div[contype="'+this.type+'"]').parent().parent().height();
        end          = this.itemsZyEnd;
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
  .tip{display: none;}
  .wl {
    margin: 0 auto;
    width: 6.4rem;
    overflow: hidden;
    position: absolute;
    top: 2.06rem;
  }

  .first {
    /*float: left;*/
    /*width: 6.4rem;*/
    padding: 0 0.2rem;
  }

  .header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10!important;
  }

  #headed {
    width: 100%;
    /*overflow: hidden;*/
    float: left;
  }

  #swiper-container2{border-bottom: 1px solid #ccc;overflow:visible;    position: fixed;background: #Fff;z-index: 6;top: 1rem;width: 100%;}
  #swiper-container2 .swiper-slide{
    line-height:0.7rem !important;
    color:#666 !important;
    font-size:0.22rem !important;
    background:#fff !important;
    text-align: center;
  }
  #swiper-container2 .active-nav{
    background:#fff !important;
  }
  #swiper-container2 .active-nav span{
    display:inline-block;
    border-bottom: 2px solid #008dd3;
    color: #008dd3 !important;
    margin-bottom: -1px;
  }
  .swiper-slide{
    color:#000;
    /*line-height:300px;*/
    /*text-align:center;*/
    /*font-size:50px;*/
  }
  #swiper-container2 .swiper-slide.shux:after{
    content:"";
    position:absolute;
    top:25%;
    right:0;
    height:50%;
    width:1px;
    background:#ccc;
  }

  .taball {
    border-bottom: 0.01rem solid #ebebeb;
    position: fixed;
    top: 1.28rem;
    width: 100%;
    background: #fff;
    z-index: 1;
  }

  .tab {
    width: 6rem;
    overflow: hidden;
    padding: 0;
    margin: 0 auto;
    height: 0.76rem;
    line-height: 0.76rem;
  }

  .tab li {
    float: left;
    list-style: none;
    width: 33.3%;
    text-align: center;
  }

  .body_bottom {
    /*height: 0.73rem;*/
    margin: 0 auto;
    text-align: center;
    font-size: 0.22rem;
  }

  .active_color {
    color: #008dd3;
    border-bottom: 0.03rem solid #008dd3 !important;
  }

  .shift {
    transition-property: margin-left;
    transition-duration: 1s;
  }

  .first {
    /*padding-bottom: 0.98rem;*/
  }
  .first .nav {
    /*width: 6rem;*/
    /*margin: 0 auto;*/
  }

  .first .nav-bottom {
    padding-bottom: 0.3rem;
  }

  .first .tip-bottom {
    /*width: 6rem;*/
    /*margin: 0 auto;*/
    display: flex;
    padding-bottom: 0.2rem;
    border-bottom: 0.01rem solid #e0e0e0;
  }

  .first1 .tip-bottom a {
    width: 100%;
    padding: 0 0.2rem;
  }

  .first .tip-bottom-l {
    width: 2.11rem;
    height: 1.42rem;
    float: left;
    margin-top: 0.3rem;
    border-radius: 0.1rem;
    overflow: hidden;
  }

  .first .tip-bottom-l img {
    width: 2.11rem;
    height: 1.42rem;
  }

  .first .tip-bottom-r {
    width: 3.9rem;
    height: 1.42rem;
    margin-top: 0.3rem;
    flex: 1;

    position: relative;
    margin-left: 0.15rem;
  }

  .first .nav-left {
    float: left;
  }

  .first .tip-bottom-r ul {
    height: 1.42rem;
  }

  .first .tip-bottom-r .li1 {
    line-height: 0.49rem;
    font-size: 0.22rem;
    color: #008dd3;
  }

  .first .tip-bottom-r .li2 {
    width: 2.5rem;
    line-height: 0.31rem;
    font-size: 0.22rem;
    color: #afafaf;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .first .tip-bottom-r .li3 {
    line-height: 0.18rem;
    height: 0.18rem;
    font-size: 0.16rem;
    margin-top: 0.15rem;
    color: #afafaf;
    position: absolute;
    bottom: 0;
  }

  .first .tip-bottom-r span {
    display: block;
    float: left;
    height: 0.18rem;
  }

  .first .nav-right {
    float: right;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .first .nav-right .li4 {
    width: 0.96rem;
    height: 0.46rem;
    line-height: 0.46rem;
    text-align: center;
    float: right;
    color: #008dd3;
    border: 1px solid #008dd3;
    border-radius: 0.23rem;
    font-size: 0.2rem;
  }


  .nav1{}
  .nav1 ul{margin-top: 0.26rem;overflow: hidden;padding-bottom: 0.25rem;border-bottom: 0.01rem solid #ebebeb;}
  .nav1 ul li{float:left;width: 100%;}
  .nav1 .li1{line-height:0.41rem;font-size:0.22rem;margin-left: 0.24rem;}
  .nav1 .li2{height:0.62rem;width:0.62rem;
    /*position: relative;overflow:hidden;*/
    border-radius:50%;margin-top: 0.06rem;float: left;}
  .nav1 .li2 img{width:100%;height: 100%;border-radius: 50%;object-fit: cover;
    /*position:absolute;top:50%;-webkit-transform: translateY(-50%);-moz-transform: translateY(-50%);-ms-transform: translateY(-50%);-o-transform: translateY(-50%);transform: translateY(-50%);*/
  }
  .nav1 .li3{height:1.24rem;-bottom:0.01rem solid #e0e0e0;width:4.87rem;float:right;position:relative;}
  .nav1 .p{height:0.69rem;position: absolute;top: 50%;-webkit-transform: translateY(-50%);-moz-transform: translateY(-50%);-ms-transform: translateY(-50%);-o-transform: translateY(-50%);transform: translateY(-50%);}
  .nav1 .li3 .p1{font-size:0.26rem;line-height:0.38rem;}
  .nav1 p{font-size:0.20rem;}
  .nav1 .li3 .p2{float:left;line-height:0.31rem;}
  .nav1 .li3 .p3{margin-left:0.3rem;}
  .nav1 .li4{line-height: 0.38rem;color: #54c2f0;font-size:0.2rem;margin-left: 0.24rem;}
  .nav1 .li5 span{float: left;margin-left: 0.24rem;}
  .nav1 .li5{line-height: 0.3rem;color: #949494;font-size: 0.2rem;}
  .nav1 .sp1{background: url(../../../images/fbsj.png) no-repeat 0 50%;background-size: 0.18rem 0.18rem;padding-left: 0.3rem;}
  .nav1 .sp2{background: url(../../../images/sl.png) no-repeat 0 50%;background-size: 0.19rem 0.19rem;padding-left: 0.22rem;}
  .nav1 .sp3{background: url(../../../images/hf.png) no-repeat 0 50%;background-size: 0.20rem 0.18rem;padding-left: 0.26rem;}

  .nav2{}
  .nav2 ul{box-shadow: 0 0 0.05rem #dedede;margin-bottom: 0.23rem;}
  .nav2 ul li{padding: 0 0.2rem;}
  .nav2 .li1{height: 2.6rem;padding: 0;}
  .nav2 .li1 img{width:100%;height: 2.6rem;display: block;border: 0;}
  .nav2 .li2{font-size: 0.22rem;line-height: 0.41rem;margin-top: 0.13rem;}
  .nav2 .li3{font-size: 0.2rem;line-height: 0.29rem;color: #a8a8a8;margin-top: 0.04rem;}
  .nav2 .li4{height:0.59rem;overflow: hidden;}
  .nav2 .li4 span{float: left;line-height: 0.59rem;}
  .nav2 .li4{line-height: 0.3rem;color: #949494;font-size: 0.2rem;}
  .nav2 .sp1{background: url(../../../images/fbsj.png) no-repeat 0 50%;background-size: 0.18rem 0.18rem;padding-left: 0.3rem;}
  .nav2 .li4 .sp2{background: url(../../../images/sl.png) no-repeat 0 50%;background-size: 0.19rem 0.19rem;padding-left: 0.22rem;float: right;}

  .dl{float: left;}

  .yzall .forget {
    text-align: center;
    line-height: 1.25rem;
    z-index: 13;
    margin-bottom: 0.05rem;
    border-radius: 0.1rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*box-shadow: 0 0 0.1rem #000;*/
    /*background: rgba(0, 0, 0, 0.7);*/
    background: #fff;
    padding: 0rem 0.2rem;
    color: #fff;
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
    z-index: 10;
    background: rgba(0,0,0,0.3);
  }

  .yzall .sp2 {
    border: 1px solid #e0e0e0;
    display: block;
    border-radius: 0.1rem;
  }

  .yzall .sp2 input {
    display: block;
    width: 100%;
    height: 0.5rem;
    padding-left: 0.2rem;
  }

  .yzall .sp3 {
    width: 1.4rem;
    background: #fff;
    display: block;
    margin: 0 auto;
    text-align: center;
    margin-top: 0.2rem;
    border-radius: 0.1rem;
  }

  .yzall .sp3 input {
    display: block;
    width: 100%;
    color: #008DD3;
    height: 0.5rem;
    border: 1px solid #008DD3;
    border-radius: 0.28rem;
  }




  .first1 .tip-bottom {
    display: flex;
  }

  .first1 .tip-bottom-l {
    /*width: 2.11rem;*/
    height: 1.42rem;
    float: left;
    margin-top: 0.3rem;
  }

  .first1 .tip-bottom-l img {
    width: 2.11rem;
    height: 1.42rem;
    border: 0;
    display: block;
  }

  .first1 .tip-bottom-r {
    /*width: 3.9rem;*/
    margin-top: 0.3rem;
    flex: 1;
  }

  .first1 .tip-bottom-r ul {
    height: 1.42rem;
    border-bottom: 0.01rem solid #ebebeb;
    margin-left: 0.24rem;
  }

  .first1 .tip-bottom-r .li1 {
    line-height: 0.47rem;
    font-size: 0.22rem;
    color: #008dd3;
  }

  .first1 .tip-bottom-r .li3 {
    line-height: 0.18rem;
    height: 0.18rem;
    font-size: 0.2rem;
    margin-top: 0.47rem;
    color: #242424;
  }

  .first1 .tip-bottom-r span {
    display: block;
    float: left;
    height: 0.18rem;
  }

  .first1 .tip-bottom-r .li3-p1 {
    background: url(../../../images/fbsj.png) no-repeat;
    background-size: 0.18rem 0.18rem;
    padding-left: 0.28rem;
    float: left;
  }

  .first1 .tip-bottom-r .li3-p2 {
    background: url(../../../images/sl.png) no-repeat;
    background-size: 0.18rem 0.18rem;
    padding-left: 0.28rem;
    float: right;
  }

  .first1 .tip-bottom-r .li3-p3 {
    background: url(../../../images/hf.png) no-repeat;
    background-size: 0.18rem 0.18rem;
    padding-left: 0.28rem;
    margin-left: 0.21rem;
    float: right;
  }
</style>
