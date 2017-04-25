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

        this.dbModel = mongoose.model('emails', this.dbSchema);

	}

    /**
     * init database connection
     * @param fn function
     * @returns {Promise}
     */
	initDb() {
        const config = this._config;

        mongoose.connect(`mongodb://${config.default.db.ip_address}:${config.default.db.port}/${config.default.db.dbname}`, function (err) {
            if (err) {

                throw new Error();


            }

        });
    }

    /**
     *
     * @param newEmail String
     */
	saveDb(newEmail) {

        // On crée une instance du Model
        this.newEmail = new this.dbModel({ mail: newEmail});

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


    close() {

        mongoose.connection.close();
    }


    static getInstance() {

        if (!this.instance) {

             this.instance = new Mongoose();

        }

        return this.instance;
    }


}

module.exports = Mongoose;





