// import


var Twitter = require('node-tweet-stream');
var fs = require('fs');


t = new Twitter({
    consumer_key: 'ezgfregregh',
    consumer_secret: 'erqghhrthryjj',
    token: 'rjtyrjtykjrszj',
    token_secret: 'srtjtykjtykutyk'
  });



t.on('tweet', (tweet) => {

  console.log(`Twet received -> ${tweet})`;

});



t.on('error', (err) => {

  console.log('Oh no');

});
