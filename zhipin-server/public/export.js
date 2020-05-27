var fs = require('fs');
var path = require('path');

//下载简历
module.exports =function (app) {
  return function (req, res, next) {
    if (req.method === 'GET') {
      // console.log(req.url.split("/")[1],"结束");
      app.service('mvc-filedata').find({query: { address:req.url.split("/")[1] }})
        .then(function (result, err) {
          if (err) throw err;
          console.log(result.data);
          var file = 'F:/work/VMC/VMC-services/service-host/src/uploads/'+ result.data[0].address; //文件的地址
          res.download(file);
        });
    }
    else {
    }
  };
};