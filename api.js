var router = require('express').Router();
var request = require('request');
var OAuth2 = require('oauth').OAuth2;
var uberApiUrl = 'https://sandbox-api.uber.com/v1/';
var uberServerToken = process.env.UBER_SERVER_TOKEN;
var uberClientID = process.env.UBER_CLIENT_ID;
var uberClientSecret = process.env.UBER_CLIENT_SECRET;
var serverUrl = 'http://localhost:' + ( process.env.PORT || 3000 );
var oauth2 = new OAuth2(
    uberClientID,
    uberClientSecret,
    'https://login.uber.com/',
    'oauth/authorize',
    'oauth/token',
    null);

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

router.post('/get_ride', function(req, res){
  if( !req.body.hasOwnProperty('auth_token') ){
    return res.json({
      success : false,
      code : 401,
      popupUrl : getAuthorizeUrl()
    });
  }

  var uberRequest = {
    start_latitude : req.body.source.lat,
    start_longitude : req.body.source.lng,
    end_latitude : req.body.destination.lat,
    end_longitude : req.body.destination.lng,
    product_id : req.body.product_id
  };

  // create http request to uber api
  request.post({
    url : uberApiUrl + 'estimates/price',
    json : uberRequest,
    auth : {
      bearer : req.body.auth_token
    }
  }, function(err, response, body){
    if(err){
      return res.json(err);
    }
    res.json(body);
  });

});

// from redirect after auth
router.get('/oauth/cb', function(req, res){
  var code = req.query.code;

  oauth2.getOAuthAccessToken(
    code,
    { // NOT IN THE UBER DOCS
      grant_type: 'authorization_code',
      redirect_uri: serverUrl+'/api/oauth/cb'
    },
    function (err, access_token, refresh_token, results){
      if(err){
        console.log(err);
        if(err.data){
          res.end(err.data);
        }else{
          res.json(err);
        }
      } else if(results.error) {
        console.log(results.error);
        res.json(results.error);
      } else {
        // got token, send back to client
        console.log('bearer: ',access_token);
        res.json({
          success : true,
          access_token : access_token
        });
      }
    });
});


function getAuthorizeUrl(){
  return oauth2.getAuthorizeUrl({
      redirect_uri: serverUrl + '/api/oauth/cb',
      scope: ['request'],
      state: 'authorizing',
      response_type: 'code'
    });
}


module.exports = router;
