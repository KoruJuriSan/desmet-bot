const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("schedule")
        .setDescription("Donne l'horraire pour un groupe precis dans ")
        .addStringOption(option => 
            option
                .setName("groupe")
                .setDescription("de quel groupe voulez-vous avoir l'horraire ? 1-4")
                .setRequired(true)
                .addChoices(
                    {name: "groupe 1", value: "1"},
                    {name: "groupe 2", value: "2"},
                    {name: "groupe 3", value: "3"},
                    {name: "groupe 4", value: "4"},
                    {name: "groupe 5", value: "5"}
                )
        )
        .addBooleanOption(option =>
            option
                .setName("ephemeral")
                .setDescription("est-ce que le message doit-etre invisible pour les autre utilisateurs ou non ?")
        ),
    async execute(interaction, client) {

        group = interaction.options.getString("groupe")
        ephemeral = interaction.options.getBoolean("ephemeral") ?? true

        const embed = new EmbedBuilder()
            .setTitle("Horraire")
            .setURL("https://example.com")
            .setDescription(`Horraire des cours pour les eleves en Bacherliers d'informatique a la HEH, l'horraire suivant est pour le groupe ${group}\n\n> Hier\n> Aujourd'hui\n> Demain\n> Apres-demain\n> Surlandemain`)
            .setColor("#ff4500")
            .setThumbnail("https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ficons.iconarchive.com%2Ficons%2Fpaomedia%2Fsmall-n-flat%2F1024%2Fcalendar-icon.png&f=1&nofb=1&ipt=4a6b7134cc885fb7fc2dc0146a5009b6d53b3ebf20879bc16b00982e2365133c&ipo=images")

        const yesterday = new ButtonBuilder()
            .setCustomId(`schedule#day:yesterday,group:${group}`)
            .setLabel("Hier")
            .setStyle(ButtonStyle.Danger)

        const today = new ButtonBuilder()
            .setCustomId(`schedule#day:today,group:${group}`)
            .setLabel("Aujourd'hui")
            .setStyle(ButtonStyle.Success)

        const tomorrow = new ButtonBuilder()
            .setCustomId(`schedule#day:tomorrow,group:${group}`)
            .setLabel("Demain")
            .setStyle(ButtonStyle.Primary)

        const afterTomorrow = new ButtonBuilder()
            .setCustomId(`schedule#day:aftertomorrow,group:${group}`)
            .setLabel("Après-Demain")
            .setStyle(ButtonStyle.Secondary)

        const inThreeDays = new ButtonBuilder()
            .setCustomId(`schedule#day:inthreedays,group:${group}`)
            .setLabel("Surlendemain")
            .setStyle(ButtonStyle.Secondary)

        const row = new ActionRowBuilder()
            .addComponents(yesterday, today, tomorrow, afterTomorrow, inThreeDays)

        interaction.reply({
            embeds: [embed],
            components: [row],
            ephemeral: ephemeral
        })
    }
}