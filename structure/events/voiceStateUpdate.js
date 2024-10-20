module.exports = (bot, oldState, newState) => {
    if(oldState?.channel == null && newState?.channel !== null) {
        let rnd = require("../functions/randomNumber.js")(1000, 20000)
        let res = bot.collection.get(newState.member.id)
        if(!res) res = bot.collection.set(newState.member.id, {userId: newState.member.id, type: "user", online: 0})

        let interval = setInterval(() => {
            if(!newState || !newState?.member || !newState?.guild || !newState?.channel || !newState?.member?.voice?.channel) {
                clearInterval(interval)
            } else {
                bot.collection.get(newState.member.id).online += rnd
            }
        }, rnd)
    } else if(newState?.channel == null) {
        return
    } else if(oldState?.channel !== newState?.channel) {
        let rnd = require("../functions/randomNumber.js")(1000, 20000)
        let res = bot.collection.get(newState.member.id)
        if(!res) res = bot.collection.set(newState.member.id, {userId: newState.member.id, type: "user", online: 0})

        let interval = setInterval(() => {
            if(!newState || !newState?.member || !newState?.guild || !newState?.channel || !newState?.member?.voice?.channel) {
                clearInterval(interval)
            } else {
                bot.collection.get(newState.member.id).online += rnd
            }
        }, rnd)
    }
}