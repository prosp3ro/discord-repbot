// Moderation

const { RichEmbed } = require('discord.js')
const { stripIndents } = require('common-tags')
const { promptMessage } = require('../functions.js')

// .then(m => m.delete(5000))

exports.run = async (client, message, args) => {
    const logChannel = message.guild.channels.find(c => c.name === "logs") || message.channel

    // if (message.deletable) message.delete()

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`You are not authorized to use this command! <@${message.member.id}>`)
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send(`The bot does not have needed permissions to kick users! <@${message.member.id}>`)
    if (!args[0]) return message.channel.send(`Enter username. <@${message.member.id}>`)
    if (!args[1]) return message.channel.send(`Reason is mandatory! <@${message.member.id}>`)

    const toKick = message.mentions.members.first() || message.guild.members.get(args[0])

    if (!toKick) return message.channel.send(`Username not found. <@${message.member.id}>`)
    if (message.author.id === toKick.id) return message.channel.send(`You can't kick yourself! <@${message.member.id}>`)
    if (!toKick.kickable) return message.channel.send(`You can't kick an admin. <@${message.member.id}>`)

    const embed = new RichEmbed()
        .setTitle('**User was kicked!**')
        .setColor("RED")
        .setThumbnail(toKick.user.displayAvatarURL)
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(stripIndents`**Name:** ${toKick}
        **Admin:** ${message.author}
        **From channel:** ${message.channel}
        **Reason:** ${args.slice(1).join(" ")}`)

    toKick.kick(args.slice(1).join(" "))

    message.channel.send(`User ${toKick} was kicked!`)
    logChannel.send(embed)
}
