var express = require('express');
var router = express.Router();
var { formidable } = require('formidable');
var path = require('path')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/portrait', (req, res, next) => {
  res.render('portrait');
})

router.post('/portrait', (req, res, next) => {
  const form = formidable({
    multiples: true,
    // 设置上传文件的保存目录
    uploadDir: path.resolve(__dirname, '../public/images'),
    // 保持文件后缀
    keepExtensions: true
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    console.log(files.portrait[0].newFilename);
    // 服务器保存该图片的访问 url
    let url = '/images/' + files.portrait[0].newFilename;
    res.send(url);
  });
})

module.exports = router;
