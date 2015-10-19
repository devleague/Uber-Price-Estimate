var router = require('express').Router();
var request = require('request');
var uberApiUrl = 'https://sandbox-api.uber.com/v1/';
var uberServerToken = process.env.UBER_SERVER_TOKEN;

router.get('/estimates/price', function(req, res){
  var source = JSON.parse(req.query.source);
  var destination = JSON.parse(req.query.destination);
  // create http request to uber api
  request.get({
    url : uberApiUrl + 'estimates/price',
    qs : {
      server_token : uberServerToken,
      start_latitude : source.lat,
      start_longitude : source.lng,
      end_latitude : destination.lat,
      end_longitude : destination.lng
    }
  }, function(err, response, body){
    if(err){
      return res.json(err);
    }
    res.json(body);
  });
});

module.exports = router;
