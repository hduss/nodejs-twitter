// import
var config = require('config-yml');
var ArgumentParser   = require('argparse').ArgumentParser;

// init arguments parser
var parser = new ArgumentParser({
    version: '0.0.1',
    addHelp:true,
    description: 'Argparse example'
});

// add parameter "keywords"
parser.addArgument(
    [ '-k', '--key-words' ],
    {
        help: 'tweeter key words'
    }
);

// read args
var args = parser.parseArgs();
console.dir(args);

// keywords argument is mandatory
if( !args.key_words) {
    console.warn('No keywords provided, please use -k + keyword1,keywords2');
    process.exit(0);
}

// read keywords
var keywords = args.key_words.split(',');

// read configuration data
var consumer_key = config.default.api.twitter.consumer_key;
var consumer_secret= config.default.api.twitter.consumer_secret;
var access_token_key= config.default.api.twitter.access_token_key;
var access_token_secret= config.default.api.twitter.access_token_secret;

