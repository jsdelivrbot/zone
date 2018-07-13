<template>
	<div id="headed">
		<div class="header">
			<div class="headerall">
				<a href="javascript:history.back(-1);" class="a1"></a>
        <!--<a @click="back" class="a1"></a>-->
				<span class="forget">编辑圈子介绍</span>
				<a class="a2" @click="enterBj">完成</a>
			</div>
		</div>
		<div class="content">
			<div class="con">
				<textarea ref="desc" v-model="desc" placeholder="圈子介绍,最多输入200个字" maxlength="200" @input="descInput"></textarea>
				<span style="    position: absolute;
    font-size: 0.2rem;
    display: inline-block;
    bottom: 0.1rem;
    right: 0.3rem;
    color:#a8a2a2;">{{remnant}}/200</span>
			</div>
		</div>
		<pop style="text-align: center" class="tip" :title="tip"></pop>
    <load v-show="isload"></load>
		<!--<my-footer></my-footer>-->
	</div>
</template>

<script>
	import { setCookie, getCookie } from '../../../assets/js/cookie.js'
	import { getOpenUrl,getToken} from '../../../assets/js/common.js'
	export default {
		data() {
			return {
			  isload:false,
				tip: '',
				remnant: 200,
				desc: ''
			}
		},
		methods: {
		  back(){
		    android.back1();
      },
			descInput() {
				let txtVal = this.desc.length;
				this.remnant = 200 - txtVal;
			},
			enterBj() {
		    this.isload = true;
				this.$http.post(getOpenUrl() + "/user/desc", {
					intro: this.$refs.desc.value,
          str_rand:this.$route.query.str1
				}, {
					headers: {
						"Authorization": "Bearer " + getToken()
					}
				}).then((res) => {
          this.isload = false;
					console.log(res.body);
					if(res.body.status) {
//						this.$router.push({
//							path: '/boss',
//							query: {
//								gid: res.body.data.gid
//							}
//						});
            this.$router.push({
              path: '/myqz',
            });
            this.$root.eventHub.$emit('tjqzSuccess');
					} else {
						this.tip = res.body.error_description;
						$('.tip').show();
						setTimeout(function() {
							$('.tip').hide();
						}, 1000)
					}
				})
			}
		},
		mounted() {
			//是否存在input焦点事件或图层打开事件
			$('textarea').focus(function() {
				//获取焦点
				let expireDays = 1000 * 60 * 60;
				setCookie("inputkey", 1, expireDays);
			});
			let self = this;
			$(document).bind('click', function(e) {
				var target = $(e.target);
				if(target.closest("textarea").length == 0 && target.closest('.a1').length == 0) {
					setCookie("inputkey", '', -1);
				}
			});
		},
		beforeRouteLeave(to, from, next) {
			//路由离开时
			var isInputKey = parseInt(getCookie('inputkey'));
			if(isInputKey == 1) {
				setCookie("inputkey", '', -1);
				next(false)
			} else {
				next()
			}
		}
	}
</script>

<style scoped="scoped">
  .tip {
    display: none;
  }

  .header {
    height: 0.7rem;
    box-shadow: 0 0 5px #ebebeb;
    position: fixed;
    top: 0;
    width: 100%;
    padding-top: 0.3rem;
  }

  .headerall {
    padding: 0 0.2rem;
  }

  .header .a1 {
    width: 0.18rem;
    height: 0.34rem;
    display: block;
    background: url(../../../images/back.png) no-repeat;
    background-size: cover;
    float: left;
    margin-top: 0.2rem;
  }

  .header .a2 {
    height: 0.7rem;
    display: block;
    float: right;
    font-size: 0.2rem;
    line-height: 0.7rem;
    color: #008DD3;
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

  .content {
    position: absolute;
    top: 1rem;
    width: 100%;
  }

  .con {
    position: relative;
    padding: 0 0.2rem;
  }

  .con textarea {
    border: 1px solid #ebebeb;
    display: block;
    border-radius: 0.05rem;
    font-size: 0.2rem;
    width: calc(100% - 0.1rem);
    height: 2.05rem;
    background: #f8f8f8;
    margin-top: 0.26rem;
    padding-top: 0.16rem;
    padding-left: 0.1rem
  }
</style>
