import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state ={
    token:'',
    userState:0,
}
const mutations ={
    setToken(state,token){
        state.token = token;
        localStorage.setItem("token",token);
    },

    getToken(){
        var token;
        token=localStorage.getItem('token');
        return token;
    },

    resetState(state){
        state.token = '';
        localStorage.clear();
    }

}
export default new Vuex.Store({
    state,
    mutations
})

