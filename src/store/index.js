import Vue from 'vue'
import Vuex from 'vuex'
import 'babel-polyfill'
import * as types from './types'
Vue.use(Vuex);

//创建基本状态
const state = {
  logined:false,
  user:{
    username:''
  },
  countInfo:[]
};

const mutations = {
  login(state){
    let user =JSON.parse(localStorage.getItem('userName'));
    state.logined =true;
    state.user.username = user;
  },

  logout(state){
    state.logined =false;
    state.user.username='';
  }






 /* [types.LOGIN]: (state,data)=> {
    localStorage.token =data;
      state.token =data;
  },
  [types.LOGOUT]:(state)=>{
    localStorage.removeItem('token');
    state.token =null;
  },
  [types.TITLE]:(state,data)=>{
    state.title =data;
  }*/
};

const actions ={
  login({commit}){
    commit('login');
  },
  logout(context){
    commit('logout');
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
})

//创建Store实例
/*const store = new Vuex.Store({
  state,
  mutations,
  // 存储状态值
 /!* state: {
    navData:[]
  },

  mutations: {


  },*!/


});*/




