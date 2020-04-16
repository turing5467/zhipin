const  multer = require('multer');
const storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
  destination: function (req, file, cb) {
    cb(null, __dirname+'/upload/resume')
  },
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    let {userId} = req.body;
    let fileType = (file.originalname).split('.').unshift()
    let fileFormat = userId + '.' +fileType;
    cb(null, fileFormat)
  }
});

const upload = multer({
    storage: storage
});

module.exports = upload;