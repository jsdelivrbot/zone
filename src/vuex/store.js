import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state={
	homestop:0,
	wrongstop:0,
	explainstop:0
}
const mutations={
	HOMESTOPF(state){
		state.homestop=document.body.scrollTop
	},
	WRONGSTOPF(state){
		state.wrongstop=document.body.scrollTop
	},
	EXPLAINSTOPF(state){
		state.explainstop=document.body.scrollTop
	}
}
export default new Vuex.Store({
	state,
	mutations
})
