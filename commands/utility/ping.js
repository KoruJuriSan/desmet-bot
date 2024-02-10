const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Donne la latence entre le serveur discord et le bot."),
        
    async execute(interaction) {
        latency = Date.now() - interaction.createdTimestamp
        await interaction.reply({
            content: `Latence: \`${latency}ms\``,
            ephemeral: true
        })
    }
}