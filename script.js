document.addEventListener('DOMContentLoaded', function () {
    // Data storage
    let pHLevels = [7.2, 6.8, 6.0];
    let usageData = { Urban: 500, Agricultural: 1000 };
    let alertsQueue = [];
    let usageChart;

    // Function to update pH levels
    function updatePHLevels() {
        const phLevelsElement = document.getElementById("ph-levels");
        phLevelsElement.innerHTML = `pH Levels: ${pHLevels.join(", ")} ${
            pHLevels.some(ph => ph < 6.5 || ph > 8.5) ? "(Detected Issues)" : "(All Good)"
        }`;
        checkPHAlerts();
    }

    // Function to add a pH level
    window.addPHLevel = function () {
        const newPH = parseFloat(document.getElementById("new-ph").value);

        if (isNaN(newPH) || newPH === "") {
            alert("Please enter a valid pH level.");
            return;
        }

        pHLevels.push(newPH);
        updatePHLevels();
        saveHistory({ type: "pH", value: newPH }); // Save to historical data
        document.getElementById("new-ph").value = "";
        alert("New pH Level Added Successfully!");
    };

    // Function to render the usage chart
    function renderUsageChart() {
        const ctx = document.getElementById('usage-chart').getContext('2d');
        if (usageChart) {
            usageChart.destroy();
        }
        usageChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Urban', 'Agricultural'],
                datasets: [{
                    label: 'Water Usage (Liters)',
                    data: [usageData.Urban, usageData.Agricultural],
                    backgroundColor: ['#4CAF50', '#2196F3']
                }]
            },
            options: { responsive: true }
        });
    }

    // Function to update water usage
    window.updateUsage = function () {
        const region = document.getElementById("region").value;
        const usageInput = parseFloat(document.getElementById("usage").value);

        if (isNaN(usageInput) || usageInput < 0) {
            alert("Please enter a valid usage value.");
            return;
        }

        usageData[region] = usageInput;
        renderUsageChart();
        saveHistory({ type: "Usage", value: `${region} - ${usageInput} liters` }); // Save to historical data
    };

    // Function to check pH alerts
    function checkPHAlerts() {
        alertsQueue = [];
        pHLevels.forEach(ph => {
            if (ph < 6.5 || ph > 8.5) {
                alertsQueue.push(`Alert: Unsafe pH level detected (${ph}).`);
            }
        });
        displayAlerts();
    }

    // Function to display alerts
    function displayAlerts() {
        const alertsDiv = document.getElementById("alerts-container");
        alertsDiv.innerHTML = alertsQueue.length
            ? alertsQueue.map(alert => `<p>${alert}</p>`).join("")
            : "No alerts yet.";
    }

    // Function to save historical data
    function saveHistory(data) {
        const historyDiv = document.getElementById("history-container");
        const newEntry = document.createElement("p");
        newEntry.textContent = `Type: ${data.type}, Value: ${data.value}`;
        historyDiv.appendChild(newEntry);
    }

    // Initialize the app
    updatePHLevels();
    renderUsageChart();
    displayAlerts();
});
