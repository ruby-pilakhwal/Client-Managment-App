import React from 'react'

const Pie = (data) => {
  return (
    <div className="my-6">
    <h2 className="text-xl font-semibold mb-4">Task Status Overview</h2>
    <PieChart width={400} height={300}>
      <Pie
        data={taskData}
        cx={200}
        cy={150}
        labelLine={false}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {taskData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </div>
  )
}

export default Pie
