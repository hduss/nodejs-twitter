const express = require('express');
const http = require('http');

// class server
class Server {

    /**
     * constructor
     */
	constructor(){
	    this._app = express();
	    this._server = http.createServer( this._app);
	    this._controllers= [];
    }

    /**
     * set express variable
     * @param variable string
     * @param middleware function
     */
    set(variable, middleware){
        this._app.set(variable, middleware);
    }

    /**
     * use middleware on app
     * @param middleware middleware function
     */
    use(middleware){
        this._app.use(middleware);
    }

    /**
     * add route with method get
     * @param url String
     * @param controller controller method
     */
    get(url, controllerAction) {
	    this._app.get(url, controllerAction);
    }

    /**
     * add route with method post
     * @param url String
     * @param controller controller method
     */
    post(url, controllerAction) {
        this._app.post(url, controllerAction);
    }

    /**
     * start server
     * @param port integer
     */
    start(port = 3000) {
	    return this._server.listen(port, () => console.log('listening on port ' + port));
    }

    /**
     * getter
     * @returns HttpServer
     */
    getHttpServer(){
        return this._server;
    }

    /**
     * getter
     * @returns Express app
     */
    getApp(){
        return this._app;
    }
}

// export
module.exports = Server;
