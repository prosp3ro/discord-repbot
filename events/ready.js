const fs = require('fs')
const chalk = require('chalk')

module.exports = client => {
    console.log(chalk.green(`Bot is online.`)) // ${client.user.username}

    client.user.setPresence({
        status: "test",
        game: {
            name: ".help",
            type: "WATCHING"
        }
    })
}
