<template>
  <div class="tjshdz">
    <div class="header">
        <div class="header1">
            <a href="javascript:history.back(-1);" class="a1"></a>
          <!--<a @click="back" class="a1"></a>-->
            <span class="forget">账户安全</span>
            <a class="a2" @click="wancheng">完成</a>
        </div>
    </div>
    <div class="body">
    	<div class="list">
    		<span class="sp1">请输入旧密码：</span>
    		<input type="text" ref="oldpassword"/>
    	</div>
      <div class="list">
        <span class="sp1">请输入验证码：</span>
        <input type="text"  class="write" v-model="yzm"  ref="yzm">
        <img :src="yzmData" class="yzm" @click="captcha()">
      </div>
    	<div class="list">
    		<span class="sp1">手机号码：</span>

    		<input type="text" ref="mobile"/>
    		<input id="btn" style="color:#fff;" type="button" class="sp2" @click="getKey" value="获取验证码">
    	</div>
    	<div class="list">
    		<span class="sp1">手机验证码：</span>
    		<input type="text" ref="vericode"/>
    	</div>
    	<div class="list">
    		<span class="sp1">请输入新密码：</span>
    		<input type="text" ref="newpassword"/>
    	</div>
    	<div class="list">
    		<span class="sp1">请确认新密码：</span>
    		<input type="text" ref="renewpassword"/>
    	</div>
    	<div class="line"></div>

    </div>
    <pop style="text-align: center" class="tip" :title="tip"></pop>
    <load v-show="isload"></load>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {setCookie,getCookie} from '../../../assets/js/cookie.js'
  import {getOpenUrl,getToken} from '../../../assets/js/common.js'
  import qs from 'qs'
