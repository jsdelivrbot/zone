<template>
  <div class="delivery" style="overflow:auto;">
    <div class="header">
        <div class="header1">
            <a href="javascript:history.back(-1);" class="a1"></a>
          <!--<a @click="back" class="a1"></a>-->
            <span class="forget">选择收货地址</span>
            <a class="a2" href="#/glshdz">管理</a>
        </div>
    </div>
    <div class="body">
        <div class="top" v-for="(address,index) in addressData" :key="index"  :class="{noShadow:address.is_default==0}" @click="isMoren(address.address_id,index)">
            <div class="linebn":class="{linebnw:address.is_default==0}"></div>
            <div class="top-center">
                <ul class="c-ul">
                    <li class="c-li1"><span class="c-li1">{{address.consignee}}</span><span class="c-li2">{{address.mobile}}</span><span class="c-li3" v-if="address.is_default">默认</span></li>
                    <li class="c-li2"><span>{{address.address}}</span>（<span>{{address.zipcode}}</span>）</li>
                </ul>
            </div>
            <div class="linebn":class="{linebnw:address.is_default==0}"></div>
        </div>

    </div>
    <div class="load" style="display:none;">
      <div class="load-container load4"><div class="loader"> <i></i></div></div>
    </div>
    <load v-show="isload"></load>
    <pop style="text-align: center" class="tip" :title="tip"></pop>
  </div>
</template>
<script>
import {setCookie,getCookie} from '../../assets/js/cookie.js'
import { getOpenUrl,getToken} from "../../assets/js/common.js"
import qs from 'qs'
export default {
  data () {
    return{
      isload:false,
        addressData:{},
        tip:''
    }
  },
  mounted(){
    this.getData();
  },
  methods:{
    back(){
      android.back1();
    },
  	getData(){
      this.$http.get(getOpenUrl() + "userAddress", {
        params:{
					type:1
				},
					headers: {
					'Authorization': 'Bearer ' + getToken()
				},
      }).then((res)=>{
        this.addressData=res.body.data
      });
    },
    isMoren(id,index){
  	  this.isload = true;
        this.$http.get(getOpenUrl() +"defaultAddress", {
          params:{
            address_id:id
          },
          headers: {
				'Authorization': 'Bearer ' + getToken()
			},
        }).then((res)=>{
          this.isload = false;
          if(res.body.code==0){
            this.getData();
            this.show = false;
            this.tip = res.body.data;
          	console.log(res.body.data);
            $('.tip').show();
            setTimeout(function(){
              $('.tip').hide();
            },1000)
          }else{
			this.tip = res.body.error_description;
            $('.tip').show();
            setTimeout(function(){
              $('.tip').hide();
            },1000)
					}
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tip{display: none;}
  .header{padding:0 0.2rem;height: 0.7rem;position: relative;box-shadow:0 0 5px #ebebeb;padding-top: 0.3rem;}
  .body{padding-bottom: 0.4rem;}
  .header1{overflow:hidden;}
  .header .a1{width: 0.18rem;height: 0.34rem;background: url(../../images/back.png) no-repeat;background-size: cover;float:left;display: block;margin-top:0.2rem;}
  .header .a2{width: 0.73rem;height: 0.42rem;float:right;display: block;color:#008dd3;border:0.01rem solid #008dd3;border-radius:0.05rem;line-height:0.42rem;text-align:center;font-size:0.22rem;margin-top:0.16rem;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}


  .top{box-shadow:0 0 0.2rem #76cef1;padding-top:0.2rem;margin-top:0.2rem;padding-bottom: 0.2rem;margin-left: 0.2rem;margin-right: 0.2rem;}
  .linebn{height:0.04rem;width:100%;background:url(../../images/line.png)no-repeat;background-size:cover;}
  .linebnw{height:0.04rem;width:100%;background:url(../../images/line-w.png)no-repeat;background-size:cover;}
  .top-center{font-size:0.22rem;color:#242424;line-height:0.42rem;padding:0.2rem 0.2rem;position:relative;}
  .c-li1 .c-li2{margin-left:0.15rem;}
  .c-li3{height:0.24rem;width:0.62rem;background:#54c2f0;color:#fff;font-size:0.18rem;float:right;line-height:0.24rem;text-align:center;}
  .c-sp1{margin-left:0.13rem;}
  /**/
  .noShadow{box-shadow:0 0 0.2rem #ccc;}
</style>
