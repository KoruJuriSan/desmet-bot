import { Client, GatewayIntentBits} from "discord.js"
import dotenv from "dotenv"
import buttonsHandler from "./handlers/buttonsHandler.js"
import interactionCreate from "./events/interactionCreate.js"
import commandsHandler from "./handlers/commandsHandler.js"
import ready from "./events/ready.js"


async function main() {
    dotenv.config()
    const TOKEN = process.env.TOKEN

    const client = new Client({ intents: GatewayIntentBits.GuildMembers})

    await commandsHandler(client)
    await buttonsHandler(client)

    client.on("ready", async () => {
        ready(client)
    })

    client.on("interactionCreate", async interaction => {
        interactionCreate(interaction, client)
    })

    client.login(TOKEN)
}

main()