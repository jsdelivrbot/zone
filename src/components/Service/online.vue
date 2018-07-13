<template>
	<div class="online">
		<div class="header">
			<!--<a class="a1" href="javascript:history.back(-1);"></a>-->
      <a class="a1" @click="back"></a>
			<span class="forget">在线咨询</span>
			<a class="a2" @click="submit()"></a>
		</div>
		<div class="nav">
			<p class="p1">咨询的服务</p>
			<p class="p2">{{this.onlineData.ziy_name}}</p>
		</div>
		<div class="line"></div>
		<div class="form">
			<p class="form-p">您的联系方式</p>
			<ul>
				<li class="li1">
					<div class="div1">
						<span class="span1"></span>
					</div>
					<p>
						<span>姓名：</span>
						<input type="text" v-model="username" />
					</p>
				</li>

				<li class="li2">
					<div class="div1">
						<span class="span2"></span>
					</div>
					<p>
						<span>手机号：</span>
						<input type="text" v-model="phone" />
					</p>
				</li>

				<li class="li3">
					<div class="div1">
						<span class="span3"></span>
					</div>
					<p>
						<span>邮箱：</span>
						<input type="text" v-model="email" />
					</p>
				</li>

				<li class="li4">
					<div class="div1">
						<span class="span4"></span>
					</div>
					<p @click="toggle()">
						<span>所在省份：</span>
						<ul class="p-ul">
							<li class="p-li1" ref="cap"></li>
							<li class="p-li2"></li>
						</ul>
					</p>
				</li>

				<li class="li5">
					<div class="div1">
						<span class="span5"></span>
					</div>
					<p @click="toggle2()">
						<span>所在城市：</span>
						<ul class="p-ul">
							<li class="p-li1" ref="city1"></li>
							<li class="p-li2"></li>
						</ul>
					</p>
				</li>
				<li class="li5">
					<div class="div1">
						<span class="span7"></span>
					</div>
					<p @click="toggle4()">
						<span>办事处：</span>
						<ul class="p-ul">
							<li class="p-li1" ref="select1"></li>
							<li class="p-li2"></li>
						</ul>
					</p>
				</li>
				<li class="li6" style="height:1.8rem;">
					<div class="div1">
						<span class="span6"></span>
					</div>
					<p class="bt">
						<span>留言内容：</span>
						<!--<input type="text" ref="content" />-->
            <textarea ref="content" style="color:#242424"></textarea>
					</p>
				</li>
			</ul>
		</div>
		<div class="line"></div>
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
				<li v-for="(address,index) in addressData" :key="index" @click="load(address,address.area_id);toggle1();load1('',address.area_id)" :data_id="address.area_id">{{address.title}}</li>
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
				<li v-for="(city,index) in cityData" :key="index" @click="toggle3();load1(city,city.area_id,index)">{{city.title}}</li>
			</ul>
		<!--</div>-->
    </mt-popup>

    <mt-popup v-model="selectShow" position="bottom" class="window">
		<!--<div class="window" ref="select">-->
			<div class="window-header">
				<span class="window-forget">办事处</span>
				<a class="window-a2" @click="toggle5()"></a>
			</div>
			<p><span>请选择</span></p>
			<ul>
				<li v-for="(select,index) in selectData" :key="index" @click="toggle5();select1(select.agency_name,select.agency_id)" :class="select.is_select==1?'color':''">{{select.agency_name}}</li>
			</ul>
		<!--</div>-->
    </mt-popup>

		<pop :title="popmsg" v-show="ispop"></pop>
    <load v-show="isload"></load>
	</div>
</template>

