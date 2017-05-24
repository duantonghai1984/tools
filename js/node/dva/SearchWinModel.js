
import * as dataService from '../services/example';

export default {
  namespace: 'SearchWin',
  state: {
    data:[],
  },
  reducers: {
    

    updateData(state,action){
      console.log(action);
      return {data:action.payload};
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