export default {
  data () {
    return{
      isload:false,
      tip:'',
      key:'',
      yzmData:{},
      yzm:''
    }
  },
  mounted(){
//    this.$http.post(getOpenUrl() + "captcha",'', {
//      headers:{"Authorization": "Bearer " + getToken()}
//    })
//      .then((res)=>{
//        this.yzmData=res.body.data.captcha;
//        this.skey = res.body.data.captcha_key;
//      })

    //获取验证码
    this.$http.post(getOpenUrl() + "captcha", '', {
      headers:{"Authorization": "Bearer " + getToken()}
    }).then((res)=>{
      this.yzmData = res.body.data.captcha;
      this.skey    = res.body.data.captcha_key;
    })

  },
  methods:{
    back(){
      android.back1();
    },
    time() {
      var wait = 60; //时间
      $("#btn").attr("disabled", true).val("正在获取...");
      var self = this;
      this.timer=setInterval(function() {
        console.log(wait)
        if(wait > 0) {
          wait--;
          $("#btn").attr("disabled", true).val(wait + "秒后重新获取");
        } else {
          clearInterval(self.timer);
          $("#btn").attr("disabled", false).val("重新获取");
        }
      }, 1000);
    },
    captcha(){
      /*接口请求*/
      var data = qs.stringify({
        'skey': this.skey
      });
      this.$http.post(getOpenUrl() + 'captcha', data, {
        headers:{"Authorization": "Bearer " + getToken()}
      }).then((res)=>{
        console.log(res);
        this.yzmData=res.body.data.captcha;
        console.log(this.yzmData);
        Vue.set(this.yzmData,this.yzmData);
        let expireDays = 1000 * 60 * 60;
        this.setCookie("token",res.body.data.captcha_key,expireDays);
      })
    },
    getKey(){
      this.$http.post(getOpenUrl() + "sms", {
        mobile:this.$refs.mobile.value,
        captcha:this.yzm,
        skey:this.skey,
        //type:'findpwd',
        is_time:60
      },{
        headers:{"Authorization": "Bearer " + getToken()}
      }).then((res)=>{
        if(res.body.code=='0000'){
          this.tip = '发送成功';
          $('.tip').show();
          setTimeout(function(){
            $('.tip').hide();
          },1000)
          this.key = res.body.data.key;
        }else{
          this.tip = res.body.error_description;
          $('.tip').show();
          this.captcha();
          setTimeout(function(){
            $('.tip').hide();
          },1000)
        }
      });
    },
//    captcha(){
//      var data = qs.stringify({
//        'skey': this.skey
//      });
//      this.$http.post(getOpenUrl() + 'captcha' ,data, {
//        headers:{"Authorization": "Bearer " + getToken()}
//      })
//        .then((res)=>{
//          console.log(res);
//          this.yzmData=res.body.data.captcha;
//          console.log(this.yzmData);
//          Vue.set(this.yzmData,this.yzmData);
//        })
//    },
//    getKey(){
//      this.$http.post(getOpenUrl() + "/sms", {
//        mobile:this.$refs.mobile.value,
//        captcha:this.yzm,
//        skey:this.skey,
//        //type:'findpwd',
//        is_time:60
//      },{
//        headers:{"Authorization": "Bearer " + getToken()}
//      }).then((res)=>{
//        if(res.body.code=='0000'){
//          this.tip = '发送成功';
//          this.time();
//          $('.tip').show();
//          setTimeout(function(){
//            $('.tip').hide();
//          },1000)
//          this.key = res.body.data.key;
//        }else{
//          this.tip = res.body.error_description;
//          $('.tip').show();
//          //this.captcha();
//          setTimeout(function(){
//            $('.tip').hide();
//          },1000)
//        }
//      });
//    },
    wancheng(){
      if(this.$refs.oldpassword.value==''){
        this.tip = '请输入旧密码'
        $('.tip').show();
        setTimeout(function(){
          $('.tip').hide();
        },1000)
      }else if(this.$refs.oldpassword.value!=''&&this.$refs.yzm.value==''){
        this.tip = '请输入图文验证码'
        $('.tip').show();
        setTimeout(function(){
          $('.tip').hide();
        },1000)
      }else if(this.$refs.oldpassword.value!=''&&this.$refs.yzm.value!=''&&this.$refs.mobile.value==''){
        this.tip = '请输入手机号'
        $('.tip').show();
        setTimeout(function(){
          $('.tip').hide();
        },1000)
      }else if (this.$refs.oldpassword.value!=''&&this.$refs.yzm.value!=''&&this.$refs.mobile.value!=''&&this.$refs.vericode.value == ''){
        this.tip = '请输入验证码'
        $('.tip').show();
        setTimeout(function(){
          $('.tip').hide();
        },1000)
      }else if (this.$refs.oldpassword.value!=''&&this.$refs.yzm.value!=''&&this.$refs.mobile.value!=''&&this.$refs.vericode.value != ''&&this.$refs.newpassword.value==''){
        this.tip = '请输入新密码'
        $('.tip').show();
        setTimeout(function(){
          $('.tip').hide();
        },1000)
      }else if (this.$refs.oldpassword.value!=''&&this.$refs.yzm.value!=''&&this.$refs.mobile.value!=''&&this.$refs.vericode.value != ''&&this.$refs.newpassword.value!=''&&this.$refs.renewpassword.value==''){
        this.tip = '请再输入一次新密码'
        $('.tip').show();
        setTimeout(function(){
          $('.tip').hide();
        },1000)
      }else if (this.key == ''){
        this.tip = '验证码错误'
        $('.tip').show();
        setTimeout(function(){
          $('.tip').hide();
        },1000)
      }else{
        this.isload = true;
        this.$http.post(getOpenUrl() + "/user/accountSecurity", {
          oldpassword:this.$refs.oldpassword.value,
          mobile:this.$refs.mobile.value,
          vericode:this.$refs.vericode.value,
          newpassword:this.$refs.newpassword.value,
          renewpassword:this.$refs.renewpassword.value,
          skey:this.key
        },{
          headers:{"Authorization": "Bearer " + getToken()}
        }).then((res)=>{
          this.isload = false;
          if(res.body.status){
            console.log(res.body);
            this.$router.push({path: '/login',

            });
          }
          else{
            this.tip = res.body.error_description;
            $('.tip').show();
            setTimeout(function(){
              $('.tip').hide();
            },1000)
          }
        });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .write{line-height: 0.8rem;float: left;font-size: 0.21rem;}
  .yzm{width:auto;height: 100%;background: url(../../../images/yzm 7.png) no-repeat;background-size: cover;float: right;font-size: 0.2rem;color: #fff;line-height: 0.88rem;text-align: center;}
  .tip{display: none;}
  .header{height: 0.7rem;position: relative;box-shadow:0 0 5px #ebebeb;padding-top: 0.3rem;}
  .header1{padding: 0 0.2rem;overflow:hidden;}
  .header .a1{width: 0.18rem;height: 0.7rem;background: url(../../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;display: block;}
  .header .a2{width: 0.73rem;height: 0.7rem;float:right;display: block;color:#008dd3;line-height:0.7rem;text-align:center;font-size:0.24rem;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}

  .list{height:0.97rem;line-height:0.97rem;font-size: 0.22rem;border-bottom: 1px solid #ebebeb;padding-left: 0.23rem;display: flex;}
  .sp1{min-width:1.7rem;display:block;color: #242424;}
  .spa{flex: 1;color: #9f9f9f;}
  .list input{color: #9f9f9f;width: 100%;}
  .sp2{border-radius:0;float: right;width:auto !important;padding:0 0.35rem;height: 0.97rem;display: block;background: #54C2F0;color: #fff;
    /*margin-top: 0.17rem;margin-right:0.2rem;border-radius: 0.25rem;*/
    line-height: 0.97rem;font-size: 0.22rem;}



</style>
