
const Mongoose = require('../../class/Mongoose');

class MailController {

    index(req, res) {

    	const mongoose = Mongoose.getInstance();

    	mongoose.initDb();


        const mail = mongoose.findDb( (err, mail) => {

            res.render('mails.ejs', { mail: mail });

            mongoose.close();

        });

    }

}