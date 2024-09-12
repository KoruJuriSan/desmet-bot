
import { ModalSubmitInteraction, Collection } from "discord.js"
import Modal from "../classes/modal.mjs"
import modals from "./modals.mjs"

const modalsCollection = new Collection()

modals.forEach((modal) => {
    modalsCollection.set(modal.name, modal)
})

/**
 * @param {ModalSubmitInteraction} interaction - the modal submit interaction object
 */
export default async function handleModals(interaction) {
    const modal = modalsCollection.get(interaction.customId)

    if ( modal instanceof Modal) {
        console.log(`${interaction.user.tag} submited the ${modal.name} modal`)
        try {
            await modal.execute(interaction)
        } catch(err) {
            console.error(err)
        }
    }
}