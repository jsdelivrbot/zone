<template>
	<div class="wrapper" style="overflow: auto;">
		<div class="message" v-show="isshowc">
			<div class="message1">
				<div class="message-all">
					<a href="javascript:history.back(-1);" class="a1"></a>
					<!--<a href="javascript:history.go(-1);">-->
					<span class="forget">活动</span>
					<a class="a2" v-if="this.hdData.id==undefined" @click="submit()">发表</a>
					<a class="a2" v-else @click="submit1()">发表</a>
				</div>
			</div>
			<div class="setting2">
				<div class="setting2-all lh84">
					<div class="title lh84"></div>
					<div class="sr lh84 l">
						<ul class="sr-ul lh84">
							<li class="sr-ul-li1 f lh84">标题：</li>
							<li class="lh84 r">
								<input type="text" class="sr-input lh84" ref="tit" :value="hdData.title" />
							</li>
						</ul>
					</div>
				</div>
				<div class="setting2-all lh84">
					<div class="zbdw lh84"></div>
					<div class="sr lh84 l">
						<ul class="sr-ul lh84">
							<li class="sr-ul-li1 f lh84">主办单位：</li>
							<li class="lh84 r">
								<input type="text" class="sr-input lh84" ref="sponsor" :value="eventData.sponsor" />
							</li>
						</ul>
					</div>
				</div>
				<div class="setting2-all lh84">
					<div class="sj lh84"></div>
					<div class="sr lh84 l pr">
						<ul class="sr-ul lh84">
							<li class="sr-ul-li1 f lh84">活动时间：</li>
							<li class="lh84 r">
								<div class="block" @click="setDate1" style="font-size: 0.22rem;height: 100%;width: 50%;text-align: center;" ref="start">{{eventData.stime}}</div>
								<div class="block" @click="setDate2" style="font-size: 0.22rem;height: 100%;width: 50%;text-align: center;" ref="end">{{eventData.etime}}</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="setting2-all lh84">
					<div class="dd lh84"></div>
					<div class="sr lh84 l">
						<ul class="sr-ul lh84">
							<li class="sr-ul-li1 f lh84">活动地点：</li>
							<li class="lh84 r">
								<input type="text" class="sr-input lh84" ref="area" :value="eventData.area" />
							</li>
						</ul>
					</div>
				</div>
				<div class="form">
					<li class="li4">
						<div class="div1">
							<span class="span4"></span>
						</div>
						<p @click="togglex();">
							<span>所在省份：</span>
							<ul class="p-ul">
								<li class="p-li1" ref="cap">{{eventData.sponsor}}</li>
								<li class="p-li2"></li>
							</ul>
						</p>
					</li>

					<li class="li5">
						<div class="div1">
							<span class="span5"></span>
						</div>
						<p @click="toggle2();load1('','',eventData.city)">
							<span>所在城市：</span>
							<ul class="p-ul">
								<li class="p-li1" ref="city1">{{eventData.area}}</li>
								<li class="p-li2"></li>
							</ul>
						</p>
					</li>
					<li class="li5">
						<div class="div1">
							<span class="lx"></span>
						</div>
						<p @click="type1()">
							<span>活动类型：</span>
							<ul class="p-ul">
								<li class="p-li1" ref="type1">{{eventData.type}}</li>
								<li class="p-li2"></li>
							</ul>
						</p>
					</li>
				</div>
				<div class="setting2-all lh84">
					<div class="rs lh84"></div>
					<div class="sr lh84 l">
						<ul class="sr-ul lh84">
							<li class="sr-ul-li1 f lh84">所需人数：</li>
							<li class="lh84 r">
								<input type="text" class="sr-input lh84" ref="limitCount" :value="eventData.limitCount" />
							</li>
						</ul>
					</div>
				</div>
				<div class="setting2-all lh84">
					<div class="lh84 xb"></div>
					<div class="sr bt0 lh84 l">
						<ul class="sr-ul lh84">
							<li class="sr-ul-li1 f lh84">性别要求：</li>
							<li class="lh84 r" style="font-size: 0.22rem;">
								男：<input type="radio" class="sr-input lh84" name="sex" :value="1" ref="man" @click="s()" style="height: 0.24rem;flex: 0.1;margin-top: 0.3rem;" :checked="this.eventData.sex==1?true:false" /> 女：
								<input type="radio" class="sr-input lh84" name="sex" :value="2" ref="woman" @click="s()" style="height: 0.24rem;flex: 0.1;margin-top: 0.3rem;" :checked="this.eventData.sex==2?true:false" /> 不限：
								<input type="radio" class="sr-input lh84" name="sex" :value="0" ref="other" @click="s()" style="height: 0.24rem;flex: 0.1;margin-top: 0.3rem;" :checked="this.eventData.sex==0?true:false" />
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="line"></div>
			<!--必填资料-->
			<div class="zl">
				<div class="zltop">必填资料</div>
				<div class="setting2-all lh84">
					<div class="name lh84"></div>
					<div class="sr lh84 l">
						<ul class="sr-ul lh84">
							<li class="sr-ul-li1 f lh84">真实姓名：<span class="sp1">*</span></li>
							<div class="nav-right" ref="cb">
								<li class="li4">
									<label>
                                	<input type="checkbox" ref="check1" name="check1" :value="1"  @click="c()" :checked="this.opts.friend==1?true:false"><b></b>
                            	</label>
								</li>
							</div>
						</ul>
					</div>
				</div>
				<div class="setting2-all lh84">
					<div class="phone lh84"></div>
					<div class="sr lh84 l">
						<ul class="sr-ul lh84">
							<li class="sr-ul-li1 f lh84">手机：<span class="sp1">*</span></li>
							<li class="lh84 r">
								<div class="nav-right" ref="cb">
									<li class="li4">
										<label>
                                    	<input type="checkbox" ref="check2" name="check2" :value="1" @click="c()" :checked="this.opts.allow==1?true:false"><b></b>
                                	</label>
									</li>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="setting2-all lh84">
					<div class="qq lh84"></div>
					<div class="sr bt0 lh84 l">
						<ul class="sr-ul lh84">
							<li class="sr-ul-li1 f lh84">微信：<span class="sp1">*</span></li>
							<li class="lh84 r">
								<div class="nav-right" ref="cb">
									<li class="li4">
										<label>
                                    	<input type="checkbox" ref="check3" name="check3" :value="1" @click="c()" :checked="this.opts.weichat==1?true:false"><b></b>
                                	</label>
									</li>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="line"></div>
				<div class="setting2-all lh84">
					<div class="jf lh84"></div>
					<div class="sr lh84 l">
						<ul class="sr-ul lh84">
							<li class="sr-ul-li1 f lh84">消耗积分：</li>
							<li class="lh84 r">
								<input type="text" class="sr-input lh84" ref="credit" :value="eventData.credit" />
							</li>
						</ul>
					</div>
				</div>
				<div class="setting2-all lh84">
					<div class="money lh84"></div>
					<div class="sr bt0 lh84 l">
						<ul class="sr-ul lh84">
							<li class="sr-ul-li1 f lh84">每人花销：</li>
							<li class="lh84 r">
								<input type="text" class="sr-input lh84" ref="cost" :value="eventData.cost" />
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="line1">“非官方组织的活动，收取任何费，论坛不予承担任何责任”</div>
			<div class="setting2-all lh84">
				<div class="bm lh84"></div>
				<div class="sr lh84 l pr">
					<ul class="sr-ul lh84">
						<li class="sr-ul-li1 f lh84">报名截止时间：</li>
						<li class="lh84 r">
							<div class="block">
								<div class="block" @click="setDate" style="font-size: 0.24rem;height: 100%;" ref="time">{{this.hdData.deadline}}</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="setting2-all lh84" id="bt">
				<div class="nr lh84"></div>
				<div class="sr bt0 lh84 l">
					<ul class="sr-ul lh84" id="bt">
						<li class="sr-ul-li1 f lh84">内容：</li>
						<li class="lh84 r bt">
							<span style="display: block;" type="text" class="sr-input lh84 bt" ref="text" @click="toggle('comment')" id="neir" v-html="this.hdData.content"></span>
						</li>
					</ul>
				</div>
			</div>

			<div class="mark" ref="mark">

			</div>
  <mt-popup v-model="provinceShow" position="bottom" class="window">
			<!--<div class="window" ref="window">-->
				<div class="window-header">
					<span class="window-forget">所在省份</span>
					<a class="window-a2" @click="toggle1()"></a>
				</div>
				<p><span>请选择</span></p>
				<ul>
					<li v-for="(address,index) in addressData" :key="index" @click="load(address,address.area_id);toggle1();load1('',address.area_id)" :data_id="address.area_id" :style="address.title == eventData.province?'color:#008dd3':''">{{address.title}}</li>
				</ul>
			<!--</div>-->
  </mt-popup>

  <mt-popup v-model="cityShow" position="bottom" class="window">
			<!--<div class="window" ref="city">-->
				<div class="window-header">
					<span class="window-forget">所在城市</span>
					<a class="window-a2" @click="toggle3()"></a>
				</div>
				<p><span>请选择</span></p>
				<ul>
					<li v-for="(city,index) in cityData" :key="index" @click="toggle3();load1(city,'',city.area_id)" :style="city.title == eventData.city?'color:#008dd3':''">{{city.title}}</li>
				</ul>
			<!--</div>-->
  </mt-popup>

  <mt-popup v-model="lxShow" position="bottom" class="window">
			<!--<div class="window" ref="type">-->
				<div class="window-header">
					<span class="window-forget">选择类型</span>
					<a class="window-a2" @click="toggle4()"></a>
				</div>
				<p><span>请选择</span></p>
				<ul style="height: calc(100% - 2rem);" id="typebox">
					<li v-for="(type,index) in typeData" :key="index" @click="type1(type.name,type.id);toggle4()" :style="type.name == eventData.type?'color:#008dd3':''">{{type.name}}</li>
				</ul>
			<!--</div>-->
  </mt-popup>
		</div>
		<pop style="text-align: center" class="tip" :title="tip"></pop>
		<editor v-show="isshowe" v-on:message="recieveMessage" :content="editormsg"></editor>
    <load v-show="isload"></load>
	</div>
