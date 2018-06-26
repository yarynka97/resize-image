const router = require('express').Router();
const sharp = require('sharp');
const request = require('request').defaults({ encoding: null });
const imageHash = require('image-hash');
const Cache = require('streaming-cache');

const cache = new Cache();

router.get('/', (req, res) =>{
  var url = req.query.url;
  request(url, async (err, response, buffer) => {
    if(err) res.status(404).send('Wrong url provided');
    try{
        let img = await resize(buffer);
        let mimeType = response.headers['content-type'];
        res.type(mimeType).send(img);
      } catch (err){
        console.log(err);
        res.status(404).send(err);
      }
  });
});

async function resize (buffer){
  var img = await sharp(buffer);
  const info = await img.metadata();

  return new Promise ((resolve, reject) => {
    if(info.width < 640 || info.height < 480){
      reject(`Provided image is too small for resizing: width = ${info.width}, height = ${info.height}`);
    } else {
      img.resize(640, 480);
      resolve(img.toBuffer());
    }
  })
}


/*router.get('/', (req, res) =>{
  var url = req.query.url;
  request
    .get(url, (err)=>{
      if(err) res.status(404).send('Wrong url provided');
    })
    .on('response', async(response) => {
      try{
        let img = await resize(response);
        let mimeType = response.headers['content-type'];
        res.type(mimeType);
        img.pipe(res);
      } catch (err){
        console.log(err);
        res.status(404).send(err);
      }
  });
});

async function resize (stream){
  var Sharp = sharp();
  stream.pipe(Sharp);
  const info = await Sharp.metadata();

  return new Promise ((resolve, reject) => {
    if(info.width < 640 || info.height < 480){
      reject(`Provided image is too small for resizing: width = ${info.width}, height = ${info.height}`);
    } else {
      Sharp.resize(640, 480);
      resolve(stream.pipe(Sharp));
    }
  })
}*/

module.exports = router;
