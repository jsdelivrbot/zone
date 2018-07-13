<template>
  <div class="index">
    <my-header title="任务详情"></my-header>
    <div class="cen">
    	<div class="cenall">
    		<div class="cenallt">
    			<p class="cent">[产品调查]谈谈你对中兴手机的建议!!</p>
		    	<ul class="cenb">
	    			<li>已有<span>1000</span>人完成了此任务</li>
	    			<li class="li2">作者：<span>渣渣</span></li>
	    		</ul>
    		</div>
    		<div class="cenallb">
    			<div class="cenallb-t">说出几点你认为中兴手机的不足之处,以及你有什么好的建议!!!</div>
    			
    			<div class="nav-r">
	                <textarea></textarea>
	            </div>
    		</div>
    		<div class="cenallf">
    			<ul>
    				<li>任务奖励：客服审核通过后获得<span>50</span>积分!!</li>
    			</ul>
    		</div>
    		<div class="footer">
    			<ul>
    				<li class="li2">提交</li>
    			</ul>
    		</div>
    	</div>
    </div>
  </div>
</template>
<script>
import {setCookie,getCookie} from '../../../assets/js/cookie.js'
import qs from 'qs'
export default {
  data () {
    return{
        
    }
  },
  mounted(){
    
  },
  methods:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.header{position: fixed;top: 0;}
	.cen{position: absolute;top: 1.28rem;width: 100%;}
	.cenall{width: 5.86rem;margin: 0 auto;}
	.cent{font-size:0.26rem;color: #242424;height: 0.64rem;margin-top: 0.13rem;line-height: 0.64rem;}
	.cenallt{margin-bottom: 0.23rem;overflow: hidden;}
	.cenb li{float: left;height: 0.46rem;line-height: 0.46rem;color: #636363;font-size: 0.16rem;}
	.cenb .li2{float: right;}
	.cenallb{border-radius: 0.05rem;box-shadow: 0 0 0.05rem #000;overflow: hidden;}
	.cenallb-t{line-height: 0.35rem;color: #fff;font-size: 0.26rem;background: #46c2ff;padding: 0.17rem 0.32rem;}
	.cenallb-b{width:5.28rem;margin:0 auto;font-size: 0.21rem;color: #242424;line-height: 0.35rem;padding-top: 0.24rem;padding-bottom: 0.28rem;border-bottom: 0.01rem solid #ebebeb;}
	.nav-r {overflow: hidden;}
    .nav-r textarea{height: 4.38rem;width: 100%;background: #fafafa;}
	.cenallf{height:0.6rem;line-height:0.6rem;overflow: hidden;}
	.cenallf ul{font-size: 0.21rem;color: #008dd3;padding-left: 0.11rem;}
	.footer{width: 2.08rem;margin: 0 auto;margin-top: 0.13rem;}
	.footer li{width: 2.08rem;height: 0.54rem;font-size: 0.22rem;border-radius: 0.27rem;line-height: 0.54rem;text-align: center;float: left;}
	.footer .li2{color: #fff;border: 1px solid #46c2ff;background: #46c2ff;float: right;}
</style>
