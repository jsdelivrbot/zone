<template>
	<div class="wrapper">
    <div class="header">
      <div class="headerall">
        <a href="javascript:history.back(-1);" class="a1"></a>
        <span class="forget">{{data.wo_title}}</span>
        <a class="a2" @click="toggle()" v-if="data.wo_status < 3"></a>
      </div>
    </div>
    <div v-if="isshowc">
      <div class="footer" v-if="data.wo_status == 1">
        <div class="footer-all">
          <div class="txt">
            <input type="text" placeholder="回复答疑" readonly="readonly" onfocus='this.blur();' @click="editor()" />
          </div>
        </div>
      </div>
    </div>
    <!--<div class="mark" v-show="show"></div>-->
    <div v-if="data.wo_status < 2">
      <mt-popup v-model="show" position="bottom" class="up">
      <!--<div class="up" v-show="show">-->
        <div class="up-b">
          <div class="up1">
            <div class="up-l" @click="toggle()">取消</div>
            <div class="up-r" @click="toggle1()">关闭答疑</div>
          </div>
        </div>
      <!--</div>-->
      </mt-popup>
    </div>
    <div v-if="data.wo_status == 2">
      <mt-popup v-model="show" position="bottom" class="up">
      <!--<div class="up" v-show="show">-->
        <div class="up-b">
          <div class="up1">
            <div class="up-l w33 mr2" @click="toggle()">取消</div>
            <div class="up-r w33 mr2" @click="opbtn('reply')">继续回复</div>
            <div class="up-r w33 " @click="toggle1()">关闭答疑</div>
          </div>
        </div>
      <!--</div>-->
      </mt-popup>
    </div>
    <mt-popup v-model="isshow" position="bottom" class="up-bottom">
    <!--<div class="up-bottom" v-show="isshow">-->
      <div class="up-all">
        <ul>
          <li class="li1"><a class="a1" @click="toggle();toggle1()">取消</a></li>
          <li class="li2"><a class="a2" @click="opbtn('close')">关闭答疑</a></li>
        </ul>
      </div>
    <!--</div>-->
    </mt-popup>
		<div class="first"  v-show="isshowc" v-bind:class="{isFooter:data.wo_status == 1}">
			<div :class="'nav' + (data.wo_status == 1 ? ' pb1' : '')" style="padding-top:0.3rem;height: calc(100% - 1.96rem);position: relative;bottom: 0;">
				<div class="nav-all">
					<div class="nav-n" v-for="(list, key) in reply">
						<div class="nav-l">
							<img :src="list.face" />
						</div>
						<div class="nav-r">
							<ul>
								<li class="li1">{{list.uname}}</li>
								<li class="li2" v-html="list.content">问题描述：{{list.content}}</li>
                <li class="li2" v-if="key==0" v-for="(data,index) in data.imgs" :key="index"><img :src="data" alt=""></li>
								<li class="li3">{{list.dateline}}</li>
							</ul>
						</div>
					</div>

					<div class="nav-n" v-if="comment">
						<div class="nav-l">
							<img :src="comment.face"/>
						</div>
						<div class="nav-r">
							<ul>
								<li class="li1">我</li>
								<li class="li2">整体评价：<font v-if="comment.rank > 3">满意</font><font v-if="comment.rank > 1 && comment.rank < 4">一般</font><font v-if="comment.rank < 2">不满意</font></li>
								<li class="li2" v-if="comment.tags">评价印象：{{comment.tags}}</li>
								<li class="li2">是否解决：<font v-if="comment.is_jiej">解决</font></li>
								<li class="li2">评价内容：{{comment.content}}</li>
								<li class="li3">{{comment.dateline}}</li>
							</ul>
						</div>
					</div>
					<div class="nav-bottom dpj" v-if="data.wo_status == 3">
						<div class="b-l"><img src="../../images/daipingjia.png"/></div>
						<div class="b-r" v-if="credit">请你对本次服务进行评价，评价后您可获得<span v-for="(jf, key) in credit">{{jf}}{{key}} </span></div>
						<div class="b-r" v-else>请你对本次服务进行评价。</div>
					</div>
					<div class="nav-bottom" v-if="comment">
						<div class="b-l"><img src="../../images/yiwancheng.png"/></div>
						<div class="b-r">评价已完成</div>
					</div>
				</div>


				<div class="nav-footer" v-if="data.wo_status == 3">
					<router-link :to="'/appraise?id='+data.wo_id">
					<div class="nav-ft">点击去评价</div>
					</router-link>
				</div>
			</div>
		</div>
		<editor :title="data.wo_title" :id="data.wo_id" v-show="isshowe" v-on:message="recieveMessage"></editor>
		<div class="load" style="display:none;">
			<div class="load-container load4"><div class="loader"> <i></i></div></div>
		</div>
		<pop style="text-align: center" class="tips" v-show="istip" :title="tipmsg"></pop>
	</div>
