
import { ajaxUrls, submitedOrder,SessionUtil } from '../utils/common.js';

export default {

  namespace: 'ShopCard',

  state: {
     goods:{}, //所选择的商品 { id: { good:good,count:1}}
     orders:[],
     shopId:null,
     shop:{},
     deskId:null,
     total:{foodCount:0,amount:0}
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *fetchRemote({ payload }, { call, put }) {
    },
  },

  reducers: {
    enterShop(state, action) {
      return { ...state,  shopId:action.shopId,deskId:action.deskId,orders:SessionUtil.getOrders()};
    },

    updateShop(state,action){
       return { ...state,  shop:action.shop};
    },

     submitOrder(state,action){
      const {order}=action;
      let nstate=Object.assign({},state);
      nstate.goods={};
      nstate.orders=SessionUtil.getOrders();
      nstate.total={foodCount:0,amount:0}
      console.log('order size:'+nstate.orders.length)
      return { ...nstate};
    },

    //action={good,count}
    chooseFood(state, action) {
      let {good,count}=action;
      let goods=Object.assign({},state.goods);
      goods[good.id]={good,count};
      
     //计算价格
      let foodCount=0;
      let amount=0;
      for(let idx in goods){
        console.log(goods[idx].count)
          foodCount=goods[idx].count+foodCount;
          amount=amount+goods[idx].count*goods[idx].good.price
      }
      amount=amount.toFixed(2)
      return { ...state,  goods:goods,total:{foodCount,amount}};
    },
  },

}

