import { SlashCommandBuilder, EmbedBuilder, ButtonStyle, ActionRowBuilder } from "npm:discord.js"

export default {
    data: new SlashCommandBuilder()
        .setName("russian-roulette")
        .setDescription("Une roulette r***e qui vous kick une fois sur six. Attention a vous ;)"),

    async execute(interaction) {
        const client = interaction.client
        const  button = client.buttons.get("russianRoulette")

        const attentionEmbed = new EmbedBuilder()
            .setTitle("**ATTENTION!**")
            .setDescription("En jouant à la roulette russe, vous devez accepter les risques suivants :\n\n- Il est possible que vous soyez exclu du serveur.\n\n- Si vos messages privés sont bloqués, le bot ne pourra pas vous envoyer une invitation pour revenir dans le serveur par la suite.\n\nVoulez-vous quand meme poursuivre ?")
            .setColor("#e01b24")

        // Yes or No buttons, user choose if he want to proceed.
        const row = new ActionRowBuilder()
            .addComponents(
                button.create("Oui", ButtonStyle.Danger, true),
                button.create("Non", ButtonStyle.Success, false)
            )

        // first reply with the "attention embed" (ask if the user really want to proceed)
        await interaction.reply({
            embeds: [attentionEmbed],
            components: [row],
            ephemeral: true
        })
    }
}