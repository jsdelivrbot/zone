<template>
  <div class="mytz">
    <!--<my-header title="填写员工信息"></my-header>-->
    <div class="header">
      <div class="headerall">
        <a href="javascript:history.back(-1);" class="a1"></a>
        <span class="forget">填写员工信息</span>
      </div>
    </div>
    <div class="body">
      <ul class="body-list">
        <li class="li2">公司：</li>
        <input type="text" name="" id="" value="" :disabled="isGs" ref="company"/>
      </ul>
      <ul class="body-list">
        <li class="li2">姓名：</li>
        <input type="text" name="" id="" value="" ref="name"/>
      </ul>
      <ul class="body-list">
        <li class="li2">工号：</li>
        <input type="text" name="" id="" value="" ref="job_number"/>
      </ul>
      <ul class="body-list">
        <li class="li2">部门：</li>
        <input type="text" name="" id="" value="" ref="department"/>
        <!--<li class="li3"></li>-->
      </ul>
      <div class="line"></div>
    </div>
    <div class="btn" @click="complete">完成</div>
    <pop style="text-align: center" class="tip" :title="tip"></pop>
    <load v-show="isload"></load>
  </div>

</template>
<script>
  import qs from 'qs'
  import { setCookie, getCookie } from '../../../assets/js/cookie.js'
  import {getOpenUrl,getToken} from '../../../assets/js/common.js'
  export default {
    data () {
      return {
        isload:false,
        isGs:false,
        show:false,
        tip:''
      };
    },
    mounted(){
      if(this.$route.query.gs){
        this.isGs = true;
        this.$refs.company.value = this.$route.query.gs;
      }else{
        this.isGs = false;
        this.$refs.company.value = '';
      }
      //是否存在input焦点事件或图层打开事件
      $('input').focus(function(){
        //获取焦点
        let expireDays = 1000 * 60 * 60 ;
        setCookie("inputkey", 1, expireDays);
      });
      let self = this;
      $(document).bind('click', function(e){
        var target = $(e.target);
        if(target.closest("input").length == 0 && target.closest('.a1').length == 0){
          setCookie("inputkey", '', -1);
        }
      });
    },
    methods: {
      toggle(){
        this.show=!this.show
      },
      complete(){
        this.isload = true;
        this.$http.post(getOpenUrl() + "/user/emailAuthMessage", {
          email:this.$route.query.gid,
          name:this.$refs.name.value,
          job_number:this.$refs.job_number.value,
          department:this.$refs.department.value
        },{
          headers:{"Authorization": "Bearer " + getToken()}
        }).then((res)=>{
          this.isload = false;
          if(res.body.status){
            $('.tip').show();
            this.tip = res.body.data;
            setTimeout(()=>{
              $('.tip').hide();
              this.$router.push({path: '/personal',
                //query:{gid: res.body.data.email}
              });
            },1000)
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
    beforeRouteLeave (to, from, next) {
      //路由离开时
      var isInputKey = parseInt(getCookie('inputkey'));
      if (isInputKey == 1){
        setCookie("inputkey", '', -1);
        next(false)
      }else{
        next()
      }
    }
  }
</script>
<style scoped>
  .tip{display: none;}
  .header{padding-top:0.3rem;height: 0.7rem;box-shadow:0 0 5px #ebebeb;width: 100%;background: #fff;z-index: 11;margin-bottom: 0.05rem; position:fixed;}
  .headerall{padding: 0 0.2rem;}
  .header a{width: 0.18rem;height: 0.7rem;display: block;background: url(../../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}
  .header{position: fixed;top: 0;}
  .body{padding-top: 1rem;}
  .body-list{border-bottom: 1px solid #ebebeb;overflow: hidden;padding-left: 0.2rem;}
  .body-list li{float: left;height: 0.87rem;line-height: 0.87rem;font-size: 0.24rem;color: #242424;}
  .body-list .li1{width:0.28rem;background: url(../../../images/wurao.png)no-repeat 0 50%;background-size: 0.28rem 0.26rem;margin-left: 0.2rem;margin-right: 0.12rem;}
  .body-list .li3{width:0.12rem;background: url(../../../images/backright.png)no-repeat 0 50%;background-size: 0.12rem 0.24rem;margin-right: 0.26rem;float: right;}
  input{display: block;height: 0.87rem;line-height: 0.87rem;float: left;font-size: 0.22rem;}
  .btn{width: 2.38rem;height: 0.62rem;border-radius: 0.31rem;background: #54C2F0;color: #fff;text-align: center;line-height: 0.62rem;font-size: 0.24rem;position:absolute;left: 50%;transform: translateX(-50%);margin-top: 0.7rem;}
</style>
