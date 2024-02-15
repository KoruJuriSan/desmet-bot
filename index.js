import { Client, GatewayIntentBits} from "npm:discord.js"
import buttonsHandler from "./handlers/buttonsHandler.js"
import commandsHandler from "./handlers/commandsHandler.js"
import eventHandler from "./handlers/eventsHandler.js"
import registerGuildCommands from "./scripts/registerGuildCommands.js"
import getEnv from "./lib/getEnv.js"


async function main() {
    const env = await getEnv()
    const TOKEN = env["TOKEN"]

    const client = new Client({ intents: GatewayIntentBits.GuildMembers})

    await registerGuildCommands()
    await commandsHandler(client)
    await buttonsHandler(client)
    await eventHandler(client)

    client.login(TOKEN)
}

main()