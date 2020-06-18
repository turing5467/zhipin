var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')

/* GET home page. */
router.get('/downloadResume', function(req, res, next) {
    let {phone} = req.query;
    // console.log(__dirname);
    
    fs.readdir(path.join(__dirname, '../public/upload/resume'), (err, files) => {
        
        let filename = files.find(ele => ele.startsWith(phone));
        // let pathname = path.join(__dirname, '../public/upload/resume/'+filename)
        let url = 'http://192.168.0.2:3000/upload/resume/' + filename;
        console.log(url);
        
        res.send(url)
        // res.set({
        //     "Content-Type":"application/msword",//告诉浏览器这是一个二进制文件
        //     "Content-Disposition":`attachment; filename=${filename}`//告诉浏览器这是一个需要下载的文件
        // });
        // res.download(pathname)
        // fs.createReadStream(pathname).pipe(res);
    })

});

module.exports = router;
