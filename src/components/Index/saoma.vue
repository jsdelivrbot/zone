<template>
  <div style="height: 100%;">
    <div class="header">
      <div class="headerall">
        <a href="javascript:history.back(-1);" class="a1"></a>
        <span class="forget">扫描二维码</span>
      </div>
    </div>
    <div class="qsScanbox">
      <div class="imgbox">
        <img src="../../images/other/saoma.gif" alt="">
        <p style="font-size:0.2rem;color:#fff;">将条二维码置于取景框内系统会自动扫描</p>
      </div>
      <div style="position: absolute;
    bottom: 0;width: 100%;
    padding-left: 0.3rem;">
        <img @click="startFlash" style="width:0.8rem;" src="../../images/other/flash.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import {setCookie, getCookie} from '../../assets/js/cookie.js';
  import {getOpenUrl, getToken} from '../../assets/js/common.js'
  export default {
    data() {
      return {
        isFlash:false
      }
    },
    mounted() {
      //let self = this;
      QRScanner.scan(this.displayContents);
      QRScanner.show();
    },
    methods: {
      displayContents(err, text){
        if(err){
          // an error occurred, or the scan was canceled (error code `6`)
        } else {
          //let isLogin = getCookie('islogin');
          // The scan completed, display the contents of the QR code:
          //if(isLogin) {
            this.$http.get(getOpenUrl() + 'user/invite', {
              headers: {'Authorization': 'Bearer ' + getToken()},
              params: {
                invitecode:text
              }
            }).then((res) => {
              if (res.body.code == '0000') {
                this.$root.eventHub.$emit('datiSuccess');
                this.$toast(res.body.data.info,{
                  duration:'1500'
                });
                let expireDays = 1000 * 60 * 60;
                setCookie('qrCode', text, expireDays);
                this.$router.back(-1);
              } else if (res.body.code == '7001') {
                this.$router.push({
                  path: '/login'
                });
                this.$toast(res.body.error_description,{
                  duration:'1500'
                });
              }else{
                //alert(res.body.error_description);
                this.$toast(res.body.error_description,{
                  duration:'1500'
                });
                QRScanner.scan(this.displayContents);
              }
            });
//          }else{
//            this.$toast('请先登录',{
//              duration:'1500'
//            });
//            this.$router.push({
//              path: '/login'
//            });
//          }
        }
      },
      startFlash(){
        this.isFlash = !this.isFlash;
        if(this.isFlash){
          QRScanner.enableLight(function(err, status){
            err && console.error(err);
            console.log(status);
          });
        }else{
          QRScanner.disableLight(function(err, status){
            err && console.error(err);
            console.log(status);
          });
        }
      }
    },
    beforeRouteLeave(to, from, next) {
      QRScanner.destroy(function(status){
        console.log(status);
      });
      next();
    }
  }
</script>

<style scoped>
  .qsScanbox{
    position: relative;
    /*top:1rem;*/
    height:calc(100% - 1rem);
  }
  .qsScanbox .imgbox{
    width: 100%;
    vertical-align: middle;
    text-align: center;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }
  .header{height: 0.7rem;box-shadow:0 0 5px #000;width: 100%;z-index: 11;margin-bottom: 0.05rem;
    position:fixed;padding-top: 0.3rem;background: #000;opacity:.6;
  }
  .headerall{padding: 0 0.2rem;height:100%;}
  .header a{padding:0 0.2rem;height: 0.7rem;display: block;background: url(../../images/other/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
  .forget{line-height:0.7rem;font-size:0.24rem;display:block;float:left;color: #fff;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}
</style>
