const YAML = require('yamljs');
const Mongoose = require('../../class/Mongoose');

class MailController {

    static index(req, res) {

        // load config
        const config = YAML.load('config.yml');

        // start instance
        const mongoose = new Mongoose(config);

        // init db then search mails
        mongoose.initDb( () => {

            const mails = mongoose.findDb( (err, mail) => {
                res.render('mails.ejs', {mails: mail});
            });

        });
    }
}

module.exports = MailController;