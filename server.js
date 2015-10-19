var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.end("Hello world");
});

app.listen(process.env.PORT || 3000, function(){
  console.log('Server is listening on port', process.env.PORT || 3000);
});
