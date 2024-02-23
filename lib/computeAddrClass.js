export default function computeAddrClass(addr) {
    const firstOctet = parseInt(addr.split(".")[0])

    if (firstOctet < 0 || firstOctet > 255) {
        throw new RangeError(`The first octet of the mask should be less than or equal to 255 and greater than or equal to 0, received: "${firstOctet}"`)
    }

    if (firstOctet <= 127) {
        return "A"
    } else if (firstOctet <= 191) {
        return "B"
    } else if (firstOctet <= 223) {
        return "C"
    } else if (firstOctet <= 239) {
        return "D"
    } else if (firstOctet <= 255) {
        return "E"
    }
}