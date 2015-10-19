var express = require('express');
var app = express();
var api = require('./api');
app.use(express.static('./public'));

app.use('/api', api);

app.listen(process.env.PORT || 3000, function(){
  console.log('Server is listening on port', process.env.PORT || 3000);
});
