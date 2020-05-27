var {resumeMulter, avatarMulter} = require('../public/multerUtil')
var express = require('express');
var router = express.Router();

var resumeUploader = resumeMulter.single('resume');
var avatarUploader = avatarMulter.single('avatar');

let dataInput = function(uploader, type) {
    return function (req, res) {
        uploader(req, res, function (err) {
            //添加错误处理
            if (err) {
                res.send({err, status: -1})
                return;
            }
            res.send({status: 0})
        });
    }
}



router.post('/uploadResume', dataInput(resumeUploader, 'resume'))
router.post('/uploadAvatar', dataInput(avatarUploader, 'avatar'))

module.exports = router;