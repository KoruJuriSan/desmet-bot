export function isBinary(str) {
    return /^[01]+$/.test(str);
}

export function isOctal(str) {
    return /^[0-7]+$/.test(str);
}

export function isDecimal(str) {
    return /^\d+$/.test(str);
}

export function isHexadecimal(str) {
    return /^[0-9a-fA-F]+$/.test(str);
}