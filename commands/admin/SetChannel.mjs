import { PermissionFlagsBits, ChannelType, TextChannel, userMention } from "discord.js"
import Command from "../../classes/command.mjs"
import { GuildModel } from "../../schemas/models.mjs"

const setChannel = new Command("set-channel", "Définis le salon dans lequel les tickets Admin vont être listés.")
    .setExecute( async (interaction) => {
        const args = interaction.options
        const channel = args.getChannel("salon") ?? interaction.channel
        const type = args.getString("type")
        const guildId = interaction.guild.id

        if (channel instanceof TextChannel) {
            switch(type) {
                case "ticket": await GuildModel.updateOne({guild_id: guildId}, {ticket_channel: channel.id}); break
                case "welcome": await GuildModel.updateOne({guild_id: guildId}, {welcomme_channel: channel.id}); break
            }

            await interaction.reply({
                content: `Le salon ${channel.name} a été enregistré dans la base de données. Avec le type ${type}`,
                ephemeral: true
            })

            channel.send(`Ce salon a été choisi par ${userMention(interaction.user)} pour être de type ${type}.`)

        } else {
            await interaction.reply({
                content: `Le salon dans lequel vous etes n'est pas compatible avec le type attendu. (Salon Textuel)`,
                ephemeral: true
            })
        }

    })

setChannel.builder = setChannel.builder
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option => option
        .setName("type")
        .setDescription("Type de salon, ticket: salon ou sont effiche les tickets Admin, welcome: salon de bienvenue")
        .setRequired(true)
        .setChoices(
            {name: "ticket", value: "ticket"},
            {name: "welcome", value: "welcome"}
        )
    )
    .addChannelOption(option => option 
        .setName("salon")
        .setDescription("Le salon en question est, par défaut, celui où vous êtes.")
        .addChannelTypes([ChannelType.GuildText])
    )

export default setChannel