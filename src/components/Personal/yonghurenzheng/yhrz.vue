<template>
  <div class="yhrz">
    <my-header title="用户认证"></my-header>
    <div class="body">
      <div class="body-t">
        <img src="../../../images/other/post.png"/>
      </div>
      <div class="body-c">用户提交认证后,此邮箱会接收到一条信息,您还需要点击激活邮箱,用户认证方可通过。</div>
      <div style="margin: 0 0.4rem;">
        <div class="body-b">
          <input type="text" placeholder="请输入邮箱号" style="width:calc(100% - 2.4rem);" ref="email"/>
          <input @click="postEmail" type="button" value="获取验证码" :class="{dianji:isdianji}" class="btn" id="btnmsg"/>
        </div>
        <div class="body-b" id="b2">
          <input type="text" placeholder="验证码" ref="code"/>
        </div>
      </div>
      <!--<a href="#/yxrz">-->
      <div class="body-f" @click="submit">提交</div>
      <!--</a>-->
    </div>
    <pop style="text-align: center" class="tip" :title="tip"></pop>
    <load v-show="isload"></load>
    <!--<my-footer></my-footer>-->
  </div>
</template>
<script>
  import {setCookie,getCookie} from '../../../assets/js/cookie.js'
  import {getOpenUrl,getToken} from '../../../assets/js/common.js'
  import qs from 'qs'
  export default {
    data () {
      return{
        isload:false,
        tip:'',
        key:'',
        isdianji:false
      }
    },
    mounted(){
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
    methods:{
      time() {
        var wait = 60; //时间
        $("#btnmsg").attr("disabled", true).val("正在获取...");
        var self = this;
        this.timer=setInterval(function() {
          console.log(wait);
          if(wait > 0) {
            wait--;
            $("#btnmsg").attr("disabled", true).val(wait + "秒后重新获取");
          } else {
            clearInterval(self.timer);
            $("#btnmsg").attr("disabled", false).val("重新获取");

          }
        }, 1000);
      },
      postEmail(){
        this.isdianji = true;
        if(this.$refs.email.value == ''){
          this.isdianji = false;
          this.tip = '邮箱不能为空!!';
          $('.tip').show();
          setTimeout(function(){
            $('.tip').hide();
          },1000);

          return;
        }else{
          this.$http.post(getOpenUrl() + "/smsEmail", {
            email:this.$refs.email.value
          },{
            headers:{"Authorization": "Bearer " + getToken()}
          }).then((res)=>{
            if(res.body.status){
              this.isdianji = false;
              this.tip = res.body.data.info;
              $('.tip').show();
              setTimeout(function(){
                $('.tip').hide();
              },1000)
              this.key = res.body.data.key;
              this.time();
            }else{
              this.isdianji = false;
              this.tip = res.body.error_description;
              $('.tip').show();
              setTimeout(function(){
                $('.tip').hide();
              },1000)
            }
          }, function(err) {
            this.tip = '请求超时';
            this.isdianji = false;
            $('.tip').show();
            setTimeout(function(){
              $('.tip').hide();
            },1000)
          });
        }
      },
      submit(){
        if(this.$refs.email.value==''){
          this.tip = '请输入邮箱'
          $('.tip').show();
          setTimeout(function(){
            $('.tip').hide();
          },1000)
        }else if(this.$refs.email.value!=''&&this.$refs.code.value==''){
          this.tip = '请输入验证码'
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
          this.$http.post(getOpenUrl() + "/user/emailAuth", {
            email:this.$refs.email.value,
            emailCode:this.$refs.code.value,
            skey:this.key
          },{
            headers:{"Authorization": "Bearer " + getToken()}
          }).then((res)=>{
            this.isload = false;
            if(res.body.status==3){
              console.log(res.body);
              this.$router.push({path: '/yxrz',
                query:{
                  gid: res.body.data.email,
                  gs: res.body.company
                }
              });
            }else{
              this.tip = res.body.error_description;
              $('.tip').show();
              setTimeout(function(){
                $('.tip').hide();
              },1000)
            }
          });
        }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tip{display: none;}
  .header{position: fixed;top: 0;background: #fff;width: 100%;}
  .body{padding-top: 0.88rem;}
  .body-t{width: 1.57rem;height: 1.3rem;margin: 0 auto;margin-top: 0.52rem;margin-bottom: 0.39rem;}
  .body-t img{width: 1.57rem;height: 1.3rem;display: block;}
  .body-c{width:4.72rem;color: #949494;font-size: 0.2rem;line-height: 0.3rem;text-align: center;margin: 0 auto;}
  .body-b{width:100%;height: 0.62rem;margin: 0 auto;border: 1px solid #a6a6a6;border-radius: 0.31rem;margin-top: 0.61rem;}
  .body-b input{float:left;height: 0.62rem;display: block;font-size: 0.2rem;color: #949494;padding-left: 0.2rem;}
  .body-b .btn{background: #54C2F0;text-align: center;color: #fff;border-radius:  0.62rem;float: right;padding-left: 0;padding: 0 0.2rem;}
  .body-b .btn.dianji{pointer-events: none;background: #949494;}
  .body-b input::placeholder{color: #949494;}
  .body-f{width: 2.38rem;height: 0.62rem;line-height: 0.62rem;color: #fff;background: #54c2f0;font-size: 0.22rem;border-radius: 0.31rem;text-align: center;margin: 0 auto;}
  #b2{margin-top: 0.2rem;margin-bottom: 0.6rem;}
</style>
