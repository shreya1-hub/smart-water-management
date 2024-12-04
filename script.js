// Mock Data
const data = {
    phLevels: [7.2, 6.0],
    connections: [
        { from: "Urban", to: "Agricultural", flow: "10 L/s" },
        { from: "Agricultural", to: "Industrial", flow: "15 L/s" }
    ],
    usage: {
        Urban: "500 L",
        Agricultural: "1000 L"
    },
    leakage: {
        flow: 45,
        threshold: 50
    }
};

// Populate Water Quality
const phLevelsElement = document.getElementById("ph-levels");
phLevelsElement.innerHTML = `pH Levels: ${data.phLevels.join(", ")} (Detected Issues)`;

// Populate Distribution Network
const connectionsElement = document.getElementById("connections");
connectionsElement.innerHTML = data.connections
    .map(conn => `<li>${conn.from} -> ${conn.to} (${conn.flow})</li>`)
    .join("");

// Populate Usage Data
const usageElement = document.getElementById("usage-data");
usageElement.innerHTML = Object.entries(data.usage)
    .map(([region, usage]) => `<li>${region}: ${usage}</li>`)
    .join("");

// Populate Leakage Detection
const leakageElement = document.getElementById("leak-status");
const leakageStatus =
    data.leakage.flow < data.leakage.threshold
        ? `Potential leakage detected. Total flow = ${data.leakage.flow} L`
        : "No leakage detected.";
leakageElement.innerHTML = `Status: ${leakageStatus}`;
