// require express
var express = require('express');
var path    = require('path');
var Twit = require('twit');

// create our router object
var router = express.Router();

// export our router
module.exports = router;

var T = new Twit({
	consumer_key : "RKzNDwobmPyrlmfZs74kJPJmf",
	consumer_secret : "GzwRrwO3GPNkFCXjWFRfesdR1D9KZyVEK2MQ8FgiCdx915HBDL",
	access_token : "4087670987-XfeAvQkhEWPTMpSunhHgdU5fzQjTjwS6KgpoJF8",
	access_token_secret : "tnyKYtwLwltDPz8TXcrDsE0cABIZyqrgCyQAL92T2LBsH"
});

// route for our homepage
router.get('/', function(req, res) {
	res.render('index');

});

// route for our homepage
router.get('/controller', function(req, res) {
	res.render('pages/controller');
});

// route for our homepage
router.get('/app', function(req, res) {
	res.render('pages/app');
});

//==== API ====
router.get('/api/tweets', function(req, res) {
	T.get('search/tweets', { q: 'JPMorgan since:2017-01-01', count: 20 }, function(err, data, response) {
		res.send(data);
	});
})

router.get('/api/tweets/:search', function(req, res) {
	var search = req.params.search,
	 query = search + ' since:2017-01-01';
	console.log('** searching for ' + search)
	T.get('search/tweets', { q: query, count: 10 }, function(err, data, response) {
		res.send(data);
	});
})
