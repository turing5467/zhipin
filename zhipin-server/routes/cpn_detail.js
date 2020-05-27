var express = require('express');
var router = express.Router();
var CPNDetailModel = require('./../models/CPNDetailModel');

/* GET home page. */
router.get('/getCPNDetail', function(req, res, next) {
    let {code} = req.query
    CPNDetailModel.find({code}).then(data => {
        res.send({status:0,data:data[0]})  
    })

});

const pageSize = 28;

router.get('/getCPNList', (req, res) =>{
    const {page} = req.query;
    
    CPNDetailModel.find({}).then( data => {
        CPNDetailModel.find({}).skip((page-1)*pageSize).limit(pageSize)
        .then(list => {
            res.send({status: 0, list , total: data.length})
        })
        .catch(err => {
            res.send({status: 1, msg: '获取商品列表异常, 请重新尝试'})
        })
    })
})

router.get('/getFilterCPNList', (req, res) =>{
    let  {page} = req.query;
    let condition = req.query.condition?JSON.parse(req.query.condition) : {}
    
    CPNDetailModel.find(condition).then( data => {
        CPNDetailModel.find(condition).skip((page-1)*pageSize).limit(pageSize)
        .then(list => {
            res.send({status: 0, list , total: data.length})
        })
        .catch(err => {
            res.send({status: 1, msg: '获取商品列表异常, 请重新尝试'})
        })
    })
})

module.exports = router;
