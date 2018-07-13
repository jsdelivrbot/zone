<template>
  <div class="friend" style="overflow-y: scroll;" ref="a1">
    <div class="header">
      <div class="header-top">
        <a @click="back" href="javascript:history.back(-1);" class="a1"></a>
        <!--<a @click="back" class="a1"></a>-->
        <div v-show="data.is_sandbtn" class="dian" @click="toggle()"></div>
        <div v-show="data.is_sixin" class="user" @click="isTalking(data.uid,data.uname)"></div>
        <div v-show="data.is_tjbtn" class="ld" @click="toggles()"></div>
      </div>
    </div>
   <div class="backtop" style="height:100%;overflow: auto;position: relative;">
     <div class="back" :style="'background:url('+data.background+');'">
      <span class="body">
        <img :src="data.face" v-lazy="data.face"/>
        <!--<img v-if="data.face==0" src="../../../images/personLogo.png" />-->
      </span>
    </div>
    <div class="radius-white"></div>
    <div class="center">
        <div class="center-t">
          <div class="p1">{{data.uname}}<span v-if="data.note">({{data.note}})</span></div>
          <p class="p3" v-if="data.sex==1"></p>
          <p class="pv" v-if="data.sex==0"></p>
          <!--<p class="p2">vip</p>-->
          <div style="text-align:center;line-height: normal;margin:.1rem 0;">
            <div class="p2" v-for="(data,index) in data.usergroup" :key="index" v-bind:class="{isColor:data.icon!=''}" :style="data.bcolor ? 'background-color:'+data.bcolor : ''">
              <img v-if="data.icon!=''" :src="data.icon" alt="" style="height:.3rem;margin-right: 0.1rem;">
              <em v-if="data.icon==''" style="font-style:normal">{{data.title}}</em>
            </div>
          </div>

        </div>
        <div v-show="data.is_chakan" class="center-t-b" v-if="data.signature">
            <p class="p4"></p>
            <p class="p1">{{data.signature}}</p>
        </div>
        <div v-show="data.is_chakan" class="center-b">
            <dl>
                <dt class="dt1"></dt>
                <dd class="dd1">{{data.str_sex}}</dd>
            </dl>
            <dl>
                <dt class="dt2"></dt>
                <dd class="dd2">{{data.birthday}}</dd>
            </dl>
            <dl>
                <dt class="dt3"></dt>
                <dd class="dd3" style="    width: 2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;">{{data.province}}-{{data.city}}</dd>
            </dl>
        </div>
        <div v-show="data.is_chakan" class="center-b centerg">
            <dl>
                <dt class="dt">好友数</dt>
                <dd class="dd1">{{data.friendCount}}</dd>
            </dl>
            <dl>
                <dt class="dt">发帖数</dt>
                <dd class="dd2">{{data.topicCount}}</dd>
            </dl>
            <dl>
                <dt class="dt">圈子数</dt>
                <dd class="dd3">{{data.groupCount}}</dd>
            </dl>
        </div>
    </div>
    <div style="margin-top: 1.6rem;" v-show="data&&!data.is_chakan">
      <p style="text-align: center;font-size: 0.2rem;">该好友已设置权限,您无权访问当前页面!!!</p>
    </div>
    <!--<div class="taball">-->
            <!--<ul class="tab">-->
                <!--<li>-->
                    <!--&lt;!&ndash; @click="jump(index)-->
                        <!--index: 切换颜色   代表切换的路由文件-->
                        <!--:class="{'active_color': index==0}-->
                        <!--当index等于0的时候显示第一个，index：1 切换排球-->

                    <!--&ndash;&gt;-->
                    <!--<div class="body_bottom" @click="jump(0)" :class="{'active_color': index==0}">圈子</div>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<div class="body_bottom" @click="jump(1)" :class="{'active_color': index==1}">好友</div>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<div class="body_bottom" @click="jump(2)" :class="{'active_color': index==2}">帖子</div>-->
                <!--</li>-->
            <!--</ul>-->
        <!--</div>-->
        <!--&lt;!&ndash; 是否滑动-->
             <!--boxNum：代表有几个路由组件-->
             <!--marginLeft：偏移量-->
        <!--&ndash;&gt;-->
        <!--<div class="wl">-->
	    	<!--<div :class="{shift: isMove}" :style="{width: boxNum * 6.4 + 'rem', marginLeft: marginLeft + 'rem'}" @touchstart="start($event)" @touchmove="move($event)" @touchend="end($event)"   >-->
	        <!--&lt;!&ndash; 三个路由组件放置的地方 &ndash;&gt;-->
	            <!--<first></first>-->
	            <!--<second></second>-->
	            <!--<third></third>-->
	        <!--</div>-->
        <!--</div>-->
    <div v-show="data.is_chakan">
      <swiper :options="swiperOptionTab" id="swiper-container2" ref="mySwiperTab">
        <swiper-slide class="active-nav body_bottom" type="all"><span>圈子</span></swiper-slide>
        <swiper-slide class="body_bottom" type="fri"><span>好友</span></swiper-slide>
        <swiper-slide class="body_bottom" type="tiezi"><span>帖子</span></swiper-slide>
      </swiper>
      <div class="page-loadmore" style="font-size: 0.2rem;height: 100%;">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">

      <swiper :options="swiperOptionCon" id="swiper-container3" ref="mySwiperCon">
        <swiper-slide>
          <div class="first" type="all" contype="all">
            <div class="nav1" v-for="(data,index) in items" :key="index">
              <div class="nav-bottom">
                <!--<a href="#/boss">-->
                  <div class="tip-bottom">
                    <router-link :to="{path:'/listcircle',query:{
                          gid:data.id,
                          id:data.id
                    }}">
                      <div class="tip-bottom-l">
                        <img :src="data.logo" v-lazy="data.logo">
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
                            <li class="li2" :style="data.is_jiaru?'width:'+'100%':''" v-html="data.intro"></li>
                            <li class="li3">
                              <span class="li3-p1">成员数：</span>
                              <span class="li3-p2">{{data.membercount}}</span>
                            </li>
                          </ul>
                        </div>
                      </router-link>
                      <div class="nav-right">
                          <li class="li4" @click="joinQz(data.id,data.is_jiaru)" :id="'join_'+data.id" v-if="!data.is_jiaru">加入</li>
                      </div>
                    </div>
                  </div>
                <!--</a>-->
              </div>
            </div>
            <div class="loading-layer">
              <span class="spinner-holder"><img src="../../../images/loading.gif" /></span>
              <div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="first" type="fri" contype="fri">
            <div class="navall">
              <div class="fri">
                <!--<a href="#/yesfriend">-->
                  <div class="nav2" v-for="(data,index) in itemsAll" :key="index">
                    <router-link :to="{path:'/yesfriend',query:{uid:data.hao_id}}">
                      <p class="li2">
                        <img v-if="data.face!=0" :src="data.face"/>
                        <img v-if="data.face==0" src="../../../images/personLogo.png" />
                      </p>
                      <ul>
                        <li class="li1">{{data.uname}}<span v-if="data.note" class="sp1">({{data.note}})</span>
                          <span class="sp2">
                            <img v-if="data.sex==1" src="../../../images/men.png"/>
                            <img v-if="data.sex==0" src="../../../images/girl.png"/>
                          </span>
                        </li>
                        <li style="height: 0.3rem;margin-left: 0.22rem;">
													<img  :src="mems.icon" alt="" style="height:0.3rem;float: left;margin-right: 0.1rem" v-for="(mems,index) in data.usergroup" v-if="mems.icon!=''">
													<span class="li" style="line-height: 0;height: 0;padding: 0.1rem 0.1rem;border-radius: 0.05rem;font-size:0.14rem;margin-right: 0.05rem;margin-top: 0.04rem;color: #fff;margin-left: 0.05rem;float: left;" v-for="(mems,index) in data.usergroup" v-if="mems.type=='member'" :style="'background:'+mems.bcolor">{{mems.title}}</span>

												</li>
                        <!--<li class="li22" style="float: left;" v-for="(mems,index) in data.usergroup" :key="index" v-bind:class="{isColor:mems.icon!=''}" :style="mems.bcolor ? 'background-color:'+mems.bcolor : ''">
                          <img v-if="mems.icon!=''" :src="mems.icon" alt="" style="height:.3rem;">
                          <em v-if="mems.icon==''" style="font-style:normal;padding: 0.01rem;margin-left: 0;">{{mems.title}}</em>
                        </li>-->
                        <li class="li4 l" style="height:0.38rem;">{{data.signature}}</li>
                      </ul>
                    </router-link>
                  </div>
                <!--</a>-->
              </div>
            </div>
            <div class="loading-layer">
              <span class="spinner-holder"><img src="../../../images/loading.gif" /></span>
              <div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="first" type="tiezi" contype="tiezi">
            <div class="nav3" v-for="(data,index) in itemsDoing" :key="index">
              <router-link :to="{path:'/vote',query:{
                    id:data.id,
                    gid:data.gid
              }}">
                <p class="li2">
                  <img :src="data.face" v-lazy="data.face"/>
                  <!--<img v-if="data.face==0" src="../../../images/personLogo.png" />-->
                </p>
                <ul>
                  <li class="li1" style="color: #292929;">{{data.title}}</li>
                  <li class="li4">{{data.uname}}</li>
                  <li class="li5"><span class="sp1">{{data.addtime}}</span><span class="sp2">{{data.viewcount}}</span><span class="sp3">{{data.replycount}}</span></li>
                </ul>
                <!--<ul v-for="(data,index) in items" :key="index">-->
                  <!--<li class="li1">-->
                    <!--<img v-if="data.face==0" src="../../../images/personLogo.png" />-->
                    <!--<img v-if="data.face!=0" :src="data.face"/>-->
                  <!--</li>-->
                  <!--<li class="li2">{{data.title}}</li>-->
                  <!--<li class="li3">{{data.content}}</li>-->
                  <!--<li class="li4"><span class="sp1">{{data.addtime}}</span><span class="sp2">{{data.viewcount}}</span></li>-->
                <!--</ul>-->
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
    </div>
    <div class="load" style="display:none;">
      <div class="load-container load4"><div class="loader"> <i></i></div></div>
    </div>
    <div class="mark" v-show="mark" @click="none()"></div>
     <mt-popup v-model="show" position="bottom" class="up">
    <!--<div class="up" v-show="show">-->
      <ul>
        <li @click="toggle1()" style="color: #00CCFF;">备注名称</li>
        <!--<a href="#/move">-->
          <!--<router-link :to="{path:'/move',query:{-->
                    <!--fid:data.uid-->
           <!--}}">-->
            <li style="color: #00CCFF;" @click="goMove(data.uid)">修改分组</li>
        <!--</a>-->
          <!--</router-link>-->
        <div class="line"></div>
        <li style="color: #ff0000;" @click="toggle();a1()">取消</li>
      </ul>
    <!--</div>-->
     </mt-popup>

    <div class="yzall" v-show="isshow">
      <p class="forget1">
        <span class="sp1" style="color:#008DD3;">备注昵称</span>

        <span class="sp2">
							<input type="text" name="" id="" value="" ref="nicheng"/>
						</span>
        <span class="sp3">
							<input type="button" name="" id="btn1" value="取消" @click="toggle1();a1()"/>
						</span>
            <span class="sp3" id="btn2">
							<input type="button" name="" value="确认" @click="editName"/>
						</span>
      </p>
    </div>
    <div class="yzall" v-show="isTjHy">
      <p class="forget1">
        <span class="sp1" style="color:#008DD3;">添加好友</span>

        <span class="sp2">
							<input type="text" name="" id="" placeholder="请填写好友验证信息" ref="ytext"/>
						</span>
        <span class="sp3">
							<input type="button" name="" id="btn1" value="取消" @click="toggle2();a2()"/>
						</span>
        <span class="sp3" id="btn2">
							<input type="button" name="" value="确认" @click="addFriend"/>
						</span>
      </p>
    </div>
    <div class="yzalls" v-show="qzyz">
      <p class="forget">
        <span class="sp1" style="color:#008DD3;">圈子需要验证</span>
        <span class="sp2">
					<input type="text" ref="val"/>
				</span>
        <span class="sp3">
					<input type="button" name="" id="" value="提交" @click="submit()"/>
				</span>
      </p>

    </div>
    <pop style="text-align: center" class="tip" :title="tip"></pop>
  </div>
    <backtop></backtop>
  </div>
