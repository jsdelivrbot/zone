<template>
  <div class="backtop" :style="{'-webkit-overflow-scrolling': scrollMode}" ref="all" style="
  font-size: 0.2rem;width: 100%;
  /*overflow-y:scroll;*/
">
    <div class="header-top">
      <a href="javascript:history.back(-1);" @click="back" class="a1"></a>
      <ul class="post">
        <div @click="toggle()" style="width: 100%;height: 100%;overflow: hidden;">
          <li class="li1" ref="a1">全部帖子</li>
          <li class="li2"></li>
        </div>

      </ul>
      <span class="forget">{{this.groupData.name}}</span>
      <router-link :to="'/boss?gid='+this.$route.query.gid" v-if="this.is_show!=0">
        <div class="user"></div>
      </router-link>
      <div class="ld" @click="toggle3()"></div>
      <ul class="post-child" v-show="show">
        <li @click="opbtn('')" ref="a2">全部帖子</li>
        <li @click="opbtn('dist')" ref="a4">精华帖子</li>
        <li @click="opbtn('my')" ref="a5" style="border-bottom: 0;">我的帖子</li>
      </ul>
    </div>
    <div style="position: fixed;bottom: .6rem;right: -0.14rem;z-index: 5;font-size: 0.22rem;" v-if="this.status!=0">
      <div class="tj" @click="toggle2()"></div>
      <!--<transition name="fade">
                    <div class="bigc" v-show="isshow"></div>
                </transition>-->
      <!--活动-->
      <router-link :to="'/activity?gid='+this.$route.query.gid+'&cid='+catid">
        <transition name="fade">
          <div v-show="isshow"
               style="z-index:999;color: #242424;position: absolute;bottom: 3.5rem;right: 1.2rem;border: 1px solid rgb(0, 141, 211);border-radius: 0.5rem;padding: 0.1rem;width: 1.2rem;text-align:center;background: #fff;">
            发布活动帖
          </div>
        </transition>
        <transition name="fade">
          <div class="hd" v-show="isshow"></div>
        </transition>
      </router-link>
      <!--发帖-->
      <router-link :to="'/message?gid='+this.$route.query.gid">
        <transition name="fade">
          <div v-show="isshow"
               style="z-index:999;color: rgb(36, 36, 36);position: absolute;bottom: 2.5rem;right: 1.2rem;border: 1px solid #008dd3;border-radius: 0.5rem; padding: 0.1rem;width:1.2rem;text-align:center;background: #fff;">
            发布普通帖
          </div>
        </transition>
        <transition name="fade">
          <div class="ft" v-show="isshow"></div>
        </transition>
      </router-link>
      <!--投票-->
      <router-link :to="'/poll?gid='+this.$route.query.gid">
        <transition name="fade">
          <div v-show="isshow"
               style="z-index:999;color: rgb(36, 36, 36);position: absolute;bottom: 1.5rem;right: 1.2rem;border: 1px solid #008dd3;border-radius: 0.5rem; padding: 0.1rem;width: 1.2rem;text-align:center;background: #fff;">
            发布投票帖
          </div>
        </transition>
        <transition name="fade">
          <div class="js" v-show="isshow"></div>
        </transition>
      </router-link>
    </div>
    <!--<div class="listbanner" :style="'background-image:url('+this.groupData.backdrop+')'">-->
    <div class="listbanner" :style="''">
      <!--<div class="listmark"-->
           <!--:style="'background:'+(this.groupData.cover ? this.groupData.cover : '#2cafbb')+(groupData.backdrop ? ';opacity:0.4;' : ';opacity:1')">-->
      <!--</div>-->
      <div class="listmark"
           :style="'background:'+(this.groupData.cover ? this.groupData.cover : '#2cafbb;opacity:1')">
      </div>
      <div class="header">
        <div class="header-bottom">
          <div class="header-bottom-top">
            <div class="tip-bottom-l">
              <img :src="this.groupData.logo"/>
            </div>
            <div class="tip-bottom-r">
              <ul>
                <li class="li1">
                  <span class="sp1">{{groupData.name}}</span>
                  <div class="sp2">
                <li class="li4">
                  <label>
                    <input type="checkbox" ref="check" @click="collect()"><b></b>
                  </label>
                </li>
            </div>
            </li>
            <li class="li2">{{groupData.intro}}</li>
            </ul>
          </div>
        </div>
        <div class="header-bottom-bottom">
          <ul>
            <li class="li1">成员数：</li>
            <li class="li1">{{groupData.membercount}}</li>
            <li class="li2 mt70">帖子数：</li>
            <li class="li1">{{this.groupData.threadcount}}</li>
            <li class="li3" v-show="yijiaru1" :style="'color:'+this.groupData.cover ">已加入</li>
            <li class="li3" v-show="jiaruquanzi" @click="join()">+加入圈子</li>
            <li class="li3" style="background:none;color: #EEEEEE;" v-show="yaoqingjiaru">本圈子需要邀请才可加入</li>
            <li class="li3" style="background:none;color: #EEEEEE;" v-show="shenhe">已提交申请等待审核</li>
          </ul>
        </div>
        <!--<div class="header-bottom-down">{{this.groupData.intro}}</div>-->
      </div>
    </div>
  </div>
    <!--<div style="height:100%;overflow: auto;position: relative;" class="listcircle">-->


    <!--内容-->
    <div style="font-size: 0.26rem;text-align: center;" v-if="this.is_show==0">您没有权限访问该圈子</div>
    <div id="guding" style="z-index: 5;position: absolute;top: 3rem;width: 100%;background: #fff;" v-else>
      <swiper :options="swiperOptionTab" id="swiper-container2" ref="mySwiperTab">
        <swiper-slide :class="key==0 ? 'active-nav' : ''" v-for="(list, key) in catsData" :cid="list.id">
          <span>{{list.title}}</span></swiper-slide>
      </swiper>
    </div>
    <div class="page-loadmore listcircle" :style="{'overflow-y': overflowType}" style="position:absolute;right: 0;left: 0;
      height:calc(100% - 3.6rem);top:3.6rem;bottom:0;
    ">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false"
                   :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange"
                   ref="loadmore" v-if="catsData">

        <swiper style="" :options="swiperOptionCon" id="swiper-container3" ref="mySwiperCon" v-if="catsData">

          <div v-if="this.groupshow==0" style="text-align: center;width: 100%;font-size: 0.3rem;">没有权限</div>
          <swiper-slide class="swiper-slide" v-for="(cat, key) in catsData">
            <!--<div class="first" :catid="cat.id"  v-infinite-scroll="loadBottom"-->
                 <!--infinite-scroll-disabled="loading"-->
                 <!--infinite-scroll-distance="10"-->
                 <!--infinite-scroll-immediate-check="false">-->
            <div class="first" :catid="cat.id">
              <div class="threadbox" v-for="(list,index) in cat.listData" :key="index">
                <!--显示多张图片-->
                <div class="tip-bottom-all21" v-if="list.url.length>1">
                  <div class="tip-bottom21">
                    <div class="tip-bottom-l1">
                      <ul class="tip-bottom-l-t1">
                        <router-link :to="'/yesfriend?uid='+list.uid">
                          <li class="li1">
                            <img :src="list.face==0?'../../../static/loading.png':list.face"/>
                          </li>
                        </router-link>
                        <router-link :to="'/vote?id='+list.id+'&gid='+gid">
                          <div style="width: 4.3rem;float: left;padding-top: 0.1rem;">
                            <li class="li2" style="width:100%;height: 0.3rem;line-height: 0.3rem;text-align: left;">
                              {{list.name}}
                            </li>
                            <li style="height: 0.3rem;margin-left: 0.1rem;">
                              <img :src="user.icon" alt="" style="height:0.3rem;float: left;margin-right: 0.1rem;"
                                   v-for="(user,index) in list.userGroup" v-if="user.icon!=''">
                              <!--<span class="li3" v-for="(user,index) in list.userGroup" style="line-height: 0;height: 0;padding: 0.1rem 0.1rem;border-radius: 0.05rem;margin-right: 0.05rem;margin-top: 0.04rem;color: #fff;margin-left: 0.05rem;float: left;" v-if="user.type=='member'" :style="'background:'+user.bcolor">{{user.title}}</span>-->
                            </li>
                          </div>
                        </router-link>
                        <li class="li4">{{list.addtime}}</li>
                      </ul>
                      <div style="clear: both;"></div>
                      <li class="lia" v-if="groupData.is_level==1||groupData.is_level==2||groupData.is_system==1">
                        <label>
                          <input style="float: left;margin-top: 0.13rem;" type="checkbox" ref="ch" :value="list.id"
                                 @click="ftshow()"/><b></b>
                        </label>
                      </li>
                      <router-link :to="'/vote?id='+list.id+'&gid='+gid">
                        <div
                          style="display: block;width: calc(100% - .4rem);margin-left:0.1rem;margin-top:.2rem;float: left;word-break: break-word;font-size:.22rem;line-height:.3rem;text-align:left;color: #242424;"
                          :style="'color:'+list.highstyle">
                          <span v-text="list.topic_type==1?toupiao:((list.topic_type==2)?huodong:'')"
                                style="font-size: 0.22rem;float: left;"></span>
                          <div class="li5" style="float: left;">
                            <span class="p1 mt50 p2" v-if="list.dist>0" style="margin:0.03rem  0.05rem 0;"></span>
                            <span class="p1 mt6 p3" v-if="list.top>0" style="margin:0.03rem  0.05rem 0;"></span>
                            <span class="p1 mt6 p4" v-if="list.url.length>0" style="margin:0.03rem  0.05rem 0;"></span>
                          </div>
                          {{list.title}}
                        </div>
                      </router-link>
                      <!--<router-link :to="'/vote?id='+list.id+'&gid='+gid" style="display: block;overflow: hidden;margin-left:0.1rem;float: left;word-break: break-word;">
                                                <p :style="list.highlight==1?'color:'+list.highstyle:''">
                                                    <span v-text="list.topic_type==1?toupiao:((list.topic_type==2)?huodong:'')"></span>
                                                    <li class="li5">
                                                        <span class="p1 mt50 p2" v-if="list.dist>0"></span>
                                                        <span class="p1 mt6 p3" v-if="list.top>0"></span>
                                                        <span class="p1 mt6 p4" v-if="list.url.length>0"></span>
                                                    </li>{{list.title}}
                                                </p>
                                            </router-link>-->


                    </div>
                    <div class="tip-bottom-r1">
                      <!--<router-link :to="'/vote?id='+list.id+'&gid='+gid" style="height: 1.42rem;display: block;">-->
                        <div class="tip-bottom-r-img">
                          <div class="tip-bottom-r-all1">
                            <swiper :options="swiperOptionImg" id="swiper-container2" ref="mySwiperImg">
                              <swiper-slide v-for="(img, key) in list.url" :cid="list.id" :key="key">
                                  <img class="wc-preview-img" @click="$preview($event, list.url, key)" :src="img"/>
                              </swiper-slide>
                              <!--<swiper-slide v-for="(img, key) in list.url" :cid="list.id">-->
                                <!--<img :src="img"/>-->
                              <!--</swiper-slide>-->
                            </swiper>
                          </div>
                        </div>
                      <!--</router-link>-->
                      <ul>
                        <li class="li1"></li>
                        <li class="li2">{{list.zan_num}}</li>
                        <li class="li3">{{list.replycount}}</li>
                      </ul>
                    </div>
                  </div>

                </div>
                <!--显示一张照片-->
                <div class="tip-bottom-allone" v-else>
                  <div class="tip-bottomone">
                    <div class="tip-bottom-lone" :style="list.url.length == 0 ? 'width:100%' : ''">
                      <ul class="tip-bottom-l-tone">
                        <router-link :to="'/yesfriend?uid='+list.uid">
                          <li class="li1">
                            <img :src="list.face==0?'../../../static/loading.png':list.face"/>
                          </li>
                        </router-link>

                        <!--<li class="li2" style="height: 0.5rem;line-height: 0.5rem;">{{this.listData.uname}}</li>-->
                        <!--<li class="li5">
                                                <span>(</span>
                                                <span>张林海</span>
                                                <span>)</span>
                                            </li>-->
                        <!--<img :src="user.icon" alt="" style="height:0.3rem;float: left;margin-top: 0.45rem;margin-right: 0.05rem;" v-for="(user,index) in this.listData.usergroup" v-if="user.icon!=''">-->

                        <!--<li class="li3" v-for="(user,index) in this.listData.usergroup" v-if="user.type=='member'" :style="'background:'+user.bcolor">{{user.title}}</li>-->
                        <router-link :to="'/vote?id='+list.id+'&gid='+gid">

                          <div style="width: 2.9rem;float: left;padding-top: 0.1rem;"
                               :style="list.url.length == 0 ? 'width:calc(100% - 0.5rem)' : ''">
                            <ul style="width: 100%;overflow: hidden;">
                              <li class="li2" style="height: 0.3rem;line-height: 0.3rem;text-align: left;">
                                {{list.name}}
                              </li>
                              <li class="li4" style="line-height: 0.3rem;height: 0.3rem;float: right;">
                                {{list.addtime}}
                              </li>
                            </ul>
                            <ul>
                              <li style="height: 0.3rem;margin-left: 0.1rem;">
                                <img :src="user.icon" alt="" style="height:0.3rem;float: left;margin-right: 0.1rem;"
                                     v-for="(user,index) in list.userGroup" v-if="user.icon!=''">
                                <!--<span class="li3" v-for="(user,index) in list.userGroup" style="line-height: 0;height: 0;padding: 0.1rem 0.1rem;border-radius: 0.05rem;margin-right: 0.05rem;margin-top: 0.04rem;color: #fff;margin-left: 0.05rem;float: left;" v-if="user.type=='member'" :style="'background:'+user.bcolor">{{user.title}}</span>-->
                              </li>
                            </ul>
                          </div>
                        </router-link>
                      </ul>
                      <div style="clear: both;"></div>
                      <!--color:index+1==1?orange:((index+1==2)?yellow:((index+1==3)?red:other))-->
                      <li class="lia" v-if="groupData.is_level==1||groupData.is_level==2||groupData.is_system==1">
                        <label>
                          <input style="float: left;margin-top: 0.13rem;" type="checkbox" ref="ch" :value="list.id"
                                 @click="ftshow()"/><b></b>
                        </label>
                      </li>
                      <router-link :to="'/vote?id='+list.id+'&gid='+gid">
                        <div
                          style="display: block;color:#242424;width: calc(100% - .4rem);margin-left:0.1rem;margin-top:.2rem;float: left;word-break: break-word;font-size:.22rem;line-height:.3rem;text-align:left;"
                          :style="'color:'+list.highstyle">
                          <span v-text="list.topic_type==1?toupiao:((list.topic_type==2)?huodong:'')"
                                style="font-size: 0.22rem;float: left;"></span>
                          <div class="li5" style="float: left;">
                            <span class="p1 mt50 p2" v-if="list.dist>0" style="margin:0.03rem  0.05rem 0;"></span>
                            <span class="p1 mt6 p3" v-if="list.top>0" style="margin:0.03rem  0.05rem 0;"></span>
                            <span class="p1 mt6 p4" v-if="list.url.length>0" style="margin:0.03rem  0.05rem 0;"></span>
                          </div>
                          {{list.title}}
                        </div>
                      </router-link>
                      <!--<router-link :to="'/vote?id='+list.id+'&gid='+gid" style="display: block;overflow: hidden;margin-left:0.1rem;float: left;word-break: break-word;">
                                                <!-- :style="list.url.length == 0 ? 'width:100%' : ''"-->

                      <!--<div class="cont_kke" :style="list.highlight==1?'color:'+list.highstyle:''">


                                                  <span v-text="list.topic_type==1?toupiao:((list.topic_type==2)?huodong:'')"></span>
                                              </div>
                                          </router-link>-->

                    </div>
                    <div class="tip-bottom-rone">
                      <a style="display: block;">
                        <div class="img" v-if="list.url.length>0" :key="key">
                          <img class="wc-preview-img" @click="$preview($event, list.url, key)" :src="list.url[0]"/>
                        </div>
                      </a>
                      <!--<router-link :to="'/vote?id='+list.id+'&gid='+gid" style="display: block;">-->

                      <!--</router-link>-->
                      <ul :style="list.url.length == 0 ? 'float:right' : ''">
                        <li class="li1"></li>
                        <li class="li2">{{list.zan_num}}</li>
                        <li class="li3">{{list.replycount}}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="line"></div>

              </div>
              <div class="loading-layer">
                <div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
              </div>
              <!--<p v-show="loading" class="page-infinite-loading" style="height:50px;line-height:50px;text-align:center;font-size:0.2rem;">-->
                <!--<mt-spinner type="fading-circle"></mt-spinner>-->
                <!--加载中...-->
              <!--</p>-->
            </div>
          </swiper-slide>
        </swiper>
      </mt-loadmore>
    </div>
    <!--</div>-->
    <!--弹出-->

    <div class="load" style="display:none;">
      <div class="load-container load4">
        <div class="loader"><i></i></div>
      </div>
    </div>
    <div class="mark" v-show="toshow"></div>

    <transition name="fade">
      <div class="jubao" v-show="toshow">
        <div class="jubaoall">

          <div class="jubao-t">
            <span>本圈公告</span>
            <a class="a2" @click="togglemore()">X</a>
          </div>
          <div class="jubao-b">
            <p>{{this.groupData.announce}}</p>
          </div>
        </div>
      </div>
    </transition>

    <div class="yzall" v-show="forshow">
      <p class="forget1">
        <span class="sp1">圈子需要验证</span>
        <span class="sp2">
					<input type="text" ref="val"/>
				</span>
        <span class="sp3">
					<input type="button" name="" id="" value="提交" @click="submit()"/>
				</span>
      </p>
    </div>
    <div class="mark" v-show="forshow" @click="toggle4()"></div>
    <pop class="tip" :title="tip"></pop>
    <!--管理员底部-->
    <!--<div class="mark" v-show="footershow" @click="ftshow()"></div>-->
    <div class="footer" v-show="footershow">
      <div class="form">
        <div class="button">
          <dl class="dl1" style="margin-left: 0;" @click="s2()">
            <dt><img src="../../images/zhiding.png"/></dt>
            <dd>置顶</dd>
          </dl>
          <dl class="dl2" @click="s3()">
            <dt><img src="../../images/jiajing.png"/></dt>
            <dd>加精</dd>
          </dl>
          <dl class="dl3" @click="s1()">
            <dt><img src="../../images/gaoliang.png"/></dt>
            <dd>高亮</dd>
          </dl>

          <dl class="dl4" @click="toggletc('del')">
            <dt><img src="../../images/shanchu.png"/></dt>
            <dd>删除</dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="mark" v-show="show1" @click="s1"></div>
    <div class="mark" v-show="show2" @click="s2"></div>
    <div class="mark" v-show="show3" @click="s3"></div>
    <div class="mark" v-show="isshowd" @click="toggletc('del')"></div>
    <!--置顶-->
    <div class="up" v-show="show2">
      <div class="up-all">
        <p><span class="sp1">置顶理由</span></p>
        <textarea v-model="zd"></textarea>
        <ul>
          <li class="li1" @click="setData(1,zd)">
            <a>提交</a>
          </li>
          <li class="li2" @click="s2();xiaoshi()">
            <a>取消</a>
          </li>
        </ul>
      </div>
    </div>
    <!--加精-->
    <div class="up" v-show="show3">
      <div class="up-all">
        <p><span class="sp1">加精理由</span></p>
        <textarea v-model="jj"></textarea>
        <ul>
          <li class="li1" @click="setData(2,jj)">
            <a>提交</a>
          </li>
          <li class="li2" @click="s3();xiaoshi()">
            <a>取消</a>
          </li>
        </ul>
      </div>
    </div>

    <!--高亮-->
    <div class="up" v-show="show1" style="height: auto;">
      <div class="up-all">
        <p><span class="sp1">高亮理由</span></p>

        <div class="yanse" style="font-size: 0.22rem;">选择颜色</div>
        <div class="col">
          <span class="col1" @click="att(1)" style="background: #008DD3;"></span>
          <span class="col2" @click="att(2)" style="background: #F29112;"></span>
          <span class="col3" @click="att(3)" style="background: #00FF00;"></span>
          <span class="col4" @click="att(4)" style="background: rgb(229, 63, 78);"></span>
        </div>
        <textarea v-model="gl"></textarea>
        <ul>
          <li class="li1" @click="setData(3,gl)">
            <a>提交</a>
          </li>
          <li class="li2" @click="s1();xiaoshi()">
            <a>取消</a>
          </li>
        </ul>
      </div>
    </div>
    <!--删帖-->
    <div class="up" v-show="isshowd">
      <div class="up-all">
        <p><span class="sp1">删帖理由</span></p>
        <textarea v-model="del1"></textarea>
        <ul>
          <li class="li1" @click="delData(1,del1)">
            <a>提交</a>
          </li>
          <li class="li2" @click="toggletc('cancel');xiaoshi()">
            <a>取消</a>
          </li>
        </ul>
      </div>
    </div>
    <backtop></backtop>
    <load v-show="isload"></load>
  </div>
  <!--</div>-->
