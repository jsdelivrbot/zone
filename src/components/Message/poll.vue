<template>
	<div class="wrapper">
		<div class="message" v-show="isshowc">
			<div class="message1">
				<div class="message-all">
					<a href="javascript:history.back(-1);" class="a1"></a>
					<span class="forget">投票</span>
					<a class="a2" @click="toupiao()">发表</a>
				</div>
			</div>
			<div class="setting2">
				<div class="setting2-all lh84">
					<div class="title lh84"></div>
					<div class="sr lh84 l">
						<ul class="sr-ul lh84">
							<li class="sr-ul-li1 f lh84">标题：</li>
							<li class="lh84 r">
								<input type="text" class="sr-input lh84" :value="this.tpData.title" ref="tit" />
							</li>
						</ul>
					</div>
				</div>
				<div class="setting2-all lh84">
					<div class="tp lh84"></div>
					<div class="sr lh84 l">
						<ul class="sr-ul lh84">
							<li class="sr-ul-li1 f lh84">单选或者多选：</li>
							<li class="lh84 r" style="font-size: 0.22rem;">
								<label>单选：<input type="radio" class="sr-input lh84" name="r" style="flex: initial;" :value="0" ref="dan"/></label>
								<label style="margin-left: 0.4rem;">多选：<input type="radio" class="sr-input lh84" name="r" style="flex: initial;" :value="1" ref="duo"/></label>
							</li>
						</ul>
					</div>
				</div>
				<div class="setting2-all lh84 pr">
					<div class="bm lh84"></div>
					<div class="sr lh84  l">
						<ul class="sr-ul lh84">
							<li class="sr-ul-li1 f lh84">投票截止时间：</li>
							<li class="lh84 r">
								<div class="block" @click="setDate" style="font-size: 0.24rem;" ref="time">{{this.tpData.deadline}}</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="setting2-all lh84" id="bt">
					<div class="lh84 qz"></div>
					<div class="sr lh84 bt0 l">
						<ul class="sr-ul lh84" id="bt">
							<li class="sr-ul-li1 f lh84">内容：</li>
							<li class="lh84 r bt">
								<span style="display: block;" type="text" class="sr-input lh84 bt" ref="t" @click="toggle('comment')" id="neir" v-html="this.tpData.content"></span>
							</li>
						</ul>
					</div>
				</div>



			</div>
			<div class="line"></div>
			<div class="setting3">
				<div class="setting2-all lh84" v-for="(e,index) in listData" :key="index" v-if="tpData.vote_opts==undefined">
					<div class="dl lh84"></div>
					<div class="sr lh84 l">
						<ul class="sr-ul lh84">
							<li class="sr-ul-li1 f lh84">选项{{index+1}}：</li>
							<li class="lh84 r">
								<input type="text" class="sr-input lh84" ref="val" />
							</li>
						</ul>
					</div>
				</div>
				<div class="setting2-all lh84" v-for="(ele,index) in tpData.vote_opts" :key="index" v-else>
					<div class="dl lh84"></div>
					<div class="sr lh84 l">
						<ul class="sr-ul lh84">
							<li class="sr-ul-li1 f lh84">选项{{index+1}}：</li>
							<li class="lh84 r">
								<input type="text" class="sr-input lh84" ref="val" :value="ele.name" />
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="button">
				<div class="bo" @click="add()">
					<a>+增加选项</a>
				</div>
			</div>
		</div>
		<pop style="text-align: center" class="tip" :title="tip"></pop>
    <load v-show="isload"></load>
    <div class="mark" ref="mark"></div>
		<editor v-show="isshowe" v-on:message="recieveMessage" :content="editormsg"></editor>
	</div>
</template>

