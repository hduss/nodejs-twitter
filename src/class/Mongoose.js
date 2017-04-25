
const mongoose = require('mongoose');
const YAML = require('yamljs');

// avoid deprecated msg
//mongoose.Promise = global.promise;

// class mongoose
class Mongoose {

    /**
     * constructor
     * @Param config object
     * @Param config.default object
     * @Param config.default.db object
     * @param config.default.db.ip_address ip
     * @Param config.default.db.port integer
     * @Param config.default.db.dbname string
     */
	constructor(config) {

	    // save config
        this._config = config;

        // init schema
		this.dbSchema = new mongoose.Schema({
		    id: String,
		    mail: String,
		});

		// model
		this.dbModel = mongoose.model('emails', this.dbSchema);

		// create model instance
		this.newEmail = new this.dbModel({ mail: 'test@yaha.fr'});
	}

    /**
     * init database connection
     * @param fn function
     * @returns {Promise}
     */
	initDb(fn) {
        const config = this._config;

        mongoose.connect(`mongodb://${config.default.db.ip_address}:${config.default.db.port}/${config.default.db.dbname}`, function (err) {
            if (err) {
                throw new Error();
            }
            fn();
        });
    }

    /**
     *
     * @param newEmail String
     */
	saveDb(newEmail) {

		this.newEmail.save(err => {
			if (err) { throw err; }
   			console.log('email ajouté avec succès !');
		});

	}

    /**
     *
     * @param fn function
     */
	findDb(fn) {

		this.dbModel.find(null, (err, mail) => fn(err,mail));
	}

}

module.exports = Mongoose;





