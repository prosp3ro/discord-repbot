const { RichEmbed } = module.require("discord.js")
const reputation = require("../rep.json")
const { stripIndents } = require('common-tags')
const config = require('../config/config.json')
const prefix = config.prefix

exports.run = async (client, message, args) => {
    const embed =  new RichEmbed()
        .setTitle(':star: Repbot')
        .setColor("#139c40")
        .setFooter(message.guild, message.guild.iconURL)
        .setTimestamp()
        .setDescription(stripIndents`Reputation commands can only be used on the channel **#reputations**! \n
        \`.rep <@user>\` - checks user reputation. \n
        \`.+rep <@user> <reason>\` - add **positive** reputation to the user. \n
        \`.-rep <@user> <reason>\` - add **negative** reputation to the user. \n
        \`.pomoc\` - shows help.\n \n
        Pozostałe:
        \`.mod\` - admin commands.`)

    message.channel.send(embed)
}
