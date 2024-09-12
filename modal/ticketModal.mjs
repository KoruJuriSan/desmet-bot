import { EmbedBuilder, TextChannel } from "discord.js"
import { GuildModel } from "../schemas/models.mjs"
import Modal from "../classes/modal.mjs"

const ticketModal = new Modal("ticket", "Ticket Admin")
    .addTextInput("subject", "Sujet", "Toto a fait une connerie", true, 5, 50)
    .addTextInput("description", "Description", "Toto a fait tatata et je pense que tototo", true, 30, 1000)
    .setExecute( async (interaction) => {
        const subject = interaction.fields.getField("subject").value ?? "Subject"
        const description = interaction.fields.getField("description").value ?? "Description"

        const channelId = (await GuildModel.findOne({guild_id: interaction.guild.id})).ticket_channel
        const channel = await interaction.guild.channels.fetch(channelId)

        if (channel instanceof TextChannel) {

            const embed = new EmbedBuilder()
                .setTitle(subject)
                .setDescription(description)
                .setTimestamp(new Date())
                .setFooter({
                    iconURL: interaction.member.displayAvatarURL(),
                    text: interaction.member.nickname
                })
    
            await channel.send({embeds: [embed]})
            await interaction.reply({
                content: "Votre ticket a ete envoye:",
                embeds: [embed],
                ephemeral: true
            })

        } else {

            await interaction.reply({
                content: "Il n'y a pas de salon pour la reception des tickets dans ce serveur, veuiller contacter un Admin pour qu'il la mette ne place.",
                ephemeral: true
            })
        }

    })

export default ticketModal