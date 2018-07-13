<template>
	<div class="wrapper backtop" style="height:calc(100% - 1rem);font-size: 0.2rem;width: 100%;">
    <div class="listbanner">
      <div class="header">
        <div class="header-top">
          <!--<router-link :to="'/info'" style="display: flex;"></router-link>-->
          <!--<a href="#/info" class="a1"></a>-->
          <a @click="back" class="a1"></a>
          <span class="forget">资讯详情</span>
        </div>
      </div>
    </div>
    <div class="footer" v-show="isshowc">
      <div class="form">
        <div class="text" style="background:#fff;">
          <span></span>
          <div @click="toggle('comment')">
            <input type="text" placeholder="说点什么吧" readonly="readonly" onfocus='this.blur();'/>
          </div>
        </div>
        <input type="button"/>
      </div>
    </div>

    <div class="mark" v-show="isshow || isshowd"></div>
    <div class="mark" v-show="upshow" @click="mark()"></div>

    <div class="jubao" v-show="isshow">
      <div class="jubaoall">
        <img src="../../images/jubao.png"/>
        <a :href="'#/report?type=comment&id='+rid" class="sure">举报</a>
        <a class="cancel" @click="toggle('cancel')">取消</a>
      </div>
    </div>


    <div class="up" v-show="isshowd">
      <div class="up-b">
        <div class="up1">
          <div class="up-l" @click="toggle('cancel')">取消</div>
          <div class="up-r" @click="opbtn('del')">确定</div>
        </div>
      </div>
    </div>

    <mt-popup v-model="footer1Show" position="bottom" class="ftall">
    <!--<div class="ftall" ref='footer1'>-->
      <div class="footer1">
        <div class="form1">
          <div class="text1">
            <span></span>
            <div class="placeholder" id="reply" contenteditable="true" name="reply" placeholder="请输入回复内容" ref="reply">请输入回复内容</div>
          </div>
        </div>
      </div>
      <ul>
        <li class="li1">
          <!--<input style="opacity:0;position: absolute;width:0.34rem;height:0.64rem;" type="file" id="imgView" accept="image/*" capture="camera" @change="onchange">-->
          <input style="opacity:0;position: absolute;width:0.34rem;height:0.64rem;" type="file" id="imgView" accept="image/*" @change="onchange">
          <input type="button"/>
        </li>
        <li class="li4">
          <input style="width:100%;height:100%;" type="button" :disabled="disabled" @click="submit"/>
        </li>
      </ul>
    <!--</div>-->
    </mt-popup>

		<div class="content" ref="a1" v-show="isshowc" style="height: calc(100% - 0.88rem);overflow-y: auto;position: relative;bottom: 0;">
			<div class="top">
				<ul class="top-t">
					<li class="li2">{{data.title}}</li>
				</ul>
				<ul class="top-b">
					<li class="li4">{{data.ctime}}</li>
				</ul>
			</div>
			<div class="line"></div>
			<div class="center">
				<ul class="center-txt">
					<div>
						<div class="nav1">
							<ul class="nav1-tip">
								<li class="nav1-li1">内容详情</li>
								<!-- <li class="nav1-li2"></li> -->
							</ul>
						</div>
						<div class="nav2 contentbox" v-html="data.content">
							{{data.content}}
						</div>
					</div>
					<li class="li3">
						<span class="sp1" v-bind:class="{collect:isCollect==1}" @click="opbtn('collect', 'del')" v-if="isCollect">{{collectNum}}</span>
						<span class="sp1" @click="opbtn('collect', 'add')" v-else>{{collectNum}}</span>
						<span class="sp2" v-bind:class="{zan:isZan>0}" v-if="isZan>0">{{zanNum}}</span>
						<span class="sp2" @click="opbtn('zan')" v-else>{{zanNum}}</span>
						<span class="sp3">{{data.views_num}}</span>
						<span class="sp4">{{data.comment_num}}</span>
					</li>
				</ul>
			</div>
			<div v-if="data.relevant">
				<div class="line"></div>
				<div>
					<div class="nav1">
						<ul class="nav1-tip">
							<li class="nav1-li1">相关资讯</li>
						</ul>
					</div>
					<div class="nav2 bn">
						<ul class="nav3-content">
							<li v-for="list in data.relevant" @click="getData(list.document_id);">
                <!--<router-link :to="'/info1?id='+list.document_id" style="display: flex;">-->
                  {{list.title}}
                <!--</router-link>-->
              </li>
						</ul>
					</div>
				</div>
			</div>
			<div class="line"></div>
			<div class="page-loadmore">
			<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150"  @bottom-status-change="handleBottomChange" ref="loadmore">

			<div class="list" v-if="commentData.length>0">
				<a name="commentlist" id="commentlist"></a>
				<div class="list-top">
					<ul>
						<li class="li1">回复</li>
						<li class="li2">
							<a :class="sort == 'asc' ? 'commentorder' : ''" @click="order('asc')">
								<span class="sp1">正序</span>
								<span class="sp2"></span>
							</a>
							<span class="l1"></span>
							<a :class="sort == 'desc' ? 'commentorder' : ''" @click="order('desc')">
								<span class="sp1">倒序</span>
								<span class="sp3"></span>
							</a>
						</li>
					</ul>
				</div>
				<div class="list-all">
					<div class="list-bottom" v-for="comment in commentData" :style="comment.replyCount < 4 ? 'border-bottom:0.01rem solid #e0e0e0' : ''" :id="'commentbox-'+comment.id">
						<div class="list-bottom-t">
							<div class="list-bottom-t">
								<p><img :src="comment.face" /></p>
								<ul>
									<li class="li1">
										<span class="sp1">{{comment.uname}}</span>
										<span :class="'sp2' + (comment.sex == 1 ? '' : ' girl')"></span>
										<span v-if="comment.friend_node">
											<span class="sp3">(</span>
											<span class="sp4">{{comment.friend_node}}</span>
											<span class="sp5">)</span>
										</span>
										<div style="clear:both;"></div>
										<span class="sp6" v-for="group in comment.groups" :style="group.icon ? 'background:none;margin-left:0;' : ''">
											<img :src="group.icon" v-if="group.icon"  style="border-radius: 0;margin-right: 0.1rem;"/>
											<font :style="'background-color:'+group.bcolor" v-else>{{group.title}}</font>
										</span>

										<span class="sp7">{{comment.ctime}}</span>
									</li>
									<li class="li2" @click="toggle('reply', comment.id, comment.treply_id)" v-html="comment.comment">{{comment.comment}}</li>
									<li class="li3">
										<span class="li-sp5" @click="toggle('del', comment.id, comment.treply_id)" v-if="comment.is_manage"></span>
										<span class="li-sp4" @click="toggle('jubao', comment.id, comment.treply_id)"></span>
									</li>
								</ul>
							</div>
							<div class="list-bottom-t2" style="background:#fafafa;" v-for="reply in comment.replyData" v-if="comment.replyCount > 0" :id="'commentbox-'+reply.id">
								<p><img :src="reply.face"/></p>
								<ul>
									<li class="li1">
										<span class="sp1">{{reply.uname}}</span>
										<span :class="'sp2' + (reply.sex == 1 ? '' : ' girl')"></span>
										<span v-if="reply.friend_node">
											<span class="sp3">(</span>
											<span class="sp4">{{reply.friend_node}}</span>
											<span class="sp5">)</span>
										</span>
										<div style="clear:both;"></div>
										<span class="sp6" v-for="rgroup in reply.groups" :style="rgroup.icon ? 'background:none;margin-left:0;' : ''">
											<img :src="rgroup.icon" v-if="rgroup.icon" style="border-radius: 0;margin-right: 0.1rem;"/>
											<font :style="'background-color:'+rgroup.bcolor" v-else>{{rgroup.title}}</font>
										</span>
										<span class="sp7">{{reply.ctime}}</span>
									</li>
									<li class="li2">
										<span class="spa">回复</span>
										<span class="spb">{{reply.to_uname}}：</span>
										<span class="spc" @click="toggle('reply', reply.id, reply.treply_id)" v-html="reply.comment">{{reply.comment}}</span>
									</li>
									<li class="li3">
										<span class="li-sp5" @click="toggle('del', reply.id, reply.treply_id)" v-if="reply.is_manage"></span>
										<span class="li-sp4" @click="toggle('jubao', reply.id, reply.treply_id)"></span>
									</li>
								</ul>
							</div>
						</div>
						<router-link :to="'/reply?id='+data.document_id+'&cid='+comment.id" v-if="comment.replyCount > 3">
							<div class="btn">
								<div class="btn1">
									<span>查看更多回复</span>
									<span>(</span>
									<span>{{comment.replyCount}}</span>
									<span>)</span>
								</div>
							</div>
						</router-link>
					</div>
				</div>
				<div class="loading-layer">
					<span class="spinner-holder"><img src="../../images/loading.gif" /></span>
					<div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>
				</div>
			</div>
			</mt-loadmore>
			</div>
		</div>
		<editor :title="data.title" :id="data.document_id" v-show="isshowe" v-on:message="recieveMessage"></editor>
		<div class="load" style="display:none;">
			<div class="load-container load4"><div class="loader"> <i></i></div></div>
		</div>
    <load v-show="isload"></load>
		<pop style="text-align: center" class="tips" :title="tip" v-show="istip"></pop>
	</div>
