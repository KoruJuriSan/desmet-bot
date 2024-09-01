import Command from "../../classes/command.mjs"

const ping = new Command("ping", "Donne la latence entre le serveur discord et le bot.")
    .setExecute( async (interaction) => {

        const isEphemeral = interaction.options.getBoolean("invisible") ?? true
        const latency = Date.now() - interaction.createdTimestamp

        await interaction.reply({
            content: `Latence: \`${latency}ms\``,
            ephemeral: isEphemeral
        })
    })

ping.builder = ping.builder
    .addBooleanOption(option => option
        .setName("invisible")
        .setDescription("Si le message doit être invisible pour les autres utilisateurs, oui par défaut.")
    )

export default ping