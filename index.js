// import
const config = require('config-yml');
const ArgumentParser   = require('argparse').ArgumentParser;
const Twitter = require('node-tweet-stream');
const fs = require('fs');

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
console.dir(args);

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


t.on('tweet', (tweet) => {

  //console.log(tweet);


// regex pour recuperer les adresses mail
  const re = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);


    if (tweet.user.description) {

        console.log(tweet.id);

// on rentre les resultats de la recherche regex dans un tableau
        const arrMatches = tweet.user.description.match(re);

        if (arrMatches) {

            console.log(arrMatches);
        }

    }



});



t.on('error', (err) => {

  console.log('Oh no');

});


keywords.map(word => t.track(word));



