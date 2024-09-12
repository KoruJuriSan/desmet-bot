import { ActionRowBuilder, EmbedBuilder, PermissionFlagsBits, TextChannel, ChannelType, ButtonStyle } from "discord.js"
import Command from "../../classes/command.mjs"
import ticketButton from "../../buttons/ticketButton.mjs"

const createTicketForm = new Command("create-ticket-form", "Crée un embed avec un bouton pour créer un ticket Admin si le salon est definis.")
    .setExecute(async (interaction) => {
        const channel = interaction.options.getChannel("salon") ?? interaction.channel
        if (channel instanceof TextChannel) {

            try {
                const embed = new EmbedBuilder()
                    .setTitle("Creer un ticket?")
                    .setDescription("Permet de contacter un ou plusieurs administrateurs du serveur. Cela ouvre un formulaire dans lequel vous devez renseigner le sujet de votre demande ainsi qu'une petite description de celle-ci.")
                    .setFooter({
                        text: interaction.client.user.displayName,
                        iconURL: interaction.client.user.displayAvatarURL()
                    })

            
                const row = new ActionRowBuilder().addComponents(ticketButton.create("Open Ticket!", ButtonStyle.Primary))

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

createTicketForm.builder = createTicketForm.builder
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(option => option 
        .setName("salon")
        .setDescription("Le salon en question est, par défaut, celui où vous êtes.")
        .addChannelTypes([ChannelType.GuildText])
    )

export default createTicketForm