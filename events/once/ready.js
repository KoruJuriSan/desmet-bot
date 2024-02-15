import { Events } from "npm:discord.js"


export default {
    name : Events.ClientReady,
    execute(client) {
        console.log(`Client logged in as ${client.user.tag}`)
    }

}