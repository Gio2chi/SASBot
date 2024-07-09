require('dotenv').config()
const Voice = require('@discordjs/voice');
const NotionDB = require('../notion/NotionDB.js')
const fs = require('fs')
const path = require('path');
const GTTS = require('node-gtts')

let splitMSG = (separator, content, index) => {
    let str = []
    let array = content.split(separator)
    for(let i = 0; i < array.length; i++) {
        if(i < index) 
            str.push(array[i])
        else
            str[index-1] += separator + array[i]
    }
    return str
}

let playAudioCMD = async (msg) => {
    
    const mess = splitMSG(' ', msg.content, 3)
    if (!msg.member.voice.channel) return msg.reply("you need to join a voice channel.");

    /*const PoemDB = new NotionDB(process.env.NOTION_POEMS_DATABASE_ID);
    const poemPages = await PoemDB.getPagesByInstance(msg.guild.id, process.env.NOTION_POEMS_SI_ID)
    const randomPage = poemPages[Math.floor(Math.random() * poemPages.length)]
    const author = randomPage.properties[await poem.getKeyName(process.env.NOTION_POEMS_AUTHOR_ID)].rich_text[0].text.content
    const description = randomPage.properties[await poem.getKeyName(process.env.NOTION_POEMS_DESCRIPTION_ID)].rich_text[0].text.content
    */
    const infoJsonTMP = JSON.parse(fs.readFileSync('./info.json', 'utf8'))
    lang = (botInstance) => {
        return new Promise(resolve => {
            infoJsonTMP.forEach(prefixJson => {
                if (prefixJson['bot-instance'] == botInstance) resolve(prefixJson['prefix'])
            })
        })
    }    
    
    let channel = msg.member.voice.channel;
    const connection = Voice.joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guildId,
        adapterCreator: channel.guild.voiceAdapterCreator
    })

    //let stream = fs.createReadStream(path.join(__dirname, '../cache/' + '1' + '.mp3'))
    let stream = GTTS('it').stream(mess[2])
    let resource = Voice.createAudioResource(stream, {
        inputType: Voice.StreamType.Arbitrary,
	    inlineVolume: true
    });
    
    let player = Voice.createAudioPlayer();
    
    connection.subscribe(player)
    player.play(resource)
    
    connection.dispatchAudio()

    msg.delete()
}

module.exports = playAudioCMD