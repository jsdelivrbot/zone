<template>
    <div class="setting">
        <div class="setting1">
            <div class="setting-all">
                <a href="javascript:history.back(-1);" class="a1"></a>
                <span class="forget">圈子设置</span>
                <a class="a2" @click="toggle()"></a>
            </div>
        </div>
        <div class="setting2">
            <router-link :to="'/jiben?gid='+this.$route.query.gid">
            	<div class="setting2-all">
	                <div class="sl"></div>
	                <div class="sr">
                    	<ul class="sr-ul">
	                        <li class="sr-ul-li1">基本设置</li>
	                        <li class="sr-ul-li2">设置圈子的基本信息</li>
	                    </ul>
	                    <p class="sr-ul-p1"></p>
	                </div>
	            </div>
            </router-link>
            <router-link :to="'/quanxian?gid='+this.$route.query.gid">
	            <div class="setting2-all">
	                <div class="sl qx"></div>
	                <div class="sr">
	                    <ul class="sr-ul">
	                        <li class="sr-ul-li1">访问权限</li>
	                        <li class="sr-ul-li2">设置谁能访问这个圈子</li>
	                    </ul>
	                    <p class="sr-ul-p1"></p>
	                </div>
	            </div>
            </router-link>
            <router-link v-if="guanliShow" :to="'/guanli?gid='+this.$route.query.gid+'&name='+this.$route.query.name">
	            <div class="setting2-all">
	                <div class="sl cygl"></div>
	                <div class="sr">
	                    <ul class="sr-ul">
	                        <li class="sr-ul-li1">成员管理</li>
	                        <li class="sr-ul-li2">管理圈子里的成员</li>
	                    </ul>
	                    <p class="sr-ul-p1"></p>
	                </div>
	            </div>
            </router-link>
            <router-link :to="'/gonggao?gid='+this.$route.query.gid">
	            <div class="setting2-all">
	                <div class="sl fabu"></div>
	                <div class="sr">
	                    <ul class="sr-ul">
	                        <li class="sr-ul-li1">发布公告</li>
	                        <li class="sr-ul-li2">发布圈子的公告</li>
	                    </ul>
	                    <p class="sr-ul-p1"></p>
	                </div>
	            </div>
            </router-link>
            <router-link :to="'/tiezi?gid='+this.$route.query.gid">
	            <div class="setting2-all">
	                <div class="sl fenlei"></div>
	                <div class="sr bt0">
	                    <ul class="sr-ul">
	                        <li class="sr-ul-li1">帖子分类</li>
	                        <li class="sr-ul-li2">管理群内帖子的分类</li>
	                    </ul>
	                    <p class="sr-ul-p1"></p>
	                </div>
	            </div>
            </router-link>
        </div>
        <div class="mark" v-show="show"></div>
        <div class="up" v-show="show">
            <div class="up-all">
                <ul>
                    <li class="li1"><a class="a3" @click="toggle()">取消</a></li>
                    <li class="li2"><a class="a4" @click="del()">确定删除</a></li>
                </ul>
            </div>
        </div>
        <load v-show="isload"></load>
        <pop class="tip" :title="tip"></pop>
    </div>
</template>

