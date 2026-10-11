/**
 * VLSM Allocation Engine
 */
const VLSMCalculator = {
  allocate(baseIp, baseCidr, requirements) {
    // Sort host requirements descending
    const sorted = [...requirements].sort((a, b) => b.hosts - a.hosts);
    let currentInt = SubnetCalculator.calculate(baseIp, baseCidr).networkAddress;

    const results = sorted.map(req => {
      // Find required block size (+2 for network & broadcast)
      const neededBlock = req.hosts + 2;
      let hostBits = 1;
      while (Math.pow(2, hostBits) < neededBlock) hostBits++;
      
      const cidr = 32 - hostBits;
      const calc = SubnetCalculator.calculate(currentInt, cidr);

      // Increment network address for next subnet
      const netArr = calc.broadcastAddress.split('.').map(Number);
      let nextInt = ((netArr[0] << 24) | (netArr[1] << 16) | (netArr[2] << 8) | netArr[3]) + 1;
      currentInt = SubnetCalculator.intToIp(nextInt);

      return {
        name: req.name,
        requestedHosts: req.hosts,
        cidr: `/${cidr}`,
        subnetMask: calc.subnetMask,
        networkAddress: calc.networkAddress,
        usableRange: `${calc.firstUsable} - ${calc.lastUsable}`,
        broadcastAddress: calc.broadcastAddress
      };
    });

    return results;
  }
};