<template>
    <div class="jiben">
        <div class="setting1">
            <div class="setting-all">
                <a href="javascript:history.back(-1);" class="a1"></a>
                <span class="forget">基本设置</span>
                <a class="a2" @click="submit()"></a>
            </div>
        </div>
        <div class="setting2">
            <div class="setting2-all">
                <div class="sl"></div>
                <div class="sr">
                    <ul class="sr-ul">
                        <li class="sr-ul-li1">公告发布</li>
                        <li class="sr-ul-li2">(最多可输入两百个字)</li>

                    </ul>
                </div>
            </div>
            <textarea ref="text" maxlength="200" @input="descInput">{{this.listData.announce}}</textarea>
            <div style="width: 100%;height: 0.2rem;">
            	<span style="height: 0.2rem;font-size: 0.2rem;display: block;float: right;padding-right: 0.6rem;">{{remnant}}/200</span>
            </div>

            <div class="bottom" @click="clear()">清除</div>
        </div>
      <load v-show="isload"></load>
        <pop class="tip" :title="tip"></pop>
    </div>
</template>

<script>
	import { getOpenUrl,getToken} from "../../../assets/js/common.js"
	import {setCookie,getCookie} from '../../../assets/js/cookie.js'
	export default {
		data () {
             return {
               isload:false,
             	tip:'',
                show:false,
                isshow:false,
                remnant: 200,
                listData:{}
             };
         },

         mounted(){

         	$('.tip').hide();
         	this.$http.get(getOpenUrl() + "groupNotice", {
            headers: {						'Authorization': 'Bearer ' + getToken()					},
				params: {
					gid: this.$route.query.gid
				}
			}).then((res) => {
				this.listData = res.body.data;
				this.$refs.text.value=this.listData.announce
				var txtVal = this.$refs.text.value.length;
				this.remnant = 200 - txtVal;
			});
         },
         methods: {
             toggle(){
                this.show = !this.show;
            },
             toggle1(){
                this.isshow = !this.isshow;
            },
            clear(){
            	this.$refs.text.value='';
            	this.remnant = 200
            },
            descInput(){
				var txtVal = this.$refs.text.value.length;
				this.remnant = 200 - txtVal;
				if(this.remnant<1){
					this.tip = "极限了";
		            $('.tip').show();
		            setTimeout(function(){
		              $('.tip').hide();
//		              this.$router.go(-1)
		            },1000)

				}
			},
			submit(){
              this.isload = true;
				this.$http.post(getOpenUrl() + "groupNoticeDo", {
					gid: this.$route.query.gid,
					reason:this.$refs.text.value,
				},{
					headers: {						'Authorization': 'Bearer ' + getToken()					}
				}).then((res) => {
				  this.isload = false;
					if(res.body.code==0){
						this.tip = "保存成功";
			            $('.tip').show();
			            setTimeout(()=>{
			              $('.tip').hide();
			              this.$router.go(-1)
			            },1000)

					}else{
						this.tip = res.body.error_description;
			            $('.tip').show();
			            setTimeout(function(){
			              $('.tip').hide();
			            },1000)
					}
				});
			}
         }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .setting1{height: 0.7rem;position: relative;box-shadow:0 0 5px #ebebeb;padding-top: 0.3rem;}
  .setting-all{padding: 0 0.2rem;overflow:hidden;}
  .jiben .a1{width: 0.18rem;height: 0.7rem;background: url(../../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;display: block;}
  .jiben .a2{width: 0.32rem;height: 0.7rem;background: url(../../../images/ok.png) no-repeat 0 50%;background-size: 0.32rem 0.2rem;float:right;display: block;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}


  .setting2{width:100%;overflow:hidden;}
  .setting2-all{overflow:hidden;padding: 0 0.2rem;}
  .setting2 .sl{width:0.99rem;height:1.14rem;float:left;background:url(../../../images/qzjs.png) no-repeat 50% 50%;background-size:0.36rem 0.34rem;}
  .setting2 .sr{width:calc(100% - 0.99rem);;height:1.14rem;float:right;}
  .setting2 .bt0{border-bottom:0;}
  .setting2 .sr-ul{width:4.85rem;overflow:hidden;float:left;}
  .setting2 .sr-ul-li1{font-size:0.22rem;color:#1a1a1a;margin-top:0.23rem;line-height:0.37rem;}
  .setting2 .sr-ul-li2{font-size:0.20rem;color:#adadad;line-height:0.36rem;}

  textarea{width: calc(100% - 0.8rem);height:2.7rem;resize: none;outline: none;border: 0;display: block;margin: 0 auto;background:#f5f5f5;padding-left: 0.05rem;padding-top: 0.1rem;}
  .bottom{width:1.36rem;height:0.54rem;border-radius:0.27rem;background:#54c2f0;font-size:0.2rem;line-height:0.54rem;text-align:center;color:#fff;float:right;margin:0.3rem 0.6rem 0 0;}
</style>
