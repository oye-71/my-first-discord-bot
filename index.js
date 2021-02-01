const CONFIG = require('./config.json')
const Discord = require('discord.js');
const client = new Discord.Client();

var isTaGueule = false;

client.once('ready', () => {
    console.log('Ready!');
});

client.login(CONFIG.token);

client.on('message', message => {
    // What happens in the room ? -> logger
    console.log(message.member.displayName + " said : " + message.content);

    // Fait répondre le bot dans le channel du message
    let channel = message.channel;

    // Shut up !!
    setTaGoule(message, channel);

    // Si ninnin ou meurgue on repond ta gueule
    if (!isTaGueule) {
        if (message.member.displayName == "n.nin") {
            channel.send("Ta gueule NON-nin <:gomarBlasee:784342279279345665>");
        } else if (message.member.displayName == "g.mar") {
            channel.send("Ta gueule Vieille marquise (plus de 18 ans <:mamGrimace:694173661476683847>)");
        }
    }
});

function setTaGoule(message, channel) {
    if (!isTaGueule) {
        // Si ta goule alors mute bot
        if (message.content == CONFIG.prefix + 'tagoule') {
            isTaGueule = true;
            channel.send("Ok, je me tais.")
        }
    } else {
        // Si parle alors ok et plus mute
        if (message.content == CONFIG.prefix + 'parle') {
            isTaGueule = false;
            channel.send("OK <:papALOuest:694172813606518786>");
        }
    }
}