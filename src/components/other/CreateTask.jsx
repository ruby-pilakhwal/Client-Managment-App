import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { toast } from 'react-hot-toast'

const CreateTask = ({ isDarkMode }) => {

    const [userData, setUserData] = useContext(AuthContext)

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [asignTo, setAsignTo] = useState('')
    const [category, setCategory] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()

        if (!taskTitle || !taskDescription || !taskDate || !asignTo || !category) {
            toast.error('Please fill in all fields')
            return
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
        }

        const updatedUserData = userData.map(user => {
            if (user.firstName.toLowerCase() === asignTo.toLowerCase()) {
                return {
                    ...user,
                    tasks: [...user.tasks, newTask],
                    taskCounts: {
                        ...user.taskCounts,
                        newTask: user.taskCounts.newTask + 1
                    }
                }
            }
            return user
        })

        const employeeExists = updatedUserData.some(
            user => user.firstName.toLowerCase() === asignTo.toLowerCase()
        )

        if (!employeeExists) {
            toast.error('Employee not found!')
            return
        }

        setUserData(updatedUserData)
        localStorage.setItem('employees', JSON.stringify(updatedUserData))

        setTaskTitle('')
        setTaskDescription('')
        setTaskDate('')
        setAsignTo('')
        setCategory('')

        toast.success('Task created successfully!')
    }

    const inputClasses = `w-full px-4 py-3 rounded-xl transition-all duration-300 outline-none ${
        isDarkMode 
            ? 'bg-[#2c2d31] border-[#404144] text-gray-100 placeholder-gray-500 focus:border-[#6366f1] focus:ring-2 focus:ring-[#4f46e5]/20' 
            : 'bg-[#f8f9fc] border-[#e1e6ef] text-[#4a5568] placeholder-gray-400 focus:border-[#c7d2fe] focus:ring-2 focus:ring-[#e0e7ff]'
    }`

    const labelClasses = `text-sm font-medium mb-2 block ${
        isDarkMode ? 'text-gray-300' : 'text-[#8b95a5]'
    }`

    const employees = userData.map(user => user.firstName)

    return (
        <div className={`p-8 transition-all duration-300 ${
            isDarkMode ? 'bg-[#1a1b1e]' : 'bg-white'
        }`}>
            <h2 className={`text-2xl font-semibold mb-8 ${
                isDarkMode ? 'text-gray-100' : 'text-[#5b6571]'
            }`}>
                Create New Task
            </h2>

            <form onSubmit={submitHandler} className='flex flex-wrap gap-8'>
                <div className='flex-1 min-w-[300px]'>
                    <div className='space-y-6'>
                        <div>
                            <label className={labelClasses}>Task Title</label>
                            <input
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                                className={inputClasses}
                                type="text"
                                placeholder='Enter task title'
                                required
                            />
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className={labelClasses}>Due Date</label>
                                <input
                                    value={taskDate}
                                    onChange={(e) => setTaskDate(e.target.value)}
                                    className={inputClasses}
                                    type="date"
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            <div>
                                <label className={labelClasses}>Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
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
                            <label className={labelClasses}>Assign To</label>
                            <select
                                value={asignTo}
                                onChange={(e) => setAsignTo(e.target.value)}
                                className={inputClasses}
                                required
                            >
                                <option value="">Select Employee</option>
                                {employees.map((employee, index) => (
                                    <option key={index} value={employee}>
                                        {employee}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className='flex-1 min-w-[300px]'>
                    <div className='h-full'>
                        <label className={labelClasses}>Description</label>
                        <textarea
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            className={`${inputClasses} h-[250px] resize-none`}
                            placeholder='Enter task description'
                        ></textarea>
                    </div>
                </div>

                <button 
                    className={`w-full transition-all duration-300 font-medium text-white
                    py-4 px-6 rounded-xl shadow-lg hover:shadow-xl ${
                        isDarkMode 
                            ? 'bg-gradient-to-r from-[#6366f1] to-[#4f46e5] hover:from-[#4f46e5] hover:to-[#4338ca] shadow-indigo-900/30'
                            : 'bg-gradient-to-r from-[#93c5fd] to-[#818cf8] hover:from-[#818cf8] hover:to-[#93c5fd] shadow-blue-200/50'
                    }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Create Task
                    </div>
                </button>
            </form>
        </div>
    )
}

export default CreateTask