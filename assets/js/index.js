/* jshint esversion: 6 */

// Start game button click event
document.getElementById('start-game-button').addEventListener('click', () => {
    // Find the selected level button
    const selectedLevel = document.querySelector('.level-button.selected');
    
    // If a level is selected, save the time and go to game page
    if (selectedLevel) {
        const time = selectedLevel.getAttribute('data-time');
        // Store the selected time value in local storage
        localStorage.setItem('selectedTime', time);
        // Redirect to the game page
        window.location.href = 'game.html';
    } else {
        // Alert the user to select a difficulty level if none is selected
        alert('Please select a difficulty level');
    }
});

// Add click event to each level button
document.querySelectorAll('.level-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove the 'selected' class from all level buttons
        document.querySelectorAll('.level-button').forEach(btn => btn.classList.remove('selected'));
        // Select the clicked button
        button.classList.add('selected');
    });
});
