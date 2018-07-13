<template>
	<div class="setting">
		<div class="setting1">
			<div class="setting-all">
				<a href="javascript:history.back(-1);" class="a1"></a>
				<span class="forget">帖子分类</span>
				<a class="a2" @click="toggle(1);">添加</a>
			</div>
		</div>
		<div class="srall">
			<div class="sr" v-for="(list,index) in menData" :key="index">
				<ul class="sr-ul">
					<li class="sr-ul-li1">
						<div class="sr-ul-li1-t">
							<p class="t-p1">{{list.title}}</p>
						</div>
						<div class="sr-ul-li1-b">
							<p class="b-p1" @click="toggle1(2,list.id,list.title);">修改</p>
							<p class="b-p2" @click="toggle2(3,list.id);">删除</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="mark" v-show="mark"></div>
		<div class="up" v-show="show">
			<div class="up-all">
				<p class="up-p">添加类别</p>
				<div class="up-div">
					<span class="sp1">类别名称：</span><input type="text" v-model="name" />
				</div>
				<ul>
					<li class="li1">
						<a @click="toggle()">取消</a>
					</li>
					<li class="li2">
						<a @click="change()">确定</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="up" v-show="isshow">
			<div class="up-all">
				<p class="up-p">修改类别</p>
				<div class="up-div">
					<span class="sp1">类别名称：</span><input type="text" v-model="name" />
				</div>
				<ul>
					<li class="li1">
						<a @click="toggle1()">取消</a>
					</li>
					<li class="li2">
						<a @click="change()">确定</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="up1" v-show="toshow">
			<div class="up-all1">
				<ul>
					<li class="li1">
						<a @click="toggle2()">取消</a>
					</li>
					<li class="li2">
						<a @click="change()">确定</a>
					</li>
				</ul>
			</div>
		</div>
		<pop class="tip" :title="tip"></pop>
	</div>
</template>

