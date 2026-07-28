// ChessPulse - Interactive Application Logic

document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const authModal = document.getElementById('authModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const tabLoginBtn = document.getElementById('tabLoginBtn');
    const tabSignupBtn = document.getElementById('tabSignupBtn');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const authMessage = document.getElementById('authMessage');
    const navAuthArea = document.getElementById('navAuthArea');

    const playBtnHero = document.getElementById('playBtnHero');
    const playBtnNav = document.getElementById('playBtnNav');
    const puzzleBtnHero = document.getElementById('puzzleBtnHero');

    // Check existing logged in user from LocalStorage
    let currentUser = JSON.parse(localStorage.getItem('chessUser')) || null;

    // Render Navigation Auth Area (Log In button vs Logged In state)
    function renderNav() {
        if (!navAuthArea) return;

        if (currentUser) {
            navAuthArea.innerHTML = `
                <div class="user-badge">
                    <span>👑 ${currentUser.username}</span>
                    <span style="font-size: 0.8rem; opacity: 0.8;">(${currentUser.rating} ELO)</span>
                </div>
                <button class="btn btn-secondary" id="logoutBtn">Log Out</button>
            `;
            document.getElementById('logoutBtn')?.addEventListener('click', handleLogout);
        } else {
            navAuthArea.innerHTML = `
                <button class="btn btn-secondary" id="loginBtn">Log In</button>
                <button class="btn btn-primary" id="playBtnNav">Play Now</button>
            `;
            document.getElementById('loginBtn')?.addEventListener('click', openModal);
            document.getElementById('playBtnNav')?.addEventListener('click', handlePlayNow);
        }
    }

    // Modal Control Functions
    function openModal(initialTab = 'login') {
        clearAuthMessage();
        authModal.classList.add('active');
        if (initialTab === 'signup') {
            switchToSignup();
        } else {
            switchToLogin();
        }
    }

    function closeModal() {
        authModal.classList.remove('active');
    }

    function switchToLogin() {
        tabLoginBtn.classList.add('active');
        tabSignupBtn.classList.remove('active');
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        clearAuthMessage();
    }

    function switchToSignup() {
        tabSignupBtn.classList.add('active');
        tabLoginBtn.classList.remove('active');
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        clearAuthMessage();
    }

    function showAuthMessage(msg, type = 'success') {
        authMessage.textContent = msg;
        authMessage.className = `auth-message ${type}`;
        authMessage.classList.remove('hidden');
    }

    function clearAuthMessage() {
        authMessage.textContent = '';
        authMessage.classList.add('hidden');
    }

    // Handle Login Form Submit
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const usernameInput = document.getElementById('loginUser').value.trim();
        const passwordInput = document.getElementById('loginPassword').value;

        if (!usernameInput || !passwordInput) {
            showAuthMessage('Please fill in all fields.', 'error');
            return;
        }

        // Save session
        currentUser = {
            username: usernameInput,
            rating: 1200
        };
        localStorage.setItem('chessUser', JSON.stringify(currentUser));

        showAuthMessage(`Welcome back, ${currentUser.username}!`, 'success');
        renderNav();

        setTimeout(() => {
            closeModal();
            loginForm.reset();
        }, 1000);
    });

    // Handle Sign Up Form Submit
    signupForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const usernameInput = document.getElementById('signupUser').value.trim();
        const emailInput = document.getElementById('signupEmail').value.trim();
        const passwordInput = document.getElementById('signupPassword').value;

        if (!usernameInput || !emailInput || !passwordInput) {
            showAuthMessage('Please fill in all required fields.', 'error');
            return;
        }

        currentUser = {
            username: usernameInput,
            email: emailInput,
            rating: 1200
        };
        localStorage.setItem('chessUser', JSON.stringify(currentUser));

        showAuthMessage(`Account created successfully! Welcome, ${currentUser.username}!`, 'success');
        renderNav();

        setTimeout(() => {
            closeModal();
            signupForm.reset();
        }, 1000);
    });

    // Handle Log Out
    function handleLogout() {
        localStorage.removeItem('chessUser');
        currentUser = null;
        renderNav();
        alert('You have logged out.');
    }

    // Action Handlers
    function handlePlayNow() {
        if (currentUser) {
            alert(`♟️ Matchmaking started for ${currentUser.username} (${currentUser.rating} ELO)! Finding opponent...`);
        } else {
            openModal('login');
        }
    }

    // Attach Event Listeners
    closeModalBtn?.addEventListener('click', closeModal);
    tabLoginBtn?.addEventListener('click', switchToLogin);
    tabSignupBtn?.addEventListener('click', switchToSignup);

    // Close modal on backdrop click
    authModal?.addEventListener('click', (e) => {
        if (e.target === authModal) closeModal();
    });

    playBtnHero?.addEventListener('click', handlePlayNow);
    playBtnNav?.addEventListener('click', handlePlayNow);

    puzzleBtnHero?.addEventListener('click', () => {
        alert('🧩 Puzzle of the day: White to move and mate in 2 moves! (Solution: 1. Qh7+ Kf8 2. Qxf7#)');
    });

    // Countdown animation for match of the day
    const turnIndicator = document.querySelector('.turn-indicator strong');
    if (turnIndicator) {
        let count = 3;
        setInterval(() => {
            count = count > 1 ? count - 1 : 3;
            turnIndicator.textContent = count;
        }, 1000);
    }

    // Initial Nav render
    renderNav();
});
