<template>
  <div id="headed" style="overflow-y: scroll;">
    <my-header title="排行榜" uri="#/home"></my-header>
    <!--<div style="padding-top:1.4rem">-->
    <!--<swiper :options="swiperOptionTab" id="swiper-container2" ref="mySwiperTab">-->
      <!--<swiper-slide class="active-nav body_bottom" type="expert"><span>专家榜</span></swiper-slide>-->
      <!--<swiper-slide class="body_bottom" type="user"><span>用户榜</span></swiper-slide>-->
      <!--<swiper-slide class="body_bottom" type="circle"><span>圈子榜</span></swiper-slide>-->
    <!--</swiper>-->
    <div class="page-loadmore backtop" style="position:relative;top:1.2rem;bottom:0;overflow:scroll;font-size: 0.2rem;height: calc(100% - 1.2rem);">
    <!--<div class="page-loadmore backtop" style="position:relative;top:1.7rem;bottom:0;overflow:scroll;font-size: 0.2rem;height: calc(100% - 1.7rem);">-->
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">

        <!--<swiper :options="swiperOptionCon" id="swiper-container3" ref="mySwiperCon">-->
          <!--<swiper-slide>-->
            <!--<div class="first" type="expert" contype="expert">-->
              <!--<div class="nav">-->
                <!--&lt;!&ndash;<a href="#/nofriend">&ndash;&gt;-->
                <!--<ul v-for="(expert,index) in items" @click="toFriend(expert.uid)" :key="index" :style="{color:index+1==1?orange:((index+1==2)?yellow:((index+1==3)?red:other))}">-->
                  <!--<li class="li1">{{index+1}}</li>-->
                  <!--<li class="li2">-->
                    <!--<img :src="expert.face" v-lazy="expert.face" />-->
                  <!--</li>-->
                  <!--<li class="li3">-->
                    <!--<div class="p">-->
                      <!--<p class="p1">{{expert.uname}}</p>-->
                      <!--<p class="p2">-->
                        <!--<span>答疑数：</span>-->
                        <!--<span>{{expert.worknum}}</span>-->
                      <!--</p>-->
                      <!--<p class="p2 p3">-->
                        <!--<span>好评率：</span>-->
                        <!--<span>{{expert.rate}}</span>-->
                      <!--</p>-->
                    <!--</div>-->
                  <!--</li>-->
                <!--</ul>-->
                <!--&lt;!&ndash;</a>&ndash;&gt;-->
              <!--</div>-->
              <!--<div class="loading-layer">-->
                <!--<span class="spinner-holder"><img src="../../images/loading.gif" /></span>-->
                <!--<div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</swiper-slide>-->
          <!--<swiper-slide>-->
            <!--<div class="first" type="user" contype="user">-->
              <!--<div class="nav">-->
                <!--<ul v-for="(expert,index) in itemsAll" :key="index" :style="{color:index+1==1?orange:((index+1==2)?yellow:((index+1==3)?red:other))}" @click="toFriend(expert.uid)">-->
                  <!--<li class="li1">{{index+1}}</li>-->
                  <!--<li class="li2">-->
                    <!--<img :src="expert.face" v-lazy="expert.face" />-->
                  <!--</li>-->
                  <!--<li class="li3">-->
                    <!--<div class="p">-->
                      <!--<p class="p1">{{expert.uname}}</p>-->
                      <!--<p class="p2">-->
                        <!--<span>周发帖数：</span>-->
                        <!--<span>{{expert.rate}}</span>-->
                      <!--</p>-->
                    <!--</div>-->
                  <!--</li>-->
                <!--</ul>-->
              <!--</div>-->
              <!--<div class="loading-layer">-->
                <!--<span class="spinner-holder"><img src="../../images/loading.gif" /></span>-->
                <!--<div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</swiper-slide>-->
          <!--<swiper-slide>-->
            <!--<div class="first3" type="circle" contype="circle">-->
              <!--<div class="nav1">-->
                <!--<ul v-for="(expert,index) in itemsDoing" :key="index" @click="toQuanzi(expert.id)" :style="{color:index+1==1?orange:((index+1==2)?yellow:((index+1==3)?red:other))}">-->
                  <!--<li class="li11">{{index+1}}</li>-->
                  <!--<li class="li21">-->
                    <!--<img :src="expert.logo" v-lazy="expert.logo" />-->
                  <!--</li>-->
                  <!--<li class="li31">-->
                    <!--<div class="p1">-->
                      <!--<p class="p11">{{expert.name}}</p>-->
                      <!--<p class="p21" v-html="expert.intro"></p>-->
                      <!--&lt;!&ndash;<p class="p31">{{expert.memnum}}</p>&ndash;&gt;-->
                      <!--<p class="p2">-->
                        <!--<span>周发帖数：</span>-->
                        <!--<span>{{expert.memnum}}</span>-->
                      <!--</p>-->
                    <!--</div>-->
                  <!--</li>-->
                <!--</ul>-->
              <!--</div>-->
              <!--<div class="loading-layer">-->
                <!--<span class="spinner-holder"><img src="../../images/loading.gif" /></span>-->
                <!--<div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</swiper-slide>-->
        <!--</swiper>-->

        <div class="firsta">
          <div v-for="(list,index) in items" :key="index" :style="{color:index+1==1?orange:((index+1==2)?yellow:((index+1==3)?red:other))}">
            <!--显示一张照片-->
            <div class="tip-bottom-allonea">
              <div class="tip-bottomonea">
                <div class="tip-bottom-lonea" :style="list.face ? '' : 'width:100%'">
                  <li style="font-size: 0.22rem;margin-top: 0.2rem;float:left;">0{{index+1}}</li>
                  <router-link :to="'/vote?id='+list.id+'&gid='+list.gid">
                    <div
                      style="min-height:0.9rem;display: block;color:#242424;width: calc(100% - .4rem);margin-left:0.1rem;margin-top:.2rem;float: left;word-break: break-word;font-size:.22rem;line-height:.3rem;text-align:left;"
                      :style="{color:index+1==1?orange:((index+1==2)?yellow:((index+1==3)?red:other))}">
                      <span v-text="list.topic_type==1?toupiao:((list.topic_type==2)?huodong:'')" style="font-size: 0.22rem;float: left;"></span>
                      <!--<li class="li4a" style="line-height: 0.3rem;height: 0.3rem;float: right;">{{list.addtime}}</li>-->
                      <em style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;font-style:normal;font-weight:700;float:left;font-size:0.24rem;color:#000;">{{list.title}}</em>
                    </div>
                  </router-link>
                  <div style="clear: both;"></div>
                  <div style="margin-top:0.2rem;">
                    <li class="li5a" style="float: left;">
                      <span class="p1 mt50 p2" v-if="list.dist>0" style="margin:0.03rem  0.05rem 0;"></span>
                      <span class="p1 mt6 p3" v-if="list.top>0" style="margin:0.03rem  0.05rem 0;"></span>
                      <span class="p1 mt6 p4" v-if="list.face" style="margin:0.03rem  0.05rem 0;"></span>
                    </li>
                    <div
                      style="display: block;color:#242424;float: left;word-break: break-word;font-size:.22rem;line-height:.3rem;text-align:left;"
                      :style="{color:index+1==1?orange:((index+1==2)?yellow:((index+1==3)?red:other))}">
                      <li class="li4a" style="line-height: 0.3rem;height: 0.3rem;float: right;color:#999;">浏览量：{{list.viewcount}}</li>
                    </div>
                  </div>
                </div>
                <div class="tip-bottom-ronea">
                  <router-link :to="'/vote?id='+list.id+'&gid='+list.gid" >
                    <div class="imga" v-if="list.face">
                      <img :src="list.face" v-lazy="list.face"/>
                    </div>
                  </router-link>
                  <!--<ul :style="list.attach.length == 0 ? 'float:right' : ''">-->
                    <!--<li class="li1a"></li>-->
                    <!--<li class="li2a">{{list.zan_num}}</li>-->
                    <!--<li class="li3a">{{list.viewcount}}</li>-->
                  <!--</ul>-->
                </div>
              </div>

            </div>
            <div class="line"></div>
          </div>
          <div class="loading-layer">
            <span class="spinner-holder"><img src="../../images/loading.gif" /></span>
            <div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
          </div>
        </div>
        <!--暂无相关帖子-->
        <div class="no" v-show="noshow">
          暂无相关帖子
        </div>
      </mt-loadmore>
    </div>
    <!--</div>-->
    <div class="load" style="display:none;">
      <div class="load-container load4">
        <div class="loader"> <i></i></div>
      </div>
    </div>
    <backtop></backtop>
    <load v-show="isload"></load>
    <pop style="text-align: center" class="tips" :title="tip"></pop>
  </div>
