import { REST, Routes } from "discord.js"
import fs from "fs"
import path from "path"
import dotenv from "dotenv"

async function registerCommands() {
    dotenv.config()
    TOKEN = process.env.TOKEN
    GUILDID = process.env.GUILDID
    CLIENTID = process.env.CLIENTID

    const commands = []

    const foldersPath = path.join(__dirname, "../",  "commands")
    const commandFolders = fs.readdirSync(foldersPath)

    console.log("------ Loading commands ------")
    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder)
        let commandFiles = fs.readdirSync(commandsPath)
        for (const file of commandFiles) {
            filePath = path.join(commandsPath, file)
            const {default: command} = await import(filePath)
            if (!("data" in command)) {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" property.`)
            } else if (!("execute" in command)) {
                console.log(`[WARNING] The command at ${filePath} is missing a required "execute" property.`)
            } else {
                commands.push(command.data.toJSON())
                console.log(`The command ${command.data.name} has been loaded with Success!`)
            }
        }
        console.log() // line break
    }

    const rest = new REST().setToken(TOKEN)

    try {
        console.log("--- Refreshing (/) commands ---")
        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENTID, GUILDID),
            {body: commands}
        )
        console.log("Commands successfully refreshed! \n")
    } catch (err) {
        console.error(err)
    }
}

registerCommands()