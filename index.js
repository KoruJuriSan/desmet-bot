import { Client, GatewayIntentBits} from "npm:discord.js"
import buttonsHandler from "./handlers/buttonsHandler.js"
import interactionCreate from "./events/interactionCreate.js"
import commandsHandler from "./handlers/commandsHandler.js"
import registerGuildCommands from "./scripts/registerGuildCommands.js"
import ready from "./events/ready.js"
import getEnv from "./lib/getEnv.js"


async function main() {
    const env = await getEnv()
    const TOKEN = env["TOKEN"]

    const client = new Client({ intents: GatewayIntentBits.GuildMembers})

    await registerGuildCommands()
    await commandsHandler(client)
    await buttonsHandler(client)

    client.on("ready", () => {
        ready(client)
    })

    client.on("interactionCreate", interaction => {
        interactionCreate(interaction, client)
    })

    client.login(TOKEN)
}

main()