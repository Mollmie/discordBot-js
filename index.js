// Abhängigkeiten
const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const chalk = require('chalk');
const { prefix, token, host, port } = require('./config.json');
const http = require('http');

// Erstellt einen Neuen Discord Client und speichert ihn in client

exports.client = new Discord.Client();
client = this.client;

// Require our logger
client.logger = require('./src/modules/Logger');

// COMMANDS COLLECTION
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync('./src/commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`);
  client.commands.set(command.name, command);
}

//EVENTS
const eventFiles = fs
  .readdirSync('./src/events')
  .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./src/events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

// Prefix ist das zeichen was vor der Message sthet
// In diesem Fall wird ! als Command erkannt
let startcookies = config.START_COOKIES;

const init = async () => {
  client.logger.log('Start Init');
  // Meldet Client bei Discord an
  client.login(token);
};

// ON MASSAGES
client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.logger.log(
      'Benutzer: ' +
        chalk.yellow(message.author.username) +
        ` | Command: ` +
        chalk.yellow(command)
    );
    client.commands.get(command).execute(message, args);
  } catch (error) {
    client.logger.error('Fehler beim Ausführen des Commands: ' + command);
    client.logger.error(error);
    message.reply(
      'Es ist ein Fehler aufgetreten, beim Ausführen dieses Commands!'
    );
  }
});

init();

const requestListener = function (req, res) {
  test = fs.promises;
  test.readFile(__dirname + '/index.html').then((contents) => {
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(contents);
  });
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  client.logger.log(
    'Server is running on ' + chalk.green(`http://${host}:${port}`)
  );
});
