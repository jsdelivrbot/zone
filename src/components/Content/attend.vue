<template>
    <div class="manage">
        <my-header title="报名管理"></my-header>
        <div v-for="(action,index) in actionData"  style="height: calc(100% - 1.88rem);overflow-y: auto;position: relative;bottom: 0rem;top: 1rem;">
            <div class="manage-all">
                <ul class="ul1">
                    <li class="li1">
                        <label>
                            <input type="checkbox" ref="check" @click="dian(action.id)" :value="action.id"><b></b>
                        </label>
                    </li>
                    <li class="li2">{{action.contact.msg}}</li>
                    <li class="li3">{{action.cTime}}</li>
                </ul>
                <div class="man">
                    <div class="man-t">
                        <ul class="man1">
                            <li class="li1">真实姓名：</li>
                            <li class="li2">{{action.contact.realname}}</li>
                        </ul>
                        <ul class="man2">
                            <li class="li1">手机号：</li>
                            <li class="li2">{{action.contact.phone}}</li>
                        </ul>
                    </div>
                    <div class="man-b">
                        <ul class="man3">
                            <li class="li1">微信：</li>
                            <li class="li2">{{action.contact.weichat}}</li>
                        </ul>
                        <ul class="man4">
                            <li class="li1">状态：</li>
                            <!--color:index+1==1?orange:((index+1==2)?yellow:((index+1==3)?red:other))-->
                            <li class="li2 cb" v-text="action.status==1?'已取消':(action.status==2?'审核中':(action.status==3?'已参加':action.status==4?'被驳回':action.status==5?'被删除':''))"></li>
                        </ul>
                    </div>
                </div>
                <ul class="man-down">
                    <li class="li1">备注：</li>
                    <li class="li2">111</li>
                </ul>
            </div>
            <div class="line"></div>
        </div>
        <div class="footer">
            <ul class="ul1">
                <li class="li1">
                    <label>
                        <input type="checkbox" @click="selectAll" ref="checkall"><b></b>
                    </label>
                </li>
                <li class="li2">全选</li>
                <li class="f-r">
                    <span @click="select(1)">批准</span><span @click="select(1)">需完善</span><span @click="select(1)">拒绝</span>
                </li>
            </ul>

        </div>
        <pop class="tip" :title="tip"></pop>
    </div>
</template>

