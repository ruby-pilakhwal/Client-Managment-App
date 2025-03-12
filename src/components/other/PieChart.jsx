import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ taskCounts }) => {
    const chartData = {
        labels: ['New Tasks', 'Active Tasks', 'Completed Tasks', 'Failed Tasks'],
        datasets: [
            {
                data: [
                    taskCounts.newTask,
                    taskCounts.active,
                    taskCounts.completed,
                    taskCounts.failed
                ],
                backgroundColor: [
                    '#93c5fd', // New Tasks
                    '#fbbf24', // Active Tasks
                    '#34d399', // Completed Tasks
                    '#f87171'  // Failed Tasks
                ],
                hoverBackgroundColor: [
                    '#60a5fa',
                    '#f59e0b',
                    '#10b981',
                    '#ef4444'
                ]
            }
        ]
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 10,
                    padding: 15,
                }
            }
        }
    };

    return (
        <div className="w-1/2 p-4">
            <h3 className="text-lg font-medium text-center mb-4">Task Distribution</h3>
            <div style={{ height: '200px' }}>
                <Pie data={chartData} options={options} />
            </div>
        </div>
    );
};

export default PieChart; 