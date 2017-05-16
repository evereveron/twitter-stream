// require express
var express = require('express');
var path    = require('path');

// create our router object
var router = express.Router();

// export our router
module.exports = router;

// route for our homepage
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/bundle.json', function(req,res) {
	res.send(JSON.stringify({
	  "applications": [
	    {
	      "type": "sandbox",
	      "id": "twitter",
	      "name": "Hello World",
	      "blurb": "This is a hello world app with a few example extension API invocations!",
	      "publisher": "Symphony",
	      "url": "https://localhost:8080/index.html",
	      "domain": "localhost"
	    }
	  ]
	}
))
})
