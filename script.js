document.addEventListener('DOMContentLoaded', function () {
    // Mock data for pH levels and water usage
    let pHLevels = [7.2, 6.0];
    let usageData = { Urban: 500, Agricultural: 1000 };
    let usageChart; // Declare chart globally

    // Function to update the displayed pH levels
    function updatePHLevels() {
        const phLevelsElement = document.getElementById("ph-levels");
        if (!phLevelsElement) {
            console.error("Element with id 'ph-levels' not found.");
            return;
        }
        phLevelsElement.innerHTML = `pH Levels: ${pHLevels.join(", ")} ${
            pHLevels.some(ph => ph < 6.5 || ph > 8.5) ? "(Detected Issues)" : "(All Good)"
        }`;
    }

    // Function to add a new pH level
    function addPHLevel() {
        const newPH = parseFloat(document.getElementById("new-ph").value); // Get input and convert to number
        if (isNaN(newPH) || newPH === "") {
            alert("Please enter a valid pH level."); // Error for invalid input
            return; // Exit the function
        }
        pHLevels.push(newPH); // Add valid input to the array
        updatePHLevels(); // Update the displayed levels
        document.getElementById("new-ph").value = ""; // Clear the input field
        alert("New pH Level Added Successfully!"); // Success alert
    }

    // Function to render water usage chart
    function renderUsageChart() {
        const ctx = document.getElementById('usage-chart').getContext('2d');
        if (!ctx) {
            console.error("Canvas element with id 'usage-chart' not found.");
            return;
        }
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
        const region = document.getElementById("region").value;
        const newUsage = parseInt(document.getElementById("usage").value); // Get usage input and convert to number
        if (isNaN(newUsage) || newUsage < 0) {
            alert("Please enter a valid usage value (non-negative number).");
            return; // Exit if invalid input
        }
        usageData[region] = newUsage; // Update the usage data
        renderUsageChart(); // Re-render the chart with updated data
        alert(`${region} usage updated to ${newUsage} liters.`);
        document.getElementById("usage").value = ""; // Clear the input field
    }

    // Initial rendering
    updatePHLevels();
    renderUsageChart();

    // Expose functions to the global scope for button onclick handlers
    window.addPHLevel = addPHLevel;
    window.updateUsage = updateUsage;
});
