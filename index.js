// import
var Twitter = require('twitter');
var yaml = require('js-yaml');
var fs   = require('fs');

// configuration file
var configPath = './config.test.yml';

// Get document, or throw exception on error
try {
    var doc = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
    console.log(doc);
} catch (e) {
    console.log(e);
}

var client = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
});
