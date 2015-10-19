var router = require('express').Router();

router.get('/estimates', function(req, res){
  res.json({hello: 'world'});
});

module.exports = router;
