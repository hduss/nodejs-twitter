// import


var Twitter = require('node-tweet-stream');
var fs = require('fs');


t = new Twitter({

    consumer_key: 'eGCunHb3MgjLiqJ32vPyjzqDy',
    consumer_secret: 's0xd6egFQDdE5jLURyBnoFHybDzxJKbZtbEXtk8Jey2JjSSleq',
    token: '798784794150588416-jfqoFhOAYXrJglKZmJYPY3dhhYHPhmF',
    token_secret: 'FGnxrqqDcMPukWMOEiSFNnpTK7ZHsdmXaq2F7UqCvjbfP'
  });


t.on('tweet', (tweet) => {

  console.log(tweet);

});



t.on('error', (err) => {

  console.log('Oh no');

});




t.track('nodejs');


