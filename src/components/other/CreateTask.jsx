import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { toast } from 'react-hot-toast';

const CreateTask = ({ isDarkMode }) => {
    const { userData, setUserData } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        taskTitle: '',
        taskDescription: '',
        taskDate: '',
        asignTo: '',
        category: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const { taskTitle, taskDescription, taskDate, asignTo, category } = formData;

        if (!taskTitle || !taskDescription || !taskDate || !asignTo || !category) {
            toast.error('Please fill in all fields');
            return;
        }

        const newTask = {
            id: Date.now(),
            taskTitle,
            taskDescription,
            taskDate,
            category,
            status: 'new',
            active: false,
            newTask: true,
            failed: false,
            completed: false,
            createdAt: new Date().toISOString(),
        };

        const updatedUserData = userData.map(user => {
            if (user.id === asignTo) {
                return {
                    ...user,
                    tasks: [...user.tasks, newTask],
                    taskCounts: {
                        ...user.taskCounts,
                        newTask: user.taskCounts.newTask + 1
                    }
                };
            }
            return user;
        });

        const employeeExists = updatedUserData.some(
            user => user.id === asignTo
        );

        if (!employeeExists) {
            toast.error('Employee not found!');
            return;
        }

        setUserData(updatedUserData);
        localStorage.setItem('employees', JSON.stringify(updatedUserData));

        setFormData({
            taskTitle: '',
            taskDescription: '',
            taskDate: '',
            asignTo: '',
            category: ''
        });

        toast.success('Task created successfully!');
    };

    const inputClasses = `w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        isDarkMode 
            ? 'bg-gray-700 border-gray-600 text-white' 
            : 'bg-white border-gray-300 text-gray-800'
    }`;

    const labelClasses = `block text-sm font-medium mb-1 ${
        isDarkMode ? 'text-gray-300' : 'text-gray-700'
    }`;

    return (
        <div className={`p-6 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Create New Task
            </h2>
            
            <form onSubmit={submitHandler} className="space-y-4">
                <div>
                    <label htmlFor="taskTitle" className={labelClasses}>
                        Task Title
                    </label>
                    <input
                        type="text"
                        id="taskTitle"
                        name="taskTitle"
                        value={formData.taskTitle}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="Enter task title"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="taskDescription" className={labelClasses}>
                        Description
                    </label>
                    <textarea
                        id="taskDescription"
                        name="taskDescription"
                        value={formData.taskDescription}
                        onChange={handleChange}
                        className={`${inputClasses} min-h-[100px]`}
                        placeholder="Enter task description"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="taskDate" className={labelClasses}>
                            Due Date
                        </label>
                        <input
                            type="date"
                            id="taskDate"
                            name="taskDate"
                            value={formData.taskDate}
                            onChange={handleChange}
                            className={inputClasses}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className={labelClasses}>
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={inputClasses}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="design">Design</option>
                            <option value="development">Development</option>
                            <option value="marketing">Marketing</option>
                            <option value="research">Research</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="asignTo" className={labelClasses}>
                        Assign To
                    </label>
                    <select
                        id="asignTo"
                        name="asignTo"
                        value={formData.asignTo}
                        onChange={handleChange}
                        className={inputClasses}
                        required
                    >
                        <option value="">Select Team Member</option>
                        {userData?.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.firstName}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                >
                    Create Task
                </button>
            </form>
        </div>
    );
};

export default CreateTask;