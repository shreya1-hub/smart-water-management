// Mock data for pH levels
let pHLevels = [7.2, 6.0];

// Function to update the displayed pH levels
function updatePHLevels() {
    const phLevelsElement = document.getElementById("ph-levels");
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

// Initial render of pH levels
updatePHLevels();
