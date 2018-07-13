<template>
	<div class="wrapper" style="padding-top:1rem;height:calc(100% - 1rem);">
    <div class="message"v-show="isshowc" style="height:100%;">
        <div class="message1">
            <div class="message-all">
                <a href="javascript:history.back(-1);" class="a1"></a>
                <span class="forget">发帖</span>
                <a class="a2" v-bind:class="{active:isTijiao}" v-if="this.ptData.id==undefined" @click="submit()">发表</a>
				<a class="a2" v-bind:class="{active:isTijiao}" v-else @click="submit1()">发表</a>
            </div>
        </div>
        <div class="message3">
            <div class="message3-all">
                <div class="message3-top">
                	<div class="message2-all" @click="windowtoggle()">
		                <ul class="message2-all-ul">
		                    <li class="li1" ref="list" v-text="this.listData==''?'全部':'请选择分类'"></li>
		                    <li class="li2"></li>
		                </ul>
		            </div>
                    <input type="text" placeholder="标题" ref="tit" :value="this.ptData.title"/>
                </div>
            </div>
            <div class="message3-bottom">
            	<span style="font-size: 0.22rem;display: block;color: #c7c7c7;float: left;padding-left: 0.15rem;margin-top: 0.18rem;">内容：</span>
                <span style="padding-left: 0.15rem;display: block;color: #c7c7c7;line-height: 0.3rem;padding-top: 0.2rem;" type="text" class="sr-input lh84 bt" ref="text" @click="toggle('comment')" id="neir" v-html="this.ptData.content"></span>
            </div>
        </div>
        <!--弹出-->
        <div class="window" v-show="windowshow">
			<ul>
				<li v-for="(list,index) in listData" :key="index" @click="toggle1();window1(list.title,list.id);windowtoggle()">{{list.title}}</li>
			</ul>
		</div>
    </div>
    <pop style="text-align: center" class="tip" :title="tip"></pop>
    <div class="mark" ref="mark"></div>
    <load v-show="isload"></load>
    <editor  v-show="isshowe" v-on:message="recieveMessage" :content="editormsg"></editor>
    </div>
</template>

<script>
	var cid=-1;
	var c = '';
