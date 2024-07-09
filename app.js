const {Client, Intents} = require('discord.js');
require('dotenv').config();
const handleCommands = require('./commands/command_handler.js')
const {getPrefix, defaultPrefixProperties} = require('./notion/databaseUtil.js')
const NotionDB = require('./notion/NotionDB.js')

let intents = new Intents();
for(let intent in Intents.FLAGS) {
  intents.add(intent)
}

const client = new Client({intents: intents});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

//TODO check if there is already a prefix in the database
client.on('guildCreate', async (guild) => {
  const prefix = new NotionDB(process.env.NOTION_PRE_DATABASE_ID)
  console.log('joined a new guild : ' + guild.name)
  prefix.createPage(await defaultPrefixProperties(prefix, guild.id, 'en'))
});

client.on('messageCreate', async (mess) => {
  //mess.guild.id è l'ID del server
  const msg = mess.content.split(' ', 3)
  if(msg[0] === await getPrefix(mess.guild.id)) handleCommands(mess, client)
});

//(async () => console.log() )();

//TODO setup the deletePage function
client.on('guildDelete', async (guild) => {
  console.log('left a guild : ' + guild.name)
  //delete prefix page
})

client.login(process.env.CLIENT_TOKEN);