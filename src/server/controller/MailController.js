const Mongoose = require('../../class/Mongoose');

class MailController {

    constructor( app) {
        this._app = app;
    }

    index(req, res) {

        // session lock
        if(!req.session.login || req.session.login == 0) {
            res.send(403,"Vous devez d'abord vous connecter");
            return;
        }

    	const mongoose = Mongoose.getInstance();

    	mongoose.initDb();

        mongoose.findDb( (err, mail) => {

            res.render('mails.ejs', { mail: mail });

            mongoose.close();

        });

    }

}

module.exports = MailController;