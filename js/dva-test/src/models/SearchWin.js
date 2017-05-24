
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
        console.log("effect");
       
        const {data}=yield call(dataService.query);
        console.log('response data');
        console.log(data);
        yield put({type:'updateData',payload:data});
    }
  },
  subscriptions: {},
};
