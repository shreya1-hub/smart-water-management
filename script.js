// Existing mock data
let pHLevels = [7.2, 6.0];
let usageData = { Urban: 500, Agricultural: 1000 };
let usageChart; // Declare globally for proper re-rendering

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
    if (usageChart) {
        usageChart.destroy(); // Destroy the previous chart instance
    }
    usageChart = new Chart(ctx, {
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

// Function to update water usage data
function updateUsage() {
    const region = document.getElementById("region").value; // Get selected region
    const usageInput = document.getElementById("usage").value.trim(); // Get and trim input value
    const newUsage = parseInt(usageInput); // Parse input to an integer

    // Validate the input
    if (usageInput === "" || isNaN(newUsage) || newUsage < 0) {
        alert("Please enter a valid usage value (non-negative number).");
        return;
    }

    // Update usage data and re-render the chart
    usageData[region] = newUsage;
    renderUsageChart();
    alert(`${region} usage updated to ${newUsage} liters.`);
    document.getElementById("usage").value = ""; // Clear the input field
}


// Initial renderings
updatePHLevels();
renderUsageChart();
