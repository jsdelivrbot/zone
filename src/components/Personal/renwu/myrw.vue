<template>
    <div id="headed" style="overflow: auto;">
      <div class="page-loadmore backtop" style="font-size:0.2rem;">
        <mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">
    	<div class="hw">
    		<div class="header">
	        	<div class="headerall">
					<a href="javascript:history.back(-1);" @click="back" class="a1"></a>
              <!--<a @click="back" class="a1"></a>-->
					<span class="forget">任务大厅</span>
					<a class="a2" @click="toggle()"></a>
				</div>
		    </div>
		    <div class="h-body">
	        	<ul>
	        		<li class="li1">积分：<span>{{data.score}}</span></li>
	        		<a href="#/shopping"><li class="li2">兑换礼品</li></a>
	        	</ul>
		    </div>
		    <div class="h-bottom">
		    	<ul>
		    		<li class="li1" @click="everyDayQianDao">签到</li>
            <li class="li2" v-if="qd.lxqd_day">连续<span>{{qd.lxqd_day}}</span>天</li>
            <li class="li2" v-else>暂无签到</li>
		    	</ul>
		    </div>
    	</div>
        <div class="content" v-if="highTasksData.length>0">
        	<ul class="ul1" style="width: 5.8rem;margin: 0 auto;float: inherit;">
        		<li class="contentl"></li>
        		<li class="contentc">高级任务</li>
        		<li class="contentr"></li>
        	</ul>
        	<div class="cont-b" v-for="(high,index) in highTasksData" :key="index">
        		<ul class="ul2">
	        		<li class="li2"><span class="sp2">{{high.name}}</span></li>
	        		<li v-if="high.prize" class="li3">奖励{{high.prize}}：<span>{{high.bonus}}</span></li>
              <li v-if="!high.prize" class="li3">无奖励</li>
	        	</ul>
              <router-link :to="{path:'/dati',query:{taskuid:high.taskuid,taskid:high.taskid}}" v-if="high.csc<100">
                <p class="li4">做任务</p>
              </router-link>
              <!--<router-link :to="{path:'/fatie',query:{taskuid:high.taskuid,taskid:high.taskid}}" v-if="high.csc==100">-->
                <p v-if="high.csc==100" class="li4" @click="lqPrice(high.taskuid,high.taskid)">领取奖励</p>
              <!--</router-link>-->
              <p class="li4 f18" v-if="high.csc>100">审核中</p>
        	</div>

        </div>
        <div class="line"></div>
        <div class="content" v-if="dayTasksData.length>0">
        	<ul class="ul1" style="width: 5.8rem;margin: 0 auto;float: inherit;">
        		<li class="contentl"></li>
        		<li class="contentc">日常任务</li>
        		<li class="contentr"></li>
        	</ul>
          <div class="cont-b" v-for="(day,index) in dayTasksData" :key="index">
            <ul class="ul2">
              <li class="li2"><span class="sp2">{{day.name}}</span></li>
              <li v-if="day.prize" class="li3">奖励{{day.prize}}：<span>{{day.bonus}}</span></li>
              <li v-if="!day.prize" class="li3">无奖励</li>
            </ul>
            <!--<router-link :to="{path:'/dati',query:{taskuid:day.taskuid,taskid:day.taskid}}" v-if="day.csc==100">-->
              <p v-if="day.csc==100" class="li4" @click="lqPrice(day.taskuid,day.taskid)">领取奖励</p>
            <!--</router-link>-->
            <p class="li4 f18" v-if="day.csc<100" @click="lqPrice(day.taskuid,day.taskid)">领取奖励</p>
          </div>
        </div>
        </mt-loadmore>
      </div>
        <!--<my-footer></my-footer>-->
        <!--<div class="mark" v-show="show"></div>-->
      <mt-popup v-model="show" position="bottom" class="up">
        <!--<div class="up" v-show="show">-->
      		<div class="up-b">
      			<div class="up1">
      				<a @click="goJiLu"><div class="up-r">我的任务</div></a>
      				<div class="up-l" @click="toggle()">取消</div>
      			</div>
      		</div>
      	<!--</div>-->
      </mt-popup>
        <div class="load" style="display:none;">
          <div class="load-container load4"><div class="loader"> <i></i></div></div>
        </div>
      <load v-show="isload"></load>
        <pop style="text-align: center" class="tip" :title="tip"></pop>
    </div>
</template>

