function updateCountdown() {
    const targetDate = new Date("March 9, 2025 15:50:00").getTime(); // Target date: 9th March 2025
    const now = new Date().getTime(); // Current date and time
    const timeRemaining = targetDate - now; // Time difference

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Display the countdown
    const timerElement = document.getElementById("timer");
    timerElement.innerHTML = `<span>${days}</span> days <br>
     <span>${hours}</span> hours<br> <span>${minutes}</span> minutes <br><span>${seconds}</span> seconds<br>`;

    // If the countdown is finished, display a message
    if (timeRemaining < 0) {
        clearInterval(countdownInterval);
        timerElement.innerHTML = "HAPPY BIRTHDAY!";
    }
}

// Update the countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);

// Initial call to display the countdown immediately
updateCountdown();