const express = require('express');
const app = express();

const MailController = require('./controller/MailController');



app.get('/mails', (req, res) => {

	const Mail = new MailController();

	Mail.index(req, res);

})

.listen(8080, () => console.log('connected !'));
