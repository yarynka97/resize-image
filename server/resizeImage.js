
const sharp = require('sharp');
const request = require('request').defaults({ encoding: null });

module.exports.resize = function(event, context, callback) {
  const response = {
    statusCode: 200
  };

  var url = 'https://images.pexels.com/photos/87840/daisy-pollen-flower-nature-87840.jpeg?cs=srgb&dl=bloom-blossom-close-up-87840.jpg';
  request(url, async (err, response, buffer) => {
    if(err) {
      response = {
        statusCode: 404,
        body: err
      } 
      callback(null, response);     
    }

    try{
        let img = await resize(buffer);
        let mimeType = response.headers['content-type'];
        response = {
          statusCode: 200,
          isBase64Encoded: true,
          headers:
          {
            “Content-Type”: mimeType
          },
          body: img
        }
        //res.type(mimeType).send(img);
      } catch (err){
        console.log(err);
        response = {
          statusCode: 404,
          body: err
        }
      }

    callback(null, response);
  });
};

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
  });
};