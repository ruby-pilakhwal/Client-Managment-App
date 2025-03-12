import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const value = {
    tasks,
    setTasks,
    notifications,
    setNotifications,
    addTask: (newTask) => {
      setTasks(prev => [...prev, newTask]);
      addNotification(`New task created: ${newTask.taskTitle}`);
    },
    addNotification: (message) => {
      const newNotification = {
        id: Date.now(),
        message,
        read: false
      };
      setNotifications(prev => [newNotification, ...prev]);
    },
    markNotificationAsRead: (notificationId) => {
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    }
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === null) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}; 