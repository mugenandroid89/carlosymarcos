import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Task {
  id: string
  date: string
  title: string
  description: string
}

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])

  function addTask(task: Task) {
    tasks.value.push(task)
  }

  function getTasksByDate(date: string) {
    return tasks.value.filter(task => task.date === date)
  }

  function getAllTasks() {
    return tasks.value
  }

  return { tasks, addTask, getTasksByDate, getAllTasks }
})