<template>
    <div class="enter">
        <div class="header">
	        <a class="a1" href="javascript:history.back(-1);"></a>
	        <span class="forget">报名参加</span>
	        <a class="a2" @click="save()">保存</a>
	    </div>
        <div class="enter-c">
            <ul class="enter-ul">
                <li class="li1">注意：</li>
                <li class="li2">参加此活动将扣除<span>{{this.topic.credit}}</span>积分,并且需自己承担自己的支出预计<span>{{this.topic.cost}}</span>元左右</li>
            </ul>
        </div>
        <div class="line"></div>
        <div class="enter-b">
            <div class="enter-b-l">
                <ul>
                    <li class="li2" v-if="friend==1">*</li>
                    <li class="li1">真实姓名：</li>

                </ul>
                <div class="text"><input type="text" v-model="name"/></div>
            </div>
            <div class="enter-b-l">
                <ul>
                    <li class="li2" v-if="allow==1">*</li>
                    <li class="li1">手机号：</li>

                </ul>
                <div class="text"><input type="text" v-model="phone"/></div>
            </div>
            <div class="enter-b-l">
                <ul>
                    <li class="li2" v-if="weixin==1">*</li>
                    <li class="li1">微信：</li>

                </ul>
                <div class="text"><input type="text" v-model="weichat"/></div>
            </div>
            <div class="enter-b-l">
                <ul>
                    <li class="li1">留言：</li>
                </ul>
                <div class="text"><textarea v-model="msg"></textarea></div>
            </div>
        </div>
        <pop style="text-align: center" class="tip" :title="tip"></pop>
    </div>
</template>

<script>
import { getOpenUrl ,getToken} from "../../assets/js/common.js"
import {setCookie,getCookie} from '../../assets/js/cookie.js'
import qs from 'qs'
export default {
        data () {
             return {
             	tip:"",
                listData:{},
                topic:{},
                name:'',
                phone:'',
                weichat:'',
                msg:'',
                friend:'',
                allow:'',
                weixin:''
             };
         },
         mounted(){
         	$('.tip').hide();
         	this.$http.get(getOpenUrl()+"topicAction", {
         		params:{
					tid:this.$route.query.tid,
         		},
				headers:{
					'Authorization':'Bearer '+getToken()
				}
			}).then((res) => {
				this.topic = res.body.data;
				this.friend=this.topic.opts.friend;
				this.allow=this.topic.opts.allow;
				this.weixin=this.topic.opts.weichat;
			})

         },
         methods: {
            save(){
            	var num = /^1[34578]\d{9}$/;
            	if(this.phone == '') {
					this.tip = "请输入手机号";
					$('.tip').show();
					setTimeout(function() {
						$('.tip').hide();
					}, 1000)
					return;
				}
				if(!num.test(this.phone)) {
					this.tip = "手机号格式不正确";
					$('.tip').show();
					setTimeout(function() {
						$('.tip').hide();
					}, 1000)
					return;
				}
            	if(this.friend==1&&this.name==''){
					this.tip = "带*的是必填项";
					$('.tip').show();
					setTimeout(function() {
						$('.tip').hide();
					}, 1000)
					return;
				}
            	if(this.allow==1&&this.phone==''){
					this.tip = "带*的是必填项";
					$('.tip').show();
					setTimeout(function() {
						$('.tip').hide();
					}, 1000)
					return;
				}
            	if(this.weixin==1&&this.weichat==''){
					this.tip = "带*的是必填项";
					$('.tip').show();
					setTimeout(function() {
						$('.tip').hide();
					}, 1000)
					return;
				}else{
					this.$http.post(getOpenUrl()+"topicActionDo", {
//
						tid:this.$route.query.tid,
						realname:this.name,
						allow:this.phone,
						weichat:this.weichat,
						msg:this.msg,
					},{
						headers:{
							'Authorization':'Bearer '+getToken()
						}
					}).then((res) => {
						this.listData = res.body.data;

						if(res.body.code==0){
							this.tip = "提交成功";
							$('.tip').show();
							setTimeout(function() {
								$('.tip').hide();
							}, 1000)
							this.$router.go(-1)
						}else{
							this.tip = res.body.error_description;
							$('.tip').show();
							setTimeout(function() {
								$('.tip').hide();
							}, 1000)
						}
					})
				}

            }
        }
    }
</script>
<style scoped>
    .header{height: 0.88rem;padding: 0 0.2rem;position: relative;box-shadow:0 0 5px #ebebeb;padding-top: 0.3rem;}
    .header .a1{width: 0.18rem;height: 0.34rem;display: block;background: url(../../images/back.png) no-repeat;background-size: cover;float:left;margin-top:0.27rem;}
    .header .a2{display: block;font-size:0.2rem;color:#168ed0;float:right;line-height:0.88rem;}
    .forget{line-height:0.88rem;font-size:0.34rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}

    .enter-c{font-size:0.22rem;color:#008dd3;height:1.2rem;}
    .enter-ul{width:6rem;margin:0 auto;overflow:hidden;display:flex;}
    .enter-ul li{float:left;height:1.2rem;margin-top:0.24rem;}
    .enter-ul .li1{float:left;line-height:0.32rem;height:0.32rem;}
    .enter-ul .li2{float:left;flex:1;line-height:0.32rem;height:0.72rem;}

    .enter-b{width:6rem;margin:0 auto;}
    .enter-b-l{margin-top:0.29rem;overflow:hidden;}
    .enter-b-l ul{height:0.54rem;width:1.41rem;float:left;text-align:right;}
    .enter-b-l ul li{font-size:0.22rem;float:right;line-height:0.54rem;}
    .enter-b-l .li2{color:#1094d6;}

    .text{float:left;border:0.02rem solid #d1d1d1;border-radius:0.05rem;margin-left:0.1rem;}
    .text input{display:block;height:0.54rem;width:4.31rem;padding-left:0.1rem;}
    .text textarea{width:4.31rem;height:1.98rem;padding-left:0.1rem;}

</style>
