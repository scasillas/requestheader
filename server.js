// server.js
// where your node app starts

// init project
const express = require('express');
var app = express();

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	var lang = req.headers["accept-language"].split(',')[0];
	var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
  var regexp = /\(([^)]+)\)/;
  var os = regexp.exec(req.headers['user-agent'])[1];
	res.render('index.ejs', {user: 
                           {
                              ipaddress: ip,
                              language: lang,
                              software: os
                            }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
