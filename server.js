const express = require('express');
const app = express();



app.get('/mails', (req, res) => {

	res.render('mails.ejs');

})











.listen(8080, () => console.log('connected !'));
