/**
 * IPv4 Subnetting Engine
 */
const SubnetCalculator = {
  calculate(ip, cidr) {
    const prefix = parseInt(cidr, 10);
    if (isNaN(prefix) || prefix < 0 || prefix > 32) return null;

    const ipArr = ip.split('.').map(Number);
    if (ipArr.length !== 4 || ipArr.some(octet => isNaN(octet) || octet < 0 || octet > 255)) {
      return null;
    }

    const ipInt = (ipArr[0] << 24) | (ipArr[1] << 16) | (ipArr[2] << 8) | ipArr[3];
    const maskInt = prefix === 0 ? 0 : (~0 << (32 - prefix));
    
    const networkInt = ipInt & maskInt;
    const broadcastInt = networkInt | (~maskInt);

    const totalAddresses = Math.pow(2, 32 - prefix);
    const usableHosts = prefix >= 31 ? (prefix === 31 ? 2 : 1) : totalAddresses - 2;

    return {
      networkAddress: this.intToIp(networkInt),
      broadcastAddress: this.intToIp(broadcastInt),
      subnetMask: this.intToIp(maskInt),
      firstUsable: this.intToIp(prefix >= 31 ? networkInt : networkInt + 1),
      lastUsable: this.intToIp(prefix >= 31 ? broadcastInt : broadcastInt - 1),
      totalAddresses,
      usableHosts: usableHosts < 0 ? 0 : usableHosts
    };
  },

  intToIp(int) {
    return [
      (int >>> 24) & 255,
      (int >>> 16) & 255,
      (int >>> 8) & 255,
      int & 255
    ].join('.');
  }
};