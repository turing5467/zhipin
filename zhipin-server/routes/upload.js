var uploader = require('../public/multerUtil')
var express = require('express');
var router = express.Router();

var upload = uploader.single('resume');

let dataInput = function (req, res) {
    upload(req, res, function (err) {
        //添加错误处理
        if (err) {
            res.send({err, status: -1})
            return;
        }
        res.send({status: 0})
    });
}

router.post('/uploadResume', dataInput)

module.exports = router;