//	var val='';
	import {setCookie,getCookie} from '../../assets/js/cookie.js'
	import {getOpenUrl, insertHtmlAtCaret,getToken} from '../../assets/js/common.js'
	import editor from './editor.vue'
	export default {
		components: {
			editor
		},
		data () {
             return {
               isload:false,
               fn:'',
               isTijiao:false,
             	tip:'',
                windowshow:false,
                listData:{},
                title:'',
                content:'',
                data:{},
				isshowe:false,
				isshowd: false,//删除图层确认
				isshowc: true,
				ptData:{},
				img: {},
				editormsg: ''
             };
         },
         mounted(){
         	$('.tip').hide();
         	//一进页面选中的
         	this.toggle1();
			if(this.imgData = '') {
				this.imgData = this.img
			} else {
				this.imgData = this.imgData
			}
//       	if(this.$refs.text.innerHTML==''){
//       		this.$refs.text.innerHTML='内容'
//       	}

         	this.tid = this.$route.query.tid;
			if(this.tid) {
				this.$http.get(getOpenUrl() + "topicData", {
					params: {
						tid: this.$route.query.tid,
					},
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					this.ptData = res.body.data;
					cid=this.ptData.cid;
					this.$http.get(getOpenUrl() + "topicCate", {
						params:{
							gid:this.$route.query.gid
						},
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					}).then((res) => {
						this.listData=res.body.data;
						for(var i=0;i<this.listData.length;i++){
							if(this.ptData.cid==this.listData[i].id){
								this.$refs.list.innerHTML=this.listData[i].title
							}
						}
					})
				})

			} else {
				this.ptData.title = '';
			};
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
         	toggle(type, rid, trid){
				switch (type){
					case 'comment':
						//评论
            this.$root.eventHub.$emit('editDianji');
						this.ptData.title = this.$refs.tit.value;
						this.editormsg = this.$refs.text.innerHTML==''?'请输入帖子内容':this.$refs.text.innerHTML;
						this.isshowc = false;
						this.isshowe = true;
						break;

				}
				if (type != 'comment' && type != 'cancel'){
					//this.$refs.a1.style.height="calc(100% - 1.64rem)";
					//this.$refs.a1.style.overflow="hidden";
				}
			},

			recieveMessage(data){
				this.isshowc = data.isshowc;
				this.isshowe = data.isshowe;
				$('#neir').html(data.title);

				this.img = data.attach_id;
				this.imgData = this.img;

			},
			windowtoggle(){
				if(this.listData==''){
					this.tip = "圈主还没有添加分类,默认到全部";
		            $('.tip').show();
		            setTimeout(function(){
		              $('.tip').hide();
		            },1500)
				}
				this.windowshow=!this.windowshow
			},
         	toggle1() {
//
				this.$http.get(getOpenUrl() + "topicCate", {
					params:{
						gid:this.$route.query.gid
					},
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					this.listData=res.body.data;

					for(var i=0;i<this.listData.length;i++){
						if(this.ptData.cid==this.listData[i].id){
							this.$refs.list.innerHTML=this.listData[i].title
						}
					}
					console.log(this.ptData.cid)
				}),
				this.ptData.title = this.$refs.tit.value;
			},
//			window(){
//				this.$http.get(getOpenUrl() + "topicCate", {
//					params:{
//						gid:this.$route.query.gid
//					}
//
//				}).then((res) => {
//					this.listData=res.body.data;
//				})
//			},
			window1(value,id){
				cid=id;
				this.$refs.list.innerHTML = value;
			},
			//表情转换
			utf16toEntities(str) {
				var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
				str = str.replace(patt, function(char) {
					var H, L, code;
					if(char.length === 2) {
						H = char.charCodeAt(0); // 取出高位
						L = char.charCodeAt(1); // 取出低位
						code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
						return "&#" + code + ";";
					} else {
						return char;
					}
				});
				return str;
			},
			submit(){
          var message=this.$refs.text.innerHTML
          let transMessage = this.utf16toEntities(message)
//				this.listData=this.$refs.list.innerHTML
          if(this.$refs.list.innerHTML == ''||this.$refs.list.innerHTML == '请选择分类'){
            this.tip = "请选择分类";
            $('.tip').show();
            setTimeout(function(){
              $('.tip').hide();
            },1000)
            return;
          }
          if(this.$refs.tit.value==''){
            this.tip = "请输入标题";
            $('.tip').show();
            setTimeout(function(){
              $('.tip').hide();
            },1000)
            return;
          }
          if(this.$refs.text.innerHTML==''||this.$refs.text.innerHTML=='请输入评论内容'){
            this.tip = "请输入内容";
            $('.tip').show();
            setTimeout(function(){
              $('.tip').hide();
            },1000)
            return;
          }
        clearTimeout(this.fns);
        this.fns = setTimeout(() => {
          this.isload = true;
          this.$refs.mark.style.display = "block";
          this.$http.post(getOpenUrl() + "topicAdd", {
            gid:this.$route.query.gid,
            cid:cid,
            title:this.$refs.tit.value,
            content: transMessage,
            attach:this.imgData,
          },{
            headers:{
              'Authorization':'Bearer '+getToken()
            }
          }).then((res) => {
            this.isload = false;
            this.$refs.mark.style.display = "none";
//					this.$refs.list.innerText="全部"
            this.listData=res.body.data;
            if(res.body.code==0){
              this.$root.eventHub.$emit('cid');
              this.$root.eventHub.$emit('jfSuccess');
              this.$root.eventHub.$emit('refreshed');
//              this.$root.eventHub.$emit('submitSuccess');
              this.tip = "发布成功";
              this.isTijiao = true;
              $('.tip').show();
              setTimeout(() => {
                $('.tip').hide();
                let expireDays = 1000 * 60 * 60;
                setCookie("cid", cid, expireDays);
                this.$router.back(-1)
              }, 1000)
            }else{
              this.isTijiao = false;
              this.tip = res.body.error_description;
              $('.tip').show();
              setTimeout(function(){
                $('.tip').hide();
              },1000)
            }
          })
        },500)
			},
			submit1(){
          var message=this.$refs.text.innerHTML
          let transMessage = this.utf16toEntities(message)
//				this.listData=this.$refs.list.innerHTML
          if(this.$refs.list.innerHTML == ''){
            this.tip = "请选择类型";
            $('.tip').show();
            setTimeout(function(){
              $('.tip').hide();
            },1000)
          }else if(this.$refs.tit.value==''){
            this.tip = "请输入标题";
            $('.tip').show();
            setTimeout(function(){
              $('.tip').hide();
            },1000)
          }else if(this.$refs.text.innerHTML==''){
            this.tip = "请输入内容";
            $('.tip').show();
            setTimeout(function(){
              $('.tip').hide();
            },1000)
          }
        clearTimeout(this.fns);
        this.fns = setTimeout(() => {
          this.isload = true;
          this.$http.post(getOpenUrl() + "topicEdit", {
            gid:this.$route.query.gid,
            tid:this.$route.query.tid,
            cid:cid,
            title:this.$refs.tit.value,
            content: transMessage,
            attach:this.imgData,
          },{
            headers:{
              'Authorization':'Bearer '+getToken()
            }
          }).then((res) => {
            this.isload = false;
            this.listData=res.body.data;
            if(res.body.code==0){
              this.$root.eventHub.$emit('cid');
              this.$root.eventHub.$emit('jfSuccess');
              this.$root.eventHub.$emit('refreshed');
              //this.$root.eventHub.$emit('submitSuccess');
              this.isTijiao = true;
              this.tip = "编辑成功";
              $('.tip').show();
              setTimeout(() => {
                $('.tip').hide();
                let expireDays = 1000 * 60 * 60;
                setCookie("cid", cid, expireDays);
                this.$router.back(-1)
              }, 1000)
            }else{
              this.isTijiao = false;
              this.tip = res.body.error_description;
              $('.tip').show();
              setTimeout(function(){
                $('.tip').hide();
              },1000)
            }
          })
        },500)
			}
        },
        beforeRouteLeave (to, from, next) {
			//路由离开时
			var isInputKey = parseInt(getCookie('inputkey'));
			if (isInputKey == 1){
				setCookie("inputkey", '', -1);
				this.isshowe=false;
//				this.toggle1();
//				this.toggle3();
				next(false)
			}else if (this.isshowe){
				this.isshowe=false;
				this.isshowc=true;
				next(false);
			}else{
				next()
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mark {
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    display:none;
    z-index: 999;
  }
	#neir{font-size: 0.22rem;height: 100%;}
  /*.message3-bottom>>>img{*/
    /*width: 100% !important;*/
    /*height: 100% !important;*/
  /*}*/
	/*#bt{height: 100%;}
	#bt .l{height: 100%;}*/
	.bt{min-height: 0.7rem;height: 100%!important;}
	.wrapper{
    /*height: calc(100% - .7rem);padding-top: .7rem;*/
  }
  .message1 {
		height: 0.7rem;
	    position: fixed;
	    top: 0;
	    width: 100%;
	    z-index: 15;
	    background: #fff;
	    -webkit-box-shadow: 0 0 5px #ebebeb;
	    box-shadow: 0 0 5px #ebebeb;
    padding-top: 0.3rem;
	}
  .message-all{padding:0 0.2rem;overflow:hidden;}
  .message .a1{width: 0.18rem;height: 0.7rem;background: url(../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;display: block;}
  .message .a2{height: 0.7rem;line-height:0.7rem;float:right;display: block;font-size: 0.22rem;color: #008DD3;}
  .message .a2.active{pointer-events:none;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}

  .message2{height:1.29rem;position:relative;margin:0 0.2rem;}
  .message2-all{border-radius:0.05rem;font-size:0.22rem;color:#8c96a0;line-height:0.7rem;float:left;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
  .message2-all .li1{float:left;padding-left: 0.14rem;padding-right: 0.14rem;height: 100%;}
  .message2-all .li2{margin-right:0.14rem;height:0.68rem;width:0.24rem;background:url(../../images/backg.png) no-repeat 0 50%;background-size:0.24rem 0.12rem;float:left;}

  .message3{height:100%;}
  .message3-all{width:100%;border-bottom:1px solid #e0e5ea;}
  input::-webkit-input-placeholder {color: #c7c7c7; }
  textarea::-webkit-input-placeholder {color: #c7c7c7; }

  .message3-top{height:0.7rem;line-height:0.7rem;width: calc(100% - 0.2rem);display: flex;}
  .message3-top input{height:0.7rem;line-height:0.7rem;display:block;flex: 1;font-size: 0.22rem;}
  .message3-bottom textarea{width:5.2rem;padding-top:0.25rem;display:block;height:5rem;}
  .message3-top,.message3-bottom{padding-left: 0.2rem;}
  .message3-bottom{width: calc(100% - 0.4rem);word-wrap: break-word;height:calc(100% - 0.7rem);}
  /*弹出*/
  .window {
		z-index: 10;
		background: #fff;
		border: 1px solid #E0E0E0;
		margin: 0 auto;
		position: absolute;
		top: 1.4rem;
		left: 0.2rem;
	}


	.window ul {
		overflow-y: auto;
	}

	.window ul li {
		border-bottom: 1px solid #E0E0E0;
		line-height: 0.6rem;
		font-size: 0.22rem;
		color: #8c96a0;
		padding: 0 0.2rem;
	}
</style>
