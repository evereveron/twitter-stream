var http = require('http'),
 Twit = require('twit');

/*var server = http.createServer(function(req, res) {
res.writeHead(200);
res.render('index.html');
});
server.listen(8080);*/

var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var bodyParser     = require('body-parser');
var app            = express();
var port           = process.env.PORT || 8080;

// use ejs and express layouts
app.set('view engine', 'ejs');

// route our app
var router = require('./app/routes');
app.use('/', router);


// set static files (css and images, etc) location
app.use(express.static(__dirname + '/public'));

// start the server
app.listen(port, function() {
  console.log('app started');
});
/*
var T = new Twit({
	   consumer_key : "RKzNDwobmPyrlmfZs74kJPJmf",
	   consumer_secret : "GzwRrwO3GPNkFCXjWFRfesdR1D9KZyVEK2MQ8FgiCdx915HBDL",
	   access_token : "4087670987-XfeAvQkhEWPTMpSunhHgdU5fzQjTjwS6KgpoJF8",
	   access_token_secret : "tnyKYtwLwltDPz8TXcrDsE0cABIZyqrgCyQAL92T2LBsH"
   });

console.log("blah blah blah blah")
//
//  stream a sample of public statuses
//
var stream = T.stream('statuses/sample')

stream.on('tweet', function (tweet) {
 console.log(tweet)
})
*/
