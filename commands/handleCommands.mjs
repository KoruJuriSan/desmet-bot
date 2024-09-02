
import { CommandInteraction, Collection } from "discord.js"
import commands from "./commands.mjs"
import Command from "../classes/command.mjs"

const commandsCollection = new Collection()

commands.forEach((command) => {
    commandsCollection.set(command.builder.name, command)
})

/**
 * @param {CommandInteraction} interaction - the command interaction object
 */
export default async function handleCommands(interaction) {
    const command = commandsCollection.get(interaction.commandName)

    if ( command instanceof Command) {
        console.log(`${interaction.user.tag} executed /${interaction.commandName}`)
        try {
            await command.execute(interaction)
        } catch(err) {
            console.error(err)
        }
    }
}