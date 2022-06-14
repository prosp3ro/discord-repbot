const { Client, RichEmbed, Collection } = require('discord.js')
const client = new Client()
const fs = require('fs')
const Enmap = require('enmap')
const config = require('./config/config.json')
client.commands = new Enmap()
const chalk = require('chalk')
const commando = require("discord.js-commando")
const reputation = require("./rep.json")
const prefix = config.prefix
client.ratelimitsRep = new Collection()

// Event handler
fs.readdir('./events', (err, files) => {
    if (err) return console.error

    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const evt = require(`./events/${file}`)

        let evtName = file.split(`.`)[0]
        console.log(chalk.red(`Loaded ${evtName}.`))
        client.on(evtName, evt.bind(null, client))
    })
})

// Command handler
fs.readdir(`./commands/`, async (err, files) => {
    if (err) return console.error

    files.forEach (file => {
        if (!file.endsWith('.js')) return // file not ending with '.js'
        let props = require(`./commands/${file}`) // props - commands

        let cmdName = file.split(`.`)[0]
        console.log(chalk.blue(`Loaded command ${cmdName}.`))
        client.commands.set(cmdName, props)
    })
})

client.login(config.token)
