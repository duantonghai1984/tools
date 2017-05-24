'use strict';

module.exports = {

  'GET /login': function (req, res) {
    setTimeout(function () {
      res.json({
        success: true,
        data: {userId:123},
      });
    }, 100);
  },

};