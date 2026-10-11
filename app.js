/**
 * Main Application Orchestrator & UI Renderer
 */
document.addEventListener("DOMContentLoaded", () => {
  switchTab("dashboard");
});

function switchTab(tab) {
  const container = document.getElementById("app-container");
  
  if (tab === "dashboard") {
    container.innerHTML = `
      <div class="space-y-6">
        <h2 class="text-2xl font-bold text-slate-100">Study Dashboard</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="card-slate">
            <h3 class="text-slate-400 text-sm">Overall Progress</h3>
            <p class="text-3xl font-bold text-blue-400 mt-2">12%</p>
          </div>
          <div class="card-slate">
            <h3 class="text-slate-400 text-sm">Target Exam Mark</h3>
            <p class="text-3xl font-bold text-indigo-400 mt-2">90 Marks</p>
          </div>
          <div class="card-slate">
            <h3 class="text-slate-400 text-sm">30-Day Plan</h3>
            <p class="text-3xl font-bold text-emerald-400 mt-2">Day 1 / 30</p>
          </div>
        </div>
      </div>
    `;
  } else if (tab === "calculators") {
    container.innerHTML = `
      <div class="space-y-6">
        <h2 class="text-2xl font-bold text-slate-100">IPv4 Subnet Calculator</h2>
        <div class="card-slate space-y-4">
          <div class="flex flex-col md:flex-row gap-4">
            <input id="calc-ip" type="text" placeholder="IP Address (e.g., 192.168.1.50)" class="p-2 rounded bg-slate-800 border border-slate-700 w-full">
            <input id="calc-cidr" type="number" placeholder="CIDR (e.g., 24)" class="p-2 rounded bg-slate-800 border border-slate-700 w-full">
            <button onclick="runSubnetCalc()" class="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded font-semibold">Calculate</button>
          </div>
          <div id="calc-results" class="hidden space-y-2 mt-4 text-sm border-t border-slate-700 pt-4"></div>
        </div>
      </div>
    `;
  }
}

function runSubnetCalc() {
  const ip = document.getElementById("calc-ip").value;
  const cidr = document.getElementById("calc-cidr").value;
  const res = SubnetCalculator.calculate(ip, cidr);

  const resDiv = document.getElementById("calc-results");
  if (!res) {
    resDiv.classList.remove("hidden");
    resDiv.innerHTML = `<p class="text-red-400">Invalid IP address or CIDR mask.</p>`;
    return;
  }

  resDiv.classList.remove("hidden");
  resDiv.innerHTML = `
    <div class="grid grid-cols-2 gap-2">
      <div><strong>Network Address:</strong> ${res.networkAddress}</div>
      <div><strong>Subnet Mask:</strong> ${res.subnetMask}</div>
      <div><strong>Broadcast Address:</strong> ${res.broadcastAddress}</div>
      <div><strong>Usable Host Range:</strong> ${res.firstUsable} - ${res.lastUsable}</div>
      <div><strong>Usable Hosts:</strong> ${res.usableHosts}</div>
    </div>
  `;
}