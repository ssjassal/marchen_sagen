//=====================================
//-----Required Module & Variables-----
//=====================================
var express = require('express');
var app = express();
var port = 8000 || process.env.PORT;

//=========================
//---------App Use---------
//=========================
app.use(express.static('public'));

//==========================
//-------App Listener-------
//==========================
app.listen(port, function(){
  console.log('===========================================================');
  console.log('Marchen & Sagen App Frontend Aerver Runing on port:', port);
  console.log('===========================================================');
});
