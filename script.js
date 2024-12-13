document.addEventListener('DOMContentLoaded', function () {
    // Initial Data
    let pHLevels = [7.2, 6.8, 6.0];
    let usageData = { Urban: 500, Agricultural: 1000 };
    let alertsQueue = ["Alert: Unsafe pH level detected (6.0)"]; // Initial alert
    let usageChart;

    // Linked List for Historical Data
    class LinkedListNode {
        constructor(data) {
            this.data = data;
            this.next = null;
        }
    }

    class LinkedList {
        constructor() {
            this.head = null;
        }

        add(data) {
            const newNode = new LinkedListNode(data);
            if (!this.head) {
                this.head = newNode;
            } else {
                let current = this.head;
                while (current.next) {
                    current = current.next;
                }
                current.next = newNode;
            }
        }

        display() {
            let current = this.head;
            const history = [];
            while (current) {
                history.push(current.data);
                current = current.next;
            }
            return history;
        }
    }

    const historyList = new LinkedList();

    // Add Initial Historical Data
    historyList.add({ type: "pH", value: 7.2 });
    historyList.add({ type: "pH", value: 6.8 });
    historyList.add({ type: "Usage", region: "Urban", value: 500 });
    historyList.add({ type: "Usage", region: "Agricultural", value: 1000 });

    // Update pH Levels Display
    function updatePHLevels() {
        const phLevelsElement = document.getElementById("ph-levels");
        phLevelsElement.innerHTML = `pH Levels: ${pHLevels.join(", ")} ${
            pHLevels.some(ph => ph < 6.5 || ph > 8.5) ? "(Detected Issues)" : "(All Good)"
        }`;
        checkPHAlerts();
    }

    // Add New pH Level
    function addPHLevel() {
        const newPH = parseFloat(document.getElementById("new-ph").value);
        if (isNaN(newPH) || newPH === "") {
            alert("Please enter a valid pH level.");
            return;
        }
        pHLevels.push(newPH);
        updatePHLevels();
        saveHistory({ type: "pH", value: newPH });
        document.getElementById("new-ph").value = "";
    }

    // Render Water Usage Chart
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

    // Update Water Usage
    function updateUsage() {
        const region = document.getElementById("region").value;
        const usageInput = parseFloat(document.getElementById("usage").value);
        if (isNaN(usageInput) || usageInput < 0) {
            alert("Please enter a valid usage value.");
            return;
        }
        usageData[region] = usageInput;
        renderUsageChart();
        saveHistory({ type: "Usage", region, value: usageInput });
        document.getElementById("usage").value = "";
    }

    // Check for Unsafe pH Levels and Add Alerts
    function checkPHAlerts() {
        alertsQueue = []; // Clear old alerts
        pHLevels.forEach(ph => {
            if (ph < 6.5 || ph > 8.5) {
                alertsQueue.push(`Alert: Unsafe pH level detected (${ph}).`);
            }
        });
        displayAlerts();
    }

    // Display Alerts
    function displayAlerts() {
        const alertsDiv = document.getElementById("alerts-container");
        alertsDiv.innerHTML = alertsQueue.length
            ? alertsQueue.map(alert => `<p>${alert}</p>`).join("")
            : "No alerts yet.";
    }

    // Save Data to Historical Records
    function saveHistory(data) {
        historyList.add(data);
        displayHistory();
    }

    // Display Historical Data
    function displayHistory() {
        const historyDiv = document.getElementById("history-container");
        const historyData = historyList.display();
        historyDiv.innerHTML = historyData.length
            ? historyData.map(entry => `<p>${JSON.stringify(entry)}</p>`).join("")
            : "No historical data yet.";
    }

    // Initial Rendering
    updatePHLevels();
    renderUsageChart();
    displayAlerts();
    displayHistory();
});
