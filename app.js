// import


const Twitter = require('node-tweet-stream');
const fs = require('fs');


const t = new Twitter({

    consumer_key: 'eGCunHb3MgjLiqJ32vPyjzqDy',
    consumer_secret: 's0xd6egFQDdE5jLURyBnoFHybDzxJKbZtbEXtk8Jey2JjSSleq',
    token: '798784794150588416-jfqoFhOAYXrJglKZmJYPY3dhhYHPhmF',
    token_secret: 'FGnxrqqDcMPukWMOEiSFNnpTK7ZHsdmXaq2F7UqCvjbfP'
  });


t.on('tweet', (tweet) => {

  //console.log(tweet);

  const re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);


	if (tweet.user.description) {

		console.log(tweet.id);


		const arrMatches = tweet.user.description.match(re);

		if (arrMatches) {

			console.log(arrMatches);
		}

	}



});



t.on('error', (err) => {

  console.log('Oh no');

});




t.track('presidentielle');







