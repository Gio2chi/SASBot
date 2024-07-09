require('dotenv').config()
const NotionDB = require('./NotionDB');
const fs = require('fs');

var prefixJson = JSON.parse(fs.readFileSync("./info.json", 'utf8'))

let getPrefix = (botInstance) => {
    return new Promise(resolve => {
        prefixJson.forEach(prefixJson => {
            if(prefixJson['bot-instance'] == botInstance) resolve(prefixJson['prefix'])
        })  
    })
}

let defaultPrefixProperties = async (prefix, instance, language = null) => {
    prefix.prefix[process.env.NOTION_PRE_ID].title[0].text.content = (await prefix.getPages()).length.toString()
    prefix.prefix[process.env.NOTION_PRE_SI_ID].rich_text[0].text.content = instance
    prefix.prefix[process.env.NOTION_PRE_PREFIX_ID].rich_text[0].text.content = "!S"
    prefix.prefix[process.env.NOTION_PRE_LANG_ID].rich_text[0].text.content = language
    return prefix.prefix
}

let poemProperties = async (poem, instance, author, description) => {
    poem.poem[process.env.NOTION_POEMS_TITLE_ID].title[0].text.content = (await poem.getPages()).length.toString()
    poem.poem[process.env.NOTION_POEMS_SI_ID].rich_text[0].text.content = instance
    poem.poem[process.env.NOTION_POEMS_AUTHOR_ID].rich_text[0].text.content = author
    poem.poem[process.env.NOTION_POEMS_DESCRIPTION_ID].rich_text[0].text.content = description
    return poem.poem
}
/*(async () => {console.log(await getPrefix(prefix , "784895929505415190"))
    //console.log(await prefix.getPages())
} )()*/

module.exports = {getPrefix, defaultPrefixProperties, poemProperties}