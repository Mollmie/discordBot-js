module.exports = {
  name: 'würfeln',
  description: 'Schmeiß einen Würfel!',
  execute(message) {
    var zahl = Math.floor(Math.random() * (6 - 1)) + 1;
    message.reply('hat eine **`' + zahl + '`** gewürfelt');
  },
};
