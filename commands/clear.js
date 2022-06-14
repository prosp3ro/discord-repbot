// Moderation

// .then(m => m.delete(5000))

exports.run = async (client, message, args) => {
    if (message.deletable) message.delete()
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You are not authorized to use this command! <@${message.member.id}>`)

    if (isNaN(args[0])) {
        return message.channel.send(`Enter the number of messages to be deleted. <@${message.member.id}>`)
    }

    if (parseInt(args[0]) <= 0) {
        return message.channel.send(`You can't delete 0 messages or less. <@${message.member.id}>`)
    }

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send("The bot does not have message management permissions!")
    }

    let deleteAmount

    if (parseInt(args[0]) > 100) {
        deleteAmount = 100
    } 
    else {
        deleteAmount = parseInt(args[0])
    }

    message.channel.bulkDelete(deleteAmount, true)
    .then(deleted => message.channel.send(`Deleted \`${deleted.size}\` messages.`))
    // .catch(err => message.reply(`Error. ${err}`))
}
