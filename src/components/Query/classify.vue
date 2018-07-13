<template>
	<div class="first">
		<my-header title="选择分类"></my-header>
		<div class="nav" style="padding-top:0.3rem;height: calc(100% - 1rem);position: relative;bottom: 0;">

			<ul class="navl">

				<a href="javascript:;" @click="getCData(list.catid)" v-for="(list, index) in TData" :class="pcatid == list.catid ? 'active' : ''"><li :data-cid="list.catid" :style="list.caticon ? 'background:url('+list.caticon+') no-repeat 0 50%;background-size: 0.25rem auto' : 'background:none'">{{list.catname}}</li></a>

</ul>
			<ol class="navr" :id="data.catid" v-for="(data, index) in CData" :style="pcatid == data.pcatid ? 'display:block' : 'display:none;'">
				<a href="javascript:;" v-for="(list, index) in data.list" @click="checkCat(list.catid, list.parentid)"><li>{{list.catname}}</li></a>
			</ol>
		</div>
		<div class="load" style="display:none;">
			<div class="load-container load4"><div class="loader"> <i></i></div></div>
		</div>
		<pop style="text-align: center" class="tips" v-show="istip" :title="tipmsg"></pop>
    <load v-show="isload"></load>
	</div>
</template>
<script>
import qs from 'qs'
import {setCookie,getCookie} from '../../assets/js/cookie.js'
import {getOpenUrl,getToken} from '../../assets/js/common.js'

export default {
name:'first',
	data () {
		return {
		  isload:false,
			pcatid: 0,
			catid: 0,
			TData: {},
			CData: [],
			istip: false,
			tipmsg: ''
		};
	},
	mounted(){
		var pid = this.$route.query.pid;
		var cid = this.$route.query.cid;
		this.pcatid = !!pid ? pid : 0;
		this.catid  = !!cid ? cid : 0;
		if (typeof this.TData.length == 'undefined'){
			this.getData();
		}
	},
	methods: {
		getData (){
			this.$http.get(getOpenUrl() + "getCategoryWork", {
				headers:{
					'Authorization' : 'Bearer '+getToken()
				},
				params:{
					catid: 0,
				},
			}).then((res)=>{
				this.TData = res.body.data;
				if (!this.pcatid || typeof this.pcatid == 'undefined' || this.pcatid == 'undefined'){
					this.pcatid = this.TData[0].catid
				}
				this.getCData(this.pcatid);
			});
		},
		getCData (catid){
			this.pcatid = catid;
			var isCurData = false;
      console.log(this.CData);
			$.each(this.CData, function(key, val){
				if (val.pcatid == catid && val.list){
					isCurData = true;
					return;
				}
			});
			if (isCurData){
				return;
			}
			this.isload = true;
			//$('.load').show();
			this.$http.get(getOpenUrl() + "getCategoryWork", {
				headers:{
					'Authorization' : 'Bearer '+getToken()
				},
				params:{
					catid: catid,
				},
			}).then((res)=>{
				var list = res.body.data;
				if (res.body.code == '0000'){
					var data = {};
					data.pcatid = list[0].parentid;
					data.list   = list;
					this.CData.push(data);
				}
        this.isload = false;
				$('.load').hide();
			});
		},
		checkCat (catid, parentid){
			if (catid > 0){
				location.href = '#/submit?pid='+parentid+'&cid='+catid;
			}else{
				this.tipmsg = '请选择分类';
				this.istip  = true;
				setTimeout(function(){
					$('.tips').hide();
					this.istip  = false;
				},1000);
			}
		}
	}
}
</script>
<style scoped>

.header{position: fixed;top: 0;width: 100%;}
.nav{position: absolute;top: 0.7rem;bottom:0.98rem;color: #242424;font-size:0.22rem;display: flex;width: 100%;height: calc(100% - .88rem);}
.navl{width: 1.85rem;float: left;box-shadow: 0 0 0.2rem #afe3fc;overflow:hidden;overflow-y:auto;}
.navl li{    overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;height: 0.8rem;line-height: 0.8rem;background: url(../../images/age.png) no-repeat 0 50%;background-size: 0.25rem auto;padding-left: 0.37rem;}
.navl a{color:#242424;display: block;width: 1.65rem;height: 0.8rem;padding-left: 0.2rem;}
.navl a:hover{color: #fff;background: #54c2f0;}
.navl li:hover{color: #fff;background: #54c2f0 url(../../images/w.png) no-repeat 0 50%;background-size: 0.25rem 0.2rem;}
.navl a.active{color: #fff;background: #54c2f0;}

.catbox{float:left;flex: 1;}
.navr{float: left;flex: 1;margin-left: 0.55rem;overflow:hidden;overflow-y:auto;}
.navr li{height: 0.8rem;line-height: 0.8rem;}
.navr a{color: #242424;display: block;height: 0.8rem;border-bottom: 0.01rem solid #ebebeb;}
</style>
