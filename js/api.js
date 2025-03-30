/**
 * API Module for the Tel Aviv Price Guessing Game
 * Handles all interactions with product data and leaderboard
 */

const API = (() => {
    // We'll use a local database of Tel Aviv items instead of an external API
    const TEL_AVIV_ITEMS = [
        {
            id: 1,
            title: "Café Hafuch (Cappuccino)",
            price: 15,
            description: "A popular coffee drink in Tel Aviv, similar to cappuccino but with the milk poured in after the espresso.",
            category: "food and drinks",
            image: "https://images.unsplash.com/photo-1534778101976-62847782c213?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 2,
            title: "Falafel in Pita",
            price: 18,
            description: "A classic Israeli street food consisting of deep-fried chickpea balls served in a pita with salad and tahini.",
            category: "food and drinks",
            image: "https://images.unsplash.com/photo-1593001872095-7d5b3868dd20?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 3,
            title: "Bottle of Water (500ml)",
            price: 6,
            description: "A small bottle of mineral water, essential for staying hydrated in Tel Aviv's warm climate.",
            category: "food and drinks",
            image: "https://images.unsplash.com/photo-1606168094336-48f8b0c88d03?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 4,
            title: "Rav-Kav Public Transport Card",
            price: 5,
            description: "The reloadable smart card used for public transportation in Tel Aviv and throughout Israel.",
            category: "transportation",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Rav-Kav_Card.jpg/1200px-Rav-Kav_Card.jpg"
        },
        {
            id: 5,
            title: "Single Bus/Metro Ride",
            price: 5.5,
            description: "A one-way ticket for Tel Aviv's public transportation system.",
            category: "transportation",
            image: "https://images.unsplash.com/photo-1569443693539-175ea9f007e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 6,
            title: "Hummus Plate",
            price: 25,
            description: "A generous serving of creamy hummus topped with olive oil, often served with pita bread.",
            category: "food and drinks",
            image: "https://images.unsplash.com/photo-1585937421612-70a008356c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 7,
            title: "Shampoo (400ml)",
            price: 22,
            description: "A standard bottle of shampoo from a local supermarket.",
            category: "personal care",
            image: "https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 8,
            title: "Movie Ticket",
            price: 40,
            description: "A standard ticket to see a movie at a cinema in Tel Aviv.",
            category: "entertainment",
            image: "https://images.unsplash.com/photo-1485095329183-d0797cdc5676?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 9,
            title: "Shawarma in Pita",
            price: 35,
            description: "Sliced meat (typically turkey, chicken, or lamb) served in a pita with various toppings and sauces.",
            category: "food and drinks",
            image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 10,
            title: "Beach Chair Rental (Full Day)",
            price: 15,
            description: "Renting a chair at one of Tel Aviv's beautiful beaches for a day of relaxation.",
            category: "leisure",
            image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 11,
            title: "Sabich Sandwich",
            price: 22,
            description: "A traditional Israeli sandwich containing fried eggplant, hard-boiled eggs, tahini, and other ingredients.",
            category: "food and drinks",
            image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Sabich_from_Sabich_Frishman.jpg"
        },
        {
            id: 12,
            title: "Iced Coffee (Café Kar)",
            price: 18,
            description: "A refreshing cold coffee drink popular during Tel Aviv's hot summer months.",
            category: "food and drinks",
            image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 13,
            title: "Basic T-Shirt",
            price: 70,
            description: "A simple cotton t-shirt from a local clothing store.",
            category: "clothing",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 14,
            title: "Sunscreen (200ml)",
            price: 45,
            description: "Essential protection for enjoying Tel Aviv's sunny beaches.",
            category: "personal care",
            image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 15,
            title: "Casual Dinner for Two",
            price: 180,
            description: "A typical meal for two people at a mid-range restaurant in Tel Aviv.",
            category: "food and drinks",
            image: "https://images.unsplash.com/photo-1559305616-3f99cd43e353?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 16,
            title: "Pair of Basic Sneakers",
            price: 250,
            description: "A standard pair of casual sneakers from a local shoe store.",
            category: "clothing",
            image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 17,
            title: "Electric Scooter Rental (30 minutes)",
            price: 12,
            description: "Renting an electric scooter, a popular way to get around Tel Aviv.",
            category: "transportation",
            image: "https://images.unsplash.com/photo-1591375372183-635d5e8917c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 18,
            title: "Beer at a Bar",
            price: 30,
            description: "A draft beer at a typical Tel Aviv bar or pub.",
            category: "food and drinks",
            image: "https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 19,
            title: "Loaf of Fresh Bread",
            price: 12,
            description: "A freshly baked loaf of bread from a local bakery.",
            category: "food and drinks",
            image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 20,
            title: "Monthly Gym Membership",
            price: 220,
            description: "A standard monthly membership at a fitness center in Tel Aviv.",
            category: "fitness",
            image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
    ];
    
    // We'll use localStorage for the leaderboard in this version
    const LEADERBOARD_KEY = 'atar_la_tayar_price_game_leaderboard';
    
    /**
     * Fetch a random item from our Tel Aviv database
     * @returns {Object} A random Tel Aviv item
     */
    const getRandomProduct = async () => {
        try {
            // Select a random item
            const randomIndex = Math.floor(Math.random() * TEL_AVIV_ITEMS.length);
            return TEL_AVIV_ITEMS[randomIndex];
        } catch (error) {
            console.error('Error fetching random product:', error);
            // Return a fallback product if something goes wrong
            return getFallbackProduct();
        }
    };
    
    /**
     * Fallback product in case of an error
     * @returns {Object} A fallback Tel Aviv item
     */
    const getFallbackProduct = () => {
        return {
            id: 1,
            title: "Café Hafuch (Cappuccino)",
            price: 15,
            description: "A popular coffee drink in Tel Aviv, similar to cappuccino but with the milk poured in after the espresso.",
            category: "food and drinks",
            image: "https://images.unsplash.com/photo-1534778101976-62847782c213?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        };
    };
    
    /**
     * Get the leaderboard data
     * @returns {Array} Array of leaderboard entries sorted by score
     */
    const getLeaderboard = () => {
        try {
            // Get leaderboard from localStorage
            const leaderboardData = localStorage.getItem(LEADERBOARD_KEY);
            
            // Parse and return the data, or empty array if no data
            return leaderboardData ? JSON.parse(leaderboardData) : [];
        } catch (error) {
            console.error('Error getting leaderboard:', error);
            return [];
        }
    };
    
    /**
     * Add a new entry to the leaderboard
     * @param {String} playerName - The name of the player
     * @param {Number} score - The player's score
     * @returns {Boolean} Success status
     */
    const addLeaderboardEntry = (playerName, score) => {
        try {
            // Get current leaderboard
            let leaderboard = getLeaderboard();
            
            // Add new entry
            leaderboard.push({
                name: playerName,
                score: score,
                date: new Date().toISOString()
            });
            
            // Sort by score (highest first)
            leaderboard.sort((a, b) => b.score - a.score);
            
            // Keep only top 10 scores
            if (leaderboard.length > 10) {
                leaderboard = leaderboard.slice(0, 10);
            }
            
            // Save to localStorage
            localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
            
            return true;
        } catch (error) {
            console.error('Error adding leaderboard entry:', error);
            return false;
        }
    };
    
    /**
     * Reset the leaderboard (for testing purposes)
     */
    const resetLeaderboard = () => {
        localStorage.removeItem(LEADERBOARD_KEY);
    };
    
    // Public API
    return {
        getRandomProduct,
        getLeaderboard,
        addLeaderboardEntry,
        resetLeaderboard
    };
})();
