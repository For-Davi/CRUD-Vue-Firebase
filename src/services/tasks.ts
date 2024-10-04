import type { NewDataTask, ObjectDataTask } from '@/interfaces/data/Task'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/stores/task'
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore'
import { db } from '@/firebaseConfig'
import { useAuthStore } from '@/stores/auth'

const { loadingTask, task } = storeToRefs(useTaskStore())
const { user } = storeToRefs(useAuthStore())

export const getTasksByUserId = async (userId: string) => {
  try {
    loadingTask.value = true
    const q = query(collection(db, 'task'), where('userId', '==', userId))
    const querySnapshot = await getDocs(q)

    const tasks: any[] = []
    querySnapshot.forEach((doc) => {
      tasks.push({
        id: doc.id,
        ...doc.data()
      })
    })

    return tasks
  } catch (error: any) {
    return console.error(error.message)
  } finally {
    loadingTask.value = false
  }
}
export const createTaskService = async (payload: NewDataTask) => {
  try {
    loadingTask.value = true
    await addDoc(collection(db, 'task'), payload)

    const result: Array<ObjectDataTask> = (await getTasksByUserId(payload.userId)) || []
    result.sort((a, b) => {
      if (a.status === 'Pendente' && b.status !== 'Pendente') {
        return -1
      }
      if (a.status !== 'Pendente' && b.status === 'Pendente') {
        return 1
      }
      return 0
    })
    task.value = result

    return { status: true, message: 'Tarefa criada com sucesso' }
  } catch (error: any) {
    return { status: false, message: error.message }
  } finally {
    loadingTask.value = false
  }
}
export const setTaskStatusFinalizedService = async (id: string) => {
  try {
    loadingTask.value = true
    await updateDoc(doc(db, 'task', id), {
      status: 'Finalizado'
    })

    const result: Array<ObjectDataTask> = (await getTasksByUserId(user.value?.uid!)) || []
    result.sort((a, b) => {
      if (a.status === 'Pendente' && b.status !== 'Pendente') {
        return -1
      }
      if (a.status !== 'Pendente' && b.status === 'Pendente') {
        return 1
      }
      return 0
    })
    task.value = result

    return { status: true, message: 'Tarefa atualizada como finalizada' }
  } catch (error: any) {
    return { status: false, message: error.message }
  } finally {
    loadingTask.value = false
  }
}
export const setTaskStatusPendentService = async (id: string) => {
  try {
    loadingTask.value = true
    await updateDoc(doc(db, 'task', id), {
      status: 'Pendente'
    })

    const result: Array<ObjectDataTask> = (await getTasksByUserId(user.value?.uid!)) || []
    result.sort((a, b) => {
      if (a.status === 'Pendente' && b.status !== 'Pendente') {
        return -1
      }
      if (a.status !== 'Pendente' && b.status === 'Pendente') {
        return 1
      }
      return 0
    })
    task.value = result

    return { status: true, message: 'Tarefa atualizada como pendente' }
  } catch (error: any) {
    return { status: false, message: error.message }
  } finally {
    loadingTask.value = false
  }
}
export const updateTaskService = async (payload: ObjectDataTask) => {
  try {
    loadingTask.value = true
    await updateDoc(doc(db, 'task', payload.id), {
      title: payload.title,
      description: payload.description
    })

    const result: Array<ObjectDataTask> = (await getTasksByUserId(user.value?.uid!)) || []
    result.sort((a, b) => {
      if (a.status === 'Pendente' && b.status !== 'Pendente') {
        return -1
      }
      if (a.status !== 'Pendente' && b.status === 'Pendente') {
        return 1
      }
      return 0
    })
    task.value = result

    return { status: true, message: 'Tarefa atualizada como pendente' }
  } catch (error: any) {
    return { status: false, message: error.message }
  } finally {
    loadingTask.value = false
  }
}
export const deleteTaskService = async (id: string) => {
  try {
    loadingTask.value = true
    await deleteDoc(doc(db, 'task', id))

    const result: Array<ObjectDataTask> = (await getTasksByUserId(user.value?.uid!)) || []
    result.sort((a, b) => {
      if (a.status === 'Pendente' && b.status !== 'Pendente') {
        return -1
      }
      if (a.status !== 'Pendente' && b.status === 'Pendente') {
        return 1
      }
      return 0
    })
    task.value = result

    return { status: true, message: 'Tarefa deletada com sucesso' }
  } catch (error: any) {
    return { status: false, message: error.message }
  } finally {
    loadingTask.value = false
  }
}
