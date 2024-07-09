const Discord = require('discord.js');
const helpCMD = require('./help.js')
const poemCommand = require('./poem.js')
const prefixCMD = require('./prefix.js')
const randomCMD = require('./random_poem.js')
const error = require('./error.js')
const langCMD = require('./language.js')
const playAudioCMD = require('./playAudio.js')

handleCommands = (msg, client) => {
    const mess = msg.content.split(' ', 2)

    switch (mess[1].toLowerCase()) {
        case 'help' : helpCMD(msg); break;
        case 'h': helpCMD(msg); break;
        case 'poem' : poemCommand(msg); break;
        case 'p' : poemCommand(msg); break;
        case 'prefix' : prefixCMD(msg); break;
        case 'random' : randomCMD(msg); break;
        case 'r' : randomCMD(msg); break;
        case 'lang' : langCMD(msg); break;
        case 'language' : langCMD(msg); break;
        case 'l' : langCMD(msg); break;
        case 'play' : playAudioCMD(msg); break;
        default: error(msg)
    }
}

module.exports = handleCommands;