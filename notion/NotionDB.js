require('dotenv').config()
const { Client } = require('@notionhq/client')
const notion = new Client({ auth: process.env['NOTION_DATABASE_TOKEN'] })

class NotionDB {
    
    //costants
    prefix = {
        [process.env.NOTION_PRE_ID]: {
          title: [{
            type: "text",
            text: {
              content: ""
            }
          }]
        }, 
        [process.env.NOTION_PRE_SI_ID]: {
          rich_text: [{
            type: "text",
            text: {
                content: ""
              }
          }]
        },
        [process.env.NOTION_PRE_PREFIX_ID]: {
          rich_text: [{
            type: "text",
            text: {
                content: ""
              }
          }]
        },
        [process.env.NOTION_PRE_LANG_ID]: {
          rich_text: [{
            type: "text",
            text: {
                content: ""
              }
          }]
        }
    }
    poem = {
        [process.env.NOTION_POEMS_TITLE_ID]: {
          title: [{
            type: "text",
            text: {
              content: ""
            }
          }]
        }, 
        [process.env.NOTION_POEMS_SI_ID]: {
          rich_text: [{
            type: "text",
            text: {
                content: ""
              }
          }]
        },
        [process.env.NOTION_POEMS_AUTHOR_ID]: {
          rich_text: [{
            type: "text",
            text: {
                content: ""
              }
          }]
        },
        [process.env.NOTION_POEMS_DESCRIPTION_ID]: {
          rich_text: [{
            type: "text",
            text: {
              content: ""
            }
          }]
        }
    }

    //constructor
    constructor(DB_TOKEN) {
        this.database_id = DB_TOKEN
    }

    //GETTERS
    get database() {
        return (async () => {return await notion.databases.retrieve({ database_id: this.database_id })})();
    }

    async getPages() {
        const res =  await notion.search({ 
            filter: {
                value: "page",
                property: "object"
            }, 
            //start_cursor: , da capire il funzionamento
            page_size: 100
        })
        var pages = []
        
        do {
            res.results.forEach(page => {
                var parentDBID = page.parent.database_id
                while (parentDBID.includes("-")) parentDBID = parentDBID.replace("-", "")
                if (parentDBID === this.database_id && !page.archived) pages.push(page)
            })
        } while (res.has_more)

        return pages
    }

    async getPagesByInstance (instance, instanceId) {
        var pagesOfInstance = []
        const pages = await this.getPages()
        const si = await this.getKeyName(instanceId)
        pages.forEach(page => {
            if (page.properties[si].rich_text[0].text.content == instance) pagesOfInstance.push(page)
        })
        return pagesOfInstance
    }

    async getKeyName(key) {
        const db = await this.database
        return new Promise((resolve, reject) => {
            Object.keys(db.properties).forEach(property => {
                if (db.properties[property].id == key) resolve(property)
            })
            reject(new Error('Could not find'))
        })
    }

    async getPropertyById(id, titleKey = "title") {
        const pages = await this.getPages()
        return new Promise((resolve) => {
            pages.forEach(async page => {
                const IDKey = await this.getKeyName(titleKey)
                if(page.properties[IDKey].title[0].text.content == id) resolve(page)
            })
        })
    }

    //METHODS
    createPage(properties) {
        notion.pages.create({
            parent: {
                database_id: this.database_id,
            },
            properties: properties
        })
    }

    updatePage(page) {
      notion.pages.update( page );
    }

    archivePage(page) {
      page.archived = true
      updatePage(page)
    }
}

module.exports = NotionDB