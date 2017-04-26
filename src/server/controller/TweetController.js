const YAML = require('yamljs');
const Twitter = require('../../class/twitter.class');

class TweetController {

    constructor( app) {
        this._app = app;

        // bind method
        this.track = this.track.bind(this);
    }

    track(req, res) {

        // get param
        const keyword = req.params.keyword;

        // get io
        const io = this._app.get('io');

        // load config
        const config = YAML.load('config.yml');

        // read configuration data
        const consumer_key = config.default.api.twitter.consumer_key;
        const consumer_secret= config.default.api.twitter.consumer_secret;
        const access_token_key= config.default.api.twitter.access_token_key;
        const access_token_secret= config.default.api.twitter.access_token_secret;

        // init twitter
        const t = new Twitter(consumer_key, consumer_secret, access_token_key, access_token_secret);

        // regex pour recuperer les adresses mail
        const re = new RegExp(/(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})/gi);

        // on receiving tweet
        t.setTweetCallback( tweet => {

            if(tweet.user.description) {

                // on rentre les resultats de la recherche regex dans un tableau
                const arrMatches = tweet.user.description.match(re);
                //console.log(`${tweet.id} + ' => ' + ${arrMatches}`);
                //io.emit('msg', `${tweet.id} + ' => ' + ${arrMatches}`, {for: 'everyone'});

                if (arrMatches) {
                    io.emit('msg', arrMatches, {for: 'everyone'});
                }

            }

        });

        // start tracking
        t.startTrack(keyword);

        // rendering
        res.render('TweetTrack.ejs', {keyword:keyword});

    }

}

module.exports = TweetController;