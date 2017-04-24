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




//---------------------recup Données----------------------------+




const t = new Twitter({

    consumer_key: 'eGCunHb3MgjLiqJ32vPyjzqDy',
    consumer_secret: 's0xd6egFQDdE5jLURyBnoFHybDzxJKbZtbEXtk8Jey2JjSSleq',
    token: '798784794150588416-jfqoFhOAYXrJglKZmJYPY3dhhYHPhmF',
    token_secret: 'FGnxrqqDcMPukWMOEiSFNnpTK7ZHsdmXaq2F7UqCvjbfP'
  });


t.on('tweet', (tweet) => {

  //console.log(tweet);

  const re = new RegExp(/[a-zA-Z 0-9]+@[a-zA-Z 09]+.[a-zA-Z 09]+/);


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


keywords.map(word => t.track(word));



