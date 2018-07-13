<template>
  <div class="index">
    <!--<my-header title="任务详情"></my-header>-->
    <div class="header">
      <div class="headerall">
        <a href="javascript:history.back(-1);" class="a1"></a>
        <span class="forget">任务详情</span>
      </div>
    </div>
    <div class="cen" style="padding-top: 1rem;
    height: calc(100% - 1rem);
    overflow-y: auto;
    position: relative;
    bottom: 0;
    top:0;">
    	<div class="cenall">
    		<div class="cenallt">
	    		<p class="cent">{{data.name}}</p>

		    	<ul class="cenb">
            <li>完成时间：{{data.updatetime}}</li>
	    			<!--<li>已有<span>1000</span>人完成了此任务</li>-->
	    			<!--<li class="li2">作者：<span>渣渣</span></li>-->
	    		</ul>
    		</div>

    		<div class="cenallb" v-for="(data,index) in data.wenti" :key="index">
    			<div class="cenallb-t">{{data.name}}</div>
    			<div class="cenallb-b">
    				{{data.description}}
    			</div>
    			    <div class="nav-r" v-if="data.fieldtype=='radio'">
	                <li class="li4" v-for="(rData,index) in data.setting.optinos" :key="index">
	                    <label>
	                        <input type="checkbox" disabled="disabled">
                          <b v-if="data.success==''" v-bind:class="{'isDui':rData.is_daan==1}"></b>
                          <b v-else v-bind:class="{'isDui':(rData.is_success==1&&rData.is_daan==0)||(rData.is_success==1&&rData.is_daan==1),'isCuo':rData.is_success==0&&rData.is_daan==1}"></b>
	                    </label>
	                    <span>{{rData[0]}}</span>
	                </li>
	            </div>
              <div class="nav-r" v-if="data.fieldtype=='checkbox'">
                <li class="li4" v-for="(data,index) in data.setting.optinos" :key="index">
                  <label>
                    <input type="checkbox" disabled="disabled">
                    <b v-bind:class="{'isDui':(data.is_success==1&&data.is_daan==0)||(data.is_success==1&&data.is_daan==1),'isCuo':data.is_success==0&&data.is_daan==1}"></b>
                  </label>
                  <span>{{data[0]}}</span>
                </li>
              </div>
              <div class="nav-r-text" v-if="data.fieldtype=='textarea'">
                <textarea readonly="readonly" style="color:#636363;">{{data.answer}}</textarea>
              </div>
              <div class="nav-r-text" v-if="data.fieldtype=='text'">
                <textarea readonly="readonly" style="color:#636363;">{{data.answer}}</textarea>
              </div>
	            <div class="cenallf" v-if="data.status==2">
                <ul>
                  <li>错误,正确答案是:{{data.success_desc}}</li>
                </ul>
	    		    </div>
    		</div>

    	</div>
    </div>
    <div class="load" style="display:none;">
      <div class="load-container load4"><div class="loader"> <i></i></div></div>
    </div>
    <load v-show="isload"></load>
  </div>
</template>
<script>
  import { setCookie, getCookie } from '../../../assets/js/cookie.js'
  import {getOpenUrl,getToken} from '../../../assets/js/common.js'
  import qs from 'qs'