</template>
<script>
//import first from './friendchild/nofirst.vue';
//import second from './friendchild/nosecond.vue';
//import third from './friendchild/nothird.vue';
//import qs from 'qs'

import { setCookie, getCookie } from '../../../assets/js/cookie.js'
import {getOpenUrl,getToken} from '../../../assets/js/common.js'
import {swiper,swiperSlide} from 'vue-awesome-swiper';
var top = ''
var status = 'all', start = 1, size = 10, loading = false, end = false;
export default{
        data(){
            return {
                data:'',
                noData: '',
                items: [],
                itemsAll: [],
                itemsDoing: [],
                tip:'',
                id:'',
                typeUid:'',
//                itemsAll: [],
//                itemDoing: [],
//                itemDone: [],
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
                allLoaded: false,
                scrollMode: "auto",
                topStatus: '',
                isshow:false,
                isTjHy:false,
                show:false,
                qzyz:false,
                mark:false
            }
        },
        methods: {
          back(){
            setCookie("backkey", '', -1);
            this.$router.goBack();
            //android.back1();
          },
          goMove(id){
            setCookie("backkey",'', -1);
            this.$router.push({
              path: '/move',
              query:{fid:id}
            });
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
//                case 'all':
//                  if (this.itemsStart > 0) {
//                    start = this.itemsStart;
//                  }
//                  break;
//                case 'fri':
//                  if (this.itemsAllStart > 0) {
//                    start = this.itemsAllStart;
//                  }
//                  break;
//                case 'tiezi':
//                  if (this.itemsDoingStart > 0) {
//                    start = this.itemsDoingStart;
//                  }
//                  break;
//              }
//              start += 1;
//              setTimeout(() => {
//                this.getData(this.type,start, size);
//              }, 1500);
//            }
//          },
          qz_toggle() {
            let expireDays = 1000 * 60 * 60;
            if(!this.qzyz){
              this.isKey = true;
              setCookie("backkey", 1, expireDays);
            }else{
              this.isKey = false;
              setCookie("backkey", '', -1);
            }
            this.qzyz = !this.qzyz;
            this.mark=!this.mark;
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
                $('.tip').show();
                setTimeout(function(){
                  $('.tip').hide();
                },1000)
                $('#join_'+this.id).hide();
                this.qzyz = false;
                this.mark = false;
              }
            })
          },
          joinQz(id,isJiaru){
            this.idData = [];
            this.idData.push(id);
            console.log(this.idData);
            if(isJiaru==false){
              this.id = id;
              this.qz_toggle();
            }else{
              this.$http.post(getOpenUrl() + "/joingroup", {
                gids:[id]
              },{
                headers:{"Authorization": "Bearer " + getToken()}
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
            isTalking(id,name){
              this.$http.get(getOpenUrl() + "/pandMsg", {
                headers: {
                  "Authorization": "Bearer " + getToken()
                },
                params:{
                  //type:'score'
                  to_id:id
                },
              }).then((res)=>{
                this.$router.push({path: '/sixin', query: {
                  list_id:res.body.list_id,
                  to_id:id,
                  uname:name
                }});
              });
            },
            addFriend(){
              this.$http.post(getOpenUrl() + "/user/addfriend", {
                ytext:this.$refs.ytext.value,
                t_id:this.$route.query.uid
              },{
                headers:{"Authorization": "Bearer " + getToken()}
              }).then((res)=>{
                if(res.body.status){
                  console.log(res.body);
                  this.tip = res.body.data;
                  $('.tip').show();
                  setTimeout(function(){
                    $('.tip').hide();
                  },1000)
                  this.none();
                  this.getFriendContent();
                }else{
                  this.tip = res.body.error_description;
                  $('.tip').show();
                  setTimeout(function(){
                    $('.tip').hide();
                  },1000)
                  this.none();
                }
              });
            },
            getFriendContent(){
              this.$http.get(getOpenUrl() + "/user/personalHome", {
                headers: {
                  "Authorization": "Bearer " + getToken()
                },
                params:{
                  uid:this.$route.query.uid
                },
              }).then((res)=>{
                if(res.body.status){
                  console.log(res.body);
                  this.data = res.body.data;
                }
              });
            },
          editName(){
            this.$http.post(getOpenUrl() + "/user/setNote", {
                note:this.$refs.nicheng.value,
                haoy_id:this.$route.query.uid
            },{
              headers:{"Authorization": "Bearer " + getToken()}
            }).then((res)=>{
              if(res.body.status){
                console.log(res.body);
                this.tip = res.body.data;
                this.$root.eventHub.$emit('hySuccess');
                $('.tip').show();
                setTimeout(function(){
                  $('.tip').hide();
                },1000)
                this.none();
                this.getFriendContent();
                //this.data = res.body.data;
              }
            });
          },
          loadTop() { // 刷新数据的操作
            top=this.scroll;
            var self = this;
            var url = '';
            if(this.type == 'all'){
              url = getOpenUrl() + "/user/personalGroup";
              this.typeUid = this.$route.query.uid;

            }else if(this.type=='fri'){
              this.typeUid = this.$route.query.uid;
              url = getOpenUrl() + "/user/friend";
            }else if(this.type=='tiezi'){
              this.typeUid = this.$route.query.uid;
              url = getOpenUrl() + "/user/mytopic";
            }

            setTimeout(() => {
              start = 1;
              this.$http.get(url, {
                params:{
                  uid:this.typeUid,
                  type:this.type,
                  page: start,
                  limit: size
                },
                headers: {
                  "Authorization": "Bearer " + getToken()
                }
              }).then((res)=>{
                $('div[contype="'+this.type+'"] .loading-layer span').removeClass('active');
                $('div[contype="'+this.type+'"] .loading-layer div').removeClass('active');
                var data = res.body.data;
                self.items.splice(0, self.items.length);
                self.itemsAll.splice(0, self.itemsAll.length);
                self.itemsDoing.splice(0, self.itemsDoing.length);
                if (res.body.count > 0){
                  $.each(data, function(key, val){
                    switch(type){
                      case 'all':
                        //self.items.splice(0, self.items.length);
                        self.allLoaded = false;
                        self.items.push(val);
                        self.itemsStart = start;
                        break;
                      case 'fri':
                        //self.itemsAll.splice(0, self.itemsAll.length);
                        self.allLoaded = false;
                        self.itemsAll.push(val);
                        self.itemsAllStart = start;
                        break;
                      case 'tiezi':
                        //self.itemsDoing.splice(0, self.itemsDoing.length);
                        self.allLoaded = false;
                        self.itemsDoing.push(val);
                        self.itemsDoingStart = start;
                        break;
                    }
                  });
                }else{
                  if(type == 'all'){
                    this.itemsEnd  = true;
                  }else if(type == 'fri'){
                    this.itemsAllEnd  = true;
                  }else if(type == 'tiezi'){
                    this.itemsDoingEnd  = true;
                  }
                  self.allLoaded = true;
                  $('div[contype="'+this.type+'"] .loading-layer div').addClass('active');
                }
                loading = false;
                $('.load').hide();
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

//            if (status !== type && !loading){
//              this.items = [];
//              end        = false;
//              loading    = false;
//            }

            status = type;
            var self   = this;

            var url = '';
            self.start = start ? start : 1;
            if(type == 'all'){
              url = getOpenUrl() + "/user/personalGroup";
              this.typeUid = this.$route.query.uid;

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
            }else if(type=='fri'){
              this.typeUid = this.$route.query.uid;
              url = getOpenUrl() + "/user/friend";

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
            }else if(type=='tiezi'){
              this.typeUid = this.$route.query.uid;
              url = getOpenUrl() + "/user/mytopic";

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
              $('.load').show();
            }
            this.$http.get(url, {
              params:{
                uid:this.typeUid,
                type:type,
                page: start,
                limit: size
              },
              headers: {
                "Authorization": "Bearer " + getToken()
              }
            }).then((res)=>{
              $('div[contype="'+type+'"] .loading-layer span').removeClass('active');
              $('div[contype="'+type+'"] .loading-layer div').removeClass('active');

              $('.backtop').scroll(()=> {
                this.scroll=$('.backtop').scrollTop();
              })

              var data = res.body.data;
              console.log(res.body);
              if (res.body.count > 0){
                $.each(data, function(key, val){
                  switch(type){
                    case 'all':
                      self.items.push(val);
                      self.itemsStart = start;
                      break;
                    case 'fri':
                      self.itemsAll.push(val);
                      self.itemsAllStart = start;
                      break;
                    case 'tiezi':
                      self.itemsDoing.push(val);
                      self.itemsDoingStart = start;
                      break;
                  }
                });
              }else{
                end = true;
                if(type == 'all'){
                  this.itemsEnd  = true;
                }else if(type == 'fri'){
                  this.itemsAllEnd  = true;
                }else if(type == 'tiezi'){
                  this.itemsDoingEnd  = true;
                }
                //self.noData = "没有更多数据"
                self.allLoaded = false;
                $('div[contype="'+type+'"] .loading-layer div').addClass('active');
              }
//              console.log(self.items)
              loading = false;
              $('.load').hide();

              android.hideTabs();
              //$('.first').show();
              //$('div[type="'+type+'"]').addClass('isload').show();
            });
          },
          refresh(){
            this.items  = [],
            this.itemsAll = [],
            this.itemsDoing = [],
            this.swiperCon.slideTo(0);
            this.getData('all',1,10);
            this.getFriendContent();
            //location.reload();
          },
          toggles(){
            let expireDays = 1000 * 60 * 60;
            if(!this.isTjHy){
              this.isKey = true;
              setCookie("backkey", 1, expireDays);
            }else{
              this.isKey = false;
              setCookie("backkey", '', -1);
            }
            this.show=false;
            this.mark=true;
            this.isTjHy=true;
          },
          toggle(){
            let expireDays = 1000 * 60 * 60;
            if(!this.show){
              this.isKey = true;
              setCookie("backkey", 1, expireDays);
            }else{
              this.isKey = false;
              setCookie("backkey", '', -1);
            }
            this.show=!this.show;
            //this.mark=!this.mark;
            //this.$refs.a1.style.height="calc(100% - 1.64rem)";
            this.$refs.a1.style.overflow="hidden";
          },
          toggle2(){
            this.isTjHy=!this.isTjHy;
            //this.mark=!this.mark;
            //this.$refs.a1.style.height="calc(100% - 1.64rem)";
            this.$refs.a1.style.overflow="hidden";
          },
          toggle1(){
            this.show=false;
            this.mark=true;
            this.isshow=true;

            this.$http.get(getOpenUrl() + "/user/note", {
              params:{
                haoy_id:this.$route.query.uid
              },
              headers: {
                "Authorization": "Bearer " + getToken()
              }
            }).then((res)=>{
              //console.log(res.body);
              this.$refs.val.value = res.body.note;
              this.$refs.nicheng.value = res.body.note;
            });
          },
          a1(){
            this.mark=false;
            this.isshow=false;
            this.$refs.a1.style.height="";
            this.$refs.a1.style.overflow="";
          },
          a2(){
            this.mark=false;
            this.isTjHy=false;
            this.$refs.a1.style.height="";
            this.$refs.a1.style.overflow="";
          },
          none(){
            this.show=false;
            this.mark=false;
            this.isshow=false;
            this.isTjHy=false;
            this.qzyz = false;
            this.$refs.a1.style.height="";
            this.$refs.a1.style.overflow="";
            setCookie("backkey", '', -1);
          }

//          loadMore(type, obj){
//            alert($(this).attr('class'));
//            if ($(obj).hasClass('ismore')){
//              return false;
//            }
//            alert($(obj).hasClass('ismore'));
//            $('.tab-menu a').removeClass('ismore');
//            $(obj).addClass('ismore');
//            start = 0;
//            return;
//            this.getData(type, 0, 10);
//          }
        },
        mounted(){
            this.getFriendContent();

          this.type   = status;
          this.start  = start = 1;
          this.bottom = size //默认加载10条数据
          //loading = end = false;
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
//            $('.first').hide();
//            $('.load').show();
            return ;
          });

          $('.backtop').scroll(function(){
            if ($('.backtop').scrollTop() > ($('.back').height() - $('.header').height())){
              $('.header').addClass('on')
            }else{
              $('.header').removeClass('on')
            }
          })

          swiperCon.on('slideChangeEnd', function(obj){
            loading = false;
            self.type = $('#swiper-container2 .active-nav').attr('type');
            end       = false;
            start     = 1;
            $('#swiper-container3 .swiper-wrapper').css('height', 0);
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

          //是否存在input焦点事件或图层打开事件
          $('input').focus(function(){
            //获取焦点
            let expireDays = 1000 * 60 * 60 ;
            setCookie("backkey", 1, expireDays);
          });

          $(document).bind('click', function(e){
            var target = $(e.target);
            if(target.closest("input").length == 0 && target.closest('.a1').length == 0 && target.closest('.dian').length == 0 && !self.isKey){
              setCookie("backkey", '', -1);
            }
          });
        },
        components: {
          //组件
          swiper,
          swiperSlide
        },
        watch: {
          // 如果路由有变化，会再次执行该方法
          "$route": "refresh"
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
          this.type = 'all';//默认加载数据类型
          this.end  = end = false;//是否加载完成
          this.loading = loading = false;//是否正在加载
          this.start   = 1;//数据开始条数
          this.getData(this.type, this.start, size);
        },
        updated() {
          var self      = this;
          if (self.type == 'all'){
            this.itemslistH = $('div[contype="'+this.type+'"]').parent().parent().height();
            end          = this.itemsEnd;
          }else if(self.type == 'fri'){
            this.itemsAlllistH = $('div[contype="'+this.type+'"]').parent().parent().height();
            end          = this.itemsAllEnd;
          }else if(self.type == 'tiezi'){
            this.itemsDoinglistH = $('div[contype="'+this.type+'"]').parent().parent().height();
            end          = this.itemsDoingEnd;
          }
        },
        activated(){
          //路由缓存 前进后退
          $('.load').hide();
          $(".backtop").animate({"scrollTop":this.scroll},0)
        },
        beforeDestroy(){
          window.removeEventListener("scroll",this.toScroll);
        },
        beforeRouteLeave (to, from, next) {
          //路由离开时
          var isInputKey = parseInt(getCookie('backkey'));
          if (isInputKey == 1){
            setCookie("backkey", '', -1);
            //this.toggle1();
            if(this.show){
              this.toggle();
              this.a1();
            }else if(this.isTjHy){
              this.toggle2();
              this.a2();
            }else if(this.qzyz){
              this.qzyz = false;
              this.mark = false;
            }
            next(false)
          }else{
            top=this.scroll
            console.log(this.scroll);
            this.$store.commit('HOMESTOPF',top)
            next()
          }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .radius-white{
    background:url(../../../images/yy.png) no-repeat center;
    height:1rem;
    z-index:10;
    width:100%;
    position: absolute;
    top:3.6rem;
  }
  .tip{display: none;}
  .mark {
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
    background: rgba(0,0,0,0.3);
  }
  .up{width: 100%;position: fixed;bottom:0;z-index: 100;background: #fff;font-size: 0.3rem;text-align: center;line-height: 1rem;}
  .up li{border-bottom: 0.01rem solid #E0E0E0;}
  .forget1 {
    text-align: center;
    line-height: 1.25rem;
    z-index: 13;
    margin-bottom: 0.05rem;
    border-radius: 0.1rem;
    position: absolute;
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
    z-index: 12;
  }

  .yzall .sp2 {
    border: 1px solid #e0e0e0;
    display: block;
    border-radius: 0.1rem;
  }

  .sp2 input {
    display: block;
    width: 100%;
    /*color: #fff;*/
    height: 0.5rem;
    padding-left: 0.2rem;
  }

  .sp3 {
    width: 45%;
    background: #fff;
    color:#008DD3;
    display: block;
    margin: 0 auto;
    text-align: center;
    margin-top: 0.2rem;
    border-radius: 0.1rem;
    float: left;
  }
  #btn1{
    float: left;
  }
  #btn2{
    float: right;
  }
  .sp3 input {
    display: block;
    width: 100%;
    color:#008DD3;
    border: 1px solid #008DD3;
    border-radius: 0.28rem;
    height: 0.5rem;
  }
  .header{z-index:999;width:100%;height: 0.7rem;position: fixed;top:0.3rem;}
  .header.on{background: #fff;z-index: 99;}
  .header a{z-index:10;width: 0.18rem;height: 0.34rem;display: block;background: url(../../../images/backw.png) no-repeat;background-size: cover;float:left;}
  .header-top{
    position: absolute;
    top: 0;
    padding-left: 0;
    padding-right: 0;
    height: 0.7rem;
    width: 100%;}


  .ld{z-index:10;position:fixed;right:1.1rem;width:0.28rem;height:0.88rem;float:right;background:url(../../../images/jiauser.png) no-repeat 0 50%;background-size:0.28rem 0.3rem;}
  .user{z-index:10;position:fixed;right:0.6rem;width:0.34rem;height:0.88rem;float:right;background:url(../../../images/sixin.png) no-repeat 0 50%;background-size:0.34rem 0.28rem;margin-left:0.19rem;}
  .dian{z-index:10;position:fixed;right:0.2rem;width: 0.27rem;height: 0.88rem;float:right;background:url(../../../images/dian3.png) no-repeat 0 50%;background-size:0.27rem 0.06rem;margin-left:0.19rem;}


  .nav{margin:0 auto;width:78%;max-width:500px;padding-top:1rem;}
  .login{height:100%;}
  .back{height:4.43rem;width:100%;background:url(../../../images/topbanner.png) no-repeat;background-size:cover !important;position:relative;}
  .header .a1{position:fixed;width: 0.18rem;height: 0.34rem;background: url(../../../images/back.png) no-repeat;background-size: cover;top: 0.57rem;display: block;left: 0.2rem}
  .forget{line-height:0.88rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;top:0.38rem;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}
  .body{z-index:11;width:1.8rem;height:1.8rem;border-radius:50%;display:block;position:absolute;bottom:-1rem;left:50%;margin-left:-0.9rem;overflow:hidden;background:#fff;}
  .body img{width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit:cover;
    display: block;
    /*position: absolute;*/
    /*top: 50%;*/
    /*transform: translateY(-50%);*/
  }

  .center{line-height:normal;color:#51667e;font-size:0.22rem;margin-top:1.03rem;position:relative;text-align:center;}
  .center-t{height:100%;margin:0 auto;width:6rem;display:inline;position: relative;}
  .center .p1{display:inline;}
  .p1 span{color: #979797;font-size: 0.22rem;}
  .center .p2.isColor{float: none;display: inline-block;margin: 0px 0 0px 0px;line-height: 0;padding: 0;height: .3rem;width:auto;background:transparent;}
  .center .p2{vertical-align:middle;padding:0.03rem;color:#fff;width:0.5rem;height:0.26rem;border-radius:0.05rem;background:#f85772;text-align:center;line-height:0.26rem;font-size:0.2rem;
    /*position:absolute;top:0;right:-0.94rem;*/
    display:inline-block;margin: 0 .1rem 0 0;
  }
  .center .p3{width:0.2rem;height:0.2rem;position:absolute;top:0.05rem;right:-0.3rem;background:url(../../../images/men.png) no-repeat;background-size:cover;}
  .center .pv{width:0.2rem;height:0.2rem;position:absolute;    top: 0.07rem;
    right: -0.3rem;background:url(../../../images/girl.png) no-repeat;background-size:cover;}


  .center-t-b{width:6rem;margin:0 auto;border-bottom:0.01rem solid #ededed;position:relative;line-height: .76rem;}
  .center-t-b .p4{width:0.36rem;height:0.38rem;position:absolute;top:0.2rem;left:0.4rem;background:url(../../../images/yumao.png) no-repeat;background-size:cover;}





  .center-b{width:5.8rem;height:1.03rem;border-bottom:0.01rem solid #f0f0f0;overflow:hidden;margin:0 auto;padding-top:0.37rem;color:#54c2f0;}
  .center-b dl{float:left;width:33.3%;}
  .center-b dt{margin:0 auto;}
  .center-b .dt1{width:0.38rem;height:0.31rem;background:url(../../../images/sex.png) no-repeat;background-size:cover;}
  .center-b .dt2{width:0.40rem;height:0.37rem;background:url(../../../images/age.png) no-repeat;background-size:cover;}
  .center-b .dt3{width:0.40rem;height:0.38rem;background:url(../../../images/captail.png) no-repeat;background-size:cover;}
  .center-b .dd1{margin-top:0.07rem;}
  .center-b .dd2{margin-top:0.01rem;}
  .center-b .dd4{margin-top:0.06rem;}
  .centerg{padding:0;}
  .centerg dt{font-size:0.2rem;line-height:0.38rem;margin-top:0.19rem;}
  .centerg dd{font-size:0.23rem;}

  .bottom-ul .li1{width:100%;height:0.26rem;font-size:0.26rem;text-align:center;color:#000014;margin-top:0.3rem;}
  .bottom-ul .li3{width:4.45rem;line-height:0.32rem;font-size:0.2rem;text-align:center;color:#bcc3cd;margin:0 auto;margin-top:0.24rem;color:#5c7086;}

  .bottom-ul1{width:4.6rem;height:0.56rem;margin:0 auto;margin-top:0.72rem;}
  .bottom-ul1 li{width:2.08rem;height:0.54rem;float:left;border-radius:0.28rem;border: 1px solid #008dd3;}
  .bottom-ul1 li a{width:2.08rem;height:0.54rem;line-height:0.54rem;color:#008dd3;font-size:0.22rem;display:block;text-align:center;border-radius:0.28rem;}
  .bottom-ul1 li a:hover{color:#fff;background:#008dd3;}
  .bottom-ul1 .li2{float:right;}


  .first{float:left;width:100%;}

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


  #swiper-container2{border-bottom: 1px solid #ccc;overflow:visible;background: #Fff;z-index: 6;width: 100%;}
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

  .nav1{padding:0 0.2rem;}
  .nav1 .nav-bottom{padding-bottom:0.3rem;
    border-bottom: 1px solid #e0e0e0;}
  .nav1 .tip-bottom{display: flex;}
  .nav1 .tip-bottom-l{width: 2.11rem;height: 1.42rem;float: left;margin-top: 0.3rem;border-radius:0.1rem;overflow:hidden;}
  .nav1 .tip-bottom-l img{width: 2.11rem;height: 1.42rem;}
  .nav1 .tip-bottom-r{width: 3.9rem;height: 1.42rem;margin-top: 0.3rem;flex: 1;
    /*border-bottom:0.01rem solid #e0e0e0;*/
    position:relative;}
  .nav1 .nav-left{float:left;}
  .nav1 .tip-bottom-r ul{height: 1.42rem;margin-left:0.15rem;}

  .nav1 .tip-bottom-r .li1{
    /*line-height:0.49rem;*/
    font-size: 0.22rem;color: #242424;}
  .nav1 .tip-bottom-r .li2{margin-top:0.1rem;width:2.5rem;height:0.56rem;line-height: 0.31rem;font-size: 0.2rem;color:#afafaf;overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
  .nav1 .tip-bottom-r .li3{position:absolute;bottom:0.05rem;line-height: 0.18rem;height: 0.18rem;font-size: 0.wrem;margin-top: 0.15rem;color:#afafaf;}
  .nav1 .tip-bottom-r span{display: block;float: left;height: 0.18rem;}


  .nav1 .nav-right {float:right;position:absolute;right:0.1rem;top:50%;transform:translateY(-50%);}
  .nav1 .nav-right .li4{width:0.96rem;height:0.46rem;line-height:0.46rem;text-align:center;float:right;color:#008dd3;border: 1px solid #008dd3;border-radius:0.23rem;font-size:0.2rem;}

  .nav2{padding:0 0.2rem;}
  .nav2 ul{margin-top: 0.26rem;overflow: hidden;padding-bottom: 0.25rem;border-bottom: 0.01rem solid #ebebeb;position: relative;}
  .nav2 ul .l{float:left;width: 4.46rem;}
  .nav2 .li1{line-height:0.41rem;font-size:0.22rem;margin-left: 0.24rem;color: #242424;}
  .nav2 .li1 .sp1{font-size: 0.21rem;color: #949494;margin-left: 0.08rem;}
  .nav2 .li1 .sp2 img{width: 0.19rem;height: 0.19rem;margin-left: 0.08rem;}
  .li22.isColor{width:auto;background:transparent;}
  .li22{font-size:0.03rem;color:#fff;margin-left:0.13rem;line-height:normal;padding: .02rem 0.1rem;background: #39b6f4;border-radius: 0.05rem;text-align: center;}
  .nav2 .li2{height:0.62rem;width:0.62rem;
    /*position: relative;overflow:hidden;*/
    border-radius:50%;margin-top: 0.06rem;float: left;}
  .nav2 .li2 img{width:100%;height: 100%;display: block;border-radius: 50%;object-fit: cover;
    /*position: absolute;top: 50%;-webkit-transform: translateY(-50%);-moz-transform: translateY(-50%);-ms-transform: translateY(-50%);-o-transform: translateY(-50%);transform: translateY(-50%);*/
  }
  .nav2 .li3{height:1.24rem;-bottom:0.01rem solid #e0e0e0;width:4.87rem;float:right;position:relative;}
  .nav2 .p{height:0.69rem;position: absolute;top: 50%;-webkit-transform: translateY(-50%);-moz-transform: translateY(-50%);-ms-transform: translateY(-50%);-o-transform: translateY(-50%);transform: translateY(-50%);}
  .nav2 .li3 .p1{font-size:0.26rem;line-height:0.38rem;}
  .nav2 .li3 p{font-size:0.20rem;}
  .nav2 .li3 .p2{float:left;line-height:0.31rem;}
  .nav2 .li3 .p3{margin-left:0.3rem;}
  .nav2 .li4{line-height: 0.38rem;color: #949494;font-size:0.2rem;margin-left: 0.24rem;}


  .nav3{padding: 0 0.2rem;}
  .nav3 ul{margin-top: 0.26rem;overflow: hidden;padding-bottom: 0.25rem;border-bottom: 0.01rem solid #ebebeb;}
  .nav3 ul li{float:left;width: 100%;}
  .nav3 .li1{line-height:0.41rem;font-size:0.22rem;margin-left: 0.24rem;}
  .nav3 .li2{height:0.62rem;width:0.62rem;
    /*position: relative;overflow:hidden;*/
    border-radius:50%;margin-top: 0.06rem;float: left;}
  .nav3 .li2 img{width:100%;height: 100%;display: block;border-radius: 50%;object-fit: cover;
    /*position: absolute;top: 50%;-webkit-transform: translateY(-50%);-moz-transform: translateY(-50%);-ms-transform: translateY(-50%);-o-transform: translateY(-50%);transform: translateY(-50%);*/
  }
  .nav3 .li3{height:1.24rem;-bottom:0.01rem solid #e0e0e0;width:4.87rem;float:right;position:relative;}
  .nav3 .p{height:0.69rem;position: absolute;top: 50%;-webkit-transform: translateY(-50%);-moz-transform: translateY(-50%);-ms-transform: translateY(-50%);-o-transform: translateY(-50%);transform: translateY(-50%);}
  .nav3 .li3 .p1{font-size:0.26rem;line-height:0.38rem;}
  .nav3 p{font-size:0.20rem;}
  .nav3 .li3 .p2{float:left;line-height:0.31rem;}
  .nav3 .li3 .p3{margin-left:0.3rem;}
  .nav3 .li4{line-height: 0.38rem;color: #54c2f0;font-size:0.2rem;margin-left: 0.24rem;}
  .nav3 .li5 span{float: left;margin-left: 0.24rem;}
  .nav3 .li5{line-height: 0.25rem;color: #949494;font-size: 0.2rem;}
  .nav3 .sp1{background: url(../../../images/fbsj.png) no-repeat 0 50%;background-size: 0.25rem auto;padding-left: 0.3rem;}
  .nav3 .sp2{background: url(../../../images/sl.png) no-repeat 0 50%;background-size: 0.25rem auto;padding-left: 0.26rem;}
  .nav3 .sp3{width:auto;margin-top:0;background: url(../../../images/hf.png) no-repeat 0 50%;background-size: 0.25rem auto;padding-left: 0.28rem;}


  /*.nav3{width: 6rem;margin: 0.2rem auto;}*/
  /*.nav3 ul{box-shadow: 0 0 0.05rem #dedede;margin-bottom: 0.23rem;}*/
  /*.nav3 ul li{padding: 0 0.2rem;}*/
  /*.nav3 .li1{width: 6rem;height: 2.6rem;padding: 0;}*/
  /*.nav3 .li1 img{width: 6rem;height: 2.6rem;display: block;border: 0;}*/
  /*.nav3 .li2{font-size: 0.25rem;line-height: 0.41rem;margin-top: 0.13rem;}*/
  /*.nav3 .li3{font-size: 0.21rem;line-height: 0.29rem;color: #a8a8a8;margin-top: 0.04rem;}*/
  /*.nav3 .li4{height:0.59rem;overflow: hidden;}*/
  /*.nav3 .li4 span{float: left;line-height: 0.59rem;}*/
  /*.nav3 .li4{line-height: 0.3rem;color: #949494;font-size: 0.14rem;}*/
  /*.nav3 .sp1{background: url(../../../images/fbsj.png) no-repeat 0 50%;background-size: 0.18rem 0.18rem;padding-left: 0.3rem;}*/
  /*.nav3 .li4 .sp2{background: url(../../../images/sl.png) no-repeat 0 50%;background-size: 0.19rem 0.19rem;padding-left: 0.22rem;float: right;}*/

  .yzalls .forget {
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

  .yzalls .sp2 {
    border: 1px solid #e0e0e0;
    display: block;
    border-radius: 0.1rem;
  }

  .yzalls .sp2 input {
    display: block;
    width: 100%;
    height: 0.5rem;
    padding-left: 0.2rem;
  }

  .yzalls .sp3 {
    width: 1.4rem;
    background: #fff;
    display: block;
    margin: 0 auto;
    text-align: center;
    margin-top: 0.2rem;
    border-radius: 0.1rem;
    float:none;
  }

  .yzalls .sp3 input {
    display: block;
    width: 100%;
    color: #008DD3;
    height: 0.5rem;
    border-radius: 0.28rem;
  }
</style>

