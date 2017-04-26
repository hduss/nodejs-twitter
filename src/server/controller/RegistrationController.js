const YAML = require('yamljs');
const Mongoose = require('../../class/Mongoose');

class RegistrationController {

    constructor(app) {
        this._app = app;

    }

    index(req, res){

        let pseudo = "";

        // get form data
        if(req.body.pseudo) {
            pseudo = req.body.pseudo;
            const mdp = req.body.mdp;

            // save in bdd
            const mongoose = Mongoose.getInstance();

            mongoose.initDb();

            mongoose.saveUser(pseudo, mdp);
        }

        // render view
        res.render('RegistrationIndex.ejs', {
            pseudo: pseudo
        });
    }

    detail(req, res){

        // get params
        const pseudo = req.params.pseudo;
        const sessionState = req.session.login || 0;

        // read bdd
        const mongoose = Mongoose.getInstance();

        mongoose.initDb();

        mongoose.getUser(pseudo, (err, data) => {

            res.render('RegistrationDetail.ejs', { data: data, sessionState: sessionState });
            mongoose.close();

        });

    }

    login(req, res){

        // get params
        let pseudo, mdp;
        if( req.body.pseudo) {
            pseudo = req.body.pseudo;
            mdp = req.body.mdp;

            // read bdd
            const mongoose = Mongoose.getInstance();

            mongoose.initDb();

            mongoose.getUser(pseudo, (err, data) => {

                let msg= "";
                if( data && data.mdp == mdp) {
                    msg = "login ok";
                    req.session.login = 1;
                }
                else {
                    msg = "erreur de login";
                    req.session.login = 0;
                }

                res.render('RegistrationLogin.ejs', { msg: msg });

                mongoose.close();

            });
        }
        else {
            res.render('RegistrationLogin.ejs', { msg: 'connectez vous' });
        }
    }
}

module.exports = RegistrationController;