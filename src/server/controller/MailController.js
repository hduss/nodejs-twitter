

const Mongoose = require('../../class/Mongoose');


class MailController {


	index(req, res) {

		console.log('zerty');

		const mongoose = new Mongoose();

		const mails = mongoose.findDb((err, mail) => {

			res.render('mails.ejs', {mails: mails});
		});
	}
	
}

module.exports = MailController;