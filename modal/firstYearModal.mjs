import { ModalSubmitInteraction, Role } from "discord.js"
import Modal from "../classes/modal.mjs"

/**
 * 
 * @param {Role} roleName 
 * @param {string} name 
 * @param {string} firstname 
 * @param {ModalSubmitInteraction} interaction 
 */
async function setRole(roleName, name, firstname, interaction) {
    const role = interaction.guild.roles.cache.find(role => role.name === roleName)
    await interaction.member.roles.add([role])
    await interaction.reply({content: "Vous avez recus votre groupe, Bonne annee sur notre serveur", ephemeral: true})
    try {
        await interaction.member.setNickname(`${name} ${firstname}`, "role-form")
    } catch(err) {}
}

const firstYearModal = new Modal("first-year-modal", "Formulaire de groupe de 1ere")
    .addTextInput("name", "Nom", "ex: Jaque", true, 2, 20)
    .addTextInput("firstname", "Prenom", "ex: Dutrou", true, 2, 20)
    .addTextInput("group", "Groupe (1, 2, 3, 4, 5)", "ex: 3", true, 1, 1)
    .setExecute(async (interaction) => {
        const name = interaction.fields.getField("name").value
        const firstname = interaction.fields.getField("firstname").value
        const group = interaction.fields.getField("group").value

        try {
            if (name, firstname, group) {
                switch (group) {
                    case "1": await setRole("Groupe ❶", name, firstname, interaction); break
                    case "2": await setRole("Groupe ❷", name, firstname, interaction); break
                    case "3": await setRole("Groupe ❸", name, firstname, interaction); break
                    case "4": await setRole("Groupe ❹", name, firstname, interaction); break
                    case "5": await setRole("Groupe ❺", name, firstname, interaction); break
                    default: interaction.reply({content: `Role incorrect! "${group}" n'est pas dans (1, 2, 3, 4, 5)!`, ephemeral: true})
                }
            }
        } catch(err) {
            console.error(err)
            await interaction.reply({content: "Le role que vous souhaitez n'est pas disponible, veuillez contacter un Admin pour plus d'informations", ephemeral: true})
        }
    })

export default firstYearModal