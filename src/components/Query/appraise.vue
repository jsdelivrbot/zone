<template>
	<div class="first">
		<my-header title="评价"></my-header>
		<div class="cen">
			<div class="cenall">

	<div class="cen-t">你对本次评价</div>
				<div class="cen-b">
					<div class="startop">

						<ul class="star" id="stars">

							<!-- <li><img src="../../images/starb.png"/></li>
							<li><img src="../../images/starb.png"/></li>
							<li><img src="../../images/starb.png"/></li>
							<li><img src="../../images/starb.png"/></li>
							<li><img src="../../images/starb.png"/></li> -->


							<li><a href="javascript:void(0);" class="one-star" star:value="1">1</a></li>
							<li><a href="javascript:void(0);" class="two-stars" star:value="2">2</a></li>
							<li><a href="javascript:void(0);" class="three-stars" star:value="3">3</a></li>
							<li><a href="javascript:void(0);" class="four-stars" star:value="4">4</a></li>
							<li><a href="javascript:void(0);" class="five-stars" star:value="5">5</a></li>
						</ul>
						<span id="stars-tips" class="result"></span>
						<input type="hidden" id="stars-input" value="5" ref="rank" />

					</div>
					<div class="starbottom">

	<ul>
							<li class="active">服务态度一般</li>
							<li>专业度一般</li>
							<li class="mr0">稳定性一般</li>
							<li>不太容易上手</li>
							<li>功能有待完善</li>
						</ul>

					</div>

				</div>
			</div>

			<div class="line"></div>
			<div class="cenall">
				<div class="cen-t">选填</div>
				<div class="cen-bottom">

					<p>您的问题是否解决</p>
					<div class="ul">
						<ul>
							<li class="li1 active" value="1"><a>已解决</a></li>
							<li class="li2" value="0"><a>未解决</a></li>
						</ul>
					</div>
					<div class="textarea">

						<textarea placeholder="为了给您带来更好的服务体验，请告诉我们有待提升的点" ref="message" @keyup="onkeyup" style="font-size: 0.22rem;"></textarea>
						<span><font id="wordCheck">200</font>字</span>

					</div>

				</div>
			</div>
			<div class="line"></div>
			<a href="JavaScript:;" @click="submit"><div class="footer">提交评价</div></a>

		</div>
		<pop style="text-align: center" class="tips" v-show="istip" :title="tipmsg"></pop>
	</div>
</template>
<script>
import qs from 'qs'
import {setCookie, getCookie} from '../../assets/js/cookie.js'
import {getOpenUrl, Star, checkWord,getToken} from '../../assets/js/common.js'
export default {
	data () {
		return {
			istip: false,
			tipmsg: ''
		};
	},
	mounted(){
		//评星
		Star().init('stars', 'stars-tips', 'stars-input', {
			'info' : ['人品极差', '人品不咋地', '人品一般吧', '人品不错', '人品极好啊'],
			'curcss': ' current-rating',
			'step': 1,
			'rate': 5
		});

		$('.starbottom li').click(function(){
			if ($(this).hasClass('active')){
				$(this).removeClass('active')
			}else{
				$(this).addClass('active')
			}
		});

		$('.ul li').click(function(){
			$(this).addClass('active').siblings().removeClass('active');
		});
	},
	methods: {
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
			//评价等级
			var rank = this.$refs.rank.value;

			//是否解决
			var is_jiej = $('.ul li.active').attr('value');

			//标签
			var tags = [];
			$('.starbottom li').each(function(){
				if ($(this).hasClass('active')){
					tags.push($(this).text());
				}
			});
			var message = this.$refs.message.value;
			let transMessage = this.utf16toEntities(message)
			if (!message){
				this.tipmsg = '请输入评价内容';
				this.istip  = true;
				setTimeout(function(){
					$('.tips').hide();
					this.istip  = false;
				},1000)
				return false;
			}

			this.$http.post(getOpenUrl() + "workGetpingjia",{
				wo_id: this.$route.query.id,
				content: transMessage,
				rank: rank,
				is_jiej: is_jiej,
				tags: tags
			}, {
				headers:{
					'Authorization' : 'Bearer '+getToken()
				}
			}).then((res)=> {
				var data = res.body.data;
				if (res.body.code == '0000'){
					this.tipmsg = "评价成功。"+res.body.data;
					this.istip  = true;
					setTimeout(()=>{
						this.istip  = false;
						$('.tips').hide();
						this.$router.back(-1)
					},1000)
				}else{
					this.tipmsg = res.body.error_description;
					this.istip  = true;
					setTimeout(()=>{
						$('.tips').hide();
						this.istip  = false;
					},1000)
				}
			});
		},
		onkeyup(e){
			checkWord('200', e, 'wordCheck');
		}
	}
}
</script>
<style scoped>

