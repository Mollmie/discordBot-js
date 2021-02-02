// Abhängigkeiten
const Discord = require("discord.js");
const config = require("./config.json");

// Erstellt einen Neuen Discord Client und speichert ihn in client
const client = new Discord.Client();

// Prefix ist das zeichen was vor der Message sthet
// In diesem Fall wird ! als Command erkannt
const prefix = "!";

// Wenn jemand eine Message schreibt, dann führe die Funktion aus
client.on("message", function(message) { 

	// Wenn der Bot selber geschrieben hat, dann mache nichts
	if (message.author.bot) return;

	// Wenn vor der Message nicht das oben festgelegte prefix steht, dann mache nichts
	if (!message.content.startsWith(prefix)) return;

	// List die Message nach dem Prefix
	const commandBody = message.content.slice(prefix.length);
  	
  	// Erkläre ich später
  	const args = commandBody.split(' ');

  	// schreibt den Command (Command Body ) in Command
  	const command = args.shift().toLowerCase();

  	//##### Ab Hier werden die eingaben Geprüft ####//
  	
  	//#Command: Ping (!ping)
  	if (command === "ping") {
  		
  		// Holt sich das Datum und die Zeit von heute
  		// Rechnet dann die Zeit ab, von der Empfangenen Message
  		const timeTaken = Date.now() - message.createdTimestamp;

  		// Antwortet auf den Command
  		message.reply(`Pong! Diese Message hat eine latenz von ${timeTaken}ms.`);
  	}

  	//#Command: Cookie (!cookie)
  	if (command === "cookie") {
  		message.replay('Leider ist die Dose alle! :(')
  	}

}); 

// Meldet Client bei Discord an
client.login(config.BOT_TOKEN);

