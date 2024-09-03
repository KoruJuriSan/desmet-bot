import { Client, Events, GatewayIntentBits } from "discord.js"
import interactionCreate from "./events/interactionCreate.mjs"
import clientReady from "./events/clientReady.mjs"
import mongoose from "mongoose"
import dotenv from "dotenv"

async function main() {

    dotenv.config()
    const token = process.env.TOKEN

    let isDbConnected = false
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/desmet-chan-bot")
        isDbConnected = true
        console.log("Mongodb connected on 'desmet-chan-bot' DB")
    } catch(err) {
        console.log("Couldn't connect to Mongodb on 'desmet-chan-bot' DB:")
        console.error(err)
    }

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