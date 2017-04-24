// import
const config = require('config-yml');
const ArgumentParser   = require('argparse').ArgumentParser;
const Twitter = require('node-tweet-stream');
const save = require('./db.js');


//load Mongoose class
const Mongoose = require('./Mongoose');

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

// read keywords
const keywords = args.key_words.split(',');

// read configuration data
const consumer_key = config.default.api.twitter.consumer_key;
const consumer_secret= config.default.api.twitter.consumer_secret;
const access_token_key= config.default.api.twitter.access_token_key;
const access_token_secret= config.default.api.twitter.access_token_secret;





//---------------------recup Données----------------------------+

const t = new Twitter({
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
    token: access_token_key,
    token_secret: access_token_secret
  });



const database = new Mongoose();






// regex pour recuperer les adresses mail
const re = new RegExp(/(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})/gi);


// on receiving tweet
t.on('tweet', tweet => {

    if(tweet.user.description) {

        // on rentre les resultats de la recherche regex dans un tableau
        const arrMatches = tweet.user.description.match(re);
        console.log(tweet.id +' => ' + arrMatches);

        if (arrMatches) {
            save(arrMatches);
        }
    }

});

t.on('error', (err) => {
    console.log('Error');
    console.log(err);
});



database.initDb();


// starts looking for tweets

keywords.map(word => t.track(word));



