import React from "react";

const CompleteTask = ({ data }) => {
  return (
    <div className="flex-shrink-0 w-[320px] p-6 bg-gradient-to-r from-green-100 to-teal-100 backdrop-blur-lg bg-opacity-30 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-center mb-4">
        <span className="bg-green-200 text-green-800 text-xs font-semibold px-2 py-1 rounded">
          {data.category}
        </span>
        <span className="text-xs text-gray-600">{new Date(data.taskDate).toLocaleDateString()}</span>
      </div>
      <h2 className="text-lg font-bold text-gray-800 mb-2">{data.taskTitle}</h2>
      <p className="text-sm text-gray-700 mb-4">{data.taskDescription}</p>
      <div className="mt-6">
        <button className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium py-2 px-4 transition-colors duration-200">
          Completed
        </button>
      </div>
    </div>
  );
};

export default CompleteTask;
