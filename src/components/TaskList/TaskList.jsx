import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from '../../context/AuthProvider';
import AcceptTask from "./AcceptTask";
import CompleteTask from "./CompleteTask";
import NewTask from "./NewTask";
import FailedTask from "./FailedTask";

const TaskList = ({ data, updateTaskCounts }) => {
  const { userData, setUserData } = useContext(AuthContext);
  const [localTasks, setLocalTasks] = useState([]);
  
 
  useEffect(() => {
    setLocalTasks(data?.tasks || []);
  }, [data]);

  const currentUser = data || {};

  const handleTaskUpdate = (taskId, newStatus) => {
    if (!userData || !taskId) return;

    const updatedUserData = JSON.parse(JSON.stringify(userData));
    
   
    const userIndex = updatedUserData.findIndex(user => 
      user.id === (currentUser.id || userData[0]?.id)
    );

    if (userIndex === -1) {
      console.error('User not found in userData');
      return;
    }

    const user = updatedUserData[userIndex];
    
  
    const taskIndex = (user.tasks || []).findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      console.error('Task not found');
      return;
    }

    
    const updatedTask = {
      ...user.tasks[taskIndex],
      newTask: false,
      active: false,
      completed: false,
      failed: false,
      [newStatus]: true,
      status: newStatus
    };

   
    const updatedTasks = [...user.tasks];
    updatedTasks[taskIndex] = updatedTask;
    user.tasks = updatedTasks;

  
    user.taskCounts = {
      newTask: updatedTasks.filter(t => t.newTask).length,
      active: updatedTasks.filter(t => t.active).length,
      completed: updatedTasks.filter(t => t.completed).length,
      failed: updatedTasks.filter(t => t.failed).length
    };

  
    const userType = user.role === 'admin' ? 'admin' : 'employees';
    const storedData = JSON.parse(localStorage.getItem(userType) || '[]');
    const updatedStoredData = storedData.map(u => 
      u.id === user.id ? user : u
    );
    localStorage.setItem(userType, JSON.stringify(updatedStoredData));

    setUserData(updatedUserData);
    
    setLocalTasks(updatedTasks);
    
    if (updateTaskCounts) {
      updateTaskCounts(updatedTasks);
    }
  };

  if (!localTasks || localTasks.length === 0) {
    return (
      <div className="text-center p-8 text-gray-400">
        No tasks found. Create a new task to get started!
      </div>
    );
  }

  return (
    <div
      id="tasklist"
      className="flex flex-wrap gap-5 p-4 bg-gray-800 rounded-lg shadow-lg"
    >
      {localTasks.map((task, idx) => {
        const taskComponent = task.active ? (
          <AcceptTask 
            key={task.id || idx} 
            data={task} 
            onComplete={() => handleTaskUpdate(task.id, 'completed')} 
            onFail={() => handleTaskUpdate(task.id, 'failed')} 
          />
        ) : task.completed ? (
          <CompleteTask key={task.id || idx} data={task} />
        ) : task.newTask ? (
          <NewTask 
            key={task.id || idx} 
            data={task} 
            onAccept={() => handleTaskUpdate(task.id, 'active')} 
          />
        ) : task.failed ? (
          <FailedTask key={task.id || idx} data={task} />
        ) : null;

        return (
          <div
            key={task.id || idx}
            className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full md:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-1.25rem)]"
          >
            {taskComponent}
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