<script>
import { getOpenUrl ,getToken} from "../../assets/js/common.js"
import {setCookie,getCookie} from '../../assets/js/cookie.js'
import qs from 'qs'
export default {
    name:'manage',
        data () {
             return {
             	tip:'',
                actionData:{},
                selectArr: []
             };
        },
        mounted(){
          setTimeout(()=>{
            this.$root.eventHub.$emit('newsSuccess');
          },500)
        	$('.tip').hide();
         	this.$http.get(getOpenUrl()+"ActionList", {
				params: {
//					this.$route.query.id,
					tid:this.$route.query.tid
				},
				header:{
					'Authorization':'Bearer '+getToken()
				}
			}).then((res) => {
				this.actionData = res.body.data;
			})
        },
        methods: {
            selectAll() {
            	this.$mount(this.$refs.check);
         		for(var i=0;i<this.$refs.check.length;i++){
         			if(this.$refs.checkall.checked){
	         			this.$refs.check[i].checked=true
	         		}else{
	         			this.$refs.check[i].checked=false
	         		}
         		}
			},
			dian(){
				for(var i=0; i<this.$refs.check.length;i++){
					if(this.$refs.check[i].checked == false){
						this.$refs.checkall.checked = false;
						return;
					}
					this.$refs.checkall.checked = true;
				}
			},
			submit(){
				this.$http.get(getOpenUrl()+"ActionList", {
					params: {
	//					this.$route.query.id,
						tid:this.$route.query.tid
					},
					headers:{
						'Authorization':'Bearer '+getToken()
					}
				}).then((res) => {
					this.actionData = res.body.data;
				})
			},
			select(type){
				var idData=[];
				for(var i=0; i<this.$refs.check.length;i++){
					if(this.$refs.check[i].checked){
						idData.push(this.$refs.check[i].value)
					}
				}
				console.log(idData)
				this.$http.post(getOpenUrl()+"ActionSet", {

	//					this.$route.query.id,
						tid:this.$route.query.tid,
						eid:idData,
						type:type,
				},{
					headers:{
						'Authorization':'Bearer '+getToken()
					}
				}).then((res) => {
					if(res.body.code==0){
						this.tip = '操作成功';
	                   	$('.tip').show();
	                   	setTimeout(function(){
	                     	$('.tip').hide();
	                   	},1000)
					}else{
						this.tip = res.body.error_description
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
<style scoped>
    .manage-all{width:6rem;margin:0 auto;overflow:hidden;}
    label{width: 0.18rem;height: 0.18rem;display: block;position:relative;z-index:1;top:50%;transform: translateY(-50%);}
    input[type="checkbox"] {display: none;position:absolute;}
	input[type="checkbox"]+b {border: 1px solid #e0e0e0;position:absolute;display: inline-block;width: 0.18rem;height: 0.18rem;cursor: pointer;border-radius: 0.05rem;vertical-align: middle;}
	input[type="checkbox"]:checked+b {background: #008dd3}

    .manage-all .ul1{height:0.76rem;line-height:0.76rem;border-bottom:1px solid #ebebeb;display:flex;width:100%;}
    .manage-all ul li{float:left;}
    .manage-all .ul1 .li1{width:0.3rem;height:0.76rem;float:left;position: relative;margin-right:0.1rem;}
    .manage-all .ul1 .li2{color:#008dd3;font-size:0.22rem;flex:1;}
    .manage-all .ul1 .li3{color:#949494;font-size:0.2rem;float:right;background:url(../../images/fbsj.png) no-repeat 0 50%;background-size:0.18rem 0.18rem;padding-left:0.28rem;}

    .man ul{overflow:hidden;width:2.9rem;display:flex;float:left;}
    .man1,.man3{border-right:1px solid #ebebeb;}
    .man .li1{height:0.84rem;font-size:0.22rem;color:#949494;line-height:0.84rem;padding-left:0.1rem;}
    .man .li2{height:0.84rem;font-size:0.22rem;color:#292929;line-height:0.84rem;float:right;flex:1;text-align:right;padding-right:0.15rem;}
    .man-t,.man-b{float:left;height:0.84rem;border-bottom:1px solid #ebebeb;}
    .man-t .man2{width:2.9rem;}
    .man-b .man4{width:2.9rem;}
    .man4 .cb{color:#008dd3;}

    .man-down{height:0.85rem;line-height:0.85rem;font-size:0.22rem;color:#949494;padding-left:0.1rem;}
    .man-down .li2{height:0.85rem;line-height:0.85rem;font-size:0.22rem;color:#292929;}

    .footer{position:fixed;bottom:0;left:0;height:0.88rem;background:#f6f6f6;width:100%;border-top:1px solid #ebebeb;}
    .footer .ul1{height:0.88rem;line-height:0.88rem;display:flex;width:100%;width:5rem;margin:0 auto;}
    .footer .ul1 .li1{width:0.3rem;height:0.88rem;float:left;position: relative;margin-right:0.1rem;}
    .footer .ul1 .li2{width:0.39rem;color:#a2a2a2;font-size:0.16rem;}
    .footer .ul1 .f-r{margin-left:0.17rem;margin-top:0.23rem;}
    .footer .ul1 .f-r span{width:1.1rem;height:0.42rem;background:#54c2f0;color:#fff;border-radius:0.21rem;display:block;text-align:center;line-height:0.42rem;font-size:0.18rem;display:block;float:left;margin-left:0.14rem;}
</style>
