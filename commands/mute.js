// Moderation

// .mute @user X s/m/h/d
// .then(m => m.delete(3000))

const { RichEmbed } = require('discord.js')
const { stripIndents } = require('common-tags')
const ms = require('ms')

exports.run = async (client, message, args) => {
    let muterole = message.guild.roles.find('name', 'Muted')
    let logchannel = message.guild.channels.find(`name`, "logs")

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You are not authorized to use this command! <@${message.member.id}>`).then(m => m.delete(3000))

    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    if (!tomute) return message.channel.send(`Enter username. <@${message.member.id}>`).then(m => m.delete(3000))
    if (tomute.id === message.author.id) return message.channel.send(`You can't mute yourself! <@${message.member.id}>`).then(m => m.delete(3000))
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You can't mute server admin! <@${message.member.id}>`).then(m => m.delete(3000))
    if (tomute.roles.has(muterole.id)) return message.channel.send(`User is already muted.`).then(m => m.delete(3000))

    let mutetime = args[1]
    if (!mutetime) return message.channel.send(`You did not provide the mute time. s/min/h/d <@${message.member.id}>`).then(m => m.delete(3000))

    if (!muterole) {
        return message.channel.send(`Role \`Muted\` doesn't exist on the server. You have to create it first. <@${message.member.id}>`).then(m => m.delete(3000))
    }

  const embed = new RichEmbed()
    .setTitle('**Muted!**')
    .setColor("DARK_RED")
    .setThumbnail(tomute.user.displayAvatarURL)
    .setFooter(message.guild.name, message.guild.iconURL)
    .setTimestamp()
    .setDescription(stripIndents`**User:** ${tomute}
    **Admin:** ${message.author}
    **From channel:** ${message.channel}
    **Time of mute:** ${ms(ms(ms(ms(mutetime))))}`)

  await(tomute.addRole(muterole.id))

  message.channel.send(`<@${tomute.user.id}> was muted for ${ms(ms(ms(ms(mutetime))))}.`)
  logchannel.send(embed)

  setTimeout(function() {
    tomute.removeRole(muterole.id)
  }, ms(mutetime))
}
