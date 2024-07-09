require('dotenv').config()
const Discord = require('discord.js');
const NotionDB = require('../notion/NotionDB.js')
const fs = require('fs');

let prefixCMD = async (msg) => {
    const mess = msg.content.split(' ', 4)

    const newPrefix = mess[2]
    const prefix = new NotionDB(process.env.NOTION_PRE_DATABASE_ID)
    const prefixPages = await prefix.getPagesByInstance(msg.guild.id, process.env.NOTION_PRE_SI_ID)
    prefixPages[0].properties[await prefix.getKeyName( process.env.NOTION_PRE_PREFIX_ID )].rich_text[0].text.content = newPrefix
    
    prefix.updatePage({
        page_id: prefixPages[0].id,
        properties: prefixPages[0].properties
    })

    const prefixJsonTMP = JSON.parse(fs.readFileSync('./info.json', 'utf8'))
    prefixJsonTMP.forEach(obj => {
        if(obj["bot-instance"] == msg.guild.id) obj['prefix'] = newPrefix
    })
    fs.writeFileSync('./info.json', JSON.stringify(prefixJsonTMP, null, 2))
    msg.delete()
}

module.exports = prefixCMD