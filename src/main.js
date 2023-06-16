import Vue from 'vue'
import Vuex from "vuex";
Vue.use(Vuex)
//准备actions对象——响应组件中用户的动作
const actions = {}
//准备mutations对象——修改state中的数据
const mutations = {}
//准备state对象——保存具体的数据
const state = {}

//创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state
})
import store from "./store/store";

import App from "./App.vue";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import Router from "@/router";
import axios from "axios";
Vue.prototype.$axios =axios;

import qs from 'qs';
Vue.prototype.$qs = qs;

import './mock/mock'

import '@/assets/css/global.css'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router:Router,
  store
}).$mount('#app')

