
import moment from 'moment'

const domain = "/angel"

export const default_date_format = 'YYYY-MM-DD'

export const ajaxUrls = {
    foodList: domain + "/foodList",
    catogryList: domain + "/catogryList",
    createOrder: domain + "/createOrder",

    shopDet: domain + "/shopDet",
};


export class submitedOrder {
    constructor(orderId, order, goods) {
        this.orderId = orderId;
        this.order = order;
        this.goods = goods;
    };
}

export const SessionUtil = {

    addOrder: function (order) {
        /*
        sessionStorage.setItem('user', JSON.stringify(userEntity));
        var userJsonStr = sessionStorage.getItem('user');
        userEntity = JSON.parse(userJsonStr);
        */
        let key='orders';
        let orders = sessionStorage.getItem(key);
         if (orders==null || orders.length<1) {
            orders = new Array();
        }else{
            orders = JSON.parse(orders);
        }
        console.log(orders.length)
        orders.push(order);
         sessionStorage.setItem(key, JSON.stringify(orders));
    },

    getOrders: function () {
         let key='orders';
         let orders = sessionStorage.getItem(key);
         if (orders==null || orders.length<1) {
            orders = new Array();
        }else{
            orders = JSON.parse(orders);
        }
        console.log(orders.length)
        return orders;
    }
}


