<template>
    <div class="listcircle" ref="a1" style="overflow: auto;">
    	<div class="header-top">
    		<a href="javascript:history.back(-1);" class="a1"></a>
            <!--<router-link :to="'/listcircle?gid='+this.$route.query.gid" class="a1"></router-link>-->
            <span class="forget">圈子详情</span>
            <div class="ld" @click="toggle1()"></div>
        </div>

        <div class="listbanner" :style="'background-image:url('+this.groupData.backdrop+')'">
        	<div class="listmark" :style="'background:'+(this.groupData.cover ? this.groupData.cover : '#2cafbb')+(groupData.backdrop ? ';opacity:0.4;' : ';opacity:1')"></div>
			<div class="header">
                <div class="header-bottom">
                    <div class="header-bottom-top">
                        <div class="tip-bottom-l">
                            <img :src="this.groupData.logo"/>
                        </div>
                        <div class="tip-bottom-r">
                            <ul>
                                <li class="li1">
                                    <span class="sp1">{{this.groupData.name}}</span>
                                    <div class="sp2">
										<li class="li4">
											<label>
					                            <input type="checkbox" ref="check" @click="collect()"><b></b>
					                        </label>
										</li>
									</div>
                                </li>
                                <li class="li2" v-html="this.groupData.intro"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="header-bottom-bottom">
                        <ul>
                            <li class="li1">成员数：</li><li class="li1">{{this.groupData.membercount}}</li>
                            <li class="li2 mt70">帖子数：</li><li class="li1">{{this.groupData.threadcount}}</li>
                            <li class="li3" v-show="yijiaru1" :style="'color:'+this.groupData.cover ">已加入</li>
							<li class="li3" v-show="jiaruquanzi" @click="join()">+加入圈子</li>
							<!--<li class="li3" style="background:none;color: #EEEEEE;" v-show="yijiaru">√已加入</li>-->
							<li class="li3" style="background:none;color: #EEEEEE;" v-show="shenhe">已提交申请等待审核</li>
                        </ul>
                    </div>
                    <!--<div class="header-bottom-down" v-html="this.groupData.intro"></div>-->
                </div>
            </div>
        </div>
        <div class="navlist" style="position: absolute;top: 3rem;width: 100%;">
	        <div class="nav1">
	            <router-link :to="'/people?gid='+this.$route.query.gid">
	            	<ul class="nav1-tip">
	                    <li class="nav1-li1">圈子成员</li>
	                    <li class="nav1-li2"></li>
	                    <li class="nav1-li3">(共<span>{{this.peopleData.memberCount}}</span>名成员)</li>
	                </ul>
	            </router-link>
	        </div>
	        <div class="nav2">
	            <div class="nav2-content mt0">

		                <dl v-for="(data,index) in per[0]">
		                	<router-link :to="'/yesfriend?uid='+data.uid" style="color: #242424;">
			                    <dt><img  v-lazy="data.face"/></dt>
			                    <dd>{{data.uname}}</dd>
		                    </router-link>
		                </dl>
                    <dl v-for="(data,index) in per[1]">
                        <router-link :to="'/yesfriend?uid='+data.uid" style="color: #242424;">
                          <dt><img  v-lazy="data.face"/></dt>
                          <dd>{{data.uname}}</dd>
                        </router-link>
                    </dl>
                    <dl @click="toggle3();friend()">
                        <dt><img src="../../images/yq.png"/></dt>
                    </dl>
	            </div>
	        </div>
	        <div class="line"></div>
	        <div class="nav1" @click="fx()">
	            <ul class="nav1-tip bt0">
	                <li class="nav1-li1">分享圈子</li>
	                <li class="nav1-li2"></li>
	            </ul>
	        </div>
	        <div class="line" v-if="this.groupData.is_level==1||this.groupData.is_level==2||this.groupData.is_system==1"></div>

	        <router-link :to="'/setting?gid='+this.$route.query.gid+'&name='+this.groupData.name+'&level='+this.groupData.is_level+'&system='+this.groupData.is_system" v-if="this.groupData.is_level==1||this.groupData.is_level==2||this.groupData.is_system==1">
	        	<div class="nav1">
		            <ul class="nav1-tip bt0">
		                <li class="nav1-li1">圈子设置</li>
		                <li class="nav1-li2"></li>
		            </ul>
		        </div>
	        </router-link>
	        <div class="line"></div>
	        <div>
	            <div class="nav1">
	                <ul class="nav1-tip">
	                    <li class="nav1-li1">圈子介绍</li>
	                </ul>
	            </div>
	            <div class="nav2 bt0">
	                <span class="nav2-content h" v-html="this.groupData.intro"></span>
	            </div>
	        </div>
	        <div class="line" v-if="this.groupData.is_level!=1&&this.groupData.is_join==1"></div>
	        <div class="nav1" @click="exit1()" v-if="this.groupData.is_level!=1&&this.groupData.is_join==1">
	            <ul class="nav1-tip bt0">
	                <li class="nav1-li1">退出圈子</li>
	                <li class="nav1-li2"></li>
	            </ul>
	        </div>
	        <div class="line" v-if="this.groupData.is_level!=1&&this.groupData.is_join==1"></div>
        </div>
        <!--邀请-->
        <div class="yaoqing" ref="yaoqing">
            <div class="yaoqing-t">
                <p><span class="sp1">邀请好友</span></p>
            </div>
            <div class="yaoqing-b">
                <div class="yaoqing-list" v-for="(list,index) in friendData" :key="index">
                    <p ref="p">{{list.uname}}<span>(<span>{{list.note}}</span>)</span></p>
                    <ul class="yaoqing-right">
                        <li class="li4">
                            <label>
                                <input type="checkbox" ref="check" :value="list.hao_id"><b></b>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="yaoqing-f">
                <p @click="yq();submit1()"><span class="fsp1">确定</span></p>
            </div>
        </div>
        <!--邀请-->
        <div class="mark" v-show="yaoqing" @click="yq()"></div>
        <!--举报-->
        <div class="mark" v-show="isshow" @click="jb()"></div>
        <!--验证信息-->
        <div class="jubao" v-show="isshow">
	        <div class="jubaoall">
	            <img src="../../images/jubaoquanzi.png"/>
	           <a :href="'#/report?type=group&id='+this.$route.query.gid" >举报</a>
	        </div>
	    </div>
	    <div class="yzall" v-show="forshow">
			<p class="forget1">
				<span class="sp1">圈子需要验证</span>
				<span class="sp2">
					<input type="text" ref="val"/>
				</span>
				<span class="sp3">
					<input type="button" name="" id="" value="提交" @click="submit()"/>
				</span>
			</p>

		</div>
		<!--分享-->
		<div class="mark" v-show="fenxiang" @click="fxnone"></div>
		<div class="fenxiang" v-show="fenxiang">
			<ul style="position: fixed;bottom: 0.3rem;width: 100%;">
				<li @click="xinlang" style="float: left;width: 33%;">
					<!--<network network="weibo">-->
						<img style="display: block;width: 0.44rem;height: 0.44rem;margin: 0 auto;" src="../../images/xinlang.png" />
						<input type="hidden" name="" id="title" :value="this.groupData.title" />
 						<!--<input type="hidden" name="" id="url" :value="this.listData.weibo_url" />-->
 						<input type="hidden" name="" id="url" value="http://zhongx.iwsoft.net" />
					<!--</network>-->
				</li>
				<li @click="qiuqiu" style="float: left;width: 33%;">
					<img style="display: block;width: 0.44rem;height: 0.44rem;margin: 0 auto;" src="../../images/qiuqiu.png" />
			 		<input type="hidden" name="" id="title" :value="this.groupData.title" />
			 		<input type="hidden" name="" id="url" value="http://zhongx.iwsoft.net" />
				</li>
				<li @click="qzone" style="float: left;width: 33%;">
					<img style="display: block;width: 0.44rem;height: 0.44rem;margin: 0 auto;" src="../../images/qzone.png" />
			 		<input type="hidden" name="" id="title" :value="this.groupData.title" />
			 		<input type="hidden" name="" id="url" value="http://zhongx.iwsoft.net" />
				</li>
				<!--<li @click="qzone" style="float: left;width: 25%;">
					<img style="display: block;width: 0.44rem;height: 0.44rem;margin: 0 auto;" src="../../images/wx.png" />
			 		<input type="hidden" name="" id="title" :value="this.listData.title" />
			 		<input type="hidden" name="" id="url" :value="this.listData.weibo_url" />
				</li>-->
			</ul>
		</div>
		<div class="mark" v-show="exit"></div>
		<div class="exit1" v-show="exit">
			<p>确定退出圈子吗</p>
			<ul>
				<li class="li1" @click="exit1()">取消</li>
				<li class="li2" @click="exitgroup()">确定</li>
			</ul>
		</div>
		<div class="mark" v-show="forshow" @click="toggle4()"></div>
		<pop class="tip" :title="tip"></pop>
    </div>
