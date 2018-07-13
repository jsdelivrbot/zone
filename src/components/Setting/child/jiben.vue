<template>
	<div class="jiben">
		<div class="setting1">
			<div class="setting-all">
				<a href="javascript:history.back(-1);" class="a1"></a>
				<span class="forget">基本设置</span>
				<a class="a2" @click="finished()"></a>
			</div>
		</div>
		<div class="setting2">
			<div class="setting2-all lh84">
				<div class="sl lh84"></div>
				<div class="sr bt0 lh84 l">
					<ul class="sr-ul lh84">
						<li class="sr-ul-li1 f lh84">圈子名称:</li>
						<li class="lh84 r">
							<input type="text" class="sr-input lh84" placeholder="请输入圈子名称" :value="this.listData.name" ref="name" />
						</li>
					</ul>

				</div>
			</div>
			<div class="line"></div>
			<div class="setting2-all lh84">
				<div class="sl lh84 fl"></div>
				<div class="sr lh84 l">
					<ul class="sr-ul lh87">
						<li class="sr-ul-li1 f lh87">所属分类:</li>
						<ul class="p-ul">
							<!--<li class="p-li1">{{this.listData.catname0}}<span v-if="this.listData.catname0==''||this.listData.catname1==''">-</span>{{this.listData.catname1}}</li>-->
							<div class="message2-all" @click="t1()">
								<ul class="message2-all-ul">
									<li class="li1" ref="list" v-text="this.listData.catname0==null?'请选择分类':this.listData.catname0+'   '+this.listData.catname1">请选择分类</li>
									<li class="li2"></li>
								</ul>
							</div>
						</ul>
					</ul>
				</div>
			</div>
			<div class="setting2-all lh84 lh134">
				<div class="sl lh84 bi lh134"></div>
				<div class="sr lh84 l lh134">
					<ul class="sr-ul lh134">
						<span class="sp1 lh1">头像：</span>
						<span class="r">
				          	<input style="opacity:0;position: absolute;width:0.9rem;height:0.9rem;margin-top:0.3rem;display: block;" type="file"  accept="image/*" @change="onchange">
				          	<img id="logo" v-if="this.listData.logo" :src="this.listData.logo"/>
				          	<img id="logo" v-if="!this.listData.logo" src="../../../images/other/head.png"/>
				          	<!--<input type="hidden" name="avatar" :value="imgBase" ref="avatar" />-->
				        </span>
					</ul>
				</div>
			</div>
			<div class="setting2-all lh84 lh98" @click="toggle1();type1()">
				<div class="sl lh84 bg lh98"></div>
				<div class="sr lh84 l lh98">
					<ul class="sr-ul lh98">
						<li class="sr-ul-li1 f lh98">背景遮罩色:</li>
						<ul class="p-ul">
							<li class="p-li1" ref="cap" :style="'background:'+coverData"></li>
							<li class="p-li2"></li>
						</ul>
					</ul>

				</div>
			</div>
			<div class="setting2-all lh84">
				<div class="sl lh84 qzjs"></div>
				<div class="sr lh84 l">
					<ul class="sr-ul lh84">
						<li class="sr-ul-li1 r lh84" style="float: left;">圈子介绍:</li>
						<li class="lh84 f" style="float: right;width: 70%;">
							<input style="width: 100%;" type="text" class="sr-input lh84" placeholder="请输入圈子介绍" :value="this.listData.intro" ref="intro" />
						</li>
					</ul>

				</div>
			</div>
			<div class="list mb41">
				<p class="sp2">背景图片</p>
				<p class="sp3">
					<input style="opacity:0;position: absolute;width: calc(100% - 0.5rem);height:2.8rem;display: block;" type="file" accept="image/*" @change="onchange1">
					<img id="bk" v-if="this.listData.backdrop" :src="this.listData.backdrop" alt="">
					<img id="bk" v-if="!this.listData.backdrop" src="../../../images/other/bj.png" />
				</p>
			</div>
		</div>
		<div class="mark" ref="mark"></div>
		<div class="mw"></div>
    <mt-popup v-model="typeShow" position="bottom" class="window">
		<!--<div class="window" ref="type">-->
			<div class="window-header">
				<span class="window-forget">选择背景色</span>
				<a class="window-a2" @click="toggle4()"></a>
			</div>
			<p><span>请选择</span></p>
			<ul style="height: calc(100% - 2rem);">
				<li class="col" ref="col" v-for="(co,index) in color" :key="index" @click="toggle4(co)">
					<!-- :class="this.coverData==this.groupData.cover?bor:''"-->
					<span :style="'background:'+co" ref="s" :class="coverData==co?'bor':''"></span>
				</li>
			</ul>
		<!--</div>-->
    </mt-popup>
    <mt-popup v-model="flShow" position="bottom" class="window1">
		<!--<div class="window1" ref="fl">-->
			<div class="window-header1">
				<span class="window-forget1">选择分类</span>
				<a class="window-a21" @click="togglefl1()"></a>
			</div>
			<p @click="success">
				<span>请选择</span>
				<span style="float: right;margin-right: 0.2rem;border: 0;">确定</span>
			</p>
			<ul>
				<li style="border-right: 1px solid #eee;" ref="flf" v-for="(list,index) in flData" class="flf" :id="'flf'+list.id" @click="togglefl(list.title,list.id)" :class="list.id==c0?'active':''">{{list.title}}</li>
			</ul>
        <ul style="width: 30%;" :id="data.id" v-for="(data,index) in cData" :style="pcatid == data.pcatid ? 'display:block' : 'display:none;'">
          <li v-for="(listz,index) in data.list" class="flfz" ref="flz" :id="'flfz'+listz.id" @click="toggleflz(listz.title,listz.id)" :class="listz.id==c1?'active':''">{{listz.title}}</li>
        </ul>
		<!--</div>-->
    </mt-popup>
		<!--弹出分类-->
		<!--<div class="windowfl" v-show="flshow">
			<ul>
				<li v-for="(list,index) in flData" :key="index" @click="toggle1();window1(list.title,list.id)">{{list.title}}</li>
			</ul>
		</div>-->
		<pop class="tip" :title="tip"></pop>
    <load v-show="isload"></load>
		<div class="load" style="display:none;z-index: 111111;">
			<div class="load-container load4">
				<div class="loader"> <i></i></div>
			</div>
		</div>
	</div>
