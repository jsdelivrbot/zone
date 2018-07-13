<template>
  <div class="tjshdz">
    <!--<my-header title="版本更新"></my-header>-->
    <div class="header">
      <div class="headerall">
        <a href="javascript:history.back(-1);" class="a1"></a>
        <span class="forget">版本更新</span>
      </div>
    </div>
    <div class="body">
    	<dl>
    		<dt><img src="../../../images/other/zone.png"/></dt>
    		<dd>
          <!--<p class="p1" v-for="(data,index) in versionData" :key="index">{{data.title}}</p>-->
          <p class="p1" v-if="versionTit">Zone Service V{{versionTit}}</p>
    			<p class="p2">未来由您定义</p>
    		</dd>
    	</dl>
    </div>
    <div class="line">
    	<ul style="    overflow: hidden;position: relative;">
    		<li class="li1" v-if="show">检查更新</li>
    		<li class="li2" v-if="show">new</li>
        <li class="li1" v-else>已是最新版本</li>
    	</ul>
    </div>
  </div>
</template>
<script>
import {setCookie,getCookie} from '../../../assets/js/cookie.js'
import {getOpenUrl,getToken} from '../../../assets/js/common.js'
import qs from 'qs'
export default {
  data () {
    return{
      show:false,
      versionData:'',
      versionTit:''
    }
  },
  mounted(){
    this.getVersion();

    this.getVersionInfo();
  },
  methods:{
    getVersionInfo(){
      this.versionTit = android.getVersionName();
      console.log(this.versionTit);

      this.$http.get(getOpenUrl() + "ads",{
        headers:{
          'Authorization' : 'Bearer '+getToken()
        },
        params:{
          type:15
        }
      }).then((res)=>{
        console.log(res.body.data[0].app_id,this.versionTit);
        if(res.body.data[0].app_id != this.versionTit) {
          this.show = true;
        }
      });
    },
    getVersion(){
      let self = this;
      this.$http.get(getOpenUrl() + "ads",{
        headers:{
          'Authorization' : 'Bearer '+getToken()
        },
        params:{
          type:15
        }
      }).then((res)=>{
//        let old_version = getCookie('versionCode');
//        this.versionData = res.body.data;
//        if(res.body.data[0].ad_link != old_version) {
//          this.show = true;
//        }
        cordova.getAppVersion.getVersionNumber().then(function (version) {
          //let old_version = parseInt(version.toString().replace(/\./g,''));
          let old_version = version;
          console.log(old_version,res.body.data[0].app_id);
          // 1.获取当前版本号
          // 2.获取服务器端的最新版本的数据源
          // 3.进行版本比较,如果当前的版本号与服务器的版本号不一致时,下载并安装最新的应用程序安装包
          if(res.body.data[0].app_id != old_version) {
            self.versionData = res.body.data;
            self.show = true;
            //self.needUp = true;
          }
        });
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header{padding-top:0.3rem;height: 0.7rem;box-shadow:0 0 5px #ebebeb;width: 100%;background: #fff;z-index: 11;margin-bottom: 0.05rem; position:fixed;}
  .headerall{padding: 0 0.2rem;}
  .body{padding-top: 0.3rem;}
  .header a{width: 0.18rem;height: 0.7rem;display: block;background: url(../../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}
  .body dt{width: 1.29rem;height: 1.29rem;margin: 0 auto;}
  .body dt img{width: 1.29rem;height: 1.29rem;display: block;margin-top: 1.05rem;border-radius: 0.2rem;}
  .body .p1{text-align: center;color: #080808;font-size: 0.22rem;line-height: 0.39rem;margin-top: 0.21rem;}
  .body .p2{text-align: center;color: #272727;font-size: 0.2rem;line-height: 0.36rem;margin-bottom: 1.06rem;}
  .line{height: 0.74rem;}
  .line li{float: left;}
  .line .li1{color: #242424;font-size: 0.22rem;line-height: 0.74rem;padding-left: 0.28rem;}
  .line .li2{width:0.57rem;height:0.25rem;text-align:center;color: #fff;font-size: 0.12rem;line-height: 0.25rem;float: right;background: #ff0000;border-radius: 0.125rem;position: absolute;right:0.28rem;top: 50%;transform: translateY(-50%);}
</style>
