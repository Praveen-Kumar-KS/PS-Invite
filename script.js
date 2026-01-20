// Wedding date: March 25, 2026, 6:00 PM
const weddingDate = new Date('March 25, 2026 06:00:00').getTime();
//const weddingDate = new Date('January 21, 2026 02:42:00').getTime();


// DOM elements
const countdownButton = document.getElementById('countdownButton');
const countdownTimer = document.getElementById('countdownTimer');
const weddingMessage = document.getElementById('weddingMessage');
const startButton = document.querySelector('.start-countdown-btn');

// Time display elements
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

let countdownInterval;

// Check if countdown is already started (from localStorage)
function checkCountdownStatus() {
    //const countdownStarted = localStorage.getItem('countdownStarted');
    
    //if (countdownStarted === 'true') {
        startCountdown();
    //}
}

// Start countdown function
function startCountdown() {
    // Hide button, show timer
    countdownButton.style.display = 'none';
    countdownTimer.style.display = 'flex';
    
    // Set localStorage
    //localStorage.setItem('countdownStarted', 'true');
    
    // Start the countdown interval
    updateCountdown(); // Update immediately
    countdownInterval = setInterval(updateCountdown, 1000);
}

// Update countdown display
function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = weddingDate - now;
    
    // Check if wedding time has arrived
    if (timeRemaining <= 0) {
        clearInterval(countdownInterval);
        showWeddingMessage();
        return;
    }
    
    // Calculate time units
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    // Update display
    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
    
    // Add animation effect
    animateTimeBox(daysElement);
    animateTimeBox(hoursElement);
    animateTimeBox(minutesElement);
    animateTimeBox(secondsElement);
}

// Show wedding message when time arrives
function showWeddingMessage() {
    countdownTimer.style.display = 'none';
    weddingMessage.style.display = 'block';
    
    // Start celebration effects
    startCelebration();
    
    // Optional: Clear localStorage if you want to reset
    // localStorage.removeItem('countdownStarted');
}

// Animate time boxes
function animateTimeBox(element) {
    element.style.transform = 'scale(1.1)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 200);
}

// Add smooth transition to time values
daysElement.style.transition = 'transform 0.2s ease';
hoursElement.style.transition = 'transform 0.2s ease';
minutesElement.style.transition = 'transform 0.2s ease';
secondsElement.style.transition = 'transform 0.2s ease';

// Button click event
startButton.addEventListener('click', () => {
    startButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        startButton.style.transform = 'scale(1)';
        startCountdown();
    }, 150);
});

// Check status on page load
window.addEventListener('load', () => {
    checkCountdownStatus();
});

// Celebration effects - Fireworks and Balloons
function startCelebration() {
    createBalloons();
    createFireworks();
    console.log('Congratulations on your wedding day! 🎉');
}

// Create floating balloons
function createBalloons() {
    const colors = ['#ff6b9d', '#c44569', '#ffa502', '#ff6348', '#ff4757', '#5f27cd', '#00d2d3'];
    const balloonContainer = document.createElement('div');
    balloonContainer.className = 'balloon-container';
    document.body.appendChild(balloonContainer);
    
    // Create 15 balloons
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.style.left = Math.random() * 100 + '%';
            balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.animationDelay = Math.random() * 2 + 's';
            balloon.style.animationDuration = (Math.random() * 3 + 4) + 's';
            
            // Add balloon string
            const string = document.createElement('div');
            string.className = 'balloon-string';
            balloon.appendChild(string);
            
            balloonContainer.appendChild(balloon);
            
            // Remove balloon after animation
            setTimeout(() => {
                balloon.remove();
            }, 8000);
        }, i * 300);
    }
    
    // Continue creating balloons every 5 seconds
    setInterval(() => {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.animationDuration = (Math.random() * 3 + 4) + 's';
        
        const string = document.createElement('div');
        string.className = 'balloon-string';
        balloon.appendChild(string);
        
        balloonContainer.appendChild(balloon);
        
        setTimeout(() => {
            balloon.remove();
        }, 8000);
    }, 5000);
}

// Create fireworks effect
function createFireworks() {
    const fireworksContainer = document.createElement('div');
    fireworksContainer.className = 'fireworks-container';
    document.body.appendChild(fireworksContainer);
    
    // Launch fireworks continuously
    launchFirework(fireworksContainer);
    setInterval(() => {
        launchFirework(fireworksContainer);
    }, 1500);
}

// Launch a single firework
function launchFirework(container) {
    const colors = ['#ff6b9d', '#ffa502', '#ff6348', '#5f27cd', '#00d2d3', '#ffd700', '#ff1493'];
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * (window.innerHeight * 0.5) + 100;
    
    // Create firework burst
    const burst = document.createElement('div');
    burst.className = 'firework-burst';
    burst.style.left = x + 'px';
    burst.style.top = y + 'px';
    container.appendChild(burst);
    
    // Create particles
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 100 + Math.random() * 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        burst.appendChild(particle);
    }
    
    // Remove firework after animation
    setTimeout(() => {
        burst.remove();
    }, 2000);
}

