const  multer = require('multer');
let userDetailModel = require('../models/userDetailModel')
var fs = require('fs');
var path = require('path');

let baseURL = 'http://172.20.10.4:3000/upload/'
const resumeStorage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
  destination: function (req, file, cb) {
    cb(null, __dirname+'/upload/resume')
  },
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    let {phone} = req.body;
    let fileType = (file.originalname).split('.')[1]
    let fileFormat = phone + '.' +fileType;
    
    fs.readdir(path.join(__dirname, '/upload/resume'), (err, files) => {
      let filename = files.find(ele => ele.startsWith(phone));
      if(filename) {
        let pathname = path.join(__dirname, '/upload/resume/'+filename)
        console.log(pathname);
        
        fs.unlink(pathname, err => {
          !err && cb(null, fileFormat)
        });
      }else {
        cb(null, fileFormat);
      }
    })

    
  }
});

const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/upload/avatar')
  },
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    let {phone} = req.body;
    
    let fileType = (file.originalname).split('.')[1]
    let fileFormat = phone + '.' +fileType;
    cb(null, fileFormat);
    //路径/名称存入数据库
    userDetailModel.updateOne({phone}, {avatar: baseURL+'/avatar/'+fileFormat}, (err)=> {
      if(!err)
        console.log('no err');
    });

    
  }
});

const resumeMulter = multer({storage: resumeStorage});
const avatarMulter = multer({storage: avatarStorage});

module.exports = {resumeMulter, avatarMulter};