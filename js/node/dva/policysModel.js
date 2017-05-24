
import * as dataService from '../services/example';

export default {
  namespace: 'policys',
  state: {
    list:[],
    total:0,
  },
  reducers: {
    save(state,{payload:{data:list,total}}){
      console.log('reduce save');
      return {...state,list,total};
    },
  },
  effects: {
    *fetch({payload:{page}},{call,put}){
        const {data}=yield call(dataService.fetchData,{page});
        yield put({type:'save',payload:{data}});
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        console.log(pathname, query);
        if (pathname === '/LoginPage') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
