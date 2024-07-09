const Discord = require('discord.js');

helpCMD = (msg) => {
    const mess = msg.content.split(' ')
    console.log(mess[2])
    var embed = new Discord.MessageEmbed({ color: '0x53C248' })
    if(mess.length == 2) {
        embed.title = "Help"
        embed.description =  "-help or -help <cmd> gives info about all commands or a specific one\n" +
                             "-p <author> <description> or -poem <author> <description> registers a new poem embedded in a message\n" +
                             "-r or -random gives with an embedded registered poem\n" +
                             "-prefix changes the prefix to a new one" +
                             "-l, -lang, -language sets the language of the bot"
    }   
    else if(mess.length == 3) {
        switch(mess[2]) {
            case 'help' :  
                embed.title = 'Help'
                embed.description = "-help or -help <cmd> gives info about all commands or a specific one"
                break;
            case 'h' :  
                embed.title = 'Help'
                embed.description = "-help or -help <cmd> gives info about all commands or a specific one"
                break;
            
            case 'poem' :  
                embed.title = 'Poem'
                embed.description = "-p <author> <description> or -poem <author> <description> registers a new poem embedded in a message"
                break;
            case 'p' :  
                embed.title = 'Poem'
                embed.description = "-p <author> <description> or -poem <author> <description> registers a new poem embedded in a message"
                break;
            
            case 'prefix' :  
                embed.title = 'Prefix'
                embed.description = "-prefix changes the prefix to a new one"
                break;
            
            case 'random' :  
                embed.title = 'Random Poem'
                embed.description = "-r or -random gives with an embedded registered poem"
                break;
            case 'r' :  
                embed.title = 'Random Poem'
                embed.description = "-r or -random gives with an embedded registered poem"
                break;
            
            case 'lang' : 
                embed.title = 'Language'
                embed.description = "-l, -lang, -language sets the language of the bot"
                break;
            case 'language' : 
                embed.title = 'Language'
                embed.description = "-l, -lang, -language sets the language of the bot"
                break;
            case 'l' : 
                embed.title = 'Language'
                embed.description = "-l, -lang, -language sets the language of the bot"
                break;
            
            default : 
                embed.title = "Help"
                embed.description =  "-help or -help <cmd> gives info about all commands or a specific one\n" +
                                     "-p <author> <description> or -poem <author> <description> registers a new poem embedded in a message\n" +
                                     "-r or -random gives with an embedded registered poem\n" +
                                     "-prefix changes the prefix to a new one" +
                                     "-l, -lang, -language sets the language of the bot"
            
        }
    }
    msg.channel.send(embed)
    msg.delete()
}

module.exports = helpCMD