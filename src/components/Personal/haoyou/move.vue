<template>
    <div class="report">
        <!--<my-header title="移至分组"></my-header>-->
      <div class="header">
        <div class="headerall">
          <a href="javascript:history.back(-1);" class="a1"></a>
          <span class="forget">移至分组</span>
        </div>
      </div>
        <div class="bottom" style="padding-top:1rem;">
            <div class="navall">
              <div class="nav">
                <ul class="nav-left">
                  <li class="li4">
                    <label>
                      <input type="radio" name="haoyou" :checked="hyGid.nowGid==0">
                      <b @click="moveEnter(0)"></b>
                    </label>
                  </li>
                </ul>
                <ul class="nav-right">
                  <li class="li1">我的好友</li>
                </ul>
              </div>
            </div>
	        	<div class="navall" v-for="(data,index) in data" :key="index">
	        		<div class="nav" @click="moveEnter(data.friend_group_id)">
		            	<ul class="nav-left">
		                    <li class="li4">
		                        <label>
		                            <input type="radio" name="haoyou" :checked='data.now'>
                                	<b></b>
		                        </label>
		                    </li>
		                </ul>
		                <ul class="nav-right">
		        			  <li class="li1">{{data.title}}</li>
		        		</ul>
		            </div>
	        	</div>
        </div>
        <div class="load" style="display:none;">
          <div class="load-container load4"><div class="loader"> <i></i></div></div>
        </div>
        <pop style="text-align: center" class="tip" :title="tip"></pop>
        <load v-show="isload"></load>
    </div>
</template>

<script>
	import qs from 'qs'
  import { setCookie, getCookie } from '../../../assets/js/cookie.js'
  import {getOpenUrl,getToken} from '../../../assets/js/common.js'
	export default {
		name: 'content',
		data() {
			return {
			  isload:false,
			  tip:'',
        data:[],
        hyGid:''
      };
		},
    mounted(){
      //$('.load').show();
      this.isload = true;
      this.getData(this.$route.query.fid);
    },
		methods: {
      getData(id){
        //$('.load').show();
        this.$http.post(getOpenUrl() + "/user/savefgroup", {
          fid:id
        },{
          headers:{"Authorization": "Bearer " + getToken()}
        }).then((res)=>{
          this.isload = false;
          if(res.body.status){
            console.log(res.body);
            this.hyGid = res.body.data;
            this.data = res.body.data.friendGroup;
          }
          $('.load').hide();
        });
      },
      moveEnter(gid){
        //$('.load').show();
        this.isload = true;
        this.$http.post(getOpenUrl() + "/user/savefgroup", {
          fid:this.$route.query.fid,
          fgid:gid
        },{
          headers:{"Authorization": "Bearer " + getToken()}
        }).then((res)=>{
          this.isload = false;
          if(res.body.status){
            this.tip = res.body.data.info;
            this.$root.eventHub.$emit('hySuccess');
            $('.tip').show();
            this.getData(this.$route.query.fid);
            setTimeout(function(){
              $('.tip').hide();
              window.history.go(-1);
            },1000)
          }
          $('.load').hide();
        });
      },
      activated(){
        //路由缓存 前进后退
        $('.load').hide();
      }
    }
	}
</script>
<style scoped>
  .header{height: 0.7rem;box-shadow:0 0 5px #ebebeb;width: 100%;background: #fff;z-index: 11;margin-bottom: 0.05rem; position:fixed;padding-top: 0.3rem;}
  .headerall{padding: 0 0.2rem;}
  .header a{width: 0.18rem;height: 0.7rem;display: block;background: url(../../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}
  .bt0 {
    border-bottom: 0!important;
  }

  /*.tip {*/
  /*line-height: 0.87rem;*/
  /*padding-left: 0.2rem;*/
  /*font-size: 0.26rem;*/
  /*color: #292929;*/
  /*border-bottom: 0.01rem solid #e0e0e0;*/
  /*}*/
  .tip{display: none;}

  .con-left {
    width: 0.68rem;
    height: 0.68rem;
    border-radius: 50%;
    float: left;
    margin: 0.29rem 0.22rem 0 0.2rem;
  }

  .con-left img {
    width: 0.68rem;
    height: 0.68rem;
    border-radius: 50%;
    display: block;
  }

  .con {
    display: flex;
  }

  .con ul {
    margin-top: 0.19rem;
    float: left;
    flex: 1;
  }

  .con .li1 {
    line-height: 0.68rem;
    font-size: 0.26rem;
    color: #292929;
    border-bottom: 0.01rem solid #ebebeb;
  }

  .con .li2 {
    width: 5rem;
    line-height: 0.29rem;
    font-size: 0.21rem;
    color: #949494;
    margin-top: 0.18rem;
    margin-bottom: 0.28rem;
  }

  .navall {
    border-bottom: 1px solid #ebebeb;
  }

  .nav {
    display: flex;
  }

  .bottom .nav-right {
    float: right;
    /*border-bottom: 1px solid #ebebeb;*/
    flex: 1;
  }

  .bottom .nav-right .li1 {
    color: #292929;
    font-size: 0.22rem;
    line-height: 0.85rem;
  }

  .nav-left {
    width: 0.16rem;
    height: 0.85rem;
    float: left;
    margin: 0 0.26rem 0 0.33rem;
  }

  .nav-left .li4 {
    width: 0.16rem;
    height: 0.85rem;
    float: right;
    position: relative;
  }

  label {
    width: 0.16rem;
    height: 0.16rem;
    border-radius: 50%;
    display: block;
    position: relative;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
  }

  input[type="radio"] {
    display: none;
    position: absolute;
  }

  input[type="radio"]+b {
    position: absolute;
    display: inline-block;
    width: 0.16rem;
    height: 0.16rem;
    border: 1px solid #ccc;
    cursor: pointer;
    border-radius: 50%;
    vertical-align: middle;
  }

  input[type="radio"]:checked+b {
    background: #008DD3;
  }

  /*.li4 label b.check{*/
  /*background: #008DD3;*/
  /*}*/

  .up {
    width: 5.58rem;
    margin: 0 auto;
  }

  .up-all {
    width: 5.58rem;
    height: 100%;
    margin: 0 auto;
  }

  .up-all p {
    color: #292929;
    font-size: 0.24rem;
    line-height: 0.66rem;
    height: 0.56rem;
    padding-top: 0.1rem;
  }

  .up-all .sp1 {
    color: #292929;
  }

  .up-all textarea {
    width: 5.58rem;
    height: 2rem;
    resize: none;
    outline: none;
    border: 1px solid #e0e0e0;
    display: block;
  }

  .up-all ul {
    width: 4.4rem;
    height: 0.56rem;
    margin: 0 auto;
  }

  .up-all ul li {
    width: 2.08rem;
    height: 0.54rem;
    border-radius: 0.28rem;
    margin: 0 auto;
    background: #008dd3;
    margin-top: 0.59rem;
    margin-bottom: 0.57rem;
  }

  .up-all ul li a {
    line-height: 0.54rem;
    color: #fff;
    font-size: 0.22rem;
    display: block;
    text-align: center;
  }
</style>
