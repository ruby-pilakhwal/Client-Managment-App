import React from 'react'

const TaskNo = ({ taskCounts }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-xl shadow-lg w-full lg:w-1/2">
      <h3 className="text-2xl font-extrabold text-gray-800 mb-6">Task Summary</h3>
      <ul className="space-y-4">
        <li className="flex justify-between items-center">
          <span className="text-lg text-gray-700">New Tasks:</span>
          <span className="text-lg font-bold text-blue-700">{taskCounts.newTask}</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-lg text-gray-700">Active Tasks:</span>
          <span className="text-lg font-bold text-yellow-700">{taskCounts.active}</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-lg text-gray-700">Completed Tasks:</span>
          <span className="text-lg font-bold text-green-700">{taskCounts.completed}</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-lg text-gray-700">Failed Tasks:</span>
          <span className="text-lg font-bold text-red-700">{taskCounts.failed}</span>
        </li>
      </ul>
    </div>
  )
}

export default TaskNo
