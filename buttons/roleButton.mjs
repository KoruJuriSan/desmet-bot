import { DefaultUserAgent, GuildMemberRoleManager } from "discord.js"
import Button from "../classes/button.mjs"
import firstYearModal from "../modal/firstYearModal.mjs"
import secondYearModal from "../modal/secondYearModal.mjs"
import thirdYearModal from "../modal/thirdYearModal.mjs"

const toDeleteRoles = [
    "Groupe 1", "Groupe 2", "Groupe 3", "Groupe 4", "Groupe 5",
    "2eme Secu 1", "2eme Dev 1", "2eme Dev 2", "2eme Secu 2",
    "3eme Dev", "3eme Secu"
]

const roleButton = new Button("role")
    .setExecute(async (interaction) => {
        let year;
        const roles = await interaction.member.roles.cache.map(async (role) => {
            if (["1ere", "2eme", "3eme"].includes(role.name)) {
                year = role.name
            } else if (toDeleteRoles.includes(role.name)) {
                if (interaction.member.roles instanceof GuildMemberRoleManager) {
                    await interaction.member.roles.remove(role)
                }
            }
        })

        await Promise.all(roles)

        switch (year) {
            case "1ere": interaction.showModal(firstYearModal.create()); break;
            case "2eme": interaction.showModal(secondYearModal.create()); break;
            case "3eme": interaction.showModal(thirdYearModal.create()); break;
            default: interaction.reply({content: "Vous n'avez pas definis votre annee d'etude, vous pouvez le faire via l'onglet 'Channels & Roles' du serveur discord.", ephemeral: true})
        }
    })

export default roleButton