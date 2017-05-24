
import * as dataService from '../services/example';

export default {
  namespace: 'loginObj',
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
       const {data}=yield call(dataService.fetchData);
        yield put({type:'show',payload:{data}});
    }
  },
  subscriptions: {},
};
