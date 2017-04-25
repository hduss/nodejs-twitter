const express = require('express');

// class server
class Server {

    /**
     * constructor
     */
	constructor(){
	    this._app = express();
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
     * add route
     * @param url String
     * @param controller controller class
     */
    addRoute(url, controller) {
	    this._app.get(url, controller);
    }

    /**
     * start server
     * @param port integer
     */
    start(port = 3000) {
	    return this._app.listen(port, () => console.log('listening on port ' + port));
    }
}

// export
module.exports = Server;
