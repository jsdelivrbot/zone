<template>
  <div id="headed">
    <div class="header">
      <div class="headerall">
        <a href="javascript:history.back(-1);" class="a1"></a>
        <!--<a @click="back" class="a1"></a>-->
        <span class="forget">订单详情</span>
        <a class="a2" v-if="items.shipping_status==1" @click="toggle()">确认收货</a>
        <a class="a2" v-if="items.shipping_status==2" @click="delDingDan()">删除订单</a>
      </div>
    </div>
    <div class="nav">
      <div class="navall">
        <img v-if="items.img" :src="items.img" v-lazy="items.img"/>
        <ul>
          <li class="li1">{{items.goods_name}}</li>
          <li class="li2">积分：<span>{{items.goods_price}}</span></li>
          <li class="li3">兑换时间：<span>{{items.dateline}}</span></li>
          <li class="li3">状态：
            <span class="sp1" v-if="items.shipping_status==0">待发货</span>
            <span class="sp1" v-if="items.shipping_status==1">已发货</span>
            <span class="sp1" v-if="items.shipping_status==2">已签收</span>
          </li>
        </ul>
      </div>
      <div class="line"></div>
    </div>
    <div class="qr" v-show="show">
      <div class="qrall">
        <p>确认商品已收到吗？</p>
        <ul>
          <li class="li1" @click="enterSh()"><a>确认收货</a></li>
          <li class="li2" @click="toggle()"><a>取消</a></li>
        </ul>
      </div>
    </div>
    <div class="qr" v-show="dels">
      <div class="qrall">
        <p>确认删除该订单吗？</p>
        <ul>
          <li class="li1" @click="deleteSh()"><a>确认删除</a></li>
          <li class="li2" @click="delDingDan()"><a>取消</a></li>
        </ul>
      </div>
    </div>
    <div class="mark" v-show="show"></div>
    <div class="mark" v-show="dels"></div>
    <!--<my-footer></my-footer>-->
    <pop style="text-align: center" class="tip" :title="tip"></pop>
    <div class="load" style="display:none;">
      <div class="load-container load4"><div class="loader"> <i></i></div></div>
    </div>
  </div>
</template>

<script>
  import { setCookie, getCookie } from '../../../assets/js/cookie.js'
  import {getOpenUrl,getToken} from '../../../assets/js/common.js'
  export default{
    data(){
      return {
        show:false,
        dels:false,
        tip:'',
        items:{}
      }
    },
    methods: {
      back(){
        android.back1();
      },
      toggle(){
        let expireDays = 1000 * 60 * 60;
        if(!this.show){
          this.isKey = true;
          setCookie("inputkey", 1, expireDays);
        }else{
          this.isKey = false;
          setCookie("inputkey", '', -1);
        }
        this.show=!this.show
      },
      delDingDan(){
        let expireDays = 1000 * 60 * 60;
        if(!this.dels){
          this.isKey = true;
          setCookie("inputkey", 1, expireDays);
        }else{
          this.isKey = false;
          setCookie("inputkey", '', -1);
        }
        this.dels=!this.dels
      },
      getData(){
        this.$http.get(getOpenUrl() + "/user/orderdetail", {
          headers: {
            "Authorization": "Bearer " + getToken()
          },
          params:{
            oid:this.$route.query.oid
          },
        }).then((res)=>{
          var data = res.body.data;
          console.log(res.body);
          this.items = res.body.data;
          $('.load').hide();
        });
      },
      enterSh(){
        this.$http.get(getOpenUrl() + "/user/ordershou", {
          headers: {
            "Authorization": "Bearer " + getToken()
          },
          params:{
            oid:this.$route.query.oid
          },
        }).then((res)=>{
          var data = res.body.data;
          console.log(res.body);
          if(res.body.status){
            this.$root.eventHub.$emit('ddSuccess');
            this.show=false;
            this.getData();
            this.tip = res.body.data.info;
            $('.tip').show();
            setTimeout(function(){
              $('.tip').hide();
            },1000)
          }
        });
      },
      deleteSh(){
        this.$http.get(getOpenUrl() + "/user/orderdel", {
          headers: {
            "Authorization": "Bearer " + getToken()
          },
          params:{
            oid:this.$route.query.oid
          },
        }).then((res)=>{
          var data = res.body.data;
          console.log(res.body);
          if(res.body.status){
            this.$root.eventHub.$emit('ddSuccess');
            this.dels=false;
            this.getData();
            setCookie("inputkey", '', -1);
            this.$router.go(-1);
          }
        });
      }
    },
    mounted(){
      $('.load').show();
      this.getData();

      let self = this;
      $(document).bind('click', function(e){
        var target = $(e.target);
        if(target.closest("input").length == 0 && target.closest('.a1').length == 0 && self.iskey){
          setCookie("inputkey", '', -1);
        }
      });
    },
    beforeRouteLeave (to, from, next) {
      //路由离开时
      var isInputKey = parseInt(getCookie('inputkey'));
      if (isInputKey == 1){
        setCookie("inputkey", '', -1);
        if(this.dels){
          this.delDingDan();
        }else if(this.show){
          this.toggle();
        }
        next(false)
      }else{
        next()
      }
    },
    activated(){
      //路由缓存 前进后退
      $('.load').hide();
    }

  }
