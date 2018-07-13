<template>
  <div id="headed" style="overflow-y: scroll;">
    <div class="header">
      <div class="headerall">
        <a href="javascript:history.back(-1);" @click="back" class="a1"></a>
        <!--<a @click="back" class="a1"></a>-->
        <span class="forget">我的订单</span>
        <a class="a2" @click="toggle()">全部状态</a>
        <ul v-show="show" class="tab-menu">
          <li><a type="" class="ismore">全部</a></li>
          <li><a type="0">待发货</a></li>
          <li><a type="1">待收货</a></li>
          <li><a type="2">已完成</a></li>
        </ul>
      </div>
    </div>
    <div class="page-loadmore backtop" style="position:relative;top:1rem;bottom:0;overflow:scroll;font-size: 0.2rem;height: calc(100% - 1rem);">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">

        <swiper :options="swiperOptionCon" id="swiper-container3" ref="mySwiperCon">
          <swiper-slide>
            <div class="nav-c" v-if="items.length>0">
              <div class="nav" v-for="(data,index) in items" :key="index">
                <router-link :to="{path:'/ddxq',query:{oid:data.order_id}}">
                  <div class="navall">
                    <img :src="data.img" v-lazy="data.img"/>
                    <!--<img v-if="data.img==''||data.img==null" src="../../../images/indexbanner.png" />-->

                    <ul>
                      <li class="li1">{{data.goods_name}}<span>{{data.goods_number}}</span>个</li>
                      <li class="li2">积分：<span>{{data.goods_price}}</span>个</li>
                    </ul>
                    <div v-if="data.shipping_status==0" class="nav-r">待发货</div>
                    <div v-if="data.shipping_status==1" class="nav-r">已发货</div>
                    <div v-if="data.shipping_status==2" class="nav-r">已签收</div>
                  </div>
                </router-link>
                <div class="line"></div>
              </div>
              <!--<div class="loading-layer">-->
              <!--<span class="spinner-holder"><img src="../../../images/loading.gif" /></span>-->
              <!--<div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>-->
              <!--</div>-->
              <div class="loading-layer" v-show="loadingshow" style="color: rgb(170, 170, 170);">没有更多数据</div>
            </div>
          </swiper-slide>
        </swiper>
      </mt-loadmore>
    </div>
    <div class="load" style="display:none;">
      <div class="load-container load4"><div class="loader"> <i></i></div></div>
    </div>
    <backtop></backtop>
    <load v-show="isload"></load>
    <!--<my-footer></my-footer>-->
  </div>
</template>

