// Moderation

const { RichEmbed } = require('discord.js')
const { stripIndents } = require('common-tags')
const { promptMessage } = require('../functions.js')

// .then(m => m.delete(5000))

exports.run = async (client, message, args) => {
    const logChannel = message.guild.channels.find(c => c.name === "logs") || message.channel

    // if (message.deletable) message.delete()

    if (!message.member.hasPermission("BAN_MEMBERS")) {
        return message.reply('You are not authorized to use this command. If you want to report someone, use the \`.report\` command.')
    }
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("The bot is not authorized to ban users!")
    if (!args[0]) return message.channel.send(`Who do you want to ban? <@${message.author.id}>`)
    if (!args[1]) return message.channel.send(`Ban reason is mandatory! <@${message.author.id}>`)

    const toBan = message.mentions.members.first() || message.guild.members.get(args[0])

    if (!toBan) return message.channel.send(`I have not found anyone with such nickname! <@${message.author.id}>`)
    if (message.author.id === toBan.id) return message.channel.send(`You can't ban yourself! <@${message.author.id}>`)
    if (!toBan.bannable) return message.channel.send(`You can't ban the administrator! <@${message.author.id}>`)

    const embed = new RichEmbed()
        .setTitle('**User was banned!**')
        .setColor("RED")
        .setThumbnail(toBan.user.displayAvatarURL)
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(stripIndents`**Name:** ${toBan}
        **Admin:** ${message.author}
        **Reason:** ${args.slice(1).join(" ")}`)

    const promptEmbed = new RichEmbed()
        .setColor("GREEN")
        .setAuthor("Confirm the ban. After 30 seconds, verification will become impossible.")
        .setDescription(`Do you want to ban ${toBan}?`)

    message.channel.send(promptEmbed).then(async msg => {
        const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"])

        if (emoji === "✅") {
            msg.delete()
            toBan.ban(args.slice(1).join(" "))
            .catch(err => {
                if (err) return message.channel.send(`Error.`)
            })

            logChannel.send(embed)
            message.channel.send(`User ${toBan} was banned!`)
        }

        else if (emoji === "❌") {
            msg.delete()

            message.channel.send('Ban was cancelled.')
        }
    })
}