</template>

<script>
  var catid = 0;
  var size = 10,
    start = 0;
  var type = '';
  var top = ''
  import Vue from 'vue'
  import { InfiniteScroll } from 'mint-ui';
  Vue.use(InfiniteScroll);
//  import {Loadmore} from 'mint-ui';
  import {getOpenUrl, getToken} from "../../assets/js/common.js"
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import {setCookie, getCookie} from '../../assets/js/cookie.js'
  import qs from 'qs'

  export default {
    data() {
      return {
        overflowType:'auto',
        loading: false,
        scrollMode:"auto",//移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        isload:false,
        tip: '',
        moveList: [],
        isshow: false,
        toshow: false,
        show: false,
        noshow: false,
        forshow: false,
        //加载更多
        list: [],
        allLoaded: false,
        topStatus: '',

        catData: {},
        items: [],
        listData: [],
        groupData: {},
        code: {},
        huodong: '[活动]',
        toupiao: '[投票]',
        tid: '',
        cid: '',
        gid: '',
        //收藏
        status: '',
        is_show: {},
        catsData: [],
        scrollbar: '.swiper-scrollbar',
        swiperOptionTab: {
          watchSlidesProgress: true,
          watchSlidesVisibility: true,
          notNextTick: true,
          slidesPerView: 4
        },
        swiperOptionCon: {
          notNextTick: true,
          autoHeight: true
        },
        swiperOptionImg: {
          slidesPerView: 3.2,
          spaceBetween: 10
        },//管理员弹出层
        isshowd: false,
        show1: false,
        show2: false,
        show3: false,
        footershow: false,
        zd: '',
        jj: '',
        gl: '',
        del1: '',
        hfid: [],
        tid: [],
        //高亮颜色
        bg: '',
        //加入圈子审核
        yaoqingjiaru: false,
        shenhe: false,
        jiaruquanzi: false,
        yijiaru1: false,
        groupshow: {},
        status: {},
        loadingshow: false,
        //				cid:''
      }
    },

    methods: {
      back(){
        this.$router.goBack();
      },
      getData(catid, type, page, index) {
        var self = this;
        //				self.cid=catid
        //this.start = page ? page : 1;
        this.start = 1
        if (this.catsData[index].listData.length > 0 && this.start <= self.catsData[index].listPage && type == self.catsData[index].type) {
          this.start = this.catsData[index].listPage;
          //					$('div[catid="' + catid + '"]').parent().parent().css('height', self.catsData[index].listH);
          //					$('div[catid="' + catid + '"] .loading-layer div').removeClass('active');
          $('.load').hide();
          this.isload = false;
          return;
        }
        //获取帖子
        this.$http.get(getOpenUrl() + "topicList", {
          params: {
            gid: this.gid,
            cid: catid,
            type: type,
            page: this.start,
            limit: size
          },
          headers: {
            'Authorization': 'Bearer ' + getToken()
          }
        }).then((res) => {
          this.loading = false;
          this.isload = false;
          //					$('div[catid="' + catid + '"] .loading-layer span').removeClass('active');
          //					$('div[catid="' + catid + '"] .loading-layer div').removeClass('active');
          if (res.body.code == '0000') {
            var data = res.body.data;
            $.each(data, function (k, v) {
              self.catsData[index].listData.push(v);
            });

          } else {
            //						if(res.body.code == '7002') {
            //							$('div[catid="' + catid + '"] .loading-layer div').addClass('active');
            //						} else {
            //							this.tip = res.body.error_description;
            //							$('.tip').show();
            //							setTimeout(() => {
            //								$('.tip').hide();
            //							}, 1500);
            //						}
            $('div[catid="' + catid + '"] .loading-layer div').addClass('active');
            //						self.loadingshow=true;
          }
          self.catsData[index].type = type;
          self.catsData[index].listPage = this.start;
          $('.load').hide();
          this.$nextTick(()=>{

            // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，
            // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，
            // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
            this.overflowType = 'scroll';
            this.scrollMode = "touch";
          })
        }, (error) => {
          console.log(error)
        })
      },
      cidData() { // 刷新数据的操作
        top = this.scroll;
        var self = this;
        self.start = 1;
        self.catid = parseInt($('#swiper-container2 .active-nav').attr('cid'));
        //获取帖子
        this.$http.get(getOpenUrl() + "topicList", {
          params: {
            gid: this.gid,
            cid: getCookie('cid'),
            type: '',
            page: self.start,
            limit: size
          },
          headers: {
            'Authorization': 'Bearer ' + getToken()
          }
        }).then((res) => {
          self.catsData[self.index].listData.splice(0, self.catsData[self.index].listData.length);
          this.$refs.loadmore.onTopLoaded();
          if (res.body.code == '0000') {
            var data = res.body.data;
            $.each(data, function (k, v) {
              self.catsData[self.index].listData.push(v);
            });
            //						self.catsData[self.index].splice(0, self.catsData[self.index]);
            //						self.loadingshow=false;
            $('div[catid="' + self.catid + '"] .loading-layer div').removeClass('active');
            self.allLoaded = false;
          } else {

            //						this.tip = res.body.error_description;
            //						$('.tip').show();
            //						setTimeout(() => {
            //							$('.tip').hide();
            //						}, 1500);
            self.allLoaded = false;
            //						self.loadingshow=true;
            $('div[catid="' + self.catid + '"] .loading-layer div').addClass('active');
          }
        })
      },
      //加载更多
      loadTop() { // 刷新数据的操作
        top = this.scroll;
        var self = this;
        self.start = 1;
        self.catid = parseInt($('#swiper-container2 .active-nav').attr('cid'));
        //获取帖子
        this.$http.get(getOpenUrl() + "topicList", {
          params: {
            gid: this.gid,
            cid: self.catid,
            type: '',
            page: self.start,
            limit: size
          },
          headers: {
            'Authorization': 'Bearer ' + getToken()
          }
        }).then((res) => {
          self.catsData[self.index].listData.splice(0, self.catsData[self.index].listData.length);
          this.$refs.loadmore.onTopLoaded();
          if (res.body.code == '0000') {
            var data = res.body.data;
            $.each(data, function (k, v) {
              self.catsData[self.index].listData.push(v);
            });
            //						self.catsData[self.index].splice(0, self.catsData[self.index]);
            //						self.loadingshow=false;
            $('div[catid="' + self.catid + '"] .loading-layer div').removeClass('active');
            self.allLoaded = false;
          } else {

            //						this.tip = res.body.error_description;
            //						$('.tip').show();
            //						setTimeout(() => {
            //							$('.tip').hide();
            //						}, 1500);
            self.allLoaded = false;
            //						self.loadingshow=true;
            $('div[catid="' + self.catid + '"] .loading-layer div').addClass('active');
          }
        })
      },
      loadBottom() { // 加载更多数据的操作
        // 若数据已全部获取完毕
        top = this.scroll;
        var self = this;
        this.start += 1;
        //				this.start = this.page ? this.page : 1;
        //获取帖子
        //this.loading = true;

        this.$http.get(getOpenUrl() + "topicList", {
          params: {
            gid: this.gid,
            cid: catid,
            type: type,
            page: this.start,
            limit: size
          },
          headers: {
            'Authorization': 'Bearer ' + getToken()
          }
        }).then((res) => {
          this.isload = false;
          this.$refs.loadmore.onBottomLoaded();
          if (res.body.code == '0000') {
            //this.loading = false;
            var data = res.body.data;
            $.each(data, function (k, v) {
              self.catsData[self.index].listData.push(v);
            });
//						this.allLoaded = true;
//						$('div[catid="' + self.catid + '"] .loading-layer div').addClass('active');
          } else {
            //this.loading = false;
            //this.$refs.loadmore.onBottomLoaded();
            //this.allLoaded = true;
            //							this.loadingshow=true;
            $('div[catid="' + self.catid + '"] .loading-layer div').addClass('active');
            //							this.tip = res.body.error_description;
            //							$('.tip').show();
            //							setTimeout(() => {
            //								$('.tip').hide();
            //							}, 1500);
          }
          //						this.catsData[index].type = type;
          //						this.catsData[index].listPage = this.start;
          $('.load').hide();
        })

      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      //管理员弹出层
      toggletc(type, rid, trid) {
        switch (type) {
          case 'del':
            //删除
            this.rid = rid;
            this.trid = trid;
            this.footershow = false;
            this.isshowd = !this.isshowd;
            break;
          case 'cancel':
            this.mark();
            break;
        }
      },
      //高亮
      s1() {
        this.footershow = false;
        this.show1 = !this.show1;
      },
      //置顶
      s2() {
        this.footershow = false;
        this.show2 = !this.show2;
      },
      //加精
      s3() {
        this.footershow = false;
        this.show3 = !this.show3;
      },
      //按钮消失
      xiaoshi() {
        for (var i = 0; i < this.$refs.ch.length; i++) {
          this.$refs.ch[i].checked = false;
        }
      },
      ftshow() {
        this.tid = []
        for (var i = 0; i < this.$refs.ch.length; i++) {
          var che = this.$refs.ch[i].checked;
          var value = this.$refs.ch[i].value
          if (che) {
            this.tid.push(value)
          }
        }
        this.tid.length > 0 ? this.footershow = true : this.footershow = false;
      },
      //设置高亮选中样式
      att(id) {
        $('.col1').removeClass('att');
        $('.col2').removeClass('att');
        $('.col3').removeClass('att');
        $('.col4').removeClass('att');
        $('.col' + id).addClass('att');
        this.bg = $('.col' + id)[0].style.background;
      },
      //删除
      delData(type, del) {
        this.$http.post(getOpenUrl() + "topicDel", {
          id: this.tid,
          gid: this.$route.query.gid,
          type: type,
          style: 'topic',
          reason: del
        }, {
          headers: {
            'Authorization': 'Bearer ' + getToken()
          }
        }).then((res) => {
          if (res.body.code == 0) {
            this.tip = "删除帖子成功";
            $('.tip').show();
            setTimeout(function () {
              $('.tip').hide();
            }, 1000)
            this.isshowd = false;
            $.each($('.first input[type="checkbox"]:checked'), function () {
              $(this).parents('.threadbox').remove();
            });
            //this.getData(this.catid, type, this.start, this.index);
          } else {
            this.tip = res.body.error_description;
            $('.tip').show();
            setTimeout(function () {
              $('.tip').hide();
            }, 1000)
            this.isshowd = false
          }
        })
      },
      //置顶,加精,高亮
      setData(type, name) {
        if (this.show1) {
          if (this.bg == '') {
            this.bg = this.listData.highstyle
            this.tip = "请选择颜色";
            $('.tip').show();
            setTimeout(function () {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if (this.gl == '' && type == 3) {
            this.tip = "请填写高亮理由";
            $('.tip').show();
            setTimeout(function () {
              $('.tip').hide();
            }, 1000)
            return;
          }
        }
        if (this.zd == '' && type == 1) {
          this.tip = "请填写置顶理由";
          $('.tip').show();
          setTimeout(function () {
            $('.tip').hide();
          }, 1000)
          return;
        }
        if (this.jj == '' && type == 2) {
          this.tip = "请填写加精理由";
          $('.tip').show();
          setTimeout(function () {
            $('.tip').hide();
          }, 1000)
          return;
        }
        if (this.bg == '') {
          this.bg = this.listData.highstyle
        }
        this.$http.post(getOpenUrl() + "topicSet", {
          tid: this.tid,
          gid: this.$route.query.gid,
          type: type,
          target: 1,
          style: this.bg,
          reason: name,
        }, {
          headers: {
            'Authorization': 'Bearer ' + getToken()
          }
        }).then((res) => {
          if (res.body.code == 0) {
            this.tip = "提交成功";
            $('.tip').show();
            setTimeout(() => {
              $('.tip').hide();
              this.show1 = false;
              this.show2 = false;
              this.show3 = false;
              location.reload()
            }, 1000)

          } else {
            this.tip = res.body.error_description;
            $('.tip').show();
            setTimeout(function () {
              $('.tip').hide();
            }, 1000)
            this.show1 = false;
            this.show2 = false;
            this.show3 = false;
            for (var i = 0; i < this.$refs.ch.length; i++) {
              this.$refs.ch[i].checked = false;
            }
          }
        })
      },
      mark() {
        this.isshowd = !this.isshowd;
      },
      toggle() {
        top = this.scroll
        this.show = !this.show;
      },
      toggle3: function () {
        top = this.scroll
        if (this.groupData.announce == '') {
          this.tip = '本圈暂无公告';
          $('.tip').show();
          setTimeout(function () {
            $('.tip').hide();
          }, 1000)
        } else {
          this.toshow = !this.toshow;
          this.$refs.all.style.overflow = "";
        }
      },
      togglemore() {
        this.toshow = !this.toshow;
        this.$refs.all.style.overflow = "";
      },
      toggle2: function () {
        top = this.scroll
        let isLogin = getCookie('islogin');
        isLogin = parseInt(isLogin);
        if (isLogin == 0) {
          setCookie("inputkey", '', -1);
          this.$router.push('/login');
        }
        let expireDays = 1000 * 60 * 60;
        this.isshow = !this.isshow;
      },
      opbtn(type) {
        switch (type) {
          case 'dist':
            this.start = 1
            this.$refs.a1.innerText = this.$refs.a4.innerText
            break;
          case 'my':
            this.start = 1
            this.$refs.a1.innerText = this.$refs.a5.innerText
            break;
          default:
            this.$refs.a1.innerText = this.$refs.a2.innerText
        }
        this.catsData[this.index].listData = [];
        this.catsData[this.index].listEnd = false;
        this.catsData[this.index].listPage = 1;
        this.type = type;
        this.isload = true;
        //$('.load').show();
        this.show = false;
        this.getData(this.catid, type, 1, this.index);
      },
      toggle4() {
        this.forshow = !this.forshow;
        this.$refs.all.style.height = "100%";
        this.$refs.all.style.overflow = "";
      },
      //加入圈子
      join() {
        var gid = [];
        gid.push(this.$route.query.gid)
        this.$http.post(getOpenUrl() + "joingroup", {
          gids: gid,
        }, {
          headers: {
            'Authorization': 'Bearer ' + getToken()
          }
        }).then((res) => {
          if (res.body.code == 0) {
            this.tip = '提交成功';
            $('.tip').show();
            setTimeout(function () {
              $('.tip').hide();
            }, 1000)
//						this.jiaruquanzi = false;
            this.load("new");
          } else {
            this.forshow = true;
            this.$refs.all.style.height = "100%";
            this.$refs.all.style.overflow = "hidden";
          }
        })
      },
      //加入圈子验证
      submit() {
        var gid = [];
        gid.push(this.$route.query.gid)
        this.$http.post(getOpenUrl() + "joinValidateGroup", {
          gids: gid,
          text: this.$refs.val.value,
        }, {
          headers: {
            'Authorization': 'Bearer ' + getToken()
          }
        }).then((res) => {
          this.joingroup = res.body.data;
          if (res.body.code == 0) {
            this.tip = '提交成功';
            $('.tip').show();
            setTimeout(function () {
              $('.tip').hide();
            }, 1000)
            this.load("new");
            this.forshow = false;
            this.shenhe = true;
            this.jiaruquanzi = false;
            this.yijiaru1 = false;
            this.yaoqingjiaru = false;
            this.$refs.all.style.height = "100%";
            this.$refs.all.style.overflow = "";
          } else {
            this.tip = res.body.error_description;
            $('.tip').show();
            setTimeout(function () {
              $('.tip').hide();
            }, 1000)
          }
        })
      },
      load(type) {
        if (this.gid == this.$route.query.gid && type != "new") {
          return;
        }
        $('#guding').removeClass('guding');
        $('.header-top').css("background-color", "");
        top = 0
        this.$store.commit('HOMESTOPF', top)
        $(".listcircle").animate({"scrollTop": this.scroll}, 0)
        this.catsData = []
        //$('.load').show();
        this.isload = true;
        this.gid = this.$route.query.gid
        var self = this;
        this.catid = catid = 0; //分类id
        this.type = ''; //搜索条件
        this.start = start = 1; //分页数
        this.index = 0; //当前tab
        //一载入页面
        //获取圈子信息
        this.$http.get(getOpenUrl() + "groupData", {
          params: {
            gid: this.gid
          },
          headers: {
            'Authorization': 'Bearer ' + getToken()
          }
        }).then((res) => {
          this.isload = false;
          $('.load').hide();
          this.groupData = res.body.data;
          var self = this
//          $('.listcircle').scroll(() => {
//            if ($(".listcircle").scrollTop() > ($('.listbanner').height() - $('.header-top').height())) {
//              $('.header-top').css("background-color", self.groupData.cover ? self.groupData.cover : '#2cafbb');
//              $('#guding').addClass('guding')
//            } else {
//              $('.header-top').css("background-color", "");
//              $('#guding').removeClass('guding');
//            }
//            this.scroll = $('.listcircle').scrollTop();
//          })
          this.groupshow = res.body.is_show;
          this.status = res.body.data.is_join;
          //					this.is_collect=this.groupData.is_collect
          if (this.groupData.is_collect != 0) {
            this.$refs.check.checked = true
          }


//          if (this.groupData.is_join == 1 && this.groupData.is_level > 0) {
//            this.yijiaru1 = true
//            this.jiaruquanzi = false;
//            this.shenhe = false;
//            this.yaoqingjiaru = false;
//          }
//          if (this.groupData.is_join == 0 && this.groupData.is_level == null) {
//            this.jiaruquanzi = true;
//            this.shenhe = false;
//            this.yijiaru1 = false;
//            this.yaoqingjiaru = false;
//          }
//          if (this.groupData.is_level == 0) {
//            this.shenhe = true;
//            this.jiaruquanzi = false;
//            this.yijiaru1 = false
//            this.yaoqingjiaru = false;
//          }
//          if (this.groupData.need_invite == 2) {
//            this.shenhe = false;
//            this.jiaruquanzi = false;
//            this.yijiaru1 = false
//            this.yaoqingjiaru = true;
//          }

          if(this.groupData.status == 0){
            this.shenhe = true;
            this.jiaruquanzi = false;
            this.yijiaru1 = false;
            this.yaoqingjiaru = false;
          }else if(this.groupData.is_join == 1 && this.groupData.is_level > 0){
            this.yijiaru1 = true;
            this.jiaruquanzi = false;
            this.shenhe = false;
            this.yaoqingjiaru = false;
          }else if(this.groupData.is_join == 0 && this.groupData.is_level == null){
            this.jiaruquanzi = true;
            this.shenhe = false;
            this.yijiaru1 = false;
            this.yaoqingjiaru = false;
          }else if(this.groupData.is_join == 0 && this.groupData.need_invite == 2){
            this.shenhe = false;
            this.jiaruquanzi = false;
            this.yijiaru1 = false;
            this.yaoqingjiaru = true;
          }


          this.is_show = res.body.is_show;
          if (this.is_show == 1) {
            //获取圈子帖子分类
            this.$http.get(getOpenUrl() + "topicCate", {
              params: {
                gid: this.gid
              },
              headers: {
                'Authorization': 'Bearer ' + getToken()
              }
            }).then((res) => {
              this.isload = false;
              $('.load').hide();
              var cat = {};
              cat.title = '全部';
              cat.id = 0;
              cat.listPage = 1;
              cat.listEnd = false;
              cat.listData = [];
              cat.listH = '';
              cat.type = '';
              this.catsData.push(cat);
              var data = res.body.data;
              if (data.length > 0) {
                $.each(data, function (k, v) {
                  v.listData = [];
                  v.listPage = 1;
                  v.listEnd = false;
                  v.listH = '';
                  v.type = '';
                  self.catsData.push(v);
                })
              }
              this.catid = 0;
              this.type = '';
              this.start = 1;
              this.index = 0;
              this.getData(this.catid, this.type, this.start, this.index); //获取帖子
            });
          }
        })
      },
      //收藏
      collect() {
        if (this.$refs.check.checked) {
          this.status = 'add'
        } else {
          this.status = 'del'
        }
        this.$http.post(getOpenUrl() + "collectDo", {
          did: this.$route.query.gid,
          type: 2,
          status: this.status,
        }, {
          headers: {
            'Authorization': 'Bearer ' + getToken()
          }
        }).then((res) => {
          if (res.body.code == 0) {
            if (this.$refs.check.checked) {
              this.tip = '收藏成功';
              $('.tip').show();
              setTimeout(function () {
                $('.tip').hide();
              }, 1000)

            } else if (!this.$refs.check.checked) {
              this.tip = '取消成功';
              $('.tip').show();
              setTimeout(function () {
                $('.tip').hide();
              }, 1000)
            }
          } else {
            if (res.body.code == '1002') {
              this.tip = '请登录';
              $('.tip').show();
              setTimeout(() => {
                $('.tip').hide();
                this.$router.push("/login")
              }, 1000)
            } else {
              this.tip = res.body.error_description;
              $('.tip').show();
              setTimeout(() => {
                $('.tip').hide();
              }, 1000)
            }
          }
        })
      }
    },
    mounted() {
      $('.tip').hide();
      $('#guding').removeClass('guding')

      setTimeout(()=>{
        this.$root.eventHub.$emit('newsSuccess');
      },500)

      this.$root.eventHub.$on('submitSuccess', () => {
//				this.loadTop();
        this.load("new");
      })
      this.$root.eventHub.$on('cid', () => {
				this.cidData();
      })
      var swiperTab = this.swiperTab;
      var swiperCon = this.swiperCon;
      var self = this;
      swiperTab.on('tap', function (obj) {
        swiperCon.slideTo(obj.clickedIndex);
      });
      swiperCon.on('slideChangeStart', function (obj) {
        $('#swiper-container2 .active-nav').removeClass('active-nav')
        var activeNav = $('#swiper-container2 .swiper-slide').eq(obj.activeIndex).addClass('active-nav');
        if (!activeNav.hasClass('swiper-slide-visible')) {
          if (activeNav.index() > swiperTab.activeIndex) {
            var thumbsPerNav = Math.floor(swiperTab.width / activeNav.width()) - 1
            swiperTab.slideTo(activeNav.index() - thumbsPerNav)
          } else {
            swiperTab.slideTo(activeNav.index())
          }
        }

        self.catid = parseInt($('#swiper-container2 .active-nav').attr('cid'));
        self.page = 1;
        self.index = obj.activeIndex;
        self.isload = true;
        //$('.load').show();
        //				self.catsData[self.index].listData.splice(0, self.catsData[self.index].listData.length);
        self.getData(self.catid, self.type, self.page, self.index);
        //return;
        return;
      });
      swiperCon.on('slideChangeEnd', function (obj) {

      });
      $('.swiper-wrapper .swiper-slide').css('height','auto');
      $('#swiper-container3 .swiper-wrapper').css('min-height', $(window).height() - $('div.listbanner').outerHeight() - $('div.footer').outerHeight() - $('#swiper-container2').outerHeight());
    },
    computed: {
      swiperTab() {
        return this.catsData?this.$refs.mySwiperTab.swiper:null;
      },
      swiperCon() {
        return this.catsData?this.$refs.mySwiperCon.swiper:null;
      }
    },
    components: {
      //组件
      swiper,
      swiperSlide,
    },
    created(){
      this.load()
      $(".listcircle").animate({"scrollTop": this.scroll}, 0)
      this.$http.get(getOpenUrl() + "groupData", {
        params: {
          gid: this.gid
        },
        headers: {
          'Authorization': 'Bearer ' + getToken()
        }
      }).then((res) => {
        this.isload = false;
        $('.load').hide();
        this.groupData = res.body.data;
      });
    },
//    watch: {
//      '$route'(to, from) {
//          this.load();
//      }
//    },
    activated() {
      //路由缓存 前进后退
      this.isload = false;
      $('.load').hide();
      //android.hideTabs();
    },
    beforeRouteLeave(to, from, next) {
      top = this.scroll
      this.$store.commit('HOMESTOPF', top)
      this.show = false;
      this.isshow = false;
      next();
    },
  }
</script>
<style scoped="scoped">
  .backtop>>>.page-infinite-loading div{
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
  }
  .on {
    background: #008DD3;
  }

  .guding {
    position: fixed !important;
    top: 1.3rem !important;
  }

  .listmark {
    position: absolute;
    /*opacity: 0.2;*/
    top: 0;
    left: 0;
    width: 100%;
    height: 3rem;
  }

  /*内容*/
  /*第一种样式*/

  .tip-bottom-allone {
    overflow: hidden;
    border-bottom: 1px solid #ededed;
    padding: 0 0.2rem;
  }

  .tip-bottom-lone {
    float: left;
    width: calc(100% - 2.6rem);
  }

  .tip-bottom-l-tone {
    /*overflow: hidden;*/
  }

  .tip-bottom-l-tone li {
    float: left;
    height: 0.56rem;
    line-height: 0.56rem;
    font-size: 0.2rem;
    color: #999999;
  }

  .tip-bottom-l-tone .li1 {
    width: 0.5rem;
    height: 0.5rem;
    /*position:relative;*/
    /*overflow: hidden;*/
    /*border-radius: 50%;*/
    margin-top: 0.08rem;
  }

  .tip-bottom-l-tone .li1 img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /*position: absolute;*/
    /*top:50%;*/
    /*transform: translateY(-50%);*/
    display: block;
    border-radius: 50%;
  }

  .tip-bottom-l-tone .li2 {
    margin-left: 0.11rem;
    margin-right: 0.11rem;
    font-size: 0.2rem;
  }

  .tip-bottom-l-tone .li3 {
    line-height: 0;
    height: 0;
    padding: 0.1rem 0.1rem;
    border-radius: 0.05rem;
    margin-right: 0.05rem;
    margin-top: 0.18rem;
    color: #fff;
    font-size: 0.15rem;
  }

  .tip-bottom-l-tone .li4 {
    float: right;
    font-size: 0.2rem;
  }

  .tip-bottom-lone .li5 {
    float: right;
  }

  .tip-bottom-lone .cont_kke {
    width: 100%;
    float: left;
    text-align: left;
    font-size: 0.22rem;
    line-height: 0.36rem;
    margin-top: 0.15rem;
    color: #242424;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .tip-bottom-rone {
    float: right;
    padding-top: 0.2rem;
  }

  .tip-bottom-rone .img {
    width: 2.1rem;
    height: 1.42rem;
    border-radius: 0.1rem;
    display: block;
    float: right;
  }

  .tip-bottom-rone img {
    width: 2.1rem;
    height: 1.42rem;
    border-radius: 0.1rem;
    display: block;
    object-fit: cover;
  }

  .tip-bottom-rone ul {
    height: 0.77rem;
    line-height: 0.77rem;
    color: #949494;
    font-size: 0.2rem;
    float: left;
  }

  .tip-bottom-rone ul li {
    height: 0.77rem;
    float: left;
  }

  .tip-bottom-rone .li1 {
    width: 0.3rem;
    height: 0.77rem;
    background: url(../../images/ds.png) no-repeat 0 50%;
    background-size: auto 0.24rem;
    margin-left: 0.1rem;
    margin-right: 0.3rem;
  }

  .tip-bottom-rone .li2 {
    height: 0.77rem;
    /*background: url(../../images/xin1.png) no-repeat 0 50%;*/
    background: url(../../images/zan1.png) no-repeat 0 50%;
    /*background-size: auto 0.3rem;*/
    background-size: auto 0.25rem;
    padding-left: 0.4rem;
    margin-left: 0.2rem;
    width: .3rem;
    text-align: left;
  }

  .tip-bottom-rone .li3 {
    height: 0.77rem;
    background: url(../../images/hf.png) no-repeat 0 50%;
    background-size: auto 0.3rem;
    padding-left: 0.4rem;
    margin-left: 0.2rem;
    width: .3rem;
    text-align: left;
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

  /*.first {
        padding-bottom: 0.98rem;
    }*/

  .tip-bottom-all21 {
    overflow: hidden;
    border-bottom: 1px solid #ededed;
  }

  .tip-bottom-l-t1 li {
    float: left;
    height: 0.56rem;
    line-height: 0.56rem;
    font-size: 0.2rem;
    color: #999999;
  }

  .tip-bottom-l-t1 .li1 {
    width: 0.5rem;
    height: 0.5rem;
    margin-top: 0.1rem;
    /*position: relative;*/
    border-radius: 50%;
    /*overflow: hidden;*/
  }

  .tip-bottom-l-t1 .li1 img {
    width: 100%;
    height: 100%;
    object-fit:cover;
    /*position: absolute;*/
    /*top:50%;*/
    /*transform: translateY(-50%);*/
    display: block;
    border-radius: 50%;
  }

  .tip-bottom-l-t1 .li2 {
    margin-left: 0.11rem;
    margin-right: 0.11rem;
  }

  .tip-bottom-l-t1 .li3 {
    line-height: 0;
    height: 0;
    padding: 0.1rem 0.1rem;
    border-radius: 0.05rem;
    margin-right: 0.05rem;
    margin-top: 0.18rem;
    color: #fff;
    font-size: 0.2rem;
  }

  .tip-bottom-l1 .li4 {
    float: right;
    font-size: 0.2rem;
  }

  .tip-bottom-l1 .li5 {
    float: right
  }

  .tip-bottom-l1 p {
    float: left;
    text-align: left;
    font-size: 0.22rem;
    line-height: 0.36rem;
    margin-top: 0.15rem;
    color: #242424;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .tip-bottom-r1 {
    float: left;
    width: 100%;
    margin-top: 0.2rem;
  }

  .tip-bottom-r1 img {
    width: 100%;
    height: 1.42rem;
    border-radius: 0.1rem;
    display: block;
    float: left;
    object-fit:cover;
  }

  .tip-bottom-r1 ul {
    height: 0.77rem;
    line-height: 0.77rem;
    color: #949494;
    font-size: 0.2rem;
    float: right;
  }

  .tip-bottom-r1 ul li {
    height: 0.77rem;
    float: left;
  }

  .tip-bottom-r1 .li1 {
    width: 0.3rem;
    height: 0.77rem;
    background: url(../../images/ds.png) no-repeat 0 50%;
    background-size: 0.24rem auto;
    margin-left: 0.1rem;
    margin-right: 0.3rem;
  }

  .tip-bottom-r1 .li2 {
    height: 0.77rem;
    width: .3rem;
    /*background: url(../../images/xin1.png) no-repeat 0 50%;*/
    /*background-size: auto 0.3rem;*/
    background: url(../../images/zan1.png) no-repeat 0 50%;
    background-size: auto 0.25rem;
    padding-left: 0.4rem;
    margin-left: 0.2rem;
    text-align: left;
  }

  .tip-bottom-r1 .li3 {
    height: 0.77rem;
    width: .3rem;
    background: url(../../images/hf.png) no-repeat 0 50%;
    background-size: auto 0.3rem;
    padding-left: 0.4rem;
    margin-left: 0.2rem;
    text-align: left;
  }

  .tip-bottom21 {
    overflow: hidden;
    padding: 0 0.2rem;
  }

  .tip-bottom21 .tip-bottom-l {
    width: 6rem;
  }

  .tip-bottom21 .tip-bottom-l .li4 {
    float: right;
  }

  .tip-bottom21 .tip-bottom-r {
    margin-top: 0.28rem;
  }

  .tip-bottom21 .tip-bottom-r-img {
    height: 1.42rem;
  }

  .tip-bottom21 .tip-bottom-r-img #swiper-container2 {
    border: 0;
  }

  .tip-bottom21 .tip-bottom-r ul {
    float: right;
    margin-right: 0.4rem;
  }

  .p1 {
    width: 0.26rem;
    height: 0.26rem;
    margin-top: 0.22rem;
    float: left;
  }

  .p2 {
    background: url(../../images/jing.png) no-repeat;
    background-size: cover;
  }

  .p3 {
    background: url(../../images/z.png) no-repeat;
    background-size: cover;
  }

  .p4 {
    background: url(../../images/t.png) no-repeat;
    background-size: cover;
  }

  .tip-bottom2 {
    width: 6rem;
    margin: 0 auto;
    overflow: hidden;
  }

  .tip-bottom2 .tip-bottom-l {
    width: 6rem;
  }

  .tip-bottom2 .tip-bottom-l .li4 {
    float: right;
  }

  .tip-bottom2 .tip-bottom-r {
    margin-top: 0.28rem;
  }

  .tip-bottom-r-all {
    width: 10rem;
    overflow: hidden;
  }

  .tip-bottom2 .tip-bottom-r-img {
    width: 6rem;
    height: 1.42rem;
    overflow: hidden;
  }

  .tip-bottom2 .tip-bottom-r ul {
    float: right;
    margin-right: 0.4rem;
  }

  /*swiper*/

  #headed {
    width: 100%;
    overflow: hidden;
    float: left;
  }

  #swiper-slide {
    width: 2.1rem !important;
  }

  #swiper-container2 {
    z-index: 5;
    border-bottom: 1px solid #ccc;
    overflow: visible;
  }

  #swiper-container2 .swiper-slide {
    line-height: 0.6rem !important;
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

  .blue-slide {
    background: #4390EE;
  }

  .red-slide {
    background: #CA4040;
  }

  .orange-slide {
    background: #FF8604;
  }

  /*头部*/

  .header label {
    width: 0.3rem;
    height: 0.3rem;
    display: block;
    z-index: 1;
  }

  .header input[type="checkbox"] {
    display: none;
    position: absolute;
  }

  .header input[type="checkbox"] + b {
    position: absolute;
    display: inline-block;
    width: 0.3rem;
    height: 0.3rem;
    vertical-align: middle;
  }

  .header input[type="checkbox"]:checked + b {
    background: url(../../images/xinred.png) no-repeat;
    background-size: cover;
    border: none;
  }

  .mt70 {
    margin-left: 0.7rem;
  }

  .listcircle {
    height: 100%;
  }

  .listbanner {
    z-index: 10;
    position: absolute;
    top: 0;
    width: calc(100% - 0.4rem);
    padding: 0 0.2rem;
    height: 3rem;
    margin: 0 auto;
    background-size: cover;
  }

  .header {
    margin: 0 auto;
    position: relative;
  }

  .a1 {
    width: 0.18rem;
    height: 0.7rem;
    display: block;
    background: url(../../images/backw.png) no-repeat 0 50%;
    background-size: 0.18rem 0.34rem;
    float: left;
  }

  .header-bottom {
    overflow: hidden;
  }

  .header-top {
    position: fixed;
    width: calc(100% - 0.4rem);
    z-index: 11;
    padding: 0.3rem 0.2rem;
  }

  .post {
    border: 1px solid #fff;
    border-radius: 0.05rem;
    float: left;
    margin-top: 0.17rem;
    margin-left: 0.27rem;
  }

  .post li {
    line-height: 0.38rem;
    font-size: 0.2rem;
    color: #fff;
    text-align: center;
    float: left;
  }

  .post .li1 {
    margin-left: 0.21rem;
  }

  .post .li2 {
    width: 0.2rem;
    height: 0.1rem;
    margin-left: 0.1rem;
    background: url(../../images/backd.png) no-repeat;
    background-size: cover;
    margin-top: 0.13rem;
    margin-right: 0.1rem;
  }

  .post-child {
    width: 1.4rem;
    border: 1px solid #ebebeb;
    border-top: 0;
    background: #fff;
    position: absolute;
    top: 0.87rem;
    left: 0.66rem;
    font-size: 0.2rem;
    z-index: 12;
  }

  .post-child li {
    color: #242424;
    /*margin-left: 0.21rem;*/
    text-align: center;
    line-height: 0.5rem;
    /*border-bottom: 1px solid #000;*/
    width: 100%;
  }

  .ld {
    width: 0.3rem;
    height: 0.7rem;
    float: right;
    background: url(../../images/ld.png) no-repeat 0 50%;
    background-size: 0.28rem auto;
  }

  .user {
    width: 0.3rem;
    height: 0.7rem;
    float: right;
    background: url(../../images/xxx.png) no-repeat 0 50%;
    background-size: 0.28rem auto;
    margin-left: 0.31rem;
  }

  .header-bottom {
    margin-top: 1.08rem;
    color: #fff;
  }

  .tip-bottom-l {
    width: 1.08rem;
    height: 1.08rem;
    float: left;
    /*position: relative;*/
    /*overflow: hidden;*/
    /*border-radius: 50%;*/
  }

  .tip-bottom-l img {
    width: 100%;
    height: 100%;
    float: left;
    /*position: absolute;*/
    /*top:50%;*/
    /*transform: translateY(-50%);*/
    border-radius: 50%;
    object-fit:cover;
  }

  .tip-bottom-r .li1 {
    /*line-height: 0.43rem;*/
    font-size: 0.22rem;
    padding-left: 0.2rem;
    /*margin-top: 0.18rem;*/
    overflow: hidden;
  }

  .tip-bottom-r .li1 span {
    display: block;
    width: 4.22rem;
  }

  .tip-bottom-r .li1 .sp1 {
    line-height: 0.43rem;
    font-size: 0.22rem;
    float: left;
  }

  .tip-bottom-r .li1 .sp2 {
    width: 0.3rem;
    height: 0.3rem;
    background: url(../../images/xin.png) no-repeat;
    background-size: cover;
    float: right;
    /*margin-top: 0.1rem;*/
  }

  .tip-bottom-r .li2 {
    line-height: 0.38rem;
    font-size: 0.2rem;
    padding-left: 0.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .header-bottom-top {
    overflow: hidden;
  }

  .header-bottom-bottom {
    line-height: 0.43rem;
    height: 0.43rem;
    margin-top: 0.11rem;
    /*border-bottom: 1px solid #fff;*/
    font-size: 0.2rem;
  }

  .header-bottom-bottom li {
    float: left;
  }

  .header-bottom-bottom .li3 {
    height: 0.34rem;
    line-height: 0.34rem;
    text-align: center;
    background: #fff;
    color: #008dd3;
    border-radius: 0.05rem;
    float: right;
    padding: 0 0.1rem;
  }

  .header-bottom-down {
    font-size: 0.2rem;
    line-height: 0.36rem;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    padding-top: 0.1rem;
  }

  .forget {
    text-align: center;
    width: 20%;
    line-height: 0.7rem;
    font-size: 0.26rem;
    display: block;
    float: left;
    color: #fff;
    position: absolute;
    left: 50%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
  }

  /**/

  .father {
    height: 0.79rem;
    border-bottom: 1px solid #f5f5f5;
  }

  .father ul {
    height: 100%;
    display: flex;
  }

  .father li {
    height: 100%;
    float: left;
    flex: 1;
    color: #1a1a1a;
    font-size: 0.2rem;
    line-height: 0.79rem;
    text-align: center;
  }

  .father a {
    height: 0.76rem;
    width: 1rem;
    display: block;
    margin: 0 auto;
  }

  .father a:hover {
    color: #008dd3;
    border-bottom: 0.03rem solid #008dd3;
  }

  .tj {
    width: 1.42rem;
    height: 1.52rem;
    position: absolute;
    bottom: 0;
    right: 0;
    background: url(../../images/tzbt.png) no-repeat;
    background-size: cover;
    z-index: 999;
  }

  /*.bigc {
        width: 2.3rem;
        height: 2.3rem;
        position: absolute;
        bottom: 2.2rem;
        right: -0.6rem;
        background: url(../../images/bigc.png)no-repeat;
        background-size: contain;
        z-index: 3;
    }*/

  .hd {
    width: 0.70rem;
    height: 0.70rem;
    position: absolute;
    bottom: 3.4rem;
    right: 0.3rem;
    background: url(../../images/hd.png) no-repeat;
    background-size: contain;
    z-index: 4;
  }

  .ft {
    width: 0.70rem;
    height: 0.70rem;
    position: absolute;
    bottom: 2.4rem;
    right: 0.3rem;
    background: url(../../images/ft.png) no-repeat;
    background-size: contain;
    z-index: 4;
  }

  .js {
    width: 0.70rem;
    height: 0.70rem;
    position: absolute;
    bottom: 1.4rem;
    right: 0.3rem;
    background: url(../../images/js.png) no-repeat;
    background-size: contain;
    z-index: 4;
  }

  #headed {
    width: 100%;
    overflow: hidden;
    float: left;
  }

  .shift {
    transition-property: margin-left;
    transition-duration: 1s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s;
  }

  .jubao {
    width: 5.36rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }

  .jubaoall {
    width: 5.36rem;
    position: relative;
    background: #fff;
    box-shadow: 0 0 0.05rem #000;
    color: #242424;
    font-size: 0.3rem;
  }

  .jubao-t {
    background: #54C2F0;
    height: 1rem;
    /*border-radius: 0.05rem;*/
    line-height: 1rem;
    padding: 0 0.2rem;
  }

  .jubao-t span {
    color: #fff;
  }

  .jubao-t .a2 {
    color: #fff;
    float: right;
  }

  .jubao-b p {
    text-align: center;
    padding: 0.3rem;
    font-size: 0.22rem;
  }

  .mark {
    width: 100%;
    height: 100%;
    z-index: 999;
    position: fixed;
    top: 0;
    background: rgba(0, 0, 0, 0.2);
  }

  .yzall .forget1 {
    text-align: center;
    line-height: 1.25rem;
    z-index: 1000;
    margin-bottom: 0.05rem;
    border-radius: 0.1rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0.1rem #000;
    background: #fff;
    padding: 0rem 0.2rem;
    color: #242424;
    width: 5rem;
    font-size: 0.3rem;
    padding-bottom: 0.3rem;
  }

  .yzall .sp2 {
    border: 1px solid #242424;
    display: block;
    border-radius: 0.1rem;
  }

  .yzall .sp2 input {
    display: block;
    width: 100%;
    color: #242424;
    height: 0.5rem;
    padding-left: 0.2rem;
  }

  .yzall .sp3 {
    width: 1.4rem;
    background: #008DD3;
    display: block;
    margin: 0 auto;
    text-align: center;
    margin-top: 0.2rem;
    border-radius: 0.1rem;
  }

  .yzall .sp3 input {
    display: block;
    width: 100%;
    color: #fff;
    height: 0.5rem;
  }

  /*管理员*/

  .footer {
    height: 0.88rem;
    background: #fff;
    position: fixed;
    left: 50%;
    bottom: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    border: 1px solid #c7c7c7;
  }

  .form {
    padding-top: 0.17rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    display: flex;
  }

  .footer input {
    display: block;
  }

  .footer .text {
    height: 0.52rem;
    width: 1.82rem;
    border: 1px solid #e0e0e0;
    border-radius: 0.05rem;
    float: left;
    flex: 1;
  }

  .footer .text span {
    margin: 0 0.1rem 0 0.11rem;
    width: 0.24rem;
    height: 0.52rem;
    background: url(../../images/fatie.png) no-repeat 0 50%;
    background-size: 0.24rem 0.24rem;
    display: block;
    float: left;
  }

  .footer input[type=text] {
    height: 0.52rem;
    width: 1.37rem;
  }

  .footer input[type=button] {
    float: left;
    width: 0.4rem;
    height: 0.52rem;
    background: url(../../images/fasong.png) no-repeat 0 50%;
    background-size: 0.4rem 0.37rem;
    margin-left: 0.19rem;
  }

  input::-webkit-input-placeholder {
    color: #8f8f8f;
    font-size: 0.16rem;
  }

  .footer .button {
    float: right;
  }

  .footer dl {
    float: left;
    height: 0.5rem;
    margin-left: 0.3rem;
  }

  .footer dl dt img {
    display: block;
    margin: 0 auto;
  }

  .footer .dl1 img {
    width: 0.19rem;
    height: 0.24rem;
  }

  .footer .dl2 img {
    width: 0.24rem;
    height: 0.24rem;
  }

  .footer .dl3 img {
    width: 0.22rem;
    height: 0.23rem;
    margin-bottom: 0.02rem;
  }

  .footer .dl4 img {
    width: 0.24rem;
    height: 0.2rem;
    margin-bottom: 0.04rem;
  }

  .footer .dl5 img {
    width: 0.24;
    height: 0.24rem;
  }

  .footer .dl6 img {
    width: 0.22rem;
    height: 0.22rem;
    margin-bottom: 0.03rem;
  }

  .footer dl dd {
    font-size: 0.18rem;
    height: 0.18rem;
    color: #8f8f8f;
  }

  /*删帖*/

  .up {
    width: 5.36rem;
    height: 3.8rem;
    background: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -2.045rem;
    margin-left: -2.62rem;
    z-index: 999;
    border-radius: 0.05rem;
  }

  .up-all {
    width: 4.6rem;
    height: 100%;
    margin: 0 auto;
  }

  .up-all p {
    color: #292929;
    font-size: 0.24rem;
    line-height: 0.66rem;
    height: 0.56rem;
    padding-top: 0.1rem;
  }

  .up-all .sp1 {
    color: #008dd3;
  }

  .up-all textarea {
    width: 4.58rem;
    height: 1.88rem;
    resize: none;
    outline: none;
    border: 1px solid #e0e0e0;
    border-radius: 0.05rem;
  }

  .up-all ul {
    width: 4.4rem;
    height: 0.56rem;
    margin: 0 auto;
    margin-top: 0.35rem;
    margin-bottom: 0.35rem;
  }

  .up-all ul li {
    width: 2.08rem;
    height: 0.54rem;
    float: left;
    border-radius: 0.28rem;
    border: 1px solid #008dd3;
  }

  .up-all ul li a {
    width: 2.08rem;
    height: 0.54rem;
    line-height: 0.54rem;
    color: #008dd3;
    font-size: 0.22rem;
    display: block;
    text-align: center;
    border-radius: 0.28rem;
  }

  .up-all ul li a:hover {
    color: #fff;
    background: #008dd3;
  }

  .up-all .li2 {
    float: right;
  }

  /*高亮颜色*/

  .col span {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    display: block;
    float: left;
    margin: 0.2rem;
  }

  .att {
    border: 1px solid #000;
    border-radius: 50%;
  }

  .col .col1 {
    background: #008DD3;
  }

  .col .col2 {
    background: #F29112;
  }

  .col .col3 {
    background: #00FF00;
  }

  .col .col4 {
    background: rgb(229, 63, 78);
  }

  .lia {
    width: 0.2rem;
    height: 0.2rem;
    float: left;
    position: relative;
    top: 0.25rem;
    border: 1px solid #ccc;
    border-radius: 50%;
  }

  .lia label {
    width: 0.2rem;
    height: 0.2rem;
    border-radius: 50%;
    display: block;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
  }

  .lia input[type="checkbox"] {
    display: none;
    position: absolute;
  }

  .lia input[type="checkbox"] + b {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    vertical-align: middle;
  }

  .lia input[type="checkbox"]:checked + b {
    background: url(../../images/checkbox.png) no-repeat;
    background-size: cover;
    border: none;
  }

  /*加载更多*/
  /*.scroll-wrapper li {
        line-height: 0.3rem;
        font-size: 0.2rem;
        text-align: center;
    }
    .mint-loadmore-top{
        margin-top: -0.5rem;
        text-align: center;
        height: 0.5rem;
        line-height: 0.5rem;
    }
    .mint-loadmore-bottom{
        margin-top: -0.5rem;
        text-align: center;
        height: 0.5rem;
        line-height: 0.5rem;
    }*/
</style>
