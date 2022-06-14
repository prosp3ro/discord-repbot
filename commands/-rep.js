const commando = require("discord.js-commando")
const reputation = require("../reputations.json")
const fs = require("fs")
const { RichEmbed } = require('discord.js')

// .then(m => m.delete(2000))

exports.run = async (client, message, args) => {
    // Message sent not in 'reputation' channel.
    if (message.channel.name != "reputation") {
        message.delete()
        message.author.send(`You can't use this command outside the \`#reputation\` channel!`)
    }

    // Message sent in 'reputation' channel.
    else if (message.channel.name === `reputation`) {
        const repchannel = message.guild.channels.find(ch => ch.name === 'reputation-logs')
        let targetUser = message.guild.member(message.mentions.users.first())

        if (message.deletable) message.delete()

        if (!targetUser){
            return message.channel.send(`I can't find such user. <@${message.author.id}>`).then(m => m.delete(2000))
        }

        if (targetUser.id == message.author.id){
            return message.channel.send(`You can't give **-rep** to yourself! <@${message.author.id}>`).then(m => m.delete(2000))
        }

        if (!args[1]) {
            return message.channel.send(`You must provide the reason for adding the reputation to the user! <@${message.author.id}>`).then(m => m.delete(2000))
        }

        if (!reputation[targetUser.id]){
            reputation[targetUser.id] = {
                rep: 0
            }
        }

        reputation[targetUser.id].rep = reputation[targetUser.id].rep - 1

        const repEmbed = new RichEmbed()
            .setColor("DARK_RED")
            .setTitle(`**Negative reputation**`)
            .addField(`**User**`, targetUser, true)
            .addField('Author', `<@${message.author.id}>`, true)
            .addField('Reason', args.slice(1).join(" "))
            .setThumbnail(targetUser.user.displayAvatarURL)
            .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()

        // Saving to temporary JSON database.
        fs.writeFile("reputations.json", JSON.stringify(reputation), (err) => {
            if (err){
                console.log(err)
            }
            else {
                message.channel.send(`<@${message.author.id}> gave **-rep** to user ${targetUser}!`).then(m => m.delete(2000))
                repchannel.send(repEmbed)
            }
        })
    }
}
