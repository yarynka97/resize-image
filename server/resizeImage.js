const router = require('express').Router();

router.get('/:imageUrl', (req, res) =>{
  console.log(req.params.imageUrl);
  res.send('api works! URL = ' + req.params.imageUrl);
});

module.exports = router;
