
const mongoose = require('mongoose');

const config = require('config-yml');


class Mongoose {

	constructor() {

		this.dbSchema = new mongoose.Schema({

		 id: String,
		 mail: String,

		});

		// modem
		this.dbModel = mongoose.model('emails', this.dbSchema);

		// On crée une instance du Model
		this.newEmail = new this.dbModel({ mail: 'test@yaha.fr'});

	}


	initDb() {

		mongoose.connect(`mongodb://${config.default.db.ip_address}:${config.default.db.port}/${config.default.db.dbname}`, function(err) {
		   if (err) { throw err; }
		});

		console.log('azertyu');
		

	}

	saveDb(newEmail) {

		
		this.newEmail.save(err => {

			if (err) { throw err; }

   			console.log('email ajouté avec succès !');


		});

	}

	findDb(dbModel) {

		this.dbModel.find(null, (err, mail) => {

  			if (err) { throw err ; }



  		console.log(mail);

		});
	}




}



module.exports = Mongoose;





