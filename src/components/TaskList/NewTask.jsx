import React from "react";

const NewTask = ({ data, onAccept }) => {
  return (
    <div className="flex-shrink-0 w-[320px] p-6 bg-gradient-to-r from-blue-100 to-indigo-100 backdrop-blur-lg bg-opacity-30 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-center mb-4">
        <span className="bg-blue-200 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
          {data.category}
        </span>
        <span className="text-xs text-gray-600">{new Date(data.taskDate).toLocaleDateString()}</span>
      </div>
      <h2 className="text-lg font-bold text-gray-800 mb-2">{data.taskTitle}</h2>
      <p className="text-sm text-gray-700 mb-4">{data.taskDescription}</p>
      <div className="mt-6">
        <button
          onClick={() => onAccept(data)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium py-2 px-4 transition-colors duration-200"
        >
          Accept Task
        </button>
      </div>
    </div>
  );
};

export default NewTask;
