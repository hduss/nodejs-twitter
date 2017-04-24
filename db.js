
const mongoose = require('mongoose');

const config = require('config-yml');

// ouverture de la connection
mongoose.connect(`mongodb://${config.default.db.ip_address}:${config.default.db.port}/${config.default.db.dbname}`, function(err) {
   if (err) { throw err; }
});

// création du schéma
const dbSchema = new mongoose.Schema({
   id: String,
   mail: String,
});

// modem
const dbModel = mongoose.model('emails', dbSchema);

// On crée une instance du Model
const newEmail = new dbModel({ mail: 'test@yaha.fr'});

// On le sauvegarde dans MongoDB !
newEmail.save(function (err) {

   if (err) { throw err; }

   console.log('email ajouté avec succès !');



});


// on fait une recherche sur model dbModel
dbModel.find(null, (err, mail) => {

  if (err) { throw err; 

  }

  console.log(mail);

});


