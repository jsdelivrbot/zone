<template>
  <div id="headed">
    <my-header title="专家答疑"></my-header>
    <!--<div style="padding-top:1.4rem">-->
    <swiper :options="swiperOptionTab" id="swiper-container2" ref="mySwiperTab">
      <swiper-slide :class="type==1 ? 'active-nav shux' : 'shux'" type="1"><span>全部</span></swiper-slide>
      <swiper-slide :class="type==2 ? 'active-nav shux' : 'shux'" type="2"><span>进行中</span></swiper-slide>
      <swiper-slide :class="type==3 ? 'active-nav' : ''" type="3"><span>已完成</span></swiper-slide>
    </swiper>
    <div class="page-loadmore backtop" style="padding-top:1.7rem;overflow:auto;font-size: 0.2rem;height:calc(100% - 1.7rem);">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">

        <swiper :options="swiperOptionCon" id="swiper-container3" ref="mySwiperCon">
          <swiper-slide>
            <div class="first" type="1" v-if="this.itemsAll.length>0">
              <div class="navall" v-for="(list, index) in itemsAll" :key="index">
                <div class="nav">
                  <router-link :to="'/zjdetail?id='+list.wo_id" style="display: flex;">
                    <ul class="nav-ul">
                      <li class="nav-ul-li1"> <em style="font-style: normal;" v-if="list.catename">[{{list.catename}}]</em> {{list.wo_title}} </li>
                      <li class="nav-ul-li2"><span class="li1-sp1">{{list.statusMsg}}</span><span class="li1-sp2">最后发言时间：</span><span class="li1-sp3">{{list.lasttime}}</span></li>
                    </ul>
                  </router-link>
                </div>
              </div>
              <div class="loading-layer">
                <span class="spinner-holder"><img src="../../images/loading.gif" /></span>
                <div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="first" type="2" v-if="this.itemsDoing.length>0">
              <div class="navall" v-for="(list, index) in itemsDoing" :key="index">
                <div class="nav">
                  <router-link :to="'/zjdetail?id='+list.wo_id" style="display: flex;">
                    <ul class="nav-ul">
                      <li class="nav-ul-li1"><em style="font-style: normal;" v-if="list.catename">[{{list.catename}}]</em> {{list.wo_title}} </li>
                      <li class="nav-ul-li2"><span class="li1-sp1">{{list.statusMsg}}</span><span class="li1-sp2">最后发言时间：</span><span class="li1-sp3">{{list.lasttime}}</span></li>
                    </ul>
                  </router-link>
                </div>
              </div>
              <div class="loading-layer">
                <span class="spinner-holder"><img src="../../images/loading.gif" /></span>
                <div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="first" type="3" v-if="this.itemsDone.length>0">
              <div class="navall" v-for="(list, index) in itemsDone" :key="index">
                <div class="nav">
                  <router-link :to="'/zjdetail?id='+list.wo_id" style="display: flex;">
                    <ul class="nav-ul">
                      <li class="nav-ul-li1"> <em style="font-style: normal;" v-if="list.catename">[{{list.catename}}]</em> {{list.wo_title}} </li>
                      <li class="nav-ul-li2"><span class="li1-sp1">{{list.statusMsg}}</span><span class="li1-sp2">最后发言时间：</span><span class="li1-sp3">{{list.lasttime}}</span></li>
                    </ul>
                  </router-link>
                </div>
              </div>
              <div class="loading-layer">
                <span class="spinner-holder"><img src="../../images/loading.gif" /></span>
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
    <div class="tzbt">
      <router-link :to="'/classify'">
        <img src="../../images/tzbt.png" />
      </router-link>
    </div>
    <backtop></backtop>
    <pop style="text-align: center" class="index_tip" :title="tip"></pop>
    <load v-show="isload"></load>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import { setCookie, getCookie } from '../../assets/js/cookie.js'
  import { getOpenUrl ,getToken} from '../../assets/js/common.js'
  var status = 1,
    start = 1,
    doingstart = 1,
    donestart = 1,
    size = 12,
    loading = false,
    end = false,
    query=0
  export default {
    data() {
      return {
        isload:false,
        noData: '',
        itemsAll: [],
        itemsDoing: [],
        itemsDone: [],
        fabu:0,
        type: 1,
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
        allLoaded:false,
        scrollMode: "auto",
        topStatus: '',
        tip:''
      }
    },
//		created(){
//			query=0
//			this.$store.commit('HOMESTOPF',query)
//			$(".backtop").animate({"scrollTop":this.scroll},0)
//
//			console.log(query)
//		},
    mounted() {
      this.scroll = query = 0;
      $('.backtop').scroll(()=> {
        this.scroll=$('.backtop').scrollTop();
      });
      //获取全部答疑
      this.type = status;
      this.start = this.sDoing = this.sDone = start;
      this.bottom = size;
      this.end = this.eDoing = this.eDone = end; //是否已加载完成

      //获取数据
      this.isload = true;
      //$('.load').show();


      this.$root.eventHub.$on('tjSuccess', () => {
        this.type = status = 1;
        this.start = this.sDoing = this.sDone = start = 1; //开始条数
        loading = false;
        this.end = this.eDoing = this.eDone = end = false; //是否已加载完成
        this.getData(1, 1, this.bottom);
      })

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
        return;
      });

      swiperCon.on('slideChangeEnd', function(obj) {
        loading = false;
        self.type = parseInt($('#swiper-container2 .active-nav').attr('type'));
        end = false;
        start = 1;
        self.getData(self.type, start , size);
        return;
      });

      $('#swiper-container3 .swiper-wrapper').css('min-height', $(window).height() - $('div.header').outerHeight() - $('#swiper-container2').outerHeight());