</template>

<script>
import {swiper,swiperSlide} from 'vue-awesome-swiper';
import {setCookie,getCookie} from '../../assets/js/cookie.js';
import {getOpenUrl,getToken} from '../../assets/js/common.js'
////var token  = getToken();
var top=''
var status = 'expert', start = 1, size = 7, loading = false, end = false;
    export default{
        data(){
            return {
              tip:'',
              isload:false,
            		show:false,
              noData: '',
              items: [],
              itemsAll: [],
              itemsDoing: [],
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
              red:"#ff0202",
              yellow:"#ffaf02",
              orange:"#ff6c00",
              other:"black",
              allLoaded: false,
              scrollMode: "auto",
              topStatus: '',
              noshow: false,
              gid:''
            }
        },
        methods: {
        		toggle(){
        			this.show=!this.show;
        		},
          toQuanzi(id){
            this.$router.push({path: '/listcircle', query:{gid:id,id:id}});
          },
          toFriend(id){
            this.$router.push({path: '/yesfriend', query:{uid:id}});
          },
          loadTop() { // 刷新数据的操作
            top=this.scroll;
            var self = this;
            this.start = 1;
            setTimeout(() => {
              start = 1;
              this.$http.get(getOpenUrl() + "/ranking", {
                headers: {
                  'Authorization': 'Bearer ' +  getToken()
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
                self.items.splice(0, self.items.length);
                self.itemsAll.splice(0, self.itemsAll.length);
                self.itemsDoing.splice(0, self.itemsDoing.length);
                if (res.body.count > 0){
                  $.each(data, function(key, val){
                    switch(self.type){
                      //case 'expert':
                      case 'topic':
                        //self.items.splice(0, self.items.length);
                        self.allLoaded = false;
                        self.items.push(val);
                        self.itemsStart = start;
                        break;
                      case 'user':
                        //self.itemsAll.splice(0, self.itemsAll.length);
                        self.allLoaded = false;
                        self.itemsAll.push(val);
                        self.itemsAllStart = start;
                        break;
                      case 'circle':
                        //self.itemsDoing.splice(0, self.itemsDoing.length);
                        self.allLoaded = false;
                        self.itemsDoing.push(val);
                        self.itemsDoingStart = start;
                        break;
                    }
                  });
                }else{
                  //self.allLoaded = true;
                  $('div[contype="'+this.type+'"] .loading-layer div').addClass('active');
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
          getData(type, start, size){
            top=0
            this.$store.commit('HOMESTOPF',top)
            $(".backtop").animate({"scrollTop":this.scroll},0)

            status = type;
            var self   = this;

            self.start = start ? start : 1;
//            if(type=='expert'){
//              if (this.items.length > 0 && start <= this.itemsStart){
//                start = this.itemsStart;
//                end   = this.itemsEnd;
//                loading = false;
//                $('div[contype="'+type+'"]').parent().parent().css('height', this.itemslistH);
//                $('div[contype="'+type+'"] .loading-layer span').removeClass('active');
//                if (end){
//                  $('div[contype="'+type+'"] .loading-layer div').addClass('active');
//                }else{
//                  $('div[contype="'+type+'"] .loading-layer div').removeClass('active');
//                }
//                return;
//              }
//            }else if(type=='user'){
//              if (this.itemsAll.length > 0 && start <= this.itemsAllStart){
//                start = this.itemsAllStart;
//                end   = this.itemsAllEnd;
//                loading = false;
//                $('div[contype="'+type+'"]').parent().parent().css('height', this.itemsAlllistH);
//                $('div[contype="'+type+'"] .loading-layer span').removeClass('active');
//                if (end){
//                  $('div[contype="'+type+'"] .loading-layer div').addClass('active');
//                }else{
//                  $('div[contype="'+type+'"] .loading-layer div').removeClass('active');
//                }
//                return;
//              }
//            }else if(type=='circle'){
//              if (this.itemsDoing.length > 0 && start <= this.itemsDoingStart){
//                start = this.itemsDoingStart;
//                end   = this.itemsDoingEnd;
//                loading = false;
//                $('div[contype="'+type+'"]').parent().parent().css('height', this.itemsDoinglistH);
//                $('div[contype="'+type+'"] .loading-layer span').removeClass('active');
//                if (end){
//                  $('div[contype="'+type+'"] .loading-layer div').addClass('active');
//                }else{
//                  $('div[contype="'+type+'"] .loading-layer div').removeClass('active');
//                }
//                return;
//              }
//            }

            if (start == 1){//第一次加载显示居中loading
              this.isload = true;
              //$('.load').show();
            }
            this.$http.get(getOpenUrl() + "/ranking", {
              headers: {
                'Authorization': 'Bearer ' +  getToken()
              },
              params:{
                type: type,
                page: start,
                limit: size
              },
            }).then((res)=>{
              this.isload = false;
              $('div[contype="'+type+'"] .loading-layer span').removeClass('active');
              $('div[contype="'+type+'"] .loading-layer div').removeClass('active');

              $('.backtop').scroll(()=> {
                this.scroll=$('.backtop').scrollTop();
              })

              var data = res.body.data;
              if(res.body.count == 0){
                this.tip = '暂无更多数据';
                $('.tips').show();
                setTimeout(() => {
                  $('.tips').hide();
                }, 1000)
              }
              if (res.body.count > 0){
                $.each(data, function(key, val){
                  switch(type){
                    //case 'expert':
                    case 'topic':
                      self.items.push(val);
                      self.itemsStart = start;
                      break;
                    case 'user':
                      self.itemsAll.push(val);
                      self.itemsAllStart = start;
                      break;
                    case 'circle':
                      self.itemsDoing.push(val);
                      self.itemsDoingStart = start;
                      break;
                  }
                });
                console.log(self.items);
              }else{
//                if(type == 'expert'){
//                  this.itemsEnd  = true;
//                }else if(type == 'user'){
//                  this.itemsAllEnd  = true;
//                }else if(type == 'circle'){
//                  this.itemsDoingEnd  = true;
//                }
//                $('div[contype="'+type+'"] .loading-layer div').addClass('active');
              }
              loading = false;
              $('.load').hide();
            },function(err) {
              this.$router.push({
                path: '/login',
              });
              console.log('请求失败', err);

            });

          },
        },
      mounted() {
        //获取全部答疑
        this.type   = status;
        this.start  = start;
        this.bottom = size; //默认加载6条数据
        this.isload = true;
        //$('.load').show();

        this.$root.eventHub.$on('chartSuccess',()=>{
          this.loadTop();
        })


        var islogin = getCookie("islogin");
        if(islogin == 0) {
          this.$router.push('/login')
        }


//        var swiperTab = this.swiperTab;
//        var swiperCon = this.swiperCon;
//        var self      = this;
//        swiperTab.on('tap', function(obj){
//          swiperCon.slideTo(obj.clickedIndex);
//        });
//
//        swiperCon.on('slideChangeStart', function(obj){
//          $('#swiper-container2 .active-nav').removeClass('active-nav')
//          var activeNav = $('#swiper-container2 .swiper-slide').eq(obj.activeIndex).addClass('active-nav');
//          if (!activeNav.hasClass('swiper-slide-visible')){
//            if (activeNav.index()>swiperTab.activeIndex){
//              var thumbsPerNav = Math.floor(swiperTab.width/activeNav.width())-1
//              swiperTab.slideTo(activeNav.index()-thumbsPerNav)
//            }else{
//              swiperTab.slideTo(activeNav.index())
//            }
//          }
//          return ;
//        });

//        swiperCon.on('slideChangeEnd', function(obj){
//          loading = false;
//          self.type = $('#swiper-container2 .active-nav').attr('type');
//          end       = false;
//          start     = 1;
//          self.getData(self.type, start, size);
//          return;
//        });

        //$('#swiper-container3 .swiper-wrapper').css('min-height', $(window).height() - $('div.header').outerHeight() - $('div.footer').outerHeight() - $('#swiper-container2').outerHeight());
      },
        components: {
            //组件的名称
//            first,
//            second,
//            third
          swiper,
          swiperSlide
        },
      computed: {
//        swiperTab() {
//          return this.$refs.mySwiperTab.swiper
//        },
//        swiperCon() {
//          return this.$refs.mySwiperCon.swiper
//        }
      },
      created(){
        //this.type = 'expert';//默认加载数据类型
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
//        var self      = this;
//        if (self.type == 'expert'){
//          self.itemslistH = $('div[contype="'+self.type+'"]').parent().parent().height();
//          end          = self.itemsEnd;
//        }else if(self.type == 'user'){
//          self.itemsAlllistH = $('div[contype="'+self.type+'"]').parent().parent().height();
//          end          = self.itemsAllEnd;
//        }else if(self.type == 'circle'){
//          self.itemsDoinglistH = $('div[contype="'+self.type+'"]').parent().parent().height();
//          start        = self.itemsDoingStart;
//        }
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
//      beforeRouteEnter(to,from,next){
//        next(vm =>{
//          vm.getData(vm.type, vm.start, size);
//        })
//      },
    }
</script>

<style scoped="scoped">
  .tips {
    display: none;
  }
  .wl{margin: 0 auto;width: 6.4rem;overflow: hidden;}
  .first{
    /*float:left;width:6.4rem;*/
  }
  #headed{
    width: 100%;
    /*overflow: hidden;*/
    float:left;
  }
  .header{
    position: fixed;
  }

  .body_bottom{
    height: 0.73rem;
    margin: 0 auto;
    text-align: center;
    font-size: 0.22rem;
  }
  .active_color{
    color: #008dd3;
    border-bottom: 0.03rem solid #008dd3 !important;
  }
  #swiper-container2{border-bottom: 1px solid #ccc;overflow:visible;    position: fixed;background: #Fff;z-index: 6;top:1rem;width: 100%;}
  #swiper-container2 .swiper-slide{
    line-height:.7rem !important;
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
    border-bottom: 0.04rem solid #008dd3;
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

  .nav{margin:0 10px;}
  .nav ul{height:1.24rem;border-bottom:0.01rem solid #e0e0e0;}
  .nav ul li{height:1.24rem;
    float:left;
  }
  .li1{width:0.32rem;line-height:1.24rem;text-align:center;font-size:0.22rem;}
  .nav .li2{width:0.67rem;height:0.67rem;
    /*overflow:hidden;*/
    border-radius:50%;
    /*position: relative;*/
    margin-top: 0.25rem;}
  .nav .li2 img{width:100%;border-radius:50%;
    height: 100%;
    object-fit:cover;
    display: block;
    /*position: absolute;top: 50%;-webkit-transform: translateY(-50%);-moz-transform: translateY(-50%);-ms-transform: translateY(-50%);-o-transform: translateY(-50%);transform: translateY(-50%);*/
  }
  .nav .li3{width:4.87rem;position:relative;}
  .p{height:0.69rem;position: absolute;top: 50%;left:0.3rem;-webkit-transform: translateY(-50%);-moz-transform: translateY(-50%);-ms-transform: translateY(-50%);-o-transform: translateY(-50%);transform: translateY(-50%);}
  .nav .li3 .p1{font-size:0.22rem;line-height:0.38rem;}
  p{font-size:0.20rem;}
  .nav .li3 .p2{float:left;line-height:0.31rem;}
  .nav .li3 .p3{margin-left:0.3rem;}

  .first3 .nav1{margin:0 10px;}
  .first3 .nav1 ul{border-bottom: 0.01rem solid #e0e0e0;
    display: block;
    padding: 0.2rem 0;}
  .first3 .nav1 ul:after{content: " ";display:block;clear:both;overflow:hidden;height:0;}
  .first3 .nav1 ul li{height:1.24rem;float:left;}
  .first3 .li11{width:0.42rem;line-height:1.24rem;text-align:left;font-size:0.22rem;}
  .first3 .nav1 .li21{width:2.11rem;position: relative;}
  .first3 .nav1 .li21 img{width:100%;height:100%;position: absolute;top: 50%;-webkit-transform: translateY(-50%);-moz-transform: translateY(-50%);-ms-transform: translateY(-50%);-o-transform: translateY(-50%);transform: translateY(-50%);}
  .first3 .nav1 .li31{width:calc(100% - 3rem);float:left;position:relative;margin-left: 0.2rem;}
  .first3 .p1{width:100%;position: absolute;top: 50%;-webkit-transform: translateY(-50%);-moz-transform: translateY(-50%);-ms-transform: translateY(-50%);-o-transform: translateY(-50%);transform: translateY(-50%);}
  .first3 .nav1 .li31 .p11{font-size:0.22rem;line-height:0.38rem;}
  .first3 p{font-size:0.20rem;}
  .first3 .nav1 .li31 .p21{
    width: 100%;
    line-height: 0.31rem;
    height: 0.6rem;
    margin: 0.05rem 0;
    font-size: 0.2rem;
    color: #afafaf;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .first3 .nav1 .li31 .p31{line-height:0.31rem;background: url(../../images/tz.png) no-repeat 0 50%;background-size: 0.2rem auto;padding-left: 0.28rem;}





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
  .tip-bottom-allonea {
    overflow: hidden;
    border-bottom: 1px solid #ededed;
    padding: 0 0.2rem;
    padding-bottom:0.3rem;
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
    float: right;
  }

  .tip-bottom-ronea ul li {
    height: 0.77rem;
    float: left;
  }

  .tip-bottom-ronea .li1a {
    width: 0.3rem;
    height: 0.77rem;
    background: url(../../images/ds.png)no-repeat 0 50%;
    background-size: auto 0.24rem;
    margin-left: 0.1rem;
    margin-right: 0.3rem;
  }

  .tip-bottom-ronea .li2a {
    width: 0.3rem;
    height: 0.77rem;
    /*background: url(../../../images/xin1.png)no-repeat 0 50%;*/
    /*background-size: auto 0.3rem;*/
    background: url(../../images/zan1.png)no-repeat 0 50%;
    background-size: auto 0.25rem;
    padding-left: 0.4rem;
    margin-left: 0.2rem;
  }

  .tip-bottom-ronea .li3a {
    width:.3rem;
    height: 0.77rem;
    background: url(../../images/sl.png)no-repeat 0 50%;
    /*background: url(../../images/hf.png)no-repeat 0 50%;*/
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
    background: url(../../images/ds.png)no-repeat 0 50%;
    background-size: auto 0.24rem;
    margin-left: 0.1rem;
    margin-right:0.3rem;
  }

  .tip-bottom-r1a .li2a {
    width: 0.3rem;
    height: 0.77rem;
    /*background: url(../../../images/xin1.png)no-repeat 0 50%;*/
    /*background-size: 0.18rem 0.14rem;*/
    background: url(../../images/zan1.png)no-repeat 0 50%;
    background-size: auto 0.25rem;
    padding-left: 0.4rem;
    margin-left: 0.2rem;
  }

  .tip-bottom-r1a .li3a {
    width: .3rem;
    height: 0.77rem;
    background: url(../../images/hf.png)no-repeat 0 50%;
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
    background: url(../../images/jing.png)no-repeat;
    background-size: cover;
  }

  .p3 {
    background: url(../../images/z.png)no-repeat;
    background-size: cover;
  }

  .p4 {
    background: url(../../images/t.png)no-repeat;
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
