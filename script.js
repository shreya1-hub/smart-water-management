// Existing mock data
let pHLevels = [7.2, 6.0];
let usageData = { Urban: 500, Agricultural: 1000 };
let usageChart;

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
        alert("New pH Level Added Successfully!");
    } else {
        alert("Please enter a valid pH level.");
    }
}

// Function to render water usage chart
function renderUsageChart() {
    const ctx = document.getElementById('usage-chart').getContext('2d');
    if (usageChart) usageChart.destroy(); // Destroy the previous chart
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

// Function to update water usage data
function updateUsage() {
    const region = document.getElementById("region").value;
    const newUsage = parseInt(document.getElementById("usage").value);
    if (!isNaN(newUsage)) {
        usageData[region] = newUsage;
        renderUsageChart(); // Re-render the chart with updated data
        alert(`${region} usage updated to ${newUsage} liters.`);
        document.getElementById("usage").value = ""; // Clear the input field
    } else {
        alert("Please enter a valid usage value.");
    }
}

// Initial renderings
updatePHLevels();
renderUsageChart();