<script>
	var pid = '';
	var agencyid = '';
	var province = '';
	var cityid = '';
	import { setCookie, getCookie } from '../../assets/js/cookie.js';
	import { getOpenUrl,getToken } from '../../assets/js/common.js';
	import BScroll from 'better-scroll'
	export default {
		data() {
			return {
        selectShow:false,
        cityShow:false,
        provinceShow:false,
        isload:false,
				username: '',
				phone: '',
				email: '',
				addressData: {},
				onlineData: {},
				cityData: {},
				cityId: '',
				show: true,
				isShow: true,
				ispop: false,
				popmsg: '',
				agency_id:'',
				selectData:{}
			};
		},
		methods: {
      back(){
        //this.$router.goBack();
        window.history.back(-1);
      },
			toggle: function() {
        this.provinceShow = true;
				this.isKey = true;
//				this.$refs.mark.style.display = "block";
//				this.$refs.window.style.display = "block";
				let expireDays = 1000 * 60 * 60;
				setCookie("inputkey", 1, expireDays);
			},
			toggle1: function() {
        this.provinceShow = false;
				this.isKey = false;
//				this.$refs.mark.style.display = "none";
//				this.$refs.window.style.display = "none";
				setCookie("inputkey", '', -1);
			},
			toggle2: function() {
        this.cityShow = true;
				this.isKey = true;
//				this.$refs.mark.style.display = "block";
//				this.$refs.city.style.display = "block";
				let expireDays = 1000 * 60 * 60;
				setCookie("inputkey", 1, expireDays);
			},
			toggle3: function() {
        this.cityShow = false;
				this.isKey = false;
//				this.$refs.mark.style.display = "none";
//				this.$refs.city.style.display = "none";
				setCookie("inputkey", '', -1);
			},
			toggle4: function() {
        this.selectShow = true;
				this.isKey = true;
//				this.$refs.mark.style.display = "block";
//				this.$refs.select.style.display = "block";
				let expireDays = 1000 * 60 * 60;
				setCookie("inputkey", 1, expireDays);
			},
			toggle5: function() {
        this.selectShow = false;
				this.isKey = false;
//				this.$refs.mark.style.display = "none";
//				this.$refs.select.style.display = "none";
				setCookie("inputkey", '', -1);
			},
			load(value, id) {
				pid = id;
				this.$http.get(getOpenUrl() + "areaData", {
						params: {

						},
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Authorization': 'Basic ' + getToken()
						},
					})
					.then((res) => {
						this.addressData = res.body.data
						for(var i = 0; i < this.addressData.length; i++) {
							this.$refs.cap.innerHTML = value.title;
						}

					})
			},
			load1(value, id, index) {
				cityid = id;
				if(id = '') {
					id = pid;
				}
				this.$http.get(getOpenUrl() + "cityData?pid=" + pid, {
						headers: {
							"Authorization": "Bearer " + getToken()
						}
					})
					.then((res) => {
						this.cityData = res.body.data;
						for(var i = 0; i < this.cityData.length; i++) {
							if(value.title == undefined) {
								this.$refs.city1.innerHTML = "";
							} else {
								this.$refs.city1.innerHTML = value.title;
								//this.cityId = cityid;
                this.city_id = cityid;
                console.log(this.city_id)
							}
						}
					});
			},
      load1Init(value, id){
        cityid = id;
        this.$http.get(getOpenUrl() + "cityData?pid=" + id, {
          headers: {
            "Authorization": "Bearer " + getToken()
          }
        })
          .then((res) => {
            this.cityData = res.body.data;
            this.$refs.city1.innerHTML = value;
          });
      },
			submit(sheng, cityid) {
        this.isload = true;
				sheng = pid;
        clearTimeout(this.fn);
        this.fn = setTimeout( ()=> {
          this.$http.post(getOpenUrl() + "doonline", {
            uname: this.username,
            ziy_id: this.$route.query.ziy_id,
            agency_id: agencyid,
            mobile: this.phone,
            email: this.email,
            province: pid,
            city: this.city_id,
            agency_id: this.agency_id,
            content: this.$refs.content.value
          }, {
            headers: {
              'Authorization': 'Bearer ' + getToken()
            }
          }).then((res) => {
            this.isload = false;
            if (res.body.code == '0000') {
              //this.ispop = true;
              this.popmsg = '留言成功';
              this.$toast(this.popmsg,{
                duration:'1500'
              });
              setTimeout(() => {
                this.ispop = false
                this.$router.go(-1);
              }, 1000);
            } else {
              //this.ispop = true;
              this.popmsg = res.body.error_description;
              this.$toast(this.popmsg,{
                duration:'1500'
              });
              setTimeout(() => {
                this.ispop = false
              }, 1000);
            }
          })
        },500)
			},
			select1(value, id){
				this.$http.get(getOpenUrl() + "resource/onlineMessage", {
					params: {
						id: this.$route.query.type,
						ziy_id: this.$route.query.ziy_id
					},
					headers: {
						"Authorization": "Bearer " + getToken()
					}
				})
				.then((res) => {
					this.selectData = res.body.data.agency;
					console.log(value)
					for(var i = 0; i < this.selectData.length; i++) {
						if(value == undefined) {
							this.$refs.select1.innerText = "";
						} else {
							this.$refs.select1.innerText = value;
							this.agency_id = id;
						}
					}
				});
			}
		},

		mounted() {
			this.$http.get(getOpenUrl() + "areaData", {
					params: {

					},
					headers: {
						"Authorization": "Bearer " + getToken()
					}
				})
				.then((res) => {
					this.addressData = res.body.data
					console.log(res)
				}),
				this.$http.get(getOpenUrl() + "resource/onlineMessage", {
					params: {
						id: this.$route.query.type,
						ziy_id: this.$route.query.ziy_id
					},
					headers: {
						"Authorization": "Bearer " + getToken()
					}
				})
				.then((res) => {
					this.onlineData = res.body.data;
					this.selectData = res.body.data.agency;
					console.log(this.selectData)
					this.username = this.onlineData.uname;
					this.phone = this.onlineData.mobile;
					this.email = this.onlineData.email;
					this.$refs.cap.innerHTML = this.onlineData.mprovince;
					this.$refs.city1.innerHTML = this.onlineData.mcity;
          this.load1Init(this.onlineData.mcity,res.body.data.province);
//					for(var i = 0; i < this.onlineData.length; i++) {
//
//					}
					for(var i = 0; i < this.selectData.length; i++) {
						if(this.selectData[i].is_select==1){
							this.$refs.select1.innerText = this.selectData[i].agency_name;
							this.agency_id=this.selectData[i].agency_id;
						}
					}
					this.agencyid = res.body.data.agency[0].agency_id;
					agencyid = this.agencyid;
					pid = res.body.data.province;
					this.cityId = res.body.data.city;
				});

			//是否存在input焦点事件或图层打开事件
			$('input').focus(function() {
				//获取焦点
				let expireDays = 1000 * 60 * 60;
				setCookie("inputkey", 1, expireDays);
			});
			let self = this;
			$(document).bind('click', function(e) {
				var target = $(e.target);
				if(target.closest("input").length == 0 && target.closest('.a1').length == 0 && !self.iskey) {
					setCookie("inputkey", '', -1);
				}
			});
		},

		beforeRouteLeave(to, from, next) {
			//路由离开时
			var isInputKey = parseInt(getCookie('inputkey'));
			if(isInputKey == 1) {
				setCookie("inputkey", '', -1);
				this.toggle1();
				this.toggle3();
				next(false)
			} else {
				next()
			}
		}
	}
