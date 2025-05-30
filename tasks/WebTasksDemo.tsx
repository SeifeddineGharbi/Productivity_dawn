"use client"

import { useState } from "react"

export const WebTasksDemo = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Drink a glass of water", completed: true, time: "07:00", icon: "💧", color: "bg-cyan-500" },
    { id: 2, title: "10 minutes meditation", completed: true, time: "07:15", icon: "🧘‍♀️", color: "bg-purple-500" },
    { id: 3, title: "Read for 20 minutes", completed: false, time: "07:30", icon: "📚", color: "bg-green-500" },
    { id: 4, title: "Morning exercise", completed: false, time: "08:00", icon: "🏃‍♂️", color: "bg-orange-500" },
    { id: 5, title: "Healthy breakfast", completed: false, time: "08:30", icon: "🥗", color: "bg-yellow-500" },
  ])

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const completedCount = tasks.filter((task) => task.completed).length
  const progress = (completedCount / tasks.length) * 100

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-blue-100">
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🌅</div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent mb-2">
            Good morning!
          </h1>
          <p className="text-gray-600 text-lg">Let's make today amazing</p>
          <p className="text-sm text-gray-500 mt-2">{currentTime}</p>
        </div>

        {/* Progress Card */}
        <div className="bg-gradient-to-r from-orange-500 to-blue-600 rounded-3xl p-6 mb-8 text-white shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold mb-1">Today's Progress</h3>
              <p className="text-orange-100">
                {completedCount} of {tasks.length} completed
              </p>
            </div>
            <div className="text-4xl font-bold">{Math.round(progress)}%</div>
          </div>
          <div className="w-full bg-orange-400 bg-opacity-50 rounded-full h-4 mb-4">
            <div
              className="bg-white h-4 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
          {progress === 100 && (
            <div className="text-center">
              <p className="font-bold text-lg">🎉 Perfect morning! You're unstoppable!</p>
            </div>
          )}
        </div>

        {/* Tasks List */}
        <div className="space-y-4 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Morning Routine</h3>
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white rounded-2xl p-5 border-2 transition-all duration-200 shadow-lg ${
                task.completed
                  ? "border-green-300 bg-green-50 transform scale-98"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-xl"
              }`}
            >
              <div className="flex items-center">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-8 h-8 rounded-full border-3 mr-4 flex items-center justify-center transition-all duration-200 ${
                    task.completed
                      ? "bg-green-500 border-green-500 transform scale-110"
                      : "border-gray-300 hover:border-green-400 hover:bg-green-50"
                  }`}
                >
                  {task.completed && <span className="text-white text-lg font-bold">✓</span>}
                </button>

                <div
                  className={`w-12 h-12 ${task.color} rounded-2xl flex items-center justify-center text-xl mr-4 ${
                    task.completed ? "opacity-60" : ""
                  }`}
                >
                  {task.icon}
                </div>

                <div className="flex-1">
                  <h4
                    className={`font-bold text-lg ${task.completed ? "text-green-700 line-through" : "text-gray-900"}`}
                  >
                    {task.title}
                  </h4>
                  <p className="text-sm text-gray-500 font-medium">{task.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Task Button */}
        <button className="w-full bg-gradient-to-r from-orange-500 to-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 mb-8">
          + Add New Habit
        </button>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 text-center shadow-lg">
            <div className="text-3xl font-bold text-orange-500 mb-1">7</div>
            <div className="text-sm text-gray-600 font-medium">Day Streak</div>
            <div className="text-xs text-gray-500">🔥</div>
          </div>
          <div className="bg-white rounded-2xl p-5 text-center shadow-lg">
            <div className="text-3xl font-bold text-green-500 mb-1">85%</div>
            <div className="text-sm text-gray-600 font-medium">This Week</div>
            <div className="text-xs text-gray-500">📈</div>
          </div>
          <div className="bg-white rounded-2xl p-5 text-center shadow-lg">
            <div className="text-3xl font-bold text-blue-500 mb-1">42</div>
            <div className="text-sm text-gray-600 font-medium">Total Days</div>
            <div className="text-xs text-gray-500">🏆</div>
          </div>
        </div>
      </div>
    </div>
  )
}
