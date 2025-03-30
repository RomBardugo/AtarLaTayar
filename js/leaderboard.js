/**
 * Leaderboard Module for the Tel Aviv Price Guessing Game
 * Handles the leaderboard display and submission
 */

const Leaderboard = (() => {
    // DOM Elements
    const leaderboardEl = document.getElementById('leaderboard');
    const playerNameInput = document.getElementById('player-name');
    const submitScoreBtn = document.getElementById('submit-score');
    const userScoreEntryEl = document.getElementById('user-score-entry');
    
    /**
     * Initialize the leaderboard
     */
    const init = () => {
        // Load leaderboard data
        refreshLeaderboard();
        
        // Event listeners
        submitScoreBtn.addEventListener('click', handleScoreSubmit);
    };
    
    /**
     * Refresh the leaderboard display
     */
    const refreshLeaderboard = () => {
        const leaderboardData = API.getLeaderboard();
        
        // Clear current leaderboard
        leaderboardEl.innerHTML = '';
        
        if (leaderboardData.length === 0) {
            // No entries yet
            leaderboardEl.innerHTML = '<div class="leaderboard-loading">No entries yet. Be the first Tel Aviv price expert!</div>';
            return;
        }
        
        // Create leaderboard items
        leaderboardData.forEach((entry, index) => {
            const leaderboardItem = document.createElement('div');
            leaderboardItem.className = 'leaderboard-item';
            
            const rankEl = document.createElement('div');
            rankEl.className = 'leaderboard-rank';
            rankEl.textContent = `${index + 1}.`;
            
            const nameEl = document.createElement('div');
            nameEl.className = 'leaderboard-name';
            nameEl.textContent = entry.name;
            
            const scoreEl = document.createElement('div');
            scoreEl.className = 'leaderboard-score';
            scoreEl.textContent = entry.score;
            
            leaderboardItem.appendChild(rankEl);
            leaderboardItem.appendChild(nameEl);
            leaderboardItem.appendChild(scoreEl);
            
            leaderboardEl.appendChild(leaderboardItem);
        });
    };
    
    /**
     * Handle score submission
     */
    const handleScoreSubmit = () => {
        const playerName = playerNameInput.value.trim();
        const currentScore = Game.getScore();
        
        // Validate input
        if (!playerName) {
            Game.showModal('Error', 'Please enter your name to submit your score.');
            return;
        }
        
        // Check if score is worth submitting
        if (currentScore <= 0) {
            Game.showModal('Error', 'You need to earn some points before submitting your score!');
            return;
        }
        
        // Submit score
        const success = API.addLeaderboardEntry(playerName, currentScore);
        
        if (success) {
            // Show success message
            Game.showModal('Score Submitted', `Congratulations, ${playerName}! Your score of ${currentScore} has been added to the leaderboard. You're a Tel Aviv price expert!`);
            
            // Clear input
            playerNameInput.value = '';
            
            // Refresh leaderboard
            refreshLeaderboard();
            
            // Reset game
            Game.resetGame();
        } else {
            // Show error message
            Game.showModal('Error', 'There was an error submitting your score. Please try again.');
        }
    };
    
    // Public API
    return {
        init,
        refreshLeaderboard
    };
})();
