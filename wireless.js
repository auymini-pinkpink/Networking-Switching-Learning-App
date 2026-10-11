/**
 * Wireless Network & Security Simulator
 */
const WirelessSimulator = {
  evaluateSecurity(protocol) {
    const protocols = {
      "WPA3": { secure: true, rating: "High", notes: "Uses SAE (Simultaneous Authentication of Equals) protecting against offline dictionary attacks." },
      "WPA2": { secure: true, rating: "Moderate", notes: "Widely used with AES, but vulnerable to KRACK or weak pre-shared keys if weak passwords are chosen." },
      "WEP": { secure: false, rating: "Critical Risk", notes: "Obsolete and easily cracked in minutes due to weak IV initialization." }
    };
    return protocols[protocol] || { secure: false, rating: "Unknown", notes: "Unsupported protocol." };
  }
};