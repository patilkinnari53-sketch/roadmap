// ===== AUTH.JS - Authentication Functions =====

const Auth = {
    // Check if user is logged in
    isAuthenticated() {
        return localStorage.getItem('user') !== null;
    },

    // Get current user
    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Login function
    async login(email, password) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                if (email && password) {
                    const user = {
                        id: Date.now(),
                        name: email.split('@')[0],
                        email: email,
                        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=0ea5e9&color=fff&bold=true`
                    };
                    localStorage.setItem('user', JSON.stringify(user));
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 1000);
        });
    },

    // Signup function
    async signup(name, email, password) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                if (name && email && password) {
                    const user = {
                        id: Date.now(),
                        name: name,
                        email: email,
                        avatar: `https://ui-avatars.com/api/?name=${name}&background=0ea5e9&color=fff&bold=true`
                    };
                    localStorage.setItem('user', JSON.stringify(user));
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 1000);
        });
    },

    // Logout function
    logout() {
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    },

    // Redirect if authenticated
    redirectIfAuthenticated() {
        if (this.isAuthenticated()) {
            window.location.href = 'index.html';
        }
    },

    // Require authentication
    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html';
        }
    }
};
