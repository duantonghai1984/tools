import moment from 'moment'

const domain = "/angel"

export const default_date_format = 'YYYY-MM-DD'

export const ajaxUrls = {
    login: domain + "/shop/login",
    register: domain + "/shop/register",
    update: domain + "/shop/update",


    foodList: domain + "/food/foodList",


    catogryList: domain + "/kind/catogryList",



};


export const DateTools={
  format:function(value){
    return moment(value).format(default_date_format);
  },
}