export default {
  data () {
    return{
      isload:false,
      data:''
    }
  },
  mounted(){
    //$('.load').show();
    this.isload = true;
    this.getData();
  },
  methods:{
    getData(){
      this.$http.get(getOpenUrl() + "/Task/completedTaskDetail", {
        headers: {
          "Authorization": "Bearer " + getToken()
        },
        params:{
          taskuid :this.$route.query.taskuid
        },
      }).then((res)=>{
        this.isload = false;
        if(res.body.status){
          this.data = res.body.data;
//          if(this.data.is_next==false){
//            this.$router.push({path: '/myrw',
//
//            });
//          }
        }
        $('.load').hide();
      });
    },
  },
  activated(){
    //路由缓存 前进后退
    $('.load').hide();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header{height: 0.7rem;box-shadow:0 0 5px #ebebeb;width: 100%;background: #fff;z-index: 11;margin-bottom: 0.05rem; position:fixed;padding-top: 0.3rem;}
  .headerall{padding: 0 0.2rem;}
  .header a{width: 0.18rem;height: 0.7rem;display: block;background: url(../../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}
  .header{position: fixed;top: 0;z-index:99999 !important;}
  .cen{position: absolute;top: 1.28rem;width: 100%;}
  .cenall{width: 5.86rem;margin: 0 auto;}
  .cent{font-size:0.26rem;color: #242424;height: 0.64rem;margin-top: 0.13rem;line-height: 0.64rem;text-align: center;}
  .cenallt{margin-bottom: 0.23rem;overflow: hidden;}
  .cenb li{float: left;height: 0.46rem;line-height: 0.46rem;color: #636363;font-size: 0.16rem;}
  .cenb .li2{float: right;}

  .cen dl dt img{width: 0.61rem;height: 1.65rem;margin: 0 auto;display: block;margin-top: 0.32rem;}
  .cen dl dd{font-size: 0.29rem;color: #292929;text-align: center;height: 0.73rem;line-height: 0.73rem;}
  .cenb li{float: left;height: 0.46rem;line-height: 0.46rem;color: #636363;font-size: 0.16rem;}
  .cenb .li2{float: right;}
  .cenallb{border-radius: 0.05rem;box-shadow: 0 0 0.05rem #000;overflow: hidden;margin-bottom: 0.2rem;}
  .cenallb-t{height: 0.59rem;line-height: 0.59rem;color: #fff;font-size: 0.26rem;text-align: center;background: #46c2ff;}
  .cenallb-b{width:5.28rem;margin:0 auto;font-size: 0.21rem;color: #242424;line-height: 0.35rem;padding-top: 0.24rem;padding-bottom: 0.28rem;border-bottom: 0.01rem solid #ebebeb;}
  .nav-r {width:4.98rem;margin: 0 auto;overflow: hidden;}
  .nav-r-text{padding: 0 0.3rem;}
  .nav-r-text textarea{padding: 0.2rem 0; width: 100%;border-bottom: 1px solid #ebebeb;font-size: 0.2rem;}
  .nav-r .li4{height:0.6rem;float:left;position: relative;width: 100%;}
  .nav-r span{font-size:0.2rem;color: #242424;display: block;float: left;height: 0.6rem;line-height: 0.6rem;margin-left: 0.15rem;}
  label{width: 0.24rem;height: 0.24rem;border-radius:50%;display: block;position:relative;z-index:10;top:50%;transform: translateY(-50%);float: left;}
  input[type="checkbox"] {display: none;position:absolute;}
  input[type="checkbox"]+b {position:absolute;top:0;left:0;display: inline-block;width: 0.18rem;height: 0.18rem;border: 1px solid #ccc;cursor: pointer;vertical-align: middle;}
  input[type="checkbox"]:checked+b {background: url(../../../images/other/success.png)no-repeat;background-size:cover;}
  .nav-r b.isDui{background: url(../../../images/other/success.png)no-repeat;background-size:cover;}
  .nav-r b.isCuo{background: url(../../../images/x.png)no-repeat;background-size:cover;}

  .cenallf{overflow: hidden;}
  .cenallf ul{width: 5.2rem;margin: 0 auto;line-height: 0.35rem;font-size: 0.21rem;color: #008dd3;padding: 0.25rem 0;}
  .footer{width: 4.6rem;margin: 0 auto;margin-top: 0.5rem;margin-bottom: 0.5rem;overflow: hidden;}
  .footer li{width: 2.08rem;height: 0.54rem;font-size: 0.22rem;border-radius: 0.27rem;line-height: 0.54rem;text-align: center;float: left;}
  .footer .li1{color: #008DD3;border: 1px solid #008DD3;}
  .footer .li2{color: #fff;border: 1px solid #46c2ff;background: #46c2ff;float: right;}
</style>
