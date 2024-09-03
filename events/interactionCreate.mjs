import { BaseInteraction } from "discord.js"
import handleCommands from "../commands/handleCommands.mjs"

/**
 * 
 * @param {BaseInteraction} interaction 
 */
export default async function interactionCreate(interaction) {
    if (interaction.isChatInputCommand) {
        await handleCommands(interaction)
    }
}