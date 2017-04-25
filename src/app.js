const Server = require('./server/server');

// create instance
server = new Server();

// add route mail example
server.addRoute('/mails', (req, res) => {
   console.log('reached');
});

// start server
server.start();

