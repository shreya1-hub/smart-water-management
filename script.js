document.addEventListener('DOMContentLoaded', function () {
    let pHLevels = [7.2, 6.8, 6.0];
    let usageData = { Urban: 500, Agricultural: 1000 };
    let alertsQueue = [];
    let usageChart;

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

    function updatePHLevels() {
        const phLevelsElement = document.getElementById("ph-levels");
        phLevelsElement.innerHTML = `pH Levels: ${pHLevels.join(", ")} ${
            pHLevels.some(ph => ph < 6.5 || ph > 8.5) ? "(Detected Issues)" : "(All Good)"
        }`;
        checkPHAlerts();
    }

    function addPHLevel() {
        const newPH = parseFloat(document.getElementById("new-ph").value);
        console.log("New pH input:", newPH);

        if (isNaN(newPH) || newPH === "") {
            alert("Please enter a valid pH level.");
            console.log("Invalid input detected.");
            return;
        }

        console.log("Adding new pH level:", newPH);
        pHLevels.push(newPH);
        console.log("Updated pH levels array:", pHLevels);

        updatePHLevels();
        document.getElementById("new-ph").value = "";
        alert("New pH Level Added Successfully!");
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
        console.log(`Updated ${region} usage to:`, usageInput);
        renderUsageChart();
        saveHistory({ type: "Usage", region, value: usageInput });
        document.getElementById("usage").value = "";
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

    function saveHistory(data) {
        historyList.add(data);
        displayHistory();
    }

    function displayHistory() {
        const historyDiv = document.getElementById("history-container");
        const historyData = historyList.display();
        historyDiv.innerHTML = historyData.length
            ? historyData.map(entry => `<p>${JSON.stringify(entry)}</p>`).join("")
            : "No historical data yet.";
    }

    updatePHLevels();
    renderUsageChart();
    displayAlerts();
    displayHistory();
});
