import { createStore } from 'vuex'

export default createStore({
  state: {
    all_register_user:[],
    isLogin:false
  },
  getters: {
    getUserList: state => {
      return state.all_register_user;
    },
    checkauthentication:state=>{
      return state.isLogin
    }
  },
  mutations: {
    userDetails(state,data){
      state.all_register_user.push(data);
    },
    userLogged(state,data){
      state.isLogin = data
    },
    userLoggedout(state,data){
      state.isLogin = data
    }
  },
  actions: {
    setUserDetails({commit},data){
      commit('userDetails',data)
      console.log("find data",data);
    },
    setUserLogin({commit},data){
      commit("userLogged",data)
    },
    setUserLogout({commit},data){
      commit("userLoggedout",data)
    }
  },
  modules: {
  }
})
