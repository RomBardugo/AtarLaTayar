/**
 * Main Application Module for AtarLaTayar Website
 * Handles tab navigation and initializes components
 */

document.addEventListener('DOMContentLoaded', () => {
    // Tab navigation functionality
    const tabLinks = document.querySelectorAll('.nav-links a, .footer-links a');
    const tabContents = document.querySelectorAll('.tab-content');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Handle tab switching
    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the tab to show
            const tabId = link.getAttribute('data-tab');
            
            // Remove active class from all tabs and links
            tabContents.forEach(tab => tab.classList.remove('active'));
            tabLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to selected tab and link
            document.getElementById(tabId).classList.add('active');
            document.querySelectorAll(`[data-tab="${tabId}"]`).forEach(el => el.classList.add('active'));
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Initialize game if the price-game tab is selected
            if (tabId === 'price-game' && typeof Game !== 'undefined') {
                // Only initialize if not already initialized
                if (!window.gameInitialized) {
                    Game.init();
                    Leaderboard.init();
                    window.gameInitialized = true;
                    
                    // Show welcome message for the game
                    setTimeout(() => {
                        Game.showModal(
                            'Welcome to the Tel Aviv Price Guessing Game!',
                            `<p>How well do you know the prices of everyday items in Tel Aviv?</p>
                            <p>Look at each item and guess its price in Israeli Shekels (₪). The closer your guess, the more points you earn!</p>
                            <p><strong>Scoring:</strong></p>
                            <ul>
                                <li>Within 5% of actual price: 100 points</li>
                                <li>Within 15% of actual price: 50 points</li>
                                <li>Within 30% of actual price: 25 points</li>
                                <li>More than 30% off: 0 points</li>
                            </ul>
                            <p>Maintain a streak for bonus points!</p>
                            <p>Good luck!</p>`
                        );
                    }, 500);
                }
            }
            
            // Scroll to top when changing tabs
            window.scrollTo(0, 0);
        });
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.main-nav')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Add event listener for window click to close modal when clicking outside
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('result-modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // CTA button in home section
    const ctaButton = document.querySelector('.cta-section .btn');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            // Switch to attractions tab
            const attractionsTab = document.querySelector('[data-tab="attractions"]');
            if (attractionsTab) {
                attractionsTab.click();
            }
        });
    }
});
