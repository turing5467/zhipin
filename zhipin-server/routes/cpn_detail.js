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

module.exports = router;