</template>
<script>
import qs from 'qs'
import {setCookie,getCookie} from '../../assets/js/cookie.js'
import {getOpenUrl,getToken} from '../../assets/js/common.js'
import editor from './editor.vue'
export default {
	components: {
		editor
	},
	data () {
		return {
			show:false,
			isshow:false,
			isshowc: true,
			isshowe: false,
			isnew: false,
			data: {},
			reply: {},
			comment: '',
			credit:'',
			istip: false,
			tipmsg: ''
		};
	},
	mounted(){

    setTimeout(()=>{
      this.$root.eventHub.$emit('newsSuccess');
    },500)

    //回复答疑成功
    this.$root.eventHub.$on('submitSuccess',()=>{
      setTimeout(()=>{
        $('.first').animate({
          scrollTop: $('.first')[0].scrollHeight
        }, 'fast');
      },500);
    });

		var id = this.$route.query.id;
		$('.load').show();
		this.getData(id);
	},
	methods: {
		getData: function(id){
			this.$http.get(getOpenUrl() + "workListshow", {
				headers:{
					'Authorization' : 'Bearer '+getToken()
				},
				params:{wo_id: id}
			}).then((res)=>{
				if (res.body.code == '0000'){
					this.data = res.body.data.list
					this.reply = res.body.data.res
					this.comment = res.body.data.comen
					this.credit  = res.body.data.credit;
					$('.load').hide();
				}else{
					this.tipmsg = res.body.error_description;
					this.istip  = true;
					setTimeout(()=>{
						$('.tips').hide();
						this.istip  = false;
					},1000)
				}
				$('.load').hide();

        android.hideTabs();
			})
		},
		opbtn(type){
			//操作按钮
			switch (type){
				case 'close':
					//关闭
					this.$http.post(getOpenUrl() + "workGuanmsg", {wo_id: this.data.wo_id}, {
						headers:{
							'Authorization' : 'Bearer '+getToken()
						}
					}).then((res)=>{
						if (res.body.code == '0000'){
							this.getData(this.data.wo_id);
							this.show=!this.show;
							this.isshow=!this.isshow;
						}else{
							this.tipmsg = res.body.error_description;
							this.istip  = true;
							setTimeout(()=>{
								$('.tips').hide();
								this.istip  = false;
							},1000)
						}
					})
					break;
				case 'reply':
					//回复
					this.$http.post(getOpenUrl() + "workJixuhuifu", {wo_id: this.data.wo_id}, {
						headers:{
							'Authorization' : 'Bearer '+getToken()
						}
					}).then((res)=>{
						if (res.body.code == '0000'){
							this.getData(this.data.wo_id);
							this.show = !this.show
						}else{
							this.tipmsg = res.body.error_description;
							this.istip  = true;
							setTimeout(()=>{
								$('.tips').hide();
								this.istip  = false;
							},1000)
						}
					});
					break;
			}
		},
		editor(){
			let isLogin = getCookie('islogin');
			isLogin = parseInt(isLogin);
			if(isLogin==0){
				this.$router.push('/login');
			}
			this.isshowc = false;
			this.isshowe = true;

      this.$root.eventHub.$emit('editDianji');
		},
		recieveMessage(data){
			this.isshowc = data.isshowc;
			this.isshowe = data.isshowe;
			if (data.isnew){
				this.getData(this.$route.query.id);
			}
		},
		toggle(){
			this.show=!this.show
		},
		toggle1(){
			this.isshow=!this.isshow
		}
	},
  activated(){
    android.hideTabs();
  },
	beforeRouteLeave (to, from, next) {
		//路由离开时
		var isInputKey = parseInt(getCookie('inputkey'));
		if (isInputKey == 1){
			setCookie("inputkey", '', -1);
			this.toggle1();
			this.toggle3();
			next(false)
		}else{
			next()
		}
	}
}
</script>
<style scoped>
  .first{
    height:100%;overflow-y:auto;position: relative;
  }
  .first.isFooter{
    height:calc(100% - 1.66rem);overflow-y:auto;position: relative;
  }
