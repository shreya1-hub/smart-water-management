document.addEventListener('DOMContentLoaded', function () {
    let pHLevels = [7.2, 6.8, 6.0];
    let usageData = { Urban: 500, Agricultural: 1000 };
    let alertsQueue = [];
    let usageChart;

    function updatePHLevels() {
        const phLevelsElement = document.getElementById("ph-levels");
        phLevelsElement.innerHTML = `pH Levels: ${pHLevels.join(", ")} ${
            pHLevels.some(ph => ph < 6.5 || ph > 8.5) ? "(Detected Issues)" : "(All Good)"
        }`;
        checkPHAlerts();
    }

    function addPHLevel() {
        const newPH = parseFloat(document.getElementById("new-ph").value);

        if (isNaN(newPH) || newPH === "") {
            alert("Please enter a valid pH level.");
            return;
        }

        pHLevels.push(newPH);
        updatePHLevels();
        document.getElementById("new-ph").value = "";
    }

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

    function updateUsage() {
        const region = document.getElementById("region").value;
        const usageInput = parseFloat(document.getElementById("usage").value);

        if (isNaN(usageInput) || usageInput < 0) {
            alert("Please enter a valid usage value.");
            return;
        }

        usageData[region] = usageInput;
        renderUsageChart();
    }

    function checkPHAlerts() {
        alertsQueue = [];
        pHLevels.forEach(ph => {
            if (ph < 6.5 || ph > 8.5) {
                alertsQueue.push(`Alert: Unsafe pH level detected (${ph}).`);
            }
        });
        displayAlerts();
    }

    function displayAlerts() {
        const alertsDiv = document.getElementById("alerts-container");
        alertsDiv.innerHTML = alertsQueue.length
            ? alertsQueue.map(alert => `<p>${alert}</p>`).join("")
            : "No alerts yet.";
    }

    updatePHLevels();
    renderUsageChart();
    displayAlerts();
});
