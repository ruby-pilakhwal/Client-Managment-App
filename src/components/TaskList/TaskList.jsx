import React, { useContext } from "react";
import { AuthContext } from '../../context/AuthProvider';
import AcceptTask from "./AcceptTask";
import CompleteTask from "./CompleteTask";
import NewTask from "./NewTask";
import FailedTask from "./FailedTask";

const TaskList = ({ updateTaskCounts }) => {
  const [userData, setUserData] = useContext(AuthContext);

  const handleTaskUpdate = (employeeId, taskId, newStatus) => {
    const updatedUserData = userData.map(user => {
      if (user.id === employeeId) {
        const updatedTasks = user.tasks.map(task => {
          if (task.id === taskId) {
            return {
              ...task,
              newTask: newStatus === 'active' ? false : task.newTask,
              active: newStatus === 'active',
              completed: newStatus === 'completed',
              failed: newStatus === 'failed'
            };
          }
          return task;
        });

        return {
          ...user,
          tasks: updatedTasks
        };
      }
      return user;
    });

    setUserData(updatedUserData);
    updateTaskCounts(updatedUserData);
  };

  return (
    <div
      id="tasklist"
      className="flex flex-wrap gap-5 p-4 bg-gray-800 rounded-lg shadow-lg"
    >
      {userData.map((user) => (
        user.tasks.map((ele, idx) => {
          const taskComponent = ele.active ? (
            <AcceptTask key={idx} data={ele} onComplete={() => handleTaskUpdate(user.id, ele.id, 'completed')} onFail={() => handleTaskUpdate(user.id, ele.id, 'failed')} />
          ) : ele.completed ? (
            <CompleteTask key={idx} data={ele} />
          ) : ele.newTask ? (
            <NewTask key={idx} data={ele} onAccept={() => handleTaskUpdate(user.id, ele.id, 'active')} />
          ) : ele.failed ? (
            <FailedTask key={idx} data={ele} />
          ) : null;

          return (
            <div
              key={idx}
              className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {taskComponent}
            </div>
          );
        })
      ))}
    </div>
  );
};

export default TaskList;
