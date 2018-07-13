<template>
    <div id="headed">
        <div class="header">
        	<div class="headerall">
				<a href="javascript:history.back(-1);" class="a1"></a>
				<span class="forget">编辑圈子资料</span>
				<!--<a class="a2" href="#/qzjieshao" @click="goNext">下一步</a>-->
            <a class="a2" @click="goNext">下一步</a>
			</div>
	    </div>
        <div class="content">
        	<div class="con-top">
        		<img src="../../../images/other/qzbanner.png" class="img1"/>
        		<div class="img2all">
              <!--<input style="opacity:0;position: absolute;width:1.8rem;height:1.8rem;" type="file" accept="image/*" capture="camera" id="imgView" @change="onchange">-->
              <input style="opacity:0;position: absolute;width:1.8rem;height:1.8rem;" type="file" accept="image/*" id="imgView" @change="onchange">
        			<img src="../../../images/personLogo.png" id="preview" class="img2"/>
        		</div>

        	</div>
        	<div class="con-bottom">
        		<div class="txt">
        			<input type="text" ref="qzName" placeholder="圈子名称"/>
        		</div>
        	</div>
        	<div class="li">
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
			</div>

			<div class="li">
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
			</div>
        </div>
        <!--<my-footer></my-footer>-->
        <pop style="text-align: center" class="tip" :title="tip"></pop>
        <div class="mark" ref="mark"></div>
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
				<li v-for="(city,index) in cityData" :key="index" @click="toggle3();load1(city,'',city.area_id)">{{city.title}}</li>
			</ul>
		<!--</div>-->
      </mt-popup>
      <load v-show="isload"></load>
    </div>
</template>

<script>
	var pid = '';
	var agencyid = '';
	var province = '';
	var cityid = '';
    import qs from 'qs'
    import { setCookie, getCookie } from '../../../assets/js/cookie.js'
    import {getOpenUrl,getToken} from '../../../assets/js/common.js'
    export default{
        data(){
            return {
              provinceShow:false,
              cityShow:false,
              isload:false,
              imgPath:'',
              tip:'',
              addressData:{},
              cityData:{}
            }
        },
        methods: {
        	toggle: function() {
//      		console.log(this.$refs.window.style.display='block')
//      		return
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
        if(this.$refs.cap.innerHTML == ''){
          this.tip = '省份不能为空';
          $('.tip').show();
          setTimeout(function(){
            $('.tip').hide();
          },1000)

          return;
        }
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
			load(value, id) {
				pid = id;
				this.$http.get(getOpenUrl() + "areaData", {
						params: {

						},
            headers: {
              "Authorization": "Bearer " + getToken()
            },
					})
					.then((res) => {
						this.addressData = res.body.data
						for(var i = 0; i < this.addressData.length; i++) {
							this.$refs.cap.innerHTML = value.title;
						}

					})
			},
			load1(value, id, cityid) {
				cityid = cityid;
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
								this.cityId = cityid;
							}
						}
					});
			},
          onchange(e) {
            if (!e) { return; }
            // console.log(e)
            var reader = new FileReader();
            //获取文件
            var file = e['target']['files'][0];
            var imageType = /^image\//;
            //是否是图片
            if (!imageType.test(file['type'])) {
              this.tip = "请选择图片！";
              $('.tip').show();
              setTimeout(function(){
                $('.tip').hide();
              },1000);
              return;
            }
            //读取完成
            reader.onload = (e) => {
              //获取图片dom
              // console.log('reader',e)
              var img = document.getElementById("preview");

              var img_ava = e.target['result'];
              img.src = img_ava;
              this.imgBase = img_ava;
              console.log(this.imgBase);
              this.$http.post(getOpenUrl() + "/Upload",{
                logo: this.imgBase,
                type: 'group',
                category:'images'
              },{
                headers:{"Authorization": "Bearer " + getToken()}
              }).then((res)=> {
                var data = res.body.data;
                console.log(res.body);
                this.imgPath = res.body.data.path;
                console.log(this.imgPath);
                if (res.body.status) {
                  //this.getData();
                }
              })
            };
            reader.readAsDataURL(file);
          },
          goNext(){
        	  this.isload = true;
            //console.log(this.$refs.qzName.value);
            this.$http.post(getOpenUrl() + "/user/grouplogo",{
              	logo: this.imgPath,
              	name: this.$refs.qzName.value,
              	province: pid,
				        city: this.cityId,
                str_rand:this.$route.query.str
            },{
              headers:{"Authorization": "Bearer " + getToken()}
            }).then((res)=> {
              this.isload = false;
              //var data = res.body.data;
              console.log(res.body);
              if (res.body.status) {
                this.$router.push({path: '/qzjieshao',
                  query:{str1: this.$route.query.str}
                });
              }else{
                this.tip = res.body.error_description;
                $('.tip').show();
                setTimeout(function(){
                  $('.tip').hide();
                },1000)
              }
            })
          }
        },
        mounted(){
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
          //是否存在input焦点事件或图层打开事件
          $('input').focus(function(){
            //获取焦点
            let expireDays = 1000 * 60 * 60 ;
            setCookie("inputkey", 1, expireDays);
          });
          let self = this;
          $(document).bind('click', function(e){
            var target = $(e.target);
            if(target.closest("input").length == 0 && target.closest('.a1').length == 0){
              setCookie("inputkey", '', -1);
            }
          });
        },
        beforeRouteLeave (to, from, next) {
          //路由离开时
          var isInputKey = parseInt(getCookie('inputkey'));
          if (isInputKey == 1){
            setCookie("inputkey", '', -1);
            next(false)
          }else{
            next()
          }
        }
    }
