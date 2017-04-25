const Mongoose = require('../../class/Mongoose');

class MailController {

    static index(req, res) {

        const mongoose = new Mongoose();
        mongoose.initDb();

        const mails = mongoose.findDb( (err, mail) => {

            res.render('mails.ejs', {mails: mails});
        });

    }

}

module.exports = MailController;