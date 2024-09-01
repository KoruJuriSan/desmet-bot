import { REST, Routes } from "discord.js"
import commands from "./commands.mjs"
import dotenv from "dotenv"

async function main() {
    const isDev = process.argv.includes("dev")

    dotenv.config()
    const token = process.env.TOKEN
    const clientId = process.env.CLIENTID
    const guildId = isDev ? process.env.GUILDID : " "

    if (token && clientId && guildId) {

        console.log("Start refershing commands..." + (isDev ? " (dev)" : ""))

        const rest = new REST().setToken(token)
        const push = async () => {

            try {
                const commandsJSON = commands.map((command) => {
                    console.log(`-> Parsing the ${command.builder.name} command.`)
                    return command.builder.toJSON()
                })
        
                console.log("Start uploading commands...")
        
                if (isDev) {
        
                    const data = await rest.put(
                        Routes.applicationGuildCommands(clientId, guildId),
                        { body: commandsJSON}
                    )
        
                } else {
                    
                    const data = await rest.put(
                        Routes.applicationCommands(clientId),
                        { body: commandsJSON }
                    )
        
                }
        
                console.log("Commands Refreshed with success!" + (isDev ? " (only on test guild)" : ""))

            } catch(err) {
                console.error(err)
            }

        }

        await push()

    } else {
        console.log("To start the process, you should set your environnment variables : (TOKEN, CLIENTID, GUILDID if in dev mode) in .env file")
    }
}

main()