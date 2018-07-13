<template>
  <!--<div class="loading-mark">-->
    <div class="loading" style="">
      <vue-loading type="spiningDubbles" color="#008dd3" :size="{ width: '0.5rem', height: '0.5rem' }" style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);"></vue-loading>
    </div>
  <!--</div>-->
</template>

<script>
	import vueLoading from 'vue-loading-template'
	export default {
		name: 'load',
		components: {
			vueLoading
		},
		mounted() {

		},
		methods: {}
	}
</script>

<style scoped>
	.loading {
		/*width: 1rem;*/
		/*height: 1rem;*/
		/*background: #fff;*/
		box-shadow: 0 0 5px #eee;
		border-radius: 0.25rem;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 99999999;
	}

	.loading>>>svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
  .loading-mark{
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #000;
    z-index: 99999999;
    opacity:.6;
  }
</style>
