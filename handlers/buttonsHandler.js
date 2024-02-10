import { Collection } from "discord.js"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default async function buttonsHandler(client) {
    client.buttons = new Collection()
    const foldersPath = path.join(__dirname, "../",  "buttons")
    const buttonFolders = fs.readdirSync(foldersPath)

    console.log("--- Loading buttons ---")
    for (const folder of buttonFolders) {
        const buttonsPath = path.join(foldersPath, folder)
        let buttonFiles = fs.readdirSync(buttonsPath)
        for (const file of buttonFiles) {
            const filePath = path.join(buttonsPath, file)
            const {default: button} = await import(filePath)
            if (!("name" in button)) {
                console.log(`[WARNING] The button at ${filePath} is missing a required "name" property.`)
            } else if (!("execute" in button)) {
                console.log(`[WARNING] The button at ${filePath} is missing a required "execute" property.`)
            } else {
                client.buttons.set(button.name, button)
                console.log(`The button ${button.name} has been loaded with Success!`)
            }
        }
        console.log() // line break
    }
}