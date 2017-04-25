const Server = require('./server/server');
const path = require('path');
const MailController = require('./server/controller/MailController');

// create server instance
server = new Server();

// set view directory
server.set('views', path.join(__dirname, '/server/views/'));

// add route mail example
/*
server.addRoute('/mails', (req, res) => {
   const Mail = new MailController();
   Mail.index(req,res);
});
*/
server.addRoute('/mails', MailController.index);

// start server
server.start();

