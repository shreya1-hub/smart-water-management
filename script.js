document.addEventListener('DOMContentLoaded', function () {
    // Mock data for pH levels and water usage
    let pHLevels = [7.2, 6.0];
    let usageData = { Urban: 500, Agricultural: 1000 };
    let usageChart; // Declare chart globally

    // Function to update the displayed pH levels
    function updatePHLevels() {
        const phLevelsElement = document.getElementById("ph-levels");
        phLevelsElement.innerHTML = `pH Levels: ${pHLevels.join(", ")} ${
            pHLevels.some(ph => ph < 6.5 || ph > 8.5) ? "(Detected Issues)" : "(All Good)"
        }`;
    }

    // Function to add a new pH level
    function addPHLevel() {
        const newPH = parseFloat(document.getElementById("new-ph").value);
        if (isNaN(newPH) || newPH === "") {
            alert("Please enter a valid pH level.");
            return;
        }
        pHLevels.push(newPH);
        updatePHLevels();
        document.getElementById("new-ph").value = "";
        alert("New pH Level Added Successfully!");
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
    try {
        const region = document.getElementById("region").value;
        const usageInputElement = document.getElementById("usage");

        // Check if the input field exists
        if (!usageInputElement) {
            console.error("Input field with id 'usage' not found.");
            alert("Error: Input field not found. Please check your HTML structure.");
            return;
        }

        const usageInput = usageInputElement.value.trim(); // Get and trim the input value
        const newUsage = parseFloat(usageInput); // Convert to a number

        // Validate the input
        if (usageInput === "" || isNaN(newUsage) || newUsage < 0) {
            alert("Please enter a valid usage value (non-negative number).");
            return;
        }

        // Update the data and re-render the chart
        usageData[region] = newUsage; // Update the data for the selected region
        renderUsageChart(); // Refresh the chart dynamically
        alert(`${region} usage updated to ${newUsage} liters.`);
        usageInputElement.value = ""; // Clear the input field
    } catch (error) {
        console.error("Error in updateUsage function:", error);
        alert("An unexpected error occurred. Check the console for details.");
    }
}


        // Update usage data and re-render the chart
        usageData[region] = newUsage;
        renderUsageChart();
        alert(`${region} usage updated to ${newUsage} liters.`);
        usageInputElement.value = ""; // Clear the input field
    }

    // Initial rendering
    updatePHLevels();
    renderUsageChart();

    // Expose functions to the global scope
    window.addPHLevel = addPHLevel;
    window.updateUsage = updateUsage;
});
