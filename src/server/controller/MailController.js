const Mongoose = require('../../class/Mongoose');

class MailController {

    index(req, res) {

        const mongoose = new Mongoose();
        mongoose.initDb();

        const mails = mongoose.findDb( (err, mail) => {

            res.render('mails.ejs', { mail: mail });

        });

    }

}

module.exports = MailController;