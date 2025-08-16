import React, { createContext, useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState([]);
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null,
        role: null
    });

    // Initialize data from localStorage
    useEffect(() => {
        try {
            // Ensure localStorage is initialized
            setLocalStorage();
            
            // Load user data
            const savedData = localStorage.getItem('employees');
            if (savedData) {
                setUserData(JSON.parse(savedData));
            }

            // Check for existing session
            const loggedInUser = localStorage.getItem('loggedInUser');
            if (loggedInUser) {
                const user = JSON.parse(loggedInUser);
                setAuthState({
                    isAuthenticated: true,
                    user: user.data || null,
                    role: user.role
                });
            }
        } catch (error) {
            console.error('Error initializing auth state:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Update localStorage when userData changes
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('employees', JSON.stringify(userData));
        }
    }, [userData, loading]);

    const login = (email, password) => {
        // Your login logic here
        // Return a promise that resolves with user data or rejects with error
    };

    const logout = () => {
        localStorage.removeItem('loggedInUser');
        setAuthState({
            isAuthenticated: false,
            user: null,
            role: null
        });
    };

    const value = {
        userData,
        setUserData,
        authState,
        setAuthState,
        login,
        logout,
        loading
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;