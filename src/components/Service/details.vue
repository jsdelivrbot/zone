<template>
  <div class="details" ref="a1">
    <!--<my-header title="资源详情" uri="#/service"></my-header>-->
    <div class="header">
      <div class="headerall">
        <!--<a href="#/service" class="a1"></a>-->
        <a href="javascript:history.back(-1);" class="a1"></a>
        <span class="forget">资源详情</span>
      </div>
    </div>
    <div class="zyContent" style="height:100%;overflow: auto;position:relative;">
      <div class="nav">
        <ul class="tip">
          <li class="li1">{{this.mkData.title}}</li>
          <li class="li2">
            <span class="sp1">{{this.mkData.lognum}}</span>
            <span class="sp2">{{this.mkData.msgnum}}</span>
            <span class="sp3">{{this.mkData.ctime}}</span>
          </li>
        </ul>
      </div>
      <div class="line"></div>
      <div v-for="(data,index) in this.mkData.content" :key="index">
        <div class="nav1" v-if="data.mtitle">
          <ul class="nav1-tip">
            <li class="nav1-li1">{{data.mtitle}}</li>
            <li class="nav1-li2" :id="'btn-'+index" @click="toggle(index)"></li>
          </ul>
        </div>
        <transition name="fade">
          <div class="nav2" :id="'box-'+index" v-if="data.text">
            <span class="nav2-content" v-html="data.text"></span>
          </div>
        </transition>
      </div>
      <ul class="center-txt">
        <li class="li3">
          <span class="sp1" v-bind:class="{collect:isCollect==1}" @click="opbtn('collect', 'del')" v-if="isCollect">{{collectNum}}</span>
          <span class="sp1" @click="opbtn('collect', 'add')" v-else>{{collectNum}}</span>
          <span class="sp2" v-bind:class="{zan:isZan>0}" v-if="isZan>0">{{zanNum}}</span>
          <span class="sp2" @click="opbtn('zan')" v-else>{{zanNum}}</span>
        </li>
      </ul>
      <div class="line"></div>
      <div v-if="cgalData">
        <div class="nav1">
          <ul class="nav1-tip">
            <li class="nav1-li1">成功案例</li>
            <li class="nav1-li2" id="btn-cgal" @click="toggle('cgal')"></li>
          </ul>
        </div>
        <transition name="fade">
          <div class="nav2 bn" id="box-cgal">
            <ul class="nav3-content">
              <li v-for="(data,index) in cgalData" :key="index" @click="xiangguan(data.ziy_id)">
                <!--<router-link :to="'/details?id='+data.ziy_id+'&type='+data.catid">-->
                  {{data.title}}
                <!--</router-link>-->
              </li>
            </ul>
          </div>
        </transition>
        <div class="line"></div>
      </div>

      <div v-if="isxgzy">
        <div class="nav1">
          <ul class="nav1-tip">
            <li class="nav1-li1">相关资源</li>
            <li class="nav1-li2" id="btn-xgzy" @click="toggle('xgzy')"></li>
          </ul>
        </div>
        <transition name="fade">
          <div class="nav2 bn" id="box-xgzy">
            <ul class="nav3-content">
              <li v-for="(data,index) in this.mkData.relevant" :key="index" @click="xiangguan(data.ziy_id)">
                <!--<router-link :to="'/details?id='+data.ziy_id+'&type='+data.catid">-->
                  {{data.title}}
                <!--</router-link>-->
              </li>
            </ul>
          </div>
        </transition>
        <div class="line mt1"></div>
      </div>
      <pop :title="popmsg" v-show="ispop"></pop>
      <div class="load" style="display:none;">
        <div class="load-container load4">
          <div class="loader"><i></i></div>
        </div>
      </div>
    </div>
    <div class="mark" v-show="toshow"></div>
    <transition name="fade">
      <div class="jubao" v-show="toshow">
        <div class="jubaoall">
          <div class="jubao-t">
            <span>办事处联系方式：</span>
            <a class="a2" @click="toggle3();a1()">X</a>
          </div>
          <div class="jubao-b" v-for="(data,index) in phoneData" :key="index" v-bind:class="{isMinHeight:phoneData.length==0}" v-if="phoneData.length>0">
            <!--<p v-text="data.agency_name"></p>-->
            <!--<span style="display: block;float: left;">：</span>-->
            <p v-text="data.link_phone"></p>
            <a :href="'tel:' + data.link_phone"><img src="../../images/tel-icon.png" style="
    width: 0.4rem;
    object-fit: cover;
    margin-right: 0.1rem;
    vertical-align: middle;
    display: inline-block;
    position: relative;
    top: -.03rem;"></a>
            <!--<p @click="toCall(data.link_phone)" v-text="data.link_phone"></p>-->
          </div>
          <div class="jubao-b" v-bind:class="{isMinHeight:phoneData.length==0}" v-if="phoneData.length==0">
            <p style="line-height: normal;padding: 0.1rem;">暂未匹配到接口人联系方式，请更新您个人资料中的地域信息或者稍候再试</p>
          </div>
        </div>
      </div>
    </transition>
    <div class="down">
      <ul class="down-ul">
        <!--<li class="down-li1">-->
        <li class="down-li1">
          <a @click="toggle3();phone()">咨询电话</a>
        </li>
        <li class="down-li2">
          <a @click="buyunxu">
            在线咨询
          </a>
        </li>
      </ul>
    </div>
    <load v-show="isload"></load>
  </div>
