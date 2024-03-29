import { SlashCommandBuilder, EmbedBuilder } from "npm:discord.js"
import { Netmask } from "npm:netmask"
import { isValidIpv4 } from "../../lib/isValidIp.js"
import computeAddrClass from "../../lib/computeAddrClass.js";
import isAddrPrivate from "../../lib/isAddrPrivate.js"

export default {
    data: new SlashCommandBuilder()
        .setName("ip-info")
        .setDescription("Donne des informations sur une addresse IPv4")
        .addStringOption(option =>
            option
                .setName("addresse")
                .setDescription("L'addresse IPv4 en question sous le format x.x.x.x/CIDR (CIDR de 0-30) (x de 0-255)")
                .setRequired(true)
                .setMinLength(7)
                .setMaxLength(75)
        )
        .addBooleanOption(option => 
            option
                .setName("ephemeral")
                .setDescription("est-ce que le message doit-etre invisible pour les autre utilisateurs ou non ?")
        ),

    async execute(interaction) {
        const args = interaction.options
        const addrString = args.getString("addresse")
        const isEphemeral = args.getBoolean("ephemeral") ?? true
        
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
                .setTitle("Informations the about provided IP.")
                .setDescription(`L'adresse IP.\n\`\`\`\n${addrString}\n\`\`\`\nLe masque de sous-réseaux.\n\`\`\`\n${addr.mask}\n\`\`\`\nL'adresse de réseau.\n\`\`\`\n${addr.base}\n\`\`\`\nL'adresse de diffusion.\n\`\`\`\n${addr.broadcast}\n\`\`\`\nLa plage d'adresses utiles.\n\`\`\`\n${addr.first}/${addr.bitmask} -> ${addr.last}/${addr.bitmask}\n\`\`\`\nLa plage d'adresses.\n\`\`\`\n${addr.base}/${addr.bitmask} -> ${addr.broadcast}/${addr.bitmask}\n\`\`\`\nType\n\`\`\`\n${type}\n\`\`\`\nClasse\n\`\`\`\n${addrClass}\n\`\`\`\nNombre d'hôtes : \`${addr.size-2}\` | Nombre d'adresses : \`${addr.size}\``)
                .setColor("#8fbc8f")

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
    }
}