// import
const config = require('config-yml');
const ArgumentParser   = require('argparse').ArgumentParser;

// init arguments parser
const parser = new ArgumentParser({
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
const args = parser.parseArgs();

// keywords argument is mandatory
const( !args.key_words) {
    console.warn('No keywords provided, please use -k + keyword1,keywords2');
    process.exit(0);
}

// read keywords
const keywords = args.key_words.split(',');

// read configuration data
const consumer_key = config.default.api.twitter.consumer_key;
const consumer_secret= config.default.api.twitter.consumer_secret;
const access_token_key= config.default.api.twitter.access_token_key;
const access_token_secret= config.default.api.twitter.access_token_secret;
