const router = require('express').Router();
const Jimp = require('jimp');
const sharp = require('sharp');
const request = require('request');

router.get('/', (req, res) =>{
  var url = req.query.url;
  request
    .get(url, (err)=>{
      if(err) res.status(404).send('Wrong url provided');
    })
    .on('response', (response)=>{
      var Sharp = sharp();
      Sharp.metadata()
      .then(info=>{
        if(info.width < 640 || info.height < 480){
          res.status(422).send(`Image is too small to be converted to 640x480; Width: ${info.width} and height: ${info.height}`);
        } else {
          let mimeType = response.headers['content-type'];
          res.type(mimeType);
          Sharp.resize(640, 480);
          response.pipe(Sharp).pipe(res);
        }
      });
      response.pipe(Sharp);
    });
});

module.exports = router;
