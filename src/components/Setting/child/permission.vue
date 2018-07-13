<template>
    <div class="content">
        <div class="header">
	        <a class="a1" href="javascript:history.back(-1);"></a>
	        <span class="forget">内容权限</span>
	        <a class="a2" @click="submit()"></a>
	    </div>
	    <div class="nav-all">
	    	<div class="nav">
	    		<div class="nav-a">
			    	<div class="nav-l">
			    		<p class="p1">公开</p>
			    		<p class="p2">(群组内容公开，所有成员可见)</p>
			    	</div>
			    	<div class="nav-r">
		                <li class="li4">
		                    <label>
		                        <input type="radio" name="a" value="a" ref="a"/><b></b>
		                    </label>
		                </li>
		            </div>
	            </div>
		    </div>
		    <div class="nav">
	    		<div class="nav-a">
			    	<div class="nav-l">
			    		<p class="p1">秘密</p>
			    		<p class="p2">(群组内容私密，仅成员可见)</p>
			    	</div>
			    	<div class="nav-r">
		                <li class="li4">
		                    <label>
		                        <input type="radio" name="a" value="b" ref="b"/><b></b>
		                    </label>
		                </li>
		            </div>
	            </div>
		    </div>
		    <!--会员组-->
		    <div v-show="show">
			    <div class="nav">
		    		<div class="nav-a">
				    	<div class="nav-l">
				    		<p class="p1">会员组</p>
				    		<p class="p2">(群组内指定会员组及成员可见)</p>
				    	</div>
				    	<div class="nav-r">
			                <li class="li4">
			                    <label>
			                        <input type="radio" value="c" name="a" ref="c"/><b></b>
			                    </label>
			                </li>
			            </div>
		            </div>
			    </div>
			    <!--子会员组-->
			    <div class="child" v-show="isshow">
				    <div class="nav" v-for="(group,index) in groupData" :key="index">
			    		<div class="nav-a">
					    	<div class="nav-l">
					    		<p class="p1">{{group.title}}</p>
					    		<p class="p2">(群组内容{{group.title}}会员组及成员可见)</p>
					    	</div>
					    	<div class="nav-r">
				                <li class="li4">
				                    <label>
				                        <input type="checkbox" ref='childgroup' :value="group.user_group_id" :name="group.is_select" :checked="group.is_select==true?true:false"><b></b>
				                    </label>
				                </li>
				            </div>
			            </div>
				    </div>
			    </div>
		    </div>
	    </div>
      <load v-show="isload"></load>
	    <pop class="tip" :title="tip"></pop>
    </div>
</template>

<script>
	var group="";
import qs from 'qs'
import { getOpenUrl ,getToken} from "../../../assets/js/common.js"
import { setCookie, getCookie } from '../../../assets/js/cookie.js'
export default {
    name:'content',
        data () {
             return {
               isload:false,
             	tip:'',
             	show:false,
             	isshow:false,
                listData:{},
                groupData:{},
//              groupid:{},
                privs:[]
             };
         },
         mounted() {
//       	$("#id").checked()
			$('.tip').hide();
			this.$http.get(getOpenUrl() + "groupPower", {
        headers: {						'Authorization': 'Bearer ' + getToken()					},
				params: {
					gid: this.$route.query.gid
				}
			}).then((res) => {
				var gpid=[]
				this.listData = res.body.data;
				this.groupData = res.body.data.arr_group;
				this.$mount(this.$refs);
				if(this.listData.brower_level==-1){
					this.$refs.a.checked=true;
				}else if(this.listData.brower_level==1){
					this.$refs.b.checked=true;
				}else if(this.listData.brower_level==2){
					this.$refs.c.checked=true;
					this.isshow=true;
				}
				if(this.listData.is_group==true){
					this.show=true
				}
				if(group==''){
            		group=this.listData.brower_level
            	}
			});
			var $self = this;
			$('input[name="a"]').click(function(){
				if ($(this).val() == 'c'){
					$self.isshow=true;
					group=2;
				}else{
					$self.isshow=false;
				}
				if ($(this).val() == 'b'){
					group=1
				}else if($(this).val() == 'a'){
					group=-1
				}
			})
		},
        methods: {
            submit(){
            	if(group==2){
//          		var privs = [];
            		for(var i=0;i<this.$refs.childgroup.length;i++){
            			if(this.$refs.childgroup[i].checked==true){
	            			this.privs.push(this.$refs.childgroup[i].value);
	            		}
            		}
            		if (this.privs.length == 0){
            			this.tip = "请选择会员组";
			            $('.tip').show();
			            setTimeout(function(){
			              $('.tip').hide();
			            },1000)
            			return ;
            		}
            	}
            	this.isload = true;
            	this.$http.post(getOpenUrl() + "groupPowerDo", {
            		gid: this.$route.query.gid,
					brower_level:group,
					group_level:this.privs,
				},{
					headers: {						'Authorization': 'Bearer ' + getToken()					}

				}).then((res) => {
                this.isload = false;
					if(res.body.code==0){
						this.tip = "提交成功";
			            $('.tip').show();
			            setTimeout(function(){
			              $('.tip').hide();
			              history.go(-1)
			            },1000)

					}else{
						this.tip = res.body.error_description;
			            $('.tip').show();
			            setTimeout(function(){
			              $('.tip').hide();

			            },1000)

					}
				})

            }
        }
    }
