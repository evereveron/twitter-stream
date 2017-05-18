var https = require('https'),
 Twit = require('twit'),
 fs = require('fs'),
 express = require('express'),
 expressLayouts = require('express-ejs-layouts'),
 bodyParser     = require('body-parser'),
 app            = express(),
 port           = process.env.PORT ||8080;

 https.createServer({
       key: fs.readFileSync('key.pem'),
       cert: fs.readFileSync('cert.pem')
   }, app).listen(port, function() {
	   console.log('app started on port ' + port);
   });

// use ejs and express layouts
app.set('view engine', 'ejs');

// route our app
var router = require('./app/routes');
app.use('/', router);

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// set static files (css and images, etc) location
app.use(express.static(__dirname + '/public'));


/*// start the server
app.listen(port, function() {
  console.log('app started on port ' + port);
});*/
