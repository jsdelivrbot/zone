<template>
    <div class="setting">
        <my-header title="访问权限"></my-header>
        <div class="setting2">
        	<router-link :to="'/permission?gid='+this.$route.query.gid">
	            <div class="setting2-all">
	                <div class="sl"></div>
	                <div class="sr">
	                    <ul class="sr-ul">
	                        <li class="sr-ul-li1">内容权限</li>
	                        <li class="sr-ul-li2" v-text="this.listData.brower_level==-1?'公开(群组内容公开,所有用户可见)':(this.listData.brower_level==1?'秘密(群组内容秘密,所成员可见)':(this.listData.brower_level==2?'会员组(群组内指定会员组及成员可见)':''))">111</li>
	                    </ul>
	                    <p class="sr-ul-p1"></p>
	                </div>
	            </div>
            </router-link>
            <router-link :to="'/join?gid='+this.$route.query.gid">
	            <div class="setting2-all">
	                <div class="sl fenlei"></div>
	                <div class="sr bt0">
	                    <ul class="sr-ul">
	                        <li class="sr-ul-li1">加入方式</li>
	                        <li class="sr-ul-li2" v-text="this.listData.need_invite==0?'任何人均可加入':(this.listData.need_invite==1?'需管理员批准后方可加入':(this.listData.need_invite==2?'邀请加入':''))"></li>
	                    </ul>
	                    <p class="sr-ul-p1"></p>
	                </div>
	            </div>
            </router-link>
        </div>
    </div>
</template>

<script>
	import { getOpenUrl ,getToken} from "../../../assets/js/common.js"
	import { setCookie, getCookie } from '../../../assets/js/cookie.js'
	export default {
		data() {
			return {
				listData:{}

			};
		},
		mounted() {
			this.$http.get(getOpenUrl() + "groupPower", {
        headers: {						'Authorization': 'Bearer ' + getToken()					},
				params: {
					gid: this.$route.query.gid
				}
			}).then((res) => {
				this.listData = res.body.data
			});
		},
		methods:{
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .setting2{width:100%;overflow:hidden;box-shadow:0 0 5px #ebebeb;padding-top: 1rem;}
  .setting2-all{overflow:hidden;}
  .setting2 .sl{width:0.99rem;height:1.14rem;float:left;background:url(../../../images/qx.png) no-repeat 50% 50%;background-size:0.36rem 0.34rem;padding-left: 0.2rem;}
  .setting2 .fenlei{width:0.99rem;height:1.14rem;float:left;background:url(../../../images/fenlei.png) no-repeat 50% 50%;background-size:0.35rem 0.35rem;}
  .setting2 .sr{width:calc(100% - 1.19rem);height:1.14rem;border-bottom:1px solid #ebebeb;float:right;}
  .setting2 .bt0{border-bottom:0;}
  .setting2 .sr-ul{overflow:hidden;float:left;}
  .setting2 .sr-ul-li1{font-size:0.22rem;color:#008dd3;margin-top:0.23rem;line-height:0.37rem;}
  .setting2 .sr-ul-li2{font-size:0.20rem;color:#575757;line-height:0.36rem;}
  .setting2 .sr-ul-p1{width:0.12rem;height:1.14rem;background:url(../../../images/backright.png) no-repeat 0 50%;background-size:0.12rem 0.24rem;float:right;padding-right: 0.2rem;}




</style>
