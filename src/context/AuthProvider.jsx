import React, { createContext, useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // Initialize local storage if not already set
    useEffect(() => {
        setLocalStorage();
    }, []);

    const [userData, setUserData] = useState(() => {
        const savedData = localStorage.getItem('employees');
        return savedData ? JSON.parse(savedData) : [];
    });

    useEffect(() => {
        localStorage.setItem('employees', JSON.stringify(userData));
    }, [userData]);

    return (
        <AuthContext.Provider value={[userData, setUserData]}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;