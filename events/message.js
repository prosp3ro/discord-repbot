const { Collection } = require('discord.js')
const config = require('../config/config.json')
const prefix = config.prefix
const reputation = require("../rep.json")
const { stripIndents } = require('common-tags')
const fs = require("fs")
const commando = require("discord.js-commando")

module.exports = async (client, message) => {
    if (message.author.bot) return
    if (!message.guild) return
    if (!message.content.startsWith(prefix)) return
    if (!message.member) message.member = await message.guild.fetchMember(message)

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()

    client.ratelimits = new Collection()
    client.ratelimitsRep = new Collection()

    const cmd = client.commands.get(command)
    if (!cmd) return

    cmd.run(client, message, args)
}