.wrapper{height: calc(100% - .7rem);padding-top: .7rem;}
.header{position: fixed;top: 0;height: 0.7rem;box-shadow:0 0 5px #ebebeb;width: 100%;background: #fff;z-index: 1;padding-top: 0.3rem;}
.headerall{padding: 0 0.2rem;}
.header .a1{width: 0.18rem;height: 0.7rem;display: block;background: url(../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
.header .a2{width: 0.32rem;height: 0.7rem;display: block;background: url(../../images/dian3.png) no-repeat 0 50%;background-size: 0.32rem 0.06rem;float:right;}
.forget{overflow: hidden;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 4rem;line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}

/*.nav{position: absolute;top: 0.7rem;width: 100%;}*/
.pb1{padding-bottom:1.66rem;}
.nav-all{width: 6rem;margin:0 auto;overflow: hidden;}
.nav-n{margin-top: 0.27rem;display: flex;}
.nav-l{width: 0.68rem;height: 0.68rem;
  /*position: relative;overflow: hidden;*/
  border-radius: 50%;
  float: left;}
.nav-l img{width:100%;height:100%;border-radius:50%;object-fit:cover;margin: 0 auto;display: block;
  /*position: absolute;top:50%;transform:translateY(-50%);*/
}
.nav-r{float: left;overflow: hidden;flex: 1;margin-left: 0.13rem;border-bottom: 0.01rem solid #ebebeb;}
.nav-r li{float: left;width:100%}
.nav-r .li1{font-size:0.22rem;line-height: 0.33rem;}
.nav-r .li2{width:5rem;font-size:0.2rem;line-height: 0.36rem;margin-top: 0.04rem;color: #242424;}
.nav-r .li2 img{width:100%;}
.nav-r .li3{font-size:0.2rem;line-height: 0.4rem;background: url(../../images/fbsj.png)no-repeat 0 50%;background-size: 0.23rem auto;padding-left: 0.29rem;margin-bottom:.2rem}

.nav-bottom{line-height: 1.04rem; color: #54c2f0;font-size:0.2rem;display: flex;}
.nav-bottom .b-l{float: left;width: 0.6rem;height: 0.6rem;margin: 0.21rem 0.26rem 0 0.22rem;}
.nav-bottom .b-l img{float: left;width: 0.6rem;display: block;}
.nav-bottom .b-r{float: left;flex: 1;}
.nav-bottom.dpj{margin-bottom:0.31rem;}
.nav-bottom.dpj .b-r{line-height:0.36rem;margin-top:0.21rem;}

.footer{position: fixed;bottom:0;height:1.66rem;width:100%;background:#f5f5f5;z-index:999;left:0;}
.footer-all{width:5.78rem;height:0.8rem;margin:0 auto;border:1px solid #e0e0e0;border-radius:0.4rem;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background-color: #fff;}
input{display:block;}
.txt{width:5.4rem;height:0.8rem;background:url(../../images/tianxie.png) no-repeat 0 50%;background-size:0.35rem 0.31rem;float:right;}
.txt input{width:4.82rem;line-height:0.8rem;padding-left:0.58rem;}

.up,.up-b{overflow: hidden;}
.up1{width: 5.8rem;margin: 0 auto;position:absolute;top: 50%;left:50%;transform: translate(-50%,-50%);}
.up{width: 100%;height: 1.65rem;border-top: 0.01rem solid #ebebeb;background: #fff;position: fixed;bottom: 0;z-index:999;}
.up-l{float: left;width: 2.78rem;height: 0.8rem;font-size: 0.27rem;border: 1px solid #008dd3;border-radius: 0.4rem;color: #008dd3;text-align: center;line-height: 0.8rem;}
.up-r{float: right;width:2.8rem;height:0.82rem;font-size: 0.27rem;background:#008dd3;border-radius: 0.4rem;color: #fff;text-align: center;line-height: 0.82rem;}
.mark{width:100%;height:100%;position:fixed;bottom:0;left:0;background:rgba(36,153,200,0.3);display:block;z-index:5;}
.w33{width:30%; float:left;}
.mr2{margin-right:4%}

.up-bottom{width:5.36rem;height:3.8rem;background:url(../../images/yiwen.png)no-repeat;background-size:cover;position:fixed;top:50%;left:50%;margin-top:-2.045rem;margin-left:-2.62rem;z-index:10;border-radius:0.05rem;}
.up-all{width:4.6rem;height:100%;margin:0 auto;}

.up-all ul{width:4.4rem;height:0.56rem;margin:0 auto;position: absolute;bottom: 0.35rem;left: 50%;transform: translateX(-50%);}
.up-all ul li{width:2.08rem;height:0.54rem;float:left;border-radius:0.28rem;border: 1px solid #008dd3;}
.up-all ul li .a1{width:2.08rem;height:0.54rem;line-height:0.54rem;color:#008dd3;font-size:0.22rem;display:block;text-align:center;border-radius:0.28rem;}
.up-all ul li .a2{width:2.08rem;height:0.54rem;line-height:0.54rem;color:#fff;background:#008dd3;font-size:0.22rem;display:block;text-align:center;border-radius:0.28rem;}
.up-all .li2{float:right;}

.nav-footer{position:relative;height: 1.46rem;width: 100%;border-top:0.2rem solid #ebebeb;background: #fff;}
.nav-ft{width: 3.6rem;height: 0.82rem;border-radius:0.41rem;text-align: center;line-height: 0.82rem;font-size: 0.26rem;color: #fff;background: #54c2f0;position: absolute;top: 50%;left:50%;transform: translate(-50%,-50%);}
</style>