//
    },
    computed: {
      swiperTab() {
        return this.$refs.mySwiperTab.swiper
      },
      swiperCon() {
        return this.$refs.mySwiperCon.swiper
      }
    },
    components: {
      //组件
      swiper,
      swiperSlide
    },
    methods: {
      loadTop() { // 刷新数据的操作
        var self=this
        start = 1
        this.type = status = parseInt(this.type); //获取数据类型
        this.$http.get(getOpenUrl() + "workExpertIndex", {
          headers: {
            'Authorization': 'Bearer ' + getToken()
          },
          params: {
            typen: this.type,
            page: start,
            limit: ''
          }
        }).then((res) => {
          this.$refs.loadmore.onTopLoaded();
          $('div[type="' + this.type + '"] .loading-layer span').removeClass('active');
          $('div[type="' + this.type + '"] .loading-layer div').removeClass('active');
          if(res.body.code=='0000') {
            var data = res.body.data.topiclist;
            if (res.body.data.count > 0) {
              switch (this.type) {
                case 1:
                  self.itemsAll.splice(0, self.itemsAll.length);
                  $.each(data, function (key, val) {
                    self.itemsAll.push(val);
                  });
                  self.start = res.body.data.page;
                  break;
                case 2:
                  self.itemsDoing.splice(0, self.itemsDoing.length);
                  $.each(data, function (key, val) {
                    self.itemsDoing.push(val);
                  });
                  self.sDoing = res.body.data.page;
                  break;
                case 3:
                  self.itemsDone.splice(0, self.itemsDone.length);
                  $.each(data, function (key, val) {
                    self.itemsDone.push(val);
                  });
                  self.sDone = res.body.data.page;
                  break;
              }
            } else {

              $('div[type="' + type + '"] .loading-layer div').addClass('active');
            }
          }else{
            this.tip = '暂无数据';
            $('.index_tip').show();
            setTimeout(()=> {
              $('.index_tip').hide();
            }, 1000)
          }
          $('.load').hide();
        });
      },
      loadBottom() { // 加载更多数据的操作
        //this.allLoaded = true;// 若数据已全部获取完毕
        start += 1;
        setTimeout(()=> {
          this.getData(this.type, start, size);
          this.$refs.loadmore.onBottomLoaded();
        }, 1000);
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      getData(type, page, size) {
        this.type = status = parseInt(type); //获取数据类型

        var self = this;
        switch(this.type){
          case 1:
            //全部
            if(page <= this.start && this.itemsAll.length > 0) {
              start = this.start;
              this.isload = false;
              $('.load').hide();
              end = this.end;
              $('div[type="' + type + '"]').parent().parent().css('height', this.itemsH);
              $('div[type="' + type + '"] .loading-layer span').removeClass('active');
              if(end) {
                $('div[type="' + type + '"] .loading-layer div').addClass('active');
              } else {
                $('div[type="' + type + '"] .loading-layer div').removeClass('active');
              }
              return;
            }else{
              this.start = start = page; //重新赋值开始调试
            }
            break;
          case 2:
            //进行中
            if(page <= this.sDoing && this.itemsDoing.length > 0) {
              start = this.sDoing;
              this.isload = false;
              $('.load').hide();
              end = this.eDoing;
              $('div[type="' + type + '"]').parent().parent().css('height', this.itemDoingH);
              $('div[type="' + type + '"] .loading-layer span').removeClass('active');
              if(end) {
                $('div[type="' + type + '"] .loading-layer div').addClass('active');
              } else {
                $('div[type="' + type + '"] .loading-layer div').removeClass('active');
              }
              return;
            }else{
              this.sDoing = start = page; //重新赋值开始调试
            }
            break;
          case 3:
            //已完成
            if(page <= this.sDone && this.itemsDone.length > 0) {
              start = this.sDone;
              this.isload = false;
              $('.load').hide();
              end = this.eDone;
              $('div[type="' + type + '"]').parent().parent().css('height', this.itemDoneH);
              $('div[type="' + type + '"] .loading-layer span').removeClass('active');
              if(end) {
                $('div[type="' + type + '"] .loading-layer div').addClass('active');
              } else {
                $('div[type="' + type + '"] .loading-layer div').removeClass('active');
              }
              return;
            }else{
              this.sDone = start = page; //重新赋值开始调试
            }
            break;
        }
//				if(start <= 0 && !loading) {
//					$('.load').show();
//				}

        if(start == 1) {
          this.isload = true;
          //$('.load').show();
        }

        this.$http.get(getOpenUrl() + "workExpertIndex", {
          headers: {
            'Authorization': 'Bearer ' + getToken()
          },
          params: {
            typen: type,
            page: start,
            limit: size
          }
        }).then((res) => {
          this.isload = false;
          $('div[type="' + type + '"] .loading-layer span').removeClass('active');
          $('div[type="' + type + '"] .loading-layer div').removeClass('active');
          this.fabu=res.body.fabu_auth
//					if (this.fabu == 1){
//						$('.tzbt').show()
//					}else{
//						$('.tzbt').hide()
//					}
          if(res.body.code=='0000') {
            var data = res.body.data.topiclist;
            //this.$refs.loadmore.onBottomLoaded();
            if (res.body.data.count > 0) {

              switch (this.type) {
                case 1:
                  $.each(data, function (key, val) {
                    self.itemsAll.push(val);
                  });
                  self.start = res.body.data.page;
                  break;
                case 2:
                  $.each(data, function (key, val) {
                    self.itemsDoing.push(val);
                  });
                  self.sDoing = res.body.data.page;
                  break;
                case 3:
                  $.each(data, function (key, val) {
                    self.itemsDone.push(val);
                  });
                  self.sDone = res.body.data.page;
                  break;
              }
            } else {
//						switch(this.type) {
//							case 1:
//								this.end = end = true;
//								break;
//							case 2:
//								this.eDoing = end = true;
//								break;
//							case 3:
//								this.eDone = end = true;
//								break;
//						}
              $('div[type="' + type + '"] .loading-layer div').addClass('active');
            }
          }else{
            this.tip = '暂无数据';
            $('.index_tip').show();
            setTimeout(()=> {
              $('.index_tip').hide();
            }, 1000)
          }
          loading = false;
          $('.load').hide();
        });
      },
    },
    updated() {
      var self      = this;
      if (self.type == 1){
        self.itemsH = $('div[contype="'+self.type+'"]').parent().parent().height();
      }else if(self.type == 2){
        self.itemDoingH = $('div[contype="'+self.type+'"]').parent().parent().height();
      }else if(self.type == 3){
        self.itemDoneH = $('div[contype="'+self.type+'"]').parent().parent().height();
      }
    },
    created(){
      this.type = 1; //默认加载数据类型
      this.end = this.eDoing = this.eDone = end = false; //是否加载完成
      loading = false; //是否正在加载
      this.start = this.sDoing = this.sDone = 1; //数据开始条数
      this.getData(this.type, this.start, size);
    },
    activated() {
      //路由缓存 前进后退
      $('.load').hide();
      $(".backtop").animate({"scrollTop":this.scroll},0)
    },
    beforeRouteLeave(to,from,next){
      query=this.scroll
      this.$store.commit('HOMESTOPF',query)
      next();
    }
  }
