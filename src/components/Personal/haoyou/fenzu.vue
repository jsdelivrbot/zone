<template>
    <div class="first" ref="a1">
    	<!--<my-header title="分组管理"></my-header>-->
      <div class="header">
        <div class="headerall">
          <a href="javascript:history.back(-1);" class="a1"></a>
          <span class="forget">分组管理</span>
        </div>
      </div>
	    <div class="navall" style="padding-top: 1rem;">
	    	<div>
		    	<div class="fri" @click="toggle1()">
		    		<div class="fri-t">
		    			<div style="width:10%;height: 100%;" @click="toggle(data.friend_group_id)">
		    				<img src="../../../images/other/tianjiafenzu.png"/>
		    			</div>
		    			<p class="fri-p1">添加分组</p>
		    		</div>
		    	</div>
		    	<div class="line"></div>
	    	</div>
	    	<div v-for="(data,index) in data" :key="index">
		    	<div class="fri">
		    		<div class="fri-t">
		    			<div style="width:10%;height: 100%;" @click="toggle(data.friend_group_id)">
		    				<img src="../../../images/other/delfenzu.png"/>
		    			</div>

		    			<p class="fri-p1" @click="toggle1(data.title,data.friend_group_id)">{{data.title}}</p>
		    		</div>
		    	</div>
		    	<div class="line"></div>
	    	</div>
	    </div>
      <div class="load" style="display:none;">
        <div class="load-container load4"><div class="loader"> <i></i></div></div>
      </div>
        <div class="mark" v-show="show"></div>
      <div class="mark" v-show="mark" @click="none()"></div>
      <div class="jubao" v-show="show">
        <div class="jubaoall">
          <img src="../../../images/other/shanchuhaoyou.png"/>
          <div class="a">
            <a class="a1" @click="toggle()">取消</a>
            <a class="a2" @click="delGroup()">删除分组</a>
          </div>
        </div>
      </div>
      <div class="yzall" v-show="isshow">
        <p class="forget1">
          <span class="sp1" style="color: #008DD3;">备注昵称</span>

          <span class="sp2">
							<input type="text" name="" id="" value="" ref="val"/>
						</span>
          <span class="sp3">
							<input type="button" name="" id="btn1" value="取消" @click="toggle1();a1()"/>
						</span>
          <span class="sp3" id="btn2">
							<input type="button" name="" @click="addFenzu" value="确认" />
						</span>
        </p>
      </div>
      <load v-show="isload"></load>
    </div>
