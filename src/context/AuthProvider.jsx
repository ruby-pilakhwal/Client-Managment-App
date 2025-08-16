import React, { createContext, useState, useEffect, useCallback } from 'react';

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
        const initializeAuth = async () => {
            try {
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
        };

        initializeAuth();
    }, []);

    // Update localStorage when userData changes
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('employees', JSON.stringify(userData));
        }
    }, [userData, loading]);

    // Login function
    const login = useCallback(async (email, password) => {
        try {
            // Get users from localStorage
            const { employees, admin } = {
                employees: JSON.parse(localStorage.getItem('employees') || '[]'),
                admin: JSON.parse(localStorage.getItem('admin') || '[]')
            };
            
            // Find user by email (case-insensitive)
            let user = null;
            let isAdmin = false;
            
            // Check admin first
            const adminUser = admin.find(u => 
                u.email && u.email.toLowerCase() === email.toLowerCase()
            );
            
            if (adminUser) {
                user = adminUser;
                isAdmin = true;
            } else {
                // Check employees if not found in admin
                const employeeUser = employees.find(u => 
                    u.email && u.email.toLowerCase() === email.toLowerCase()
                );
                if (employeeUser) {
                    user = employeeUser;
                }
            }
            
            if (!user) {
                console.log('User not found for email:', email);
                throw new Error('Invalid email or password');
            }

            // Verify password
            if (user.password !== password) {
                throw new Error('Invalid email or password');
            }

            // Set auth state based on user type
            const userSession = {
                isAuthenticated: true,
                user: {
                    id: user.id,
                    firstName: user.firstName || 'User',
                    lastName: user.lastName || '',
                    email: user.email,
                    role: isAdmin ? 'admin' : 'employee',
                    tasks: user.tasks || [],
                    taskCounts: user.taskCounts || {
                        active: 0,
                        newTask: 0,
                        completed: 0,
                        failed: 0
                    }
                },
                role: isAdmin ? 'admin' : 'employee'
            };

            // Save to state
            setAuthState(userSession);
            
            // Save to localStorage for persistence
            localStorage.setItem('loggedInUser', JSON.stringify(userSession));
            
            // Update userData state if needed
            if (userData.length === 0) {
                setUserData(isAdmin ? admin : employees);
            }
            
            return userSession;
        } catch (error) {
            console.error('Login error:', error);
            throw error; // Re-throw to be handled by the Login component
        }
    }, [userData]);

    // Logout function
    const logout = useCallback(() => {
        setAuthState({
            isAuthenticated: false,
            user: null,
            role: null
        });
        localStorage.removeItem('loggedInUser');
    }, []);

    // The value that will be available to all consumers
    const value = {
        userData,
        setUserData,
        authState,
        setAuthState,
        loading,
        login,
        logout
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