</script>

<style scoped="scoped">
  .index_tip{
    display: none;
  }
  #headed {
    width: 100%;
    /*float: left;*/
  }

  #swiper-container2 {
    border-bottom: 1px solid #ccc;
    overflow: visible;
    position: absolute;
    background: #Fff;
    z-index: 6;
    top: 1rem;
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
    line-height: 300px;
    text-align: center;
    font-size: 50px;
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

  .blue-slide {
    background: #4390EE;
  }

  .red-slide {
    background: #CA4040;
  }

  .orange-slide {
    background: #FF8604;
  }

  .tzbt {
    float:right;
    width: 1.42rem;
    height: 1.52rem;
    position: fixed;
    bottom: 0.98rem;
    right: 0;
    z-index: 999;
    /*display:none;*/
  }

  .tzbt img {
    width: 1.42rem;
    height: 1.52rem;
    display: block;
  }


  .navall {
    border-bottom: 0.01rem solid #ebebeb;
  }

  .nav {
    padding: 0 0.2rem;
  }

  .nav-ul {
    margin-top: 0.2rem;
    margin-bottom: 0.16rem;
    width: 100%;
    text-align: left;
  }

  .nav-ul-li1 {
    font-size: 0.22rem;
    color: #242424;
    line-height: 0.5rem;
  }

  .nav-ul-li2 {
    font-size: 0.2rem;
    color: #242424;
    line-height: 0.45rem;
  }

  .nav-ul-li2 .li1-sp1 {
    color: #54c2f0;
    border-right: 1px solid #54c2f0;
    height: 0.22rem;
    padding-right: 0.2rem;
  }

  .nav-ul-li2 .li1-sp2 {
    padding-left: 0.2rem;
    color: rgb(150, 150, 150)
  }

  .nav-ul-li2 .li1-sp3 {
    padding-left: 0.2rem;
    color: rgb(150, 150, 150)
  }
</style>
