/**
 * Game Module for the Tel Aviv Price Guessing Game
 * Handles the core game mechanics and scoring
 */

const Game = (() => {
    // Game state
    let currentProduct = null;
    let currentScore = 0;
    let currentStreak = 0;
    let hasGuessed = false;
    
    // DOM Elements
    const productImageEl = document.getElementById('product-image');
    const productNameEl = document.getElementById('product-name');
    const productDescriptionEl = document.getElementById('product-description');
    const priceGuessInput = document.getElementById('price-guess');
    const submitGuessBtn = document.getElementById('submit-guess');
    const nextProductBtn = document.getElementById('next-product');
    const feedbackEl = document.getElementById('feedback');
    const currentScoreEl = document.getElementById('current-score');
    const streakEl = document.getElementById('streak');
    const loadingSpinnerEl = document.getElementById('loading-spinner');
    
    // Modal Elements
    const resultModal = document.getElementById('result-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalContinueBtn = document.getElementById('modal-continue');
    const closeModalBtn = document.querySelector('.close-modal');
    
    /**
     * Initialize the game
     */
    const init = () => {
        // Load first product
        loadNewProduct();
        
        // Event listeners
        submitGuessBtn.addEventListener('click', handleGuessSubmit);
        nextProductBtn.addEventListener('click', loadNewProduct);
        priceGuessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleGuessSubmit();
            }
        });
        
        // Modal event listeners
        modalContinueBtn.addEventListener('click', closeModal);
        closeModalBtn.addEventListener('click', closeModal);
        
        // Update score display
        updateScoreDisplay();
    };
    
    /**
     * Load a new random product
     */
    const loadNewProduct = async () => {
        // Reset state
        hasGuessed = false;
        nextProductBtn.disabled = true;
        submitGuessBtn.disabled = false;
        priceGuessInput.disabled = false;
        priceGuessInput.value = '';
        feedbackEl.className = 'feedback';
        feedbackEl.textContent = '';
        
        // Show loading state
        productNameEl.textContent = 'Loading item...';
        productDescriptionEl.textContent = 'Please wait while we fetch a random item from Tel Aviv for you to guess.';
        productImageEl.src = 'images/placeholder.jpg';
        loadingSpinnerEl.classList.remove('hidden');
        
        try {
            // Fetch random product
            currentProduct = await API.getRandomProduct();
            
            // Update UI
            productNameEl.textContent = currentProduct.title;
            productDescriptionEl.textContent = currentProduct.description;
            
            // Load image
            const img = new Image();
            img.onload = () => {
                productImageEl.src = img.src;
                loadingSpinnerEl.classList.add('hidden');
            };
            img.onerror = () => {
                productImageEl.src = 'images/placeholder.jpg';
                loadingSpinnerEl.classList.add('hidden');
            };
            img.src = currentProduct.image;
            
        } catch (error) {
            console.error('Error loading new product:', error);
            productNameEl.textContent = 'Error loading item';
            productDescriptionEl.textContent = 'There was an error loading the item. Please try again.';
            loadingSpinnerEl.classList.add('hidden');
        }
    };
    
    /**
     * Handle guess submission
     */
    const handleGuessSubmit = () => {
        if (hasGuessed || !currentProduct) return;
        
        const guessValue = parseFloat(priceGuessInput.value);
        
        // Validate input
        if (isNaN(guessValue) || guessValue < 0) {
            showFeedback('Please enter a valid price in ₪', 'error');
            return;
        }
        
        // Mark as guessed
        hasGuessed = true;
        submitGuessBtn.disabled = true;
        priceGuessInput.disabled = true;
        nextProductBtn.disabled = false;
        
        // Calculate accuracy
        const actualPrice = currentProduct.price;
        const priceDifference = Math.abs(guessValue - actualPrice);
        const percentageDifference = (priceDifference / actualPrice) * 100;
        
        // Update score based on accuracy
        let pointsEarned = 0;
        let feedbackMessage = '';
        let feedbackClass = '';
        
        if (percentageDifference <= 5) {
            // Within 5% - Excellent guess
            pointsEarned = 100;
            currentStreak++;
            feedbackMessage = `Perfect! The actual price is ₪${actualPrice.toFixed(2)}. You earned ${pointsEarned} points!`;
            feedbackClass = 'success';
        } else if (percentageDifference <= 15) {
            // Within 15% - Good guess
            pointsEarned = 50;
            currentStreak++;
            feedbackMessage = `Close! The actual price is ₪${actualPrice.toFixed(2)}. You earned ${pointsEarned} points!`;
            feedbackClass = 'success';
        } else if (percentageDifference <= 30) {
            // Within 30% - Okay guess
            pointsEarned = 25;
            currentStreak++;
            feedbackMessage = `Not bad! The actual price is ₪${actualPrice.toFixed(2)}. You earned ${pointsEarned} points!`;
            feedbackClass = 'warning';
        } else {
            // More than 30% off - Poor guess
            pointsEarned = 0;
            currentStreak = 0;
            feedbackMessage = `Way off! The actual price is ₪${actualPrice.toFixed(2)}. Try again with the next item!`;
            feedbackClass = 'error';
        }
        
        // Apply streak bonus
        if (currentStreak > 1) {
            const streakBonus = Math.min(currentStreak * 5, 50); // Cap bonus at 50 points
            pointsEarned += streakBonus;
            feedbackMessage += ` Streak bonus: +${streakBonus} points!`;
        }
        
        // Update score
        currentScore += pointsEarned;
        
        // Show feedback
        showFeedback(feedbackMessage, feedbackClass);
        
        // Update score display
        updateScoreDisplay();
    };
    
    /**
     * Show feedback message
     * @param {String} message - The feedback message
     * @param {String} type - The type of feedback (success, warning, error)
     */
    const showFeedback = (message, type) => {
        feedbackEl.textContent = message;
        feedbackEl.className = `feedback ${type}`;
    };
    
    /**
     * Update the score display
     */
    const updateScoreDisplay = () => {
        currentScoreEl.textContent = currentScore;
        streakEl.textContent = currentStreak;
    };
    
    /**
     * Show the result modal
     * @param {String} title - The modal title
     * @param {String} message - The modal message
     */
    const showModal = (title, message) => {
        modalTitle.textContent = title;
        modalMessage.innerHTML = message;
        resultModal.style.display = 'flex';
    };
    
    /**
     * Close the result modal
     */
    const closeModal = () => {
        resultModal.style.display = 'none';
    };
    
    /**
     * Get the current score
     * @returns {Number} The current score
     */
    const getScore = () => {
        return currentScore;
    };
    
    /**
     * Reset the game
     */
    const resetGame = () => {
        currentScore = 0;
        currentStreak = 0;
        updateScoreDisplay();
        loadNewProduct();
    };
    
    // Public API
    return {
        init,
        getScore,
        showModal,
        resetGame
    };
})();
