<template>
  <div class="tjshdz">

      <!--<my-header title="勿扰模式"></my-header>-->
    <div class="header">
      <div class="headerall">
        <a href="javascript:history.back(-1);" class="a1"></a>
        <span class="forget">勿扰模式</span>
      </div>
    </div>

    <div class="body">
      <div class="list">
        <span class="sp1">勿扰模式</span>
        <div class="checkbox">
          <input id="example" v-model="isStart" @change="push(isStart)" type="checkbox">
          <label for="example">Check</label>
        </div>
      </div>
      <div class="list">
        <span class="sp2">自定义勿扰模式时间：</span>
        <span class="sp3">当前勿扰模式0:00 ~ 23:59</span>
        <!--<el-time-select style="    width: 2.2rem;-->
    <!--position: absolute;-->
    <!--right: 1.5rem;-->
    <!--bottom: 0.4rem;"-->
                        <!--v-model="value1"-->
                        <!--:picker-options="{-->
            <!--start: '00:00',-->
            <!--step: '00:10',-->
            <!--end: '23:59'-->
          <!--}"-->
                        <!--:editable="false"-->
                        <!--placeholder="选择时间" @change="selectTime(value1)">-->
        <!--</el-time-select>-->

        <el-time-select
          style="width:1.8rem;position: absolute;right:2rem;bottom: 0.4rem;"
          placeholder="起始时间"
          :editable="false"
          v-model="startTime"
          @change="selectStartTime(startTime)"
          :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }">
        </el-time-select>
        <el-time-select
          style="width:1.8rem;position: absolute;right:0.1rem;bottom: 0.4rem;"
          placeholder="结束时间"
          :editable="false"
          v-model="endTime"
          @change="selectEndTime(endTime)"
          :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime: startTime
    }">
        </el-time-select>
      </div>
      <!--<div class='list'>-->
      <!--<button @click="getPosition">获取城市信息</button>-->
      <!--</div>-->
      <div class="line"></div>
    </div>
  </div>
</template>
<script>
  import {setCookie,getCookie} from '../../../assets/js/cookie.js'
  import qs from 'qs'
  export default {
    data () {
      return{
        value1: '',
        //isTimeOut:true,
        isStart:false,
        startTime:getCookie('wrStartTime'),
        endTime:getCookie('wrEndTime')
      }
    },
    mounted(){
      this.morenPush();
    },
    methods:{
      selectStartTime(val){
        let expireDays = 1000 * 60 * 60;
        setCookie("wrStartTime",val,expireDays);
      },
      selectEndTime(val){
        let expireDays = 1000 * 60 * 60;
        setCookie("wrEndTime",val,expireDays);
      },
      timeRange(beginTime, endTime, nowTime) {
        var strb = beginTime.split (":");
        if (strb.length != 2) {
          return false;
        }

        var stre = endTime.split (":");
        if (stre.length != 2) {
          return false;
        }

        var strn = nowTime.split (":");
        if (stre.length != 2) {
          return false;
        }
        var b = new Date ();
        var e = new Date ();
        var n = new Date ();

        b.setHours (strb[0]);
        b.setMinutes (strb[1]);
        e.setHours (stre[0]);
        e.setMinutes (stre[1]);
        n.setHours (strn[0]);
        n.setMinutes (strn[1]);

        if (n.getTime () - b.getTime () > 0 && n.getTime () - e.getTime () < 0) {
          this.isStart = true;
          window['plugins'].jPushPlugin.stopPush();
          return true;
        } else {
          //alert ("当前时间是：" + n.getHours () + ":" + n.getMinutes () + "，不在该时间范围内！");
          this.isStart = false;
          window['plugins'].jPushPlugin.resumePush();
          return false;
        }
      },
      morenPush(){
        let date = new Date();
        let seperator = ":";

        let currentdate = date.getHours() + seperator + date.getMinutes()
          + seperator + date.getSeconds();
//        if(currentdate >= getCookie('wrTime')){
//          this.isStart = true;
//        }
        this.timeRange(getCookie('wrStartTime'), getCookie('wrEndTime'), currentdate);
        window['plugins'].jPushPlugin.init();
      },
      push(start){
        //console.log(window,window['plugins']);
        //alert(window['plugins'].jPushPlugin)
        if(start){
          window['plugins'].jPushPlugin.stopPush();
        }else{
          window['plugins'].jPushPlugin.resumePush();
        }
      },
//    getPosition(){
//      let geolocation = new AMap.Geolocation({
//        enableHighAccuracy: true,//是否使用高精度定位，默认:true
//        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
//        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
//        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
//        showButton: true,        //显示定位按钮，默认：true
//        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
//        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
//        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
//        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
//        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
//        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
//      });
//
//      geolocation.getCityInfo(function(status,result){
//        //if (status == 'complete' && result.info == 'OK') {
//          alert(result.province+'-'+result.city);
//        //}
//      })
//    }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header{height: 0.7rem;box-shadow:0 0 5px #ebebeb;width: 100%;background: #fff;z-index: 11;margin-bottom: 0.05rem; position:fixed;padding-top: 0.3rem;}
  .headerall{padding: 0 0.2rem;}
  .header a{width: 0.18rem;height: 0.7rem;display: block;background: url(../../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}
  .header{height: 0.88rem;position: relative !important;box-shadow:0 0 5px #ebebeb;}
  .header1{width:5.92rem;margin:0 auto;overflow:hidden;}
  .header .a1{width: 0.18rem;height: 0.34rem;background: url(../../../images/back.png) no-repeat;background-size: cover;float:left;display: block;margin-top:0.27rem;}
  .header .a2{width: 0.73rem;height: 0.42rem;float:right;display: block;color:#008dd3;line-height:0.42rem;text-align:center;font-size:0.24rem;margin-top:0.25rem;}

  /*.body{padding-top: 0.7rem;}*/
  .list{position: relative;height:0.97rem;font-size: 0.22rem;border-bottom: 0.01rem solid #ebebeb;padding-left: 0.23rem;}
  .sp1{color: #242424;line-height: 0.97rem;}
  .sp2{color: #242424;line-height: 0.43rem;margin-top: 0.22rem;display: block;}
  .sp3{font-size: 0.2rem;color: #b3b3b3;line-height: 0.35rem;float: left;display: block;width: 100%;}
  .checkbox{float: right;}
  input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance:none;

  }
  input[type="checkbox"]:checked + label,
  input[type="checkbox"]:not(:checked) + label {
    background-color: #e0e0e0;
    border-radius: 0.2rem;
    cursor: pointer;
    display: inline-block;
    height: 0.4rem;
    position: relative;
    text-indent: -9999px;
    width: 0.84rem;
    float: right;
    margin-top: 0.3rem;
    margin-right: 0.2rem;
  }

  input[type="checkbox"]:checked + label:after,
  input[type="checkbox"]:not(:checked) + label:after {
    background-color: #fff;
    border-radius: 0.19rem;
    content: " ";
    height: 0.38rem;
    left: 0.02rem;
    position: absolute;
    top: 0.005rem;
    width: 0.4rem;
  }
  input[type="checkbox"]:checked + label {
    background-color: #54c2f0;
  }

  input[type="checkbox"]:checked + label:after {
    left: 0.43rem;
  }
  input[type="checkbox"]:checked + label,
  input[type="checkbox"]:not(:checked) + label {
    -webkit-transition: background-color 0.3s;
    transition: background-color 0.3s;
  }

  input[type="checkbox"]:checked + label:after,
  input[type="checkbox"]:not(:checked) + label:after {
    -webkit-transition: left 0.3s;
    transition: left 0.3s;
  }
</style>
