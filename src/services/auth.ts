import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { auth } from '@/firebaseConfig'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const { user, loadingAuth } = storeToRefs(useAuthStore())
const { setUser } = useAuthStore()
const router = useRouter()

export const createUserService = async (email: string, password: string, name: string) => {
  try {
    loadingAuth.value = true
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential.user, {
      displayName: name
    })
    return { status: true, message: 'Usuário criado com sucesso' }
  } catch (error: any) {
    return { status: false, message: error.message }
  } finally {
    loadingAuth.value = false
  }
}

export const loginService = async (email: string, password: string) => {
  try {
    loadingAuth.value = true
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    user.value = userCredential.user

    return { status: true, message: 'Login feito com sucesso' }
  } catch (error: any) {
    return { status: false, message: error.message }
  } finally {
    loadingAuth.value = false
  }
}

export const logoutService = async () => {
  try {
    loadingAuth.value = true
    await signOut(auth)
    setUser(null)
    router.push('/')

    return { status: true, message: 'Login feito com sucesso' }
  } catch (error: any) {
    return { status: false, message: error.message }
  } finally {
    loadingAuth.value = false
  }
}