<script>
    import { setCookie, getCookie } from '../../../assets/js/cookie.js'
    import {getOpenUrl,getToken} from '../../../assets/js/common.js'
    import {swiper,swiperSlide} from 'vue-awesome-swiper';
    var top = ''
    var status = '', start = 1, size = 10, loading = false, end = false;
    export default{
        data(){
            return {
              isload:false,
                noData: '',
                items: [],
                itemsAll: [],
                itemDoing: [],
                itemDone: [],
                show:false,
                swiperOptionCon: {
                  //autoHeight: true,
                  notNextTick: true
                },
              allLoaded: false,
              scrollMode:"auto",
              topStatus: '',
              st:{},
              loadingshow:false,
              reType:''
            }
        },
        methods: {
          back(){
            this.$router.goBack();
            //android.back1();
          },
//          tabScroll(){
//            window.addEventListener("scroll",this.toScroll);
//          },
//          toScroll(){
//            if(loading || end) return;
//            if($(document).height() - $(window).height() - $(window).scrollTop() < 80){
//              $('.loading-layer span').addClass('active');
//              loading = true;
//              //start += size;
//              start += 1;
//              this.getData(status, start, size);
//            }
//          },
          loadTop() { // 刷新数据的操作
            top=this.scroll;
            var self = this;
            setTimeout(()=> {
              this.start=1;
              this.$http.get(getOpenUrl() + "/user/myorder", {
                headers: {
                  "Authorization": "Bearer " + getToken()
                },
                params:{
                  status: this.type,
                  page: this.start,
                  limit: size
                },
              }).then((res)=>{
                var data = res.body.data;
                console.log(res.body);
                if (res.body.code == 0){
                  self.items.splice(0, self.items.length);
                  self.allLoaded = false;
                  self.loadingshow=false;
                  $.each(data, function(key, val){
                    self.items.push(val);
                    switch (this.type){
                      case 1:
                        self.itemsAll.splice(0, self.itemsAll.length);
                        self.itemsAll.push(val);
                        break;
                      case 2:
                        self.itemDoing.splice(0, self.itemDoing.length);
                        self.itemDoing.push(val);
                        break;
                      case 3:
                        self.itemDone.splice(0, self.itemDone.length);
                        self.itemDone.push(val);
                        break;
                    }
                  });
                }else{
                  //self.allLoaded = true;
                  self.loadingshow=true;
                }
                loading = false;
                $('.load').hide();
                self.$refs.loadmore.onTopLoaded();
                $('div[type="'+this.type+'"]').addClass('isload').show();
              },function(err) {
                this.$router.push({
                  path: '/login',
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
              self.getData(self.type, self.start,size);
              if(self.st.status==0){
                //self.allLoaded = true;
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
            toggle(){
            	this.show=!this.show
            },
          getData(type, start, size){
            top=0
            this.$store.commit('HOMESTOPF',top)
            $(".backtop").animate({"scrollTop":this.scroll},0)

            if (status !== type && !loading){
              this.items = [];
              end        = false;
              loading    = false;
            }

            if (start == 1){//第一次加载显示居中loading
              //$('.load').show();
              this.isload = true;
            }
            status = type;
            var self   = this;
            this.$http.get(getOpenUrl() + "/user/myorder", {
              headers: {
                "Authorization": "Bearer " + getToken()
              },
              params:{
                status: type,
                page: start,
                limit: size
              },
            }).then((res)=>{
              this.isload = false;
              $('.loading-layer span').removeClass('active');
              $('.loading-layer div').removeClass('active');
              self.loadingshow=false;

              $('.backtop').scroll(()=> {
                this.scroll=$('.backtop').scrollTop();
              })

              self.st=res.body
              var data = res.body.data;
              console.log(res.body);
              if (res.body.count > 0){
                $.each(data, function(key, val){
                  self.items.push(val);
                  switch (type){
                    case 1:
                      self.itemsAll.push(val);
                      break;
                    case 2:
                      self.itemDoing.push(val);
                      break;
                    case 3:
                      self.itemDone.push(val);
                      break;
                  }
                });
                if (res.body.count < size){
                  //end = true;
                }
              }else{
                //end = true;
                //self.noData = "没有更多数据"
                //self.allLoaded = true;
                self.loadingshow=true;
                $('.loading-layer div').addClass('active');
              }
//              console.log(self.items)
              loading = false;
              $('.load').hide();
              $('div[type="'+type+'"]').addClass('isload').show();
            },function(err) {
              this.$router.push({
                path: '/login',
                //query:{gid: res.body.data.gid}
              });
              console.log('请求失败', err);

            });
          },
          loadMore(type, obj){
            alert($(this).attr('class'));
            if ($(obj).hasClass('ismore')){
              return false;
            }
            alert($(obj).hasClass('ismore'));
            $('.tab-menu a').removeClass('ismore');
            $(obj).addClass('ismore');
            start = 1;
            return;
            this.getData(type, 1, 10);
          }
        },
        mounted(){
          this.type   = status;
          this.start  = start = 1;
          this.bottom = size //默认加载6条数据
          loading = end = false;
          $('.load').show();

          //this.getData(this.type, this.start, this.bottom);

          var swiperCon = this.swiperCon;
          var self      = this;

          this.$root.eventHub.$on('ddSuccess',()=>{
            this.items = [];
            this.itemsAll = [];
            this.itemDoing = [];
            this.itemDone = [];
            this.getData(this.type, this.start, this.bottom);
          })

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
            $('.first').hide();
            $('.load').show();
            return ;
          });

          swiperCon.on('slideChangeEnd', function(obj){
            var type = $('#swiper-container2 .active-nav').attr('type');
            start = 1;
            self.getData(type, start, size);
            return ;
          });

          swiperCon.on('TouchMove', function(obj){
            $(obj).attr('class');
            $('#swiper-container3 .swiper-slide').not('.swiper-slide-active').find('.first').hide();
          });
          $('#swiper-container3 .swiper-wrapper').css('min-height', $(window).height() - $('div.header').outerHeight());
//          $(window).scroll(function(){
//            if(loading || end) return;
//            if($(document).height() - $(window).height() - $(window).scrollTop() < 80){
//              $('.loading-layer span').addClass('active');
//              loading = true;
//              //start += size;
//              start += 1;
//              self.getData(status, start, size);
//            }
//          });
          //this.tabScroll();

          $('.tab-menu a').click(function(){
            self.toggle();
            $('.loading-layer span').removeClass('active');
            $('.loading-layer div').removeClass('active');
            var type = $(this).attr('type')
            self.type = $(this).attr('type');
            if ($(this).hasClass('ismore')){
              return false;
            }
            $('.tab-menu a').removeClass('ismore');
            $(this).addClass('ismore');
            self.getData(type, 1, 10);
          })
        },
        components: {
          //组件
          swiper,
          swiperSlide
        },
        computed: {
          swiperCon() {
            return this.$refs.mySwiperCon.swiper
          }
        },
      created(){
        var self = this;
        this.getData(self.type, 1, 10);
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
        this.show = false;
        next();
      },

    }
</script>

<style scoped="scoped">
  .header{height: 0.7rem;box-shadow:0 0 5px #ebebeb;position: fixed;top: 0;width: 100%;background: #fff;z-index: 9999;padding-top: 0.3rem;}
  .headerall{padding: 0 0.2rem;overflow: hidden;}

  .header .a1{width: 0.18rem;height: 0.34rem;display: block;background: url(../../../images/back.png) no-repeat;background-size: cover;float:left;margin-top:0.2rem;}
  .header .a2{height: 0.39rem;display: block;float: right;background: url(../../../images/backdb.png) no-repeat 1.1rem 50%;background-size: 0.2rem 0.1rem;border: 1px solid #008DD3;font-size: 0.2rem;line-height: 0.39rem;text-align: center;border-radius: 0.05rem;color: #008DD3;margin-top: 0.15rem;padding-left: 0.16rem;padding-right: 0.4rem;}

  #swiper-container2{border-bottom: 1px solid #ccc;overflow:visible;    position: fixed;background: #Fff;z-index: 6;top: .88rem;width: 100%;}
  #swiper-container2 .swiper-slide{
    line-height:0.75rem !important;
    color:#666 !important;
    font-size:0.26rem !important;
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
  .header ul{position: absolute;right: 0.2rem;top:1.05rem;background: #fff;z-index: 1;}
  .header ul li a{font-size:0.2rem;width:1.4rem;height: 0.64rem;line-height: 0.64rem;display: block;border-bottom: 0.01rem solid #ebebeb;text-align: center;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}
  .nav-c{width: 100%;overflow: hidden;}
  .navall{padding:0 0.2rem;overflow: hidden;}
  .navall img{width: 0.96rem;height:0.96rem;border-radius: 0.05rem;display: block;padding: 0.31rem 0;float: left;}
  .navall ul{float: left;margin-top: 0.39rem;margin-left: 0.26rem;}
  .navall .li1{font-size:0.22rem;line-height: 0.41rem;color: #242424;}
  .navall .li2{font-size:0.2rem;color: #008dd3;line-height: 0.42rem;}
  .navall .nav-r{float: right;font-size: 0.2rem;color: #adadad;background: url(../../../images/backright.png)no-repeat 0.73rem 50%;background-size: 0.1rem 0.2rem ;margin-top: 0.68rem;padding-right: 0.4rem;}
</style>
