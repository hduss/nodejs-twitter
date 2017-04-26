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

        const mailSchema = new mongoose.Schema({
            id: String,
            mail: String,
        });

        this.mailModel = mongoose.model('emails', mailSchema);

        const userSchema = new mongoose.Schema({
            id: String,
            pseudo: String,
            mdp: String,
        });

        this.userModel = mongoose.model('user', userSchema);
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

                throw new Error(err);


            }

        });
    }

    /**
     *
     * @param newEmail String
     */
	saveDb(mail) {

        // On crée une instance du Model
        const newEmail = new this.mailModel({ mail: mail});

		newEmail.save(err => {
			if (err) { throw err; }
   			console.log('email ajouté avec succès !');
		});

	}

    /**
     * save user
     * @param pseudo string
     * @param mdp string
     */
    saveUser(pseudo, mdp) {

        // On crée une instance du Model
        const newUser = new this.userModel({ pseudo: pseudo, mdp: mdp});

        newUser.save(err => {
            if (err) { throw err; }
            console.log('user ajouté avec succès !');
        });
    }

    /**
     * get a user by pseudo
     * @param pseudo string
     * @param fn function
     */
    getUser(pseudo,fn){
        this.userModel.findOne({'pseudo':pseudo}, (err, mail) => fn(err,mail));
    }

    /**
     *
     * @param fn function
     */
	findDb(fn) {

		this.mailModel.find(null, (err, mail) => fn(err,mail));
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