</script>
<style scoped>
    .header{padding-top:0.3rem;height: 0.7rem;padding-left: 0.2rem;padding-right: 0.2rem;position: relative;box-shadow:0 0 5px #ebebeb;position: fixed;width: calc(100% - 0.4rem);background: #fff;z-index: 11;}
    .header .a1{width: 0.18rem;height: 0.7rem;display: block;background: url(../../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
    .header .a2{width: 0.32rem;height: 0.7rem;display: block;background: url(../../../images/ok.png) no-repeat 0 50%;background-size: 0.32rem 0.2rem;float:right;}
    .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}
	.nav-all{overflow: hidden;padding-top: 1rem;}
	.nav{line-height: 0.85rem;font-size: 0.22rem;color: #272727;overflow: hidden;border-bottom: 1px solid #e0e0e0;}

	.nav-a{width: 6rem;margin: 0 auto;}
	.nav-l{float: left;margin: 0.24rem 0 0.23rem 0;}
	.nav-l .p1{line-height: 0.37rem;}
	.nav-l .p2{line-height: 0.37rem;color: #ADADAD;}
	.nav-r {width:0.24rem;height:1.2rem;float:right;}
    .nav-r .li4{width:0.25rem;height:1.2rem;float:right;position: relative;}
    label{width: 0.24rem;height: 0.24rem;border-radius:50%;display: block;position:relative;z-index:10;top:50%;transform: translateY(-50%);}
    input[type="checkbox"] {display: none;position:absolute;}
	input[type="checkbox"]+b {position:absolute;top:0;left:0;display: inline-block;width: 0.24rem;height: 0.24rem;border: 1px solid #ccc;cursor: pointer;border-radius: 50%;vertical-align: middle;}
	input[type="checkbox"]:checked+b {background: url(../../../images/checkbox.png)no-repeat;background-size:cover;border:none;}


    input[type="radio"] {display: none;position:absolute;}
	input[type="radio"]+b {position:absolute;top:0;left:0;display: inline-block;width: 0.24rem;height: 0.24rem;border: 1px solid #ccc;cursor: pointer;border-radius: 50%;vertical-align: middle;}
	input[type="radio"]:checked+b {background: url(../../../images/checkbox.png)no-repeat;background-size:cover;border:none;}

	.child{padding-left: 0.4rem;}
	.child .nav-r{padding-right: 0.2rem;}
	.child label{width: 0.24rem;height: 0.24rem;border-radius:50%;display: block;position:relative;z-index:10;top:50%;transform: translateY(-50%);}
    .child input[type="checkbox"] {display: none;position:absolute;}
	.child input[type="checkbox"]+b {position:absolute;top:0;left:0;display: inline-block;width: 0.24rem;height: 0.24rem;border: 1px solid #ccc;cursor: pointer;border-radius: 50%;vertical-align: middle;}
	.child input[type="checkbox"]:checked+b {background: url(../../../images/checkbox.png)no-repeat;background-size:cover;border:none;}
</style>
