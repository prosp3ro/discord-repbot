// Moderation

// .then(m => m.delete(3000))

const { RichEmbed } = require('discord.js')
const { stripIndents } = require('common-tags')

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send(`You are not authorized to use this command! <@${message.member.id}>`).then(m => m.delete(3000))
    }

    let tounmute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    if (!tounmute) return message.channel.send(`User not found. <@${message.member.id}>`).then(m => m.delete(3000))

    if (tounmute.id === message.author.id) {
        return message.channel.send(`You can't use this command on yourself. <@${message.member.id}>`).then(m => m.delete(3000))
    }

    let muterole = message.guild.roles.find('name', 'Muted')
    let logchannel = message.guild.channels.find(`name`, "logs")

    if (!tounmute.roles.has(muterole.id)) {
        message.channel.send(`User <@${tounmute.user.id}> is not muted.`).then(m => m.delete(3000))
    }

    const embed = new RichEmbed()
        .setTitle('**Unmuted!**')
        .setColor("DARK_GREEN")
        .setThumbnail(tounmute.user.displayAvatarURL)
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(stripIndents`**Nick:** ${tounmute}
        **Admin:** ${message.author}
        **From channel:** ${message.channel}`)

    if (tounmute.roles.has(muterole.id)) {
        tounmute.removeRole(muterole.id)
        message.channel.send(`User <@${tounmute.user.id}> was unmuted.`)
        logchannel.send(embed)
    }
}
