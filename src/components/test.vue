<template>
	<div class="hello">
		<ul>
			<li v-for="(item, index) in proData">
				<label for="">
                    <input type="checkbox" :value="item.name" v-model="selectArr">
                </label>{{item.name}}
			</li>
		</ul>
		<label>
            <input type="checkbox" class="checkbox" @click="selectAll"/>全选
        </label>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				proData: [{
					"name": "aaaaaaaaaa"
				}, {
					"name": "bbbbbbbbbb"
				}, {
					"name": "cccccccccc"
				}, {
					"name": "dddddddddd"
				}],
				selectArr: []
			}
		},
		methods: {},
		watch: { //深度 watcher
		},
		methods: {
			del() {
				var arr = [];
				var len = this.proData.length;
				for(var i = 0; i < len; i++) {
					if(this.selectArr.indexOf(i) >= 0) {
						console.log(this.selectArr.indexOf(i))
					} else {
						arr.push(proData[i])
					}
				}
				this.proData = arr;
				this.selectArr = []
			},
			selectAll(event) {
				var _this = this;
				if(!event.currentTarget.checked) {
					this.selectArr = [];
				} else { //实现全选
					_this.selectArr = [];
					_this.proData.forEach(function(item, i) {
						_this.selectArr.push(item.name);
					});
				}
			}
		}
	}
</script>
<style type="text/css">
	#app {
		font-size: 0.3rem;
	}
</style>