</template>

<script>
	var cid0 = ''
	var cid1 = ''
	var pid = ''
	import { getOpenUrl, getToken } from "../../../assets/js/common.js"
	import { setCookie, getCookie } from '../../../assets/js/cookie.js'
	export default {
		data() {
			return {
        typeShow:false,
        flShow:false,
			  isload:false,
				show: false,
				isshow: false,
				listData: {},
				groupData: {},
				imgBigBase: '',
				imgBase: '',
				bkPath: '',
				logoPath: '',
				gid: '',
				attid: '',
				tip: '',
				color: {},
				cover: '',
				coverData: {},
				backData: '',
				flshow: "",
				flData: {},
				flzData: {},
				flf: '',
				flfz: '',
				flf1: '',
				c0: {},
				cData:[],
        pcatid: 0
			};
		},
		mounted() {
			$('.tip').hide();
			this.group();
			this.$http.get(getOpenUrl() + "groupBasic", {
				headers: {
					'Authorization': 'Bearer ' + getToken()
				},
				params: {
					gid: this.$route.query.gid,
					type: 1,
					page: 1
				}
			}).then((res) => {
				this.listData = res.body.data;
				this.c0 = res.body.data.cid0
				this.c1 = res.body.data.cid1
				this.coverData = this.listData.cover;
				this.color = res.body.data.covers;
				if(this.listData.catname1==null){
					this.listData.catname1=''
				}

			});
			this.$http.get(getOpenUrl() + "groupcate", {
				params: {

				},
				headers: {
					'Authorization': 'Bearer ' + getToken()
				}
			}).then((res) => {
				//					$(".load").hide()
				//					$(".mw").hide()
				this.flData = res.body.data;
				//					pid=id
				//					if(pid!=undefined){
				//						this.toggleflz();
				//					}
				//					this.flf=this.flf1
				//					for(var i=0;i<this.flData.length;i++){
				//						if(this.listData.cid0==this.flData[i].id){
				//							this.flf=this.flData[i].title
				//						}
				//					}
			})
			//是否存在input焦点事件或图层打开事件
			$('input').focus(function() {
				//获取焦点
				let expireDays = 1000 * 60 * 60;
				setCookie("inputkey", 1, expireDays);
			});

			$(document).bind('click', function(e) {
				var target = $(e.target);
				if(target.closest("input").length == 0 && target.closest('.a1').length == 0) {
					setCookie("inputkey", '', -1);
				}
			});
		},
		beforeRouteLeave(to, from, next) {
			//路由离开时
			var isInputKey = parseInt(getCookie('inputkey'));
			if(isInputKey == 1) {
				setCookie("inputkey", '', -1);
				//				this.toggle1();
				//				this.toggle3();
				next(false)
			} else {
				next()
			}
		},
		methods: {
			toggle() {
				this.show = !this.show;
			},
			toggle1() {
				this.isshow = !this.isshow;
			},
			toggle4(color) {
			  this.typeShow = false;
//				this.$refs.mark.style.display = "none";
//				this.$refs.type.style.display = "none";
				this.$refs.cap.style.backgroundColor = color;
				this.cover = color;
			},
			togglefl1() {
			  this.flShow = false;
//				this.$refs.mark.style.display = "none";
//				this.$refs.fl.style.display = "none";
			},
			//上传logo
			onchange(e) {

				if(!e) {
					return;
				}
				var reader = new FileReader();
				//获取文件
				var file = e['target']['files'][0];
				var imageType = /^image\//;
				//是否是图片
				if(!imageType.test(file['type'])) {
					this.tip = '请选择图片';
					$('.tip').show();
					setTimeout(function() {
						$('.tip').hide();
					}, 1000)
					return;
				}
				//				else if(file['size'] > (2 * 1024 * 1024)) {
				//					this.tip = '图片不能超过2M';
				//                 	$('.tip').show();
				//                 	setTimeout(function(){
				//                   	$('.tip').hide();
				//                 	},1000)
				//				}
				//读取完成
				reader.onload = (e) => {
					$(".load").show()
					this.$refs.mark.style.display = "block";

					//获取图片dom
					var img = document.getElementById("logo");

					var img_ava = e.target['result'];
					img.src = img_ava;
					this.imgBase = img_ava;
					let self = this;
					lrz(file, {
						width: 200
					}).then(function(rst) {
						//						this.imgBase = rst.base64;
						self.$http.post(getOpenUrl() + "Upload", {
							logo: rst.base64,
							type: 'group',
							category: 'images',
						}, {
							headers: {
								'Authorization': 'Bearer ' + getToken()
							}

						}).then((res) => {
							self.$refs.mark.style.display = "none";
							self.logoPath = res.body.data.path;
							$(".load").hide()
							if(res.body.code) {
								self.tip = '上传logo成功';
								$('.tip').show();
								setTimeout(function() {
									$('.tip').hide();
								}, 1000)

							} else {
								$(".load").hide()
								self.tip = res.body.error_description;
								$('.tip').show();
								setTimeout(function() {
									$('.tip').hide();
								}, 1000)
							}
						})
						return rst;
					}).always(function() {
						// 清空文件上传控件的值
						e.target.value = null;
					});

				};
				reader.readAsDataURL(file);
			},
			//上传背景
			onchange1(e) {

				if(!e) {
					return;
				}
				var reader = new FileReader();
				//获取文件
				var file = e['target']['files'][0];
				var imageType = /^image\//;
				//是否是图片
				if(!imageType.test(file['type'])) {
					this.tip = '请选择图片';
					$('.tip').show();
					setTimeout(function() {
						$('.tip').hide();
						//						window.history.go(-1);
					}, 1000)
					return;
				}
				//				else if(file['size'] > (2 * 1024 * 1024)) {
				//					this.tip = '图片不能超过2M';
				//                 	$('.tip').show();
				//                 	setTimeout(function(){
				//                   	$('.tip').hide();
				//                   	window.history.go(-1);
				//                 	},1000)
				//				}
				//读取完成
				reader.onload = (e) => {
					$(".load").show()
					this.$refs.mark.style.display = "block";
					//获取图片dom
					var img = document.getElementById("bk");
					var img_ava = e.target['result'];
					img.src = img_ava;
					this.imgBigBase = img_ava;
					let self = this;
					lrz(file, {
						width: 400
					}).then(function(rstb) {
						//			          console.log(rstb.base64);
						//						this.imgBigBase = rstb.base64;
						self.$http.post(getOpenUrl() + "Upload", {
							logo: rstb.base64,
							type: 'group',
							category: 'images'
						}, {
							headers: {
								'Authorization': 'Bearer ' + getToken()
							}
						}).then((res) => {

							self.$refs.mark.style.display = "none";
							self.backData = res.body.data.path
							self.attid = res.body.data.attach_id
							self.bkPath = res.body.data.path;
							$(".load").hide()
							if(res.body.code) {
								self.tip = '上传背景成功';
								$('.tip').show();
								setTimeout(function() {
									$('.tip').hide();
									//								window.history.go(-1);
								}, 1000)
							} else {
								$(".load").hide()
								self.tip = res.body.error_description;
								$('.tip').show();
								setTimeout(function() {
									$('.tip').hide();
									//								window.history.go(-1);
								}, 1000)
							}
						})
						return rstb;
					}).always(function() {
						// 清空文件上传控件的值
						e.target.value = null;
					});

				};
				reader.readAsDataURL(file);
			},
			//分类
			t1() {
			  this.flShow = true;
//				this.$refs.mark.style.display = "block";
//				this.$refs.fl.style.display = "block";

				//默认如果有分类属性，把相对的id赋给一个属性pcatid
        if(pid == ''){
          this.pcatid = this.c0;
        }else{
          this.pcatid = pid;
        }

        var isCurData = false;
        //每次点击的时候，赋值给pcatid以便切换table层
        $.each(this.cData, (key, val)=>{
          //如果默认没有分类属性pid那么默认pcatid就是用户默认选中的分类id this.c0
          //默认有的话，那就把pid赋值给pcatid
          if (val.pcatid == this.pcatid && val.list){
            isCurData = true;
            return;
          }
        });
        if (isCurData){
          $(".load").hide()
          $(".mw").hide()
          return;
        }

        this.$http.get(getOpenUrl() + "groupcate", {
          params: {
            pid: this.c0
          },
          headers: {
            'Authorization': 'Bearer ' + getToken()
          }
        }).then((res) => {
          $(".mw").hide()
          //this.flzData = res.body.data;

          //默认新建一个数组，缓存数据
          var list = res.body.data;
          var data = {};
          //默认赋值给pcatid一个默认用户选择的分类属性id
          data.pcatid = this.c0;
          data.list   = list;
          this.cData.push(data);

          for(var i = 0; i < this.flzData.length; i++) {
            if(this.listData.cid1 == this.flzData[i].id) {
              this.flfz = this.flzData[i].title
            }
          }
          if(value != undefined) {
            this.flfz = value
          } else {
            this.flfz = ''
          }
        })
			},
			togglefl(value, id) {
          $(".load").show()
          $(".mw").show()
          if(cid0 == '' || cid0 == 0) {
            cid0 = this.c0
          } else {
            cid0 = id
          }
          $(".flf").removeClass('active')
          $("#flf" + id).addClass('active')

          //防止点击一次就加载数据，缓存数据
          var isCurData = false;
          //每次点击的时候，赋值给pcatid以便切换table层
          this.pcatid = id;
          $.each(this.cData, function(key, val){
            if (val.pcatid == id && val.list){
              isCurData = true;
              return;
            }
          });
          if (isCurData){
            $(".load").hide()
            $(".mw").hide()
            return;
          }

          this.$http.get(getOpenUrl() + "groupcate", {
            params: {

            },
            headers: {
              'Authorization': 'Bearer ' + getToken()
            }
          }).then((res) => {
            $(".load").hide()
            $(".mw").hide()
            this.flData.push(res.body.data);
            pid = id
            if(pid != undefined) {
              this.toggleflz();
            }
            this.flf = value
          })
			},
			toggleflz(value, id) {

				if(cid1 == '') {
					cid1 = this.c1
				} else {
					cid1 = id
				}

				$(".mw").show()
				$(".flfz").removeClass('active')
				$("#flfz" + id).addClass('active')
        this.flShow = true;
//				this.$refs.mark.style.display = "block";
//				this.$refs.fl.style.display = "block";
				this.$http.get(getOpenUrl() + "groupcate", {
					params: {
						pid: pid
					},
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					$(".mw").hide();

					//新建数组为了点击一次push一个数组
					var list = this.flzData = res.body.data;
          var data = {};
          data.pcatid = pid;
          data.list   = list;
          if (value == undefined && id == undefined){
            this.cData.push(data);
          }

					for(var i = 0; i < this.flzData.length; i++) {
						if(this.listData.cid1 == this.flzData[i].id) {
							this.flfz = this.flzData[i].title
						}
					}
					if(value != undefined) {
						this.flfz = value
					} else {
						this.flfz = ''
					}
				})
				//				this.ptData.title = this.$refs.tit.value;
			},
			success() {
				if(cid0 == '') {
					cid0 = this.c0
				}
				if(cid1 == '') {
					cid1 = this.c1
				}
				if(this.flf == '') {
					this.tip = '请选择分类1';
					$('.tip').show();
					setTimeout(function() {
						$('.tip').hide();
					}, 1000)
					return;
				}
				if(this.flfz == ''&&this.listData.length>0) {
					this.tip = '请选择分类2';
					$('.tip').show();
					setTimeout(function() {
						$('.tip').hide();
					}, 1000)
					return;
				}
				this.flShow = false;
//				this.$refs.mark.style.display = "none";
//				this.$refs.fl.style.display = "none";

				this.$refs.list.innerText = this.flf + ' ' + this.flfz

			},
			window1(value, id) {
				cid = id;
				this.$refs.list.innerHTML = value;
			},
			finished() {
				this.listData.name = this.$refs.name.value
				if(this.cover == '') {
					this.cover = this.coverData
				}
				if(cid0 == '') {
					cid0 = this.listData.cid0
				}

				if(cid1 == '') {
					cid1 = this.listData.cid1
				}
				let options = {
					gid: this.$route.query.gid,
					name: this.$refs.name.value,
					intro: this.$refs.intro.value,
					cover: this.cover,
					cid0: cid0,
					cid1: cid1,
					logo: this.logoPath,
					attaid: this.attid,
					backdrop: this.backData,
				};
				if(this.logoPath) {
					options.logo = this.logoPath
					options.backdrop = this.bkPath
				}
        clearTimeout(this.fn);
        this.fn = setTimeout( ()=> {
          this.isload = true;
          this.$http.post(getOpenUrl() + "groupBasicDo", {
            gid: this.$route.query.gid,
            cid0: cid0,
            cid1: cid1,
            name: this.$refs.name.value,
            intro: this.$refs.intro.value,
            logo: this.logoPath,
            cover: this.cover,
            attaid: this.attid,
            backdrop: this.backData
          }, {
            headers: {
              'Authorization': 'Bearer ' + getToken()
            }
          }).then((res) => {
            this.isload = false;
            if (res.body.code != 0) {
              this.tip = res.body.error_description;
              $('.tip').show();
              setTimeout(function () {
                $('.tip').hide();
              }, 1000)
            } else {
              this.tip = '提交成功';
              $('.tip').show();
              setTimeout(function () {
                $('.tip').hide();
                window.history.go(-1);
              }, 1000)
              //		                    this.$router.go(-1);
            }
            this.onlineData = res.body.data;
          })
        },500)
			},
			type1() {
        this.typeShow = true;
//				this.$refs.mark.style.display = "block";
//				this.$refs.type.style.display = "block";
			},
			group() {
				this.$http.get(getOpenUrl() + "groupData", {
						params: {
							gid: this.$route.query.gid
						},
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}

					})
					.then((res) => {
						this.groupData = res.body.data;
					})
			}

		},
		activated() {
			//路由缓存 前进后退
			$('.load').hide();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.col {
		height: 1rem;
	}

	.setting1 {
		height: 0.7rem;
		position: relative;
		box-shadow: 0 0 5px #ebebeb;
    padding-top:0.3rem;
	}

	.setting-all {
		padding: 0 0.2rem;
		overflow: hidden;
	}

	.jiben .a1 {
		width: 0.18rem;
		height: 0.7rem;
		background: url(../../../images/back.png) no-repeat 0 50%;
		background-size: 0.18rem 0.34rem;
		float: left;
		display: block;
	}

	.jiben .a2 {
		width: 0.32rem;
		height: 0.7rem;
		background: url(../../../images/ok.png) no-repeat 0 50%;
		background-size: 0.32rem 0.2rem;
		float: right;
		display: block;
	}

	.forget {
		line-height: 0.7rem;
		font-size: 0.26rem;
		display: block;
		float: left;
		color: #008dd3;
		position: absolute;
		left: 50%;
		-webkit-transform: translateX(-50%);
		-moz-transform: translateX(-50%);
		-ms-transform: translateX(-50%);
		-o-transform: translateX(-50%);
		transform: translateX(-50%);
	}

	.setting2 {
		width: 100%;
		overflow: hidden;
		box-shadow: 0 0 5px #ebebeb;
	}

	.setting2 .sl {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
		background: url(../../../images/jiben.png) no-repeat 50% 50%;
		background-size: 0.24rem 0.24rem;
	}

	.setting2 .fl {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
		background: url(../../../images/fenlei.png) no-repeat 50% 50%;
		background-size: 0.22rem 0.22rem;
	}

	.setting2 .tx {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
		background: url(../../../images/tx.png) no-repeat 50% 50%;
		background-size: 0.22rem 0.22rem;
	}

	.setting2 .bi {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
		background: url(../../../images/bannericon.png) no-repeat 50% 50%;
		background-size: 0.24rem 0.18rem;
	}

	.setting2 .bg {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
		background: url(../../../images/background.png) no-repeat 50% 50%;
		background-size: 0.24rem 0.20rem;
	}

	.setting2 .qzjs {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
		background: url(../../../images/qzjs.png) no-repeat 50% 50%;
		background-size: 0.24rem 0.20rem;
	}

	.setting2-all {
		overflow: hidden;
	}

	.setting2 .sr {
		height: 1.14rem;
		border-bottom: 1px solid #ebebeb;
	}

	.setting2 .bt0 {
		border-bottom: 0;
	}

	.setting2 .sr-ul {
		overflow: hidden;
		float: left;
		width: calc(100% - 0.7rem);
	}

	.setting2 .sr-ul-li1 {
		font-size: 0.22rem;
		color: #1a1a1a;
		line-height: 0.37rem;
	}

	.setting2 .sr-ul-li2 {
		font-size: 0.20rem;
		color: #575757;
		line-height: 0.36rem;
	}

	.setting2-all .lh84 {
		height: 0.84rem;
		line-height: 0.84rem;
	}

	.setting2-all .f {
		float: left;
		padding-right: 0.2rem;
	}

	.setting2-all .r {
		float: right;
		padding-right: 0.2rem;
	}

	.setting2-all .sr-input {
		display: block;
		float: right;
		text-align: right;
		font-size: 0.22rem;
		color: #242424;
	}

	.setting2-all .lh87 {
		height: 0.87rem;
		line-height: 0.87rem;
	}

	.setting2-all .down-ol {
		line-height: 0.87rem;
		color: #8c96a0;
		font-size: 0.2rem;
		background: url(../../../images/backg.png) no-repeat 0.56rem 50%;
		background-size: 0.24rem 0.12rem;
		padding-right: 0.56rem;
		float: right;
	}

	.setting2-all .down-ol-d {
		width: 5.4rem;
		line-height: 0.6rem;
		color: #8c96a0;
		font-size: 0.2rem;
		position: absolute;
		top: 3.15rem;
		background: #fff;
		z-index: 10;
		border: 1px solid #eeeeee;
	}

	.setting2-all .lh98 {
		height: 0.98rem;
		line-height: 0.98rem;
	}

	.setting2-all .t68 {
		position: absolute;
		top: 5.71rem;
	}

	.setting2-all .lh134 {
		height: 1.34rem;
		line-height: 1.34rem;
	}

	.setting2-all .jia {
		width: 0.76rem;
		height: 1.34rem;
		background: url(../../../images/jia.png) no-repeat 0 50%;
		background-size: 0.76rem 0.76rem;
		float: right;
		padding-right: 0.2rem;
	}

	.setting2-all .t685 {
		position: absolute;
		top: 6.85rem;
	}

	.p-ul {
		float: right;
		display: flex;
	}

	.p-li1 {
		height: 0.5rem;
		width: 0.5rem;
		/*border-radius: 50%;*/
		float: left;
		flex: 1;
		margin-top: 0.25rem;
	}

	.p-li2 {
		height: 0.12rem;
		width: 0.24rem;
		float: left;
		background: url(../../../images/backg.png) no-repeat;
		background-size: cover;
		margin: 0.4rem 0.2rem 0 0.14rem;
	}

	.list {
		border-bottom: 1px solid #ebebeb;
		padding-left: 0.23rem;
		font-size: 0.24rem;
		overflow: hidden;
	}

	.sp1 {
		color: #242424;
		display: block;
		float: left;
		line-height: 0.97rem;
		font-size: 0.22rem;
	}

	.sp2 {
		color: #242424;
		display: block;
		height: 0.97rem;
		line-height: 0.97rem;
		width: 100%;
	}

	.sp3 {
		padding-right: 0.2rem;
		height: 2.8rem;
	}

	.sp3 img {
		width: 100%;
		height: 100%;
		display: block;
		border-radius: 0.05rem;
	}

	.mb41 {
		margin-bottom: 0.41rem;
		border-bottom: 0;
	}

	.r {
		line-height: 0.97rem;
		float: right;
		padding-right: 0.2rem;
		color: #9F9F9F;
		display: block;
		text-align: right;
	}

	.r img {
		width: 0.9rem;
		height: 0.9rem;
		border-radius: 50%;
		display: block;
		padding: 0.3rem 0;
		cursor: pointer;
	}

	.lh1 {
		line-height: 1.34rem;
	}

	.mark {
		width: 100%;
		height: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		/*background: rgba(36, 153, 200, 0.3);*/
		display: none;
		z-index: 5;
	}

	.window {
		width: 100%;
		z-index: 10;
		/*display: none;*/
		position: fixed;
		bottom: 0;
		background: #fff;
	}

	.window-header {
		height: 0.9rem;
		padding-left: 0.38rem;
		padding-right: 0.25rem;
		position: relative;
	}

	.window-a2 {
		width: 0.28rem;
		height: 0.28rem;
		display: block;
		background: url(../../../images/close.png) no-repeat;
		background-size: cover;
		float: right;
		margin-top: 0.34rem;
	}

	.window-forget {
		line-height: 0.88rem;
		font-size: 0.34rem;
		display: block;
		float: left;
		color: #008dd3;
		position: absolute;
		left: 50%;
		-webkit-transform: translateX(-50%);
		-moz-transform: translateX(-50%);
		-ms-transform: translateX(-50%);
		-o-transform: translateX(-50%);
		transform: translateX(-50%);
	}

	.window p {
		height: 0.86rem;
		border-top: 1px solid #e0e0e0;
		border-bottom: 1px solid #e0e0e0;
	}

	.window p span {
		line-height: 0.84rem;
		width: 0.84rem;
		border-bottom: 0.03rem solid #008dd3;
		color: #008dd3;
		font-size: 0.22rem;
		display: block;
		margin-left: 0.17rem;
		text-align: center;
	}

	.window ul {
		overflow-x: auto;
		display: flex;
	}

	.window ul li {
		flex: 1;
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		float: left;
		font-size: 0.25rem;
		color: #242424;
		padding-top: 0.2rem;
		margin-bottom: 0.2rem;
		padding-left: 0.2rem;
	}

	.window ul li span {
		display: block;
		width: 0.5rem;
		height: 0.5rem;
		/*border-radius: 50%;*/
		font-size: 0.2rem;
		color: #242424;
		margin: 0 auto;
	}
	/*分类*/

	.window1 {
		width: 100%;
		z-index: 10;
		/*display: none;*/
		position: fixed;
		bottom: 0;
		background: #fff;
	}

	.window-header1 {
		height: 0.9rem;
		padding-left: 0.38rem;
		padding-right: 0.25rem;
		position: relative;
	}

	.window-a21 {
		width: 0.28rem;
		height: 0.28rem;
		display: block;
		background: url(../../../images/close.png) no-repeat;
		background-size: cover;
		float: right;
		margin-top: 0.34rem;
	}

	.window-forget1 {
		line-height: 0.88rem;
		font-size: 0.34rem;
		display: block;
		float: left;
		color: #008dd3;
		position: absolute;
		left: 50%;
		-webkit-transform: translateX(-50%);
		-moz-transform: translateX(-50%);
		-ms-transform: translateX(-50%);
		-o-transform: translateX(-50%);
		transform: translateX(-50%);
	}

	.window1 p {
		height: 0.86rem;
		border-top: 1px solid #e0e0e0;
		border-bottom: 1px solid #e0e0e0;
	}

	.window1 p span {
		line-height: 0.84rem;
		float: left;
		width: 0.84rem;
		border-bottom: 0.03rem solid #008dd3;
		color: #008dd3;
		font-size: 0.22rem;
		display: block;
		margin-left: 0.17rem;
		text-align: center;
	}

	.window1 ul {
		overflow-y: scroll;
		overflow-x: hidden;
		height: 7rem;
		float: left;
		width: 50%;
		box-sizing: border-box;
		border-right: 1px solid #eee;
	}

	.window1 ul li {
		border-bottom: 1px solid #eee;
		width: 100%;
		height: 0.5rem;
		line-height: 0.5rem;
		float: left;
		font-size: 0.25rem;
		color: #242424;
		padding-top: 0.2rem;
		padding-bottom: 0.2rem;
		padding-left: 0.2rem;
	}

	.window1 ul li span {
		display: block;
		height: 0.5rem;
		font-size: 0.2rem;
		color: #242424;
		margin: 0 auto;
	}
	/*分类*/

	.message2-all {
		margin-top: 0.15rem;
		border-radius: 0.05rem;
		font-size: 0.22rem;
		color: #8c96a0;
		line-height: 0.68rem;
		float: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.message2-all .li1 {
		float: left;
		padding-left: 0.14rem;
		padding-right: 0.14rem;
		height: 100%;
	}

	.message2-all .li2 {
		margin-right: 0.14rem;
		height: 0.68rem;
		width: 0.24rem;
		background: url(../../../images/backg.png) no-repeat 0 50%;
		background-size: 0.24rem 0.12rem;
		float: left;
	}
	/*弹出*/

	.windowfl {
		z-index: 10;
		background: #fff;
		border: 1px solid #E0E0E0;
		margin: 0 auto;
		position: absolute;
		top: 2.75rem;
		right: 0.5rem;
	}

	.windowfl ul {
		overflow-y: auto;
	}

	.windowfl ul li {
		border-bottom: 1px solid #E0E0E0;
		line-height: 0.6rem;
		font-size: 0.22rem;
		color: #8c96a0;
		padding: 0 0.2rem;
	}

	.active {
		background: #008DD3;
		color: #fff!important;
	}

	.mw {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		z-index: 100000000;
		display: none;
	}
</style>
