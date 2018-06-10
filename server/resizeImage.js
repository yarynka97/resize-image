const router = require('express').Router();
const Jimp = require('jimp');
const sharp = require('sharp');
var request = require('request');

router.get('/', (req, res) =>{
  var url = req.query.url;
  request
    .get(url, (err)=>{
      if(err) res.status(404).send('Wrong url provided');
    })
    .on('response', (response)=>{
      let mimeType = response.headers['content-type'];
        res.type(mimeType);
        resizeImage(response).pipe(res);
    });
});

function resizeImage (stream) {
  let Sharp = sharp();
  Sharp.resize(640,480);
  return stream.pipe(Sharp);
}

module.exports = router;