</template>

<script>
	import qs from 'qs'
  import Vue from 'vue'
	import {
		setCookie,
		getCookie
	} from '../../assets/js/cookie.js'
	import {
		getOpenUrl,
		insertHtmlAtCaret,getToken
	} from '../../assets/js/common.js'
	import editor from './editor.vue'
	var loading = false,
		end = false;
	export default {
		name: 'content',
		components: {
			editor
		},
		data() {
			return {
        footer1Show:false,
			  isload:false,
				data: {},
				isCollect: false,
				collectNum: 0,
				isZan: false,
				zanNum: 0,
				commentData: [],
				sort: 'desc',
				imgData: [],
				rid: 0,
				trid: 0,
				isshow: false, //不可关闭图层
				upshow: false, //可关闭图层
				isshowd: false, //删除图层确认
				isshowc: true,
				isshowe: false,
				tip: '',
				istip: false,
				allLoaded: false,
				topStatus: '',
        disabled:false
			};
		},
		mounted() {

      setTimeout(()=>{
        this.topHeight = document.querySelector('.page-loadmore').offsetTop;
        this.$root.eventHub.$emit('zjSuccess');
      },1000);

      this.$root.eventHub.$on('jfSuccess', () => {
        $('.content').animate({
          scrollTop: this.topHeight
        }, 'fast');
      });

			var $self = this;
			this.id = this.$route.query.id;
			end = false;
			$('.loading-layer span').removeClass('active');
			$('.loading-layer div').removeClass('active');
			this.getData(this.id);
			$('[placeholder]').focus(function() {
				var input = $(this);
				if (input.html() == input.attr('placeholder')) {
					input.css('color', '#242424').html('');
					input.removeClass('placeholder');
				}
			}).blur(function() {
				var input = $(this);
				if (input.html() == '' || input.html() == input.attr('placeholder')) {
					input.addClass('placeholder');
					input.css('color', '#ccc').html(input.attr('placeholder'));
				}
			});
			//无限加载
			//		$(window).scroll(function(){
			//			if(loading || end || this.scrollTop > $(window).scrollTop()) return;
			//			this.srcollTop = $(window).scrollTop();
			//			if($(document).height() - $(window).height() - $(window).scrollTop() < 80){
			//				loading = true;
			//				$self.page += 1;
			//				setTimeout(() => {
			//					$self.getCommentData($self.id, $self.sort, $self.page);
			//				}, 1500);
			//			}
			//		});
//			this.tabScroll();
			this.getCommentData(this.$route.query.id, this.sort, 1);
			//是否存在input焦点事件或图层打开事件
			$('input').focus(function() {
				//获取焦点
				let expireDays = 1000 * 60 * 60;
				setCookie("inputkey", 1, expireDays);
			});
			//    let self = this;
			//    $(document).bind('click', function(e){
			//      var target = $(e.target);
			//      if(target.closest("input").length == 0 && target.closest('.a1').length == 0 && !self.isKey){
			//        setCookie("inputkey", '', -1);
			//      }
			//    });
		},
		methods: {
//			tabScroll() {
//				window.addEventListener("scroll", this.toScroll);
//			},
//			toScroll() {
//				if (loading || end || this.scrollTop > $(window).scrollTop()) return;
//				this.srcollTop = $(window).scrollTop();
//				if ($(document).height() - $(window).height() - $(window).scrollTop() < 80) {
//					loading = true;
//					this.page += 1;
//					setTimeout(() => {
//						this.getCommentData(this.id, this.sort, this.page);
//					}, 1500);
//				}
//			},
      back(){
        //android.back1();
        window.history.back(-1);
        this.$router.goBack();
      },
			loadBottom() { // 加载更多数据的操作
				//this.allLoaded = true;// 若数据已全部获取完毕
//				var self = this;
				this.page+=1;
				setTimeout(()=> {
					this.getCommentData(this.id,this.sort,this.page)
				}, 2000);

			},
			handleBottomChange(status){
				this.bottomStatus = status;
			},
			getData: function(id) {
				this.isload = true;
				//获取新闻数据
				this.$http.get(getOpenUrl() + "news/" + id, {
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
          this.isload = false;
          $('.content').animate({
            scrollTop: 0
          }, 'fast');
					this.data = res.body.data
					this.isCollect = this.data.is_collect;
					this.collectNum = this.data.collect_num;
					this.isZan = this.data.is_zan;
					this.zanNum = this.data.zan_num;
				});
			},
			getCommentData: function(id, sort, page) {
				$('.load').hide();
				this.page = page ? page : 1;
				//获取新闻评论
				var $self = this;
				if (this.page > 1) {
					$('.loading-layer div').removeClass('active');
					$('.loading-layer span').addClass('active');
				}
				this.$http.get(getOpenUrl() + "comment", {
					headers: {
						'Authorization': 'Bearer ' + getToken()
					},
					params: {
						id: id,
						type: 'news',
						sort: sort ? sort : 'desc',
						page: page
					}
				}).then((res) => {
					this.$refs.loadmore.onBottomLoaded();

					$('.loading-layer span').removeClass('active');
					$('.loading-layer div').removeClass('active');
					if (res.body.code == '0000') {
						if (res.body.ccount > 0) {
							var data = res.body.data;
							$.each(data, function(k, v) {
								$self.commentData.push(v);
							});
						} else {
//							end = true;
							$('.loading-layer div').addClass('active');
						}
					} else {
						this.$refs.loadmore.onBottomLoaded();
						this.tip = res.body.error_description;
						this.istip = true;
						setTimeout(() => {
							this.istip = false;
						}, 1000);
					}
					loading = false;
				});
			},
			opbtn: function(type, op) {
			  this.isload = true;
				//$('.load').show();
				switch (type) {
					case 'collect':
						//收藏
						this.$http.post(getOpenUrl() + "collectDo", {
							did: this.data.document_id,
							type: 1,
							status: op
						}, {
							headers: {
								'Authorization': 'Bearer ' + getToken()
							}
						}).then((res) => {
              this.isload = false;
							if (res.body.code == '0000') {
								this.collectNum = op == 'del' ? this.collectNum - 1 : this.collectNum + 1;
								this.isCollect = !this.isCollect;
							} else {
								if (res.body.code == '1002') {
									this.tip = res.body.error_description;
									this.istip = true;
									setTimeout(() => {
										this.istip = false;
										this.$router.push("/login")
									}, 1000);
								} else {
									this.tip = res.body.error_description;
									this.istip = true;
									setTimeout(() => {
										this.istip = false;
									}, 1000);
								}
							}
							$('.load').hide();
						})
						break;
					case 'zan':
						//点赞
						this.$http.post(getOpenUrl() + "zan", {
							id: this.data.document_id,
							styles: 2
						}, {
							headers: {
								'Authorization': 'Bearer ' + getToken()
							}
						}).then((res) => {
              this.isload = false;
							if (res.body.code == '0000') {
								this.isZan = !this.isZan;
								this.zanNum = this.zanNum + 1;
							} else {
								this.tip = res.body.error_description;
								this.istip = true;
								setTimeout(() => {
									this.istip = false;
								}, 1000);
							}
							$('.load').hide();
						})
						break;
					case 'report':
						//举报
						break;
					case 'del':
						this.$http.post(getOpenUrl() + "delcomment", {
							rid: this.rid,
							trid: this.trid
						}, {
							headers: {
								'Authorization': 'Bearer ' + getToken()
							}
						}).then((res) => {
              this.isload = false;
							if (res.body.code == '0000') {
								$('#commentbox-' + this.rid).remove();
								this.mark();
                this.getCommentData(this.id,this.sort,this.page)
                this.commentData = [];
							} else {
								this.tip = res.body.error_description;
								this.istip = true;
								setTimeout(() => {
									this.istip = false;
								}, 1000);
							}
							$('.load').hide();
						})
						break;
				}
			},
			order: function(sort) {
				//排序
				if (sort == this.sort) {
					return;
				}
				this.sort = sort;
				if (end) {
					//数据全部加载完后排序直接颠倒数组
					var $self = this,
						len = $self.commentData.length;
					var commentData = [];
					commentData = $.map(this.commentData, function(v, i) {
						return $self.commentData[len - 1 - i];
					});
					this.commentData = commentData;
				} else {
					this.commentData = [];
					this.getCommentData(this.id, this.sort);
				}
			},
			toggle(type, rid, trid) {
				let isLogin = getCookie('islogin');
				isLogin = parseInt(isLogin);
				if (isLogin == 0) {
					setCookie("inputkey", '', -1);
					this.$router.push('/login');
				}
				let expireDays = 1000 * 60 * 60;
				switch (type) {
					case 'comment':
						//评论
						this.isKey = true;
						this.isshowc = false;
						this.isshowe = true;

            this.$root.eventHub.$emit('editDianji');

						break;
          case 'reply':
						this.isKey = true;
						setCookie("inputkey", 1, expireDays);
						//this.upshow = !this.upshow;
						this.rid = rid;
						this.trid = trid;
						this.footer1Show = true;
//						this.$refs.footer1.style.display = "block";
//						this.$refs.footer1.style.zIndex = 1000;
						$('#reply').focus();
						//回复
						break;
					case 'jubao':
						//举报
						this.rid = rid;
						this.isKey = true;
						setCookie("inputkey", 1, expireDays);
						this.isshow = !this.isshow;
						this.isKey = true;
						setCookie("inputkey", 1, expireDays);
						break;
					case 'del':
						//删除
						this.isKey = true;
						setCookie("inputkey", 1, expireDays);
						this.rid = rid;
						this.trid = trid;
						this.isshowd = !this.isshowd;
						break;
					case 'cancel':
						this.mark();
						break;
				}
				if (type != 'comment' && type != 'cancel') {
					//this.$refs.a1.style.height = "calc(100% - 1.64rem)";
					//this.$refs.a1.style.overflow="hidden";
				}
			},
			recieveMessage(data) {
				this.isshowc = data.isshowc;
				this.isshowe = data.isshowe;
				if (data.isnew) {
					this.commentData = [];
					end = false;
//					$("body").animate({
//						"scrollTop": ($('#commentlist').offset().top - $('.header').height())
//					}, false)
					this.getCommentData(this.id, this.sort, 1);
				}
			},
			mark() {
				this.rid = 0;
				this.trid = 0;
//				this.$refs.footer1.style.display = "none";
//				this.$refs.footer1.style.zIndex = 0;
				this.upshow = false;
				this.isshow = false;
				this.isshowd = false;
				this.$refs.a1.style.height = "100%";
				this.isKey = false;
				setCookie("inputkey", '', -1);
				//this.$refs.a1.style.overflow="auto";
			},
			onchange(e) {
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
					this.tip = '请选择图片';
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
					//this.imgBase = img_ava;
					$('.load').show();
          this.disabled = true;

          let self = this;
          lrz(file, {quality: 0.6}).then((rst) => {
            //console.log(rst.base64);
            //self.imgBase = rst.base64;
            $('.load').hide();
            this.$http.post(getOpenUrl() + "Upload", {
              //logo: this.imgBase,
              logo:rst.base64,
              type: 'comment',
              category: 'images'
            }, {
              headers: {
                'Authorization': 'Bearer ' + getToken()
              }
            }).then((res) => {
              $('.load').hide();
              this.disabled = false;
              var data = res.body.data;
              if (res.body.code == '0000') {
                this.imgData.push(data.attach_id);
                $('#reply').focus();
                insertHtmlAtCaret('<img src="' + data.url + '" class="uimgs" style="max-width:100%" />');
              } else {
                this.tip = res.body.error_description;
                this.istip = true;
                setTimeout(() => {
                  this.istip = false;
                }, 1000);
              }
            })
            self.isUpload = true;
            return rst;
          }).always(function() {
            // 清空文件上传控件的值
            e.target.value = null;
          });
				};
				reader.readAsDataURL(file);
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
			submit() {
				var message = $('#reply').html();
				let transMessage = this.utf16toEntities(message)
				if (message == '' || message == '请输入回复内容') {
					this.tip = '请输入回复内容';
					this.istip = true;
					setTimeout(() => {
						this.istip = false;
					}, 1000);
					return false;
				}
        clearTimeout(this.fn);
        this.fn = setTimeout( ()=> {
          this.isload = true;
          this.$http.post(getOpenUrl() + "comment", {
            id: this.id,
            rid: this.rid,
            trid: this.trid,
            type: 'news',
            comment: transMessage,
            attach: this.imgData
          }, {
            headers: {
              'Authorization': 'Bearer ' + getToken()
            }
          }).then((res) => {
            this.isload = false;
            $('.load').hide();
            if (res.body.code == '0000') {
              this.$root.eventHub.$emit('jfSuccess');
              this.$root.eventHub.$emit('refreshed');
              $('#reply').css('color', '#ccc').html('请输入回复内容')
              this.commentData = [];
              this.getCommentData(this.id, this.sort);
              this.footer1Show = false;
              this.mark();
            } else {
              this.tip = res.body.error_description;
              this.istip = true;
              setTimeout(() => {
                this.istip = false;
              }, 1000);
            }
          })
        },500)
			}
		},
		updated() {
			$('.contentbox img').css({
				width: '100%',
				height: 'auto'
			});
			$('.contentbox table').css({
				width: '100%'
			});
		},
//		beforeDestroy() {
//			window.removeEventListener("scroll", this.toScroll);
//		},
//		deactivated() {
//			window.removeEventListener('scroll', this.toScroll);
//		},
		beforeRouteLeave(to, from, next) {
			//路由离开时
			var isInputKey = parseInt(getCookie('inputkey'));
			if (isInputKey == 1) {
				setCookie("inputkey", '', -1);
				this.isshowc = true;
				this.isshowe = false;
				this.upshow = false;
				this.rid = 0;
				this.trid = 0;
//				this.$refs.footer1.style.display = "none";
//				this.$refs.footer1.style.zIndex = 0;
				this.isshowd = false;
				this.$refs.a1.style.height = "100%";
				this.toggle('cancel');
				next(false)
			} else {
				next()
			}
		},
		activated() {
			//路由缓存 前进后退
			$('.load').hide();
			this.isKey = false;
			this.isshowc = true;
			this.isshowe = false;
			$('.tips').hide();
			this.mark();
			if (this.id != this.$route.query.id) {
				this.sort = 'desc';
				this.id = this.$route.query.id;
				this.page = 1;
				end = false;
				this.commentData = [];
				this.getData(this.id);
			}
		}
	}
