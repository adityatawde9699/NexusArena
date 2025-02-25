document.addEventListener('DOMContentLoaded', function() {
    // Initialize the circuit background animation
    initCircuitBackground();
    
    // Initialize navigation and button behaviors
    initNavigation();
    
    // Initialize tournament cards hover effects
    initTournamentCards();
    
    // Initialize countdown timers for tournaments
    initCountdownTimers();
    
    // Initialize live event pulsing effects
    initLiveEvents();
    
    // Initialize form validation
    initFormValidation();
});

// Circuit background animation
function initCircuitBackground() {
    const circuitOverlay = document.querySelector('.circuit-overlay');
    
    // Create random circuit paths
    for (let i = 0; i < 15; i++) {
        const circuit = document.createElement('div');
        circuit.classList.add('circuit-line');
        
        // Randomize positions and sizes
        circuit.style.top = `${Math.random() * 100}%`;
        circuit.style.left = `${Math.random() * 100}%`;
        circuit.style.width = `${Math.random() * 200 + 50}px`;
        circuit.style.height = `${Math.random() * 2 + 1}px`;
        circuit.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Randomize animation delay
        circuit.style.animationDelay = `${Math.random() * 5}s`;
        
        circuitOverlay.appendChild(circuit);
    }
    
    // Create circuit nodes at intersections
    for (let i = 0; i < 20; i++) {
        const node = document.createElement('div');
        node.classList.add('circuit-node');
        
        // Randomize positions
        node.style.top = `${Math.random() * 100}%`;
        node.style.left = `${Math.random() * 100}%`;
        
        // Randomize animation delay
        node.style.animationDelay = `${Math.random() * 10}s`;
        
        circuitOverlay.appendChild(node);
    }
}

// Navigation behavior
function initNavigation() {
    // Sticky navigation on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // Mobile navigation toggle (for responsive design)
    const navToggle = document.createElement('div');
    navToggle.classList.add('nav-toggle');
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.navbar').appendChild(navToggle);
    
    navToggle.addEventListener('click', function() {
        document.querySelector('.nav-links').classList.toggle('nav-active');
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('btn-hover');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('btn-hover');
        });
    });
    
    // Auth buttons functionality
    document.querySelector('.btn-login').addEventListener('click', function() {
        showLoginModal();
    });
    
    document.querySelector('.btn-signup').addEventListener('click', function() {
        showSignupModal();
    });
}

// Tournament cards hover effects and interaction
function initTournamentCards() {
    const tournamentCards = document.querySelectorAll('.tournament-card');
    
    tournamentCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.classList.add('card-hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('card-hover');
        });
        
        // Make entire card clickable
        card.addEventListener('click', function() {
            const tournamentName = this.querySelector('h3').textContent;
            navigateToTournamentDetail(tournamentName);
        });
    });
}

// Countdown timers for tournaments
function initCountdownTimers() {
    const tournaments = document.querySelectorAll('.tournament-card');
    
    tournaments.forEach(tournament => {
        const dateText = tournament.querySelector('.tournament-meta span:nth-child(2)').textContent;
        
        // Skip tournaments that are live
        if (dateText === 'Live Now') {
            return;
        }
        
        // Parse the date
        const dateParts = dateText.split(', ');
        const tournamentDate = new Date(`${dateParts[0]} ${dateParts[1]}`);
        
        // Create countdown element
        const countdownElement = document.createElement('div');
        countdownElement.classList.add('tournament-countdown');
        tournament.querySelector('.tournament-details').appendChild(countdownElement);
        
        // Update countdown every second
        updateCountdown(countdownElement, tournamentDate);
        setInterval(() => updateCountdown(countdownElement, tournamentDate), 1000);
    });
}

// Update countdown timer
function updateCountdown(element, targetDate) {
    const now = new Date();
    const difference = targetDate - now;
    
    if (difference <= 0) {
        element.textContent = 'Tournament has started!';
        return;
    }
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    element.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    element.classList.add('countdown-pulse');
    
    // Animate pulse effect
    setTimeout(() => {
        element.classList.remove('countdown-pulse');
    }, 500);
}

// Live events pulsing effects
function initLiveEvents() {
    const liveIndicators = document.querySelectorAll('.live-indicator');
    
    liveIndicators.forEach(indicator => {
        // Add pulsing animation
        setInterval(() => {
            indicator.classList.add('pulse');
            
            setTimeout(() => {
                indicator.classList.remove('pulse');
            }, 1000);
        }, 2000);
    });
    
    // Make event cards interactive
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('click', function() {
            const eventTitle = this.querySelector('.event-title').textContent;
            watchLiveEvent(eventTitle);
        });
    });
}

// Form validation for newsletter
function initFormValidation() {
    const newsletterForm = document.querySelector('.newsletter form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Show success message
                showNotification('Successfully subscribed!', 'success');
                emailInput.value = '';
            } else {
                // Show error message
                showNotification('Please enter a valid email address', 'error');
                emailInput.focus();
            }
        });
    }
}

// Email validation helper
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Show notification popup
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.classList.add('notification', `notification-${type}`);
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('notification-show');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('notification-show');
        
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Mock functions for demonstration
function showLoginModal() {
    // This would show a login modal in a real application
    showNotification('Login modal would appear here', 'info');
}

function showSignupModal() {
    // This would show a signup modal in a real application
    showNotification('Signup modal would appear here', 'info');
}

function navigateToTournamentDetail(tournamentName) {
    // This would navigate to tournament detail page in a real application
    showNotification(`Navigating to ${tournamentName} details`, 'info');
}

function watchLiveEvent(eventTitle) {
    // This would open the live stream in a real application
    showNotification(`Opening live stream: ${eventTitle}`, 'info');
}