</template>

<script>
import qs from 'qs'
import { getOpenUrl,getToken } from "../../assets/js/common.js"
import {setCookie,getCookie} from '../../assets/js/cookie.js'
export default {
    name:'listcircle',
        data () {
             return {
             	tip:"",
             	forshow:false,
                show:false,
                isshow:false,
                yaoqing:false,
                fenxiang:false,
                groupData:{},
                outData:{},
                friendData:{},
                peopleData:[],
                peo:{},
                per:[],
                //加入圈子审核
				yijiaru:false,
				shenhe:false,
				jiaruquanzi:false,
				yijiaru1:false,
				exit:false
             };
         },
         mounted(){
         	$('.tip').hide();
         	$('.header-top').removeClass('on')

         	//获取圈子信息
			this.$http.get(getOpenUrl() + "groupData", {
				headers:{
						'Authorization':'Bearer '+getToken()
				},
				params: {
					gid: this.$route.query.gid
				}
			}).then((res) => {
				this.groupData = res.body.data;
				if(this.groupData.is_collect != 0) {
					this.$refs.check.checked = true
				}
				if(this.groupData.is_join==1&&this.groupData.is_level!=1){
					this.yijiaru1=true
				}
				if(this.groupData.is_join==0&&this.groupData.is_level!=1){
					this.jiaruquanzi=true;
				}
				if(this.groupData.is_level==0){
					this.shenhe=true;
					this.jiaruquanzi=false;
				}
//				console.log(this.groupData)
			});
			this.$http.get(getOpenUrl() + "groupMember", {
				headers:{
						'Authorization':'Bearer '+getToken()
				},
				params: {
					gid: this.$route.query.gid,
					type:3,
					page:1
				}
			}).then((res) => {
				this.peopleData = res.body.data;
				this.per.push(this.peopleData.user_admin)
				this.per.push(this.peopleData.user_plain)
			});
			//滚动距离
			$(window).scroll(function() {
				if($(window).scrollTop() > ($('.listbanner').height() - $('.header-top').height())) {
					$('.header-top').addClass('on')
				} else {
					$('.header-top').removeClass('on')
				}
			});

			//是否存在input焦点事件或图层打开事件
			$('input').focus(function(){
				//获取焦点
				let expireDays = 1000 * 60 * 60 ;
				setCookie("inputkey", 1, expireDays);
			});

			$(document).bind('click', function(e){
				var target = $(e.target);
				if(target.closest("input").length == 0 && target.closest('.a1').length == 0){
					setCookie("inputkey", '', -1);
				}
			});
        },
         methods: {
         	//分享
         	fx() {
				this.fenxiang = !this.fenxiang;
//				this.$refs.a1.style.height = "calc(100% - 1.64rem)";
//				this.$refs.a1.style.overflow = "hidden";
			},
			fxnone() {
				this.fenxiang = !this.fenxiang;
				this.$refs.a1.style.height = "100%";
				this.$refs.a1.style.overflow = "";
			},
			//分享到新浪微博
			xinlang() {
				var sharesinastring = 'http://service.weibo.com/share/share.php?title=' + $("#title").val() + '&url=' + $("#url").val();
				window.location.href = sharesinastring;
			},
			//分享到新浪微博
			qiuqiu() {
				var p = {
					url: location.href,
					/*获取URL，可加上来自分享到QQ标识，方便统计*/
					desc: '',
					/*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
					title: '',
					/*分享标题(可选)*/
					summary: '',
					/*分享摘要(可选)*/
					pics: '',
					/*分享图片(可选)*/
					flash: '',
					/*视频地址(可选)*/
					site: '满艺网',
					/*分享来源(可选) 如：QQ分享*/
					style: '201',
					width: 32,
					height: 32
				};
				//分享到QQ
				var sharesinastring = 'http://connect.qq.com/widget/shareqq/index.html?title=' + $("#title").val()  + '&url=' + $("#url").val() ;
				window.location.href = sharesinastring;
			},
			//分享到qq空间
			qzone() {
				var p = {
					url: location.href,
					showcount: '0',
					/*是否显示分享总数,显示：'1'，不显示：'0' */
					desc: '',
					/*默认分享理由(可选)*/
					summary: '',
					/*分享摘要(可选)*/
					title: 222,
					/*分享标题(可选)*/
					site: '满艺网',
					/*分享来源 如：腾讯网(可选)*/
					pics: '',
					/*分享图片的路径(可选)*/
					style: '203',
					width: 98,
					height: 22
				};
				//分享到QQ空间
				var sharesinastring = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=' + $("#title").val() + '&url=' + $("#url").val() ;
				window.location.href = sharesinastring;
			},
         	toggle1(){
                this.isshow = !this.isshow;
                this.$refs.a1.style.height="100%";
				this.$refs.a1.style.overflow="hidden";

            },
            jb(){
            	this.isshow = !this.isshow;
            	this.$refs.a1.style.height="100%";
				this.$refs.a1.style.overflow="";
            },
             toggle3(){
            	this.yaoqing = !this.yaoqing;
                this.$refs.yaoqing.style.display="block";
                this.$refs.a1.style.height="100%";
				this.$refs.a1.style.overflow="hidden";
            },
            yq(){
            	this.yaoqing = !this.yaoqing;
            	this.$refs.yaoqing.style.display="none";
                this.$refs.a1.style.height="100%";
				this.$refs.a1.style.overflow="";
            },
            //退出弹窗
            exit1(){
            	this.exit=!this.exit;
            },
            submit1(){
				this.idData = [];
				this.$mount(this.$refs)
				for(var i = 0; i < this.$refs.check.length; i++) {
					console.log(this.$refs.check[i].value)
					var ch = this.$refs.check[i].checked;
					console.log(ch)
					if(ch) {
						this.idData.push(this.$refs.check[i].value);
					}
				}
				if(this.idData.length==0){
            		this.tip = '请选择好友';
                   	$('.tip').show();
                   	setTimeout(function(){
                     	$('.tip').hide();
                   	},1000)
                   	return
            	}
				this.$http.post(getOpenUrl()+"joinFriendGroup", {
					gid:this.$route.query.gid,
					fids:this.idData,
				},{
					headers:{
						'Authorization':'Bearer '+getToken()
					}
				}).then((res) => {
					this.friendData = res.body.data;
					if(res.body.code==0){
						this.tip = '邀请成功';
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

			},
			toggle4() {
				this.forshow = !this.forshow;
				this.$refs.a1.style.height = "100%";
				this.$refs.a1.style.overflow = "";
			},
			//加入圈子
			join(){
				var gid=[];
				gid.push(this.$route.query.gid)
				console.log(gid)
				this.$http.post(getOpenUrl()+"joingroup", {
					gids:gid,
				},{
					headers:{
						'Authorization':'Bearer '+getToken()
					}
				}).then((res) => {
					if(res.body.code==0){
						this.tip = '提交成功';
	                   	$('.tip').show();
	                   	setTimeout(function(){
	                     	$('.tip').hide();
	                   	},1000)
	                   	this.jiaruquanzi=false;
					}else{
						this.forshow = true;
						this.$refs.a1.style.height = "100%";
						this.$refs.a1.style.overflow = "hidden";
					}
				})
			},
			//加入圈子验证
			submit() {
				var gid=[];
				gid.push(this.$route.query.gid)
				this.$http.post(getOpenUrl() + "joinValidateGroup", {
					gids: gid,
					text: this.$refs.val.value,
				},{
					headers:{
						'Authorization':'Bearer '+getToken()
					}
				}).then((res) => {
					this.joingroup = res.body.data;
					if(res.body.code == 0) {
						this.tip = '提交成功';
	                   	$('.tip').show();
	                   	setTimeout(function(){
	                     	$('.tip').hide();
	                   	},1000)
						this.forshow = false;
						this.shenhe=true;
						this.jiaruquanzi=false;
						this.forshow = false;
						this.$refs.a1.style.height = "100%";
						this.$refs.a1.style.overflow = "";
					}else{
						this.tip = res.body.error_description;
	                   	$('.tip').show();
	                   	setTimeout(function(){
	                     	$('.tip').hide();
	                   	},1000)
					}
				})
			},
			friend(){
				this.idData=[];
				this.$http.get(getOpenUrl()+"buddyList", {
					params: {
						type:1
					},
					headers:{
						'Authorization':'Bearer '+getToken()
					}
				}).then((res) => {
					this.friendData = res.body.data;
				})
			},
             exitgroup(){

             	this.$http.get(getOpenUrl() + "outGroup", {
             		headers:{
						'Authorization':'Bearer '+getToken()
					},
					params: {
						gid: this.$route.query.gid
					}
				}).then((res) => {
					this.exit=false
					if(res.body.code==0){
						this.tip = '退圈成功';
	                   	$('.tip').show();
	                   	setTimeout(function(){
	                     	$('.tip').hide();
	                     	window.location.href='#/circle'
	                   	},1000)

					}else{
						this.exit=false
						this.tip = res.body.error_description;
	                   	$('.tip').show();
	                   	setTimeout(function(){
	                     	$('.tip').hide();
	                   	},1000)
					}
				});

            },
            //收藏
			collect(){
				if(this.$refs.check.checked){
					this.status='add'
				}else{
					this.status='del'
				}
				this.$http.post(getOpenUrl() + "collectDo", {
					did: this.$route.query.gid,
					type: 2,
					status:this.status,
				},{
					headers:{
						'Authorization':'Bearer '+getToken()
					},
				}).then((res) => {
					if(res.body.code==0){
						if(this.$refs.check.checked){
							this.tip = '收藏成功';
		                   	$('.tip').show();
		                   	setTimeout(function(){
		                     	$('.tip').hide();
		                   	},1000)
						}else if(!this.$refs.check.checked){
							this.tip = '取消成功';
							$('.tip').show();
		                   	setTimeout(function(){
		                     	$('.tip').hide();
		                   	},1000)
						}
					}else{
						if (res.body.code == '1002'){
							this.tip = '请登录';
							$('.tip').show();
							setTimeout(()=>{
								$('.tip').hide();
								this.$router.push("/login")
							},1000)
						}else{
							this.tip = res.body.error_description;
							$('.tip').show();
							setTimeout(()=>{
								$('.tip').hide();
								this.$router.push("/login")
							},1000)
						}
					}
				})
			}
        },
        beforeRouteLeave (to, from, next) {
			//路由离开时
			var isInputKey = parseInt(getCookie('inputkey'));
			if (isInputKey == 1){
				setCookie("inputkey", '', -1);
				this.fenxiang=false;
//				this.toggle1();
//				this.toggle3();
				next(false)
			}else{
				next()
			}
		}
    }
</script>
<style scoped>
	/*头部固定*/
	.on{background: #008DD3;
	transition: background .3s;
	-moz-transition: background .3s;	/* Firefox 4 */
	-webkit-transition: background .3s;	/* Safari 和 Chrome */
	-o-transition: background .3s;	/* Opera */
	}
	.listmark{position: absolute;opacity:0.2;top: 0;left: 0;width: 100%;height: 3rem;}
	/*举报*/
	.jubao{width:5.36rem;height:3.8rem;position:absolute;top:50%;left:50%;margin-top:-1.9rem;margin-left:-2.68rem;z-index:12;}
    .jubaoall{width:5.36rem;height:3.8rem;position:relative;}
    .jubao img{width:5.36rem;height:3.8rem;display:block;position:absolute;top:0;left:0;}
    .jubao a{width:2.08rem;height:0.54rem;line-height:0.54rem;color:#fff;background:#008dd3;border-radius:0.27;font-size:0.22rem;display:block;text-align:center;border-radius:0.28rem;position:absolute;left:50%;margin-left:-1.04rem;bottom:0.3rem;}
	.mark{width:100%;height:100%;position:fixed;bottom:0;left:0;background:rgba(0,0,0,0.3);z-index:11;}
   	/*邀请弹窗*/
	.yaoqing{width:5.36rem;background:#fff;position:absolute;top:50%;left:50%;transform: translate(-50%,-50%);z-index:12;border-radius:0.05rem;box-shadow:0 0 0.2rem #b3dbef;display: none;}
    .yaoqing .sp1{height:0.84rem;line-height:0.84rem;color:#242424;font-size:0.28rem;display:block;text-align:center;}
    .yaoqing-t{border-bottom: 1px solid #ebebeb;}
    .yaoqing-b{width:4rem;margin:0 auto;height: 4.5rem;overflow: auto;}
    .yaoqing-list{width:4rem;border-bottom:1px solid #ebebeb;overflow:hidden;}
    .yaoqing-b p{font-size:0.22rem;color:#c7c7c7;line-height:0.79rem;float:left;padding-left:0.19rem;}
    .yaoqing-right {width:0.3rem;height:0.79rem;float:right;padding-right:0.2rem;}
    .yaoqing-right .li4{width:0.3rem;height:0.79rem;float:right;position: relative;}
    .yaoqing label{width: 0.3rem;height: 0.3rem;border-radius:50%;display: block;position:relative;z-index:1;top:50%;transform: translateY(-50%);}
    .yaoqing input[type="checkbox"] {display: none;position:absolute;}
	.yaoqing  input[type="checkbox"]+b {background: url(../../images/xzw.png)no-repeat;background-size:cover;border:none;position:absolute;display: inline-block;width: 0.3rem;height: 0.3rem;border-radius: 50%;vertical-align: middle;}
	.yaoqing input[type="checkbox"]:checked+b {background: url(../../images/xzb.png)no-repeat;background-size:cover;border:none;}
	.yaoqing-f{width: 100%;height: 1.17rem;background: #f6f6f6;font-size: 0.22rem;color: #fff;position: relative;}
	.yaoqing-f p{width: 2.1rem;height: 0.56rem;background: #008dd3;border-radius: 0.28rem;margin: 0 auto;text-align: center;line-height: 0.56rem;position: absolute;top: 50%;left:50%;transform: translate(-50%,-50%);z-index: 10;}

	label {
		width: 0.3rem;
		height: 0.3rem;
		display: block;
		z-index: 1;
	}

	input[type="checkbox"] {
		display: none;
		position: absolute;
	}

	input[type="checkbox"]+b {
		position: absolute;
		display: inline-block;
		width: 0.3rem;
		height: 0.3rem;

		vertical-align: middle;
	}

	input[type="checkbox"]:checked+b {
		background: url(../../images/xinred.png)no-repeat;
		background-size: cover;
		border: none;
	}
	.tip-bottom-r .li1 .sp2 {
		width: 0.3rem;
		height: 0.3rem;
		background: url(../../images/xin.png)no-repeat;
		background-size: cover;
		float: right;
		margin-top: 0.1rem;
	}
    .mt70{margin-left:0.7rem;}
    .listcircle{height:100%;position:relative;}
    .listbanner {
		z-index: 10;
		position: absolute;
		top: 0;
		width: calc(100% - 0.4rem);
		padding: 0 0.2rem;
		height: 3rem;
		margin: 0 auto;
		background-size: cover;
	}
	.header {
		position: relative;
	}
	.header-top a{width: 0.18rem;height: 0.7rem;display: block;background: url(../../images/backw.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
    .header-top,.header-bottom{overflow:hidden;}
    .header-top{
		position: fixed;
		width: calc(100% - 0.4rem);
		z-index: 11;
		padding: 0.3rem 0.2rem;
		transition: background .3s;
		-moz-transition: background .3s;	/* Firefox 4 */
		-webkit-transition: background .3s;	/* Safari 和 Chrome */
		-o-transition: background .3s;	/* Opera */
	}

    .ld{width:0.26rem;height:0.7rem;float:right;background:url(../../images/jb2.png) no-repeat 0 50%;background-size:0.26rem 0.3rem;}


    .header-bottom{color:#fff;margin-top: 1.08rem;}
    .tip-bottom-l {
      width: 1.08rem;
      height: 1.08rem;
      float: left;
      /*position: relative;*/
      /*overflow: hidden;*/
      border-radius: 50%;
      background:pink;
    }

    .tip-bottom-l img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      float: left;
      border-radius: 50%;
      /*position: absolute;*/
      /*top:50%;*/
      /*transform: translateY(-50%);*/
    }
    /*.tip-bottom-l{width: 1.08rem;height: 1.08rem;float: left;border-radius:50%;background:pink;}*/
    /*.tip-bottom-l img{width: 1.08rem;height: 1.08rem;float: left;border-radius:50%;}*/
    .tip-bottom-r .li1{/*line-height: 0.43rem;*/
		font-size: 0.22rem;
		padding-left: 0.2rem;
		/*margin-top: 0.18rem;*/
		overflow: hidden;}
    .tip-bottom-r .li1 span{display:block;width:4.22rem;}
    .tip-bottom-r .li1 .sp1{font-size: 0.22rem;float:left;}

    .tip-bottom-r .li2{line-height: 0.38rem;
		font-size: 0.2rem;
		padding-left: 0.2rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;}
    .header-bottom-top{overflow:hidden;}
    .header-bottom-bottom{line-height:0.43rem;height:0.43rem;margin-top:0.11rem;font-size:0.2rem;}
    .header-bottom-bottom li{float:left;}
    .header-bottom-bottom .li3{height:0.34rem;line-height:0.34rem;cursor:pointer;text-align:center;background:#fff;color:#008dd3;border-radius:0.05rem;float:right;padding: 0 0.1rem;}
    .header-bottom-down{
    	font-size: 0.2rem;
	    line-height: 0.36rem;
	    word-wrap: break-word;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 3;
	    -webkit-box-orient: vertical;
	    padding-top: 0.1rem;
	}

    .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #fff;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}

    .nav1{overflow:hidden;}
    .nav1 .nav1-tip{padding: 0 0.2rem;height:0.78rem;overflow:hidden;border-bottom:1px solid #ebebeb;position:relative;}
    .nav1-li1{font-size:0.22rem;line-height:0.27rem;border-left:0.03rem solid #008dd3;float:left;color:#1a1a1a;padding-left:0.12rem;position:absolute;top:50%;transform:translateY(-50%);}
    .nav1-li2{width:0.24rem;height:0.78rem;background:url(../../images/backright.png) no-repeat right 50%;background-size:0.12rem 0.23rem;float:right;}
    .nav1-li3{font-size:0.18rem;color:#969696;float:right;line-height:0.78rem;}
    .nav2{width:100%;border-bottom:1px solid #ebebeb;font-size:0;}
    .nav2-content{line-height:0.39rem;margin-top:0.13rem;margin-bottom:0.13rem;display:block;font-size:0.22rem;text-indent: 2em;overflow:hidden;}
    .h{
    	font-size: 0.2rem;
	    padding: 0 0.2rem;
	    line-height: 0.39rem;
	    word-wrap: break-word;
	    color: #c7c7c7;
    }
    .nav2-content dl{float:left;margin:0 0.2rem 0.35rem 0.24rem;width: 0.78rem;}
    .nav2-content dl dt img{width:100%;height:100%;object-fit:cover;border-radius: 50%;
      /*position:absolute;top:50%;transform:translateY(-50%);*/
      display:block;}
    .nav2-content dl dt{
      /*overflow:hidden;position:relative;*/
      border-radius:50%;
      margin:0 auto;border: 1px solid #55c2f0;width:0.75rem;height:0.75rem;}
    .nav2-content dl dd{text-align:center;text-indent:0;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .nav2-sp1,.nav2-sp2{line-height:0.75rem;display:inline-block;}
    .nav2-sp1{margin-left:0.2rem;background:url(../../images/shoucang.png) no-repeat 0 50%;background-size:0.28rem 0.27rem;padding-left:0.32rem;}
    .nav2-sp2{margin-left:0.43rem;background:url(../../images/zan1.png) no-repeat 0 50%;background-size:0.24rem 0.24rem;padding-left:0.3rem;}

    .bt0{border:0!important;}
    .footer{font-size: 0.28rem;color: #fff;background: red;height: 0.8rem;line-height: 0.8rem;text-align: center;width: 3rem;margin:0 auto;margin-top: 0.2rem;border-radius: 0.5rem;}




	.yzall .forget1 {
		text-align: center;
		line-height: 1.25rem;
		z-index: 13;
		margin-bottom: 0.05rem;
		border-radius: 0.1rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 0 0 0.1rem #000;
		background: rgba(0, 0, 0, 0.7);
		padding: 0rem 0.2rem;
		color: #fff;
		width: 5rem;
		font-size: 0.3rem;
		padding-bottom: 0.3rem;
	}



	.yzall .sp2 {
		border: 1px solid #fff;
		display: block;
		border-radius: 0.1rem;
	}

	.yzall .sp2 input {
		display: block;
		width: 100%;
		color: #fff;
		height: 0.5rem;
		padding-left: 0.2rem;
	}

	.yzall .sp3 {
		width: 1.4rem;
		background: #008DD3;
		display: block;
		margin: 0 auto;
		text-align: center;
		margin-top: 0.2rem;
		border-radius: 0.1rem;
	}

	.yzall .sp3 input {
		display: block;
		width: 100%;
		color: #fff;
		height: 0.5rem;
	}
	/*分享弹窗*/

	.fenxiang {
		width: 5.4rem;
		height: 6.86rem;
		background: url(../../images/fenxiang.png) no-repeat;
		background-size: cover;
		overflow: hidden;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		z-index: 44;
		border-radius: 0.1rem;
	}
	/*退出圈子弹窗*/
	.exit1{
		width: 3rem;
		height: 2rem;
		background: #fff;
		border-radius: 0.05rem;
		box-shadow: 0 0 0.5rem #eee;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		z-index: 15;
	}
	.exit1 p{
		color: #242424;
		font-size: 0.24rem;
		text-align: center;
		line-height: 1rem;
	}
	.exit1 ul{
		width: 2.2rem;
		margin: 0 auto;
	}
	.exit1 li{
		width: 1rem;
		height: 0.5rem;
		border-radius: 0.25rem;
		line-height: 0.5rem;
		text-align: center;
		font-size: 0.2rem;

	}
	.exit1 .li1{
		border: 1px solid #eee;
		color: #242424;
		float: left;
	}
	.exit1 .li2{
		border: 1px solid #008DD3;
		background: #008DD3;
		color: #fff;
		float: right;
	}
</style>
