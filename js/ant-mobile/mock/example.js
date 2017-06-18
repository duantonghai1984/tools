'use strict';

module.exports = {

  'GET /angel/foodList': function (req, res) {
    let data=[];
    for(let i=0;i<10;i++){
      let obj=new Object();
      obj.id=i;
      obj.name="可乐"+i;
      obj.price="35";
      obj.image="https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png";
      obj.des="test food";
      obj.restantId=i;
      data.push(obj);
    }

    setTimeout(function () {
      res.json(data);
    }, 500);
  },


  'GET /angel/catogryList': function (req, res) {
    let data=[];
    for(let i=0;i<10;i++){
      let obj=new Object();
      obj.id=i;
      obj.name="招牌"+i;
      obj.restantId=i;
      data.push(obj);
    }

    setTimeout(function () {
      res.json(data);
    }, 500);
  },

};
