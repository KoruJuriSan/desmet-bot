export default function isAddrPrivate(addr) {
    const address = addr.split('/')[0]
    const octets = address.split('.').map(Number)

    return (
        (octets[0] === 10) ||             
        (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) ||  
        (octets[0] === 192 && octets[1] === 168) 
    );
}