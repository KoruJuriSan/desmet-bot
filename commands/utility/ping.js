const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Donne la latence entre le serveur discord et le bot."),
    async execute(interaction) {
        await interaction.reply({content: `Latence: \`${Date.now() - interaction.createdTimestamp}ms\``, ephemeral: true})
    }
}