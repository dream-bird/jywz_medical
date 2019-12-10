import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

var   //存储数据
  state = {
    token: '',
  }
  //方法，用于改名state里面的数据
var mutations= {
    clearToken(){
      state.token='';
    },
    setToken(state,value){
      state.token=value;
    },
  }

const store = new Vuex.Store({
  state,
  mutations
  })
export  default  store;

