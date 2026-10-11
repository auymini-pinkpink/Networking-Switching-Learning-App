/**
 * Spanning Tree Protocol (STP) Election & Port State Simulator
 */
const STPSimulator = {
  runElection(switches) {
    // switches is an array of objects: { id, priority, mac }
    if (!switches || switches.length === 0) return null;

    // Step 1: Find Root Bridge (Lowest Priority, then Lowest MAC)
    const rootBridge = switches.reduce((best, curr) => {
      if (curr.priority < best.priority) return curr;
      if (curr.priority === best.priority && curr.mac < best.mac) return curr;
      return best;
    }, switches[0]);

    return {
      rootBridgeId: rootBridge.id,
      explanation: `Switch ${rootBridge.id} elected as Root Bridge due to Priority ${rootBridge.priority} and MAC ${rootBridge.mac}.`
    };
  }
};