</script>

<style scoped>
	.bt {
		border-bottom: none!important;
	}
	.color{
		color: #008DD3!important;
	}
	.header {
		height: 0.7rem;
		padding-left: 0.2rem;
		padding-right: 0.2rem;
		position: relative;
		box-shadow: 0 0 5px #ebebeb;
    padding-top: 0.3rem;
	}

	.header .a1 {
		width: 0.18rem;
		height: 0.34rem;
		display: block;
		background: url(../../images/back.png) no-repeat;
		background-size: cover;
		float: left;
		margin-top: 0.2rem;
	}

	.header .a2 {
		width: 0.32rem;
		height: 0.20rem;
		display: block;
		background: url(../../images/ok.png) no-repeat;
		background-size: cover;
		float: right;
		margin-top: 0.25rem;
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

	.nav {
		margin-top: 0.1rem;
		margin-left: 0.22rem;
		margin-bottom: 0.1rem;
	}

	.nav .p1 {
		line-height: 0.34rem;
		font-size: 0.22rem;
		color: #008dd3;
	}

	.nav .p2 {
		line-height: 0.49rem;
		font-size: 0.2rem;
		color: #575757;
	}

	.line {
		height: 0.2rem;
		background: #f0f0f0;
	}

	.form {
		margin-left: 0.2rem;
		overflow: hidden;
	}

	.form-p {
		width: 100%;
		line-height: 0.73rem;
		margin-top: 0.07rem;
		border-bottom: 0.01rem solid #e0e0e0;
		font-size: 0.22rem;
		color: #008dd3;
	}

	.form li {
		width: 100%;
		height: 0.88rem;
		line-height: 0.88rem;
		font-size: 0.2rem;
		float: left;
		display: flex;
	}

	.form p {
		border-bottom: 0.01rem solid #e0e0e0;
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
	.form .span7 {
		width: 0.26rem;
		height: 0.25rem;
		background: url(../../images/address.png) no-repeat;
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
		font-size: 0.2rem;
	}
  .form textarea{
    height:100%;
    width: 4.17rem;
    color: #242424;
    text-align: right;
    padding-top: 0.33rem;
    float: right;
    padding-right: 0.23rem;
    font-size: 0.2rem;
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

	.mark {
		width: 100%;
		height: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		background: rgba(36, 153, 200, 0.3);
		display: none;
		z-index: 5;
	}

	.window {
		width: 100%;
		height: 6rem;
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
		background: url(../../images/close.png) no-repeat;
		background-size: cover;
		float: right;
		margin-top: 0.34rem;
	}

	.window-forget {
		line-height: 0.88rem;
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
		height: calc(100% - 1.94rem);
		overflow-y: auto;
	}

	.window ul li {
		line-height: 0.48rem;
		font-size: 0.2rem;
		color: #242424;
	}
</style>
