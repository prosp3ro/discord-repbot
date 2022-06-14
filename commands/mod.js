const { RichEmbed } = module.require("discord.js")
const reputation = require("../rep.json")
const { stripIndents } = require('common-tags')
const config = require('../config/config.json')
const prefix = config.prefix

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.delete()
        return message.reply('You are not authorized to use this command.').then(m => m.delete(2000))
    }

    const embed =  new RichEmbed()
        .setTitle(':tools: Moderation')
        .setColor("#5e77a6")
        .setFooter(message.guild, message.guild.iconURL)
        .setTimestamp()
        .setDescription(stripIndents`
        \`.ban\` - ban <@user> <reason> \n
        \`.clear\` - clear <number of messages> \n
        \`.kick\` - kick <@user> <reason> \n
        \`.mute\` - mute <@user> (time = [x]s/m/h/d) \n
        \`.unmute\` - unmute <@user> \n
        \`.warn\` - warn <@user> <reason> \n
        You can mute a user for a maximum of 20 days.`)

    message.channel.send(embed)
}