</script>

<style scoped="scoped">
  .tip{display: none;}
  .header{height: 0.7rem;box-shadow:0 0 5px #ebebeb;position: fixed;top: 0;width: 100%;padding-top: 0.3rem;}
  .headerall{padding: 0 0.2rem;}
  .header .a1{width: 0.18rem;height: 0.34rem;display: block;background: url(../../../images/back.png) no-repeat;background-size: cover;float:left;margin-top:0.2rem;}
  .header .a2{height: 0.7rem;display: block;float: right;font-size: 0.2rem;line-height: 0.7rem;color: #008DD3;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}

  .content{position: absolute;top: 1rem;width: 100%;}
  .con-top{position: relative;}
  .con-top .img1{width: 100%;height: 2.9rem;display: block;}
  .con-top .img2all{width: 1.8rem;height: 1.8rem;border-radius: 50%;position: absolute;left: 50%;bottom:-0.65rem;transform: translateX(-50%);padding: 0.04rem;background: #eaeaea;}
  .con-top .img2{width: 1.8rem;height: 1.8rem;display: block;border-radius: 50%;}
  .con-bottom{width: 100%;}
  .con-bottom .txt{height: 0.32rem;}
  .con-bottom input{line-height: 0.32rem;display: block;width: 100%;text-align: center;margin-top: 0.9rem;font-size:0.22rem;}
  /*cshengfen*/
  .li {
    width: 100%;
    height: 0.88rem;
    line-height: 0.88rem;
    font-size: 0.22rem;
    float: left;
    display: flex;
  }

  .li p {
    border-bottom: 0.01rem solid #e0e0e0;
    float: left;
    flex: 1;
  }
  .div1 {
    width: 0.6rem;
    height: 100%;
    float: left;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .span4 {
    width: 0.29rem;
    height: 0.26rem;
    background: url(../../../images/china.png) no-repeat;
    background-size: cover;
    display: inline-block;
    vertical-align: middle;
  }

  .span5 {
    width: 0.26rem;
    height: 0.25rem;
    background: url(../../../images/city.png) no-repeat;
    background-size: cover;
    display: inline-block;
    vertical-align: middle;
  }
  .p-ul {
    float: right;
    display: flex;
  }

  .p-li1 {
    height: 0.88rem;
    float: left;
    flex: 1;
    text-align: center;
  }

  .p-li2 {
    height: 0.24rem;
    width: 0.12rem;
    float: left;
    background: url(../../../images/backright.png) no-repeat;
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
    background: url(../../../images/close.png) no-repeat;
    background-size: cover;
    float: right;
    margin-top: 0.34rem;
  }

  .window-forget {
    line-height: 0.88rem;
    font-size: 0.22rem;
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
    border-top: 0.01rem solid #e0e0e0;
    border-bottom: 0.01rem solid #e0e0e0;
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
</style>


























