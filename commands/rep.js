const commando = require("discord.js-commando")
const { RichEmbed } = require("discord.js")
const reputation = require("../reputations.json")
const fs = require("fs")

exports.run = async (client, message, args) => {
    if (message.channel.name != "reputacje") {
        message.delete()
        message.author.send(`You cannot use this command outside the \`#reputations\` channel!`)
    }

    else if (message.channel.name === `reputations`) {
        let targetUser = message.guild.member(message.mentions.users.first())

        if (!targetUser){
            return message.channel.send(`User not found. <@${message.author.id}>`).then(m => m.delete(2000))
        }

        if (!reputation[targetUser.id]){
            reputation[targetUser.id] = {
                rep: 0
            }
        }

        const embed = new RichEmbed()
            .setColor("DARK_BLUE")
            .setTitle(`**Reputation**`)
            .addField('User', `<@${targetUser.user.id}>`)
            .addField('Reputation level', `\`\`\`${(reputation[targetUser.id].rep).toString()}\`\`\``)
            // .addField('Autor wiadomości', `<@${message.author.id}>`)
            .setThumbnail(targetUser.user.displayAvatarURL)
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)

        message.channel.send(embed)
    }
}
