<template>
  <div id="headed" style="overflow-y: scroll;">
    <div style="position: fixed;background: #fff;z-index: 10;width: 100%;">
      <div class="top">
        <div class="header">
          <div class="top-l" @click="getSearchList"></div>
          <div class="top-r" @click="toggle()">
            <span v-model="key" ref="key">圈子</span>
          </div>
          <div class="top-c"><input type="text" ref="keywords" @keyup.13="getSearchList"/></div>
          <ul v-show="show">
            <li style="text-align: center;" @click="searchQz($event)">圈子</li>
            <li style="text-align: center;" @click="searchZy($event)">资源</li>
            <li style="text-align: center;" @click="searchDy($event)">答疑</li>
            <li style="text-align: center;" @click="searchHy($event)">用户</li>
          </ul>

        </div>
      </div>
    </div>
    <!--<my-footer></my-footer>-->
    <!--<div v-show="isSearch">-->
    <swiper :options="swiperOptionTab" id="swiper-container2" ref="mySwiperTab" v-show="isSearch">
      <swiper-slide class="active-nav body_bottom" type="1"><span>圈子</span></swiper-slide>
      <swiper-slide class="body_bottom" type="2"><span>资源</span></swiper-slide>
      <swiper-slide class="body_bottom" type="3"><span>答疑</span></swiper-slide>
    </swiper>
    <div v-show="isSearch" class="page-loadmore backtop" style="position:relative;top:2rem;bottom:0;overflow:scroll;font-size: 0.2rem;height: calc(100% - 2.98rem);">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="isSearchLoadmore">

        <swiper :options="swiperOptionCon" id="swiper-container3" ref="mySwiperCon">
          <swiper-slide>
            <div class="first" type="1" contype="1" v-if="items.length>0">
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
                        <div class="nav-left" :style="data.is_level!=null?'width:'+'100%':''">
                          <ul>
                            <li class="li1">{{data.name}}</li>
                            <li class="li2" v-html="data.intro"></li>
                            <li class="li3">
                              <span class="li3-p1">成员数：</span>
                              <span class="li3-p2">{{data.membercount}}</span>
                            </li>
                          </ul>
                        </div>
                      </router-link>
                      <div class="nav-right">
                        <li class="li4" @click="joinQz(data.id,data.jtime)" :id="'join_'+data.id" v-show='data.is_level==null&&data.need_invite!=2'>加入</li>
                      </div>
                    </div>
                  </div>
                </div>
                <!--</a>-->
              </div>
              <div class="loading-layer">
                <span class="spinner-holder"><img src="../../images/loading.gif" /></span>
                <div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="first1" type="2" contype="2" v-if="itemsAll.length>0">
              <div class="tip-bottom" v-for="(list,index) in itemsAll" :key="index">
                <router-link :to="'/details?id='+list.ziy_id+'&type='+list.catid" style="display: flex;color: #242424;width: 100%;padding: 0 0.2rem;">
                  <div class="tip-bottom-l">
                    <img :src="list.thumb" v-lazy="list.thumb" />
                  </div>
                  <div class="tip-bottom-r">
                    <ul>
                      <li class="li1">{{list.title}}</li>
                      <li class="li3">
                        <span class="li3-p1">{{list.ctime}}</span>
                        <span class="li3-p3">{{list.lognum}}</span>
                        <span class="li3-p2">{{list.msgnum}}</span>
                      </li>
                    </ul>
                  </div>
                </router-link>
              </div>
              <div class="loading-layer">
                <span class="spinner-holder"><img src="../../images/loading.gif" /></span>
                <div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="first3" type="3" contype="3" v-if="itemsDoing.length>0">
              <div class="navall" v-for="(list, index) in itemsDoing" :key="index">
                <div class="nav">
                  <router-link :to="'/subed?id='+list.wo_id" style="display: flex;">
                    <ul class="nav-ul">
                      <li class="nav-ul-li1">{{list.wo_title}} </li>
                      <li class="nav-ul-li2"><span class="li1-sp1" v-if="list.statusMsg">{{list.statusMsg}}</span><span class="li1-sp2">最后发言时间：</span><span class="li1-sp3">{{list.datetime}}</span></li>
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

    <!--<div v-show="!isSearch">-->
    <!--<div v-show="isQuan" v-if="items.length>0">-->
    <div v-show="isQuan" class="page-loadmore backtop" style="position:relative;top:0.88rem;bottom:0;overflow:scroll;font-size: 0.2rem;height: calc(100% - 0.88rem);">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="isQuanLoadmore">

        <div class="first" v-if="items.length>0">
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
                    <div class="nav-left"  :style="data.is_level!=null?'width:'+'100%':''">
                      <ul>
                        <li class="li1">{{data.name}}</li>
                        <li class="li2" v-html="data.intro"></li>
                        <li class="li3">
                          <span class="li3-p1">成员数：</span>
                          <span class="li3-p2">{{data.membercount}}</span>
                        </li>
                      </ul>
                    </div>
                  </router-link>
                  <div class="nav-right">
                    <li class="li4" @click="joinQz(data.id,data.jtime)" :id="'join_'+data.id" v-show='data.is_level==null&&data.need_invite!=2'>加入</li>
                  </div>
                </div>
              </div>
            </div>
            <!--</a>-->
          </div>
          <div class="loading-layer">
            <span class="spinner-holder"><img src="../../images/loading.gif" /></span>
            <div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
          </div>
        </div>
      </mt-loadmore>
    </div>
    <!--</div>-->

    <!--<div v-show="isZy">-->
    <div v-show="isZy" class="page-loadmore backtop" style="position:relative;top:0.88rem;bottom:0;overflow:scroll;font-size: 0.2rem;height: calc(100% - 0.88rem);">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="isZyLoadmore">

        <div class="first1" v-if="itemsAll.length>0">
          <div class="tip-bottom" v-for="(list,index) in itemsAll" :key="index">
            <router-link :to="'/details?id='+list.ziy_id+'&type='+list.catid" style="display: flex;color: #242424;">
              <div class="tip-bottom-l">
                <img :src="list.thumb" v-lazy="list.thumb" />
              </div>
              <div class="tip-bottom-r">
                <ul>
                  <li class="li1">{{list.title}}</li>
                  <li class="li3">
                    <span class="li3-p1">{{list.ctime}}</span>
                    <span class="li3-p3">{{list.lognum}}</span>
                    <span class="li3-p2">{{list.msgnum}}</span>
                  </li>
                </ul>
              </div>
            </router-link>
          </div>
          <div class="loading-layer">
            <span class="spinner-holder"><img src="../../images/loading.gif" /></span>
            <div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
          </div>
        </div>

      </mt-loadmore>
    </div>
    <!--</div>-->

    <!--<div v-show="isDy">-->
    <div v-show="isDy" class="page-loadmore backtop" style="position:relative;top:0.88rem;bottom:0;overflow:scroll;font-size: 0.2rem;height: calc(100% - 0.88rem);">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="isDyLoadmore">

        <div class="first3" v-if="itemsDoing.length>0">
          <div class="navall" v-for="(list, index) in itemsDoing" :key="index">
            <div class="nav">
              <router-link :to="'/subed?id='+list.wo_id" style="display: flex;">
                <ul class="nav-ul">
                  <li class="nav-ul-li1">{{list.wo_title}} </li>
                  <li class="nav-ul-li2"><span class="li1-sp1" v-if="list.statusMsg">{{list.statusMsg}}</span><span class="li1-sp2">最后发言时间：</span><span class="li1-sp3">{{list.datetime}}</span></li>
                </ul>
              </router-link>
            </div>
          </div>
          <div class="loading-layer">
            <span class="spinner-holder"><img src="../../images/loading.gif" /></span>
            <div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
          </div>
        </div>

      </mt-loadmore>
    </div>
    <!--</div>-->

    <!--<div v-show="isHy" style="padding-top:0.87rem;" >-->
    <div v-show="isHy" class="page-loadmore backtop" style="position:relative;top:1.28rem;bottom:0;overflow:scroll;font-size: 0.2rem;height: calc(100% - 2.28rem);">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="isHyLoadmore">

        <div class="fri" v-if="hyitems.length>0">
          <div class="nav" v-for="(member,index) in hyitems" :key="index">
            <router-link style="display: block;width:100%;" :to="{path:'/yesfriend',query:{uid:member.uid}}">
              <p class="li2" style="margin-right: 0.2rem;">
                <img :src="member.face" v-lazy="member.face"/>
                <!--<img v-if="member.face==0" src="../../../images/peo.png" />-->
              </p>
            </router-link>
            <ul>
              <router-link style="display: block;width:100%;" :to="{path:'/yesfriend',query:{uid:member.uid}}">
                <li class="li1 l">{{member.uname}}<span class="sp1" v-if="member.note">({{member.note}})</span><span class="sp2"><img v-if="member.sex==1" src="../../images/men.png"/><img v-if="member.sex==0" src="../../images/girl.png"/></span></li>
                <li style="height: 0.3rem;float: left;width: 4.6rem">
                  <img  :src="mems.icon" alt="" style="height:0.3rem;float: left;margin-right: 0.1rem"v-for="(mems,index) in member.usergroup" v-if="mems.icon!=''">
                  <!--<span class="li" style="line-height: 0;height: 0;padding: 0.1rem 0.1rem;border-radius: 0.05rem;font-size:0.14rem;margin-right: 0.05rem;margin-top: 0.04rem;color: #fff;margin-left: 0.05rem;float: left;" v-for="(mems,index) in member.usergroup" v-if="mems.type=='member'" :style="'background:'+mems.bcolor">{{mems.title}}</span>-->
                </li>
                <li class="li4 l" v-if="member.signature">{{member.signature}}</li>
                <li class="li4 l" v-if="!member.signature" style="height:0.38rem">暂无</li>
              </router-link>

              <li class="navp" @click="isTalking(member.uid,member.uname)"></li>
            </ul>
          </div>
          <div class="loading-layer">
            <span class="spinner-holder"><img src="../../images/loading.gif" /></span>
            <div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
          </div>
        </div>

      </mt-loadmore>
    </div>
    <!--</div>-->
    <!--</div>-->

    <div class="load" style="display:none;">
      <div class="load-container load4">
        <div class="loader"> <i></i></div>
      </div>
    </div>
    <div class="yzall" v-show="shows">
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
    <div class="mark" v-show="shows" @click="toggles()"></div>
    <pop style="text-align: center" class="tips" :title="tip"></pop>
    <!--<backtop></backtop>-->
    <load v-show="isload"></load>
  </div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import {setCookie,getCookie} from '../../assets/js/cookie.js';
  import {getOpenUrl,getToken} from '../../assets/js/common.js'
  //var token  = getToken();
  var top=''
	var status = 1,
		start = 1,
		size = 10,
		loading = false,
		end = false,
    DEBOUNCE_TIME  = 500;
	export default {
		data() {
			return {
			  isload:false,
				show: false,
        shows:false,
				noData: '',
				items: [],
        itemsAll: [],
        itemsDoing: [],
        hyitems:[],
				tip: '',
				typeUid: '',
				key: '',
				isSearch: true,
				isQuan: false,
				isZy: false,
				isDy: false,
        isHy:false,
				searchType: 1,
        fn:'',
        id:'',
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
        allLoaded: false,
        scrollMode: "auto",
        topStatus: ''
			}
		},
		methods: {
//      tabScroll(){
//        window.addEventListener("scroll",this.toScroll);
//      },
//      toScroll(){
//        if(loading || end || this.scrollTop > $(window).scrollTop()) return;
//        this.srcollTop = $(window).scrollTop();
//        if($(document).height() - $(window).height() - $(window).scrollTop() < 80) {
//          $('div[contype="' + this.type + '"] .loading-layer span').addClass('active');
//          loading = true;
//          //self.start += size;
//          switch(this.type){
//            case 1:
//              if (this.itemsStart > 0) {
//                start = this.itemsStart;
//              }
//              break;
//            case 2:
//              if (this.itemsAllStart > 0) {
//                start = this.itemsAllStart;
//              }
//              break;
//            case 3:
//              if (this.itemsDoingStart > 0) {
//                start = this.itemsDoingStart;
//              }
//              break;
//          }
//          start += 1;
//          setTimeout(() => {
//            if(this.type === 4){
//              this.getHyList(this.type,start,size,this.$refs.keywords.value);
//            }else{
//              this.getData(this.type,start,size,this.$refs.keywords.value);
//            }
//          }, 1500);
//        }
//      },
			toggle() {
				this.show = !this.show;
			},
      toggles() {
        this.shows = !this.shows;
      },
      submit() {
        //this.idData = [];
        this.$http.post(getOpenUrl() + "joinValidateGroup", {
          gids: this.idData,
          text: this.$refs.val.value
        },{
          headers:{"Authorization": "Bearer " + getToken()}
        }).then((res) => {
          if(res.body.code == '0000') {
            this.$root.eventHub.$emit('tjqzSuccess');
            this.tip = res.body.msg;
            $('.tips').show();
            setTimeout(function(){
              $('.tips').hide();
            },1000)
            $('#join_'+this.id).hide();
            this.shows = false;
          }
        })
      },
      joinQz(id,time){
        this.idData = [];
        this.idData.push(id);
        console.log(this.idData);
        if(time==0){
          this.id = id;
          this.toggles();
        }else{
          this.$http.post(getOpenUrl() + "/joingroup", {
            gids:[id]
          },{
            headers:{"Authorization": "Bearer " + getToken()}
          }).then((res)=>{
            if(res.body.status==1){
              this.$root.eventHub.$emit('tjqzSuccess');
              $('#join_'+ id).hide();
            }else{
              this.tip = res.body.error_description;
              $('.tips').show();
              setTimeout(function(){
                $('.tips').hide();
              },1000)
            }
          });
        }
      },
      loadTop() { // 刷新数据的操作

        top=this.scroll;
        var self = this;
        var urls = '';
        start = 1;

        if(this.type == 1) {
          urls = getOpenUrl() + "group?t=" + Math.random();
          this.typeUid = '';
        } else if(this.type == 2) {
          this.typeUid = this.$route.query.uid;
          urls = getOpenUrl() + "hotresource?t=" + Math.random();
        } else if(this.type == 3) {
          this.typeUid = this.$route.query.uid;
          urls = getOpenUrl() + "nominateWork?t=" + Math.random();
        }

        if(this.type==4){
          $('.load').show();
          //            console.log(type, status)
          if (status !== this.type && !loading){
            this.items = [];
            end        = false;
            loading    = false;
          }
          status = this.type;
          var self   = this;

          this.$http.get(getOpenUrl() + '/user/newFriend', {
            headers: {
              "Authorization": "Bearer " + getToken()
            },
            params:{
              kw:this.$refs.keywords.value,
              page: start,
              limit: size
            },
          }).then((res)=>{
            $('.loading-layer span').removeClass('active');
            $('.loading-layer div').removeClass('active');
            var data = res.body.data;
            this.data = res.body.data;
            console.log(res.body);
            if(res.body.data.length==0){
              this.tip = res.body.info;
              $('.tips').show();
              setTimeout(function(){
                $('.tips').hide();
              },1000)
            }
            if (res.body.count > 0){
              self.hyitems.splice(0, self.hyitems.length);
              self.allLoaded = false;
              $.each(data, function(key, val){
                self.hyitems.push(val);
              });
            }else{
              $('.loading-layer div').addClass('active');
            }
            loading = false;
            $('.load').hide();
            $('.first').show();
            $('div[type="'+this.type+'"]').addClass('isload').show();

            if(self.isHy){
              self.$refs.isHyLoadmore.onTopLoaded();
            }
          });
        }else{
          setTimeout(() => {
            this.$http.get(urls, {
              headers: {
                'Authorization': 'Bearer ' +  getToken()
              },
              params: {
                uid: this.typeUid,
                type: this.type,
                page: start,
                limit: size,
                keyword: this.$refs.keywords.value
              },
            }).then((res) => {
              $('div[contype="'+this.type+'"] .loading-layer span').removeClass('active');
              $('div[contype="'+this.type+'"] .loading-layer div').removeClass('active');
              var data = res.body.data;
              if(res.body.data.length==0){
                this.tip = res.body.info;
                $('.tips').show();
                setTimeout(function(){
                  $('.tips').hide();
                },1000)
              }
              if(res.body.code == 0) {
                switch(self.type){
                  case 1:
                    self.items.splice(0, self.items.length);
                    $.each(data, function(key, val) {
                      self.allLoaded = false;
                      self.items.push(val);
                      self.itemsStart = start;
                    });
                    break;
                  case 2:
                    self.itemsAll.splice(0, self.itemsAll.length);
                    $.each(data, function(key, val) {
                      self.allLoaded = false;
                      self.itemsAll.push(val);
                      self.itemsAllStart = start;
                    });
                    break;
                  case 3:
                    self.itemsDoing.splice(0, self.itemsDoing.length);
                    $.each(data, function(key, val) {
                      self.allLoaded = false;
                      self.itemsDoing.push(val);
                      self.itemsDoingStart = start;
                    });
                    break;
                }
              } else {
                $('div[contype="'+this.type+'"] .loading-layer div').addClass('active');
              }
              loading = false;
              $('.load').hide();
              //$('.first').show();
            },function(err) {
              this.$router.push({
                path: '/login',
              });
              console.log('请求失败', err);
            });
            self.allLoaded = false;
            if(self.isSearch){
              self.$refs.isSearchLoadmore.onTopLoaded();
            }else if(self.isQuan){
              self.$refs.isQuanLoadmore.onTopLoaded();
            }else if(self.isZy){
              self.$refs.isZyLoadmore.onTopLoaded();
            }else if(self.isDy){
              self.$refs.isDyLoadmore.onTopLoaded();
            }
          }, 1500);
        }
      },
      loadBottom() { // 加载更多数据的操作
        //this.allLoaded = true;// 若数据已全部获取完毕
        top=this.scroll;
        var self = this;
        start += 1;
        setTimeout(()=> {
          if(self.type==4){
            self.getHyList(self.type,start,size,self.$refs.keywords.value);
          }else{
            self.getData(self.type,start, size,self.$refs.keywords.value);
          }
          if(self.isSearch){
            self.$refs.isSearchLoadmore.onBottomLoaded();
          }else if(self.isQuan){
            self.$refs.isQuanLoadmore.onBottomLoaded();
          }else if(self.isZy){
            self.$refs.isZyLoadmore.onBottomLoaded();
          }else if(self.isDy){
            self.$refs.isDyLoadmore.onBottomLoaded();
          }else if(self.isHy){
            self.$refs.isHyLoadmore.onBottomLoaded();
          }
        }, 2000);

      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
			getData(type, start, size, keywords) {
//				if(status !== type && !loading) {
//					this.items = [];
//					end = false;
//					loading = false;
//				}
        top=0
        this.$store.commit('HOMESTOPF',top)
        $(".backtop").animate({"scrollTop":this.scroll},0)

				status = type;
        type = parseInt(type)
				var self = this;

				var url = '';
        self.start = start ? start : 1;
				if(type == 1) {
					url = getOpenUrl() + "group?t=" + Math.random();
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
				} else if(type == 2) {
					this.typeUid = this.$route.query.uid;
					url = getOpenUrl() + "hotresource?t=" + Math.random();

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
				} else if(type == 3) {
					this.typeUid = this.$route.query.uid;
					url = getOpenUrl() + "nominateWork?t=" + Math.random();

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
              uid: this.typeUid,
              type: type,
              page: start,
              limit: size,
              keyword: keywords
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
//            if(res.body.find_view==1){
//              this.$router.push({
//                path: '/personal',
//                //query:{gid: res.body.data.gid}
//              });
//              this.$root.eventHub.$emit('noQx');
//            }
            if(res.body.data.length==0){
              this.tip = res.body.info;
              $('.tips').show();
              setTimeout(function(){
                $('.tips').hide();
              },1000)
            }
            if(res.body.limit > 0) {
              $.each(data, function(key, val) {
                switch(type){
                  case 1:
                    self.items.push(val);
                    self.itemsStart = start;
                    break;
                  case 2:
                    self.itemsAll.push(val);
                    self.itemsAllStart = start;
                    break;
                  case 3:
                    self.itemsDoing.push(val);
                    self.itemsDoingStart = start;
                    break;
                }
              });
            } else {
              end = true;
              if(type == 1){
                this.itemsEnd  = true;
              }else if(type == 2){
                this.itemsAllEnd  = true;
              }else if(type == 3){
                this.itemsDoingEnd  = true;
              }
              self.noData = "没有更多数据"
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
			//          searchAll(e){
			//            this.$refs.key.innerHTML = e.target.innerText;
			//            this.type = 1;
			//            this.searchType = 1;
			//            //this.key = e.target.innerText;
			//            this.toggle();
			//          },
			searchQz(e) {
				this.$refs.key.innerHTML = e.target.innerText;
				this.type = 1;
				this.searchType = 1;
				//this.key = e.target.innerText;
				this.toggle();
			},
			searchZy(e) {
				this.type = 2;
				this.searchType = 2;
				this.$refs.key.innerHTML = e.target.innerText;
				//this.key = e.target.innerText;
				this.toggle();
			},
			searchDy(e) {
        this.type = 3;
        this.searchType = 3;
        this.$refs.key.innerHTML = e.target.innerText;
        //this.key = e.target.innerText;
        this.toggle();
      },
      searchHy(e) {
        this.$refs.key.innerHTML = e.target.innerText;
        //this.key = e.target.innerText;
        this.type = 4;
        this.searchType = 4;
        this.toggle();
        },
        getSearchList() {
        		this.items = [];
        		this.itemsAll = [];
        		this.itemsDoing = [];
        		this.hyitems = [];
        		this.isSearch = false;//console.log(this.searchType);
				if(this.searchType === 1) {
          this.type = 1;
          this.swiperCon.slideTo(0);
          this.isSearch = true;
					//this.isQuan = true;
					this.isZy = false;
					this.isDy = false;
          this.isHy = false;
				} else if(this.searchType === 2) {
          this.type = 2;
          this.swiperCon.slideTo(1);
          this.isSearch = true;
					this.isQuan = false;
					//this.isZy = true;
					this.isDy = false;
          this.isHy = false;
				} else if(this.searchType === 3) {
          this.type = 3;
          this.swiperCon.slideTo(2);
					this.isQuan = false;
          this.isSearch = true;
					//this.isDy = true;
					this.isZy = false;
          this.isHy = false;
				}else if(this.searchType === 4) {
                this.type = 4;
			          this.isQuan = false;
			          this.isDy = false;
			          this.isZy = false;
                this.isSearch = false;
			          this.isHy = true;
        }
          if (this.$refs.keywords.value === '') {
//          this.tip = '搜索内容不能为空';
//          $('.tip').show();
//          setTimeout(function(){
//            $('.tip').hide();
//          },1000)
            if (this.searchType === 4) {
              let self = this;
              clearTimeout(self.fn);
              self.fn = setTimeout(function () {
                self.getHyList(self.type, self.start, self.bottom, self.$refs.keywords.value);
              }, DEBOUNCE_TIME)
            } else {
              let self = this;
              clearTimeout(self.fn);
              self.fn = setTimeout(function () {
                self.getData(self.type, self.start, self.bottom, self.$refs.keywords.value);
              }, DEBOUNCE_TIME)
            }
            //console.log(this.$refs.keywords.value);
          }else{
            let self = this;
            clearTimeout(self.fn);
            self.fn = setTimeout(function(){
              self.getData(self.type, self.start, self.bottom, self.$refs.keywords.value);
            },DEBOUNCE_TIME)
            if(this.searchType === 4){
              clearTimeout(self.fn);
              self.fn = setTimeout(function () {
                self.getHyList(self.type, self.start, self.bottom, self.$refs.keywords.value);
              }, DEBOUNCE_TIME)
            }
          }
			},
      getHyList(type, start, size, key){
        top=0
        this.$store.commit('HOMESTOPF',top)
        $(".backtop").animate({"scrollTop":this.scroll},0)

        //$('.load').show();
        this.isload = true;
  //            console.log(type, status)
  if (status !== type && !loading){
    this.items = [];
    end        = false;
    loading    = false;
  }
  status = type;
  var self   = this;

  this.$http.get(getOpenUrl() + '/user/newFriend?t=' + Math.random(), {
    headers: {
      "Authorization": "Bearer " + getToken()
    },
    params:{
      kw:key,
      page: start,
      limit: size
    },
  }).then((res)=>{
    this.isload = false;
    $('.loading-layer span').removeClass('active');
    $('.loading-layer div').removeClass('active');

    $('.backtop').scroll(()=> {
      this.scroll=$('.backtop').scrollTop();
    })

    var data = res.body.data;
    this.data = res.body.data;
    console.log(res.body);
    if(res.body.data.length==0){
      this.tip = res.body.info;
      $('.tips').show();
      setTimeout(function(){
        $('.tips').hide();
      },1000)
    }
    if (res.body.count > 0){
      $.each(data, function(key, val){
        self.hyitems.push(val);
      });
      if (res.body.count < size){
        //end = true;
      }
    }else{
      end = true;
      self.noData = "没有更多数据"
      $('.loading-layer div').addClass('active');
    }
//              console.log(self.items)
    loading = false;
    $('.load').hide();
    $('.first').show();
    $('div[type="'+type+'"]').addClass('isload').show();
  });
  },
  //私信
  isTalking(id, name) {
    this.$http.get(getOpenUrl() + "pandMsg", {
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
		},
		mounted() {
			//            //路由组件的数量
			//            this.boxNum =3;
			this.type = status;
			this.start = start = 1;
			this.bottom = size //默认加载10条数据
      this.isload = true;
      //$('.load').show();
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
        self.type = parseInt($('#swiper-container2 .active-nav').attr('type'));
        end       = false;
        start     = 1;
        //$('#swiper-container3 .swiper-wrapper').css('height', 0);
        self.getData(self.type, start, size);
        return ;
      });

			$('#swiper-container3 .swiper-wrapper').css('min-height', $(window).height() - $('div.header').outerHeight() - $('div.footer').outerHeight() - $('#swiper-container2').outerHeight());
//      $(window).scroll(function(){
//        if(loading || end || this.scrollTop > $(window).scrollTop()) return;
//        this.srcollTop = $(window).scrollTop();
//        if($(document).height() - $(window).height() - $(window).scrollTop() < 80) {
//          $('div[contype="' + self.type + '"] .loading-layer span').addClass('active');
//          loading = true;
//          //self.start += size;
//          self.start += 1;
//          setTimeout(() => {
//            self.getData(self.type, self.start, size);
//          }, 1500);
//        }
//      });

      //this.tabScroll();

      //是否存在input焦点事件或图层打开事件
      $('input').focus(function(){
        //获取焦点
        let expireDays = 1000 * 60 * 60 ;
        setCookie("inputkey", 1, expireDays);
      });

      $(document).bind('click', function(e){
        var target = $(e.target);
        if(target.closest("input").length == 0 && target.closest('.a1').length == 0){
          setCookie("inputkey", '', -1);
        }
      });

		},
		components: {
			//            //组件的名称
			//            first,
			//            second,
			//            third
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
      }
    },
    beforeDestroy(){
      window.removeEventListener("scroll",this.toScroll);
    },
    beforeRouteLeave (to, from, next) {
      //路由离开时
      var isInputKey = parseInt(getCookie('inputkey'));
      if (isInputKey == 1){
        setCookie("inputkey", '', -1);
        next(false)
      }else{
        top=this.scroll
        this.$store.commit('HOMESTOPF',top)
        next()
      }
      cordova.plugins.Keyboard.shrinkView(true);
      cordova.plugins.Keyboard.disableScrollingInShrinkView(true);
    },
    activated(){
      //路由缓存 前进后退
      $('.load').hide();
      this.shows = false;
      $('.tips').hide();
      $(".backtop").animate({"scrollTop":this.scroll},0)

      android.showTabs();
    }
		//        watch: {
		//            index: function (newValue, oldValue) {
		//                this.marginLeft = 0 - this.index * 6.4;
		//
		//            }
		//        }
	}
</script>

<style scoped="scoped">
  .tips{display:none;}

  #headed {
    width: 100%;
    /*overflow: hidden;*/
    float: left;
  }
  .body_bottom {
    height: 0.73rem;
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


  .top {
    padding: 0 0.2rem;
    padding-top: 0.5rem;
    height: 0.88rem;
    position: relative;
  }

  .header {
    z-index: 9999;
    width: calc(100% - 0.4rem);
    height: 0.5rem;
    border: 1px solid #e9eff0;
    background: #f6fbfc;
    position: absolute;
    top: 70%;
    transform: translateY(-50%);
    border-radius: 0.05rem;
  }

  .top-l {
    border-left: 1px solid #e9eff0;
    width: 0.65rem;
    height: 0.5rem;
    background: url(../../images/searchb.png)no-repeat 50% 50%;
    background-size: 0.24rem 0.24rem;
    float: right;
  }

  .top-c {
    height: 100%;
    width: 70%;
    float: left;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .top-c input {
    display: block;
    width: 100%;
    height: 100%;
    padding-left: 0.1rem;
    font-size: 0.2rem;
  }

  .top-r {
    width: 1rem;
    color: #008dd3;
    height: 0.5rem;
    font-size: 0.2rem;
    background: url(../../images/backdb.png)no-repeat 85% 50%;
    background-size: 0.24rem 0.12rem;
    float: right;
    border-top-left-radius: 0.05rem;
    border-bottom-left-radius: 0.05rem;
    border-left: 1px solid #e9eff0;
  }

  .header ul {
    width: .99rem;
    color: #1a1a1a;
    line-height: 0.5rem;
    font-size: 0.22rem;
    position: absolute;
    top: 0.49rem;
    right: 0.65rem;
    background: #fff;
    border: 1px solid #e9eff0;
  }

  .top-r span {
    margin-top: 0.12rem;
    margin-left: 0.2rem;
    display: block;
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
    height:0.7rem;
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
  #swiper-container2{border-bottom: 1px solid #ccc;overflow:visible;position: fixed;background: #Fff;z-index: 6;top:1.3rem;width: 100%;}

  .first{
    /*padding-bottom: 0.98rem;*/
  }
  .first .tip-bottom {
    padding: 0.3rem 0;
    display: flex;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    border-bottom: 1px solid #e0e0e0;
  }

  .first1 .tip-bottom a {
    margin: 0 auto;
  }

  .first .tip-bottom-l {
    width: 2.11rem;
    height: 1.42rem;
    float: left;
    border-radius: 0.1rem;
    overflow: hidden;
  }

  .first .tip-bottom-l img {
    width: 2.11rem;
    height: 1.42rem;
    object-fit: cover;
  }

  .first .tip-bottom-r {
    width: 3.9rem;
    height: 1.42rem;
    flex: 1;
    position: relative;
    margin-left: 0.15rem;
  }

  .first .nav-left {
    width: 2.7rem;
    float: left;
  }

  .first .tip-bottom-r ul {
    height: 1.42rem;
  }

  .first .tip-bottom-r .li1 {
    line-height: normal;
    font-size: 0.22rem;
    color: #008dd3;
    margin-bottom:.05rem
  }

  .first .tip-bottom-r .li2 {
    line-height: 0.24rem;
    /*height: 0.47rem;*/
    font-size: 0.2rem;
    color: #afafaf;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
    margin-top: 0.1rem;
  }

  .first .tip-bottom-r .li3 {
    line-height: 0.18rem;
    width: 100%;
    height: 0.18rem;
    font-size: 0.2rem;
    margin-top: 0.15rem;
    color: #afafaf;
    float: left;
    position: absolute;
    bottom: 0.1rem;
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

  .first1 .tip-bottom {
    display: flex;
  }

  .first1 .tip-bottom-l {
    width: 2.11rem;
    height: 1.42rem;
    float: left;
    margin-top: 0.3rem;
  }

  .first1 .tip-bottom-l img {
    width: 2.11rem;
    height: 1.42rem;
    border: 0;
    display: block;
    object-fit: cover;
  }

  .first1 .tip-bottom-r {
    width: 3.9rem;
    margin-top: 0.3rem;
    flex: 1;
  }

  .first1 .tip-bottom-r ul {
    height: 1.42rem;
    border-bottom: 1px solid #ebebeb;
    margin-left: 0.24rem;
  }

  .first1 .tip-bottom-r .li1 {
    line-height: 0.47rem;
    font-size: 0.22rem;
    color: #008dd3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .first1 .tip-bottom-r .li3 {
    line-height: 0.3rem;
    height: 0.3rem;
    font-size: 0.2rem;
    margin-top: 0.47rem;
    color: #242424;
  }

  .first1 .tip-bottom-r span {
    display: block;
    float: left;
    height: 0.3rem;
  }

  .first1 .tip-bottom-r .li3-p1 {
    background: url(../../images/fbsj.png) no-repeat;
    background-size: 0.3rem auto;
    padding-left: 0.4rem;
    float: left;
  }

  .first1 .tip-bottom-r .li3-p2 {
    background: url(../../images/sl.png) no-repeat;
    background-size: 0.3rem auto;
    padding-left: 0.4rem;
    float: right;
    width: .4rem;
  }

  .first1 .tip-bottom-r .li3-p3 {
    /*background: url(../../images/hf.png) no-repeat;*/
    background: url(../../images/zixun.png) no-repeat;
    background-size: 0.3rem auto;
    padding-left: 0.4rem;
    margin-left: 0.21rem;
    float: right;
    width: .4rem;
    text-align:center;
  }

  .first3 .navall {
    border-bottom: 1px solid #ebebeb;
  }

  .first3 .nav {
    padding: 0 0.2rem;
  }

  .first3 .nav-ul {
    margin-top: 0.2rem;
    margin-bottom: 0.16rem;
    width: 100%;
    text-align: left;
  }

  .first3 .nav-ul-li1 {
    font-size: 0.22rem;
    color: #242424;
    line-height: 0.5rem;
  }

  .first3 .nav-ul-li2 {
    font-size: 0.2rem;
    color: #242424;
    line-height: 0.45rem;
  }

  .first3 .nav-ul-li2 .li1-sp1 {
    color: #54c2f0;
    border-right: 1px solid #54c2f0;
    height: 0.22rem;
    padding-right: 0.2rem;
  }

  .first3 .nav-ul-li2 .li1-sp2 {
    /*padding-left: 0.2rem;*/
    color: rgb(150, 150, 150)
  }

  .first3 .nav-ul-li2 .li1-sp3 {
    padding-left: 0.2rem;
    color: rgb(150, 150, 150)
  }


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


  .fri .nav{padding-left: 0.2rem;}

  .fri .nav ul{margin-top: 0.26rem;overflow: hidden;padding-bottom: 0.25rem;border-bottom: 1px solid #ebebeb;position: relative;margin-right: 0.2rem;}
  .fri .nav ul .l{float:left;width: 4.46rem;}
  .fri .navp{width:0.34rem;height:0.28rem;background: url(../../images/sixin.png)no-repeat;background-size: 0.34rem 0.28rem;display: block;position: absolute;right: 0.2rem;top: 0.25rem;}


  .fri .li1{line-height:0.41rem;font-size:0.22rem;color: #242424;}
  .fri .li1 .sp1{font-size: 0.21rem;color: #949494;margin-left: 0.08rem;}
  .fri .li1 .sp2 img{width: 0.19rem;height: 0.19rem;margin-left: 0.08rem;}
  .fri .nav .li2{height:0.62rem;width:0.62rem;position: relative;overflow:hidden;border-radius:50%;margin-top: 0.06rem;float: left;}
  .fri .nav .li2 img{width:100%;height: 100%;object-fit:cover;}
  .fri .nav .li3{height:1.24rem;border-bottom:1px solid #e0e0e0;width:4.87rem;float:right;position:relative;}
  .fri .p{height:0.69rem;position: absolute;top: 50%;-webkit-transform: translateY(-50%);-moz-transform: translateY(-50%);-ms-transform: translateY(-50%);-o-transform: translateY(-50%);transform: translateY(-50%);}
  .fri .nav .li3 .p1{font-size:0.26rem;line-height:0.38rem;}
  .fri .nav .li3 p{font-size:0.20rem;}
  .fri .nav .li3 .p2{float:left;line-height:0.31rem;}
  .fri .nav .li3 .p3{margin-left:0.3rem;}
  .fri .nav .li4{line-height: 0.38rem;color: #949494;font-size:0.20rem;}
</style>

