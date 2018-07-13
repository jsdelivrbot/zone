<template>
	<div class="comment">
		<div class="header">
			<div class="headerall">
				<a href="javascript:;" class="a1" @click="back()"></a>
			</div>
		</div>
		<!--v-if="content"-->
		<div class="placeholder" id="editor" contenteditable="true" name="message" ref="message" placeholder="请输入帖子内容"  v-html="content" style="outline: none;"></div>
		<!--<div class="placeholder" id="editor" contenteditable="true" name="message" placeholder="请输入评论内容" ref="message" v-else></div>-->
		<div class="ftall">
			<ul>
				<li class="li1">
					<!--<input style="opacity:0;position: absolute;width:0.34rem;height:0.64rem;" type="file" accept="image/*" capture="camera" id="imgView" @change="onchange">-->
          <input style="opacity:0;position: absolute;width:0.34rem;height:0.64rem;" type="file" accept="image/*" id="imgView" @change="onchange">
					<input type="button"/>
				</li>
				<li class="li2">
					<!--<input style="opacity:0;position: absolute;width:0.34rem;height:0.64rem;" type="file" accept="video/mp4" capture="camcorder" id="imgView" @change="video">-->
          <input style="opacity:0;position: absolute;width:0.34rem;height:0.64rem;" type="file" accept="image/*" id="imgView" @change="onchange">
					<input type="button"/>
				</li>

				<li class="li4" @click="submit" style="font-size: 0.2rem;color: #fff;border-radius: 0.2rem;" v-if="isUpload">确定</li>
        <li class="li4" style="font-size: 0.22rem;color: #fff;" v-else>正在上传..</li>
			</ul>
		</div>
		<div class="load" style="display:none;">
			<div class="load-container load4"><div class="loader"> <i></i></div></div>
		</div>
    <pop style="text-align: center" class="tips" :title="tip" v-show="istip"></pop>

	</div>
</template>