<script>
  import qs from 'qs';
  import {setCookie,getCookie} from '../../../assets/js/cookie.js';
  import {getOpenUrl,getToken} from '../../../assets/js/common.js'
    export default{
        data () {
             return {
               isload:false,
                tip:'',
                data:'',
                qd:'',
                highTasksData:'',
                dayTasksData:'',
                show:false,
                isshow:false,
               allLoaded: false,
               scrollMode:"auto",
               topStatus: '',
             };
         },
         mounted(){
           this.isload = true;
           //$('.load').show();
           this.getJiFen();
           this.qiandao();
           this.getHighTasks();
           this.getDayTasks();

           this.$root.eventHub.$on('datiSuccess',()=>{
             this.getJiFen();
             this.qiandao();
             this.getHighTasks();
             this.getDayTasks();
           })

           let self = this;
           $(document).bind('click', function(e){
             var target = $(e.target);
             if(target.closest("input").length == 0 && target.closest('.a1').length == 0 && self.iskey){
               setCookie("inputkey", '', -1);
             }
           });
         },
         methods: {
           loadTop() { // 刷新数据的操作
             setTimeout(()=> {
               this.getJiFen();
               this.qiandao();
               this.getHighTasks();
               this.getDayTasks();
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
               setCookie("inputkey", '', -1);
               this.$router.goBack();
               //android.back1();
             },
             goJiLu(){
               setCookie("inputkey", '', -1);
               this.$router.push("/jilu");
             },
             toggle(){
               let expireDays = 1000 * 60 * 60;
               if(!this.show){
                 this.isKey = true;
                 setCookie("inputkey", 1, expireDays);
               }else{
                 this.isKey = false;
                 setCookie("inputkey", '', -1);
               }
             	 this.show=!this.show
             },
             toggle1(){
             	this.isshow=!this.isshow
             },
           everyDayQianDao(){
               this.isload = true;
             let self = this;
             this.$http.post(getOpenUrl() + 'sign', {

             }, {
               headers:{
                 'Authorization' : 'Bearer '+getToken()
               }
             }).then((res)=>{
               this.isload = false;
               if (res.body.code == '0000'){
                 this.tip = "签到成功。"+res.body.data;
                 this.$root.eventHub.$emit('jfSuccess');
                 this.$root.eventHub.$emit('datiSuccess');
                 this.$root.eventHub.$emit('refreshed');
                 $('.tip').show();
                 setTimeout(function(){
                   $('.tip').hide();
                   self.$router.push("/qiandao")
                 },1000)
               }else{
                 //alert(res.body.error_description);
                 this.tip = res.body.error_description;
                 $('.tip').show();
                 setTimeout(function(){
                   $('.tip').hide();
                   self.$router.push("/qiandao")
                 },1000)
               }
             });
           },
           getJiFen(){
             this.$http.get(getOpenUrl() + "/user/scoreExp", {
               headers: {
                 "Authorization": "Bearer " + getToken()
               },
              params:{
                type:'score'
              },
             }).then((res)=>{
               this.isload = false;
               if(res.body.status){
                 console.log(res.body);
                 this.data = res.body.data;
               }
               $('.load').hide();
             },function(err) {
               this.$router.push({
                 path: '/login',
                 //query:{gid: res.body.data.gid}
               });
               console.log('请求失败', err);

             });
           },
           qiandao(){
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
                 console.log(res.body);
                 this.qd = res.body.data;
               }
               $('.load').hide();
             },function(err) {
               this.$router.push({
                 path: '/login',
                 //query:{gid: res.body.data.gid}
               });
               console.log('请求失败', err);

             });
           },
           getHighTasks(){
             this.$http.get(getOpenUrl() + "/Task/advancedTasks", {
               headers: {
                 "Authorization": "Bearer " + getToken()
               },
             }).then((res)=>{
               this.isload = false;
               if(res.body.status){
                 console.log(res.body);
                 this.highTasksData = res.body.data;
               }
               $('.load').hide();
             },function(err) {
               this.$router.push({
                 path: '/login',
                 //query:{gid: res.body.data.gid}
               });
               console.log('请求失败', err);

             });
           },
           getDayTasks(){
             this.$http.get(getOpenUrl() + "/Task/everydayTasks", {
               headers: {
                 "Authorization": "Bearer " + getToken()
               },
             }).then((res)=>{
               this.isload = false;
               if(res.body.status){
                 console.log(res.body);
                 this.dayTasksData = res.body.data;
               }
               $('.load').hide();
             },function(err) {
               this.$router.push({
                 path: '/login',
                 //query:{gid: res.body.data.gid}
               });
               console.log('请求失败', err);

             });
           },
           lqPrice(tuid,tid){
             this.isload = true;
             this.$http.get(getOpenUrl() + "/Task/prize", {
               headers: {
                 "Authorization": "Bearer " + getToken()
               },
               params:{
                 taskuid:tuid,
                 taskid:tid
               },
             }).then((res)=>{
               this.isload = false;
               if(res.body.status){
                 this.$root.eventHub.$emit('jfSuccess');
                 this.$root.eventHub.$emit('datiSuccess');
                 this.$root.eventHub.$emit('refreshed');
                 this.tip = res.body.data.info;
                 $('.tip').show();
                 this.getHighTasks();
                 this.getDayTasks();
                 setTimeout(function(){
                   $('.tip').hide();
                 },1000)
               }
             });
           }
         },
        beforeRouteLeave (to, from, next) {
          //路由离开时
          if(this.show){
            this.toggle();
          }
          var isInputKey = parseInt(getCookie('inputkey'));
          if (isInputKey == 1){
            setCookie("inputkey", '', -1);
            next(false)
          }else{
            next()
          }
        },
      activated(){
        //路由缓存 前进后退
        $('.load').hide();
      }
    }