<script>
	import { getOpenUrl ,getToken} from "../../assets/js/common.js"
	import {setCookie,getCookie} from '../../assets/js/cookie.js'
	export default {
		data(){
			return{
			  isload:false,
				tip:'',
				show:false,
        guanliShow:false
			}
		},
		mounted(){
			$('.tip').hide();

			if(this.$route.query.level==1||this.$route.query.system==1){
			  this.guanliShow = true;
      }
		},
		methods:{
			toggle(){
				this.show=!this.show
			},
			del(){
			  this.isload = true;
				this.$http.get(getOpenUrl() + "groupDisband", {
					params:{
						gid: this.$route.query.gid
					},
					headers: {						'Authorization': 'Bearer ' + getToken()					}
				}).then((res) => {
          this.isload = false;
					if(res.body.code==0){
						this.tip = '删除成功';
	                   	$('.tip').show();
	                   	setTimeout(function(){
	                     	$('.tip').hide();
	                   	},1000)
						this.$router.push('/myqz');
            this.$root.eventHub.$emit('tjqzSuccess');
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
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .setting1{height: 0.7rem;position: relative;box-shadow:0 0 5px #ebebeb;padding-top: 0.3rem;}
  .setting-all{padding:0 0.2rem;overflow:hidden;}
  .setting .a1{width: 0.18rem;height: 0.7rem;background: url(../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;display: block;}
  .setting .a2{width: 0.34rem;height: 0.7rem;background: url(../../images/del.png) no-repeat 0 50%;background-size: 0.28rem 0.28rem;float:right;display: block;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}



  .setting2{width:100%;overflow:hidden;box-shadow:0 0 5px #ebebeb;}
  .setting2-all{overflow:hidden;padding: 0 0.2rem;}
  .setting2 .sl{width:0.99rem;height:1.14rem;float:left;background:url(../../images/jiben.png) no-repeat 50% 50%;background-size:0.36rem 0.34rem;}
  .setting2 .qx{width:0.99rem;height:1.14rem;float:left;background:url(../../images/qx.png) no-repeat 50% 50%;background-size:0.3rem 0.32rem;}
  .setting2 .cygl{width:0.99rem;height:1.14rem;float:left;background:url(../../images/cygl.png) no-repeat 50% 50%;background-size:0.33rem 0.29rem;}
  .setting2 .fabu{width:0.99rem;height:1.14rem;float:left;background:url(../../images/fabu.png) no-repeat 50% 50%;background-size:0.36rem 0.36rem;}
  .setting2 .fenlei{width:0.99rem;height:1.14rem;float:left;background:url(../../images/fenlei.png) no-repeat 50% 50%;background-size:0.35rem 0.35rem;}
  .setting2 .sr{width:calc(100% - 0.99rem);height:1.14rem;border-bottom:1px solid #ebebeb;float:right;}
  .setting2 .bt0{border-bottom:0;}
  .setting2 .sr-ul{overflow:hidden;float:left;}
  .setting2 .sr-ul-li1{font-size:0.22rem;color:#008dd3;margin-top:0.23rem;line-height:0.37rem;}
  .setting2 .sr-ul-li2{font-size:0.20rem;color:#575757;line-height:0.36rem;}
  .setting2 .sr-ul-p1{width:0.12rem;height:1.14rem;background:url(../../images/backright.png) no-repeat 0 50%;background-size:0.12rem 0.24rem;float:right;}

  .up{width:6.4rem;height:4.9rem;background:url(../../images/jiesan.png) no-repeat;background-size:cover;position:absolute;top:50%;left:50%;margin-top:-2.45rem;margin-left:-3.2rem;z-index:10;border-radius:0.05rem;}
  .up-all{height:100%;margin:0 auto;}
  .up-all ul{width:4.4rem;height:0.56rem;margin:0 auto;position: absolute;bottom: 1rem;left: 50%;margin-left: -2.2rem;}
  .up-all ul li{width:2.08rem;height:0.54rem;float:left;border-radius:0.28rem;margin-top: 0.2rem;}
  .up-all ul li a{display:block;width:2.08rem;height:0.54rem;line-height:0.54rem;color:#008dd3;font-size:0.22rem;display:block;text-align:center;border-radius:0.28rem;}
  .up .up-all .a3{width:2.08rem;height:0.54rem;color:#008dd3;border: 1px solid #008dd3;}
  .up-all .a4{width:2.08rem;height:0.54rem;color:#fff;background:#008dd3;}
  .up-all .li2{float:right;}
  .mark{width: 100%;height: 100%;position: fixed;top: 0;left: 0;background:rgba(0,0,0,0.3);}


</style>
