module.exports = (bot) => {
    console.log(colors.magenta("[🔮 Loading] Бот был загружен"))

    let guild = bot.guilds.cache.get(bot.config.guildId)
    if(guild) {
        let members = guild.members.cache.filter(x => x?.voice && x?.voice?.channel).map(x => x.id)
        if(members.length > 0) {
            for(let i = 0;i < members.length;i++) {
                let mem = guild.members.cache.get(members[i])
                mem.channel = mem.voice.channel
                mem.member = mem
                bot.emit("voiceStateUpdate", null, mem)
            }
        }
    }

    setInterval(async () => {
        await require("../functions/updateBanner.js")(bot, bot.config.guildId)
    }, 60000)
}