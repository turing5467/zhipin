var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel')
var userDetailModel = require('../models/userDetailModel')
var ObjectID = require('mongodb').ObjectID;


//添加用户 =>注册
router.get('/addUser', function(req, res, next) {
    let {phone} = req.query;
    
    userModel.find({phone}).then(data => {
        //已注册
        if(data[0]) {
            res.send({user:data[0] , status: -1})
        }else {
            userModel.insertMany({phone, pwd:''}, (err, doc) => {
                if(!err) {
                    userDetailModel.insertMany({userId: doc._id, phone})
                    res.send({user:doc, status: 0})
                }
            })
        }
    }).catch(err => {
        console.log(err);
    })
    
});
//登录校验
router.get('/getUserByPhone', (req, res) => {
    let {phone, pwd} = req.query;
    userModel.find({phone}).then(data => {
        if(data[0]) {
            //密码正确
            if(pwd !== '' && pwd === data[0].pwd) {
                res.send({user:data[0], status: 0})
            //验证码登录
            }else if(pwd === '') {
                res.send({user:data[0], status: 0})
            //密码错误
            }else {
                res.send({status: -2})
            }
        }else {
            //未注册
            res.send({status: -1})
        }
    })
})

router.get('/getUserById', (req, res) => {
    let {id} = req.query;
    userModel.find({_id: ObjectID(id)}).then(data => {
        if(data[0]) {
            res.send({user: data[0], status: 0})
        }else {
            //未注册
            res.send({status: -1})
        }
    })
})

router.post('/updateUserById', (req, res) => {
    let {id, pwd} = req.body;
    userModel.update({_id: ObjectID(id)}, {$set: {pwd}}, (err, raw) => {
        if(!err) {
            res.send({status: 0, raw})
        }
    })
})

module.exports = router;
