import Command from "../../classes/command.mjs"
import ticketModal from "../../modal/ticketModal.mjs"

const ticket = new Command("ticket", "cree un ticket pour contacter des Admins")
    .setExecute(async (interaction) => {
        await interaction.showModal(ticketModal.create())
    })

export default ticket