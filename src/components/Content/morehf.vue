<template>
	<div class="wrapper backtop" style="overflow-y: scroll;font-size: 0.2rem;width: 100%;">
		<div class="listbanner">
				<div class="header">
					<div class="header-top">
						<a href="javascript:history.back(-1);"></a>
						<span class="forget">帖子详情</span>
						<div class="user" @click="toggle1()"></div>
						<div class="ld" @click="fx()"></div>
					</div>
				</div>
			</div>
		<div class="content" ref="a1" v-show="isshowc">

			<div style="padding-top:0.3rem;height:100%;overflow-y: auto;position: relative;bottom: 0;">
			<!--头部-->
			<div class="top">
				<ul class="top-t">
					<li class="li1">
						<span class="p1 mt50 p2" v-if="this.listData.dist>0"></span>
						<span class="p1 mt6 p3" v-if="this.listData.top>0"></span>
						<span class="p1 mt6 p4" v-if="this.listData.url != ''"></span>
					</li>
					<li class="li2" :style="this.listData.highlight==1?'color:'+this.listData.highstyle:''">{{listData.title}}</li>
				</ul>
				<ul class="top-b">
					<li class="li1">
						<img src="" v-lazy="this.listData.face" />
					</li>
					<div style="width: 3.5rem;float: left;padding-top: 0.1rem;">
						<li class="li2" style="width:100%;height: 0.5rem;line-height: 0.5rem;">{{listData.uname}}</li>
						<li style="height: 0.25rem;margin-left: 0.16rem;">
							<img  :src="user.icon" alt="" style="height:0.3rem;float: left;margin-right: 0.1rem;"v-for="(user,index) in this.listData.usergroup" v-if="user.icon!=''">
							<!--<span class="li3" style="line-height: 0;height: 0;padding: 0.1rem 0.1rem;border-radius: 0.05rem;margin-right: 0.05rem;margin-top: 0.04rem;color: #fff;margin-left: 0.05rem;float: left;" v-for="(user,index) in this.listData.usergroup" v-if="user.type=='member'" :style="'background:'+user.bcolor">{{user.title}}</span>-->
						</li>
					</div>
					<li class="li4">{{this.listData.addtime}}</li>
				</ul>
			</div>
			<div class="line"></div>
			<div>
				<!--普通-->
				<div class="center0" v-if="this.listData.topic_type==0">
					<ul class="center-txt0">
						<li class="li1" v-html="this.listData.content"></li>
						<!--<li class="li2">
		                    <img src="../../images/pt.png"/>
		                </li>-->

						<li class="li3">
							<span class="sp1" v-bind:class="{collect:isCollect==1}" @click="opbtn('collect', 'del')" v-if="isCollect">{{collectNum}}</span>
							<span class="sp1" @click="opbtn('collect', 'add')" v-else>{{collectNum}}</span>
							<span class="sp2" v-bind:class="{zan:isZan>0}" v-if="isZan>0">{{zanNum}}</span>
							<span class="sp2" @click="opbtn('zan')" v-else>{{zanNum}}</span>
							<span class="sp3">{{this.listData.viewcount}}</span>
							<span class="sp4">{{this.listData.replycount}}</span>
						</li>
					</ul>
				</div>
				<!--投票-->
				<div class="center" v-if="this.listData.topic_type==1">
					<ul class="center-txt">
						<li class="li1" v-html="this.listData.content"></li>
						<li class="li2">
							<div class="pt">
								<p class="spt">投票</p>
							</div>
							<div class="jdt">
								<div class="jdt-all" v-for="(data,index) in this.listData.vote_opts">
									<div class="nav-right" ref="cb">
										<li class="li4">
											<label>
		                                    	<input type="checkbox" ref="check" :value="data.id" :name="data.name" v-if="listData.vote_multi==1"><b></b>
		                                    	<input type="radio" ref="check" :value="data.id" :name="data.name" v-if="listData.vote_multi==0" name="r"><b></b>
		                                	</label>
										</li>
									</div>
									<ul class="jdt-l">
										<div class="jbt-l-t">
											<li class="j1">{{Math.ceil((data.num/vate_num)*100)}}%</li>
											<li class="j2">{{data.name}}</li>
											<li class="j3">100%</li>
										</div>
										<li class="j4">
											<!--{ width: (data.num/this.listData.vate_num)*4.1 + 'rem' }-->
											<span class="j4-sp" :style="{ width: (data.num/vate_num)*4.1 + 'rem' }"></span>
										</li>
									</ul>

								</div>

							</div>
							<div class="jdt-r" style="width: 100%;margin-left: 0;border-left: 0;">
								<div class="jbt-btn" @click="toupiao()">投票</div>
							</div>
						</li>
						<li class="li3">
							<span class="sp1" v-bind:class="{collect:isCollect==1}" @click="opbtn('collect', 'del')" v-if="isCollect">{{collectNum}}</span>
							<span class="sp1" @click="opbtn('collect', 'add')" v-else>{{collectNum}}</span>
							<span class="sp2" v-bind:class="{zan:isZan>0}" v-if="isZan>0">{{zanNum}}</span>
							<span class="sp2" @click="opbtn('zan')" v-else>{{zanNum}}</span>
							<span class="sp3">{{this.listData.viewcount}}</span>
							<span class="sp4">{{this.listData.replycount}}</span>
						</li>
					</ul>
				</div>
				<!--活动-->
				<div class="center1" v-if="this.listData.topic_type==2">
					<ul class="center-txt1">
						<li class="li2" v-if="this.listData.url=''">
							<img :src="this.listData.url" />
						</li>
						<div class="list-top1">
							<ul>
								<li class="li1">活动详情</li>
							</ul>
						</div>
						<li class="li1">
							<p><span>活动类型：</span><span>{{this.listData.evendata.type}}</span></p>
							<p><span>活动地点：</span><span>{{this.listData.evendata.area}}</span></p>
							<p><span>活动时间：</span><span>{{this.listData.evendata.stime}}</span>~<span>{{this.listData.evendata.etime}}</span></p>
							<p><span>性别要求：</span><span v-text="this.listData.evendata.sex==1?'男':(this.listData.evendata.sex==2?'女':'其他')"></span></p>
							<p><span>每人花销：</span><span>{{this.listData.evendata.cost}}</span></p>
						</li>
					</ul>
					<div class="line11">{{this.listData.evendata.costExplain}}</div>
					<div class="bm1">
						<ul class="ul1">
							<li class="li1">已报名：<span>{{this.listData.evendata.joinCount}}</span></li>
							<li class="li2">
								<span class="sp1" @click="toggle3();friend()">邀请</span>
								<router-link :to="'/attend?tid='+this.$route.query.id">
									<span class="sp2">报名管理</span>
								</router-link>
							</li>
						</ul>
						<ul class="ul2">
							<li class="li1">报名截止：<span>{{this.listData.deadline}}</span></li>
						</ul>
					</div>
					<div class="cj1">
						<router-link :to="'/enter?tid='+this.$route.query.id">
							<div class="btn1">报名参加</div>
						</router-link>
					</div>
					<ul class="center-txt1">
						<li class="li1" v-html="this.listData.content"></li>
						<li class="li3">
							<span class="sp1" v-bind:class="{collect:isCollect==1}" @click="opbtn('collect', 'del')" v-if="isCollect">{{collectNum}}</span>
							<span class="sp1" @click="opbtn('collect', 'add')" v-else>{{collectNum}}</span>
							<span class="sp2" v-bind:class="{zan:isZan>0}" v-if="isZan>0">{{zanNum}}</span>
							<span class="sp2" @click="opbtn('zan')" v-else>{{zanNum}}</span>
							<span class="sp3">{{this.listData.viewcount}}</span>
							<span class="sp4">{{this.listData.replycount}}</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="line"></div>
			<div class="page-loadmore">
			<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150"  @bottom-status-change="handleBottomChange" ref="loadmore">

			<div class="list">
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
					<div class="list-bottom" v-for="comment in commentData" :style="comment.replyCount < 4 ? 'border-bottom:1px solid #e0e0e0' : ''" :id="'commentbox-'+comment.id">
						<div class="list-bottom-t">
							<div class="list-bottom-t" v-if="comment.id!=undefined">
								<p><img v-lazy="comment.face" /></p>
								<ul>
									<li class="li1">
										<span class="sp1">{{comment.uname}}</span>

										<span v-if="comment.friend_node">
											<span class="sp3">(</span>
											<span class="sp4">{{comment.friend_node}}</span>
											<span class="sp5">)</span>
										</span>
										<span :class="'sp2' + (comment.sex == 1 ? '' : ' girl')"></span>
										<span class="sp7">{{comment.ctime}}</span>
										<li style="height: 0.3rem;">
											<img  :src="user.icon" alt="" style="height:0.3rem;float: left;width: auto;border-radius: 0;margin-right: 0.1rem;"v-for="(user,index) in comment.usergroup" v-if="user.icon!=''">
											<!--<span class="li3" style="line-height: 0;height: 0;padding: 0.1rem 0.1rem;border-radius: 0.05rem;margin-right: 0.05rem;margin-top: 0.04rem;color: #fff;margin-left: 0.05rem;" v-for="(user,index) in comment.usergroup" v-if="user.type=='member'" :style="'background:'+user.bcolor">{{user.title}}</span>-->

										</li>
										<span class="sp6" v-for="group in comment.groups" :style="group.icon ? 'background:none;' : ''">
											<img :src="group.icon" v-if="group.icon" />
											<font :style="'background-color:'+group.bcolor" v-else>{{group.title}}</font>
										</span>

									</li>
									<li class="li2" @click="toggle('reply', comment.id, comment.treply_id)" v-html="comment.content"></li>
									<li class="li3">
										<span class="li-sp5" @click="d(comment.id)" v-if="gly==1"></span>
										<!--@click="toggle('jubao', comment.id, comment.treply_id)"-->
										<span class="li-sp4" @click="toggle('jbhf', comment.id, comment.treply_id)"></span>
									</li>
								</ul>
							</div>
							<div class="list-bottom-t2" v-for="reply in comment.zi_commen" :id="'commentbox-'+reply.id">
								<p><img :src="reply.face" /></p>
								<ul>
									<li class="li1">
										<span class="sp1">{{reply.uname}}</span>
										<span :class="'sp2' + (reply.sex == 1 ? '' : ' girl')"></span>
										<span class="sp7" style="margin-right: 0;">{{reply.ctime}}</span>
										<li style="height: 0.3rem;">
											<img  :src="user.icon" alt="" style="height:0.3rem;float: left;width: auto;border-radius: 0;margin-right: 0.1rem;"v-for="(user,index) in reply.usergroup" v-if="user.icon!=''">
											<!--<span class="li3" style="line-height: 0;height: 0;padding: 0.1rem 0.1rem;border-radius: 0.05rem;margin-right: 0.05rem;margin-top: 0.04rem;color: #fff;margin-left: 0.05rem;" v-for="(user,index) in comment.usergroup" v-if="user.type=='member'" :style="'background:'+user.bcolor">{{user.title}}</span>-->

										</li>
										<span v-if="reply.friend_node">
											<span class="sp3">(</span>
											<span class="sp4">{{reply.friend_node}}</span>
											<span class="sp5">)</span>
										</span>
										<span class="sp6" v-for="rgroup in reply.groups">
											<img :src="rgroup.icon" v-if="rgroup.icon" />
											<font :style="'background-color:'+rgroup.bcolor" v-else>{{rgroup.title}}</font>
										</span>

									</li>
									<li class="li2">
										<span class="spa">回复</span>
										<span class="spb">{{reply.applyUser}}：</span>
										<span class="spc" @click="toggle('reply', reply.id, reply.treply_id)" v-html="reply.content"></span>
									</li>
									<li class="li3">
										<span class="li-sp5" @click="d(reply.id)" v-if="gly==1"></span>
										<span class="li-sp4" @click="toggle('jubao', reply.id, reply.treply_id)"></span>
									</li>
								</ul>
							</div>
						</div>
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
			<div class="mark" v-show="isshow || isshowd"></div>
			<div class="mark" v-show="upshow" @click="mark()"></div>
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
						<input style="opacity:0;position: absolute;width:0.34rem;height:0.64rem;" type="file" id="imgView" @change="onchange">
						<input type="button" />
					</li>
					<li class="li4" @click="submithf()"><input type="button" /></li>
				</ul>
			<!--</div>-->
    </mt-popup>
			<!--删帖-->
			<div class="up" v-show="isshowd">
				<div class="up-all">
					<p><span class="sp1">删帖理由</span></p>
					<textarea v-model="del1"></textarea>
					<ul>
						<li class="li1" @click="delData(1,del1)">
							<a>提交</a>
						</li>
						<li class="li2" @click="toggle('cancel')">
							<a>取消</a>
						</li>
					</ul>
				</div>
			</div>
			<!--删回复-->
			<div class="up" v-show="del">
				<div class="up-all">
					<p><span class="sp1">删回复理由</span></p>
					<textarea v-model="del2"></textarea>
					<ul>
						<li class="li1" @click="delData(2,del2)">
							<a>提交</a>
						</li>
						<li class="li2" @click="d();a1()">
							<a>取消</a>
						</li>
					</ul>
				</div>
			</div>
			<!--举报-->
			<div class="jubao" v-show="isshow">
				<div class="jubaoall">
					<img src="../../images/jubao.png" />
					<a :href="'#/report?type=thread&id='+this.$route.query.id">举报</a>
				</div>
			</div>
			<!--举报回复-->
			<div class="jubao" v-show="jbhfshow">
				<div class="jubaoall">
					<img src="../../images/jubao.png" />
					<a :href="'#/report?type=comment&id='+rid">举报</a>
				</div>
			</div>
			<!--评分-->
			<div class="pf" v-show="toshow">
				<div class="pf-all">
					<p><span class="sp1">帖子评分</span></p>
					<div class="list1">
						<div class="input">
							<input type="text" placeholder="评分类型" disabled="disabled" ref="text" />
							<span class="b" @click="togglepf()"></span>
						</div>
						<ol v-show="pfshow">
							<li v-for="(pf,index) in pfData" :key="index" style="font-size: 0.26rem;height: 0.5rem;line-height: 0.5rem;padding-left: 0.1rem;border-bottom: 1px solid #E0E0E0;" @click="pftext(pf.name,pf.id)">{{pf.name}}</li>
						</ol>
					</div>
					<div class="input">
						<input type="text" placeholder="请输入奖励积分数量，扣分为负值" v-model="num" ref="num" />
					</div>
					<div class="input">
						<input type="text" placeholder="理由" v-model="reason" />
					</div>
					<ul>
						<li class="li1" @click="pfsubmit();a1()">
							<a>提交</a>
						</li>
					</ul>
				</div>
			</div>
			<!--分享-->
			<div class="fenxiang" v-show="fenxiang">
				<ul>
					<li>
						<img src="../../images/qiuqiu.png" />
					</li>
					<li>
						<a class="jiathis_button_tsina">
						<img src="../../images/qzone.png" />
						</a>
					</li>
					<li>
						<img src="../../images/wx.png" />
					</li>
					<a href="http://service.weibo.com/share/share.php?appkey=&title=&url=&searchPic=false&style=simple" target="_blank">
						<li>
							<img src="../../images/xinlang.png" />
						</li>
					</a>
				</ul>
			</div>
			<!--邀请-->
			<div class="yaoqing" ref="yaoqing">
				<div class="yaoqing-t">
					<p><span class="sp1">邀请好友</span></p>
				</div>
				<div class="yaoqing-b">
					<div class="yaoqing-list" v-for="(list,index) in friendData" :key="index">
						<p ref="p">{{list.uname}}<span>(<span>{{list.note}}</span>)</span>
						</p>
						<ul class="yaoqing-right">
							<li class="li4">
								<label>
	                                <input type="checkbox" ref="check" :value="list.hao_id"><b></b>
	                            </label>
							</li>
						</ul>
					</div>
				</div>
				<div class="yaoqing-f">
					<p @click="yq();submit()"><span class="fsp1">确定</span></p>
				</div>
			</div>

			<div class="mark" v-show="show"></div>
			<div class="mark" v-show="jbhfshow" @click="jbhf()"></div>

			<div class="mark" v-show="show1"></div>
			<div class="mark" v-show="show2"></div>
			<div class="mark" v-show="show3"></div>
			<div class="mark" v-show="del"></div>
			<div class="mark" v-show="yaoqing" @click="yq()"></div>
			<div class="mark" v-show="fenxiang" @click="fxnone"></div>
			<div class="mark" v-show="isshow" @click="jb()"></div>
			<div class="mark" v-show="toshow" @click="ts();a1()"></div>
			<div class="mark" v-show="upshow" @click="mark()"></div>
			<!--<div class="load" style="display:none;">
				<div class="load-container load4">
					<div class="loader"> <i></i></div>
				</div>
			</div>-->
		</div>
		<editor :title="this.listData.title" :id="this.listData.id" v-show="isshowe" v-on:message="recieveMessage"></editor>
		<pop class="tip" :title="tip"></pop>
    <load v-show="isload"></load>
		<!--<backtop></backtop>-->
	</div>
