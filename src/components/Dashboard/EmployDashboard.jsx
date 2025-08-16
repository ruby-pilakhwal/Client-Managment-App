import React, { useState, useEffect } from 'react';
import Header from '../other/Header';
import TaskNo from '../other/TaskNo';
import TaskList from '../TaskList/TaskList';
import PieChart from '../other/PieChart';

// Default task counts to prevent undefined errors
const defaultTaskCounts = {
  newTask: 0,
  active: 0,
  completed: 0,
  failed: 0
};

const EmployDashboard = (props) => {
  // Initialize with default values
  const [taskCounts, setTaskCounts] = useState(defaultTaskCounts);
  const [userData, setUserData] = useState({
    role: '',
    firstName: '',
    tasks: [],
    ...(props.data || {})
  });

  // Update task counts when user data changes
  useEffect(() => {
    if (props.data) {
      setUserData(prev => ({
        ...prev,
        ...props.data,
        tasks: props.data.tasks || []
      }));
      
      // Initialize task counts from props if available
      if (props.data.taskCounts) {
        setTaskCounts({
          ...defaultTaskCounts,
          ...props.data.taskCounts
        });
      } else if (props.data.tasks) {
        // Calculate initial task counts from tasks
        updateTaskCounts(props.data.tasks);
      }
    }
  }, [props.data]);

  const updateTaskCounts = (tasks = []) => {
    const newCounts = {
      newTask: tasks.filter(task => task.newTask).length,
      active: tasks.filter(task => task.active).length,
      completed: tasks.filter(task => task.completed).length,
      failed: tasks.filter(task => task.failed).length
    };

    setTaskCounts(newCounts);
    return newCounts;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <Header data={userData} />

      {/* Stats and Chart Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start mb-8 space-y-6 lg:space-y-0 lg:space-x-6">
        <TaskNo taskCounts={taskCounts} />
        <PieChart taskCounts={taskCounts} />
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto">
        <TaskList 
          data={userData} 
          updateTaskCounts={updateTaskCounts} 
        />
      </div>
    </div>
  );
};

export default EmployDashboard;
