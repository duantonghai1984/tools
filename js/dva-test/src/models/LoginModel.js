
export default {
  namespace: 'LoginModel',
  state: {
    loginLoading:false
  },
  reducers: {
    show(state){
      return {
        loginLoading:true,
      }
    },
     hide(state){
      return {
        loginLoading:true,
      }
    }
  },
  effects: {
    *login({payload},{call,put}){
      alert("effects");
      yield put({type:'show'})
    }
  },
  subscriptions: {},
};
