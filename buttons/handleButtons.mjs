
import { ButtonInteraction, Collection } from "discord.js"
import Button from "../classes/button.mjs"
import buttons from "./buttons.mjs"

const buttonsCollection = new Collection()

buttons.forEach((button) => {
    buttonsCollection.set(button.name, button)
})

/**
 * @param {CommandInteraction} interaction - the command interaction object
 */
export default async function handleButtons(interaction) {
    const button = buttonsCollection.get(interaction.customId)

    if ( button instanceof Button) {
        console.log(`${interaction.user.tag} pushed the ${button.name} button`)
        try {
            await button.execute(interaction)
        } catch(err) {
            console.error(err)
        }
    }
}