import Modal from "../classes/modal.mjs"

async function setRole(roleName, interaction) {
    const role = interaction.guild.roles.cache.find(role => role.name === roleName)
    await interaction.member.roles.add([role])
    await interaction.reply({content: "Vous avez recus votre groupe, Bonne annee sur notre serveur", ephemeral: true})
}

const thirdYearModal = new Modal("third-year-modal", "Formulaire de groupe de 3eme")
    .addTextInput("name", "Nom", "ex: Jaque", true, 2, 20)
    .addTextInput("firstname", "Prenom", "ex: Dutrou", true, 2, 20)
    .addTextInput("group", "Groupe (dev, secu)", "ex: dev", true, 3, 4)
    .setExecute(async (interaction) => {
        const name = interaction.fields.getField("name").value
        const firstname = interaction.fields.getField("firstname").value
        const group = interaction.fields.getField("group").value

        try {
            if (name, firstname, group) {
                switch (group) {
                    case "secu": await setRole("3eme Secu", interaction); break
                    case "dev": await setRole("3eme Dev", interaction); break
                    default: interaction.reply({content: `Role incorrect! "${group}" n'est pas dans (dev, secu)!`, ephemeral: true})
                }
            }
        } catch(err) {
            
            await interaction.reply({content: "Le role que vous souhaitez n'est pas disponible, veuillez contacter un Admin pour plus d'informations", ephemeral: true})

        }
    })

export default thirdYearModal