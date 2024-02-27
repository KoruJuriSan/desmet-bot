import { EmbedBuilder, ButtonBuilder } from "npm:discord.js"
import randomInt from "../../lib/randomInt.js"
import sleep from "../../lib/sleep.js"

const delayBeforeKick = 1000
const countdownSeconds = 7
const rejoinIviteAgeSeconds = 60
const ChanceToWin = 6
const teasingImg = "https://media1.tenor.com/m/xqS6tMixZboAAAAd/kurtlar-vadisi-%C3%A7ak%C4%B1r.gif"
const loseImg = "https://media1.tenor.com/m/eEs1jRy5UXgAAAAC/house-explosion.gif"
const winImg = "https://media1.tenor.com/m/jNXwTFt0PFMAAAAC/spongebob-squarepants.gif"

export default {
    name: "russianRoulette",
    
    create(label, style, value) {
        return new ButtonBuilder()
            .setCustomId(`russianRoulette#value:${value}`)
            .setLabel(label)
            .setStyle(style)
    },

    async execute(interaction, client, args) {
        const value = args.value
        const channelId = interaction.channelId
        const guild = interaction.guild
        const channel = await guild.channels.fetch(channelId)

        if (value == "true") {
            // embed with a gif which tell other users some is playing the r***ian roulette.
            let embed = new EmbedBuilder()
                    .setTitle(`${interaction.user.displayName} joue a la roulette russe...`)
                    .setImage(teasingImg)
                    .setColor("#8fbc8f")
                    .setFooter({
                        text: interaction.user.displayName,
                        iconURL: interaction.user.displayAvatarURL(),
                    })

            let countDownEmbed = new EmbedBuilder()
                .setDescription(`Tir dans \`${countdownSeconds}s\``)

            await interaction.reply({
                embeds: [embed]
            })

            const message = await  channel.send({
                embeds: [countDownEmbed]
            })

            // countdown of x seconds
            for (let i = countdownSeconds-1; i >= 0; i--) {
                countDownEmbed = new EmbedBuilder()
                    .setDescription(`Tir dans \`${i}s\``)

                message.edit({ embeds: [countDownEmbed]})
                await sleep(1000)
            }
            await message.delete() // delete the countdown message

            // show whether the user has won or lost. If he loses, kick him.
            const random = randomInt(ChanceToWin)
            if (random == 1) {
                embed = new EmbedBuilder()
                    .setTitle(`${interaction.user.displayName} joue a la roulette russe...`)
                    .setImage(loseImg)
                    .setDescription("Bang !!!")
                    .setColor("#8fbc8f")
                    .setFooter({
                        text: interaction.user.displayName,
                        iconURL: interaction.user.displayAvatarURL(),
                    })

                await interaction.editReply({ embeds: [embed]})

                await sleep(delayBeforeKick)

                // Create, and send a invite to the guild in DM of the user.
                try {
                    const dm = await interaction.user.createDM(true)
                    const invite = await channel.createInvite({ maxAge: rejoinIviteAgeSeconds+10, maxUses: 1 })
                    const invitationEmbed = new EmbedBuilder()
                        .setTitle(`Invitation (${rejoinIviteAgeSeconds}s !)`)
                        .setURL(`${invite}`)
                        .setDescription(`**Gros baka!**, Tu as encore joué à la roulette russe.\n\nBon, c'est bien parce que c'est toi, voila une [invitation](${invite}) pour revenir dans le serveur.\n\nAttention, tu n'as que **${rejoinIviteAgeSeconds} secondes** pour rejoindre.`)
                        .setColor("#00b0f4");

                    await dm.send({
                        embeds: [invitationEmbed]
                    })
                } catch(err) {console.error(err)}

                // Kick the user if can.
                try {await interaction.member.kick("Joue a la roulette russe.")}
                catch {
                    embed = new EmbedBuilder()
                    .setTitle(`${interaction.user.displayName} joue a la roulette russe...`)
                    .setDescription(`Erreur: Le bot n'a pas la permission de kick l'utilisateur"${interaction.user.displayName}"`)
                    .setColor("#e01b24")
                    .setFooter({
                        text: interaction.user.displayName,
                        iconURL: interaction.user.displayAvatarURL(),
                    })

                    await interaction.editReply({ embeds: [embed]})                    
                }
            } else {
                embed = new EmbedBuilder()
                    .setTitle(`${interaction.user.displayName} joue a la roulette russe...`)
                    .setImage(winImg)
                    .setDescription("Click!")
                    .setColor("#8fbc8f")
                    .setFooter({
                        text: interaction.user.displayName,
                        iconURL: interaction.user.displayAvatarURL(),
                    })

                await interaction.editReply({ embeds: [embed]})
            }

        } else {
            await interaction.reply({
                content: "L'opération a été avortée.",
                ephemeral: true
            })
        }
    }
}