</script>
<style scoped>
  .tips {
    /*display: none;*/
  }

  .wrapper {
    /*height: calc(100% - .88rem);*/
    padding-top:1rem;
  }

  .bn {
    border-bottom: none!important;
  }

  .mt70 {
    margin-left: 0.7rem;
  }

  .content {
    position: relative;
    /*padding-bottom: 0.88rem;*/
  }

  .listbanner {
    width: 100%;
    margin: 0 auto;
    box-shadow: 0 0 5px #ebebeb;
  }

  .header {
    height: 0.7rem;
    margin: 0 auto;
    position: fixed;
    top: 0;
    background: #fff;
    width: 100%;
    box-shadow: 0 0 0.05rem #ebebeb;
    z-index: 999;
    padding-top:0.3rem;
  }

  .header a {
    width: 0.18rem;
    height: 0.7rem;
    display: block;
    background: url(../../images/back.png) no-repeat 0 50%;
    background-size: 0.18rem 0.34rem;
    float: left;
  }

  .header-top {
    overflow: hidden;
    padding-left: 0.2rem;
  }

  .ld {
    width: 0.34rem;
    height: 0.7rem;
    float: right;
    background: url(../../images/fx.png) no-repeat 0 50%;
    background-size: 0.34rem 0.34rem;
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

  .top {
    overflow: hidden;
  }

  .top-t {
    padding: 0 0.2rem;
    border-bottom: 0.01rem solid #ededed;
    overflow: hidden;
    padding-bottom: 0.2rem;
  }

  .top-t li {
    margin-top: 0.32rem;
  }

  .top-t .li1 {
    width: 0.26rem;
    height: 0.26rem;
    float: left;
    margin-right: 0.17rem;
  }

  .top-t .li1 img {
    width: 0.26rem;
    height: 0.26rem;
    display: block;
    float: left;
  }

  .top-t .li2 {
    font-size: 0.22rem;
  }

  .top-b {
    overflow: hidden;
    padding: 0 0.2rem;
  }

  .top-b li {
    float: left;
    height: 0.59rem;
    line-height: 0.59rem;
    font-size: 0.2rem;
    color: #999999;
  }

  .top-b .li1 {
    width: 0.68rem;
    height: 0.68rem;
    margin-top: 0.2rem;
  }

  .top-b .li1 img {
    width: 0.68rem;
    height: 0.68rem;
    border-radius: 50%;
    display: block;
  }

  .top-b .li2 {
    margin-left: 0.16rem;
    margin-right: 0.09rem;
  }

  .top-b .li3 {
    width: 0.3rem;
    margin-right: 0.19rem;
    background: url(../../images/VIP.png)no-repeat 0 50%;
    background-size: 0.3rem 0.18rem;
  }

  .top-b .li4 {
    float: right;
  }

  .top-b .li5 {
    font-size: 0.2rem;
    color: #adadad;
    margin-right: 0.2rem;
  }

  .nav1 {
    overflow: hidden;
  }

  .nav1 .nav1-tip {
    padding: 0 0.2rem;
    margin-top: 0.3rem;
    overflow: hidden;
    padding-bottom: 0.2rem;
    border-bottom: 0.01rem solid #ebebeb;
  }

  .nav1-li1 {
    font-size: 0.22rem;
    line-height: 0.27rem;
    border-left: 0.03rem solid #008dd3;
    float: left;
    color: #1a1a1a;
    padding-left: 0.12rem;
  }

  .nav1-li2 {
    width: 0.24rem;
    height: 0.18rem;
    background: url(../../images/down.png) no-repeat;
    background-size: cover;
    float: right;
  }

  .nav2 {
    width: 100%;
    border-bottom: 0.01rem solid #ebebeb;
    font-size: 0.2rem;
    overflow: hidden;
    padding: 0.2rem 0;
  }
  .nav2 >>> span{font-size: 0.2rem!important;}
  .center-txt .nav2-content {
    width: 6rem;
    height: 3.52rem;
    margin-top: 0.13rem;
    display: block;
    padding: 0;
    margin: 0;
    margin-top: 0.32rem;
  }

  .center-txt .nav2-content img {
    width: 6rem;
    height: 3.52rem;
    margin-top: 0.13rem;
    display: block;
    padding: 0;
    margin: 0;
  }

  .nav3-content {
    line-height: 0.85rem;
    padding: 0 0.2rem;
    font-size: 0.22rem;
  }

  .nav3-content li {
    border-bottom: 0.01rem solid #ebebeb;
    line-height: 0.85rem;
    height: 0.85rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .nav3-content a {
    color: #242424;
  }

  .center {
    overflow: hidden;
  }

  .center-txt {
    padding: 0 0.2rem;
  }

  .center-txt .nav2 img {
    width: 100%;
    display: block;
  }

  .nav2 img {
    width: 100%;
    display: block;
  }

  .center-txt .li1 {
    line-height: 0.48rem;
    font-size: 0.22rem;
    color: #adadad;
    margin: 0.18rem 0;
  }

  .center-txt .li2 {
    width: 6rem;
    height: 3.52rem;
  }

  .center-txt .li2 img {
    width: 6rem;
    height: 3.52rem;
    display: block;
  }

  .center-txt .li3 {
    height: 0.77rem;
    line-height: 0.77rem;
    float: right;
  }

  .center-txt span {
    display: block;
    float: left;
    margin-left: 0.15rem;
    font-size: 0.14rem;
    color: #adadad;
    width: 0.33rem;
    padding-left: 0.3rem;
  }

  .center-txt .sp1 {
    background: url(../../images/sc.png) no-repeat 0 50%;
    background-size: 0.23rem auto;
  }

  .center-txt .sp1.collect {
    background: url(../../images/sc.jpg) no-repeat 0 50%;
    background-size: 0.23rem auto;
  }

  .center-txt .sp2 {
    background: url(../../images/zan1.png) no-repeat 0 50%;
    background-size: 0.23rem auto;
  }

  .center-txt .sp2.zan {
    background: url(../../images/zan1.jpg) no-repeat 0 50%;
    background-size: 0.23rem auto;
  }

  .center-txt .sp3 {
    background: url(../../images/sl.png) no-repeat 0 50%;
    background-size: 0.23rem auto;
  }

  .center-txt .sp4 {
    background: url(../../images/hf.png) no-repeat 0 50%;
    background-size: 0.23rem auto;
    padding-left: .28rem
  }

  .list {
    padding-bottom: 0.88rem
  }

  .list-top {
    height: 0.77rem;
    border-bottom: 0.01rem solid #ebebeb;
    padding: 0 0.2rem;
  }

  .list-top li {
    float: left;
  }

  .list-top li span {
    display: block;
    float: left;
  }

  .list-top .li1 {
    font-size: 0.22rem;
    color: #1a1a1a;
    line-height: 0.22rem;
    border-left: 0.03rem solid #008dd3;
    padding-left: 0.12rem;
    margin-top: 0.3rem;
  }

  .list-top .li2 {
    font-size: 0.2rem;
    color: #949494;
    line-height: 0.34rem;
    float: right;
  }

  .list-top .li2 span {
    line-height: 0.77rem;
  }

  .list-top .li2 .commentorder span {
    color: #008dd3
  }

  .list-top .li2 .l1 {
    margin: 0.23rem 0.15rem 0 0.15rem;
    height: 0.34rem;
    display: block;
    width: 0.02rem;
    background: #ebebeb;
  }

  .list-top .li2 .sp1 {
    margin-right: 0.15rem;
  }

  .list-top .li2 .sp1:hover {
    color: #008DD3;
  }

  .list-top .li2 .sp2 {
    width: 0.28rem;
    height: 0.77rem;
    background: url(../../images/zheng.png) no-repeat 0 50%;
    background-size: 0.28rem 0.23rem;
  }

  .list-top .li2 .sp3 {
    width: 0.28rem;
    height: 0.77rem;
    background: url(../../images/fan.png) no-repeat 0 50%;
    background-size: 0.28rem 0.23rem;
  }

  .list-top .li2 .commentorder .sp2 {
    background: url(../../images/zheng-.png) no-repeat 0 50%;
    background-size: 0.28rem 0.23rem;
  }

  .list-top .li2 .commentorder .sp3 {
    background: url(../../images/fan-.png) no-repeat 0 50%;
    background-size: 0.28rem 0.23rem;
  }

  .list-all {
    width: 100%;
  }

  .list-bottom {
    padding-left: 0.2rem;
  }

  .list-bottom p {
    width: .8rem;
    height: .8rem;
    /*position: relative;*/
    border-radius: 50%;
    /*overflow: hidden;*/
    margin-top: 0.1rem;
    float: left;
  }

  .list-bottom p img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    /*position: absolute;*/
    /*top:50%;*/
    /*transform: translateY(-50%);*/
    border-radius: 50%;
  }

  .list-bottom-t {
    margin-top: .2rem;
    overflow: hidden;
  }

  .list-bottom-t span {
    float: left;
    line-height: 0.48rem;
  }

  .list-bottom-t .sp1 {
    line-height: 0.48rem;
    font-size: 0.22rem;
    color: #008dd3;
  }

  .list-bottom-t .sp2 {
    width: 0.18rem;
    height: 0.48rem;
    background: url(../../images/men.png) no-repeat 0 50%;
    background-size: 0.18rem 0.18rem;
    margin: 0 0.08rem 0 0.13rem;
  }

  .list-bottom-t .sp2.girl {
    background: url(../../images/girl.png) no-repeat 0 50%;
    background-size: 0.18rem 0.18rem;
  }

  .list-bottom-t .sp3,
  .sp4,
  .sp5 {
    font-size: 0.22rem;
    color: #adadad;
  }

  .list-bottom-t .sp6 {
    height: 0.2rem;
    margin-left: 0.1rem;
    color: #fff;
  }

  .list-bottom-t .sp6 img {
    height: 0.3rem;
    width: auto;
  }

  .list-bottom-t .sp6 font {
    font-size: 0.16rem;
    width: 0.44rem;
    height: 0.2rem;
    line-height: 0.2rem;
    background: red;
    display: block;
    text-align: center;
    border-radius: 2px;
    margin-top: 0.04rem;
  }

  .list-bottom-t .sp7 {
    line-height: 0.48rem;
    font-size: 0.2rem;
    color: #adadad;
    float: right;
    margin-right: 0.2rem;
  }

  .list-bottom-t ul {
    margin-left: 1rem;
    width: calc(100% - 1rem);
  }

  .list-bottom-t .li1 {
    margin-bottom: 0.05rem;
    overflow: hidden;
  }

  .list-bottom-t .li2 {
    line-height: 0.34rem;
    color: #242424;
    font-size: 0.2rem;
    margin-right: 0.2rem;
  }
  .list-bottom-t .li2 >>> p img{width: calc(100% - 1rem)!important;height: auto!important;}
  .list-bottom-t .li3 {
    height: 0.78rem;
    color: #008dd3;
    font-size: 0.16rem;
  }

  .list-bottom-t .li3 span {
    line-height: 0.78rem;
  }

  .list-bottom-t .li3 .li-sp1 {
    width: 0.08rem;
    height: 0.78rem;
    color: #008dd3;
    font-size: 0.16rem;
    background: url(../../images/dian.png) no-repeat 0 50%;
    background-size: 0.08rem 0.08rem;
  }

  .list-bottom-t .li3 .li-sp2 {
    margin-left: 0.06rem;
    margin-right: 0.04rem;
  }

  .list-bottom-t .li3 .li-sp4 {
    margin-right: 0.2rem;
    width: 0.24rem;
    height: 0.78rem;
    background: url(../../images/jbw.png) no-repeat 0 50%;
    background-size: 0.24rem 0.24rem;
    float: right;
  }

  .list-bottom-t .li3 .li-sp5 {
    margin-right: 0.2rem;
    width: 0.24rem;
    height: 0.78rem;
    background: url(../../images/shanchu.png) no-repeat 0 50%;
    background-size: 0.24rem 0.24rem;
    float: right;
  }

  .list-bottom-t .li3 .li-sp6 {
    margin-right: 0.2rem;
    width: 0.24rem;
    height: 0.78rem;
    background: url(../../images/shanchu.png) no-repeat 0 50%;
    background-size: 0.24rem 0.24rem;
    float: right;
    margin-left: 0.2rem;
  }

  .list-bottom-t2 {
    overflow: hidden;
    margin-left: 1rem;
    padding-top: 0.28rem;
    width: calc(100% - 1rem);
    /*border-top: 1px solid #ebebeb;*/
  }

  .list-bottom-t2 ul {
    overflow: hidden;
    float: left;
    width: calc(100% - 1.15rem);
    margin-left: .2rem;
  }

  .list-bottom-t2 ul li {
    overflow: hidden;
    /*float:left;*/
  }

  .list-bottom-t2 .li1 {
    width: 100%;
    margin-left: 0.1rem;
  }

  .list-bottom-t2 .sp1 {
    font-size: 0.22rem;
    color: #adadad;
  }

  .list-bottom-t2 p {
    width: 0.78rem;
    height: 0.78rem;
    /*position: relative;*/
    /*overflow: hidden;*/
    border-radius: 50%;
    float: left;
  }

  .list-bottom-t2 img {
    width: 100%;
    display: block;
  }

  .list-bottom-t2 .sp6 {
    height: 0.48rem;
    margin-left: 0.1rem;
  }

  .list-bottom-t2 .sp7 {
    float: right;
    display: block;
  }

  .list-bottom-t2 .li2 {
    /*margin-bottom:0.32rem*/
  }

  .list-bottom-t2 .li2 .spb {
    color: #008dd3;
    margin-left: 0.14rem;
  }

  .list-bottom-t2 .li3 {
    /*float:right;margin-right:0.37rem;*/
  }

  .list-bottom-t2 .img {
    margin: 0.3rem 0 0.32rem 0;
    height: 1.42rem;
    width: 100%;
  }

  .list-bottom-t2 .img img {
    width: 2.11rem;
    height: 1.42rem;
    border-radius: 0.05rem;
  }

  .list-bottom-t .list-bottom-t2 .li3 .li-sp4 {
    margin-right: 0;
    margin-left: 0.2rem;
  }

  .list-bottom-t .list-bottom-t2 .li3 .li-sp5 {
    margin-right: 0;
    margin-left: 0.2rem;
  }

  .btn {
    height: 0.88rem;
    line-height: 0.88rem;
    color: #54c2f0;
    border-top: 0.01rem solid #e0e0e0;
    border-bottom: 0.01rem solid #e0e0e0;
    width: 100%;
    text-align: center;
    /*margin-bottom: 1.08rem;*/
  }

  .btn span {
    float: left;
    font-size: 0.22rem;
  }

  .btn1 {
    margin: 0 auto;
    height: 0.88rem;
    width: auto;
    display: inline-block;
  }

  .mt0 {
    margin-top: 0;
    padding-right: 0.2rem;
  }

  .footer {
    width: 100%;
    height: 0.88rem;
    background: #f6f6f6;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
  }

  .form {
    padding: .17rem .2rem 0;
    margin: 0 auto;
    height: 0.54rem;
  }

  .footer input {
    display: block;
  }

  .footer .text {
    height: 0.52rem;
    border: 1px solid #e0e0e0;
    border-radius: 0.05rem;
    float: left;
    width: calc(100% - 1rem);
  }

  .footer .text span {
    margin: 0 0.1rem 0 0.11rem;
    width: 0.24rem;
    height: 0.52rem;
    background: url(../../images/fatie.png) no-repeat 0 50%;
    background-size: 0.24rem 0.24rem;
    display: block;
    float: left;
  }

  .footer input[type=text] {
    height: 0.52rem;
    width: calc(100% - .45rem);
  }

  .footer input[type=button] {
    float: right;
    width: 0.4rem;
    height: 0.52rem;
    background: url(../../images/fasong.png) no-repeat 0 50%;
    background-size: 0.4rem 0.37rem;
    margin-right: 0.19rem;
  }

  input::-webkit-input-placeholder {
    color: #8f8f8f;
    font-size: 0.16rem;
  }

  .jubao {
    width: 5.36rem;
    height: 3.8rem;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -1.9rem;
    margin-left: -2.68rem;
    z-index: 999;
  }

  .jubaoall {
    width: 5.36rem;
    height: 3.8rem;
    position: relative;
  }

  .jubao img {
    width: 5.36rem;
    height: 3.8rem;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }

  .jubao a {
    width: 2.08rem;
    height: 0.54rem;
    line-height: 0.54rem;
    color: #fff;
    background: #008dd3;
    border-radius: 0.27;
    font-size: 0.22rem;
    display: block;
    text-align: center;
    border-radius: 0.28rem;
    position: absolute;
    left: 50%;
    margin-left: -1.04rem;
    bottom: 0.3rem;
  }

  .jubao a.sure {
    left: 0;
    margin-left: 0.5rem;
  }

  .jubao a.cancel {
    background: #adadad;
    color: #242424;
    right: 0;
    margin-left: 0;
    margin-right: 0.5rem;
  }

  .mark {
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background: rgba(36, 153, 200, 0.3);
    z-index: 999;
  }

  .ftall {
    width: 100%;
    background: #fff;
    position: fixed;
    /*left: 0;*/
    /*bottom: 0;*/
    /*display: none;*/
  }

  .form1 {
    width: 6rem;
    margin: 0 auto;
    padding: 0.17rem 0;
    overflow: hidden;
  }

  .footer1 {
    overflow: hidden;
    border-bottom: 0.01rem solid #c7c7c7;
  }

  .footer1 input {
    display: block;
  }

  .footer1 .text {
    height: 0.52rem;
    width: 5.38rem;
    border: 1px solid #e0e0e0;
    border-radius: 0.05rem;
    float: left;
  }

  .footer1 .text span {
    margin: 0 0.1rem 0 0.11rem;
    width: 0.24rem;
    height: 0.52rem;
    background: url(../../images/fatie.png) no-repeat 0 50%;
    background-size: 0.24rem 0.24rem;
    display: block;
    float: left;
  }

  .footer1 input[type=text] {
    height: 0.52rem;
    width: 4.93rem;
    float: left;
  }

  input::-webkit-input-placeholder {
    color: #8f8f8f;
    font-size: 0.16rem;
  }

  .ftall ul {
    width: calc(100% - 0.4rem);
    margin: 0 auto;
    overflow: hidden;
    padding: 0 0.2rem;
  }

  .ftall ul li {
    float: left;
  }

  .ftall .li1 {
    width: 0.34rem;
    height: 0.63rem;
    background: url(../../images/pic.png) no-repeat 0 50%;
    background-size: 0.34rem 0.26rem;
  }

  .ftall .li2 {
    width: 0.34rem;
    height: 0.63rem;
    background: url(../../images/fujian.png) no-repeat 0 50%;
    background-size: 0.22rem 0.26rem;
    margin-left: 0.28rem;
  }

  .ftall .li4 {
    width: 0.34rem;
    height: 0.63rem;
    background: url(../../images/fasong.png) no-repeat 0 50%;
    background-size: 0.34rem 0.26rem;
    float: right;
  }

  .pf {
    width: 5.36rem;
    height: 3.8rem;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -2.045rem;
    margin-left: -2.62rem;
    z-index: 10;
    border-radius: 0.05rem;
  }

  .pf-all {
    width: 4.87rem;
    height: 100%;
    margin: 0 auto;
  }

  .pf-all p {
    color: #292929;
    font-size: 0.24rem;
    line-height: 0.66rem;
    height: 0.56rem;
    padding-top: 0.1rem;
  }

  .pf-all .sp1 {
    color: #008dd3;
  }

  .pf-all textarea {
    width: 4.58rem;
    height: 1.88rem;
    resize: none;
    outline: none;
    border: 1px solid #e0e0e0;
    border-radius: 0.05rem;
  }

  .pf-all ul {
    width: 2.08rem;
    height: 0.56rem;
    margin: 0 auto;
  }

  .pf-all ul li {
    margin-top: 0.2rem;
    width: 2.08rem;
    height: 0.54rem;
    float: left;
    border-radius: 0.28rem;
    border: 1px solid #008dd3;
  }

  .pf-all ul li a {
    width: 2.08rem;
    height: 0.54rem;
    line-height: 0.54rem;
    color: #fff;
    background: #008dd3;
    font-size: 0.22rem;
    display: block;
    text-align: center;
    border-radius: 0.28rem;
  }

  .pf-all .li2 {
    float: right;
  }

  .pf .input {
    width: 4.85rem;
    height: 0.46rem;
    border: 1px solid #c7c7c7;
    border-radius: 0.05rem;
    margin-top: 0.2rem;
  }

  .pf input {
    display: block;
    height: 0.46rem;
    padding-left: 0.13rem;
    float: left;
  }

  .pf .b {
    display: block;
    width: 0.46rem;
    height: 0.46rem;
    background: url(../../images/backg.png) no-repeat 50% 50%;
    background-size: 0.24rem 0.12rem;
    float: right;
    padding: 0;
    border-left: 0.01rem solid #c7c7c7;
    border-top-left-radius: 0.05rem;
    border-bottom-left-radius: 0.05rem;
  }

  .pf .list1 {
    position: relative;
  }

  .pf ol {
    width: 4.85rem;
    color: #8f8f8f;
    font-size: 0.18rem;
    position: absolute;
    top: 0.46rem;
    background: #fff;
    border: 1px solid #c7c7c7;
  }

  .up,
  .up-b {
    overflow: hidden;
  }

  .up1 {
    width: 5.8rem;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .up {
    width: 100%;
    height: 1.65rem;
    border-top: 0.01rem solid #ebebeb;
    background: #fff;
    position: fixed;
    bottom: 0;
    z-index:999;
  }

  .up-l {
    float: left;
    width: 2.78rem;
    height: 0.7rem;
    font-size: 0.27rem;
    border: 1px solid #008dd3;
    border-radius: 0.4rem;
    color: #008dd3;
    text-align: center;
    line-height: 0.7rem;
  }

  .up-r {
    float: right;
    width: 2.8rem;
    height: 0.7rem;
    font-size: 0.27rem;
    background: #008dd3;
    border: 1px solid #008dd3;
    border-radius: 0.4rem;
    color: #fff;
    text-align: center;
    line-height: 0.7rem;
  }

  #reply {
    width: 100%;
    height: 2.5rem;
    font-size: .22rem;
    font-weight: normal;
    overflow: auto;
    outline: none;
  }

  img {
    max-width: 100%;
  }

  .uimgs {
    max-width: 100%;
  }

  .placeholder {
    color: #ccc
  }

  .nav2 span {
    font-size: 0.2rem!important;
  }
</style>
