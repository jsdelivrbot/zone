<template>
  <div class="delivery">
    <!--<my-header title="管理收货地址"></my-header>-->
    <div class="header">
      <div class="headerall">

        <a href="javascript:history.back(-1);" @click="back" class="a1"></a>
        <!--<a @click="back" class="a1"></a>-->
        <span class="forget">管理收货地址</span>

      </div>
    </div>
    <div class="body">
      <div class="page-loadmore backtop" style="font-size:0.2rem;overflow: auto;">
        <mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">
        <div class="top" v-bind:class="{noShadow:data.is_default==0}" v-for="(data,index) in items" :key="index">
            <div class="linebn" v-bind:class="{linebnw:data.is_default==0}"></div>
            <div class="top-center">
                <ul class="c-ul">
                    <li class="c-li1"><span class="c-li1">{{data.consignee}}</span><span class="c-li2">{{data.mobile}}</span><span v-if="data.is_default" class="c-li3">默认</span></li>
                    <li class="c-li2">
                      <!--<span>北京</span>-->
                      <span class="c-sp1">{{data.province}}</span>
                      <span class="c-sp1">{{data.city}}</span>
                      <span class="c-sp1">{{data.district}}</span>
                      <span class="c-sp1">{{data.address}}</span>
                      <!--（<span>{{data.zipcode}}</span>）-->
                    </li>
                </ul>
            </div>
            <div class="linebn" v-bind:class="{linebnw:data.is_default==0}"></div>
            <div class="top-b">
            	<ul class="nav-r">
	                <li class="li4">
	                    <label>
	                        <input type="radio" name="mr" @click="isMoren(data.address_id,index)" ref="mr"/>
                          <b v-bind:class="{mr:data.is_default==1}"></b>
                          <!--<b></b>-->
	                    </label>

	                </li>
	                <span>默认地址</span>
	            </ul>
	            <div class="top-right">
	            	<ul class="nav-r">
                  <router-link :to="{path:'/tjshdz',query:{
                    address_id:data.address_id,
                    name:'编辑收货地址'
                  }}">
                      <span class="sp1">编辑</span>
                  </router-link>
		            </ul>
		            <ul class="nav-r ml48">
		                <span class="sp2" @click="toggle(data.address_id)">删除</span>
		            </ul>
	            </div>

            </div>
        </div>
        <!--<div class="loading-layer">-->
          <!--<span class="spinner-holder"><img src="../../../images/loading.gif" /></span>-->
          <!--<div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>-->
        <!--</div>-->
    	<!--<a href="#/tjshdz">-->
        <div @click="addDiZhi" class="bottom">添加收货地址</div>
      <!--</a>-->
        </mt-loadmore>
      </div>
    </div>
    <div class="load" style="display:none;">
      <div class="load-container load4"><div class="loader"> <i></i></div></div>
    </div>
    <div class="mark" v-show="show"></div>
    <div class="jubao" v-show="show">
      <div class="jubaoall">
        <img src="../../../images/other/shanchuhaoyou.png"/>
        <div class="a">
          <a class="a1" @click="toggle()">取消</a>
          <a class="a2" @click="delDizhi()">删除地址</a>
        </div>
      </div>
    </div>
    <pop style="text-align: center" class="tip" :title="tip"></pop>
    <load v-show="isload"></load>
  </div>
