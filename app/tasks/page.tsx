"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, FlatList, TextInput, SafeAreaView } from "@/utils/react-native-web"
import { useRouter } from "next/navigation"

// Mock task data
const initialTasks = [
  { id: "1", title: "Complete project proposal", completed: false },
  { id: "2", title: "Schedule team meeting", completed: true },
  { id: "3", title: "Review quarterly goals", completed: false },
  { id: "4", title: "Update portfolio website", completed: false },
  { id: "5", title: "Read industry newsletter", completed: true },
]

export default function TasksScreen() {
  const router = useRouter()
  const [tasks, setTasks] = useState(initialTasks)
  const [newTask, setNewTask] = useState("")

  const handleAddTask = () => {
    if (newTask.trim() === "") return

    const newTaskItem = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
    }

    setTasks([newTaskItem, ...tasks])
    setNewTask("")
  }

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const navigateToAnalytics = () => {
    router.push("/analytics")
  }

  const navigateToSettings = () => {
    router.push("/settings")
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-6">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-gray-900">My Tasks</Text>
          <View className="flex-row space-x-4">
            <TouchableOpacity onPress={navigateToAnalytics}>
              <View className="w-10 h-10 bg-indigo-100 rounded-full items-center justify-center">
                <Text className="text-indigo-600 font-bold">A</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToSettings}>
              <View className="w-10 h-10 bg-indigo-100 rounded-full items-center justify-center">
                <Text className="text-indigo-600 font-bold">S</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row items-center mb-6">
          <TextInput
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 mr-2"
            placeholder="Add a new task"
            value={newTask}
            onChangeText={setNewTask}
          />
          <TouchableOpacity onPress={handleAddTask} className="bg-indigo-600 rounded-lg px-4 py-3">
            <Text className="text-white font-medium">Add</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row items-center py-4 border-b border-gray-200">
              <TouchableOpacity
                onPress={() => handleToggleTask(item.id)}
                className={`w-6 h-6 rounded-full border ${
                  item.completed ? "bg-indigo-600 border-indigo-600" : "border-gray-400"
                } mr-3`}
              >
                {item.completed && (
                  <View className="flex-1 items-center justify-center">
                    <Text className="text-white text-xs">✓</Text>
                  </View>
                )}
              </TouchableOpacity>
              <Text className={`flex-1 ${item.completed ? "text-gray-400 line-through" : "text-gray-900"}`}>
                {item.title}
              </Text>
              <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                <Text className="text-red-500">Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* Bottom Tab Bar */}
      <View className="flex-row justify-around items-center border-t border-gray-200 py-3 bg-white">
        <TouchableOpacity className="items-center">
          <View className="w-6 h-6 bg-indigo-600 rounded-full mb-1"></View>
          <Text className="text-xs text-indigo-600 font-medium">Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center" onPress={navigateToAnalytics}>
          <View className="w-6 h-6 bg-gray-300 rounded-full mb-1"></View>
          <Text className="text-xs text-gray-500">Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center" onPress={navigateToSettings}>
          <View className="w-6 h-6 bg-gray-300 rounded-full mb-1"></View>
          <Text className="text-xs text-gray-500">Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
