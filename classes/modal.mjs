import { TextInputBuilder, ModalBuilder, TextInputStyle, ModalSubmitInteraction, ActionRowBuilder } from "discord.js"


/**
 * @callback executeModalCallback
 * @param {ModalSubmitInteraction} interaction - the modal submit interaction
 * @returns {Promise}
 */

export default class Modal {
    /**
     * 
     * @param {string} name - the name of the modal which will be used in their custom IDs (required)
     * @param {string} title - the title shown on the modal (optional)
     * @returns {Modal}
     */
    constructor(name, title) {
        if (!name) {throw new TypeError("The 'name' of the modal should be defined.")}

        this.name = name
        this.title = title ?? "Modal"
        this.rows = []
        this.nameCache = []
    }


    /**
     * 
     * @param {string} name - the name of the text input which will be used in its custom ID "input_name" (required)
     * @param {string|undefined} label - the title of the input (optional)
     * @param {string|undefined} placeholder - the placeholder shown in the input (optional)
     * @param {boolean|undefined} required - if the input is required (optional)
     * @param {number|undefined} min - the min lenght value of the input (optional)
     * @param {number|undefined} max - the max lenght value of the input (optional)
     * @param {TextInputStyle|undefined} style - if the button is on one line or if it is a paragraph. (optional)
     * @returns {Modal}
     */
    addTextInput(name, label, placeholder, required, min, max, style) {
        if (!name) {throw new TypeError("The 'name' of the text input should be defined.")}
        if (this.nameCache.length >= 5) {throw new RangeError("You can't have more than 5 rows on a modal")}
        if (this.nameCache.includes(name)) {throw new MediaError("You can't have the same name for two differents inputs")}

        const finalLabel = label ?? "Input"
        const finalPlaceholder = placeholder ?? "Value..."
        const finalRequired = required ?? false
        const finalMin = min ?? 0
        const finalMax = max ?? 3999
        const finalStyle = style ?? TextInputStyle.Short

        this.nameCache.push(name)

        const input = new TextInputBuilder()
            .setCustomId(`${name}`)
            .setLabel(finalLabel)
            .setPlaceholder(finalPlaceholder)
            .setMinLength(finalMin)
            .setMaxLength(finalMax)
            .setRequired(finalRequired)
            .setStyle(finalStyle)

        this.rows.push(input)
        return this
    }

    /**
     * 
     * @param {executeModalCallback} callback - the callback call when the modal is submited
     * @returns {Modal}
     */
    setExecute(callback) {
        this.execute = callback
        return this
    }

    /**
     * 
     * @returns {ModalBuilder}
     */
    create() {
        let rows
        if (this.rows.length < 1) {
            rows = new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId("undefined").setLabel("Default Input"))
        } else {
            rows = this.rows.map((input) => {
                return new ActionRowBuilder().setComponents(input)
            })
        }

        const modal = new ModalBuilder()
            .setCustomId(this.name)
            .setTitle(this.title)
            .addComponents(...rows)

        return modal
    }
}