import React, { useContext } from "react";
import { AuthContext } from '../../context/AuthProvider';
import AcceptTask from "./AcceptTask";
import CompleteTask from "./CompleteTask";
import NewTask from "./NewTask";
import FailedTask from "./FailedTask";

const TaskList = ({ data, updateTaskCounts }) => {
  const { userData, setUserData } = useContext(AuthContext);
  
  // Use data from props if available, otherwise fall back to context
  const tasks = data?.tasks || [];
  const currentUser = data || {};

  const handleTaskUpdate = (taskId, newStatus) => {
    if (!userData) return;

    const updatedUserData = userData.map(user => {
      // Use the current user's ID from props if available, otherwise use the first user
      if (user.id === (currentUser.id || userData[0]?.id)) {
        const updatedTasks = (user.tasks || []).map(task => {
          if (task.id === taskId) {
            return {
              ...task,
              newTask: newStatus === 'new',
              active: newStatus === 'active',
              completed: newStatus === 'completed',
              failed: newStatus === 'failed'
            };
          }
          return task;
        });

        const updatedUser = {
          ...user,
          tasks: updatedTasks,
          taskCounts: {
            newTask: updatedTasks.filter(t => t.newTask).length,
            active: updatedTasks.filter(t => t.active).length,
            completed: updatedTasks.filter(t => t.completed).length,
            failed: updatedTasks.filter(t => t.failed).length
          }
        };

        // Update localStorage
        const userType = user.role === 'admin' ? 'admin' : 'employees';
        const storedData = JSON.parse(localStorage.getItem(userType) || '[]');
        const updatedStoredData = storedData.map(u => 
          u.id === user.id ? updatedUser : u
        );
        localStorage.setItem(userType, JSON.stringify(updatedStoredData));

        // Update task counts if the updateTaskCounts function is provided
        if (updateTaskCounts) {
          updateTaskCounts(updatedTasks);
        }

        return updatedUser;
      }
      return user;
    });

    // Update the context
    setUserData(updatedUserData);
  };

  if (!tasks || tasks.length === 0) {
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
      {tasks.map((task, idx) => {
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
