import React from "react";

const AcceptTask = ({ data, onComplete, onFail }) => {
  const handleComplete = (e) => {
    e.stopPropagation();
    if (typeof onComplete === 'function') {
      onComplete(data.id);
    }
  };

  const handleFail = (e) => {
    e.stopPropagation();
    if (typeof onFail === 'function') {
      onFail(data.id);
    }
  };

  return (
    <div className="flex-shrink-0 w-[320px] p-6 bg-gradient-to-r from-yellow-100 to-yellow-200 backdrop-blur-lg bg-opacity-30 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-center mb-4">
        <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
          {data.category}
        </span>
        <span className="text-xs text-gray-600">{new Date(data.taskDate).toLocaleDateString()}</span>
      </div>
      <h2 className="text-lg font-bold text-gray-800 mb-2">{data.taskTitle}</h2>
      <p className="text-sm text-gray-700 mb-4">{data.taskDescription}</p>
      <div className="flex justify-between">
        <button
          onClick={handleComplete}
          className="flex-1 bg-green-400 hover:bg-green-500 text-white rounded-lg font-medium py-2 px-4 mr-2 transition-colors duration-200"
        >
          Complete
        </button>
        <button
          onClick={handleFail}
          className="flex-1 bg-red-400 hover:bg-red-500 text-white rounded-lg font-medium py-2 px-4 transition-colors duration-200"
        >
          Fail
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;
