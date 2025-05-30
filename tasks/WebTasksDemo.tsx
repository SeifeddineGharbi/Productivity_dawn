"use client"

import { useState } from "react"

export const WebTasksDemo = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Drink water", completed: true, time: "07:00" },
    { id: 2, title: "10 minutes meditation", completed: true, time: "07:15" },
    { id: 3, title: "Read for 20 minutes", completed: false, time: "07:30" },
    { id: 4, title: "Exercise", completed: false, time: "08:00" },
    { id: 5, title: "Healthy breakfast", completed: false, time: "08:30" },
  ])

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const completedCount = tasks.filter((task) => task.completed).length
  const progress = (completedCount / tasks.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Good morning! 🌅</h1>
          <p className="text-gray-600">Let's make today productive</p>
        </div>

        {/* Progress Card */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 mb-6 text-white">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">Today's Progress</h3>
              <p className="text-blue-100">
                {completedCount} of {tasks.length} completed
              </p>
            </div>
            <div className="text-3xl font-bold">{Math.round(progress)}%</div>
          </div>
          <div className="w-full bg-blue-400 rounded-full h-3">
            <div className="bg-white h-3 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Morning Routine</h3>
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white rounded-xl p-4 border-2 transition-all ${
                task.completed ? "border-green-200 bg-green-50" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-colors ${
                    task.completed ? "bg-green-500 border-green-500" : "border-gray-300 hover:border-green-400"
                  }`}
                >
                  {task.completed && <span className="text-white text-sm">✓</span>}
                </button>
                <div className="flex-1">
                  <h4 className={`font-medium ${task.completed ? "text-green-700 line-through" : "text-gray-900"}`}>
                    {task.title}
                  </h4>
                  <p className="text-sm text-gray-500">{task.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Task Button */}
        <button className="w-full mt-6 bg-blue-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors">
          + Add New Task
        </button>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">7</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-500">85%</div>
            <div className="text-sm text-gray-600">This Week</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">42</div>
            <div className="text-sm text-gray-600">Total Days</div>
          </div>
        </div>
      </div>
    </div>
  )
}
