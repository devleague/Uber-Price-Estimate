var express = require('express');
var app = express();

app.use(express.static('./public'));


app.listen(process.env.PORT || 3000, function(){
  console.log('Server is listening on port', process.env.PORT || 3000);
});
