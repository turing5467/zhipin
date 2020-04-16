var express = require('express');
var router = express.Router();
var userDetailModel = require('../models/userDetailModel')


router.get('/getDetailByPhone', (req, res) => {
    let {phone} = req.query;
    userDetailModel.find({phone}).then(data => {
        if(data[0]){
            res.send({user: data[0], status: 0})
        }
    })
})

router.post('/updateDetailByPhone', (req, res) => {
    let {update, phone} = req.body
    
    userDetailModel.update({phone}, {$set: update},  (err, doc) => {
        if(!err) {
            res.send(doc);
        }
    })
})

module.exports = router;
