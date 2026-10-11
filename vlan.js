/**
 * 802.1Q VLAN Tagging & Trunking Simulator
 */
const VLANSimulator = {
  simulateFrame(vlanId, portType) {
    if (portType === "Access") {
      return {
        port: "Access Port",
        action: "Untagged Delivery",
        description: `Frame received on Access Port assigned to VLAN ${vlanId}. Switch strips or omits the 802.1Q tag before delivering the untagged frame to the end device.`
      };
    } else if (portType === "Trunk") {
      return {
        port: "802.1Q Trunk Port",
        action: "Tagged Transmission",
        description: `Frame passing through trunk port is injected with an 802.1Q 4-byte tag containing VLAN ID ${vlanId} to identify its virtual network across switches.`
      };
    }
  }
};