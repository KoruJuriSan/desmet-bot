import { SlashCommandBuilder, 
        EmbedBuilder,
        ActionRowBuilder,
        ButtonStyle
} from "npm:discord.js"

const thumbnailURL = "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ficons.iconarchive.com%2Ficons%2Fpaomedia%2Fsmall-n-flat%2F1024%2Fcalendar-icon.png&f=1&nofb=1&ipt=4a6b7134cc885fb7fc2dc0146a5009b6d53b3ebf20879bc16b00982e2365133c&ipo=images"

export default {
    data: new SlashCommandBuilder()
        .setName("schedule")
        .setDescription("Donne l'horraire pour un groupe precis dans ")
        .addStringOption(option => 
            option
                .setName("groupe")
                .setDescription("de quel groupe voulez-vous avoir l'horraire ? 1-5")
                .setRequired(true)
                .addChoices(...new Array(5).fill(0).map((e, k) => {
                    return {name: String(k+1), value: String(k+1)}
                }))
        )
        .addBooleanOption(option =>
            option
                .setName("ephemeral")
                .setDescription("est-ce que le message doit-etre invisible pour les autre utilisateurs ou non ?")
        ),
    async execute(interaction, client) {
        // geting command's args
        const args = interaction.options
        const group = args.getString("groupe")
        const isEphemeral = args.getBoolean("ephemeral") ?? true

        // Embed describes what does the button under it
        const embed = new EmbedBuilder()
            .setTitle("Horraire")
            .setDescription(`Horaire des cours pour les élèves en première année de Bacheliers en informatique à la HEH. L'horaire suivant est pour le groupe ${group}\n\n> Hier\n> Aujourd'hui\n> Demain\n> Apres-demain\n> Surlandemain \n`)
            .setThumbnail(thumbnailURL)
            .setColor("#8fbc8f")
            .setFooter({
                text: "Si jamais il y un probleme avec le bot => #desmet-bot",
                iconURL: client.user.avatarURL()
            })

        // Buttons under the embeds, each button with its own "day-offset"
        const button = client.buttons.get("schedule")
        const row = new ActionRowBuilder()
            .addComponents(
                button.create("Hier", ButtonStyle.Danger, group, -1),
                button.create("Aujourd'hui", ButtonStyle.Success, group, 0),
                button.create("Demain", ButtonStyle.Primary, group, 1),
                button.create("Après-Demain", ButtonStyle.Secondary, group, 2),
                button.create("Surlendemain", ButtonStyle.Secondary, group, 3)
            )

        // Bot's response to the command
        interaction.reply({
            embeds: [embed],
            components: [row],
            ephemeral: isEphemeral
        })
    }
}