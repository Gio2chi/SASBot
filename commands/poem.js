require('dotenv').config()
const Discord = require('discord.js');
const NotionDB = require('../notion/NotionDB.js')
const {poemProperties} =  require('../notion/databaseUtil.js')


const colors = ['0xa83232', '0x32a836', '0x32a875', '0x329ea8', '0x3263a8', '0x3432a8', '0x7332a8', '0xe30b0b', '0x7a0f0f', '0xff9f05']

let poemCommand = async (msg) => {
  	const mess = msg.content.split(' ', 4)

	var embed = new Discord.MessageEmbed()
	const color = Math.floor(Math.random() * colors.length)
	embed.setColor(colors[color])
	embed.setFooter("by " + mess[2])
	embed.setDescription(mess[3])
	msg.channel.send(embed)

	const poem = new NotionDB(process.env.NOTION_POEMS_DATABASE_ID)
	const props = await poemProperties(poem, msg.guild.id, mess[2], mess[3])
	poem.createPage(props)
	msg.delete()
}

module.exports = poemCommand