</template>

<script>
	import { getOpenUrl, insertHtmlAtCaret,getToken } from "../../assets/js/common.js"
	import { setCookie, getCookie } from '../../assets/js/cookie.js'
	import qs from 'qs'
	import editor from './editor.vue'

	var loading = false, end = false,limit=10;
	export default {
		name: 'content',
		data() {
			return {
        footer1Show:false,
			  isload:false,
				tip: '',
				show: false,
				isshow: false,
				toshow: false,
				upshow: false,
				show1: false,
				show2: false,
				show3: false,
				fenxiang: false,
				yaoqing: false,
				del: false,
				pfshow: false,
				gly: '',
				man: '男',
				woman: '女',
				other: '不限',
				idData: [],
				nameData: [],
				id: '',
				vate_num: '',
				listData: {},
				commentData: {},
				wrong: {},
				friendData: {},
				idData: [],
				zd: '',
				jj: '',
				gl: '',
				del1: '',
				del2: '',
				hfid: '',
				tid: '',

				data: {},
				isCollect: false,
				collectNum: 0,
				isZan: false,
				zanNum: 0,
				commentData: [],
				commentsData: [],
				sort: 'desc',
				imgData: [],

				rid: 0,
				trid: 0,

				isshow: false, //不可关闭图层
				upshow: false, //可关闭图层
				isshowd: false, //删除图层确认
				isshowc: true,
				isshowe: false,
				jbhfshow: false,
				//评分
				pfData: {},
				reason: '',
				num: '',
				gid: '',
				//高亮颜色
				bg: '',
				allLoaded: false,
				topStatus: ''
			};
		},
		components: {
			editor
		},
		mounted() {
			$('.tip').hide();
			//lin
//			this.tabScroll();
			this.getCommentData(this.zipage,this.sort)
			var $self = this;
			this.id = this.$route.query.id;
			this.gid = this.$route.query.gid
			end = false;
			$('.loading-layer span').removeClass('active');
			$('.loading-layer div').removeClass('active');
			$('.load').show();
//			this.getCommentData(3, 1);
			$('[placeholder]').focus(function() {
				var input = $(this);
				if(input.html() == input.attr('placeholder')) {
					input.css('color', '#242424').html('');
					input.removeClass('placeholder');
				}
			}).blur(function() {
				var input = $(this);
				if(input.html() == '' || input.html() == input.attr('placeholder')) {
					input.addClass('placeholder');
					input.css('color', '#ccc').html(input.attr('placeholder'));
				}
			});

//			//无限加载
//			$(window).scroll(function() {
//				if(loading || end || this.scrollTop > $(window).scrollTop()) return;
//				this.srcollTop = $(window).scrollTop();
//				if($(document).height() - $(window).height() - $(window).scrollTop() < 80) {
//					$('.loading-layer span').addClass('active');
//					loading = true;
//					$self.zipage += 1;
//					setTimeout(() => {
//						$self.getCommentData($self.page,$self.sort);
//					}, 1500);
//				}
//			});
			//mine
			this.tid = this.$route.query.id;
			this.$http.get(getOpenUrl() + "topicData", {
				params: {
					tid: this.$route.query.id
				},
				headers: {
					'Authorization': 'Bearer ' + getToken()
				}
			}).then((res) => {
//				this.getCommentData(1,this.sort)
				if(res.body.code == 0) {
					$('.load').hide();
					this.listData = res.body.data;
					this.isCollect = this.listData.is_shouc;
					this.collectNum = this.listData.shoucannum;
					this.isZan = this.listData.is_zan;
					this.zanNum = this.listData.zan_num;
					this.vate_num = res.body.data.vate_num
				} else {
					this.tip = "帖子不存在或已被删除";
					$('.tip').show();
					setTimeout(() => {
						$('.tip').hide();
						this.$router.go(-1)
					}, 1000)

				}

			})
		},
		methods: {
			getCommentData(zipage,sort) {
				this.zipage = zipage ? zipage : 1;
//				sort = sort == 'desc' ? 1 : 0;
				console.log(this.zipage)
				//获取新闻评论
				var $self = this;
				this.$http.get(getOpenUrl() + "commentList", {
					params: {
						tid: this.$route.query.id,
						paixu: sort ? sort : 'desc',
						zi_page: this.zipage,
						zi_limit: 10,
						post_id:this.$route.query.post_id
					},
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					this.$refs.loadmore.onBottomLoaded();
					$('.loading-layer span').removeClass('active');
					$('.loading-layer div').removeClass('active');
					if (res.body.code == '0000'){
						var data = res.body.data;
						$.each(data, function(k, v){
							$self.commentData.push(v);
						})
						console.log($self.commentData)
					}else{
						end = true;
//						if (this.zipage > 1 && loading){
//							$('.loading-layer div').addClass('active');
//						}
//						this.tip = res.body.error_description;
//						$('.tips').show();
//						setTimeout(function(){
//							$('.tips').hide();
////							this.$router.go(-1);
//						},1000)
						$('.loading-layer div').addClass('active');
//						$self.allLoaded = true;
					}
					loading = false;
//					if(res.body.data != undefined) {
//						this.commentData = res.body.data;
//					}
					for(var i = 0; i < this.commentData.length; i++) {
						this.gly = this.commentData[i].is_candel;
						this.hfid = this.commentData[i].id;
					}
				})
			},
			loadBottom() { // 加载更多数据的操作
				//this.allLoaded = true;// 若数据已全部获取完毕
//				var self = this;
				this.zipage+=1;
//				setTimeout(()=> {
					this.getCommentData(this.zipage,this.sort)

//				}, 2000);

			},
			handleBottomChange(status){
				this.bottomStatus = status;
			},
			jbhf() {
				this.jbhfshow = !this.jbhfshow
			},
			ts() {
				this.toshow = !this.toshow
			},
			toupiao() {
				this.idData = [];
				this.nameData = [];
				for(var i = 0; i < this.$refs.check.length; i++) {
					var ch = this.$refs.check[i].checked;
					if(ch) {
						this.idData.push(this.$refs.check[i].value);
						this.nameData.push(this.$refs.check[i].name);
					}
				}
				if(this.idData.length > 0) {
					this.$http.post(getOpenUrl() + "doVote", {
						//					this.$route.query.id,
						vote_id: this.$route.query.id,
						opts: this.nameData,
						opts_ids: this.idData,
					},{

						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					}).then((res) => {
						this.wrong = res.body.code
						if(res.body.code == 0) {
							this.tip = "投票成功";
							$('.tip').show();
							setTimeout(function() {
								$('.tip').hide();
							}, 1000)

							this.$refs.check.disable = "false"
						} else {
							this.tip = res.body.error_description;
							$('.tip').show();
							setTimeout(function() {
								$('.tip').hide();
							}, 1000)
						}
					})
				} else {
					this.tip = "请选择";
					$('.tip').show();
					setTimeout(function() {
						$('.tip').hide();
					}, 1000)
				}

			},

			//删除帖子
			d(id) {
				this.del = !this.del;
//				this.$refs.a1.style.height = "calc(100% - 1.64rem)";
//				this.$refs.a1.style.overflow = "hidden";
				this.hfid = id;
			},
			//高亮
			s1() {
				this.show1 = !this.show1;
//				this.$refs.a1.style.height = "calc(100% - 1.64rem)";
//				this.$refs.a1.style.overflow = "hidden";
			},
			//置顶
			s2() {
				this.show2 = !this.show2;
//				this.$refs.a1.style.height = "calc(100% - 1.64rem)";
//				this.$refs.a1.style.overflow = "hidden";
			},
			//加精
			s3() {
				this.show3 = !this.show3;
//				this.$refs.a1.style.height = "calc(100% - 1.64rem)";
//				this.$refs.a1.style.overflow = "hidden";
			},
			toggle1() {
				this.isshow = !this.isshow;
//				this.$refs.a1.style.height = "calc(100% - 1.64rem)";
//				this.$refs.a1.style.overflow = "hidden";

			},
			jb() {
				this.isshow = !this.isshow;
				this.$refs.a1.style.height = "100%";
				this.$refs.a1.style.overflow = "";
			},
			//评分
			toggle2() {
				this.toshow = !this.toshow;
//				this.$refs.a1.style.height = "calc(100% - 1.64rem)";
//				this.$refs.a1.style.overflow = "hidden";

			},
			//提交评分
			pfsubmit() {
				var n = /^\d+$/;
				if(this.$refs.text.value == '') {
					this.tip = "请选择评分";
					$('.tip').show();
					setTimeout(function() {
						$('.tip').hide();
					}, 1000)
				} else if(!n.test(this.$refs.num.value)) {
					this.tip = "请填写数字";
					$('.tip').show();
					setTimeout(function() {
						$('.tip').hide();
					}, 1000)
				} else if(this.num == '') {
					this.tip = "请填写奖励数";
					$('.tip').show();
					setTimeout(function() {
						$('.tip').hide();
					}, 1000)
				} else if(this.reason == '') {
					this.tip = "请填写理由";
					$('.tip').show();
					setTimeout(function() {
						$('.tip').hide();
					}, 1000)
				}

				this.$http.post(getOpenUrl() + "topicDoScore", {

					tid: this.$route.query.id,
					pid: this.listData.post_id,
					type: 1,
					credit_type: this.$refs.text.value,
					uid: this.listData.uid,
					gid: this.$route.query.gid,
					num: this.num,
					reason: this.reason,
				},{
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					this.pfData = res.body.data
					if(res.body.code == 0) {
						this.tip = "评分成功";
						$('.tip').show();
						setTimeout(function() {
							$('.tip').hide();
						}, 1000)
					} else {
						this.tip = res.body.error_description;
						$('.tip').show();
						setTimeout(function() {
							$('.tip').hide();
						}, 1000)
					}
				})
			},
			//点击评分名字
			pftext(name, id) {
				this.$refs.text.value = name
				this.$refs.text.name = id
				this.pfshow = !this.pfshow;
			},
			//评分类型
			togglepf() {
				this.pfshow = !this.pfshow;
				this.$http.get(getOpenUrl() + "topicScore", {
					params: {
						tid: this.$route.query.id
					},

					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					this.pfData = res.body.data
				})
			},
			toggle3() {
				this.yaoqing = !this.yaoqing;
				this.$refs.yaoqing.style.display = "block";
				//this.$refs.a1.style.height = "calc(100% - 1.64rem)";
				this.$refs.a1.style.overflow = "hidden";
			},
			yq() {
				this.yaoqing = !this.yaoqing;
				this.$refs.yaoqing.style.display = "none";
				this.$refs.a1.style.height = "100%";
				this.$refs.a1.style.overflow = "";
			},
			focus() {
				this.upshow = !this.upshow;
				//this.$refs.a1.style.height = "calc(100% - 1.64rem)";
				this.$refs.a1.style.overflow = "hidden";
				this.$refs.footer1.style.display = "block";
				this.$refs.footer1.style.zIndex = 1000;
			},
			fx() {
				this.fenxiang = !this.fenxiang;
				//this.$refs.a1.style.height = "calc(100% - 1.64rem)";
				this.$refs.a1.style.overflow = "hidden";
			},
			fxnone() {
				this.fenxiang = !this.fenxiang;
				this.$refs.a1.style.height = "100%";
				this.$refs.a1.style.overflow = "";
			},

			mark() {
//				this.$refs.footer1.style.display = "none";
//				this.$refs.footer1.style.zIndex = 0;
        this.footer1Show = false;
				this.upshow = !this.upshow;
				this.$refs.a1.style.height = "100%";
				this.$refs.a1.style.overflow = "";
			},
			a1() {
				this.$refs.a1.style.height = "";
				this.$refs.a1.style.overflow = "";
			},
			//好友列表
			friend() {
				this.idData = [];
				this.$http.get(getOpenUrl() + "buddyList", {
					params: {
						type: 1
					},
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					this.friendData = res.body.data;
				})
			},
			submit() {
				this.idData = [];
				this.$mount(this.$refs)
				for(var i = 0; i < this.$refs.check.length; i++) {
					var ch = this.$refs.check[i].checked;
					if(ch) {
						this.idData.push(this.$refs.check[i].value);
					}
				}
				this.$http.post(getOpenUrl() + "invitation", {
					tid: this.$route.query.id,
					gid: this.$route.query.gid,
					uids: this.idData,
					header: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					this.friendData = res.body.data;
					if(res.body.code == 0) {
						this.$root.eventHub.$emit('jfSuccess');
            this.$root.eventHub.$emit('refreshed');
						this.tip = "发送成功";
						$('.tip').show();
						setTimeout(function() {
							$('.tip').hide();
						}, 1000)
					} else if(res.body.code == 1002) {
						this.tip = res.body.error_description;
						$('.tip').show();
						setTimeout(function() {
							$('.tip').hide();
						}, 1000)
					}
				})

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
			//发表回复
			submithf() {
				var message = $('#reply').html();
				let transMessage = this.utf16toEntities(message)
				if(message == '' || message == '请输入回复内容') {
					this.tip = "请输入回复内容";
					$('.tip').show();
					setTimeout(function() {
						$('.tip').hide();
					}, 1000)
					return false;
				}
        clearTimeout(this.fn);
        this.fn = setTimeout( ()=> {
          this.isload = true;
          this.$http.post(getOpenUrl() + "releaseComment", {
            tid: this.$route.query.id,
            gid: this.$route.query.gid,
            content: transMessage,
            qid: this.rid,
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
              this.getCommentData(1, this.sort);
              this.mark();
            } else {
              this.tip = res.body.error_description;
              $('.tip').show();
              setTimeout(function () {
                $('.tip').hide();
              }, 1000)
            }
          })
        },500)
			},
			//删除
			delData(type, del) {
				var ids = [];
				if(type == 1) {
					ids.push(this.$route.query.id);
				} else if(type == 2) {
					ids.push(this.hfid);
				}

				this.$http.post(getOpenUrl() + "topicDel", {
					id: ids,
					gid: this.$route.query.gid,
					type: type,
					style: 'topic',
					reason: del,
				},{
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					if(res.body.code == 0) {
						if(type == 1) {
							this.tip = "删除帖子成功";
							$('.tip').show();
							setTimeout(function() {
								$('.tip').hide();
							}, 1000)
							this.$router.go(-1);
						} else {
							$.each(ids, function(k, v) {
								$('#commentbox-' + v).remove();
							})
							this.tip = "删除回复成功";
							$('.tip').show();
							setTimeout(function() {
								$('.tip').hide();
							}, 1000)
							this.del = false;
							this.$refs.a1.style.height = '100%';
							this.$refs.a1.style.overflow = "";
						}

					}
				})
			},
			//lin
			opbtn: function(type, op) {
				//$('.load').show();
        this.isload = true;
				switch(type) {
					case 'collect':
						//收藏
						this.$http.post(getOpenUrl() + "collectDo", {
							did: this.listData.id,
							type: 3,
							status: op
						}, {
							headers: {
								'Authorization': 'Bearer ' + getToken()
							}
						}).then((res) => {
              this.isload = false;
							if(res.body.code == '0000') {
								this.collectNum = op == 'del' ? this.collectNum - 1 : this.collectNum + 1;
								this.isCollect = !this.isCollect;
							} else {
								if(res.body.code == '1002') {
									this.tip = "请登录";
									$('.tip').show();
									setTimeout(function() {
										$('.tip').hide();
									}, 1000)
									setTimeout(() => {
										this.$router.push("/login")
									}, 1500)
								} else {
									this.tip = res.body.error_description;
									$('.tip').show();
									setTimeout(function() {
										$('.tip').hide();
									}, 1000)
								}
							}
							$('.load').hide();
						})
						break;
					case 'zan':
						//点赞
						this.$http.post(getOpenUrl() + "zan", {
							id: this.listData.id,
							styles: 1
						}, {
							headers: {
								'Authorization': 'Bearer ' + getToken()
							}
						}).then((res) => {
              this.isload = false;
							if(res.body.code == '0000') {
								this.isZan = !this.isZan;
								this.zanNum = this.zanNum + 1;
							} else {
								this.tip = res.body.error_description;
								$('.tip').show();
								setTimeout(function() {
									$('.tip').hide();
								}, 1000)
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
							if(res.body.code == '0000') {
								$('#commentbox-' + this.rid).remove();
								this.mark();
							} else {
								this.tip = res.body.error_description;
								$('.tip').show();
								setTimeout(function() {
									$('.tip').hide();
								}, 1000)
							}
							$('.load').hide();
						})
						break;
				}
			},
			order(sort) {
				//排序
				console.log(sort,this.sort,end)
				if(sort == this.sort) {
					return;
				}
				this.sort = sort;
				if(end) {
					//数据全部加载完后排序直接颠倒数组
					var $self = this,
						len = $self.commentData[0].zi_commen.length;

					var commentData = [];
					console.log($self.commentData[0].zi_commen)
					commentData = $.map(this.commentData[0].zi_commen, function(v, i) {
						return $self.commentData[0].zi_commen[len - 1 - i];
					});
					this.commentData[0].zi_commen = commentData;
				} else {
					this.commentData[0].zi_commen = [];
					this.getCommentData(1, this.sort);
				}
				//console.log(this.commentData)
			},

			toggle(type, rid, trid) {
				switch(type) {
					case 'comment':
						//评论
						this.isshowc = false;
						this.isshowe = true;
						break;
					case 'reply':
						//this.upshow = !this.upshow;
						this.rid = rid;
						this.trid = trid;
						this.footer1Show = true;
//						this.$refs.footer1.style.display = "block";
//						this.$refs.footer1.style.zIndex = 1000;
						//回复
						break;

					case 'jubao':
						//举报
						this.rid = rid;
						this.isshow = !this.isshow;
						break;
					case 'jbhf':
						//举报
						this.rid = rid;
						this.jbhfshow = !this.jbhfshow;
						break;
					case 'del':
						//删除
						this.rid = rid;
						this.trid = trid;
						this.isshowd = !this.isshowd;
						break;
					case 'cancel':
						this.mark();
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
				if(data.isnew) {
					this.commentData = [];
					end = false;
					this.getCommentData(this.id, this.sort, 1);
				}
			},

			mark() {
				this.rid = 0;
				this.trid = 0;
//				this.$refs.footer1.style.display = "none";
//				this.$refs.footer1.style.zIndex = 0;
        this.footer1Show = false;
				this.upshow = false;
				this.isshow = false;
				this.isshowd = false;
				this.$refs.a1.style.height = "100%";
				this.$refs.a1.style.overflow = "";
			},

			onchange(e) {
				//上传
				if(!e) {
					return;
				}
				var reader = new FileReader();
				//获取文件
				var file = e['target']['files'][0];
				var imageType = /^image\//;
				//是否是图片
				if(!imageType.test(file['type'])) {
					this.tip = "请选择图片！";
					$('.tip').show();
					setTimeout(function() {
						$('.tip').hide();
					}, 1000)
					return;
				}

				//读取完成
				reader.onload = (e) => {
					//获取图片dom
					var img_ava = e.target['result'];
					this.imgBase = img_ava;
					$('.load').show();
					this.$http.post(getOpenUrl() + "Upload", {
						logo: this.imgBase,
						type: 'comment',
						category: 'images'
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					}).then((res) => {
						$('.load').hide();
						var data = res.body.data;
						if(res.body.code == '0000') {
							this.imgData.push(data.attach_id);
							$('#reply').focus();
							insertHtmlAtCaret('<img src="' + data.url + '" class="uimgs" style="max-width:100%" />');
						} else {
              this.tip = res.body.error_description
              $('.tip').show();
              setTimeout(function() {
                $('.tip').hide();
              }, 1000)
						}
					})
				};
				reader.readAsDataURL(file);
			},

		},
//		beforeDestroy(){
//			window.removeEventListener("scroll", this.toScroll);
//		}
	}
</script>
<style scoped>
  .wrapper {
    height: calc(100% - .7rem);
    padding-top: .7rem;
  }

  .line11 {
    line-height: 0.51rem;
    height: 0.51rem;
    text-align: center;
    width: 100%;
    background: #f5f7fa;
    color: red;
    font-size: 0.2rem;
  }

  .mt24 {
    margin-bottom: 0.24rem;
  }

  .mt59 {
    margin-top: 0.59rem;
  }

  .mt70 {
    margin-left: 0.7rem;
  }

  .content1 {
    position: relative;
    margin-bottom: 0.88rem;
  }

  .content {
    height: 100%;
    position: relative;
  }

  .listbanner {
    width: 100%;
    margin: 0 auto;
    box-shadow: 0 0 5px #ebebeb;
  }

  .header {
    height: 0.7rem;
    position: fixed;
    top: 0;
    background: #fff;
    width: 100%;
    box-shadow: 0 0 0.05rem #ebebeb;
    z-index: 1;
    padding-top: 0.3rem;
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
    padding: 0 0.2rem;
  }

  .ld {
    width: 0.34rem;
    height: 0.7rem;
    float: right;
    background: url(../../images/fx.png) no-repeat 0 50%;
    background-size: 0.34rem 0.34rem;
  }

  .user {
    width: 0.30rem;
    height: 0.7rem;
    float: right;
    background: url(../../images/jb.png) no-repeat 0 50%;
    background-size: 0.30rem 0.32rem;
    margin-left: 0.31rem;
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
    padding-left: 0.2rem;
    border-bottom: 1px solid #ededed;
    overflow: hidden;
    padding-bottom: 0.2rem;
  }

  .top-t li {
    margin-top: 0.32rem;
  }

  .top-t .li1 {
    height: 0.26rem;
    float: left;
    margin-top: 0.34rem;
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
    padding-bottom:0.2rem;
  }

  .top-b li {
    float: left;
    height: 1.19rem;
    line-height: 1.19rem;
    font-size: 0.22rem;
    color: #999999;
  }

  .top-b .li1 {
    width: 0.66rem;
    height: 0.68rem;
    margin-top: 0.2rem;
    border-radius: 50%;
    /*overflow: hidden;*/
    /*position: relative;*/
  }

  .top-b .li1 img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /*position:absolute;*/
    /*top:50%;*/
    /*transform: translateY(-50%);*/
    border-radius: 50%;
    display: block;
  }

  .top-b .li2 {
    margin-left: 0.16rem;
    margin-right: 0.09rem;
  }

  .top-b .li3 {
    line-height: 0;
    height: 0;
    padding: 0.1rem 0.1rem;
    border-radius: 0.05rem;
    margin-right: 0.05rem;
    margin-top: 0.49rem;
    color: #fff;
    font-size: 0.2rem;
  }

  .top-b .li4 {
    float: right;
    line-height: 0;
    height: 0;
    margin-top: 0.4rem;
  }

  .top-b .li5 {
    font-size: 0.2rem;
    color: #adadad;
    margin-right: 0.2rem;
  }
  /*管理员*/

  .center0 {
    overflow: hidden;
  }

  .center-txt0 {
    padding: 0 0.2rem;
  }

  .center-txt0 .li1 {
    line-height: 0.3rem;
    font-size: 0.22rem;
    color: #adadad;
    margin: 0.18rem 0;
    word-wrap: break-word;
  }
  /*.center-txt0 .li1>>>img{*/
    /*width: 100% !important;*/
    /*height: 100% !important;*/
  /*}*/

  .center-txt0 .li2 {
    width: 6rem;
    height: 3.52rem;
  }

  .center-txt0 .li2 img {
    width: 6rem;
    height: 3.52rem;
    display: block;
  }

  .center-txt0 .li3 {
    height: 0.77rem;
    line-height: 0.77rem;
    float: right;
  }

  .center-txt0 span {
    height: 100%;
    display: block;
    float: left;
    margin-left: 0.3rem;
    font-size: 0.14rem;
    color: #adadad;
    width: 0.33rem;
    padding-left: 0.24rem;
  }

  .center-txt0 .sp1 {
    background: url(../../images/sc.png) no-repeat 0 50%;
    background-size: 0.23rem auto;
  }

  .center-txt0 .sp2 {
    background: url(../../images/zan1.png) no-repeat 0 50%;
    background-size: 0.23rem auto;
  }

  .center-txt0 .sp3 {
    background: url(../../images/sl.png) no-repeat 0 50%;
    background-size: 0.23rem auto;
  }

  .center-txt0 .sp4 {
    background: url(../../images/hf.png) no-repeat 0 50%;
    background-size: 0.23rem auto;
  }
  /*投票*/

  .center {
    overflow: hidden;
  }

  .center-txt {
    padding-left: 0.2rem;
  }

  .center-txt .li1 {
    line-height: 0.48rem;
    font-size: 0.24rem;
    color: #adadad;
    margin-top: 0.18rem;
    border-bottom: 1px solid #ededed;
  }

  .center-txt .pt {
    display: block;
    height: 0.47rem;
  }

  .center-txt .spt {
    font-size: 0.26rem;
    color: #1a1a1a;
    line-height: 0.27rem;
    border-left: 0.03rem solid #008dd3;
    padding-left: 0.12rem;
    margin-top: 0.3rem;
  ;
  }

  .center-txt .jdt {
    width: 5.6rem;
    margin: 0 auto;
    overflow: hidden;
    padding-left: .7rem;
  }

  .center-txt .jdt .jdt-all {
    overflow: hidden;
    margin-top: 0.32rem;
  }

  .center-txt .jdt-l {
    width: 4.1rem;
    height: 0.53rem;
    float: left;
  }

  .center-txt .jdt-l-t {
    width: 4.1rem;
  }

  .center-txt .jdt-l li {
    float: left;
  }

  .center-txt .jdt-l .j1 {
    font-size: 0.15rem;
    color: #3eadfc;
    width: 33.3%;
  }

  .center-txt .jdt-l .j2 {
    font-size: 0.22rem;
    color: #008dd3;
    width: 33.3%;
    text-align: center;
  }

  .center-txt .jdt-l .j3 {
    font-size: 0.15rem;
    color: #3eadfc;
    width: 33.3%;
    text-align: right;
  }

  .center-txt .jdt-l .j4 {
    width: 4.1rem;
    height: 0.2rem;
    background: #e2eef6;
    border-radius: 0.1rem;
  }

  .center-txt .jdt-l .j4-sp {
    max-width: 4.1rem;
    width: 0.28rem;
    height: 0.2rem;
    background: #54C2F0;
    border-radius: 0.1rem;
    margin: 0;
    padding: 0;
  }

  .center-txt .jdt-r {
    float: left;
    margin-left: 0.21rem;
    margin-top: 0.28rem;
  }

  .center-txt .jdt-r .jbt-btn {
    width: 1.06rem;
    height: 0.4rem;
    line-height: 0.4rem;
    border: 1px solid #e0e0e0;
    color: #3eadfc;
    font-size: 0.16rem;
    border-radius: 0.2rem;
    text-align: center;
    margin-top: 0.1rem;
    margin: 0 auto;
  }
  /*活动*/

  .center1 {
    overflow: hidden;
  }

  .center-txt1 {
    width: 6rem;
    margin: 0 auto;
    overflow: hidden;
  }

  .center-txt1 .li1 {
    line-height: 0.48rem;
    font-size: 0.24rem;
    color: #adadad;
    margin: 0.18rem 0;
    padding-left: 0.17rem;
  }

  .center-txt1 .li2 {
    width: 6rem;
    height: 3.52rem;
    padding-top: 0.31rem;
  }

  .center-txt1 .li2 img {
    width: 6rem;
    height: 3.52rem;
    display: block;
  }

  .center-txt1 .li3 {
    height: 0.77rem;
    line-height: 0.77rem;
    float: right;
  }

  .center-txt1 .li3 span {
    display: block;
    float: left;
    margin-left: 0.3rem;
    font-size: 0.14rem;
    color: #adadad;
    width: 0.33rem;
    padding-left: 0.24rem;
  }

  .center-txt1 .sp1 {
    background: url(../../images/sc.png) no-repeat 0 50%;
    background-size: 0.18rem 0.17rem;
  }

  .collect {
    background: url(../../images/sc.jpg) no-repeat 0 50%!important;
    background-size: 0.23rem auto!important;
  }

  .zan {
    background: url(../../images/zan1.jpg) no-repeat 0 50%!important;
    background-size: 0.23rem auto!important;
  }

  .center-txt1 .sp2 {
    background: url(../../images/zan1.png) no-repeat 0 50%;
    background-size: 0.23rem auto;
  }

  .center-txt1 .sp3 {
    background: url(../../images/sl.png) no-repeat 0 50%;
    background-size: 0.23rem auto;
  }

  .center-txt1 .sp4 {
    background: url(../../images/hf.png) no-repeat 0 50%;
    background-size: 0.23rem auto;
  }

  .center1 .bm1 {
    width: 6rem;
    margin: 0 auto;
  }

  .center1 .bm1 ul {
    font-size: 0.22rem;
    color: #575757;
    padding-left: 0.17rem;
  }

  .center1 .bm1 .ul1 {
    height: 0.42rem;
    line-height: 0.42rem;
    margin-top: 0.3rem;
  }

  .center1 .bm1 ul li {
    float: left;
  }

  .center1 .bm1 .ul1 .li2 {
    float: right;
  }

  .center1 .bm1 .ul1 .li2 span {
    width: 1.08rem;
    height: 0.4rem;
    font-size: 0.2rem;
    text-align: center;
    line-height: 0.4rem;
    color: #2595d3;
    border: 1px solid #72ccf0;
    display: block;
    border-radius: 0.2rem;
    float: left;
  }

  .center1 .bm1 .ul1 .li2 .sp2 {
    margin-left: 0.1rem;
  }

  .center1 .bm1 .ul2 {
    height: 0.44rem;
    line-height: 0.44rem;
    margin-bottom: 0.2rem;
  }

  .center1 .cj1 {
    height: 1.3rem;
    background: #f5f5f5;
    position: relative;
  }

  .center1 .btn1 {
    height: 0.72rem;
    line-height: 0.72rem;
    width: 2.48rem;
    background: #5ac3ee;
    font-size: 0.24rem;
    text-align: center;
    border-radius: 0.36rem;
    color: #fff;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translateY(-50%);
    transform: translateX(-50%);
  }

  .center-txt .li3 {
    height: 0.77rem;
    line-height: 0.77rem;
    float: right;
  }

  .center-txt span {
    display: block;
    float: left;
    margin-left: 0.3rem;
    font-size: 0.14rem;
    color: #adadad;
    width: 0.33rem;
    padding-left: 0.24rem;
  }

  .center-txt .sp1 {
    background: url(../../images/sc.png) no-repeat 0 50%;
    background-size: 0.23rem auto;
  }

  .center-txt .sp2 {
    background: url(../../images/zan1.png) no-repeat 0 50%;
    background-size: 0.23rem auto;
  }

  .center-txt .sp3 {
    background: url(../../images/sl.png) no-repeat 0 50%;
    background-size: 0.23rem auto;
  }

  .center-txt .sp4 {
    background: url(../../images/hf.png) no-repeat 0 50%;
    background-size: 0.23rem auto;
  }

  .list {
    /*padding-bottom: 1.08rem;*/
  }
  /*多选按钮*/

  .nav-right {
    width: 0.23rem;
    float: left;
    margin-top: 0.28rem;
    margin-right: 0.2rem;
  }

  .nav-right .li4 {
    width: 0.25rem;
    height: 0.25rem;
    float: right;
  }

  label {
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 50%;
    display: block;
  }

  input[type="checkbox"] {
    display: none;
    position: absolute;
  }

  input[type="checkbox"]+b {
    position: absolute;
    display: inline-block;
    width: 0.25rem;
    height: 0.25rem;
    border: 1px solid #ccc;
    border-radius: 50%;
    vertical-align: middle;
  }

  input[type="checkbox"]:checked+b {
    background: url(../../images/checkbox.png)no-repeat;
    background-size: cover;
    border: none;
  }
  /*多选*/
  input[type="radio"] {
    display: none;
    position: absolute;
  }

  input[type="radio"]+b {
    position: absolute;
    display: inline-block;
    width: 0.23rem;
    height: 0.22rem;
    border: 1px solid #ccc;
    border-radius: 50%;
    vertical-align: middle;
  }

  input[type="radio"]:checked+b {
    background: url(../../images/checkbox.png)no-repeat;
    background-size: cover;
    border: none;
  }
  /*邀请弹窗*/

  .yaoqing {
    width: 5.36rem;
    height: 4.52rem;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -2.045rem;
    margin-left: -2.62rem;
    z-index: 10;
    border-radius: 0.05rem;
    box-shadow: 0 0 0.2rem #b3dbef;
    display: none;
  }

  .yaoqing .sp1 {
    height: 0.84rem;
    line-height: 0.84rem;
    color: #242424;
    font-size: 0.28rem;
    display: block;
    text-align: center;
  }

  .yaoqing-t {
    border-bottom: 1px solid #ebebeb;
  }

  .yaoqing-b {
    width: 4rem;
    margin: 0 auto;
    height: 2.5rem;
    overflow: auto;
  }

  .yaoqing-list {
    width: 4rem;
    border-bottom: 1px solid #ebebeb;
    overflow: hidden;
  }

  .yaoqing-b p {
    font-size: 0.22rem;
    color: #c7c7c7;
    line-height: 0.79rem;
    float: left;
    padding-left: 0.19rem;
  }

  .yaoqing-right {
    width: 0.3rem;
    height: 0.79rem;
    float: right;
    padding-right: 0.2rem;
  }

  .yaoqing-right .li4 {
    width: 0.3rem;
    height: 0.79rem;
    float: right;
    position: relative;
  }

  .yaoqing label {
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 50%;
    display: block;
    position: relative;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
  }

  .yaoqing input[type="checkbox"] {
    display: none;
    position: absolute;
  }

  .yaoqing input[type="checkbox"]+b {
    background: url(../../images/xzw.png)no-repeat;
    background-size: cover;
    border: none;
    position: absolute;
    display: inline-block;
    width: 0.3rem;
    height: 0.3rem;

    border-radius: 50%;
    vertical-align: middle;
  }

  .yaoqing input[type="checkbox"]:checked+b {
    background: url(../../images/xzb.png)no-repeat;
    background-size: cover;
    border: none;
  }

  .yaoqing-f {
    width: 100%;
    height: 1.17rem;
    background: #f6f6f6;
    font-size: 0.22rem;
    color: #fff;
    position: relative;
  }

  .yaoqing-f p {
    width: 2.1rem;
    height: 0.56rem;
    background: #008dd3;
    border-radius: 0.28rem;
    margin: 0 auto;
    text-align: center;
    line-height: 0.56rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }
  /*管理员*/

  .footer {
    width: 100%;
    height: 0.88rem;
    background: #f6f6f6;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100;
  }

  .form {
    padding-top: 0.17rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    display: flex;
  }

  .footer input {
    display: block;
  }

  .footer .text {
    height: 0.52rem;
    width: 1.82rem;
    border: 1px solid #e0e0e0;
    border-radius: 0.05rem;
    float: left;
    flex: 1;
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
    width: 1.37rem;
  }

  .footer input[type=button] {
    float: left;
    width: 0.4rem;
    height: 0.52rem;
    background: url(../../images/fasong.png) no-repeat 0 50%;
    background-size: 0.4rem 0.37rem;
    margin-left: 0.19rem;
  }

  input::-webkit-input-placeholder {
    color: #8f8f8f;
    font-size: 0.16rem;
  }

  .footer .button {
    float: right;
  }

  .footer dl {
    float: left;
    height: 0.5rem;
    margin-left: 0.3rem;
  }

  .footer dl dt img {
    display: block;
    margin: 0 auto;
  }

  .footer .dl1 img {
    width: 0.19rem;
    height: 0.24rem;
  }

  .footer .dl2 img {
    width: 0.24rem;
    height: 0.24rem;
  }

  .footer .dl3 img {
    width: 0.22rem;
    height: 0.23rem;
    margin-bottom: 0.02rem;
  }

  .footer .dl4 img {
    width: 0.24rem;
    height: 0.2rem;
    margin-bottom: 0.04rem;
  }

  .footer .dl5 img {
    width: 0.24;
    height: 0.24rem;
  }

  .footer .dl6 img {
    width: 0.22rem;
    height: 0.22rem;
    margin-bottom: 0.03rem;
  }

  .footer dl dd {
    font-size: 0.18rem;
    height: 0.18rem;
    color: #8f8f8f;
  }
  /*普通*/

  .footer2 {
    width: 100%;
    height: 0.88rem;
    background: #f6f6f6;
    position: fixed;
    left: 0;
    bottom: 0;
  }

  .form2 {
    width: 6rem;
    margin: 0 auto;
    padding-top: 0.17rem;
  }

  .footer2 input {
    display: block;
  }

  .footer2 .text {
    float: left;
    height: 0.52rem;
    width: 5.38rem;
    border: 1px solid #e0e0e0;
    border-radius: 0.05rem;
    float: left;
  }

  .footer2 .text span {
    margin: 0 0.1rem 0 0.11rem;
    width: 0.24rem;
    height: 0.52rem;
    background: url(../../images/fatie.png) no-repeat 0 50%;
    background-size: 0.24rem 0.24rem;
    display: block;
    float: left;
  }

  .footer2 input[type=text] {
    height: 0.52rem;
    width: 4.93rem;
  }
  /*删帖*/

  .up {
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

  .up-all {
    width: 4.6rem;
    height: 100%;
    margin: 0 auto;
  }

  .up-all p {
    color: #292929;
    font-size: 0.24rem;
    line-height: 0.66rem;
    height: 0.56rem;
    padding-top: 0.1rem;
  }

  .up-all .sp1 {
    color: #008dd3;
  }

  .up-all textarea {
    width: 4.58rem;
    height: 1.88rem;
    resize: none;
    outline: none;
    border: 1px solid #e0e0e0;
    border-radius: 0.05rem;
  }

  .up-all ul {
    width: 4.4rem;
    height: 0.56rem;
    margin: 0 auto;
    margin-top: 0.35rem;
    margin-bottom: 0.35rem;
  }

  .up-all ul li {
    width: 2.08rem;
    height: 0.54rem;
    float: left;
    border-radius: 0.28rem;
    border: 1px solid #008dd3;
  }

  .up-all ul li a {
    width: 2.08rem;
    height: 0.54rem;
    line-height: 0.54rem;
    color: #008dd3;
    font-size: 0.22rem;
    display: block;
    text-align: center;
    border-radius: 0.28rem;
  }

  .up-all ul li a:hover {
    color: #fff;
    background: #008dd3;
  }

  .up-all .li2 {
    float: right;
  }

  .jubao {
    width: 5.36rem;
    height: 3.8rem;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -1.9rem;
    margin-left: -2.68rem;
    z-index: 10;
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

  .mark {
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 5;
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
    /*pointer-events: none;*/
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
    border-left: 1px solid #c7c7c7;
    border-top-left-radius: 0.05rem;
    border-bottom-left-radius: 0.05rem;
  }

  .pf .list1 {
    position: relative;
  }

  .pf ol {
    height: 1rem;
    overflow-y: auto;
    width: 4.84rem;
    color: #8f8f8f;
    font-size: 0.18rem;
    position: absolute;
    top: 0.46rem;
    left: 1px;
    background: #fff;
    border: 1px solid #c7c7c7;
  }

  .ftall {
    width: 100%;
    background: #fff;
    position: fixed;
    /*left: 0;*/
    bottom: 0;
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
    border-bottom: 1px solid #c7c7c7;
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
    background: url(../../images/video.png) no-repeat 0 50%;
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
  /*分享弹窗*/

  .fenxiang {
    width: 5.4rem;
    height: 6.86rem;
    background: url(../../images/fenxiang.png) no-repeat;
    background-size: cover;
    overflow: hidden;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 44;
    border-radius: 0.1rem;
  }
  .fenxiang ul{
    position: fixed;
    bottom: 0.3rem;
    width: 100%;
  }
  .fenxiang li {

    float: left;
    width: 25%;
  }

  .fenxiang img {
    display: block;
    width: 0.44rem;
    height: 0.44rem;
    margin: 0 auto;
  }

  .list-top {
    height: 0.77rem;
    border-bottom: 1px solid #ebebeb;
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
    font-size: 0.26rem;
    color: #1a1a1a;
    line-height: 0.27rem;
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

  .list-bottom p {
    width: .85rem;
    height: .85rem;
    /*position:relative;*/
    /*overflow: hidden;*/
    border-radius: 50%;
    float: left;
  }

  .list-bottom p img {
    width:100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    /*position: absolute;*/
    /*top:50%;*/
    /*transform: translateY(-50%);*/
  }

  .list-bottom-t {
    padding-left: 0.2rem;
    margin-top: .2rem;
    overflow: hidden;
    /*border-bottom: 1px solid #E0E0E0;*/
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
    margin: 0 0 0 0.13rem;
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
    width: 0.44rem;
    height: 0.48rem;
    /*background:url(../../images/VIP.png) no-repeat 0 50%;background-size:0.44rem 0.26rem;*/
    margin-left: 0.1rem;
    color: #fff;
  }

  .list-bottom-t .sp6 img {
    height: 0.35rem;
    width: auto;
    margin-top: 0.08rem;
  }

  .list-bottom-t .sp6 font {
    font-size: 0.24rem;
    width: 0.44rem;
    height: 0.26rem;
    background: red;
    display: block;
    line-height: 0.27rem;
    text-align: center;
    margin-top: 0.13rem;
    border-radius: 2px;
  }

  .list-bottom-t .sp7 {
    line-height: 0.48rem;
    font-size: 0.24rem;
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
    font-size: 0.22rem;
    margin-right: 0.2rem;
    padding: 0.15rem 0;
  }

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
    padding-top: 0.29rem;
    width: calc(100% - 1rem);
    border-top: 1px solid #ebebeb;
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
  }

  .list-bottom-t2 .sp1 {
    font-size: 0.22rem;
    color: #adadad;
  }

  .list-bottom-t2 p {
    width: .85rem;
    height: .85rem;
    /*position: relative;*/
    /*overflow: hidden;*/
    border-radius: 50%;
    float: left;
  }

  .list-bottom-t2 img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    /*position: absolute;*/
    /*top: 50%;*/
    /*-webkit-transform: translateY(-50%);*/
    /*transform: translateY(-50%);*/
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
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
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
  }

  .form {
    width: 6rem;
    margin: 0 auto;
    padding-top: 0.17rem;
  }

  .footer input {
    display: block;
  }

  .footer .text {
    height: 0.52rem;
    border: 1px solid #e0e0e0;
    border-radius: 0.05rem;
    float: left;
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
    width: 5rem;
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
    z-index: 10;
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

  .ftall {
    width: 100%;
    background: #fff;
    position: fixed;
    /*left: 0;*/
    bottom: 0;
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
    border-bottom: 1px solid #c7c7c7;
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
    width: 6rem;
    margin: 0 auto;
    overflow: hidden;
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
    background: url(../../images/video.png) no-repeat 0 50%;
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
    border-left: 1px solid #c7c7c7;
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

  #reply {
    width: 100%;
    height: 2.5rem;
    font-size: .22rem;
    font-weight: normal;
    overflow: auto;
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

  .p1 {
    display: block;
    width: 0.26rem;
    height: 0.26rem;
    float: left;
    font-size: 0.22rem;
    text-align: center;
    line-height: 0.26rem;
    color: #fff;
    margin-right: 0.1rem;
  }

  .p2 {
    background: url(../../images/jing.png)no-repeat;
    background-size: cover;
  }

  .p3 {
    background: url(../../images/z.png)no-repeat;
    background-size: cover;
  }

  .p4 {
    background: url(../../images/t.png)no-repeat;
    background-size: cover;
  }
  /*高亮颜色*/

  .col span {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    display: block;
    float: left;
    margin: 0.2rem;
  }

  .att {
    border: 1px solid #000;
    border-radius: 50%;
  }

  .col .col1 {
    background: #008DD3;
  }

  .col .col2 {
    background: #F29112;
  }

  .col .col3 {
    background: #00FF00;
  }
  .list-bottom-t .li2 >>> p img{width: calc(100% - 1rem)!important;height: auto!important;}
</style>
