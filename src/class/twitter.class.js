const TwitterStream = require('node-tweet-stream');

// twitter api class
class Twitter {

    /**
     * class constructor
     *
     * @param consumer_key String
     * @param consumer_secret String
     * @param access_token_key String
     * @param access_token_secret String
     */
    constructor(consumer_key, consumer_secret, access_token_key, access_token_secret ){

        this._twitter = new TwitterStream({
            consumer_key: consumer_key,
            consumer_secret: consumer_secret,
            token: access_token_key,
            token_secret: access_token_secret
        });

        // on receiving error
        this._twitter.on('error', (err) => {
            console.log('Error');
            console.log(err);
        });
    }

    /**
     * Set twitter callback on receiving tweet
     * @param fn function
     * @returns {*}
     */
    setTweetCallback( fn) {
        return this._twitter.on('tweet', tweet => fn(tweet))
    }

    /**
     * start a tracking on a word
     * @param word string
     * @returns {*}
     */
    startTrack(word) {
        return this._twitter.track(word);
    }
}

// export
module.exports = Twitter;