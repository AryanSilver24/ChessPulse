// Simple interactivity for ChessPulse Landing Page

document.addEventListener('DOMContentLoaded', () => {
    // Select buttons
    const playBtnHero = document.getElementById('playBtnHero');
    const playBtnNav = document.getElementById('playBtnNav');
    const puzzleBtnHero = document.getElementById('puzzleBtnHero');
    const loginBtn = document.getElementById('loginBtn');

    // Simple handler function to give interactive feedback
    function handleAction(message) {
        alert(message);
    }

    // Attach click events
    if (playBtnHero) {
        playBtnHero.addEventListener('click', () => {
            handleAction('♟️ Starting quick match... Connecting to matchmaking server!');
        });
    }

    if (playBtnNav) {
        playBtnNav.addEventListener('click', () => {
            handleAction('♟️ Loading chessboard...');
        });
    }

    if (puzzleBtnHero) {
        puzzleBtnHero.addEventListener('click', () => {
            handleAction('🧩 Puzzle of the day: Mate in 2! (White to move)');
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            handleAction('🔑 Opening login dialog...');
        });
    }

    // Simple visual countdown for the mini match indicator
    const turnIndicator = document.querySelector('.turn-indicator strong');
    if (turnIndicator) {
        let count = 3;
        setInterval(() => {
            count = count > 1 ? count - 1 : 3;
            turnIndicator.textContent = count;
        }, 1000);
    }
});
