<template>
	<div class="first">
		<div class="header">
			<div class="headerall">
				<a href="javascript:history.back(-1);" class="a1"></a>
				<span class="forget">提交疑问</span>
				<a class="a2" @click="submit" v-if="isUploading"></a>
        <a class="a2" style="background: none;color: rgb(0, 141, 211);font-size: 0.2rem;width: auto;height: auto;margin-top: 0.22rem;" v-else>正在上传..</a>
			</div>
		</div>
		<div class="nav">
			<div class="navall">
				<div class="nav-t">

					<ul class="nav-t-ul">
						<li class="nav-t-li1"></li>
						<li class="nav-t-li2">选择分类：</li>
					</ul>

				</div>
				<div class="nav-b">
					<!--<router-link :to="'/classify?pid='+pid" style="display: flex;">-->
						  <div class="input">
                <!--<a href="javascript:history.back(-1);" style="color:#000;display: block;">-->
                  {{catData}}
                <!--</a>-->
              </div>
					<!--</router-link>-->
					<input type="hidden" ref="catid" :value="catid" />
				</div>
			</div>
			<div class="navall">
				<div class="nav-t">
					<ul class="nav-t-ul">
						<li class="nav-t-li1 icont"></li>
						<li class="nav-t-li2">问题标题：<span class="sp">*</span></li>
					</ul>
				</div>
				<div class="nav-b">
					<div class="input nojt">
						<input type="text" ref="title" />
					</div>
				</div>
			</div>
			<div class="navall">
				<div class="nav-t">
					<ul class="nav-t-ul">
						<li class="nav-t-li1 icond"></li>
						<li class="nav-t-li2">问题描述：<span class="sp">*</span></li>
					</ul>
				</div>
				<div class="nav-b" style="height: 2rem;padding-right: 0;width: calc(100% - 0.46rem)">
					<div class="nojt" style="padding-left: 0.1rem;height: 100%;">
						<textarea  ref="desc" style="width: 100%;height: 100%;"></textarea>
					</div>
				</div>
			</div>
			<div class="navall">
				<div class="nav-t">
					<ul class="nav-t-ul">
						<li class="nav-t-li1 iconi"></li>
						<li class="nav-t-li2">图片：</li>
					</ul>
				</div>
				<div class="nav-b-b">
					<div class="plus" style="background:none;">
						<!--<input style="opacity:0;position: absolute;width:1.08rem;height:1.08rem;" type="file" accept="image/*" capture="camera" id="imgView" @change="onchange">-->
            <input style="opacity:0;position: absolute;width:1.08rem;height:1.08rem;" type="file" accept="image/*" id="imgView" @change="onchange">
						<img src="../../images/jia.png" id="preview" class="img2" style="width:1.08rem;height:1.08rem;"/>
					</div>
				</div>
			</div>
		</div>
    <div class="load" style="display:none;">
      <div class="load-container load4"><div class="loader"> <i></i></div></div>
    </div>
    <load v-show="isload"></load>
		<pop style="text-align: center" v-show="istip" class="tips" :title="tipmsg"></pop>
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
				pid: 0,
				catid: '',
				catData: '',
				imgBase: '',
				attach: [],
				istip: false,
				tipmsg: '',
        isload:false,
        isUploading:true
			};
		},
		mounted(){
			var pid = this.pid   = this.$route.query.pid;
			var cid = this.catid = this.$route.query.cid;
			if (!!pid && !!cid){
				this.getData(cid, pid);
			}else{
				this.$router.push('/classify')
			}

      //是否存在input焦点事件或图层打开事件
      $('input[type!=file]').focus(function(){
        //获取焦点
        let expireDays = 1000 * 60 * 60 ;
        setCookie("inputkey", 1, expireDays);
      });
      $('textarea').focus(function(){
        //获取焦点
        let expireDays = 1000 * 60 * 60 ;
        setCookie("inputkey", 1, expireDays);
      });

      $(document).bind('click', function(e){
        var target = $(e.target);
        if(target.closest("input").length == 0 && target.closest("textarea").length == 0 && target.closest('.a1').length == 0){
          setCookie("inputkey", '', -1);
        }
      });
		},
		methods: {
			getData (cid, pid){
				this.$http.get(getOpenUrl() + "workorder/getCatInfo", {
					headers:{
						'Authorization' : 'Bearer '+getToken()
					},
					params:{
						catid: cid,
					},
				}).then((res)=>{
					var data = res.body.data
					var html = '';
					$.each(data, function(k, v){
						html += (html ? '-' : '') + v
					})
					this.catData = html;
				});
			},
			onchange(e) {
				//上传
				if (!e) {
					return;
				}


				/*var files = e.target.files || e.dataTransfer.files;
				lrz(files[0], { width: 480 }).then(function(result) {
					console.log("file**"+result.base64);
				}).always(function() {
					// 清空文件上传控件的值
					e.target.value = null;
				});

				return ;*/

				var reader = new FileReader();

				//获取文件
				var file = e['target']['files'][0];
				var imageType = /^image\//;
				//是否是图片
				if (!imageType.test(file['type'])) {
					this.tipmsg = '请选择图片';
					this.istip  = true;
					setTimeout(function(){
						$('.tips').hide();
						this.istip  = false;
					},1000);
					return;
				}

				//读取完成
				reader.onload = (e) => {
					//获取图片dom
					var img = document.getElementById("preview");
					var img_ava = e.target['result'];
					img.src = img_ava;
          $('.load').show();
          this.isUploading = false;

          let self = this;

          lrz(file, { width: 400}).then(function(rst) {
            //console.log(rst.base64);
            //self.imgBase = rst.base64;
            self.$http.post(getOpenUrl() + "Upload",{
              logo: rst.base64,
              type: 'worder',
              category:'images'
            }, {
              headers:{
                'Authorization' : 'Bearer '+getToken()
              }
            }).then((res)=> {
              $('.load').hide();
              self.isUploading = true;
              var data = res.body.data;
              if (res.body.code == '0000'){
                self.attach.push(data.attach_id);
              }else{
                self.tipmsg = res.body.error_description;
                self.istip  = true;
                setTimeout(function(){
                  $('.tips').hide();
                  self.istip  = false;
                },1000)
              }
            })
            return rst;
          }).always(function() {
            // 清空文件上传控件的值
            e.target.value = null;
          });
					//this.imgBase = img_ava;
				};
				reader.readAsDataURL(file);
			},
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
			submit (){
				//提交
				var catid = this.catid;
				var title = this.$refs.title.value;
				let transMessage = this.utf16toEntities(title)
				var desc  = this.$refs.desc.value;
				let descMessage = this.utf16toEntities(desc)
				var self  = this;
				if (!title){
					this.tipmsg = '请输入评论内容';
					this.istip  = true;
					setTimeout(function(){
						$('.tips').hide();
						self.istip  = false;
					},1000);
					return false;
				}
				if (!desc){
					this.tipmsg = '请输入问题描述';
					this.istip  = true;
					setTimeout(function(){
						$('.tips').hide();
						self.istip  = false;
					},1000);
					return false;
				}
        clearTimeout(this.fn);
        this.fn = setTimeout( ()=> {
          this.isload = true;
          this.$http.post(getOpenUrl() + "WorkAdd", {
            cid1: catid,
            wo_title: transMessage,
            wo_desc: descMessage,
            attach: this.attach,
            mobile: '',
            email: ''
          }, {
            headers: {
              'Authorization': 'Bearer ' + getToken()
            }
          }).then((res) => {
            this.isload = false;
            var data = res.body.data;
            if (res.body.code == '0000') {
              this.$root.eventHub.$emit('tjSuccess');
              this.tipmsg = '提交成功';
              this.istip = true;
              setTimeout(() => {
                self.istip = false;
                $('.tips').hide();
                self.$router.back(-1)
              }, 1000)
            } else {
              this.tipmsg = res.body.error_description;
              this.istip = true;
              setTimeout(function () {
                self.istip = false;
              }, 1000)
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
        next(false)
      }else{
        next()
      }
    },
	}
</script>
<style scoped>
  	.header{z-index: 999;
      background: #fff;height: 0.7rem;box-shadow:0 0 5px #ebebeb;position: fixed;top: 0;width: 100%;padding-top: 0.3rem;}
	.headerall{padding: 0 0.2rem;}
	.header .a1{width: 0.18rem;height: 0.7rem;display: block;background: url(../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
    .header .a2{width: 0.32rem;height: 0.7rem;display: block;background: url(../../images/ok.png) no-repeat 0 50%;background-size: 0.32rem 0.2rem;float:right;}
    .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}

	.nav{position: absolute;top: 1rem;width: 100%;}
	.navall{padding: 0 0.2rem;}
	.navall li{float: left;}
	.nav-t-ul{margin-top: 0.13rem;overflow: hidden;}
	.nav-t-li1{width: 0.3rem;height: 0.57rem;background: url(../../images/fenlei.png) no-repeat 50% 50%;background-size: 0.24rem 0.24rem;}

	.nav-t-li1.iconi{background: url(../../images/bannericon.png) no-repeat 50% 50%;background-size: 100%;}
	.nav-t-li1.icont{background: url(../../images/cov-1.png) no-repeat 50% 50%;background-size: 110%;}
	.nav-t-li1.icond{background: url(../../images/cov-2.png) no-repeat 50% 50%;background-size: 110%;}

	.nav-t-li2{font-size: 0.22rem;color: #242424;line-height: 0.57rem;padding-left: 0.16rem;}

	.nav-b{width: calc(100% - 0.66rem);height: 0.68rem;border-radius: 0.05rem;border: 1px solid #ebebeb;margin-left: 0.46rem;padding-right: 0.2rem;}
	.nav-b .input{width:calc(100% - 0.22rem);height: 0.68rem;display: block;padding-left: 0.22rem;
    /*background: url(../../images/backright.png)no-repeat right 50%;*/
    background-size: 0.12rem 0.24rem;font-size: 0.2rem;line-height: .68rem;color:#242424;}
	.nav-b .input.nojt{background:none;}
	.nav-b .input input{width:100%;height:100%;display:block;}

	.plus{width: 1.08rem;height: 1.08rem;background: url(../../images/jia.png)no-repeat;background-size: cover;margin-left: 0.46rem;}
	.sp{color: #008dd3;}
</style>
