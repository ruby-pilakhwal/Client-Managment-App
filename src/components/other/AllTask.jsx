import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { Toaster } from 'react-hot-toast';

const AllTask = ({ isDarkMode }) => {
  const { userData, setUserData } = useContext(AuthContext);

  const updateTaskStatus = (employeeId, taskId, newStatus) => {
    const updatedUserData = userData.map(user => {
      if (user.id === employeeId) {
        const updatedTasks = user.tasks.map(task => {
          if (task.id === taskId) {
            // Reset all status flags
            const updatedTask = {
              ...task,
              newTask: false,
              active: false,
              completed: false,
              failed: false,
              [newStatus]: true
            };
            return updatedTask;
          }
          return task;
        });

        // Recalculate task counts
        const taskCounts = {
          newTask: updatedTasks.filter(t => t.newTask).length,
          active: updatedTasks.filter(t => t.active).length,
          completed: updatedTasks.filter(t => t.completed).length,
          failed: updatedTasks.filter(t => t.failed).length
        };

        return {
          ...user,
          tasks: updatedTasks,
          taskCounts
        };
      }
      return user;
    });

    setUserData(updatedUserData);
    localStorage.setItem('employees', JSON.stringify(updatedUserData));
  };

  const deleteTask = (employeeId, taskId) => {
    const updatedUserData = userData.map(user => {
      if (user.id === employeeId) {
        const updatedTasks = user.tasks.filter(task => task.id !== taskId);

        // Recalculate task counts
        const taskCounts = {
          newTask: updatedTasks.filter(t => t.newTask).length,
          active: updatedTasks.filter(t => t.active).length,
          completed: updatedTasks.filter(t => t.completed).length,
          failed: updatedTasks.filter(t => t.failed).length
        };

        return {
          ...user,
          tasks: updatedTasks,
          taskCounts: {
            ...user.taskCounts,
            ...taskCounts
          }
        };
      }
      return user;
    });

    setUserData(updatedUserData);
    localStorage.setItem('employees', JSON.stringify(updatedUserData));
  };

  if (!userData || userData.length === 0) {
    return (
      <div className={`flex items-center justify-center min-h-[50vh] ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <p>No tasks found.</p>
      </div>
    );
  }

  return (
    <div className={`p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-6">All Tasks</h2>
      
      <div className="space-y-6">
        {userData.map((user) => (
          <div key={user.id} className={`p-6 rounded-lg shadow-md ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{user.firstName}'s Tasks</h3>
              <div className="flex space-x-2">
                <TaskCounter count={user.taskCounts?.newTask || 0} label="New" color="blue" />
                <TaskCounter count={user.taskCounts?.active || 0} label="Active" color="yellow" />
                <TaskCounter count={user.taskCounts?.completed || 0} label="Completed" color="green" />
                <TaskCounter count={user.taskCounts?.failed || 0} label="Failed" color="red" />
              </div>
            </div>

            <div className="space-y-4">
              {user.tasks?.map((task) => (
                <div key={task.id} className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-white shadow-sm'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{task.taskTitle}</h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {task.taskDescription}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {!task.completed && !task.failed && (
                        <>
                          <button
                            onClick={() => updateTaskStatus(user.id, task.id, 'active')}
                            className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                          >
                            Start
                          </button>
                          <button
                            onClick={() => updateTaskStatus(user.id, task.id, 'completed')}
                            className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200"
                          >
                            Complete
                          </button>
                          <button
                            onClick={() => updateTaskStatus(user.id, task.id, 'failed')}
                            className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200"
                          >
                            Mark Failed
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => deleteTask(user.id, task.id)}
                        className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <span>Due: {new Date(task.taskDate).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>Category: {task.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper component for task counts
const TaskCounter = ({ count, label, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`px-2 py-1 text-xs rounded-full ${colorClasses[color]}`}>
      {label}: {count}
    </span>
  );
};

export default AllTask;
