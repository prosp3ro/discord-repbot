// New users on the server.

const { RichEmbed } = require('discord.js')
const { stripIndents } = require('common-tags')

module.exports = (client, member) => {
    let userLogs = member.guild.channels.find(c => c.name === 'user-logs')

    const date = member.user.createdAt
    const newDate = date.toLocaleDateString()

    const embed = new RichEmbed()
        .setTimestamp()
        .setColor('GREEN')
        .setThumbnail(member.user.displayAvatarURL)
        .setFooter(member.displayName, member.user.displayAvatarURL)
        .addField('**New user!**', stripIndents`
        **Name:** ${member.user.username}
        **ID:** ${member.user.id}
        **Discord Tag:** ${member.user.tag}
        **Account creation date:** ${newDate}`)

    userLogs.send(embed)
}
