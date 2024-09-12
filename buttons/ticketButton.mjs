import Button from "../classes/button.mjs"
import ticketModal from "../modal/ticketModal.mjs"

const ticketButton = new Button("ticket")
    .setExecute(async (interaction) => {
        await interaction.showModal(ticketModal.create())
    })

export default ticketButton