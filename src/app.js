const Server = require('./server/server');
const Mongoose = require('./class/Mongoose');
const path = require('path');
const MailController = require('./server/controller/MailController');

// create server instance
server = new Server();

// set view directory
server.set('views', path.join(__dirname, '/server/views/'));

// add route mail example
server.addRoute('/mails', (req, res) => {
   const Mail = new MailController();
   Mail.index(req,res);
});

// start server
server.start();

<<<<<<< 3f2a61a30752fbc0ba3b14af53709eca17b3755e


=======
>>>>>>> set server