<script>
	import { getOpenUrl, getToken } from "../../../assets/js/common.js"
	import { setCookie, getCookie } from '../../../assets/js/cookie.js'
	export default {
		data() {
			return {
				tip: '',
				show: false,
				isshow: false,
				toshow: false,
				listData: {},
				menData:{},
				id: '',
				type: '',
				title: '',
				name: '',
				mark: false
			}
		},
		mounted() {
			$('.tip').hide();
			this.mem();
		},
		methods: {
			mem() {
				this.$http.get(getOpenUrl() + "topicCate", {

					params: {
						gid: this.$route.query.gid
					},
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					this.menData = res.body.data
				});
			},
			toggle(type) {
				this.type = type;
				this.show = !this.show;
				this.mark = !this.mark;
			},
			toggle1(type, id, name) {
				this.name = name;
				this.type = type;
				this.id = id;
				this.isshow = !this.isshow;
				this.mark = !this.mark;
			},
			toggle2(type, id) {
				this.type = type;
				this.id = id;
				this.toshow = !this.toshow;
				this.mark = !this.mark;
			},
			change() {
				this.$http.post(getOpenUrl() + "topicCateSet", {
					gid: this.$route.query.gid,
					cid: this.id,
					type: this.type,
					catename: this.name
				}, {
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					if(res.body.code == 0) {
						this.$root.eventHub.$emit('submitSuccess')
						this.listData = res.body.data;
						this.mem();
						this.isshow = false;
						this.toshow = false;
						this.show = false;
						this.mark = false;
					} else {
						this.tip = res.body.error_description;
						$('.tip').show();
						setTimeout(function() {
							$('.tip').hide();
						}, 1000)
					}
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.setting1 {
		height: 0.7rem;
		position: relative;
		box-shadow: 0 0 5px #ebebeb;
		background: #fff;
		z-index: 3;
    padding-top: 0.3rem;
	}

	.setting-all {
		padding: 0 0.2rem;
		overflow: hidden;
	}

	.setting .a1 {
		width: 0.18rem;
		height: 0.7rem;
		background: url(../../../images/back.png) no-repeat 0 50%;
		background-size: 0.18rem 0.34rem;
		float: left;
		display: block;
	}

	.setting .a2 {
		width: 0.73rem;
		height: 0.42rem;
		color: #008dd3;
		line-height: 0.42rem;
		text-align: center;
		color: #008dd3;
		font-size: 0.2rem;
		border: 1px solid #008dd3;
		border-radius: 0.05rem;
		float: right;
		display: block;
		margin-top: 0.1rem;
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

	.sr {
		height: 1.14rem;
		padding: 0 0.2rem;
		border-bottom: 1px solid #ebebeb;
	}

	.sr-ul {
		overflow: hidden;
		width: 100%;
	}

	.sr-ul-li1 {
		width: 100%;
		display: flex;
	}

	.sr-ul-li1-t {
		float: left;
		flex: 1;
	}

	.sr-ul-li1-b {
		float: right;
	}

	.sr-ul-li1 .t-p1 {
		font-size: 0.22rem;
		color: #1a1a1a;
		line-height: 1.14rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.sr-ul-li1-b p {
		width: 0.98rem;
		height: 0.52rem;
		font-size: 0.2rem;
		border-radius: 0.26rem;
		float: left;
		line-height: 0.52rem;
		text-align: center;
		margin-top: 0.3rem;
	}

	.sr-ul-li1-b .b-p1 {
		background: #54c2f0;
		border: 1px solid #54c2f0;
		color: #d4f0fb;
	}

	.sr-ul-li1-b .b-p2 {
		color: #c7c7c7;
		border: 1px solid #c7c7c7;
		margin-left: 0.14rem;
	}

	.up {
		width: 6.4rem;
		height: 4.9rem;
		background: url(../../../images/tanchu.png) no-repeat;
		background-size: cover;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -2.45rem;
		margin-left: -3.2rem;
		z-index: 10;
		border-radius: 0.05rem;
		display: block;
	}

	.up-all {
		height: 100%;
		margin: 0 auto;
	}

	.up-all ul {
		width: 4.4rem;
		height: 0.56rem;
		margin: 0 auto;
		position: absolute;
		bottom: 1rem;
		left: 50%;
		margin-left: -2.2rem;
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

	.up-p {
		height: 0.94rem;
		margin-top: 0.7rem;
		font-size: 0.26rem;
		color: #fff;
		text-align: center;
		line-height: 0.94rem;
	}

	.up-div {
		width: 3.18rem;
		height: 0.46rem;
		background: rgba(255, 255, 255, 0.3);
		margin: 0 auto;
	}

	.up-div span {
		color: #fff;
		font-size: 0.2rem;
		line-height: 0.46rem;
		display: block;
		float: left;
	}

	.up-div .sp1 {
		padding-left: 0.09rem;
	}

	.up-div input {
		display: block;
		float: left;
		width: 1.8rem;
		height: 100%;
		color: #fff;
	}

	.up1 {
		width: 6.4rem;
		height: 4.9rem;
		background: url(../../../images/delete.png) no-repeat;
		background-size: cover;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -2.45rem;
		margin-left: -3.2rem;
		z-index: 10;
		border-radius: 0.05rem;
		display: block;
	}

	.up-all1 {
		height: 100%;
		margin: 0 auto;
	}

	.up-all1 ul {
		width: 4.4rem;
		height: 0.56rem;
		margin: 0 auto;
		position: absolute;
		bottom: 1rem;
		left: 50%;
		margin-left: -2.2rem;
	}

	.up-all1 ul li {
		width: 2.08rem;
		height: 0.54rem;
		float: left;
		border-radius: 0.28rem;
		border: 1px solid #008dd3;
	}

	.up-all1 ul li a {
		width: 2.08rem;
		height: 0.54rem;
		line-height: 0.54rem;
		color: #008dd3;
		font-size: 0.22rem;
		display: block;
		text-align: center;
		border-radius: 0.28rem;
	}

	.up-all1 ul li a:hover {
		color: #fff;
		background: #008dd3;
	}

	.up-all1 .li2 {
		float: right;
	}

	.mark {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.3);
		z-index: 5;
	}
</style>
