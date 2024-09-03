import { Client, Events, GatewayIntentBits } from "discord.js"
import interactionCreate from "./events/interactionCreate.mjs"
import clientReady from "./events/clientReady.mjs"
import dotenv from "dotenv"
import mongodbSetup from "./lib/mongodbSetup.mjs"

async function main() {

    dotenv.config()
    const token = process.env.TOKEN

    const isDbConnected = mongodbSetup()

    const client = new Client({ intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]})

    client.once(Events.ClientReady, clientReady)

    client.on(Events.InteractionCreate, interactionCreate)

    client.login(token)

}

main()