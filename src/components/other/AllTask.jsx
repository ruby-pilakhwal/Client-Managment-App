// import React from "react";
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { Toaster } from 'react-hot-toast'

const AllTask = ({ isDarkMode }) => {
  const [userData, setUserData] = useContext(AuthContext);

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
              failed: false
            }
            // Set new status
            updatedTask[newStatus] = true
            return updatedTask
          }
          return task
        })

        // Recalculate task counts
        const taskCounts = {
          newTask: updatedTasks.filter(t => t.newTask).length,
          active: updatedTasks.filter(t => t.active).length,
          completed: updatedTasks.filter(t => t.completed).length,
          failed: updatedTasks.filter(t => t.failed).length
        }

        return {
          ...user,
          tasks: updatedTasks,
          taskCounts
        }
      }
      return user
    })

    setUserData(updatedUserData)
  }

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
        }

        return {
          ...user,
          tasks: updatedTasks,
          taskCounts
        }
      }
      return user
    });

    setUserData(updatedUserData);
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className={`p-8 transition-all duration-300 ${
        isDarkMode ? 'bg-[#1a1b1e]' : 'bg-white'
      }`}>
        <h2 className={`text-2xl font-semibold mb-6 ${
          isDarkMode ? 'text-gray-100' : 'text-[#5b6571]'
        }`}>Team Task Overview</h2>
        
        <div className="space-y-6">
          {userData.map((employee) => (
            <div key={employee.id} className={`rounded-xl overflow-hidden ${
              isDarkMode ? 'bg-[#2c2d31]' : 'bg-gray-50'
            }`}>
              {/* Employee Header */}
              <div className={`p-4 ${
                isDarkMode ? 'bg-[#373839]' : 'bg-gray-100'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium">
                      {employee.firstName[0]}
                    </div>
                    <span className={`font-medium ${
                      isDarkMode ? 'text-gray-100' : 'text-gray-800'
                    }`}>
                      {employee.firstName}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <TaskCounter label="New" count={employee.taskCounts.newTask} color="blue" />
                    <TaskCounter label="Active" count={employee.taskCounts.active} color="yellow" />
                    <TaskCounter label="Completed" count={employee.taskCounts.completed} color="green" />
                    <TaskCounter label="Failed" count={employee.taskCounts.failed} color="red" />
                  </div>
                </div>
              </div>

              {/* Task List */}
              <div className="p-4">
                {employee.tasks.map((task) => (
                  <div key={task.id} className={`p-4 rounded-lg mb-3 ${
                    isDarkMode ? 'bg-[#1a1b1e]' : 'bg-white'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`font-medium ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-800'
                      }`}>
                        {task.taskTitle}
                      </h3>
                      <span className={`px-2 py-1 rounded text-xs ${
                        task.newTask ? 'bg-blue-100 text-blue-800' :
                        task.active ? 'bg-yellow-100 text-yellow-800' :
                        task.completed ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {task.newTask ? 'New' :
                         task.active ? 'Active' :
                         task.completed ? 'Completed' :
                         'Failed'}
                      </span>
                    </div>
                    
                    <p className={`text-sm mb-3 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {task.taskDescription}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 text-sm">
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                          Due: {new Date(task.taskDate).toLocaleDateString()}
                        </span>
                        <span className={`px-2 py-0.5 rounded ${
                          isDarkMode ? 'bg-[#2c2d31] text-gray-300' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {task.category}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        {!task.completed && !task.failed && (
                          <>
                            <button
                              onClick={() => updateTaskStatus(employee.id, task.id, 'active')}
                              className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                            >
                              Start
                            </button>
                            <button
                              onClick={() => updateTaskStatus(employee.id, task.id, 'completed')}
                              className="px-2 py-1 text-xs rounded bg-green-100 text-green-800 hover:bg-green-200"
                            >
                              Complete
                            </button>
                            <button
                              onClick={() => updateTaskStatus(employee.id, task.id, 'failed')}
                              className="px-2 py-1 text-xs rounded bg-red-100 text-red-800 hover:bg-red-200"
                            >
                              Mark Failed
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => deleteTask(employee.id, task.id)}
                          className="px-2 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// Helper component for task counts
const TaskCounter = ({ label, count, color }) => (
  <div className={`px-3 py-1 rounded-full bg-${color}-100 text-${color}-800 text-sm`}>
    {label}: {count}
  </div>
)

export default AllTask;
