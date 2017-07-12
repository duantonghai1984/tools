import moment from 'moment'
import { PrintPage } from './lodop';

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
  format: function (value, format = default_date_format) {
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
  caclutePg: function (pg) {
    let limit = pg.limit;
    let start = (pg.pgNumber - 1) * limit;
    return { limit, start };
  },

  getPgFormData: function (formData, pg) {
    let pramData = PgTools.getFormData(formData);
    pramData = Object.assign({}, pramData, PgTools.caclutePg(pg));
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
    return foodKindList[value - 1];
  },
  orderStatus: function (value) {
    return orderStatusList[value - 1];
  },
  foodKindList: foodKindList,
  orderStatusList: orderStatusList,
}

let order={
   id:13344,
   count:20,
   amount:100,
   usePhone:123344,
   deskid:1,
   shopName:"川四方",
   orderDet:[
     {
       foodname:'鱼香茄子',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    },{
       foodname:'宫保鸡丁网私服',
       count:1,
       price:23
    }
   ]
}

let printTools = {
  getPrintPage: function (options) {
    let printPage = new PrintPage({
      createPage: printTools.createOrderPrintPage,
      initPage: function (lodop) {
        lodop.PRINT_INITA("0cm", "0cm", "5cm", "5.8cm", "");
      },
      model: '0'
    });

     var data=new Array();
    for(var i=0;i<4;i++){
      data.push(order);
    }
    printPage.setPrintData(data);
    return printPage;
  },

  createOrderPrintPage: function (data, lodop, index) {
    lodop.NewPage();
    let currentTop=2; //mm
    let unit="mm"
    let lineHeight=7;
    let lineNum=0;
    lodop.SET_PRINT_STYLE("FontSize", 10)
    lineNum=printTools.addPrintText(lodop,lineNum,lineHeight,"-----------------------------");

    lodop.ADD_PRINT_TEXT("5mm", "2cm", "", "", "欢迎光临");
    lineNum=lineNum+1
    lineNum=printTools.addPrintText(lodop,lineNum,lineHeight,"订单号:"+data.id);
    lineNum=printTools.addPrintText(lodop,lineNum,lineHeight,"客户手机:"+data.usePhone);
    lineNum=printTools.addPrintText(lodop,lineNum,lineHeight,"-----------------------------");

    lineNum=printTools.addPrintText(lodop,lineNum,lineHeight,printTools.getWstr("菜品",16,)+printTools.getWstr("数量",8)+printTools.getWstr("价格",8));
    for(let idx in data.orderDet){
      let good=data.orderDet[idx];
      lineNum=printTools.addPrintText(lodop,lineNum,lineHeight,printTools.getWstr(good.foodname,16,false)+printTools.getWstr(good.count,6)+printTools.getWstr(good.price,8));
    }
    lineNum=printTools.addPrintText(lodop,lineNum,lineHeight,"-----------------------------");

    lineNum=printTools.addPrintText(lodop,lineNum,lineHeight,"总数:"+data.count);
    lineNum=printTools.addPrintText(lodop,lineNum,lineHeight,"合计金额:"+data.amount);

    lineNum=printTools.addPrintText(lodop,lineNum,lineHeight,"-----------------------------");
    lineNum=printTools.addPrintText(lodop,lineNum,lineHeight,printTools.getWstr("谢谢惠顾，欢迎下次光临",36));
    lineNum=printTools.addPrintText(lodop,lineNum,lineHeight,printTools.getWstr(data.shopName,34));
  },

  addPrintText:function(lodop, lineNum,lineHeight,str,width="58mm"){
    lodop.ADD_PRINT_TEXT(lineNum*lineHeight+"mm", "2mm", width, "", str);
    lineNum=lineNum+1;
    return lineNum;
  },

  getWstr:function(str,length,needLeft=true){
      let clength=String(str).length;
      if(printTools.isChinese(str)){
        clength=clength*2;
      }
      if(length-clength>0){
        for(let i=0;i<length-clength;i=i+2){
          if(needLeft){
          str=" "+str+" ";
          }else{
             str=str+"  ";
          }
        }
      }
      return str;
  },

  isChinese:function(str){
      if(/.*[\u4e00-\u9fa5]+.*$/.test(str)) {
         return true;
      }
      return false;
  }
}

export const Tools = {
  AngelTool: AngelTool,
  PgTools: PgTools,
  DateTools: DateTools,
  Notify: Notify,
  EnumTools: EnumTools,
  printTools:printTools,
}




