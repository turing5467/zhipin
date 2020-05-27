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

router.post('/addOneContactToChat', (req,res) => {
    let {phone, chatInfo: info} = req.body;
    // console.log(chatInfo);
    userDetailModel.findOne({phone}).then(doc => {
        let chatInfo = doc.chatInfo || [];
        if(chatInfo.find(ele => ele.chatJob && (ele.chatJob.code === info.chatJob.code))) {
            res.send({status: -1, msg: ''})
        }else{
            chatInfo.push({...info, chatHistory: []})
            userDetailModel.updateOne({phone}, {chatInfo}).then(data => {
                res.send({status: 0, data})
            })
        }
    })
})

module.exports = router;
