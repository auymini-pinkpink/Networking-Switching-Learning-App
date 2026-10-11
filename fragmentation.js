/**
 * IP Fragmentation Calculation Engine
 */
const FragmentationCalculator = {
  fragment(totalLength, headerLength, mtu) {
    const dataSize = totalLength - headerLength;
    const maxPayloadPerFragment = Math.floor((mtu - headerLength) / 8) * 8; // Must be multiple of 8 bytes

    const fragments = [];
    let offset = 0;
    let bytesRemaining = dataSize;

    while (bytesRemaining > 0) {
      const payloadSize = Math.min(bytesRemaining, maxPayloadPerFragment);
      bytesRemaining -= payloadSize;

      fragments.push({
        totalLength: payloadSize + headerLength,
        headerLength,
        payloadSize,
        offset: offset / 8, // Offset in 8-byte units
        moreFragments: bytesRemaining > 0 ? 1 : 0
      });

      offset += payloadSize;
    }

    return fragments;
  }
};