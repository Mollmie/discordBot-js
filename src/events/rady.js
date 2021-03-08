const chalk = require('chalk');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    client.logger.log(
      'Bot Ready! Eingeloggt als ' + chalk.yellow(client.user.tag)
    );
  },
};
