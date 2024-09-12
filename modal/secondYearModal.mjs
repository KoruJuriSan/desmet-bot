import Modal from "../classes/modal.mjs"

async function setRole(roleName, interaction) {
    const role = interaction.guild.roles.cache.find(role => role.name === roleName)
    await interaction.member.roles.add([role])
    await interaction.reply({content: "Vous avez reçu votre groupe. Bonne année sur notre serveur !", ephemeral: true})
}

const secondYearModal = new Modal("second-year-modal", "Formulaire de groupe de 2eme")
    .addTextInput("name", "Nom", "ex: Jaque", true, 2, 20)
    .addTextInput("firstname", "Prenom", "ex: Dutrou", true, 2, 20)
    .addTextInput("group", "Groupe (dev-1, dev-2, secu-1, secu-2)", "ex: secu-2", true, 5, 6)
    .setExecute(async (interaction) => {
        const name = interaction.fields.getField("name").value
        const firstname = interaction.fields.getField("firstname").value
        const group = interaction.fields.getField("group").value

        try {
            if (name, firstname, group) {
                switch (group) {
                    case "secu-1": await setRole("2eme Secu ❶", interaction); break
                    case "secu-2": await setRole("2eme Secu ❷", interaction); break
                    case "dev-1": await setRole("2eme Dev ❶", interaction); break
                    case "dev-2": await setRole("2eme Dev ❷", interaction); break
                    default: interaction.reply({content: `Role incorrect! "${group}" n'est pas dans (dev-1, dev-2, secu-1, secu-2)!`, ephemeral: true})
                }
            }
        } catch(err) {
            
            await interaction.reply({content: "Le role que vous souhaitez n'est pas disponible, veuillez contacter un Admin pour plus d'informations", ephemeral: true})

        }
    })

export default secondYearModal