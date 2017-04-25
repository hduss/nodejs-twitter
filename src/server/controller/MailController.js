
const Mongoose = require('../../class/Mongoose');

class MailController {

    static index(req, res) {

    	const mongoose = Mongoose.getInstance();

    	mongoose.initDb();

        mongoose.findDb( (err, mail) => {

            res.render('mails.ejs', { mail: mail });

            mongoose.close();

        });

    }

}

module.exports = MailController;