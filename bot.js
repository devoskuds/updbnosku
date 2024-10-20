console.clear()

const { Client, Intents, Collection } = require("discord.js")
const { registerFont } = require("canvas")
const { readdir } = require("fs")
const path = require("path")
const ms = require("ms")

const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS,  Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_VOICE_STATES]
})

global.colors = require("colors")

bot.config = require("./config.json")
bot.collection = new Collection()

bot.collection.set(bot.config.guildId, {
    type: "guild",
    update: parseInt(Date.now()+ms("30s")),
    userId: "0",
})

readdir("./structure/", (err, folders) => {
    if(err) throw err
    if(folders && folders.length > 0) {
        folders.forEach(folder => {
            if (folder == "events") {
                readdir(`./structure/${folder}/`, (err, files) => {
                    if(err) throw err
                    if(files && files.length > 0) {
                        files.filter(f => f.endsWith(".js")).forEach(file => {
                            let event = require(`./structure/events/${file}`)
                            bot.on(file.split(".")[0], event.bind(null, bot))
                        })
                    }
                })
            } else if(folder == "fonts") {
                readdir(`./structure/${folder}/`, (err, files) => {
                    if(err) throw err
                    if(files && files.length > 0) {
                        files.forEach(file => {
                            let req = path.join(__dirname, "structure", "fonts", file)
                            let style = Boolean(file.split("-")[1])
                            if(style) {
                                registerFont(req, {
                                    family: file.split(".")[0].replace("_", " "),
                                    style: file.split("-")[1].replace("." + file.split(".")[1], "")
                                })    
                            } else {
                                registerFont(req, {
                                    family: file.split(".")[0].replace("_", " ")
                                })
                            }
                        })
                    }                
                })
            }
        })
    }
})

bot.login()
