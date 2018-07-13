<template>
	<div class="report">
		<my-header title="举报"></my-header>
		<div style="height: calc(100% - 1rem);position: relative;bottom: 0;padding-top: 1rem;overflow:auto;">
		<div class="top">
			<div class="top1">举报内容</div>
			<div class="con">
				<div class="con-left">
					<img :src="data.face" />
				</div>
				<ul>
					<li class="li1">{{data.uname}}</li>
					<li class="li2">{{data.title}}</li>
				</ul>
			</div>
		</div>
		<div class="line"></div>
		<div class="bottom">
			<div class="top1">举报类型</div>
			<div class="navall">
				<div class="nav" v-for="(type, index) in data.report">
					<ul class="nav-left">
						<li class="li4">
							<label>
								<input type="radio" name="type" :value="type" ref="type"><b></b>
							</label>
						</li>
					</ul>
					<ul class="nav-right" :style="data.report.length == index + 1 ? 'border-bottom:none;' : ''">
						<li class="li1">{{type}}</li>
					</ul>
				</div>
			</div>
			<div class="up">
				<div class="up-all">
					<p><span class="sp1">补充说明(必填)</span></p>
					<textarea name="note" ref="note"></textarea>
					<ul>
						<li class="li1" @click="submit"><a>提交</a></li>
					</ul>
				</div>
			</div>
		</div>
		</div>
		<pop class="tip" :title="tip"></pop>
    <load v-show="isload"></load>
	</div>
</template>

<script>
import qs from 'qs'
import {setCookie,getCookie} from '../../assets/js/cookie.js'
import {getOpenUrl,getToken} from '../../assets/js/common.js'
export default {
	name:'content',
	data (){
		return {
		  isload:false,
			data: '',
			type: '',
			tip:''
		};
	},
	methods: {
		getData(type, id){
			//获取举报数据
			this.$http.get(getOpenUrl() + "report", {
				headers:{
					'Authorization' : 'Bearer '+getToken()
				},
				params: {
					type: type,
					did: id
				}
			}).then((res)=>{
				if (res.body.code == '0000'){
					this.data = res.body.data
					this.type = res.body.type
				}else{
					this.tip = res.body.error_description;
					$('.tip').show();
					setTimeout(function() {
						$('.tip').hide();
					}, 1000)
				}
				$('.load').hide();
			});
		},

		submit(){
			//提交举报
			var type = $('input[name="type"]:checked').val();
			if (!type){
				this.tip = "请选择举报类型";
				$('.tip').show();
				setTimeout(function() {
					$('.tip').hide();
				}, 1000)
				return;
			}

			var note = this.$refs.note.value;
			if (!note){
				this.tip = "请填写举报信息";
				$('.tip').show();
				setTimeout(function() {
					$('.tip').hide();
				}, 1000)
				return;
			}
      clearTimeout(this.fn);
      this.fn = setTimeout( ()=> {
        this.isload = true;
        this.$http.post(getOpenUrl() + "reportDo", {
          tid: this.$route.query.id,
          type: this.type,
          uid: this.data.uid,
          jubao: type,
          reason: note,
          content: this.data.title
        }, {
          headers: {
            'Authorization': 'Bearer ' + getToken()
          }
        }).then((res) => {
          this.isload = false;
          if (res.body.code == '0000') {
            this.tip = "举报成功";
            $('.tip').show();
            setTimeout(() => {
              $('.tip').hide();
              this.$router.go(-1);
            }, 1000)
            //this.$router.back(-1)
          } else {
            this.tip = res.body.error_description;
            $('.tip').show();
            setTimeout(function () {
              $('.tip').hide();
            }, 1000)
          }
          $('.load').hide();
        })
      },500)
		}
	},
	mounted(){
		$('.tip').hide();
		this.$mount(this.$refs);
		this.id   = this.$route.query.id;
		this.type = this.$route.query.type;
		$('.load').show();
		this.getData(this.type, this.id);
	}
}
</script>
<style scoped>
	.bt0{border-bottom: 0!important;}
    .top1{line-height:0.87rem;padding-left:0.2rem;font-size:0.26rem;color:#292929;border-bottom:1px solid #e0e0e0;}
    /*.top{padding-top: 0.7rem;}*/
    .con-left{width: 0.68rem;height: 0.68rem;border-radius: 50%;float: left;margin: 0.2rem 0.22rem 0 0.2rem;}
    .con-left img{width: 0.68rem;height: 0.68rem;border-radius: 50%;display: block;}
    .con{display: flex;}
    .con ul{margin-top: 0.19rem;float: left;flex: 1;}
    .con .li1{line-height: 0.68rem;height:0.68rem;font-size: 0.26rem;color: #292929;border-bottom: 1px solid #ebebeb;overflow : hidden;text-overflow: ellipsis;white-space: nowrap;}
    .con .li2{width:5rem;line-height: 0.29rem;font-size: 0.21rem;color: #949494;margin-top: 0.18rem;margin-bottom: 0.28rem;overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}

    .navall{border-bottom: 1px solid #ebebeb;margin-left: 0.2rem;}
    .nav{display: flex;}
    .bottom .nav-right{float: right;border-bottom: 1px solid #ebebeb;flex: 1;}
    .bottom .nav-right .li1{color:#292929;font-size: 0.22rem;line-height: 0.85rem;}

    .nav-left {width:0.16rem;height:0.85rem;float:left;margin: 0 0.46rem 0 0.13rem;}
    .nav-left .li4{width:0.16rem;height:0.85rem;float:right;position: relative;}
    label{width: 0.16rem;height: 0.16rem;border-radius:50%;display: block;position:relative;z-index:1;top:50%;transform: translateY(-50%);}
    input[type="radio"] {display: none;position:absolute;}
	input[type="radio"]+b {position:absolute;display: inline-block;width: 0.16rem;height: 0.16rem;border: 1px solid #ccc;cursor: pointer;border-radius: 50%;vertical-align: middle;}
	input[type="radio"]:checked+b {background: url(../../images/checkbox.png)no-repeat;background-size:cover;border:none;}

	.up{width: 5.58rem;margin: 0 auto;}
    .up-all{width:5.58rem;height:100%;margin:0 auto;}
    .up-all p{color:#292929;font-size:0.24rem;line-height:0.66rem;height:0.56rem;padding-top:0.1rem;}
    .up-all .sp1{color:#292929;}
    .up-all textarea{width:5.58rem;height:2rem;resize: none;outline:none;border: 1px solid #e0e0e0;display: block;}
    .up-all ul{width:4.4rem;height:0.56rem;margin:0 auto;}
    .up-all ul li{width:2.08rem;height:0.54rem;border-radius:0.28rem;margin: 0 auto;background: #008dd3;margin-top: 0.59rem;margin-bottom: 0.57rem;}
    .up-all ul li a{line-height:0.54rem;color:#fff;font-size:0.22rem;display:block;text-align:center;}
</style>
