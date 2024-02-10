import fs from "fs"
import path from "path"
import { Collection } from "discord.js"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default async function commandsHandler(client) {
    client.commands = new Collection()
    const foldersPath = path.join(__dirname, "../",  "commands")
    const commandFolders = fs.readdirSync(foldersPath)

    console.log("--- Loading commands ---")
    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder)
        let commandFiles = fs.readdirSync(commandsPath)
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file)
            const {default: command }= await import(filePath)
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