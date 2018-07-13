<template>
  <div id="headed" style="overflow-y: scroll;">
    <!--<div class="header">-->
    <!--<div class="headerall">-->
    <!--&lt;!&ndash;<a href="javascript:history.back(-1);" class="a1"></a>&ndash;&gt;-->
    <!--<a @click="back" class="a1"></a>-->
    <!--<span class="forget">足迹</span>-->
    <!--</div>-->
    <!--</div>-->
    <my-header title="足迹"></my-header>

    <!--<div style="padding-top: 1.4rem;">-->
    <swiper :options="swiperOptionTab" id="swiper-container2" ref="mySwiperTab">
      <swiper-slide class="active-nav body_bottom" type="topic"><span>帖子浏览记录</span></swiper-slide>
      <swiper-slide class="body_bottom" type="ziyuan"><span>资源浏览记录</span></swiper-slide>
      <swiper-slide class="body_bottom" type="news"><span>新闻浏览记录</span></swiper-slide>
    </swiper>
    <div class="page-loadmore backtop" style="position:relative;top:1.7rem;bottom:0;overflow:scroll;font-size: 0.2rem;height: calc(100% - 1.7rem);">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">

        <swiper :options="swiperOptionCon" id="swiper-container3" ref="mySwiperCon">
          <swiper-slide>
            <div class="firsta" type="topic" contype="topic">
              <div v-for="(list,index) in items" :key="index">
                <!--显示多张图片-->
                <div class="tip-bottom-all21a" v-if="list.attach.length > 1">

                  <div class="tip-bottom21a">
                    <div class="tip-bottom-l1a">
                      <ul class="tip-bottom-l-t1a">
                        <router-link :to="'/yesfriend?uid='+list.uid">
                          <li class="li1a">
                            <img :src="list.face==0?'../../../static/loading.png':list.face" />
                          </li>
                        </router-link>
                        <router-link :to="'/vote?id='+list.id+'&gid='+gid">
                          <div style="width: 4.3rem;float: left;padding-top: 0.1rem;">
                            <li class="li2a" style="width: 100%;height: 0.3rem;line-height: 0.3rem;text-align: left;">{{list.uname}}</li>
                            <li style="height: 0.3rem;margin-left: 0.1rem;">
                              <img :src="user.icon" alt="" style="height:0.3rem;float:left;margin-right: 0.1rem" v-for="(user,index) in list.usergroup" v-if="user.icon!=''">
                            </li>
                          </div>
                        </router-link>
                        <li class="li4a">{{list.dateline}}</li>

                      </ul>
                      <div style="clear: both;"></div>
                      <!---->
                      <router-link :to="'/vote?id='+list.topic_id+'&gid='+list.gid">
                        <div
                          style="display: block;width: calc(100% - .4rem);margin-left:0.1rem;margin-top:.2rem;float: left;word-break: break-word;font-size:.22rem;line-height:.3rem;text-align:left;color: #242424;"
                          :style="'color:'+list.highstyle">
                          <!--<input type="checkbox" name="" id="" value="" />-->
                          <span v-text="list.topic_type==1?toupiao:((list.topic_type==2)?huodong:'')"></span>
                          <div class="li5a" style="float: left;">
                            <span class="p1 mt50 p2" v-if="list.dist>0" style="margin:0.03rem  0.05rem 0;"></span>
                            <span class="p1 mt6 p3" v-if="list.top>0" style="margin:0.03rem  0.05rem 0;"></span>
                            <span class="p1 mt6 p4" v-if="list.attach.length>0" style="margin:0.03rem  0.05rem 0;"></span>
                          </div>
                          {{list.title}}
                        </div>
                      </router-link>
                    </div>

                    <div class="tip-bottom-r1a">
                      <router-link :to="'/vote?id='+list.topic_id+'&gid='+list.gid" style="height: 1.42rem;display: block;">
                        <div class="tip-bottom-r-imga">
                          <div class="tip-bottom-r-all1a">
                            <swiper :options="swiperOptionImg" id="swiper-container2" ref="mySwiperImg" style="position: inherit;">
                              <swiper-slide v-for="(img, index) in list.attach" :cid="list.id">
                                <img :src="img" v-lazy="img"/>
                              </swiper-slide>
                            </swiper>
                          </div>
                        </div>
                      </router-link>
                      <ul>
                        <li class="li1a"></li>
                        <li class="li2a">{{list.zan_num}}</li>
                        <li class="li3a">{{list.replycount}}</li>
                      </ul>
                    </div>
                  </div>

                </div>
                <!--显示一张照片-->
                <div class="tip-bottom-allonea" v-else>

                  <div class="tip-bottomonea">
                    <div class="tip-bottom-lonea" :style="list.attach.length == 0 ? 'width:100%' : ''">
                      <ul class="tip-bottom-l-tonea">
                        <router-link :to="'/yesfriend?uid='+list.uid">
                          <li class="li1a">
                            <img :src="list.face==0?'../../../static/loading.png':list.face" />
                          </li>
                        </router-link>
                        <router-link :to="'/vote?id='+list.id+'&gid='+gid">
                          <div style="width: 2.9rem;float: left;padding-top: 0.1rem;"
                               :style="list.attach.length == 0 ? 'width:calc(100% - 0.5rem)' : ''">
                            <ul style="width: 100%;overflow: hidden;">
                              <li class="li2a" style="height: 0.3rem;line-height: 0.3rem;text-align: left;">{{list.uname}}</li>
                              <li class="li4a" style="line-height: 0.3rem;height: 0.3rem;float: right;">{{list.dateline}}</li>
                            </ul>
                            <ul>
                              <li style="height: 0.3rem;margin-left: 0.1rem;">
                                <img :src="user.icon" alt="" style="height:0.3rem;float: left;margin-right: 0.1rem;" v-for="(user,index) in list.usergroup" v-if="user.icon!=''">
                              </li>
                            </ul>
                          </div>
                        </router-link>

                      </ul>
                      <div style="clear: both;"></div>
                      <router-link :to="'/vote?id='+list.topic_id+'&gid='+list.gid">
                        <div
                          style="display: block;color:#242424;width: calc(100% - .4rem);margin-left:0.1rem;margin-top:.2rem;float: left;word-break: break-word;font-size:.22rem;line-height:.3rem;text-align:left;"
                          :style="'color:'+list.highstyle">
                          <span v-text="list.topic_type==1?toupiao:((list.topic_type==2)?huodong:'')" style="font-size: 0.22rem;float: left;"></span>
                          <li class="li5a" style="float: left;">
                            <span class="p1 mt50 p2" v-if="list.dist>0" style="margin:0.03rem  0.05rem 0;"></span>
                            <span class="p1 mt6 p3" v-if="list.top>0" style="margin:0.03rem  0.05rem 0;"></span>
                            <span class="p1 mt6 p4" v-if="list.attach.length>0" style="margin:0.03rem  0.05rem 0;"></span>
                          </li>
                          {{list.title}}
                        </div>
                      </router-link>
                    </div>
                    <div class="tip-bottom-ronea">
                      <router-link :to="'/vote?id='+list.topic_id+'&gid='+list.gid" >
                        <div class="imga" v-if="list.attach.length>0">
                          <img :src="list.attach[0]" v-lazy="list.attach[0]"/>
                          <!--<video :src="list.url[0]" controls="controls" ></video>-->
                        </div>
                      </router-link>
                      <ul :style="list.attach.length == 0 ? 'float:right' : ''">
                        <li class="li1a"></li>
                        <li class="li2a">{{list.zan_num}}</li>
                        <li class="li3a">{{list.replycount}}</li>
                      </ul>
                    </div>
                  </div>

                </div>
                <div class="line"></div>
              </div>
              <div class="loading-layer">
                <span class="spinner-holder"><img src="../../../images/loading.gif" /></span>
                <div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
              </div>
            </div>
            <!--暂无相关帖子-->
            <div class="no" v-show="noshow">
              暂无相关帖子
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="first1" type="ziyuan" contype="ziyuan">
              <!--<a href="#details">-->
              <div class="tip-bottom" v-for="(list,index) in itemsAll" :key="index">
                <div class="tip-bottom-l">
                  <router-link :to="'/info1?id='+list.document_id">
                    <img :src="list.thumb" v-lazy="list.thumb"/>
                  </router-link>
                </div>
                <router-link :to="'/info1?id='+list.document_id">
                  <div class="tip-bottom-r">
                    <ul>
                      <li class="li1">{{list.title}}</li>
                      <li class="li3">
                        <span class="li3-p1">{{list.dateline}}</span>
                        <span class="li3-p3">{{list.replycount}}</span>
                        <span class="li3-p2">{{list.viewcount}}</span>
                      </li>
                    </ul>
                  </div>
                </router-link>
              </div>
              <div class="loading-layer">
                <span class="spinner-holder"><img src="../../../images/loading.gif" /></span>
                <div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
              </div>
              <!--</a>-->
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="first2" type="news" contype="news">
              <div class="tip-bottom" v-for="(list,index) in itemsDoing" :key="index">
                <router-link :to="'/details?id='+list.ziy_id" style="display: flex;">
                  <div class="tip-bottom-r">
                    <ul>
                      <li class="li1">{{list.title}}</li>
                      <li class="li3">
                        <span class="li3-p1">{{list.dateline}}</span>
                        <span class="li3-p3">{{list.viewcount}}</span>
                        <span class="li3-p2">{{list.comment_num}}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="tip-bottom-l">
                    <img :src="list.thumb" v-lazy="list.thumb"/>
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
    <div class="load" style="display:none;">
      <div class="load-container load4">
        <div class="loader"> <i></i></div>
      </div>
    </div>
    <load v-show="isload"></load>
    <backtop></backtop>
  </div>
