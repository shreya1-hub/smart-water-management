// Existing mock data
let pHLevels = [7.2, 6.0];
let usageData = { Urban: 500, Agricultural: 1000 };

// Function to update displayed pH levels
function updatePHLevels() {
    const phLevelsElement = document.getElementById("ph-levels");
    phLevelsElement.innerHTML = `pH Levels: ${pHLevels.join(", ")} ${
        pHLevels.some(ph => ph < 6.5 || ph > 8.5) ? "(Detected Issues)" : "(All Good)"
    }`;
}

// Function to add a new pH level
function addPHLevel() {
    const newPH = parseFloat(document.getElementById("new-ph").value);
    if (!isNaN(newPH)) {
        pHLevels.push(newPH);
        updatePHLevels();
        document.getElementById("new-ph").value = ""; // Clear the input field
    }
}

// Render Water Usage Chart
function renderUsageChart() {
    const ctx = document.getElementById('usage-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Urban', 'Agricultural'], // Regions
            datasets: [{
                label: 'Water Usage (Liters)',
                data: [usageData.Urban, usageData.Agricultural], // Usage data
                backgroundColor: ['#4CAF50', '#2196F3']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
}

// Initial rendering
updatePHLevels();
renderUsageChart();