<script>
import qs from 'qs'
import {setCookie,getCookie} from '../../assets/js/cookie.js'
import {getOpenUrl,insertHtmlAtCaret,getToken} from '../../assets/js/common.js'
export default {
	props: {
		title: {
			type: String
		},
		id: {
			type: Number
		},
		content: {
		  //default:'请输入评论内容',
			type: String
		}
	},
	data (){
		return {
      tip: '',
      istip: false,
			imgData: [],
      //content:'请输入帖子内容',
      isUpload:true,
      config: {
//        width: 400,
//        height: 150,
        quality: 0.6
      },
		}
	},
	mounted (){

    //评论区域自动点击
//    this.$root.eventHub.$on('editDianji',()=>{
//      setTimeout(()=>{
//        $('#editor').focus();
//      },500);
//    });

    //this.$refs.message.innerHTML == '请输入帖子内容';
		$('[placeholder]').focus(function () {
			var input = $(this);
			if (input.html() == input.attr('placeholder')) {
				input.css('color', '#242424').html('');
				input.removeClass('placeholder');
			}
		}).blur(function () {
			var input = $(this);
			if (input.html() == '' || input.html() == input.attr('placeholder')) {
				input.addClass('placeholder');
				input.css('color', '#ccc').html(input.attr('placeholder'));
			}
		});

		/*$('#editor').focus(function(){
			//获取焦点
			let expireDays = 1000 * 60 * 60 ;
			setCookie("inputkey", 1, expireDays);
		});

		$(document).bind('click', function(e){
			var target = $(e.target);
			if(target.closest("#editor").length == 0 && target.closest('.a1').length == 0){
				setCookie("inputkey", '', -1);
			}
		});*/
	},
	methods: {
		back(){
			var data = {};
			data.isshowc = true;
			data.isshowe = false;
			//data.title   = $('#editor').html();
			data.attach_id   = this.imgData ;
			this.$emit('message', data);
		},
		video(e){
			//上传
			if (!e) {
				return;
			}
			var reader = new FileReader();
			//获取文件
			var file = e['target']['files'][0];
			console.log(file)
			var videoType = /^video\//;
			var mp4 = /.+\/mp4/;
			if (!mp4.test(file['type'])) {
        this.tip = "请选择mp4格式！";
        this.istip = true;
        setTimeout(() => {
          this.istip = false;
        }, 1000);
				return;
			}
//			//是否是视频
			if (!videoType.test(file['type'])) {
        this.tip = "请选择视频！";
        this.istip = true;
        setTimeout(() => {
          this.istip = false;
        }, 1000);
				return;
			}
			console.log(reader.result)
			//读取完成
			reader.onload = (e) => {
				//获取图片dom
				var video_ava = e.target['result'];
				this.videoBase = video_ava;
				$('.load').show();
        this.isUpload = false;
				this.$http.post(getOpenUrl() + "Upload",{
					logo: this.videoBase,
					type: 'group',
					category:'video'
				}, {
					headers:{
						'Authorization' : 'Bearer '+getToken()
					}
				}).then((res)=> {
					$('.load').hide();
          this.isUpload = true;
					var data = res.body.data;
					if (res.body.code == '0000'){
						this.imgData.push(data.attach_id);
						$('#editor').focus();
						insertHtmlAtCaret('<video src="'+data.url+'" class="uimgs"  style="max-width:90%" controls="controls">'+'</video>');
					}else{
            this.tip = res.body.error_description;
            this.istip = true;
            setTimeout(() => {
              this.istip = false;
            }, 1000);
					}
				})
			};
			reader.readAsDataURL(file);
		},

		onchange(e){
			//上传
			if (!e) {
				return;
			}
			var reader = new FileReader();
			//获取文件
			var file = e['target']['files'][0];
			var imageType = /^image\//;
			//是否是图片
			if (!imageType.test(file['type'])) {
        this.tip = "请选择图片！";
        this.istip = true;
        setTimeout(() => {
          this.istip = false;
        }, 1000);
				return;
			}

			//读取完成
			reader.onload = (e) => {
				//获取图片dom
				var img_ava = e.target['result'];
				this.imgBase = img_ava;
				$('.load').show();
        this.isUpload = false;
        let self = this;

        lrz(file,self.config).then((rst)=> {
          console.log(rst);
          //self.imgBase = rst.base64;
          $('.load').hide();
          self.isUpload = true;
          this.$http.post(getOpenUrl() + "Upload",{
            logo: rst.base64,
            type: 'group',
            category:'images'
          }, {
            headers:{
              'Authorization' : 'Bearer '+getToken()
            }
          }).then((res)=> {
            $('.load').hide();
            this.isUpload = true;
            var data = res.body.data;
            if (res.body.code == '0000'){
              this.imgData.push(data.attach_id);
              $('#editor').focus();
              insertHtmlAtCaret('<img src="'+data.url+'" class="uimgs" style="max-width:90%" />');
            }else{
              this.tip = res.body.error_description;
              this.istip = true;
              setTimeout(() => {
                this.istip = false;
              }, 1000);
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
		submit(){
//			if (this.$refs.message.innerHTML == '' || this.$refs.message.innerHTML == '请输入评论内容'){
//				alert('请输入评论内容');
//				return false;
//			}
			var data = {};
      if (this.$refs.message.innerHTML == '' || this.$refs.message.innerHTML == '请输入帖子内容'){
        this.tip = '请输入帖子内容';
        this.istip = true;
        setTimeout(() => {
          this.istip = false;
        }, 1000);
        return false;
      }
			data.isshowc = true;
			data.isshowe = false;
			data.title   = $('#editor').html();
			data.attach_id   = this.imgData ;
			this.$emit('message', data);
		}
	}
}
</script>
<style scoped>
.header{position: fixed;top: 0;height: 0.7rem;box-shadow:0 0 5px #ebebeb;width: 100%;background: #fff;z-index: 1;padding-top: 0.3rem;}
.headerall{padding:0 0.2rem;}
.header .a1{width: 0.18rem;height: 0.7rem;display: block;background: url(../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
.header .a2{width: 0.32rem;height: 0.7rem;display: block;background: url(../../images/dian3.png) no-repeat 0 50%;background-size: 0.32rem 0.06rem;float:right;}
.forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);height:0.88rem;width:65%;overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;text-align:center;}

.comment{height: 100%;}
/*.comment>>>img{*/
  /*width: 100% !important;*/
  /*height: 100% !important;*/
/*}*/
#editor{height:calc(100% - 1.14rem);padding:.25rem;font-size:.22rem;font-weight:normal;overflow:auto;outline: none;}
img{max-width:100%;}
.uimgs{max-width:100%;}
.placeholder{color:#ccc}
/*textarea{width:6rem;height:100%;resize: none;outline:none;border:0;display: block;margin: 0 auto;padding-top: 0.3rem;}*/
.ftall{width:100%;background:#fff;position:fixed;left:0;bottom:0;}
.form1{width:6rem;margin:0 auto;padding:0.17rem 0;overflow: hidden;}
.footer1{overflow: hidden;border-bottom:1px solid #c7c7c7;border-top:1px solid #c7c7c7;}
.footer1 input{display:block;}
.footer1 .text{height:0.52rem;width:5.38rem;border: 1px solid #e0e0e0;border-radius:0.05rem;float:left;}
.footer1 .text span{margin:0 0.1rem 0 0.11rem;width:0.24rem;height:0.52rem;background:url(../../images/fatie.png) no-repeat 0 50%;background-size:0.24rem 0.24rem;display:block;float:left;}
.footer1 input[type=text]{height:0.52rem;width:4.93rem;float: left;}
input::-webkit-input-placeholder{color: #8f8f8f;font-size:0.16rem;}
.ftall ul{width: calc(100% - 0.4rem);
  margin: 0 auto;
  overflow: hidden;
  padding: 0 0.2rem;}
.ftall ul li{float: left;}
.ftall .li1{width:0.34rem;height:0.63rem;background: url(../../images/pic.png) no-repeat 0 50%;background-size: 0.34rem 0.26rem;}
.ftall .li2{width:0.34rem;height:0.63rem;background: url(../../images/video.png) no-repeat 0 50%;background-size: 0.34rem 0.26rem;margin-left: 0.28rem;}
.ftall .li4{padding: 0 0.2rem;
  height: 0.4rem;
  text-align: center;
  line-height: 0.4rem;
  float: right;
  background: #008dd3;
  color: #fff;
  margin-top: 0.05rem;}
</style>