</script>

<style scoped="scoped">
  .tip{display: none;}
  .hw{width: 100%;height: 3.96rem;background: url(../../../images/rwbk.png)no-repeat;background-size: cover;}
  .header{height: 0.7rem;padding-top: 0.3rem;}
  .headerall{padding-left: 0.2rem;}
  .header .a1{width: 0.18rem;height: 0.7rem;display: block;background: url(../../../images/backw.png) no-repeat 0 50%;float:left;position: fixed;}
  .header .a2{position:fixed;right:0.3rem;width:0.3rem;height: 0.7rem;display: block;background: url(../../../images/dianw.png) no-repeat 0 50%;background-size: 0.3rem 0.06rem;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #fff;position: fixed;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}

  .h-body{padding: 0 0.2rem;}
  .h-body ul li{color: #fff;font-size:0.22rem;}
  .h-body .li1{float: left;}
  .h-body .li2{width:1.18rem;height:0.42rem;border: 1px solid #fff;line-height:0.42rem;text-align:center;float: right;border-radius: 0.05rem;}

  .h-bottom{width:1.41rem;height:1.41rem;color: #fff;margin: 0 auto;background: url(../../../images/circle.png)no-repeat;background-size: cover;text-align: center;margin-top: 0.59rem;}
  .h-bottom .li1{font-size: 0.28rem;line-height: 0.42rem;padding-top: 0.32rem;}
  .h-bottom .li2{font-size: 0.18rem;line-height: 0.33rem;}

  .content{padding: 0 0.2rem;overflow: hidden;}
  .content ul{float: left;}
  .content li{float: left;}
  .contentl{width:2.18rem;height: 0.02rem;background: #dbdbdb;margin-top: 0.42rem;}
  .contentc{height:0.86rem;line-height: 0.86rem;color: #292929;font-size:0.24rem;text-align: center;padding: 0 0.22rem;}
  .contentr{width:2.18rem;height: 0.02rem;background: #dbdbdb;margin-top: 0.42rem;float: right;}

  .cont-b{margin-top: 0.13rem;float: left;width:100%;padding-bottom: 0.16rem;border-bottom: 0.01rem solid #ebebeb;}
  .content .ul2{width: 4.2rem;padding-left: 0.23rem;}
  .content .ul2 .li2{width:100%;font-size:0.22rem;color: #242424;line-height: 0.36rem;margin-top: 0.13rem;}
  .content .ul2 .li3{font-size: 0.2rem;color: #ffa200;line-height: 0.35rem;}
  .content .li4{width:1.18rem;height:0.42rem;font-size: 0.18rem;color: #0490d6;border: 1px solid #ced8dd;border-radius: 0.05rem;text-align: center;line-height: 0.42rem;float: right;margin-top: 0.2rem;}
  .content .li4.f18{background: #bdbdbd;
    color:#fff;  }

  .mark{width:100%;height:100%;position:fixed;bottom:0;left:0;background:rgba(36,153,200,0.3);display:block;z-index:5;}

  .up,.up-b{overflow: hidden;}
  .up1{width: 5.8rem;margin: 0 auto;position:absolute;top: 50%;left:50%;transform: translate(-50%,-50%);}
  .up{width: 100%;height: 1.65rem;border-top: 0.01rem solid #ebebeb;background: #fff;position: fixed;bottom: 0;z-index:16;}
  .up-l{float: right;width: 2.78rem;height: 0.8rem;font-size: 0.27rem;border: 1px solid #39b6f4;border-radius: 0.4rem;color: #39b6f4;text-align: center;line-height: 0.8rem;}
  .up-r{float: left;width:2.8rem;height:0.82rem;font-size: 0.27rem;background:#39b6f4;border-radius: 0.4rem;color: #fff;text-align: center;line-height: 0.82rem;}

</style>
