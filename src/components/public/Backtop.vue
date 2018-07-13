<template>
	<div>
		<a href="#top" class="top_btn" style="display: inline;">回到顶部</a>
	</div>

</template>

<script>
	export default {
		name: 'backtop',
		props: {
			title: {
				type: String,
				default: "class"
			}
		},
		mounted(){
			//回到顶部
		    $('.top_btn').hide(); //隐藏go to top按钮

		    $(".backtop").scroll(function() {
		        if($(this).scrollTop() > 200) {
		          $('.top_btn').fadeIn();
		        } else {
		          $('.top_btn').fadeOut();
		        }
		    });

		    $(".top_btn").click(function() {
		        $(".backtop").animate({
		          scrollTop: 0
		        }, 10);
		        return false;
		    });
		},
		methods:{
		}
	}
</script>

<style scoped>
	.top_btn {
	    position: fixed;
	    z-index: 999999;
	    right: 0.2rem;
	    bottom: 0.35rem;
	    display: none;
	    width: 0.6rem;
	    height: 0.6rem;
	    background: url(../../images/other/fhtb.png) no-repeat;
	    background-size: 0.6rem 0.6rem;
	    text-indent: -99em;
	    overflow: hidden;
	  }
</style>
