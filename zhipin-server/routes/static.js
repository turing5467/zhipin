var express = require('express');
var fs = require('fs')
var router = express.Router();
let path = require('path')


getAsset('cert');
getAsset('cities');
getAsset('city_title');
getAsset('hot_cpn');
getAsset('hot_job');
getAsset('jobs');
getAsset('industry');
getAsset('tag');
getAsset('job_type');


function getAsset(name) { 
  router.get('/'+name, function(req, res, next) {
    fs.readFile(path.join(__dirname, `../public/${name}.json`),(err, data) => {
      if(!err){
        res.json(JSON.parse(data.toString()));
      }else{
        console.log(err);
      }
    })
  });
}


module.exports = router;