</template>
<script>
import {setCookie,getCookie} from '../../../assets/js/cookie.js'
import {getOpenUrl,getToken} from '../../../assets/js/common.js'
import qs from 'qs'
var status = 1, start = 0, size = 10, loading = false, end = false;
export default {
  data () {
    return{
      isload:false,
      data:'',
      noData: '',
      show:false,
      items: [],
      mr:'',
      tip:'',
      addressDelId:'',
      itemsLength:'',
      allLoaded: false,
      scrollMode:"auto",
      topStatus: '',
    }
  },
  mounted(){
//    this.type   = status;
//    this.start  = start = 0;
//    this.bottom = size //默认加载10条数据
//    loading = end = false;
//    var self   = this;
    this.getData();


    this.$root.eventHub.$on('tjSuccess',()=>{
      this.items = [];
      this.getData();
    })

    let self = this;
    $(document).bind('click', function(e){
      var target = $(e.target);
      if(target.closest("input").length == 0 && target.closest('.a1').length == 0 && self.iskey){
        setCookie("inputkey", '', -1);
      }
    });
  },
  methods:{
    loadTop() { // 刷新数据的操作
      setTimeout(()=> {
        this.items = [];
        this.getData();
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
      this.$router.goBack();
      //android.back1();
    },
    toggle(id){
      let expireDays = 1000 * 60 * 60;
      if(!this.show){
        this.isKey = true;
        setCookie("inputkey", 1, expireDays);
      }else{
        this.isKey = false;
        setCookie("inputkey", '', -1);
      }
      this.addressDelId = id;
      this.show=!this.show
    },
    addDiZhi(){
      this.$router.push({
        path: '/tjshdz',
        query:{listNum:this.itemsLength}
      });
    },
    getData(){
      //$('.load').show();
      this.isload = true;
      this.$http.get(getOpenUrl() + "/user/shopAddress", {
        headers: {
          "Authorization": "Bearer " + getToken()
        },
        params:{
//          page: start,
//          limit: size
        },
      }).then((res)=>{
        this.isload = false;
        console.log(res.body);
        if (res.status){
          this.items = res.body.data;
          this.itemsLength = res.body.data.length;
          //$('.load').hide();
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
    isMoren(id,index){
      if(this.$refs.mr[index].checked){
        this.$http.get(getOpenUrl() + "/user/defaultAddress", {
          headers: {
            "Authorization": "Bearer " + getToken()
          },
          params:{
            address_id:id
          },
        }).then((res)=>{
          if(res.body.status){
            console.log(res.body);
            this.data = res.body.data;
            this.getData();
          }else{
            this.tip = res.body.data.info;
            $('.tip').show();
            setTimeout(function(){
              $('.tip').hide();
            },1000)
          }
        });
      }
    },
    delDizhi(){
      console.log(this.addressDelId);
      this.$http.get(getOpenUrl() + "/user/delShopAddress", {
        headers: {
          "Authorization": "Bearer " + getToken()
        },
        params:{
          address_id:this.addressDelId
        },
      }).then((res)=>{
        if(res.body.status){
          console.log(res.body);
          this.data = res.body.data;
          this.show = false;
          this.getData();
        }else{
          this.tip = res.body.data.info;
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
      this.toggle();
      next(false)
    }else{
      next()
    }
  },
  activated(){
    //路由缓存 前进后退
    setTimeout(()=>{
      $('.load').hide();
    }, 500)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .header{position: fixed;top:0;}
    .header{height: 0.7rem;box-shadow:0 0 5px #ebebeb;width: 100%;background: #fff;z-index: 11;margin-bottom: 0.05rem; position:fixed;padding-top:0.3rem;}
    .headerall{padding: 0 0.2rem;}
    .header a{width: 0.18rem;height: 0.7rem;display: block;background: url(../../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
    .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}
    .tip{display: none;}

    .body{padding-top: 1rem;padding-bottom:.35rem;}
    .top{margin-left: 0.2rem;margin-right: 0.2rem;
      box-shadow:0 0 0.2rem #76cef1;padding-top:0.2rem;margin-top:0.2rem;overflow: hidden;}
    .top.noShadow{box-shadow:0 0 0.2rem #ccc;}
    .linebn{height:0.04rem;width:100%;background:url(../../../images/line.png)no-repeat;background-size:cover;}
    .linebnw{height:0.04rem;width:100%;background:url(../../../images/line-w.png)no-repeat;background-size:cover;}
    .top-center{font-size:0.22rem;color:#242424;line-height:0.42rem;padding:0.2rem 0.2rem;position:relative;}
    .c-li1 .c-li2{margin-left:0.15rem;}
    .c-li3{height:0.24rem;width:0.62rem;background:#54c2f0;color:#fff;font-size:0.18rem;float:right;line-height:0.24rem;text-align:center;}
    .c-sp1{margin-left:0.13rem;}

    .top-b{padding:0 0.2rem;overflow: hidden;}
    .nav-r {height:0.73rem;float:left;}
    .nav-r li{float: left;}
    .nav-r .li4{width:0.26rem;height:0.73rem;position: relative;}
    .nav-r span{font-size:0.2rem;color: #242424;line-height: 0.73rem;float: left;margin-left: 0.15rem;}

    .top-right{float: right;}
    label{width: 0.26rem;height: 0.26rem;border-radius:50%;display: block;position:relative;z-index:0;top:50%;transform: translateY(-50%);}
    input[type="radio"] {display: none;position:absolute;}
    input[type="radio"]+b {position:absolute;top:0;left:0;display: inline-block;width: 0.25rem;height: 0.25rem;border: 1px solid #ccc;cursor: pointer;border-radius: 50%;vertical-align: middle;}
    input[type="radio"]:checked+b {background: url(../../../images/other/glshdz.png) no-repeat;background-size:cover;border:none;}
    input[type="radio"]+b.mr{background: url(../../../images/other/glshdz.png) no-repeat;background-size:cover;border:none;}

    .sp1{background: url(../../../images/other/bianjiicon.png)no-repeat 0 50%;background-size:0.24rem 0.24rem;padding-left: 0.35rem;}
    .sp2{background: url(../../../images/other/shanchuicon.png)no-repeat 0 50%;background-size:0.26rem 0.22rem;padding-left: 0.34rem;}

    .bottom{width: 2.38rem;height: 0.62rem;border-radius: 0.31rem;background: #54c2f0;color: #fff;text-align: center;line-height: 0.62rem;font-size: 0.22rem;cursor: pointer;margin: 0.35rem auto;}


    .jubao{width:5.36rem;height:3.8rem;position:fixed;top:50%;left:50%;margin-top:-1.9rem;margin-left:-2.68rem;z-index:11;}
    .jubaoall{width:5.36rem;height:3.8rem;position:relative;}
    .jubao img{width:5.36rem;height:3.8rem;display:block;position:absolute;top:0;left:0;box-shadow: 0 0 0.2rem #95d1ed;}
    .jubao a{width:2.08rem;height:0.54rem;line-height:0.54rem;color:#fff;background:#008dd3;border-radius:0.27;font-size:0.22rem;display:block;text-align:center;border-radius:0.28rem;cursor: pointer;float: left;}
    .jubao .a{position:absolute;left:50%;bottom:0.3rem;width: 100%;transform: translateX(-42%);}
    .jubao .a1{border: 1px solid #008dd3;background: #fff;color: #008dd3;}
    .jubao .a2{width: 2.1rem;height: 0.56rem;margin-left: 0.4rem;}
    .mark {
      width: 100%;
      height: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 11;
      background: rgba(0,0,0,0.3);
    }
</style>
