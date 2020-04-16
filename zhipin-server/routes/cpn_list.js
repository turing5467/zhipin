var express = require('express');
var CPNListModel= require('././../models/CPNListModel');
var router = express.Router();
const pageSize = 28

router.get('/getCPNList', (req, res) =>{
    const {page} = req.query;
    
    CPNListModel.find({}).then( data => {
        CPNListModel.find({}).skip((page-1)*pageSize).limit(pageSize)
        .then(list => {
            res.send({status: 0, list , total: data.length})
        })
        .catch(err => {
            res.send({status: 1, msg: '获取商品列表异常, 请重新尝试'})
        })
    })
})

module.exports = router;