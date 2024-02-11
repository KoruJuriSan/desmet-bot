import { REST, Routes } from "npm:discord.js"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import getEnv from "./getEnv.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function registerCommands() {
    const env = await getEnv()
    const TOKEN = env["TOKEN"]
    const GUILDID = env["GUILDID"]
    const ICALURL = env["ICALURL"]
    const CLIENTID = env["CLIENTID"]

    const foldersPath = path.join(__dirname, "../",  "commands")
    const commandFolders = fs.readdirSync(foldersPath)

    let commands = []

    console.log("------ Loading commands ------")
    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder)
        let commandFiles = fs.readdirSync(commandsPath)
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file)
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