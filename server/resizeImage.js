/*const router = require('express').Router();
const sharp = require('sharp');*/
const request = require('request');
const imageHash = require('image-hash');
const Cache = require('streaming-cache');
const gm = require('gm').subClass({imageMagick: true});;

const cache = new Cache();

module.exports.resize = function(event, context, callback) {
  const response = {
    statusCode: 200
  };
  var url = 'https://images.pexels.com/photos/87840/daisy-pollen-flower-nature-87840.jpeg?cs=srgb&dl=bloom-blossom-close-up-87840.jpg';
  imageHash(url, 16, true, (err, data)=>{
<<<<<<< Updated upstream
    if(err) console.log(err);
    cache.get(data) ?
      cache.get(data).pipe(res):
      request
        .get(url, (err)=>{
          if(err) res.status(404).send('Wrong url provided');
        })
        .on('response', (response)=>{
          resize(response, data, res);
        });
=======
    var hash = err ? 'else' : data;
    request.get(url, (err)=>{
      if(err) {
        response = {
          statusCode: 404,
          body: JSON.stringify({ "message": "Wrong url provided" })
        };
      }
      callback(null, response);
    })
    .on('response', (res) => {
      var img = gm(res)
      .resize('640', '480')
      .toBuffer('PNG',function (err, buffer) {
        buffer.toString('base64');
        response = {
          statusCode: 200,
          isBase64Encoded: true,
          headers:
          {
            “Content-Type”: “image/png”
          },
          body: img
        }
      });
      //resize(res, hash);
    });
    callback(null, response);
>>>>>>> Stashed changes
  });

};

/*function resize(stream, hash){
  var Sharp = sharp();
  return Sharp.metadata()
  .then(info=>{
    if(info.width < 640 || info.height < 480){
      return {
        statusCode: 422,
        body: JSON.stringify({ "message": `Image is too small to be converted to 640x480; Width: ${info.width} and height: ${info.height}` })
      };
    } else {
      let mimeType = stream.headers['content-type'];
      res.type(mimeType);
      Sharp.resize(640, 480);
      stream.pipe(Sharp).pipe(cache.set(hash));
      return {
        statusCode: 200,

      }
    }
  });
  stream.pipe(Sharp);
}
*/