</template>
<script>
    import qs from 'qs'
    import { setCookie, getCookie } from '../../../assets/js/cookie.js'
    import {getOpenUrl,getToken} from '../../../assets/js/common.js'
    export default {
    name:'first',
        data () {
             return {
               isload:false,
               data:[],
               isshow:false,
               mark:false,
               show:false,
               fid:'',
               isAdd:'',
               delGroupId:''
             };
         },
         mounted(){
           this.getData();

           let self = this;
           $(document).bind('click', function(e){
             var target = $(e.target);
             if(target.closest("input").length == 0 && target.closest('.a1').length == 0 && !self.isKey){
               setCookie("inputkey", '', -1);
             }
           });
         },
         methods: {
            toggle(id){
              let expireDays = 1000 * 60 * 60;
              if(!this.show){
                this.isKey = true;
                setCookie("inputkey", 1, expireDays);
              }else{
                this.isKey = false;
                setCookie("inputkey", '', -1);
              }
            	this.show=!this.show;
            	this.delGroupId = id;
            },
           toggle1(tit,id){
             let expireDays = 1000 * 60 * 60;
             this.show=false;
             this.mark=true;
             this.isshow=true;
             this.isKey = true;
             setCookie("inputkey", 1, expireDays);
             if(tit==undefined){
               this.$refs.val.value = '';
               this.isAdd = true;
             }else{
               this.$refs.val.value = tit;
               this.fid = id;
               this.isAdd = false;
             }
           },
           a1(){
             let expireDays = 1000 * 60 * 60;
             this.mark=false;
             this.isshow=false;
             this.isKey = false;
             setCookie("inputkey", '', -1);
             this.$refs.a1.style.height="";
             this.$refs.a1.style.overflow="";
           },
           none(){
             let expireDays = 1000 * 60 * 60;
             this.show=false;
             this.mark=false;
             this.isshow=false;
             this.isKey = false;
             setCookie("inputkey", '', -1);
             this.$refs.a1.style.height="";
             this.$refs.a1.style.overflow="";
           },
           getData(){
             //$('.load').show();
             this.isload = true;
             this.$http.get(getOpenUrl() + "/user/friendCate", {
               headers: {
                 "Authorization": "Bearer " + getToken()
               },
               params:{

               },
             }).then((res)=>{
               this.isload = false;
               if(res.body.status){
                 console.log(res.body);
                 this.data = res.body.data;
               }
               $('.load').hide();
             });
           },
           delGroup(){
             setCookie("inputkey", '', -1);
             this.$http.get(getOpenUrl() + "/user/delfgroup", {
               headers: {
                 "Authorization": "Bearer " + getToken()
               },
               params:{
                 fgid:this.delGroupId
               },
             }).then((res)=>{
               if(res.body.status){
                 console.log(res.body);
                 this.show = false;
                 this.getData();
                 this.$root.eventHub.$emit('hySuccess');
               }
             });
           },
           addFenzu(){
             setCookie("inputkey", '', -1);
             if(this.isAdd){
               this.$http.post(getOpenUrl() + "/user/addfgroup", {
                 title:this.$refs.val.value
               },{
                 headers:{"Authorization": "Bearer " + getToken()}
               }).then((res)=>{
                 if(res.body.status){
                   console.log(res.body);
                   this.none();
                   this.getData();
                   this.$root.eventHub.$emit('hySuccess');
                 }
               });
             }else{
               this.$http.post(getOpenUrl() + "/user/editfgroup", {
                 title:this.$refs.val.value,
                 fgid:this.fid
               },{
                 headers:{"Authorization": "Bearer " + getToken()}
               }).then((res)=>{
                 if(res.body.status){
                   console.log(res.body);
                   this.none();
                   this.getData();
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
          //this.toggle1();
          if(this.isshow){
            this.none();
          }else if(this.show){
            this.toggle();
          }
          next(false)
        }else{
          next()
        }
      }
    }
</script>
<style scoped>
  .header{height: 0.7rem;box-shadow:0 0 5px #ebebeb;width: 100%;background: #fff;z-index: 11;margin-bottom: 0.05rem; position:fixed;padding-top: 0.3rem;}
  .headerall{padding: 0 0.2rem;}
  .header a{width: 0.18rem;height: 0.7rem;display: block;background: url(../../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10!important;
  }
  .mark {
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
    background: rgba(0,0,0,0.3);
  }
  .up{width: 100%;position: fixed;bottom:0;z-index: 100;background: #fff;font-size: 0.3rem;text-align: center;line-height: 1rem;}
  .up li{border-bottom: 0.01rem solid #E0E0E0;}
  .forget1 {
    text-align: center;
    line-height: 1.25rem;
    z-index: 13;
    margin-bottom: 0.05rem;
    border-radius: 0.1rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*box-shadow: 0 0 0.1rem #000;*/
    /*background: rgba(0, 0, 0, 0.7);*/
    background: #fff;
    padding: 0rem 0.2rem;
    color: #fff;
    width: 5rem;
    font-size: 0.3rem;
    padding-bottom: 0.3rem;
  }

  .mark {
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
  }

  .sp2 {
    border: 1px solid #e0e0e0;
    display: block;
    border-radius: 0.1rem;
  }

  .sp2 input {
    display: block;
    width: 100%;
    height: 0.5rem;
    padding-left: 0.2rem;
  }

  .sp3 {
    width: 45%;
    background: #fff;
    display: block;
    margin: 0 auto;
    text-align: center;
    margin-top: 0.2rem;
    border-radius: 0.1rem;
    float: left;
  }
  #btn1{
    float: left;
  }
  #btn2{
    float: right;
  }
  .sp3 input {
    border: 1px solid #008DD3;
    display: block;
    width: 100%;
    color:#008DD3;
    height: 0.5rem;
    border-radius: 0.28rem;
  }
  .navall-t{background: #f5f5f5;width: 100%;padding: 0.31rem 0;}
  .input{width: 5.98rem;height: 0.5rem;border: 1px solid #ebebeb;margin: 0 auto;background: #fff;border-radius: 0.05rem;}
  .input .p1{float:left;width:0.65rem;height:0.24rem;background: url(../../../images/searchb.png)no-repeat 0.21rem 50%;background-size: 0.24rem 0.24rem;border-right: 0.01rem solid #ebebeb;margin-top: 0.12rem;}
  .input input{display: block;float: left;}
  .input .btn{width: 1.12rem;height: 0.5rem;background: #008dd3;font-size: 0.24rem;color: #fff;line-height: 0.5rem;text-align: center;float: right;border-radius: 0.05rem;}
  .input .txt{height: 0.5rem;font-size: 0.24rem;line-height: 0.24rem;padding-left: 0.2rem;color: #242424;}

  .fri-t{height: 0.78rem;border-bottom: 0.01rem solid #ebebeb;position: relative;display: flex;}
  .fri-t img{width:0.3rem;border-bottom: 0.01rem solid #ebebeb;display: block;float: left;position: absolute;top: 50%;left:0.27rem;transform: translateY(-50%);}
  .fri-t .fri-p1{font-size: 0.22rem;color: #242424;float: left;line-height: 0.78rem;flex: 1;}
  .fri-t span{float: right;font-size: 0.24rem;color: #242424;line-height: 0.78rem;padding-right: 0.22rem;color: #008dd3;}

  .jubao{width:5.36rem;height:3.8rem;position:absolute;top:50%;left:50%;margin-top:-1.9rem;margin-left:-2.68rem;z-index:10;}
  .jubaoall{width:5.36rem;height:3.8rem;position:relative;}
  .jubao img{width:5.36rem;height:3.8rem;display:block;position:absolute;top:0;left:0;box-shadow: 0 0 0.2rem #95d1ed;}
  .jubao a{width:2.08rem;height:0.54rem;line-height:0.54rem;color:#fff;background:#008dd3;border-radius:0.27;font-size:0.22rem;display:block;text-align:center;border-radius:0.28rem;cursor: pointer;float: left;}
  .jubao .a{position:absolute;left:50%;bottom:0.3rem;width: 100%;transform: translateX(-42%);}
  .jubao .a1{border: 1px solid #008dd3;background: #fff;color: #008dd3;}
  .jubao .a2{width: 2.1rem;height: 0.56rem;margin-left: 0.4rem;}



</style>
