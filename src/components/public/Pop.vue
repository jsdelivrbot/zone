<template>
    <div class="pop">
      <!--<transition name="fade">-->
      <div class="popall" v-if="title">
          <!--name="zoom"-->
          <!--enter-active-class="fadeIn"-->
          <!--leave-active-class="fadeOut"-->
        <!--&gt;-->
          <p class="forget" v-html="title"></p>
      </div>
      <!--</transition>-->
    </div>
</template>

<script>
	export default {
		name: 'pop',
		props: {
			title: {
				type: String,
				default: "系统繁忙,请稍后再试"
			}
		},
		methods: {}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	/*.forget {*/
		/*text-align: center;*/
		/*line-height:0.35rem;*/
		/*z-index: 1000;*/
		/*margin-bottom: 0.05rem;*/
		/*border-radius: 0.1rem;*/
		/*position: fixed;*/
		/*top: 50%;*/
		/*left: 50%;*/
		/*transform: translate(-50%, -50%);*/
		/*box-shadow: 0 0 0.1rem #000;*/
		/*background: rgba(0, 0, 0, 0.7);*/
		/*padding: 0.3rem 0.2rem;*/
		/*color: #fff;*/
		/*font-size: 0.3rem;*/
		/*min-width:2rem;*/
		/*max-width:4rem;*/
	/*}*/
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .2s;
  }
  .pop{
    left: 50%;
    -webkit-transform: translate(-50%);
    -ms-transform: translate(-50%);
    transform: translate(-50%);
    bottom: 80px;
    position: fixed;
    z-index: 999999;
    line-height: 17px;
  }
  .popall{
    font-size: 14px;
    padding: 12px 16px;
    text-align: center;
    color: #fff;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    background: #323232;
    opacity: .9;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
</style>
