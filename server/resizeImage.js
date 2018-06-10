const router = require('express').Router();
const sharp = require('sharp');
const request = require('request');
const imageHash = require('image-hash');
const Cache = require('streaming-cache');

const cache = new Cache();

router.get('/', (req, res) =>{
  var url = req.query.url;
  imageHash(url, 16, true, (err, data)=>{
    var hash = err ? 'else' : data;
    cache.get(hash) ?
    cache.get(hash).pipe(res) :
    request.get(url, (err)=>{
      if(err) res.status(404).send('Wrong url provided');
    })
    .on('response', (response)=>{
      resize(response, hash, res);
    });
  });
});

function resize(stream, hash, res){
  var Sharp = sharp();
  Sharp.metadata()
  .then(info=>{
    if(info.width < 640 || info.height < 480){
      res.status(422).send(`Image is too small to be converted to 640x480; Width: ${info.width} and height: ${info.height}`);
    } else {
      let mimeType = stream.headers['content-type'];
      res.type(mimeType);
      Sharp.resize(640, 480);
      stream.pipe(Sharp).pipe(cache.set(hash)).pipe(res);
    }
  });
  stream.pipe(Sharp);
}

module.exports = router;
