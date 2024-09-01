import Command from "../../classes/command.mjs"
import { EmbedBuilder, User } from "discord.js"

const whoami = new Command("whoami", "Donne des informations sur un utilisateur, sur vous par défaut.")
    .setExecute( async (interaction) => {

        const args = interaction.options
        /**
         * @type {User}
         */
        const user = args.getUser("utilisateur") ?? interaction.member.user
        const isEphemeral = args.getBoolean("invisible") ?? true

        const color = (await user.fetch()).accentColor ?? "#ff89f5"
        const createdAt = user.createdAt ?? Date()
        const pp = user.avatarURL() ?? ""
        const username = user.displayName ?? "(name not found)"
        const tag = user.tag ?? "(tag not found)"
        const id = user.id ?? "(id not found)"
        const banner = user.bannerURL()

        const userEmbed = new EmbedBuilder()
            .setDescription(`Tag: ${tag} \nId: ${id}\n------------------------------------`)
            .setColor(color)
            .setAuthor({ name: username, iconURL: pp })
            .setThumbnail(pp)
            .setImage(banner)
            .setTimestamp(createdAt)
            .setFooter({ text: 'Created at', iconURL: pp })
        
        await interaction.reply({
            ephemeral: isEphemeral,
            embeds: [userEmbed]
        })
        

    })

whoami.builder = whoami.builder
    .addUserOption(option => option
        .setName("utilisateur")
        .setDescription("L'utilisateur dont vous voulez obtenir les informations, vous par défaut.")
    )
    .addBooleanOption(option => option
        .setName("invisible")
        .setDescription("Si le message doit être invisible pour les autres utilisateurs, oui par défaut.")
    )


export default whoami