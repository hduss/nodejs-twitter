// import
var Twitter = require('node-tweet-stream');
var yaml = require('config-yml');
var fs   = require('fs');

// configuration file
var configPath = '/config.test.yml';

// Get document, or throw exception on error
try {
    var doc = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));

    console.log(doc);

} catch (e) {

    console.log(e);

}



t = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    token: '',
    token_secret: ''
  });

t.on('tweet', (tweet) => {

  console.log('tweet received', tweet);

});
