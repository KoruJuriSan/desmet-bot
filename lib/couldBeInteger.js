module.exports = function couldBeInteger(text) {
    return /[0-9]*$/.test(text)
}