<template>
	<div class="index">
		<!--<my-header title="选择圈子分类"></my-header>-->
    <div class="header">
      <div class="headerall">
        <a href="javascript:history.back(-1);" class="a1"></a>
        <span class="forget">选择圈子分类</span>
      </div>
    </div>
		<div class="content">
			<!--<p>您一共可以创建<span>3</span>个圈子，已经创建了<span>1</span>个圈子</p>-->
      <p>{{fenleiInfo.info}}</p>
			<div class="con-b">
				<!--<dl @click="toggle()">-->
					<!--<dt><img src="../../../images/other/hangye.png"/></dt>-->
					<!--<dd>行业交流</dd>-->
				<!--</dl>-->
				<!--<dl @click="toggle()">-->
					<!--<dt><img src="../../../images/other/shenghuo.png"/></dt>-->
					<!--<dd>生活休闲</dd>-->
				<!--</dl>-->
				<!--<dl @click="toggle()">-->
					<!--<dt><img src="../../../images/other/aihao.png"/></dt>-->
					<!--<dd>兴趣爱好</dd>-->
				<!--</dl>-->
				<!--<dl @click="toggle()">-->
					<!--<dt><img src="../../../images/other/kaoshi.png"/></dt>-->
					<!--<dd>学习考试</dd>-->
				<!--</dl>-->
				<!--<dl @click="toggle()">-->
					<!--<dt><img src="../../../images/other/pinpai.png"/></dt>-->
					<!--<dd>品牌交流</dd>-->
				<!--</dl>-->
				<!--<dl @click="toggle()">-->
					<!--<dt><img src="../../../images/other/youxi.png"/></dt>-->
					<!--<dd>游戏</dd>-->
				<!--</dl>-->

        <dl @click="toggle(data.id,data.count)" v-for="(data,index) in fenleiData" :key="index">
          <dt><img :src="data.icon" v-lazy="data.icon"/></dt>
          <dd>{{data.title}}</dd>
        </dl>
			</div>
		</div>
    <p v-html="fenleiInfo.error_description" style="    margin-top: 50%;
    font-size: 0.2rem;
    text-align: center;"></p>
		<div class="mark" v-show="show"></div>
		<div class="up" v-show="show">
			<div class="up1"><span>{{erjiRes.title}}</span><span class="sp2" @click="toggles()">x</span></div>
			<ul>
				<a v-for="(data,index) in erJifenleiData" @click="secondRound(data.id)"><li>{{data.title}}</li></a>
				<!--<a href="#/qzname"><li>桐乡</li></a>-->
				<!--<a href="#/qzname"><li>桐乡</li></a>-->
				<!--<a href="#/qzname"><li>桐乡</li></a>-->
			</ul>
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
        fenleiData:[],
        fenleiInfo:{},
        erJifenleiData:{},
        erjiRes:{},
        show:false,
        strRand:''
    }
  },
  mounted(){
    //$('.load').show();
    this.isload = true;
    this.fenlei(0);
  },
  methods:{
    toggles(){
      this.show=!this.show
    },
    toggle(id,count){
      if(count===0){
        this.secondRound(id);
      }else{
        this.show=!this.show
        this.$http.get(getOpenUrl() + "/user/groupcate",{
          headers: {
            "Authorization": "Bearer " + getToken()
          },
          params:{
            pid:id,
            str_rand:this.strRand
          }
        }).then((res)=>{
          this.erJifenleiData = res.body.groupCate;
          this.erjiRes = res.body;
          console.log(res.body)
        });
      }
    },

    secondRound(id){
      this.isload = true;
      this.$http.get(getOpenUrl() + "/user/groupcate",{
        headers: {
          "Authorization": "Bearer " + getToken()
        },
        params:{
          pid:id,
          str_rand:this.strRand
        }
      }).then((res)=>{
        this.isload = false;
        console.log(res.body);
        //if(res.body.status){
          this.$router.push({path: '/qzname',
             query:{str: this.strRand}
          });
        //}
      });
    },

    fenlei(id){
      this.$http.get(getOpenUrl() + "/user/groupcate",{
        headers: {
          "Authorization": "Bearer " + getToken()
        },
        params:{
          pid:id
        }
      }).then((res)=>{
        this.isload = false;
        this.fenleiData = res.body.groupCate;
        this.fenleiInfo = res.body;
        this.strRand = res.body.str_rand;
        $('.load').hide();
        console.log(res.body)
      });
    }
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
  .header{position: fixed;top: 0;width: 100%;}
  .content{position: absolute;top:1rem;bottom: 0.98rem;width: 100%;}
  .content p{line-height: 0.82rem;text-align: center;color: #39b6f4;font-size: 0.2rem;background: #fafafa;}
  .con-b{width: 6.3rem;margin: 0 auto;}
  .con-b dl{width: 2.85rem;height: 1.2rem;box-shadow: 0 0 0.1rem #a3d3ec;float: left;position: relative;margin: 0.3rem 0.15rem 0 0.15rem;cursor: pointer;}
  .con-b dt{float: left;height: 1.2rem;}
  .con-b dt img{width: 0.64rem;height: 0.64rem;position: absolute;top: 50%;left:0.29rem;transform: translateY(-50%);}
  .con-b dd{font-size: 0.22rem;color: #242424;float: left;line-height: 1.2rem;margin-left: 1.13rem;}
  .mark{width:100%;height:100%;position:fixed;bottom:0;left:0;background:rgba(36,153,200,0.3);z-index:999;}
  .up{width: 5.8rem;text-align: center;font-size: 0.22rem;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);z-index: 999;}
  .up1{color: #fff;background: #01A9F8;line-height: 0.8rem;}
  .up1 .sp2{float: right;padding-right: 0.2rem;}
  .up ul{background: #fff;color: #242424;width: 5.8rem;margin: 0 auto;overflow: hidden;}
  .up ul a{color: #242424;}
  .up ul li{float: left;border: 1px solid #008DD3;padding: 0.1rem 0.3rem;margin-left: 0.22rem;margin-top: 0.1rem;margin-bottom: 0.1rem;border-radius: 0.1rem;}
</style>
