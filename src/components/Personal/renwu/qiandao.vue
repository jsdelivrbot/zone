<template>
	<div>
    <div class="headerq">
      <div class="headerallq">
        <a href="javascript:history.back(-1);" @click="back" class="a1q"></a>
        <!--<a @click="back" class="a1q"></a>-->
        <span class="forgetq">我的签到</span>
      </div>
    </div>
    <div class="qiandao" style="overflow:auto;height: 100%;position: relative;">
      <div class="page-loadmore backtop" style="font-size:0.2rem;">
        <mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">
      <div class="hwq">
        <div class="qdbanner">
          <span>已连续签到<span>{{data.lxqd_day}}</span>天，距离礼包还有<span>{{data.has_day}}</span>天</span>
        </div>
      </div>

      <vue-event-calendar :events="demoEvents">
        <template scope="props">

        </template>
      </vue-event-calendar>
      <div class="line"></div>
      <div class="footerq">
        <div class="footerq-t">签到规则</div>
        <div class="footerq-b">
          <ul>
            <li class="fli1" v-for="(day,index) in guizeData" :key="index">{{index+1}}</li>
          </ul>
          <ul class="mt40">
            <li class="fli2" v-for="(day,index) in guizeData" :key="index">
              <span class="fsp1"></span>
              <span class="fsp2"></span>
            </li>
          </ul>
          <ul class="ful3">
            <li class="fli3" v-for="(day,index) in guizeData" :key="index">
              <p class="fp1">连续签到<span>{{day.count}}</span>天</p>
              <p class="fp2">即可获得<span>{{day.num}}</span>个积分</p>
            </li>
            <!--<li class="fli3">-->
            <!--<p class="fp1">连续签到<span>5</span>天</p>-->
            <!--<p class="fp2">神秘礼包等你开启，签到任务重新开始</p>-->
            <!--</li>-->
          </ul>
        </div>
      </div>
        </mt-loadmore>
      </div>
    </div>
      <div class="load" style="display:none;">
        <div class="load-container load4"><div class="loader"> <i></i></div></div>
      </div>
    <load v-show="isload"></load>
	</div>
</template>

<script>
  let objData = [];
  import { setCookie, getCookie } from '../../../assets/js/cookie.js'
  import {getOpenUrl,getToken} from '../../../assets/js/common.js'
