import Command from "../../classes/command.mjs"
import { EmbedBuilder } from "discord.js"
import { Netmask } from "netmask"
import { isValidIpv4 } from "../../lib/isValidIp.mjs"
import isAddrPrivate from "../../lib/isAddrPrivate.mjs"
import computeAddrClass from "../../lib/computeAddrClass.mjs"

const ipInfo = new Command("ip-info", "Donne des informations sur une addresse IPv4")
    .setExecute( async (interaction) => {
        const args = interaction.options
        const addrString = args.getString("addresse")
        const isEphemeral = args.getBoolean("invisible") ?? true
        
        if (isValidIpv4(addrString)) {
            const bot = interaction.client.user
            const addr = new Netmask(addrString)
            const addrClass = computeAddrClass(addrString)
            const type = isAddrPrivate(addrString) ? "Privé" : "Public"

            const embed = new EmbedBuilder()
                .setAuthor({
                    name:bot.displayName,
                    iconURL: bot.displayAvatarURL(),
                })
                .setTitle("Informations sur l'addresse IP fournie")
                .setDescription(`L'adresse IP.\n\`\`\`\n${addrString}\n\`\`\`\nLe masque de sous-réseaux.\n\`\`\`\n${addr.mask}\n\`\`\`\nL'adresse de réseau.\n\`\`\`\n${addr.base}\n\`\`\`\nL'adresse de diffusion.\n\`\`\`\n${addr.broadcast}\n\`\`\`\nLa plage d'adresses utiles.\n\`\`\`\n${addr.first}/${addr.bitmask} -> ${addr.last}/${addr.bitmask}\n\`\`\`\nLa plage d'adresses.\n\`\`\`\n${addr.base}/${addr.bitmask} -> ${addr.broadcast}/${addr.bitmask}\n\`\`\`\nType\n\`\`\`\n${type}\n\`\`\`\nClasse\n\`\`\`\n${addrClass}\n\`\`\`\nNombre d'hôtes : \`${addr.size-2}\` | Nombre d'adresses : \`${addr.size}\``)
                .setColor("#ff89f5")

            await interaction.reply({
                embeds: [embed],
                ephemeral: isEphemeral
            })
        } else {
            await interaction.reply({
                content: `L'addresse ${addrString}, n'est pas au bon format. (x.x.x.x/CIDR (CIDR de 0-30)), ex: 192.168.0.12/24)`,
                ephemeral: true
            })
        }
    })

ipInfo.builder = ipInfo.builder
    .addStringOption(option =>
        option
            .setName("addresse")
            .setDescription("L'addresse IPv4 en question sous le format x.x.x.x/CIDR (CIDR de 0-30) (x de 0-255)")
            .setRequired(true)
            .setMinLength(7)
            .setMaxLength(75)
    )
    .addBooleanOption(option => option
        .setName("invisible")
        .setDescription("Si le message doit être invisible pour les autres utilisateurs, oui par défaut.")
    )

export default ipInfo