</template>

<script>
	var pid = '';
	var province = '';
	var cityid = '';
	var typeid = 0;
	import qs from 'qs'
	import { setCookie, getCookie } from '../../assets/js/cookie.js'
	import { getOpenUrl, insertHtmlAtCaret ,getToken} from '../../assets/js/common.js'
	import editor from './editor.vue'

	export default {
		components: {
			editor
		},
		data() {
			return {
        lxShow:false,
        cityShow:false,
        provinceShow:false,
        isload:false,
			  fn:'',
				tip: '',
				addressData: {},
				cityData: {},
				typeData: {},
				name: '',
				weichat: '',
				phone: '',
				start: '',
				end: '',
				sex: '',
				data: {},
				data: '',
				isshowe: false,
				isshowd: false, //删除图层确认
				isshowc: true,
				title: '',
				hdData: {},
				eventData: {},
				opts: {},
				editormsg: '',
				img: {}
			};

		},
		mounted() {

			$('.tip').hide();
			this.$http.get(getOpenUrl() + "areaData", {
					params: {

					},
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					this.addressData = res.body.data
					//pid = res.body.data.province;
					//this.cityId = res.body.data.city;
					$.each(this.addressData, function(k, v) {
						if(self.eventData.province == v.title) {
							pid = v.area_id;
						}
					});
				});
			if(this.opts.friend == 1) {
				this.$refs.check1.checked = true
			}
			if(this.opts.allow == 1) {
				this.$refs.check2.checked = true
			}
			if(this.opts.weichat == 1) {
				this.$refs.check3.checked = true
			}

			//一进页面选中的
			if(this.imgData = '') {
				this.imgData = this.img
			} else {
				this.imgData = this.imgData
			}

			if(this.$refs.start.innerText == '') {
				this.$refs.start.innerText = '请选择开始时间'
			}
			if(this.$refs.end.innerText == '') {
				this.$refs.end.innerText = '请选择结束时间'
			}
			var self = this;
			//活动帖子页面
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
					this.hdData = res.body.data;
					this.eventData = this.hdData.evendata;
					typeid = this.hdData.type;
					this.opts = this.eventData.opts;
					this.$mount(this.$refs)
					if(this.$refs.man.checked == true) {
						this.sex == 1
					}
					if(this.$refs.woman.checked == true) {
						this.sex == 2
					}
					if(this.$refs.other.checked == true) {
						this.sex == 0
					}
				})

			} else {
				this.hdData.title = '';
				this.hdData.sponsor = '';
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
			//时间插件
			setDate() {
				this.$calendar.show({
					onOk: (date) => {
						this.$refs.time.innerHTML = date;
						this.data = date
						this.hdData.deadline = this.$refs.time.innerHTML
						this.hdData.title = this.$refs.tit.value;
						this.eventData.sponsor = this.$refs.sponsor.value;
						this.eventData.area = this.$refs.area.value;
						this.eventData.limitCount = this.$refs.limitCount.value;
						this.eventData.credit = this.$refs.credit.value;
						this.eventData.cost = this.$refs.cost.value;
						this.eventData.sex = $('input[name="sex"]:checked').val();
						this.opts.friend = $('input[name="check1"]:checked').val();
						this.opts.allow = $('input[name="check2"]:checked').val();
						this.opts.weichat = $('input[name="check3"]:checked').val();
					}
				});

			},
			setDate1() {
				this.$calendar.show({
					onOk: (date) => {
						this.$refs.start.innerHTML = date;
						if(this.$refs.start.innerHTML == '') {
							this.$refs.start.innerHTML == '开始时间'
						}
						this.eventData.stime = this.$refs.start.innerHTML
						this.hdData.title = this.$refs.tit.value;
						this.eventData.sponsor = this.$refs.sponsor.value;
						this.eventData.area = this.$refs.area.value;
						this.eventData.limitCount = this.$refs.limitCount.value;
						this.eventData.credit = this.$refs.credit.value;
						this.eventData.cost = this.$refs.cost.value;
						this.eventData.sex = $('input[name="sex"]:checked').val();
						this.opts.friend = $('input[name="check1"]:checked').val();
						this.opts.allow = $('input[name="check2"]:checked').val();
						this.opts.weichat = $('input[name="check3"]:checked').val();
					}
				});

			},
			setDate2() {

				this.$calendar.show({
					onOk: (date) => {
						this.$refs.end.innerHTML = date;
						this.eventData.etime = this.$refs.end.innerHTML
						this.hdData.title = this.$refs.tit.value;
						this.eventData.sponsor = this.$refs.sponsor.value;
						this.eventData.area = this.$refs.area.value;
						this.eventData.limitCount = this.$refs.limitCount.value;
						this.eventData.credit = this.$refs.credit.value;
						this.eventData.cost = this.$refs.cost.value;
						this.eventData.sex = $('input[name="sex"]:checked').val();
						this.opts.friend = $('input[name="check1"]:checked').val();
						this.opts.allow = $('input[name="check2"]:checked').val();
						this.opts.weichat = $('input[name="check3"]:checked').val();
					}
				});

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
			submit(sheng, cityid) {
          var message=this.$refs.text.innerHTML
          let transMessage = this.utf16toEntities(message)
          this.eventData.etime = this.$refs.end.innerHTML
          this.hdData.title = this.$refs.tit.value;
          this.eventData.sponsor = this.$refs.sponsor.value;
          this.eventData.area = this.$refs.area.value;
          this.eventData.limitCount = this.$refs.limitCount.value;
          this.eventData.credit = this.$refs.credit.value;
          this.eventData.cost = this.$refs.cost.value;
          this.eventData.sex = $('input[name="sex"]:checked').val();
          this.opts.friend = $('input[name="check1"]:checked').val();
          this.opts.allow = $('input[name="check2"]:checked').val();
          this.opts.weichat = $('input[name="check3"]:checked').val();
          var num = /^\d/;
          sheng = pid;
          var start = new Date(this.$refs.start.innerText).getTime();
          var end = new Date(this.$refs.end.innerText).getTime();
          var dates = new Date(this.$refs.time.innerText).getTime();
          this.eventData.sex = $('input[name="sex"]:checked').val();
          var sexData = [];
          var bixu = [];
          if(this.$refs.tit.value == '') {
            this.isload = false;
            this.tip = "请输入标题";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.sponsor.value == '') {
            this.isload = false;
            this.tip = "请输入主办单位";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.start.innerText == '请选择开始时间') {
            this.isload = false;
            this.tip = "请输入开始时间";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.end.innerText == '请选择结束时间') {
            this.isload = false;
            this.tip = "请输入结束时间";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.area.value == '') {
            this.isload = false;
            this.tip = "请输入地点";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.cap.innerHTML == '') {
            this.isload = false;
            this.tip = "请选择所在省份";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.city1.innerHTML == '') {
            this.isload = false;
            this.tip = "请选择所在城市";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.type1.innerHTML == '') {
            this.isload = false;
            this.tip = "请选择活动类型";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.limitCount.value == '') {
            this.isload = false;
            this.tip = "请输入所需人数";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(!num.test(this.$refs.limitCount.value)) {
            this.isload = false;
            this.tip = "人数必须是数字";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.man.checked) {
            sexData.push(this.$refs.man.value);
          } else if(this.$refs.woman.checked) {
            sexData.push(this.$refs.woman.value);
          } else if(this.$refs.other.checked) {
            sexData.push(this.$refs.other.value);
          } else if(sexData.length == 0) {
            this.isload = false;
            this.tip = "请选择性别";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.check1.checked) {
            bixu.push(this.$refs.check1.value);
          } else if(this.$refs.check2.checked) {
            bixu.push(this.$refs.check2.value);
          } else if(this.$refs.check3.checked) {
            bixu.push(this.$refs.check3.value);
          } else if(bixu.length == 0) {
            this.isload = false;
            this.tip = "必须选择一项";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.credit.value == '') {
            this.isload = false;
            this.tip = "请输入消耗积分数";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(!num.test(this.$refs.credit.value)) {
            this.isload = false;
            this.tip = "消耗积分必须是数字";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.cost.value == '') {
            this.isload = false;
            this.tip = "请输入每人花销数";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(!num.test(this.$refs.cost.value)) {
            this.isload = false;
            this.tip = "每人花销必须是数字";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.time.innerHTML == '') {
            this.isload = false;
            this.tip = "请选择报名时间";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.text.innerHTML == '') {
            this.isload = false;
            this.tip = "请输入内容";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          } else {
            clearTimeout(this.fns);
            this.fns = setTimeout(() => {
              this.isload = true;
              this.$refs.mark.style.display = "block";
              this.$http.post(getOpenUrl() + "topicActivity", {
                cid: this.$route.query.cid,
                gid: this.$route.query.gid,
                title: this.$refs.tit.value,
                area: this.$refs.area.value,
                //					type:this.type,
                sTime: start,
                eTime: end,
                limitCount: this.$refs.limitCount.value,
                province: this.$refs.cap.innerHTML,
                city: this.$refs.city1.innerHTML,
                type: typeid,
                credit: this.$refs.credit.value,
                cost: this.$refs.cost.value,
                friend: this.name,
                allow: this.phone,
                weichat: this.weichat,
                sex: this.sex,
                deadline: dates,
                content: transMessage,
                attach: this.imgData,
                sponsor: this.$refs.sponsor.value,
              }, {
                headers: {
                  'Authorization': 'Bearer ' + getToken()
                },
              })
                .then((res) => {
                  this.isload = false;
                  this.$refs.mark.style.display = "none";
                  if (res.body.code == 0) {
                    this.$root.eventHub.$emit('cid');
                    this.$root.eventHub.$emit('jfSuccess');
                    this.$root.eventHub.$emit('refreshed');
                    //this.$root.eventHub.$emit('submitSuccess');
                    this.tip = "发布成功";
                    $('.tip').show();
                    setTimeout(() => {
                      $('.tip').hide();
                      let expireDays = 1000 * 60 * 60;
                      setCookie("cid", this.$route.query.cid, expireDays);
                      this.$router.back(-1)
                    }, 1000)
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
			},
			submit1(sheng, cityid) {
          var message=this.$refs.text.innerHTML
          let transMessage = this.utf16toEntities(message)
          this.eventData.etime = this.$refs.end.innerHTML
          this.hdData.title = this.$refs.tit.value;
          this.eventData.sponsor = this.$refs.sponsor.value;
          this.eventData.area = this.$refs.area.value;
          this.eventData.limitCount = this.$refs.limitCount.value;
          this.eventData.credit = this.$refs.credit.value;
          this.eventData.cost = this.$refs.cost.value;
          this.eventData.sex = $('input[name="sex"]:checked').val();
          this.opts.friend = $('input[name="check1"]:checked').val();
          this.opts.allow = $('input[name="check2"]:checked').val();
          this.opts.weichat = $('input[name="check3"]:checked').val();
          if(this.sex == '') {
            this.sex = this.eventData.sex
          }
          if(this.$refs.check1.checked) {
            this.name = 1;
          }
          if(this.$refs.check2.checked) {
            this.phone = 1;
          }
          if(this.$refs.check3.checked) {
            this.weichat = 1;
          }
          this.eventData.sex = $('input[name="sex"]:checked').val();
          var num = /^\d/;
          sheng = pid;
          var start = new Date(this.$refs.start.innerText).getTime();
          var end = new Date(this.$refs.end.innerText).getTime();
          var dates = new Date(this.$refs.time.innerText).getTime();

          var sexData = [];
          var bixu = [];
          if(this.$refs.tit.value == '') {
            this.isload = false;
            this.tip = "请输入标题";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.sponsor.value == '') {
            this.isload = false;
            this.tip = "请输入主办单位";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.start.innerText == '请选择开始时间') {
            this.isload = false;
            this.tip = "请输入开始时间";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.end.innerText == '请选择结束时间') {
            this.isload = false;
            this.tip = "请输入结束时间";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.area.value == '') {
            this.isload = false;
            this.tip = "请输入地点";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.cap.innerHTML == '') {
            this.isload = false;
            this.tip = "请选择所在省份";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.city1.innerHTML == '') {
            this.isload = false;
            this.tip = "请选择所在城市";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.type1.innerHTML == '') {
            this.isload = false;
            this.tip = "请选择活动类型";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.limitCount.value == '') {
            this.isload = false;
            this.tip = "请输入所需人数";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(!num.test(this.$refs.limitCount.value)) {
            this.isload = false;
            this.tip = "人数必须是数字";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.man.checked) {
            sexData.push(this.$refs.man.value);
          } else if(this.$refs.woman.checked) {
            sexData.push(this.$refs.woman.value);
          } else if(this.$refs.other.checked) {
            sexData.push(this.$refs.other.value);
          } else if(sexData.length == 0) {
            this.isload = false;
            this.tip = "请选择性别";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.check1.checked) {
            bixu.push(this.$refs.check1.value);
          } else if(this.$refs.check2.checked) {
            bixu.push(this.$refs.check2.value);
          } else if(this.$refs.check3.checked) {
            bixu.push(this.$refs.check3.value);
          } else if(bixu.length == 0) {
            this.isload = false;
            this.tip = "必须选择一项";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.credit.value == '') {
            this.isload = false;
            this.tip = "请输入消耗积分数";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(!num.test(this.$refs.credit.value)) {
            this.isload = false;
            this.tip = "消耗积分必须是数字";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.cost.value == '') {
            this.isload = false;
            this.tip = "请输入每人花销数";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(!num.test(this.$refs.cost.value)) {
            this.isload = false;
            this.tip = "每人花销必须是数字";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.time.innerHTML == '') {
            this.isload = false;
            this.tip = "请选择报名时间";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          }
          if(this.$refs.text.innerHTML == '') {
            this.isload = false;
            this.tip = "请输入内容";
            $('.tip').show();
            setTimeout(function() {
              $('.tip').hide();
            }, 1000)
            return;
          } else {
            clearTimeout(this.fns);
            this.fns = setTimeout(() => {
              this.isload = true;
              this.$http.post(getOpenUrl() + "ActivityEdit", {
                cid: this.$route.query.cid,
                gid: this.$route.query.gid,
                tid: this.$route.query.tid,
                title: this.$refs.tit.value,
                area: this.$refs.area.value,
                //					type:this.type,
                sTime: start,
                eTime: end,
                limitCount: this.$refs.limitCount.value,
                province: this.$refs.cap.innerHTML,
                city: this.$refs.city1.innerHTML,
                type: typeid,
                credit: this.$refs.credit.value,
                cost: this.$refs.cost.value,
                friend: this.name,
                allow: this.phone,
                weichat: this.weichat,
                sex: this.sex,
                deadline: dates,
                content: transMessage,
                attach: this.imgData,
                sponsor: this.$refs.sponsor.value,
              }, {
                headers: {
                  'Authorization': 'Bearer ' + getToken()
                },
              })
                .then((res) => {
                  this.isload = false;
                  if (res.body.code == 0) {
                    this.$root.eventHub.$emit('cid');
                    this.$root.eventHub.$emit('jfSuccess');
                    this.$root.eventHub.$emit('refreshed');
                    //this.$root.eventHub.$emit('submitSuccess');
                    this.tip = "编辑成功";
                    $('.tip').show();
                    setTimeout(() => {
                      $('.tip').hide();
                      let expireDays = 1000 * 60 * 60;
                      setCookie("cid", this.$route.query.cid, expireDays);
                      this.$router.back(-1)
                    }, 1000)
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
			},
			toggle(type, rid, trid) {
				switch(type) {
					case 'comment':
						//评论
            this.$root.eventHub.$emit('editDianji');
						this.hdData.title = this.$refs.tit.value;
						this.eventData.sponsor = this.$refs.sponsor.value;
						this.eventData.area = this.$refs.area.value;
						this.eventData.limitCount = this.$refs.limitCount.value;
						this.eventData.credit = this.$refs.credit.value;
						this.eventData.cost = this.$refs.cost.value;
						this.eventData.sex = $('input[name="sex"]:checked').val();
						this.opts.friend = $('input[name="check1"]:checked').val();
						this.opts.allow = $('input[name="check2"]:checked').val();
						this.opts.weichat = $('input[name="check3"]:checked').val();

						//						this.eventData.sex = $('input[name="sex"]:checked').val();
//						this.$refs.text.innerText = '';
						this.isshowc = false;
						this.isshowe = true;
						this.editormsg = this.$refs.text.innerText==''?'请输入帖子内容':this.$refs.text.innerText;
						break;
				}
				if(type != 'comment' && type != 'cancel') {
					//this.$refs.a1.style.height = "calc(100% - 1.64rem)";
					//this.$refs.a1.style.overflow="hidden";
				}
			},

			recieveMessage(data) {
				this.isshowc = data.isshowc;
				this.isshowe = data.isshowe;
				$('#neir').html(data.title);

				this.img = data.attach_id;
				this.imgData = this.img;

			},
			togglex: function() {
				this.eventData.province = this.$refs.cap.innerHTML;
				//this.$refs.mark.style.display = "block";
				//this.$refs.window.style.display = "block";
				this.provinceShow = true;
			},
			toggle1: function() {
				//this.$refs.mark.style.display = "none";
				//this.$refs.window.style.display = "none";
        this.provinceShow = false;
			},
			toggle2: function() {
				if(this.$refs.cap.innerHTML==''){
					this.tip = "请选择省份";
					$('.tip').show();
					setTimeout(function() {
						$('.tip').hide();
					}, 1000)
					return;
				}
        this.cityShow = true;
				this.eventData.city = this.$refs.city1.innerHTML;
//				this.$refs.mark.style.display = "block";
//				this.$refs.city.style.display = "block";
			},
			toggle3: function() {
			  this.cityShow = false;
//				this.$refs.mark.style.display = "none";
//				this.$refs.city.style.display = "none";
			},
			toggle4: function() {
			  this.lxShow = false;
				this.eventData.type = this.$refs.type1.innerHTML;
//				this.$refs.mark.style.display = "none";
//				this.$refs.type.style.display = "none";
			},
			load(value, id) {
				if(value && id) {
					this.eventData.province=this.$refs.cap.innerHTML = value.title;
					pid = id;
					return;
				}
				var self = this;
				this.$http.get(getOpenUrl() + "areaData", {
						params: {

						},
						headers: {
							'Authorization': 'Bearer ' + getToken()
						},
					})
					.then((res) => {
						this.addressData = res.body.data;
						this.hdData.title = this.$refs.tit.value;
						this.hdData.sponsor = this.$refs.sponsor.value;
						this.eventData.area = this.$refs.area.value;
						this.eventData.limitCount = this.$refs.limitCount.value;
						this.eventData.credit = this.$refs.credit.value;
						this.eventData.cost = this.$refs.cost.value;
						this.eventData.sex = $('input[name="sex"]:checked').val();
						this.opts.friend = $('input[name="check1"]:checked').val();
						this.opts.allow = $('input[name="check2"]:checked').val();
						this.opts.weichat = $('input[name="check3"]:checked').val();
					})
			},
			load1(value, id, cityid) {

				if(value && cityid) {
					this.eventData.city=this.$refs.city1.innerHTML = value.title;
					this.cityId = cityid = cityid;
					if(id = '') {
						id = pid;
					}
					return;
				}
				var curCity = value == '' && id == '' && cityid ? this.$refs.city1.innerHTML : '';
				this.$http.get(getOpenUrl() + "cityData", {
						params: {
							pid: pid
						},
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						this.cityData = res.body.data;
						this.hdData.title = this.$refs.tit.value;
						this.eventData.sponsor = this.$refs.sponsor.value;
						this.eventData.area = this.$refs.area.value;
						this.eventData.limitCount = this.$refs.limitCount.value;
						this.eventData.credit = this.$refs.credit.value;
						this.eventData.cost = this.$refs.cost.value;
						//this.$refs.city1.innerHTML = this.eventData.city = curCity;
						this.eventData.sex = $('input[name="sex"]:checked').val();
						this.opts.friend = $('input[name="check1"]:checked').val();
						this.opts.allow = $('input[name="check2"]:checked').val();
						this.opts.weichat = $('input[name="check3"]:checked').val();

						for(var i = 0; i < this.cityData.length; i++) {
							if(value.title == undefined) {
								this.$refs.city1.innerHTML = "";
							} else {

							}
						}
						this.$refs.city1.innerHTML = this.eventData.city = curCity;
					})
			},
			type1(value, id) {
				if(value && id) {
					this.$refs.type1.innerHTML = value;
					typeid = id;
					return;
				}
				this.lxShow = true;
//				this.$refs.mark.style.display = "block";
//				this.$refs.type.style.display = "block";
				var self = this;
				var curType = this.$refs.type1.innerHTML; //当前选中类型
				this.$http.get(getOpenUrl() + "ActivityCate", {
					params: {
						gid: this.$route.query.gid
					},
					headers: {
						'Authorization': 'Bearer ' + getToken()
					},
				}).then((res) => {
					this.typeData = res.body.data.data;
					this.hdData.title = this.$refs.tit.value;
					this.eventData.sponsor = this.$refs.sponsor.value;
					this.eventData.area = this.$refs.area.value;
					this.eventData.limitCount = this.$refs.limitCount.value;
					this.eventData.credit = this.$refs.credit.value;
					this.eventData.cost = this.$refs.cost.value;
					//性别
					this.eventData.sex = $('input[name="sex"]:checked').val();
					//必选项
					this.opts.friend = $('input[name="check1"]:checked').val();
					this.opts.allow = $('input[name="check2"]:checked').val();
					this.opts.weichat = $('input[name="check3"]:checked').val();

				})
			},
			s() {
				if(this.$refs.man.checked) {
					this.sex = this.$refs.man.value = 1;
				} else if(this.$refs.woman.checked) {
					this.sex = this.$refs.woman.value = 2;
				} else if(this.$refs.other.checked) {
					this.sex = this.$refs.other.value = 0;
				}
			},
			c() {
				if(this.$refs.man.checked == true) {
					this.sex == 1
				}
				if(this.$refs.woman.checked == true) {
					this.sex == 2
				}
				if(this.$refs.other.checked == true) {
					this.sex == 0
				}

				if(this.$refs.check1.checked == true) {
					this.name = 1
				} else {
					this.name = 0
				}

				if(this.$refs.check2.checked == true) {
					this.phone = 1
				} else {
					this.phone = 0
				}

				if(this.$refs.check3.checked == true) {
					this.weichat = 1
				} else {
					this.weichat = 0
				}

			},
		},
    watch: {
      isshowe: {
        handler:(val, oldVal)=>{
          if(val){
            console.log(1)
          }else{
            console.log(2)
          }
        },
        deep: true
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
	#neir {
		font-size: 0.22rem;
		height: 100%;
		width: 4rem;
		overflow: hidden;
		white-space: normal;
		text-overflow: ellipsis;
		flex: initial;
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

	.line1 {
		line-height: 0.51rem;
		height: 0.51rem;
		text-align: center;
		width: 100%;
		background: #f5f7fa;
		color: red;
		font-size: 0.2rem;
	}

	.sp1 {
		color: red;
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


	.title {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
		background: url(../../images/title.png) no-repeat 50% 50%;
		background-size: 0.24rem 0.24rem;
	}

	.sj {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
		background: url(../../images/click.png) no-repeat 50% 50%;
		background-size: 0.24rem 0.24rem;
	}

	.dd {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
		background: url(../../images/address.png) no-repeat 50% 50%;
		background-size: 0.24rem 0.24rem;
	}

	.cs {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
		background: url(../../images/captail.png) no-repeat 50% 50%;
		background-size: 0.24rem 0.24rem;
	}

	.lx {
		width: 0.60rem;
		height: 0.88rem;
		float: left;
		background: url(../../images/fenlei.png) no-repeat 50% 50%;
		background-size: 0.24rem 0.24rem;
	}

	.rs {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
		background: url(../../images/people.png) no-repeat 50% 50%;
		background-size: 0.24rem 0.24rem;
	}

	.xb {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
		background: url(../../images/sex.png) no-repeat 50% 50%;
		background-size: 0.24rem 0.24rem;
	}

	.name {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
		background: url(../../images/name.png) no-repeat 50% 50%;
		background-size: 0.24rem 0.24rem;
	}

	.phone {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
		background: url(../../images/phone.png) no-repeat 50% 50%;
		background-size: 0.24rem 0.24rem;
	}

	.qq {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
		background: url(../../images/qq.png) no-repeat 50% 50%;
		background-size: 0.24rem 0.24rem;
	}

	.jf {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
		background: url(../../images/jifen.png) no-repeat 50% 50%;
		background-size: 0.24rem 0.24rem;
	}

	.zbdw {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
		background: url(../../images/zbdw.png) no-repeat 50% 50%;
		background-size: 0.24rem 0.24rem;
	}

	.money {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
		background: url(../../images/money.png) no-repeat 50% 50%;
		background-size: 0.24rem 0.24rem;
	}

	.bm {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
		background: url(../../images/baoming.png) no-repeat 50% 50%;
		background-size: 0.24rem 0.24rem;
	}

	.nr {
		width: 0.60rem;
		height: 1.14rem;
		float: left;
		background: url(../../images/qzjs.png) no-repeat 50% 50%;
		background-size: 0.24rem 0.24rem;
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

	.zltop {
		height: 0.84rem;
		line-height: 0.84rem;
		font-size: 0.26rem;
		color: #008dd3;
		padding-left: 0.2rem;
		border-bottom: 1px solid #ebebeb;
	}

	.block {
		width: 100%;
	}

	#element {
		width: 100%;
		display: block;
		flex: 1;
		/*pointer-events: none;*/
	}

	#element i {
		display: none;
	}

	.pr {
		padding-right: 0.2rem;
	}
	/*选择省份城市*/

	.form {
		overflow: hidden;
	}

	.form-p {
		width: 100%;
		line-height: 0.73rem;
		margin-top: 0.07rem;
		border-bottom: 1px solid #e0e0e0;
		font-size: 0.26rem;
		color: #008dd3;
	}

	.form li {
		width: 100%;
		height: 0.88rem;
		line-height: 0.88rem;
		font-size: 0.22rem;
		float: left;
		display: flex;
	}

	.form p {
		border-bottom: 1px solid #e0e0e0;
		float: left;
		flex: 1;
	}

	.form .div1 {
		width: 0.6rem;
		height: 100%;
		float: left;
		display: table-cell;
		vertical-align: middle;
		text-align: center;
	}

	.form .span1 {
		width: 0.2rem;
		height: 0.22rem;
		background: url(../../images/name.png) no-repeat;
		background-size: cover;
		display: inline-block;
		vertical-align: middle;
	}

	.form .span2 {
		width: 0.16rem;
		height: 0.23rem;
		background: url(../../images/phone.png) no-repeat;
		background-size: cover;
		display: inline-block;
		vertical-align: middle;
	}

	.form .span3 {
		width: 0.24rem;
		height: 0.16rem;
		background: url(../../images/mail.png) no-repeat;
		background-size: cover;
		display: inline-block;
		vertical-align: middle;
	}

	.form .span4 {
		width: 0.29rem;
		height: 0.26rem;
		background: url(../../images/china.png) no-repeat;
		background-size: cover;
		display: inline-block;
		vertical-align: middle;
	}

	.form .span5 {
		width: 0.26rem;
		height: 0.25rem;
		background: url(../../images/city.png) no-repeat;
		background-size: cover;
		display: inline-block;
		vertical-align: middle;
	}

	.form .span6 {
		width: 0.2rem;
		height: 0.22rem;
		background: url(../../images/test.png) no-repeat;
		background-size: cover;
		display: inline-block;
		vertical-align: middle;
	}

	.form input {
		height: 0.88rem;
		width: 4.17rem;
		color: #242424;
		text-align: right;
		float: right;
		padding-right: 0.23rem;
	}

	.form .p-ul {
		float: right;
		display: flex;
	}

	.form .p-li1 {
		height: 0.88rem;
		float: left;
		flex: 1;
		text-align: center;
	}

	.form .p-li2 {
		height: 0.24rem;
		width: 0.12rem;
		float: left;
		background: url(../../images/backright.png) no-repeat;
		background-size: cover;
		margin: 0.31rem 0.23rem 0 0.14rem;
	}
	/*选择省份城市*/

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

	.window {
		width: 100%;
		height: 6rem;
		z-index: 999;
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
		background: url(../../images/close.png) no-repeat;
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
		margin-top: 0.16rem;
		margin-left: 0.20rem;
		height: calc(100% - 1rem);
		overflow-y: auto;
	}

	.window ul li {
		line-height: 0.48rem;
		font-size: 0.2rem;
		color: #242424;
	}
	/*复选框*/

	.nav-right {
		width: 0.46rem;
		height: 0.88rem;
		position: absolute;
		right: 0.2rem;
	}

	.nav-right .li4 {
		width: 0.46rem;
		height: 0.88rem;
		float: right;
		position: relative;
		right: 0;
	}

	label {
		width: 0.46rem;
		height: 0.46rem;
		border-radius: 50%;
		display: block;
		position: relative;
		z-index: 10;
		top: 50%;
		transform: translateY(-50%);
	}

	input[type="checkbox"] {
		display: none;
		position: absolute;
	}

	input[type="checkbox"]+b {
		position: absolute;
		display: inline-block;
		width: 0.46rem;
		height: 0.46rem;
		border: 1px solid #ccc;
		cursor: pointer;
		border-radius: 50%;
		vertical-align: middle;
	}

	input[type="checkbox"]:checked+b {
		background: url(../../images/checkbox.png)no-repeat;
		background-size: cover;
		border: none;
	}
</style>
