const Server = require('./server/server');
const Mongoose = require('./class/Mongoose');

// create mongoose instance
mongoose = new Mongoose();

// create server instance
server = new Server();

// add route mail example
server.addRoute('/mails', (req, res) => {
   console.log('reached');
});

// start mongoose
mongoose.initDb( () => server.start() );


