/**
 * Automated Unit Tests for Subnetting and Fragmentation
 */
function runTests() {
  console.log("Running automated tests...");
  
  // Test Subnet Calculator
  const sub = SubnetCalculator.calculate("192.168.1.50", "24");
  console.assert(sub.networkAddress === "192.168.1.0", "Subnet Test 1 Failed");
  console.assert(sub.broadcastAddress === "192.168.1.255", "Subnet Test 2 Failed");
  
  // Test Fragmentation Calculator
  const frags = FragmentationCalculator.fragment(1500, 20, 1500);
  console.assert(frags.length === 1, "Fragmentation Test 1 Failed");

  console.log("All automated tests completed successfully!");
}

// Uncomment to run tests in the browser console
// runTests();