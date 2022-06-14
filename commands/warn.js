// Moderation

const { RichEmbed } = require('discord.js')
const fs = require('fs')
const { stripIndents } = require('common-tags')

// .then(m => m.delete(5000))

let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"))

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`You are not authorized to use this command! <@${message.author.id}>`)

    let userWarn = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if (!userWarn) return message.channel.send(`User not found. <@${message.author.id}>`)
    if (userWarn.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You can't warn server admin! <@${message.author.id}>`)

    let reason = args.join(" ").slice(22)
    if (!reason) return message.channel.send(`Reason is mandatory! <@${message.author.id}>`)

    if (!warns[userWarn.id]) warns[userWarn.id] = {
        warns: 0
    }

    warns[userWarn.id].warns++

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err)
    })

    const warnEmbed = new RichEmbed()
        .setThumbnail(userWarn.user.displayAvatarURL)
        .setFooter(message.guild.name, message.guild.iconURL)
        .setColor("DARK_RED")
        .setTimestamp()
        .addField('**Warning**', stripIndents`
            **User:** <@${userWarn.id}>
            **Admin:** <@${message.author.id}>
            **From channel:** ${message.channel}
            **Warning count:** ${warns[userWarn.id].warns}/3
            **Reason:** ${reason} \n
            After reaching the warning limit, the user will be banned.`)

    let warnchannel = message.guild.channels.find(`name`, "logs")
    let banchannel = message.guild.channels.find(`name`, "logs")

    // if (!warnchannel) {
    //    return message.channel.send('Channel \`#logi` is not found! Create it first.')
    // }

    if (message.deletable) message.delete()

    message.channel.send(`Warning for <@${userWarn.id}> was added.`)
    warnchannel.send(warnEmbed)

    if (warns[userWarn.id].warns == 3) {
        message.guild.member(userWarn).ban('User reached the limit of three warnings!')
        banchannel.send(`${userWarn} was banned!`)
    }
}
