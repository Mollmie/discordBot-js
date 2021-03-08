module.exports = {
  name: 'ping',
  description: 'Beep!',
  execute(message) {
    // Holt sich das Datum und die Zeit von heute
    // Rechnet dann die Zeit ab, von der Empfangenen Message
    const timeTaken = Date.now() - message.createdTimestamp;

    // Antwortet auf den Command
    message.reply(`Pong! Diese Message hat eine latenz von ${timeTaken}ms.`);
  },
};
