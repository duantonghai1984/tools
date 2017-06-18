
export default {

  namespace: 'ShopCard',

  state: {
     goods:{}, //所选择的商品 { id: { good:good,count:1}}
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
      return { ...state,  shopId:action.shopId,deskId:action.deskId};
    },

    updateShop(state,action){
       return { ...state,  shop:action.shop};
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
      return { ...state,  goods:goods,total:{foodCount,amount}};
    },
  },

}

