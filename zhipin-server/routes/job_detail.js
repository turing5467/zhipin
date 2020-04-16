var express = require('express');
var router = express.Router();
var JobDetailModel = require('./../models/JobDetailModel');

/* GET home page. */
router.get('/getJobDetail', function(req, res, next) {
    let {code} = req.query
    JobDetailModel.find({code}).then(data => {
        res.send({status:0,data:data[0]})  
    })

});

const pageSize = 20;
router.get('/getJobList', (req, res, next) => {
    
    let condition = req.query.condition?JSON.parse(req.query.condition) : {};
    const page = req.query.page || 1;
    console.log(typeof condition);
    
    JobDetailModel.find(condition).then(data => {
        JobDetailModel.find(condition).skip((page-1)*pageSize).limit(pageSize)
        .then(list => {
            res.send({status: 0, list , total: data.length})
        })
        .catch(err => {
            res.send({status: -1, msg: '获取职位列表异常, 请重新尝试',err})
        })
    }).catch(err => {
        res.send({status: -1, msg: '获取职位列表异常, 请重新尝试',err})
    })
})


module.exports = router;
