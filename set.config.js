const argparse = require('argparse').ArgumentParser;
YAML = require('yamljs');
var fs = require('fs');

var parser = new argparse({
  version: '0.0.1',
  addHelp:true,
  description: 'Argparse example'
});

parser.addArgument(
  [ '-k', '--consumerkey' ],
  {
    help: 'Twitter Customer Key'
  }
);

parser.addArgument(
  [ '-s', '--consumersecret' ],
  {
    help: 'Twitter Customer Secret'
  }
);

parser.addArgument(
  [ '-t', '--token' ],
  {
    help: 'Twitter Token'
  }
);

parser.addArgument(
  [ '-ts', '--tokensecret' ],
  {
    help: 'Twitter Token Secret'
  }
);

parser.addArgument(
  [ '-ip', '--ipadresse' ],
  {
    help: 'IP de la BDD'
  }
);

parser.addArgument(
  [ '-p', '--port' ],
  {
    help: 'Port de la BDD'
  }
);

parser.addArgument(
  [ '-db', '--dbname' ],
  {
    help: 'Nom de la BDD'
  }
);


// enregistrer l'ensemble des arguments et leur valeur dans un objet args
const args = parser.parseArgs();

// récupérer le fichier sample et le fichier config à modifier
const configSample = `config.sample.yml`;
const setConfig = `config.yml`;

// enregistrer le contenu du sample dans une variable (sous forme de string)
let configSave = fs.readFileSync(configSample, "utf8");

// modifications de la variable du fichier config.sample.yml
let configDone = configSave
    .replace('CONSUMER_KEY', args.consumerkey)
    .replace('CONSUMER_SECRET', args.consumersecret)
    .replace('ACCESS_TOKEN_KEY', args.token)
    .replace('ACCESS_TOKEN_SECRET', args.tokensecret)
    .replace('IP', args.ipadresse)
    .replace('PORT', args.port)
    .replace('DB', args.dbname);

console.log(configDone);

// enregistrement des modifications dans le fichier config.yml
fs.writeFileSync(setConfig, configDone);

