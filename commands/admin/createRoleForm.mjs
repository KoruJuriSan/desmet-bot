import { ActionRowBuilder, EmbedBuilder, PermissionFlagsBits, TextChannel, ChannelType, ButtonStyle } from "discord.js"
import Command from "../../classes/command.mjs"
import roleButton from "../../buttons/roleButton.mjs"

const createRoleForm = new Command("create-role-form", "Crée un embed avec un bouton pour ouvrir un modal pour choisir son option")
    .setExecute(async (interaction) => {
        const channel = interaction.options.getChannel("salon") ?? interaction.channel
        if (channel instanceof TextChannel) {

            try {
                const embed = new EmbedBuilder()
                    .setTitle("Choisit ton groupe")
                    .setDescription("En choisisant votre groupe, vous pourrez ecrire dans le channel qui corespond a celui-ci dans le discord.")
                    .addFields([
                        {name: "1ere", value: "Groupe - 1, 2, 3, 4, 5"},
                        {name: "2eme", value: "Groupe - dev-1, dev-2, secu-1, secu-2"},
                        {name: "3eme", value: "Groupe - dev, secu"}
                    ])
                    .setFooter({
                        text: interaction.client.user.displayName,
                        iconURL: interaction.client.user.displayAvatarURL()
                    })

            
                const row = new ActionRowBuilder().addComponents(roleButton.create("Je veux!", ButtonStyle.Primary))

                await channel.send({
                    embeds: [embed],
                    components: [row]
                })

            } catch(err) {
                console.error(err)
            }

        } else {
            await interaction.reply({
                content: "Le channel que vous avez choisi n'existe pas ou n'est pas un TextChannel."
            })
        }
    })

createRoleForm.builder = createRoleForm.builder
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(option => option 
        .setName("salon")
        .setDescription("Le salon en question est, par défaut, celui où vous êtes.")
        .addChannelTypes([ChannelType.GuildText])
    )

export default createRoleForm