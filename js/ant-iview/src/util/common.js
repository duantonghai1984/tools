import moment from 'moment'

const domain = "/angel"

export const default_date_format = 'YYYY-MM-DD'

export const ajaxUrls = {
    login: domain + "/shop/login",
    logout: domain + "/shop/logout",
    register: domain + "/shop/register",
    update: domain + "/shop/update",


    foodList: domain + "/food/foodList",
    uploadPic: domain + "/food/uploadPic",
    disImage: domain + "/food/disImage?imageName=",

    catogryList: domain + "/kind/catogryList",



};


export const DateTools={
  format:function(value){
    return moment(value).format(default_date_format);
  },
}


export const PgTools={

  defPg:function(){
      let pg={total:0,pgNumber:1,limit:2};
      return pg;
  },

  getPg:function(data){
    let pg={};
    pg.total=data.totalCount;
   // pg.limit=data.limit;
   pg.limit=2;
   pg.pgNumber=data.pgNumber;
    return pg;
  },
}