<script>
	import { setCookie, getCookie } from '../../assets/js/cookie.js'
	import { getOpenUrl, insertHtmlAtCaret ,getToken} from '../../assets/js/common.js'
	import editor from './editor.vue'
	export default {
		components: {
			editor
		},
		data() {
			return {
			  isload:false,
			  fn:'',
				tip:'',
				time: '',
				val: [],
				data: '',
				data2: '',
				title: '',
				listData: [],
				content: '',
				opt: [],
				data: {},
				isshowe: false,
				isshowd: false, //删除图层确认
				isshowc: true,
				tpData: {},
				editormsg: '',
				//判断单选还是多选
				vote_multi:''

			}

		},
		mounted() {
			$('.tip').hide();

			this.tid = this.$route.query.tid;
			if(this.tid) {
				this.$http.get(getOpenUrl() + "topicData", {
					params: {
						tid: this.$route.query.tid,
					},

					headers: {
						'Authorization': 'Bearer ' + getToken()
					},
				}).then((res) => {
					this.tpData = res.body.data

				})
			} else {
				this.tpData.title = '';
			}

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
			setDate() {
				this.$calendar.show({
					onOk: (date) => {
						this.$refs.time.innerHTML = date;
						this.data = date
						this.tpData.deadline=this.$refs.time.innerHTML
					}
				});

			},
			toggle(type, rid, trid) {
				switch(type) {
					case 'comment':
						//评论
            this.$root.eventHub.$emit('editDianji');
						this.tpData.title = this.$refs.tit.value;
						this.editormsg = this.$refs.t.innerText==''?'请输入帖子内容':this.$refs.t.innerText;
						this.isshowc = false;
						this.isshowe = true;

						break;

				}
				if(type != 'comment' && type != 'cancel') {
					this.$refs.a1.style.height = "calc(100% - 1.64rem)";
					//this.$refs.a1.style.overflow="hidden";
				}
			},

			recieveMessage(data) {

				console.log(this.$refs.t.innerHTML,this.$refs.tit.value)
				this.isshowc = data.isshowc;
				this.isshowe = data.isshowe;
				this.$refs.t.innerHTML = '';
				$('#neir').append(data.title);
				this.imgData = data.attach_id;

			},
			add() {
				if(this.tpData.vote_opts == undefined) {
					if(this.listData.length < 5) {
						this.listData.push(this.val)
						console.log(this.val)
					} else {
						this.tip = "不能添加了";
			            $('.tip').show();
			            setTimeout(function(){
			              $('.tip').hide();
			            },1000)
					}
				} else {
					if(this.tpData.vote_opts.length < 5) {
						this.tpData.vote_opts.push(this.val)
					} else {
						this.tip = "不能添加了";
			            $('.tip').show();
			            setTimeout(function(){
			              $('.tip').hide();
			            },1000)
					}
				}

			},
			toupiao() {
          this.tpData.title = this.$refs.tit.value;
          var voteData=[]
          this.$mount(this.$refs)
          if(this.$refs.dan.checked){
            this.vote_multi=this.$refs.dan.value
            voteData.push(this.vote_multi)
          }else if(this.$refs.duo.checked){
            this.vote_multi=this.$refs.duo.value
            voteData.push(this.vote_multi)
          }
          if(this.$refs.tit.value == '') {
            this.tip = "请输入标题";
            $('.tip').show();
            setTimeout(function(){
              $('.tip').hide();
            },1000)
            return;
          }
          if(voteData.length==0) {
            this.tip = "请选择单选还是多选";
            $('.tip').show();
            setTimeout(function(){
              $('.tip').hide();
            },1000)
            return;
          }
          if(this.$refs.time.innerHTML=='') {
            this.tip = "请选择时间";
            $('.tip').show();
            setTimeout(function(){
              $('.tip').hide();
            },1000)
            return;
          }
          if(this.$refs.t.innerHTML=='') {
            this.tip = "请选择时间";
            $('.tip').show();
            setTimeout(function(){
              $('.tip').hide();
            },1000)
            return;
          }
          if(this.listData.length<2) {
            this.tip = "至少选两项";
            $('.tip').show();
            setTimeout(function(){
              $('.tip').hide();
            },1000)
            return;
          }else {
            for(var i=0;i<this.$refs.val.length;i++){
              console.log(this.$refs.val[i])
              if(this.$refs.val[i].value=='') {
                this.tip = "请填写选项";
                $('.tip').show();
                setTimeout(function(){
                  $('.tip').hide();
                },1000)
                return;
              }
            }
            this.opt = [];
            //				this.opt.push(this.$refs.a1.value);
            //				this.opt.push(this.$refs.a2.value);
            if(this.$refs.val == undefined) {
              clearTimeout(this.fns);
              this.fns = setTimeout(() => {
                this.isload = true;
                this.$refs.mark.style.display = "block";
                this.$http.post(getOpenUrl() + "VoteAdd", {
                  title: this.$refs.tit.value,
                  dates: this.$refs.time.innerHTML,
                  explain: this.$refs.t.innerHTML,
                  gid: this.$route.query.gid,
                  opt: this.opt,
                  attach: this.imgData,
                  vote_multi: this.vote_multi,
                }, {
                  headers: {
                    'Authorization': 'Bearer ' + getToken()
                  }
                }).then((res) => {
                  this.isload = false;
                  this.$refs.mark.style.display = "none";
                  if (res.body.code == 0) {
                    this.tip = "投票成功";
                    this.$root.eventHub.$emit('0');
                    this.$root.eventHub.$emit('jfSuccess');
                    this.$root.eventHub.$emit('refreshed');
                    $('.tip').show();
                    setTimeout(function () {
                      $('.tip').hide();
                    }, 1000)
                    this.$router.push('/listcircle?gid=' + this.$route.query.gid);
                  } else {
                    this.tip = res.body.error_description;
                    $('.tip').show();
                    setTimeout(function () {
                      $('.tip').hide();
                    }, 1000)
                  }
                })
              },500)
            } else {
              for(var i = 0; i < this.$refs.val.length; i++) {
                this.opt.push(this.$refs.val[i].value);
              }
              clearTimeout(this.fns);
              this.fns = setTimeout(() => {
                this.isload = true;
                this.$refs.mark.style.display = "block";
                this.$http.post(getOpenUrl() + "VoteAdd", {
                  title: this.$refs.tit.value,
                  dates: this.$refs.time.innerHTML,
                  explain: this.$refs.t.innerHTML,
                  gid: this.$route.query.gid,
                  opt: this.opt,
                  attach: this.imgData,
                  vote_multi: this.vote_multi,
                }, {
                  headers: {
                    'Authorization': 'Bearer ' + getToken()
                  }
                }).then((res) => {
                  this.isload = false;
                  this.$refs.mark.style.display = "none";
                  if (res.body.code == 0) {
                    this.$root.eventHub.$emit('0');
                    this.$root.eventHub.$emit('jfSuccess');
                    this.$root.eventHub.$emit('refreshed');
                    //this.$root.eventHub.$emit('submitSuccess');
                    this.tip = "投票成功";
                    $('.tip').show();
                    setTimeout(() => {
                      $('.tip').hide();
                      this.$router.back(-1)
                    }, 1000)

//								this.$router.push('/listcircle?gid=' + this.$route.query.gid);
                  } else {
                    this.tip = res.body.error_description;
                    $('.tip').show();
                    setTimeout(function () {
                      $('.tip').hide();
                    }, 1000)
                  }
                })
              },500)
            }

          }
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
	#neir {
		font-size: 0.22rem;
		height: 100%;
	}

	#bt {
		height: 100%;
	}

	#bt .l {
		height: 100%;
	}

	.bt {
		min-height: 0.7rem;
		height: 100%!important;
	}

	.wrapper {
		height: calc(100% - 1rem);
		padding-top: 1rem;
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
  .setting2{
    margin-top: 0.3rem;
  }
	.message-all{padding:0 0.2rem;overflow:hidden;}
  .message .a1{width: 0.18rem;height: 0.7rem;background: url(../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;display: block;}
  .message .a2{height: 0.7rem;line-height:0.7rem;float:right;display: block;font-size: 0.22rem;color: #008DD3;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}


	.sl {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
		background: url(../../images/jiben.png) no-repeat 50% 50%;
		background-size: 0.24rem 0.24rem;
	}

	.title {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
		background: url(../../images/title.png) no-repeat 50% 50%;
		background-size: 0.24rem 0.24rem;
	}
	.tp {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
		background: url(../../images/banbenxinxi.png) no-repeat 50% 50%;
		background-size: 0.24rem 0.24rem;
	}
	.qz {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
		background: url(../../images/qzjs.png) no-repeat 50% 50%;
		background-size: 0.24rem 0.24rem;
	}

	.dl {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
	}

	.setting2-all {
		overflow: hidden;
	}

	.sr {
		height: 1.14rem;
		border-bottom: 1px solid #ebebeb;
	}

	.bt0 {
		border-bottom: 0;
	}

	.sr-ul {
		flex: 1;
		overflow: hidden;
		float: left;
	}

	.sr-ul-li1 {
		font-size: 0.22rem;
		color: #1a1a1a;
		line-height: 0.37rem;
	}

	.sr-ul-li2 {
		font-size: 0.20rem;
		color: #575757;
		line-height: 0.36rem;
	}

	.setting2-all .lh84 {
		height: 0.84rem;
		line-height: 0.84rem;
		display: flex;
	}

	.setting2-all .f {
		float: left;
	}

	.setting2-all .r {
		float: right;
		flex: 1;
	}

	.setting2-all .sr-input {
		display: block;
		float: right;
		flex: 1;
	}

	.bo {
		width: 2.4rem;
		height: 0.62rem;
		background: #54c2f0;
		font-size: 0.24rem;
		color: #fff;
		text-align: center;
		line-height: 0.62rem;
		margin: 0 auto;
		border-radius: 0.31rem;
		margin-top: 0.6rem;
	}

	.bm {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
		background: url(../../images/baoming.png) no-repeat 50% 50%;
		background-size: 0.24rem 0.24rem;
	}

	.block {
		width: 100%;
	}

	#element {
		width: 100%;
		display: block;
		flex: 1;
	}

	#element i {
		display: none;
	}

	.pr {
		padding-right: 0.2rem;
	}
</style>
