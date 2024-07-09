const Discord = require('discord.js');

error = (msg) => {
    var embed = new Discord.MessageEmbed({ 
        title: 'Error',
        description: 'Invalid expression after prefix! \ntry ' + (msg.content.split(' ', 2))[0] + ' help for more info about commands',
        color: '0x753027' 
    })
    msg.channel.send(embed);
    msg.delete();
}

module.exports = error