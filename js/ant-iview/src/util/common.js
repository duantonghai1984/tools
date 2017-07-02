import moment from 'moment'

const domain = "/angel"

export const default_date_format = 'YYYY-MM-DD'
export const default_date_format2 = 'YYYY-MM-DD hh:mm:ss'

export const ajaxUrls = {
  login: domain + "/shop/login",
  logout: domain + "/shop/logout",
  register: domain + "/shop/register",
  update: domain + "/shop/update",


  addFood: domain + "/food/addFood",
  foodList: domain + "/food/foodList",
  uploadPic: domain + "/food/uploadPic",
  disImage: domain + "/food/disImage?imageName=",
  delImage: domain + "/food/delImage?imageName=",
  delFood: domain + "/food/delFood",



  catogryList: domain + "/kind/catogryList",
  addCatogry: domain + "/kind/addCatogry",
  delCatogry: domain + "/kind/delCatogry",


  orderList: domain + "/order/orderList",
  orderDet: domain + "/order/orderDet?",
  payOrder: domain + "/order/payOrder",
  delOrder: domain + "/order/delOrder",

};


export const DateTools = {
  format: function (value,format=default_date_format) {
    return moment(value).format(format);
  },

}


export const PgTools = {

  defPg: function () {
    let pg = { total: 0, pgNumber: 1, limit: 20 };
    return pg;
  },

  getPg: function (data) {
    let pg = {};
    pg.total = data.totalCount;
    pg.limit = data.limit;
    //pg.pgNumber = data.pgNumber;
    return pg;
  },

  //根据当前pg参数计算出后台需要的分页数据
  caclutePg:function(pg){
    let limit=pg.limit;
    let start=(pg.pgNumber-1)*limit;
    return {limit,start};
  },

  getPgFormData:function(formData,pg){
    let pramData = PgTools.getFormData(formData);
    pramData=Object.assign({},pramData, PgTools.caclutePg(pg));
    return pramData;
  },

  getFormData: function (data) {
    let nData = {};
    for (let idx in data) {
      if (data[idx] && String(data[idx]).trim().length > 0) {
        nData[idx] = data[idx];
      }
    }
    return nData;
  }
}


export const AngelTool = {
  getImageUrl: function (fileName) {
    return ajaxUrls.disImage + fileName;
  }
}


let Notify = {
  sus: function (ref, msg, title = "操作提示") {
    ref.$Modal.success({
      title: title,
      content: msg
    });
  },

  error: function (ref, msg, title = "操作提示") {
    ref.$Modal.error({
      title: title,
      content: msg
    });
  }

}

const foodKindList = ["酒水", "饮料", "冷菜", "热菜"];
const orderStatusList = ["待处理", "已打印", "已传菜", "已结账"];
let EnumTools = {
  foodKind: function (value) {
    return foodKindList[value-1];
  },
  orderStatus: function (value) {
    return orderStatusList[value-1];
  },
  foodKindList:foodKindList,
  orderStatusList:orderStatusList,
}

export const Tools = {
  AngelTool: AngelTool,
  PgTools: PgTools,
  DateTools: DateTools,
  Notify: Notify,
  EnumTools: EnumTools,
}
