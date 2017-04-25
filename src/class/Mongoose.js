const mongoose = require('mongoose');
const YAML = require('yamljs');

// avoid deprecated msg
//mongoose.Promise = global.promise;

// class mongoose
class Mongoose {

    /**
     * constructor
     */
	constructor() {

        // load config
        this._config = YAML.load('config.yml');

		this.dbSchema = new mongoose.Schema({

		 id: String,
		 mail: String,

		});

		// modem
		this.dbModel = mongoose.model('emails', this.dbSchema);

		// On crée une instance du Model
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
     * @param dbModel
     */
	findDb(dbModel) {

		this.dbModel.find(null, (err, mail) => {

  			if (err) { throw err ; }

  		    console.log(mail);

		});
	}

}

module.exports = Mongoose;