</template>
<script>
  import qs from 'qs'
  import {setCookie, getCookie} from '../../assets/js/cookie.js';
  import {getOpenUrl, getToken} from '../../assets/js/common.js'

  var token = getToken();
  export default {
    name: 'details',
    data() {
      return {
        isload:false,
        mkData: {},
        phoneData: {},
        cgalData: {},
        toshow: false,
        ispop: false,
        isxgzy: false,
        popmsg: '',
        isCollect: false,
        collectNum: 0,
        isZan: false,
        zanNum: 0,
      };
    },
    mounted() {

      setTimeout(()=>{
        this.$root.eventHub.$emit('zjSuccess');
      },500);

      this.id = this.$route.query.id;
      this.phone();
      this.getData(this.id);
      this.getCgal(this.id);

    },
    methods: {
      toCall(num){
        android.call(num);
      },
      getData(id) {
        this.isload = true;
        this.$http.get(getOpenUrl() + "resource/resourceData", {
          headers: {
            'Authorization': 'Bearer ' + token
          },
          params: {
            id: id
          }
        })
          .then((res) => {
            this.isload = false;
            this.mkData = res.body.data
            if (this.mkData.relevant.length > 0) {
              this.isxgzy = true;
            }
            this.isCollect = this.mkData.is_collect;
            this.collectNum = this.mkData.collect_num;
            this.isZan = this.mkData.is_zan;
            this.zanNum = this.mkData.zan_num;
            console.log(this.mkData);

            android.hideTabs();
          })
      },
      getCgal(id) {
        this.$http.get(getOpenUrl() + "cgal", {
          params: {
            ziy_id: id
          },
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }).then((res) => {
          this.cgalData = res.body.data;
        })
      },
      xiangguan(id) {
        $('.zyContent').animate({scrollTop: 0}, 'fast');
        this.isload = true;
        this.$http.get(getOpenUrl() + "resource/resourceData", {
          params: {
            id: id
          },
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
          .then((res) => {
            this.isload = false;
            if (res.body.code == '000') {
              this.mkData = res.body.data;
              this.getCgal(id);
              this.phone();
              $('.nav1-li2').removeClass('on');
              $('.nav2').show();
            }
          })
      },
      toggle3: function () {
        this.toshow = !this.toshow;
        //this.$refs.a1.style.height = "calc(100% - 1.64rem)";
        //this.$refs.a1.style.overflow = "hidden";
      },
      a1() {
        this.$refs.a1.style.height = "";
        this.$refs.a1.style.overflow = "";
      },
      phone() {
        //var token = getToken()
        this.$http.get(getOpenUrl() + "resource/inquiry", {
          params: {
            id: this.$route.query.id
          },
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
          .then((res) => {
            if (res.body.code == 0) {
              this.phoneData = res.body.phone;
            } else {
              //this.ispop = true;
              this.popmsg = res.body.error_description;
              this.$toast(this.popmsg,{
                duration:'1500'
              });
              setTimeout(() => {
                this.ispop = false
              }, 1000);
            }
          });
      },
      buyunxu() {
        this.$http.get(getOpenUrl() + "resource/onlineMessage", {
          params: {
            id: this.$route.query.type,
            ziy_id: this.$route.query.ziy_id
          },
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
          .then((res) => {
            if (res.body.code == '0000') {
              this.$router.push('/online?ziy_id=' + this.$route.query.id + '&type=' + this.$route.query.type)
            } else {
              //this.ispop = true;
              this.popmsg = res.body.error_description;
              this.$toast(this.popmsg,{
                duration:'1500'
              });
              setTimeout(() => {
                this.ispop = false
              }, 1000);
            }
          })
      },
      toggle: function (id) {
        var $btn = $('#btn-' + id);
        var $box = $('#box-' + id);
        if ($btn.hasClass('on')) {
          $btn.removeClass('on');
          $box.show();
        } else {
          $btn.addClass('on');
          $box.hide();
        }
      },
      opbtn: function (type, op) {
        let isLogin = getCookie('islogin');
        isLogin = parseInt(isLogin);
        if (isLogin == 0) {
          this.$router.push('/login');
          return;
        }
        this.isload = true;
        //$('.load').show();
        switch (type) {
          case 'collect':
            //收藏
            this.$http.post(getOpenUrl() + "collectDo", {
              did: this.mkData.ziy_id,
              type: 5,
              status: op
            }, {
              headers: {
                'Authorization': 'Bearer ' + getToken()
              }
            }).then((res) => {
              this.isload = false;
              if (res.body.code == '0000') {
                this.collectNum = op == 'del' ? this.collectNum - 1 : this.collectNum + 1;
                this.isCollect = !this.isCollect;
              } else {
                if (res.body.code == '1002') {
                  this.tip = res.body.error_description;
                  this.$toast(this.tip,{
                    duration:'1500'
                  });
                  //$('.tips').show();
                  setTimeout(function () {
                    $('.tips').hide();
                    this.$router.push("/login")
                  }, 1000)
                } else {
                  this.tip = res.body.error_description;
                  this.$toast(this.tip,{
                    duration:'1500'
                  });
                  //$('.tips').show();
                  setTimeout(function () {
                    $('.tips').hide();
                  }, 1000)
                }
              }
              $('.load').hide();
            })
            break;
          case 'zan':
            //点赞
            this.$http.post(getOpenUrl() + "zan", {
              id: this.mkData.ziy_id,
              styles: 3
            }, {
              headers: {
                'Authorization': 'Bearer ' + getToken()
              }
            }).then((res) => {
              this.isload = false;
              if (res.body.code == '0000') {
                this.isZan = !this.isZan;
                this.zanNum = this.zanNum + 1;
              } else {
                this.tip = res.body.error_description;
                this.$toast(this.tip,{
                  duration:'1500'
                });
                //$('.tips').show();
                setTimeout(function () {
                  $('.tips').hide();
                }, 1000)
              }
              $('.load').hide();
            })
            break;
        }
      }
    },
    updated() {
      $('.nav2-content img').css({width: '100%', height: 'auto'});
    },
    activated() {
      //路由缓存 前进后退
      $('.load').hide();
      if (this.id != this.$route.query.id) {
        this.id = this.$route.query.id;
        this.mkData = {};
        this.phoneData = {};
        this.cgalData = '';
        this.getData(this.id);
        this.getCgal(this.id);
        this.phone();
      }
    }
  }
</script>
<style scoped>
  .header {
    height: 0.7rem;
    box-shadow: 0 0 5px #ebebeb;
    width: 100%;
    background: #fff;
    z-index: 11;
    margin-bottom: 0.05rem;
    position: fixed;
    padding-top: 0.3rem;
  }

  .headerall {
    padding: 0 0.2rem;
  }

  .header a {
    width: 0.18rem;
    height: 0.7rem;
    display: block;
    background: url(../../images/back.png) no-repeat 0 50%;
    background-size: 0.18rem 0.34rem;
    float: left;
  }

  .forget {
    line-height: 0.7rem;
    font-size: 0.26rem;
    display: block;
    float: left;
    color: #008dd3;
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s;
  }

  .details {
    margin-bottom: 1.64rem;
    /*height: auto;*/
    height: calc(100% - 1.64rem);
  }

  .mt1 {
    margin-top: -0.02rem;
  }

  .f {
    float: left;
  }

  .ft20 {
    font-size: 0.2rem;
  }

  .bn {
    border-bottom: none !important;
  }

  .nav {
    padding-top: 1rem;
    margin: 0 10px;
  }

  .tip {
    margin-top: 0.16rem;
    margin-bottom: 0.14rem;
  }

  .li1 {
    font-size: 0.22rem;
    line-height: 0.44rem;
    color: #1a1a1a;
    margin-left: 0.04rem;
  }

  .li2 {
    font-size: 0.2rem;
    line-height: 0.32rem;
    color: #949494;
    margin-left: 0.03rem;
  }

  .li2 .sp1 {
    background: url(../../images/sl.png) no-repeat 0 50%;
    background-size: 0.2rem auto;
    padding-left: 0.3rem;
  }

  .li2 .sp2 {
    /*background: url(../../images/hf.png) no-repeat 0 50%;*/
    background: url(../../images/zixun.png) no-repeat 0 50%;
    background-size: 0.22rem auto;
    padding-left: 0.3rem;
    margin-left: .15rem;
  }

  .li2 .sp3 {
    float: right;
  }

  .nav img {
    width: 6rem;
    height: 3.2rem;
  }

  .line {
    height: 0.2rem;
    background: #f5f5f5;
  }

  .nav1 {
    overflow: hidden;
  }

  .nav1 .nav1-tip {
    margin: 0 10px;
    margin-top: 0.22rem;
    overflow: hidden;
    padding-bottom: 0.2rem;
    border-bottom: 0.01rem solid #ebebeb;
  }

  .nav1-li1 {
    font-size: 0.22rem;
    line-height: 0.27rem;
    border-left: 0.03rem solid #008dd3;
    float: left;
    color: #1a1a1a;
    padding-left: 0.12rem;
  }

  .nav1-li2 {
    width: 0.24rem;
    height: 0.18rem;
    background: url(../../images/up.png) no-repeat;
    background-size: cover;
    float: right;
  }

  .nav1-li2.on {
    width: 0.24rem;
    height: 0.18rem;
    background: url(../../images/down.png) no-repeat;
    background-size: cover;
    float: right;
  }

  .nav2 {
    width: 100%;
    border-bottom: 0.01rem solid #ebebeb;
    font-size: 0
  }

  .nav2-content {
    line-height: 0.39rem;
    margin: 0.13rem 10px;
    display: block;
    font-size: 0.2rem;
    /*text-indent: 2em;*/
  }

  .nav2-sp1,
  .nav2-sp2 {
    line-height: 0.75rem;
    display: inline-block;
  }

  .nav2-sp1 {
    margin-left: 0.2rem;
    background: url(../../images/shoucang.png) no-repeat 0 50%;
    background-size: 0.28rem 0.27rem;
    padding-left: 0.32rem;
  }

  .nav2-sp2 {
    margin-left: 0.43rem;
    background: url(../../images/zan1.png) no-repeat 0 50%;
    background-size: 0.24rem 0.24rem;
    padding-left: 0.3rem;
  }

  .nav3-content {
    line-height: 0.85rem;
    margin: 0 15px;;
    font-size: 0.22rem;
  }

  .nav3-content li {
    border-bottom: 0.01rem solid #ebebeb;
  }

  .down {
    height: 1.64rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
    box-shadow: 0 0 0.05rem #ebebeb;
  }

  .down ul {
    width: 6rem;
    margin: 0 auto;
  }

  .down-li1 {
    float: left;
  }

  .down-li2 a {
    float: right;
    background: #54c2f0;
    color: #fff !important;
    border-radius: 0.33rem;
  }

  .down li a {
    width: 2.72rem;
    height: 0.66rem;
    line-height: 0.66rem;
    border-radius: 0.33rem;
    border: 1px solid #54c2f0;
    font-size: 0.25rem;
    display: block;
    color: #54c2f0;
    text-align: center;
  }

  .jubao {
    width: 5.36rem;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -1.9rem;
    margin-left: -2.68rem;
    z-index: 12;
  }

  .jubaoall {
    width: 5.36rem;
    position: relative;
    background: #fff;
    box-shadow: 0 0 0.05rem #000;
    color: #242424;
    font-size: 0.22rem;
  }

  .jubao-t {
    background: #54C2F0;
    height: 0.5rem;
    line-height: 0.5rem;
    padding: 0 0.2rem;
  }

  .jubao-t span {
    color: #fff;
  }

  .jubao-t .a2 {
    color: #fff;
    float: right;
  }

  .jubao-b {
    /*padding-left: 0.2rem;*/
    overflow-y: scroll;
    line-height: 0.5rem;
    min-height:0;
    /*position: absolute;*/
    /*top:50%;*/
    /*left:50%;*/
    /*transform: translate(-50%,-50%);*/
    padding: 0.15rem 0;
    text-align: center;
  }
  .jubao-b.isMinHeight{
    min-height: 1.5rem;
  }

  .jubao-b p {
    /*float: left;*/
    /*line-height: 0.5rem;*/
    display: inline-block;
  }

  .mark {
    width: 100%;
    height: 100%;
    z-index: 11;
    position: fixed;
    top: 0;
    background: rgba(0, 0, 0, 0.2);
  }

  a {
    color: #242424;
  }

  .center-txt {
    margin-top: -1px;
    border-top: 1px solid #fff;
  }

  .center-txt .li3 {
    height: 0.77rem;
    line-height: 0.77rem;
  }

  .center-txt span {
    display: block;
    float: left;
    margin-left: 0.15rem;
    font-size: 0.2rem;
    color: #adadad;
    width: 0.33rem;
    padding-left: 0.3rem;
  }

  .center-txt .sp1 {
    background: url(../../images/sc.png) no-repeat 0 50%;
    background-size: 0.22rem auto;
  }

  .center-txt .sp1.collect {
    background: url(../../images/sc.jpg) no-repeat 0 50%;
    background-size: 0.22rem auto;
  }

  .center-txt .sp2 {
    background: url(../../images/zan1.png) no-repeat 0 50%;
    background-size: 0.22rem auto;
  }

  .center-txt .sp2.zan {
    background: url(../../images/zan1.jpg) no-repeat 0 50%;
    background-size: 0.22rem auto;
  }
</style>
