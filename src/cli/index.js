// import
const YAML = require('yamljs');
const ArgumentParser   = require('argparse').ArgumentParser;
const Twitter = require('../class/twitter.class');

//load Mongoose class
const Mongoose = require('../class/Mongoose');



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
if( !args.key_words) {
    console.warn('No keywords provided, please use -k + keyword1,keywords2');
    process.exit(0);
}

const config = YAML.load('config.yml');

// read keywords
const keywords = args.key_words.split(',');

// read configuration data
const consumer_key = config.default.api.twitter.consumer_key;
const consumer_secret= config.default.api.twitter.consumer_secret;
const access_token_key= config.default.api.twitter.access_token_key;
const access_token_secret= config.default.api.twitter.access_token_secret;

// init twitter
const t = new Twitter(consumer_key, consumer_secret, access_token_key, access_token_secret);

// init db instance
const database = new Mongoose();

// regex pour recuperer les adresses mail
const re = new RegExp(/(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})/gi);

// on receiving tweet
t.setTweetCallback( tweet => {

    if(tweet.user.description) {

        // on rentre les resultats de la recherche regex dans un tableau
        const arrMatches = tweet.user.description.match(re);
        console.log(tweet.id + ' => ' + arrMatches);

        if (arrMatches) {
           database.saveDb(arrMatches);
        }
    }

});

// init db connection
database.initDb( () => {

    
});

// starts looking for tweets
keywords.map(word => t.startTrack(word));