.cen{position: absolute;top: 1rem;width: 100%;}
.cenall{width: 6rem;margin: 0 auto;overflow: hidden;}
.cen-t{height: 0.86rem;line-height: 0.86rem;font-size: 0.22rem;color: #242424;border-bottom: 1px solid #ebebeb;}

.cen-b{overflow: hidden;margin-bottom: 0.1rem;}
.startop{/*width: 4rem;*/width:120px;margin: 0.3rem auto;/*height: 1.05rem;*/height:23px;}
/*.star{overflow: hidden;padding-top: 0.3rem;}
.star li{width:20%;height: 0.44rem;float: left;}
.star img{width: 0.45rem;height: 0.44rem;display: block;margin: 0 auto;}*/

.starbottom ul li{float: left;margin-bottom: 0.21rem;font-size:0.2rem;color: #a9a9a9;border: 1px solid #ebebeb;padding: 0.2rem 0.3rem;border-radius: 0.4rem;margin-right: 0.1rem;}
.starbottom ul li.mr0{margin-right:0}
.starbottom ul li.active{background:#54c2f0; color:#fff;}

.cen-bottom{}
.cen-bottom p{font-size:0.2rem;color:#adadad;line-height: 0.77rem;}
.cen-bottom .ul{border-bottom: 1px solid #ebebeb;}
.cen-bottom ul{overflow: hidden;width: 5rem;margin: 0 auto;padding-bottom: 0.24rem;}
.cen-bottom ul li{width: 2.18rem;height:0.7rem;line-height: 0.7rem;font-size: 0.2rem;float: left;border-radius: 0.35rem;text-align: center;}


.cen-bottom .li1{border: 1px solid #c7c7c7;color: #c7c7c7;}
.cen-bottom .li1 a{background: url(../../images/yesj-.png)no-repeat 0 50%;background-size: 0.24rem 0.24rem;padding-left: 0.33rem;}
.cen-bottom .li2{border: 1px solid #c7c7c7;color: #c7c7c7;float: right;}
.cen-bottom .li2 a{background: url(../../images/noj.png)no-repeat 0 50%;background-size: 0.24rem 0.24rem;padding-left: 0.33rem;}

.cen-bottom .li1.active{border: 1px solid #54c2f0;color: #fff;background:#54c2f0;}
.cen-bottom .li1.active a{background: url(../../images/yesj.png)no-repeat 0 50%;background-size: 0.24rem 0.24rem;padding-left: 0.33rem;}
.cen-bottom .li2.active{border: 1px solid #54c2f0;color: #fff;background:#54c2f0;}
.cen-bottom .li2.active a{background: url(../../images/noj-.png)no-repeat 0 50%;background-size: 0.24rem 0.24rem;padding-left: 0.33rem;}

.cen-bottom textarea{font-size: 0.18rem;width: 100%;padding-top: 0.33rem;height: 1.1rem;}
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {color: #8f8f8f;}
input:-moz-placeholder, textarea:-moz-placeholder {color:#8f8f8f;}
input::-moz-placeholder, textarea::-moz-placeholder {color:#8f8f8f;}
input:-ms-input-placeholder, textarea:-ms-input-placeholder {color:#8f8f8f;}
.textarea span{font-size: 0.18rem;color: #54c2f0;float: right;margin-bottom: 0.34rem;}


.footer{width: 3.6rem;height: 0.82rem;background: #54c2f0;font-size: 0.2rem;color:#fff;text-align: center;line-height: 0.82rem;margin: 0.32rem auto;border-radius: 0.41rem;}


/*评星*/
.startop .result {display:none; margin-left: 20px; padding-top: 2px;  font-size:16px}
.startop .result span { color: #ff6d02; }
.star,.star a { background: url(../../images/o_star.png) no-repeat scroll 1000px 1000px; }
.star {background-position: 0px 0px; width: 120px; height: 23px; position: relative; z-index: 1000; }
.startop .result em { color: #f60; font-family: arial; font-weight: bold;}
.star li { display: inline; }
.star a { line-height: 23px; height: 23px; position: absolute; top: 0px; left: 0px; text-indent: -999em; *zoom: 1; outline: none; }
.star a.one-star { width: 20%; z-index: 6;}
.star a.two-stars { width: 40%; z-index: 5;}
.star a.three-stars { width: 60%; z-index: 4;}
.star a.four-stars { width: 80%; z-index: 3;}
.star a.five-stars { width: 100%; z-index: 2;}
.star .current-rating, .star a:hover {background-position:0 -28px}
.star a.one-star:hover,.star a.two-stars:hover,.star a.one-star.current-rating,.star a.two-stars.current-rating{background-position:0 -116px;}
.star .three-stars .current-rating,.star .four-stars .current-rating,.star .five-stars .current-rating{background-position:0 -28px;}
</style>
