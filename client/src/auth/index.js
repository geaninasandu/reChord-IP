import axios from 'axios';

export const authenticate = (data, next) => {
    const storage = data.remember ? window.localStorage : window.sessionStorage;

    if (typeof window !== 'undefined') {
        storage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

export const updateAuth = (avatar, next) => {
    const data = isAuthenticated();

    if (!data) {
        return;
    }

    data.user.avatar = avatar;
    authenticate(data, next);
};

export const signOut = (next) => {
    if (typeof window !== 'undefined') {
        const token = isAuthenticated().token;

        if (!token) {
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };

        localStorage.removeItem('jwt');
        sessionStorage.removeItem('jwt');

        axios.get('/api/auth/logout', config)
            .then(response => console.log(response))
            .catch(err => console.log(err));

        next();
    }
};

export const isAuthenticated = () => {
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    }

    if (sessionStorage.getItem('jwt')) {
        return JSON.parse(sessionStorage.getItem('jwt'));
    }

    return false;
};