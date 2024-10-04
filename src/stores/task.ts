import type { ObjectDataTask } from '@/interfaces/data/Task'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', {
  state: () => ({
    loadingTask: false,
    task: [] as Array<ObjectDataTask>
  })
})