</script>

<style scoped="scoped">
  #headed{background: #f0f0f0;height: 100%;}
  .header{height: 0.7rem;box-shadow:0 0 5px #ebebeb;position: fixed;top: 0;width: 100%;z-index: 2;background: #fff;padding-top: 0.3rem;}
  .tip{display: none;}

  .header .a1{background: url(../../../images/back.png) no-repeat 0 50%;
    width: 0.18rem;
    height: 0.7rem;
    display: block;
    background-size: 0.18rem 0.34rem;
    float: left;
    /* margin-top: 0.2rem; */
    margin-left: 0.2rem;}
  .header .a2{height: 0.39rem;display: block;float: right;font-size: 0.2rem;line-height: 0.39rem;text-align: center;border-radius: 0.05rem;color: #008DD3;margin-top: 0.15rem;margin-right: 0.2rem;}


  .header ul{float: right;position: absolute;right: 0.2rem;top:1.05rem;background: #fff;}
  .header ul li a{font-size:0.2rem;width:1.4rem;height: 0.64rem;line-height: 0.64rem;display: block;border-bottom: 0.01rem solid #ebebeb;text-align: center;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}
  .nav{width: 100%;position: absolute;top: 1.18rem;overflow: hidden;z-index: 1;background: #fff;margin-top: 0.05rem;}
  .navall{overflow: hidden;}
  .navall img{width: 100%;height:4.5rem;border-radius: 0.05rem;display: block;}
  .navall ul{float: left;width: 100%;}
  .navall li{height: 0.9rem;line-height: 0.9rem;border-bottom: 0.01rem solid #e0e0e0;padding-left: 0.2rem;}
  .navall .li1{font-size:0.22rem;}
  .navall .li2{font-size:0.2rem;}
  .navall .li2 span{color: #008dd3;}
  .navall .li3{font-size: 0.2rem;color: #636363;}
  .navall .li3 span{font-size: 0.2rem;color: #adadad;}
  .navall .li3 .sp1{color: #fd7f47;}
  .navall .nav-r{width:0.9rem;height:0.34rem;font-size:0.16rem;float: right;text-align: center;line-height: 0.34rem;border-radius: 0.17rem;background: #54c2f0;color: #fff;margin-top: 0.3rem;}

  .mark{width:100%;height:100%;position:fixed;bottom:0;left:0;background:rgba(36,153,200,0.3);z-index:5;}
  .qr{width: 5.6rem;height:3.8rem;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);z-index: 10;box-shadow: 0 0 1rem #008DD3;background: url(../../../images/tanchuall.png) no-repeat;background-size: cover;}
  .qr p{color: #fff;font-size: 0.26rem;text-align: center;width: 100%;}
  .qr ul{width:4.4rem;height:0.56rem;margin:0 auto;margin-top: 0.7rem;}
  .qr ul li{width:2.08rem;height:0.54rem;float:left;border-radius:0.28rem;border: 1px solid #008dd3;}
  .qr .li1{width:2.08rem;height:0.54rem;line-height:0.54rem;color:#008dd3;font-size:0.22rem;display:block;text-align:center;border-radius:0.28rem;}
  .qr .li2{width:2.08rem;height:0.54rem;line-height:0.54rem;color:#fff;background:#008dd3;font-size:0.22rem;display:block;text-align:center;border-radius:0.28rem;}

  .qr .li2{float:right;}
  .qrall{position: absolute;left: 50%;top:50%;transform: translateX(-50%);}
</style>
