const CONFIG = require('./config.json')
const crypto = require('./cryptmodule.js')
const Discord = require('discord.js');
const client = new Discord.Client();

app.listen(process.env.PORT || 3000);
var isTaGoule = false;

client.once('ready', () => {
    console.log('Ready!');
});

if(process.env.TOKEN_ENC){
    client.login(crypto.decrypt(process.env.TOKEN_ENC));
} else {
    console.error("Token not found. impossible to connect to discord.");
    process.exit();
}

client.on('message', message => {
    // What happens in the room ? -> logger
    console.log(message.member.displayName + " said : " + message.content);

    // Fait répondre le bot dans le channel du message
    let channel = message.channel;

    // Shut up !!
    setTaGoule(message, channel);

    // Si ninnin ou meurgue on repond ta gueule
    if (!isTaGoule) {
        if (message.member.displayName == "n.nin") {
            channel.send("Ta gueule NON-nin <:gomarBlasee:784342279279345665>");
        } else if (message.member.displayName == "g.mar") {
            channel.send("Ta gueule Vieille marquise (plus de 18 ans <:mamGrimace:694173661476683847>)");
        }
    }
});

// Utilitaires
function setTaGoule(message, channel) {
    if (!isTaGoule) {
        // Si ta goule alors mute bot
        if (message.content == CONFIG.prefix + 'tagoule') {
            isTaGoule = true;
            channel.send("Ok, je me tais.")
        }
    } else {
        // Si parle alors ok et plus mute
        if (message.content == CONFIG.prefix + 'parle') {
            isTaGoule = false;
            channel.send("OK <:papALOuest:694172813606518786>");
        }
    }
}