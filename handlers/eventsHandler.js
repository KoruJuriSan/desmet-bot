import path from "node:path"
import fs from "node:fs"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default async client => {

    const foldersPath = path.join(__dirname, "../",  "events")
    const commandFolders = fs.readdirSync(foldersPath)

    console.log("--------- Loading events ---------")
    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder)
        const commandFiles = fs.readdirSync(commandsPath)
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file)
            const {default: event }= await import(filePath)
            if (!("name" in event)) {
                console.log(`[WARNING] The event at ${filePath} is missing a required "name" property.`)
            } else if (!("execute" in event)) {
                console.log(`[WARNING] The event at ${filePath} is missing a required "execute" property.`)
            } else {
                if (folder == "once") {
                    client.once(event.name, event.execute)
                    console.log(`The ${event.name} event has been loaded with Success! (once)`)
                } else {
                    client.on(event.name, event.execute)
                    console.log(`The ${event.name} event has been loaded with Success! (on)`)
                }
            }
        }
    }
}
