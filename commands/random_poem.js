require('dotenv').config()
const Discord = require('discord.js');
const NotionDB = require('../notion/NotionDB.js')

const colors = ['0xa83232', '0x32a836', '0x32a875', '0x329ea8', '0x3263a8', '0x3432a8', '0x7332a8', '0xe30b0b', '0x7a0f0f', '0xff9f05']

let randomCMD = async (msg) => {
    var embed = new Discord.MessageEmbed()
    const poem = new NotionDB(process.env.NOTION_POEMS_DATABASE_ID)
    const poemPages = await poem.getPagesByInstance(msg.guild.id, process.env.NOTION_POEMS_SI_ID)

    if(poemPages.length == 0) {
        embed.color('0xB2473B')
        embed.setDescription("No poems existing")
        msg.channel.send(embed)
        return -1
    }

    const randomPage = poemPages[Math.floor(Math.random() * poemPages.length)]
    const author = randomPage.properties[await poem.getKeyName(process.env.NOTION_POEMS_AUTHOR_ID)].rich_text[0].text.content
    const description = randomPage.properties[await poem.getKeyName(process.env.NOTION_POEMS_DESCRIPTION_ID)].rich_text[0].text.content

    
    
    embed.setFooter("by " + author)
	embed.setDescription(description)
    const color = Math.floor(Math.random() * colors.length)
	embed.setColor(colors[color])
    msg.channel.send(embed)
    msg.delete()
}

module.exports = randomCMD