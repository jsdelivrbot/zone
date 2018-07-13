<template>
	<div class="header">
		<div class="headerall">
			<a :href="uri" @click="back" class="a1"></a>
      <!--<a @click="back" class="a1"></a>-->
			<span class="forget">{{title}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'my-header',
		props: {
			title: {
				type: String,
				default: "头部标题"
			},
			uri:{
				type:String,
				default: 'javascript:history.back(-1);'
			}
		},
		methods:{
      back(){
        //android.back1();
        this.$router.goBack();
      }
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header{height: 0.7rem;box-shadow:0 0 5px #ebebeb;width: 100%;background: #fff;z-index: 11;margin-bottom: 0.05rem;
    position:fixed;padding-top: 0.3rem;
  }
  .headerall{padding: 0 0.2rem;}
  .header a{padding:0 0.2rem;height: 0.7rem;display: block;background: url(../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}
</style>
