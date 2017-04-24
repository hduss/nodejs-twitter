// import mongoose
const mongoose = require('mongoose');
const config = require('config-yml');

// init schema
const dbSchema = new mongoose.Schema({
    id: String,
    mail: String,
});

// init mongoose connection
mongoose.connect(`mongodb://${config.default.db.ip_address}:${config.default.db.port}/${config.default.db.dbname}`, function(err) {
    if (err) { throw err; }
});

// model
const dbModel = mongoose.model('emails', dbSchema);

// export saving function
module.exports = email => {

    // On crée une instance du Model
    const newEmail = new dbModel({ mail: email});

    // save
    newEmail.save(function (err) {

        if (err) { throw err; }

    });
};