
import * as dataService from '../services/example';

export default {
  namespace: 'SearchWin',
  state: {
    data:[],
    url:'',
  },
  reducers: {
    updateData(state,action){
      console.log(action);
      return {data:action.payload};
    },

    queryChange(state,action){
      console.log(action);
      return {url:'www.baidu.com'};
    },
     
  },
  effects: {
    *searchData(action,{call,put}){
        const {data}=yield call(dataService.query);
        console.log(data);
        yield put({type:'updateData',payload:data});
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },
};
