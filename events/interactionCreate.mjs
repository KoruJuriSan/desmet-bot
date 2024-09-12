import { BaseInteraction } from "discord.js"
import handleCommands from "../commands/handleCommands.mjs"
import handleButtons from "../buttons/handleButtons.mjs"
import handleModals from "../modal/handleModals.mjs"

/**
 * 
 * @param {BaseInteraction} interaction 
 */
export default async function interactionCreate(interaction) {
    if (interaction.isChatInputCommand()) {
        await handleCommands(interaction)
    } else if (interaction.isModalSubmit()) {
        await handleModals(interaction)
    }
}