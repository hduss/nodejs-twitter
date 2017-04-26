const path = require('path');
const SocketIO = require('socket.io');
const bodyParser = require('body-parser');
const Server = require('./server/server');
const session = require('express-session');
const Mongoose = require('./class/Mongoose');
const MailController = require('./server/controller/MailController');
const TweetController = require('./server/controller/TweetController');
const RegistrationController = require('./server/controller/RegistrationController');

// create server instance
server = new Server();

// Chargement de socket.io
const io = SocketIO(server.getHttpServer());

// add io to express
server.set('io', io);

// set view directory
server.set('views', path.join(__dirname, '/server/views/'));

// use bodyparser middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

// use session middleware
server.use(session({secret:'secret', cookie: { maxAge: 60000 }}));

// add route mail
const m = new MailController( server.getApp());
server.get('/mails', m.index );

// add route tweet tracking
const t = new TweetController( server.getApp());
server.get('/tweet/:keyword', t.track );

// add route to user registration
const r = new RegistrationController( server.getApp());
server.get('/registration', r.index );
server.post('/registration', r.index );

// add route to user detail
server.get('/user/:pseudo', r.detail);

// add route to user login
server.get('/login', r.login );
server.post('/login', r.login );

// start server
server.start();