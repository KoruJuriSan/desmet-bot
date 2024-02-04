const fs = require("node:fs")
const path = require("node:path")
const { Collection } = require("discord.js")

module.exports = function commandsHandler(client) {
    client.commands = new Collection()
    const foldersPath = path.join(__dirname, "../",  "commands")
    const commandFolders = fs.readdirSync(foldersPath)

    console.log("--- Loading commands ---")
    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder)
        let commandFiles = fs.readdirSync(commandsPath)
        for (const file of commandFiles) {
            filePath = path.join(commandsPath, file)
            const command = require(filePath)
            if (!("data" in command)) {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" property.`)
            } else if (!("execute" in command)) {
                console.log(`[WARNING] The command at ${filePath} is missing a required "execute" property.`)
            } else {
                client.commands.set(command.data.name, command)
                console.log(`The command ${command.data.name} has been loaded with Success!`)
            }
        }
        console.log() // line break
    }
}