var router = require('express').Router();

router.get('/estimates', function(req, res){
  console.log(req.query);
  res.json({hello: 'world'});
});

module.exports = router;