export default {
  data () {
    return {
//      demoEvents: [{
//        date:'2017/10/24',
//        title:''
//      },{
//        date: '2017/10/23',
//        title:''
//      }],
      isload:false,
      demoEvents:objData,
      data:'',
      guizeData:[],
      qdData:{},
      allLoaded: false,
      scrollMode:"auto",
      topStatus: '',
    }
  },
  mounted(){
    this.isload = true;
    //$('.load').show();

    this.getQianDao();

    this.getQianDaoGuize();

    this.getQianDaoArr();

    $('.qiandao').scroll(function(){
      if ($('.qiandao').scrollTop() > ($('.hwq').height() - $('.qdbanner').height())){
        $('.headerq').addClass('on')
      }else{
        $('.headerq').removeClass('on')
      }
    });
  },
  methods:{
    loadTop() { // 刷新数据的操作
      setTimeout(()=> {
        this.getQianDao();
        this.getQianDaoGuize();
        this.getQianDaoArr();
        this.allLoaded = false;
        this.$refs.loadmore.onTopLoaded();
      },2000)
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    handleBottomChange(status){
      this.bottomStatus = status;
    },
    back(){
      this.$router.goBack();
      //android.back1();
    },
    getQianDao(){
      this.$http.get(getOpenUrl() + "/user/myQiandao", {
        headers: {
          "Authorization": "Bearer " + getToken()
        },
        params:{
          type:''
        },
      }).then((res)=>{
        this.isload = false;
        if(res.body.status){
          this.data = res.body.data;
        }
        $('.load').hide();
      });
    },
    getQianDaoGuize(){
      this.$http.get(getOpenUrl() + "/user/myQiandao", {
        headers: {
          "Authorization": "Bearer " + getToken()
        },
        params:{
          type:'guize'
        },
      }).then((res)=>{
        this.isload = false;
        if(res.body.status){
          this.guizeData = res.body.data;
        }
        $('.load').hide();
      });
    },
    getQianDaoArr(){
      this.$http.get(getOpenUrl() + "/user/myQiandao", {
        headers: {
          "Authorization": "Bearer " + getToken()
        },
        params:{
          type:'qiandao'
        },
      }).then((res)=>{
        this.isload = false;
        if(res.body.status){
          this.qdData = res.body.data;
          //objData = this.qdData.toString();
          console.log(this.qdData[0]);
          for(let i = 0;i<this.qdData.length;i++){
            objData.push(this.qdData[i]);
          }
        }
        $('.load').hide();
      });
    }
  },
  activated(){
    //路由缓存 前进后退
    $('.load').hide();
  }
}
</script>
<style >


  .__vev_calendar-wrapper .cal-wrapper {width: 100%;}
  .hwq{width: 100%;height: 4.59rem;background: url(../../../images/listbanner.png)no-repeat;background-size: cover;
    position: relative;
  }
  .headerq{height: 0.7rem;position: fixed;top: 0;width: 100%;z-index:999;padding-top: 0.3rem;}
  .headerq.on{background:#fff;color:#008dd3;z-index:9}
  .qdbanner{width: 100%;font-size: 0.22rem;color: #fff;text-align: center;position: absolute;bottom: 0;line-height: 1rem;}
  .headerallq{width: 5.8rem;margin: 0 auto;}
  .headerq .a1q{width: 0.18rem;height: 0.34rem;display: block;background: url(../../../images/backw.png) no-repeat;background-size: cover;float:left;margin-top:0.2rem;}
  .headerq .a2q{width:0.3rem;height: 0.7rem;display: block;float: right;background: url(../../../images/dianw.png) no-repeat 0 50%;background-size: 0.3rem 0.06rem;}
  .forgetq{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #fff;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}

  .headerq.on .forgetq{color:#008dd3}
  .headerq.on .a1q{background: url(../../../images/back.png) no-repeat;background-size: cover;}

  .__vev_calendar-wrapper{font-size: 0.22rem;}
  .__vev_calendar-wrapper .cal-wrapper .cal-body .weeks{font-size: 0.19rem;}
  .__vev_calendar-wrapper .cal-wrapper .cal-body .dates .item .date-num{font-size: 0.16rem;}
  .events-wrapper{display: none;}
  .__vev_calendar-wrapper .cal-wrapper{padding: 0;}
  .__vev_calendar-wrapper .cal-wrapper .date-num{line-height: 35px;}
  .__vev_calendar-wrapper .cal-wrapper .cal-body .dates .item .is-event{border: 0;background: #008DD3!important;}
  .__vev_calendar-wrapper .cal-wrapper .cal-body .dates{overflow: inherit;}
  .mt40{margin-top: 0.4rem;}
  .footerq-t{width: 6rem;margin: 0 auto;font-size: 0.22rem;color: #242424;line-height: 0.78rem;border-bottom: 0.01rem solid #ebebeb;}
  .footerq-b{margin-top: 0.09rem;width: 6rem;margin: 0 auto;}
  .footerq-b ul{float: left;}
  .footerq-b .fli1{width: 0.7rem;height: 0.93rem;line-height: 0.93rem;text-align: center;color: #1a1a1a;font-size: 0.21rem;}
  .footerq-b .fli2{width: 0.14rem;}
  .footerq-b .fli2 .fsp1{width: 0.14rem;height: 0.14rem;background: #54c2f0;border-radius: 50%;display: block;}
  .footerq-b .fli2 .fsp2{width: 0.01rem;height: 0.79rem;background: #ebebeb;display: block;margin: 0 auto;}
  .footerq-b .fli3{padding: 0.15rem 0;margin-left: 0.3rem;}
  .footerq-b .fli3 .fp1{font-size: 0.22rem;color: #242424;line-height: 0.32rem;}
  .footerq-b .fli3 .fp2{font-size: 0.2rem;color: #54c2f0;line-height: 0.31rem;}
</style>






