</template>

<script>
//    import first from './child/first.vue';
//    import second from './child/second.vue';
//    import third from './child/third.vue';

    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import {setCookie,getCookie} from '../../../assets/js/cookie.js';
    import {getOpenUrl,getToken} from '../../../assets/js/common.js'
    //var token  = getToken();
    var top = ''
    var status = "topic",
    start = 1,
    size = 10,
    loading = false,
    end = false;
    export default{
        data(){
            return {
              isload:false,
              huodong: '[活动]',
              toupiao: '[投票]',
              noData: '',
              noshow: false,
              gid:'',
              items: [],
              itemsAll: [],
              itemsDoing: [],
              swiperOptionTab: {
                watchSlidesProgress: true,
                watchSlidesVisibility: true,
                notNextTick: true,
                slidesPerView: 3
              },
              swiperOptionCon: {
                autoHeight: true,
                notNextTick: true
              },
              swiperOptionImg: {
                slidesPerView: 3.2,
                spaceBetween:20
              },
              allLoaded: false,
              scrollMode: "auto",
              topStatus: ''
            }
        },
        methods: {
          back(){
            android.back1();
          },
//          tabScroll(){
//            window.addEventListener("scroll",this.toScroll);
//          },
//          toScroll(){
//            if(loading || end || this.scrollTop > $(window).scrollTop()) return;
//            this.srcollTop = $(window).scrollTop();
//            if($(document).height() - $(window).height() - $(window).scrollTop() < 80) {
//              $('div[contype="' + this.type + '"] .loading-layer span').addClass('active');
//              loading = true;
//              //self.start += size;
//              switch(this.type){
//                case 'topic':
//                  if (this.itemsStart > 0) {
//                    start = this.itemsStart;
//                  }
//                  break;
//                case 'news':
//                  if (this.itemsAllStart > 0) {
//                    start = this.itemsAllStart;
//                  }
//                  break;
//                case 'ziyuan':
//                  if (this.itemsDoingStart > 0) {
//                    start = this.itemsDoingStart;
//                  }
//                  break;
//              }
//              start += 1;
//              setTimeout(() => {
//                this.getData(this.type, start, size);
//              }, 1500);
//            }
//          },
          loadTop() { // 刷新数据的操作
            top=this.scroll;
            var self = this;
            var url = '';
            self.start = start ? start : 1;
            if(this.type == 'topic') {
              url = getOpenUrl() + '/user/vlog';
              this.typeUid = '';
            } else if(this.type == 'news') {
              this.typeUid = this.$route.query.uid;
              url = getOpenUrl() + '/user/vlog';
            } else if(this.type == 'ziyuan') {
              this.typeUid = this.$route.query.uid;
              url = getOpenUrl() + '/user/vlog';
            }

            setTimeout(() => {
              start = 1;
              this.$http.get(url, {
                headers: {
                  'Authorization': 'Bearer ' +  getToken()
                },
                params: {
                  type: this.type,
                  page: start,
                  limit: size
                },
              }).then((res) => {
                $('div[contype="'+this.type+'"] .loading-layer span').removeClass('active');
                $('div[contype="'+this.type+'"] .loading-layer div').removeClass('active');
                var data = res.body.data;
                //console.log(res.body);
                if(res.body.code == '0000') {
                  switch(self.type){
                    case 'topic':
                      self.items.splice(0, self.items.length);
                      $.each(data, function(key, val) {
                        self.allLoaded = false;
                        self.items.push(val);
                        self.itemsStart = start;
                      });
                      break;
                    case 'ziyuan':
                      self.itemsAll.splice(0, self.itemsAll.length);
                      $.each(data, function(key, val) {
                        self.allLoaded = false;
                        self.itemsAll.push(val);
                        self.itemsAllStart = start;
                      });
                      break;
                    case 'news':
                      self.itemsDoing.splice(0, self.itemsDoing.length);
                      $.each(data, function(key, val) {
                        self.allLoaded = false;
                        self.itemsDoing.push(val);
                        self.itemsDoingStart = start;
                      });
                      break;
                  }
                } else {
                  if(type == 'topic'){
                    this.itemsEnd  = true;
                  }else if(type == 'ziyuan'){
                    this.itemsAllEnd  = true;
                  }else if(type == 'news'){
                    this.itemsDoingEnd  = true;
                  }
                  self.allLoaded = true;
                  $('div[contype="'+this.type+'"] .loading-layer div').addClass('active');
                }
                //              console.log(self.items)
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
          getData(type, start, size) {

//				if(status !== type && !loading) {
//					this.items = [];
//					end = false;
//					loading = false;
//				}
            top=0
            this.$store.commit('HOMESTOPF',top)
            $(".backtop").animate({"scrollTop":this.scroll},0)

            status = type;
            var self = this;

            var url = '';
            self.start = start ? start : 1;
            if(type == 'topic') {
              url = getOpenUrl() + '/user/vlog';
              this.typeUid = '';

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
            } else if(type == 'ziyuan') {
              this.typeUid = this.$route.query.uid;
              url = getOpenUrl() + '/user/vlog';

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
            } else if(type == 'news') {
              this.typeUid = this.$route.query.uid;
              url = getOpenUrl() + '/user/vlog';

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
            }

            if (start == 1){//第一次加载显示居中loading
              //$('.load').show();
              this.isload = true;
            }
            this.$http.get(url, {
              headers: {
                'Authorization': 'Bearer ' +  getToken()
              },
              params: {
                type: type,
                page: start,
                limit: size
              },
            }).then((res) => {
              this.isload = false;
              $('div[contype="'+type+'"] .loading-layer span').removeClass('active');
              $('div[contype="'+type+'"] .loading-layer div').removeClass('active');

              $('.backtop').scroll(()=> {
                this.scroll=$('.backtop').scrollTop();
              })

              var data = res.body.data;
              console.log(res.body);
              if(res.body.count > 0) {
                $.each(data, function(key, val) {
                  switch(type){
                    case 'topic':
                      self.items.push(val);
                      self.itemsStart = start;
                      break;
                    case 'ziyuan':
                      self.itemsAll.push(val);
                      self.itemsAllStart = start;
                      break;
                    case 'news':
                      self.itemsDoing.push(val);
                      self.itemsDoingStart = start;
                      break;
                  }
                });
              } else {
                //end = true;
                if(type == 'topic'){
                  this.itemsEnd  = true;
                }else if(type == 'ziyuan'){
                  this.itemsAllEnd  = true;
                }else if(type == 'news'){
                  this.itemsDoingEnd  = true;
                }
                //self.allLoaded = true;
                $('div[contype="'+type+'"] .loading-layer div').addClass('active');
              }
              //              console.log(self.items)
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
        mounted(){

          this.$root.eventHub.$on('zjSuccess', ()=>{
            this.loadTop();
          });
            //路由组件的数量
            //this.boxNum =3;
          this.type = status;
          this.start = start = 1;
          this.bottom = size //默认加载10条数据
          //$('.load').show();
          this.isload = true;
          //loading = end = false;
          //this.getData(this.type, this.start, this.bottom);

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
            loading = false;
            self.type = $('#swiper-container2 .active-nav').attr('type');
            end       = false;
            start     = 1;
            //$('#swiper-container3 .swiper-wrapper').css('height', 0);
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
        components: {
            //组件的名称
//            first,
//            second,
//            third,
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
      created(){
        this.type = 'topic';//默认加载数据类型
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
        if (self.type == 'topic'){
          this.itemslistH = $('div[contype="'+this.type+'"]').parent().parent().height();
          end          = this.itemsEnd;
        }else if(self.type == 'ziyuan'){
          this.itemsAlllistH = $('div[contype="'+this.type+'"]').parent().parent().height();
          end          = this.itemsAllEnd;
        }else if(self.type == 'news'){
          this.itemsDoinglistH = $('div[contype="'+this.type+'"]').parent().parent().height();
          end          = this.itemsDoingEnd;
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
	/*.header{height: 0.7rem;box-shadow:0 0 5px #ebebeb;position: fixed;top: 0;width: 100%;background: #fff;z-index: 11;}*/
	/*.headerall{padding: 0 0.2rem;}*/
	/*.header .a1{width: 0.18rem;height: 0.34rem;display: block;background: url(../../../images/back.png) no-repeat;background-size: cover;float:left;margin-top:0.27rem;}*/
	/*.forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}*/
  .first{float:left;width:6.4rem;}
  #headed{
    width: 100%;
    /*overflow: hidden;*/
    float:left;
  }
  .swiper-slide a{
    color: #000 !important;
    width:100%;
  }
  .taball{border-bottom: 1px solid #ebebeb;position: fixed;top: 0.88rem;width: 100%;background: #fff;z-index: 10;}
  .tab{
    width:6rem;
    overflow: hidden;
    padding: 0;
    margin: 0 auto;
    height: 0.76rem;
    line-height: 0.76rem;

  }
  .tab li{
    float: left;
    list-style: none;
    width: 33.3%;
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
  #swiper-container2{border-bottom: 1px solid #ccc;overflow:visible;position: fixed;background: #Fff;z-index: 6;top:1rem;width: 100%;}


  .first1 .tip-bottom{display: flex;margin-left: 0.2rem;margin-right: 0.2rem;border-bottom: 1px solid #ebebeb;padding-bottom: 0.2rem;}
  .first1 .tip-bottom-l{width: 2.11rem;height: 1.42rem;float: left;margin-top: 0.3rem;}
  .first1 .tip-bottom-l img{width: 2.11rem;height: 1.42rem;border: 0;display: block;}
  .first1 .tip-bottom-r{margin-top: 0.3rem;flex: 1;}
  .first1 .tip-bottom-r ul{height: 1.42rem;margin-left:0.24rem;position: relative;}
  .first1 .tip-bottom-r .li1{width:3.6rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size: 0.22rem;color:#008dd3;}
  .first1 .tip-bottom-r .li3{line-height: 0.3rem;height: 0.3rem;font-size: 0.2rem;position: absolute;bottom:0;color: #242424;width: calc(100% - 0.2rem);}
  .first1 .tip-bottom-r span{display: block;float: left;height: 0.3rem;}
  .first1 .tip-bottom-r .li3-p1{background: url(../../../images/fbsj.png) no-repeat;background-size: 0.3rem auto;padding-left: 0.4rem;float: left;}
  .first1 .tip-bottom-r .li3-p2{background: url(../../../images/sl.png) no-repeat;background-size:  0.3rem auto;padding-left: 0.4rem;float: right;width: .4rem;text-align: left;}
  .first1 .tip-bottom-r .li3-p3{background: url(../../../images/hf.png) no-repeat;background-size:  0.3rem auto;padding-left: 0.4rem;margin-left:0.21rem;float: right;width: .4rem;text-align: left;}

  .first2 .tip-bottom{display: flex;margin: 0 0.2rem;border-bottom: 1px solid #ebebeb;}
  .first2 .tip-bottom-l{width: 2.11rem;height: 1.72rem;/*background: red;*/float: left;overflow:hidden;margin:0 auto;}
  .first2 .tip-bottom-l img{width:100%;border-radius: 5px;max-height:1.72rem;margin-top: 0.2rem;}
  .first2 .tip-bottom-r{width: 3.7rem;height: 1.72rem;flex: 1;margin-right:0.2rem;border-radius: 5px;}
  .first2 .tip-bottom-r ul{height: 1.42rem;}
  .first2 .tip-bottom-r .li1{height:0.98rem;line-height:0.49rem;font-size: 0.22rem;margin-top:.1rem;/*padding-left: 0.15rem;*/text-align:left;overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
  .first2 .tip-bottom-r .li2{line-height: 0.31rem;font-size: 0.2rem;overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;padding-left: 0.15rem;}
  .first2 .tip-bottom-r .li3{color: #afafaf;line-height: 0.25rem;height: 0.25rem;font-size: 0.2rem;/*margin-left: 0.15rem;*/margin-top: 0.15rem;}
  .first2 .tip-bottom-r span{display: block;float: left;height: 0.25rem;}
  .first2 .tip-bottom-r .li3-p1{background: url(../../../images/fbsj.png) no-repeat;background-size: 0.25rem auto;padding-left: 0.28rem;float: left;}
  .first2 .tip-bottom-r .li3-p2{background: url(../../../images/hf.png) no-repeat;background-size: 0.25rem auto;padding-left: 0.28rem;float: right;}
  .first2 .tip-bottom-r .li3-p3{background: url(../../../images/sl.png) no-repeat;background-size: 0.25rem auto;padding-left: 0.28rem;margin-left:0.21rem;float: right;}


  /*.li5a{*/
  /*float: right!important;}*/
  .tip-bottom-allonea {
    overflow: hidden;
    border-bottom: 1px solid #ededed;
    padding: 0 0.2rem;
  }

  .tip-bottom-lonea {
    float: left;
    width: calc(100% - 2.6rem);
  }

  .tip-bottom-l-tonea {
    overflow: hidden;
  }

  .tip-bottom-l-tonea li {
    float: left;
    height: 0.56rem;
    line-height: 0.56rem;
    font-size: 0.2rem;
    color: #999999;
  }

  .tip-bottom-l-tonea .li1a {
    width: 0.5rem;
    height: 0.5rem;
    /* position: relative; */
    /* overflow: hidden; */
    /* border-radius: 50%; */
    margin-top: 0.08rem;
  }

  .tip-bottom-l-tonea .li1a img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 50%;
  }

  .tip-bottom-l-tonea .li2a {
    margin-left: 0.13rem;
    margin-right: 0.11rem;
  }

  .tip-bottom-l-tonea .li3a {
    line-height: 0;
    height: 0;
    padding: 0.1rem 0.1rem;
    border-radius: 0.05rem;
    margin-right: 0.05rem;
    margin-top: 0.18rem;
    color: #fff;
  }

  .tip-bottom-l-tonea .li4a {
    float: right;
  }

  .tip-bottom-lonea .li5a {
    float: right;
  }

  .tip-bottom-lonea p {
    width: 70%;
    float: left;
    text-align: left;
    font-size: 0.22rem;
    line-height: 0.36rem;
    margin-top: 0.06rem;
    color: #242424;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .tip-bottom-ronea {
    float: right;
    padding-top: 0.2rem;
  }

  .tip-bottom-ronea .img {
    width: 2.1rem;
    height: 1.42rem;
    border-radius: 0.1rem;
    display: block;
    float: left;
  }

  .tip-bottom-ronea img {
    width: 2.1rem;
    height: 1.42rem;
    border-radius: 0.1rem;
    object-fit:cover;
    display: block;
    float: right;
  }

  .tip-bottom-ronea ul {
    height: 0.77rem;
    line-height: 0.77rem;
    color: #949494;
    font-size: 0.2rem;
    float: left;
  }

  .tip-bottom-ronea ul li {
    height: 0.77rem;
    float: left;
  }

  .tip-bottom-ronea .li1a {
    width: 0.3rem;
    height: 0.77rem;
    background: url(../../../images/ds.png)no-repeat 0 50%;
    background-size: auto 0.24rem;
    margin-left: 0.1rem;
    margin-right: 0.3rem;
  }

  .tip-bottom-ronea .li2a {
    width: 0.3rem;
    height: 0.77rem;
    /*background: url(../../../images/xin1.png)no-repeat 0 50%;*/
    /*background-size: auto 0.3rem;*/
    background: url(../../../images/zan1.png)no-repeat 0 50%;
    background-size: auto 0.25rem;
    padding-left: 0.4rem;
    margin-left: 0.2rem;
  }

  .tip-bottom-ronea .li3a {
    width:.3rem;
    height: 0.77rem;
    background: url(../../../images/hf.png)no-repeat 0 50%;
    background-size: auto 0.3rem;
    padding-left: 0.4rem;
    margin-left: 0.2rem;
  }
  /*没有相关帖子*/

  .no {
    width: 5rem;
    color: #242424;
    font-size: 0.24rem;
    z-index: 10000000;
    margin: 0 auto;
  }

  .mt6 {
    margin-left: 0.06rem;
  }

  .line {
    height: 0.2rem;
    background: #f0f0f0;
  }

  .first {
    padding-bottom: 0.98rem;
  }

  .tip-bottom-all21a {
    overflow: hidden;
    border-bottom: 1px solid #ededed;
  }
  .tip-bottom-l-t1a {
    overflow: hidden;
  }

  .tip-bottom-l-t1a li {
    float: left;
    height: 0.56rem;
    line-height: 0.56rem;
    font-size: 0.17rem;
    color: #999999;
  }

  .tip-bottom-l-t1a .li1a {
    width: 0.5rem;
    height: 0.5rem;
    margin-top: 0.1rem;
    /* position: relative; */
    border-radius: 50%;
    /* overflow: hidden; */
  }

  .tip-bottom-l-t1a .li1a img {
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    /* position: absolute; */
    /* top: 50%; */
    /* transform: translateY(-50%); */
    display: block;
    border-radius: 50%;
  }
  .tip-bottom-l-t1a .li4a{
    float:right;
    font-size: 0.2rem;
  }

  .tip-bottom-l-t1a .li2a {
    margin-left: 0.13rem;
    margin-right: 0.11rem;
    font-size: 0.2rem;
  }

  .tip-bottom-l-t1a .li3a {
    line-height: 0;
    height: 0;
    padding: 0.1rem 0.1rem;
    border-radius: 0.05rem;
    margin-right: 0.05rem;
    margin-top: 0.18rem;
    color: #fff;
  }

  .tip-bottom-l1a .li4 {
    float: right
  }

  .tip-bottom-l1a .li5 {
    float: right
  }

  .tip-bottom-l1a p {
    width: 80%;
    float: left;
    text-align: left;
    font-size: 0.22rem;
    line-height: 0.36rem;
    margin-top: 0.06rem;
    color: #242424;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .tip-bottom-r1a {
    float: left;
    width: 100%;
    margin-top: 0.2rem;
  }

  .tip-bottom-r1a img {
    width: 100%;
    height: 1.42rem;
    border-radius: 0.1rem;
    display: block;
    float: left;
    object-fit: cover;
  }

  .tip-bottom-r1a ul {
    height: 0.77rem;
    line-height: 0.77rem;
    color: #949494;
    font-size: 0.15rem;
    float: right;
  }

  .tip-bottom-r1a ul li {
    height: 0.77rem;
    float: left;
  }

  .tip-bottom-r1a .li1a {
    width: 0.3rem;
    height: 0.77rem;
    background: url(../../../images/ds.png)no-repeat 0 50%;
    background-size: auto 0.24rem;
    margin-left: 0.1rem;
    margin-right:0.3rem;
  }

  .tip-bottom-r1a .li2a {
    width: 0.3rem;
    height: 0.77rem;
    /*background: url(../../../images/xin1.png)no-repeat 0 50%;*/
    /*background-size: 0.18rem 0.14rem;*/
    background: url(../../../images/zan1.png)no-repeat 0 50%;
    background-size: auto 0.25rem;
    padding-left: 0.4rem;
    margin-left: 0.2rem;
  }

  .tip-bottom-r1a .li3a {
    width: .3rem;
    height: 0.77rem;
    background: url(../../../images/hf.png)no-repeat 0 50%;
    background-size: auto 0.3rem;
    padding-left: 0.4rem;
    margin-left: 0.2rem;
    text-align:left;
  }

  .tip-bottom21a {
    overflow: hidden;
    padding: 0 0.2rem;
  }

  .tip-bottom21a .tip-bottom-la {
    width: 6rem;
  }

  .tip-bottom21a .tip-bottom-la .li4a {
    float: right;
  }

  .tip-bottom21a .tip-bottom-ra {
    margin-top: 0.28rem;
  }

  .tip-bottom21a .tip-bottom-r-imga {
    height: 1.42rem;
  }

  .tip-bottom21a .tip-bottom-r-imga #swiper-container2 {
    border: 0;
  }

  .tip-bottom21a .tip-bottom-ra ul {
    float: right;
    margin-right: 0.4rem;
  }

  .p1 {
    width: 0.26rem;
    height: 0.26rem;
    margin-top: 0.1rem;
    float: left;
    font-size: 0.22rem;
  }

  .p2 {
    background: url(../../../images/jing.png)no-repeat;
    background-size: cover;
  }

  .p3 {
    background: url(../../../images/z.png)no-repeat;
    background-size: cover;
  }

  .p4 {
    background: url(../../../images/t.png)no-repeat;
    background-size: cover;
  }

  .tip-bottom2a {
    width: 6rem;
    margin: 0 auto;
    overflow: hidden;
  }

  .tip-bottom2a .tip-bottom-la {
    width: 6rem;
  }

  .tip-bottom2a .tip-bottom-la .li4a {
    float: right;
  }

  .tip-bottom2a .tip-bottom-ra {
    margin-top: 0.28rem;
  }

  .tip-bottom-r-alla {
    width: 10rem;
    overflow: hidden;
  }

  .tip-bottom2a .tip-bottom-r-imga {
    width: 6rem;
    height: 1.42rem;
    overflow: hidden;
  }

  .tip-bottom2a .tip-bottom-ra ul {
    float: right;
    margin-right: 0.4rem;
  }
</style>
