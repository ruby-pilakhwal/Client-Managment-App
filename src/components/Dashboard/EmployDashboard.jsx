import React, { useState } from 'react';
import Header from '../other/Header';
import TaskNo from '../other/TaskNo';
import TaskList from '../TaskList/TaskList';
import PieChart from '../other/PieChart';

const EmployDashboard = (props) => {
  const defaultData = { role: '', firstName: '', taskCounts: {} };
  const data = props.data || defaultData;
  const [taskCounts, setTaskCounts] = useState(data.taskCounts);

  const updateTaskCounts = (tasks) => {
    const newTaskCount = tasks.filter(task => task.newTask).length;
    const activeTaskCount = tasks.filter(task => task.active).length;
    const completedTaskCount = tasks.filter(task => task.completed).length;
    const failedTaskCount = tasks.filter(task => task.failed).length;

    setTaskCounts({
      newTask: newTaskCount,
      active: activeTaskCount,
      completed: completedTaskCount,
      failed: failedTaskCount
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <Header changeUser={props.changeUser} data={data} />

      {/* Stats and Chart Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start mb-8 space-y-6 lg:space-y-0 lg:space-x-6">
        <TaskNo taskCounts={taskCounts} />
        <PieChart taskCounts={taskCounts} />
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto">
        <TaskList data={data} updateTaskCounts={updateTaskCounts} />
      </div>
    </div>
  );
};

export default EmployDashboard;
