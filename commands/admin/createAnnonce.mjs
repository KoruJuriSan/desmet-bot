import Command from "../../classes/command.mjs"
import { EmbedBuilder, GuildMember, roleMention, userMention, Role, User, PermissionFlagsBits } from "discord.js"

const createAnnonce = new Command("create-annonce", "Crée un embed d'annonce dans le channel actuel via le bot.")
    .setExecute( async (interaction) => {

        /**
         * @type {GuildMember}
         */
        const member = interaction.member
        const username = member.nickname
        const pp = member.displayAvatarURL()

        const args = interaction.options
        /**
         * @type {Role|GuildMember|User}
        */
        const mentionable = args.getMentionable("mention")
        const title = args.getString("titre")
        const text = args.getString("text")
        const image = args.getAttachment("image") ?? ""
        const thumbnail = args.getAttachment("thumbnail") ?? ""

        let mention = ""

        if (mentionable instanceof Role) {mention = roleMention(mentionable.id)}
        else if (mentionable instanceof GuildMember) {mention = userMention(mentionable.user.id)}
        else if (mentionable instanceof User) {mention = userMention(mentionable.id)}

        const annonceEmbed = new EmbedBuilder()
            .setColor("#ff89f5")
            .setTitle(title)
            .setAuthor({ name: username, iconURL: pp })
            .setDescription(text)
            .setThumbnail(thumbnail.url)
            .setImage(image.url)
            .setTimestamp()
            .setFooter({ text: username, iconURL: pp })

        await interaction.channel.send({ embeds: [annonceEmbed], content: `${mention}`})
    })

createAnnonce.builder = createAnnonce.builder
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
    .addStringOption(option => option
        .setName("titre")
        .setDescription("Le sujet de l'annonce")
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName("texte")
        .setDescription("Le content de l'annonce")
        .setRequired(true)
    )
    .addMentionableOption(option => option
        .setName("mention")
        .setDescription("Mention d'utilisateur")
    )
    .addAttachmentOption(option => option
        .setName("image")
        .setDescription("the full-width image at the bottom of the embed")
    )
    .addAttachmentOption(option => option
        .setName("thumbnail")
        .setDescription("the small image in the top right corner of the embed")
    )

export default createAnnonce