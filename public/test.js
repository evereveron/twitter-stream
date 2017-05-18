var tweets = $('#tweets-container ul');
console.log('$$$$$', tweets);
tweets.html('<li>loading :)</li>');

/*
//populate tweets list
getAjax('https://localhost:8080/api/tweets', function(data){
	//console.log('*******', data);
	var json = JSON.parse(data),
	 arr = [];
	 console.log('*****', json)
	json.statuses.forEach(function(element) {
		console.log('&&&', element);
		arr.push('<li>' +
			'<a href="https://twitter.com/statuses/' + element.id_str + '">' + element.text + '</a>' +
		'</li>');
	});

	tweets.html(arr.join(''));
});
*/
$.ajax({
  url: 'https://localhost:8080/api/tweets',
  cache: false,
  success: function(json){
  	 var arr = [];
  	 console.log('*****', json)
  	json.statuses.forEach(function(element) {
  		console.log('&&&', element);
  		arr.push('<li>' +
  			//'<a href="https://twitter.com/statuses/' + element.id_str + '">' + element.text + '</a>' +
			'<span class="data">' + element.created_at + '</span> <span>'+element.text+'</span>' +
  		'</li>');
  	});

  	tweets.html(arr.join(''));
  }
});

$('#search-btn').click(function() {
	var search = $('#filter').val();
	console.log(search);
	$.ajax({
	  url: 'https://localhost:8080/api/tweets/' + search,
	  cache: false,
	  success: function(json){
	  	 var arr = [];
	  	 console.log('*****', json)
	  	json.statuses.forEach(function(element) {
	  		console.log('&&&', element);
	  		arr.push('<li>' +
	  			//'<a href="https://twitter.com/statuses/' + element.id_str + '">' + element.text + '</a>' +
				'<span class="date">' + element.created_at + '</span> <span class="tweet-text">'+element.text+'</span>' +
	  		'</li>');
	  	});

	  	tweets.html(arr.join(''));
	  }
	});
})
