const ical = require("ical")
const axios = require("axios")

module.exports = async function requestIcsFromUrl(url) {
    res = await axios({
        method: "GET",
        url: url
    })
    data = res.data

    ics = ical.parseICS(data)
    return ics
}