import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  getAuth,
  sendPasswordResetEmail
} from 'firebase/auth'
import { auth, db } from '@/firebaseConfig'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

const { user: userActual, loadingAuth } = storeToRefs(useAuthStore())
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
export const updateUserService = async (name: string, password: string) => {
  try {
    loadingAuth.value = true

    const user = auth.currentUser
    if (!user) {
      throw new Error('Nenhum usuário autenticado encontrado')
    }

    const credential = EmailAuthProvider.credential(user.email!, password)
    await reauthenticateWithCredential(user, credential)

    await updateProfile(user, {
      displayName: name
    })

    setUser({
      ...user,
      displayName: name,
      photoURL: userActual.value?.photoURL!
    })

    return { status: true, message: 'Usuário atualizado com sucesso' }
  } catch (error: any) {
    return { status: false, message: error.message }
  } finally {
    loadingAuth.value = false
  }
}
export const updatePhotoUserService = async (file: File, id: string) => {
  try {
    loadingAuth.value = true
    const storageRef = ref(getStorage(), `profilePictures/${id}`)
    await uploadBytes(storageRef, file)

    const photoURL = await getDownloadURL(storageRef)
    const userDocRef = doc(db, 'user_details', id)
    await setDoc(userDocRef, { image_perfil: photoURL }, { merge: true })
    userActual.value = {
      uid: userActual.value?.uid!,
      displayName: userActual.value?.displayName!,
      email: userActual.value?.email!,
      photoURL: photoURL
    }

    return { status: true, message: 'Foto de perfil atualizada com sucesso' }
  } catch (error: any) {
    return { status: false, message: error.message }
  } finally {
    loadingAuth.value = false
  }
}
export const resetPhotoUserService = async (userId: string) => {
  try {
    loadingAuth.value = true
    const storage = getStorage()
    const storageRef = ref(storage, `profilePictures/${userId}`)

    await deleteObject(storageRef)

    const userDocRef = doc(db, 'user_details', userId)
    await updateDoc(userDocRef, { image_perfil: null })

    userActual.value = {
      uid: userActual.value?.uid!,
      displayName: userActual.value?.displayName!,
      email: userActual.value?.email!,
      photoURL: null
    }

    return { status: true, message: 'Foto de perfil removida com sucesso' }
  } catch (error) {
    console.error('Erro ao remover foto de perfil:', error)
    return { status: false, message: 'Erro ao remover foto de perfil' }
  } finally {
    loadingAuth.value = false
  }
}
export const loginService = async (email: string, password: string) => {
  try {
    loadingAuth.value = true
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const userId = userCredential.user.uid
    userActual.value = userCredential.user
    const userDocRef = doc(db, 'user_details', userId)
    const userDoc = await getDoc(userDocRef)

    if (userDoc.exists()) {
      const userDetails = userDoc.data()
      userActual.value = {
        ...userCredential.user,
        photoURL: userDetails.image_perfil
      }
    }

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
export const sendEmailService = async (email: string) => {
  try {
    const auth = getAuth()

    await sendPasswordResetEmail(auth, email)

    return { status: true, message: 'Email de redefinição de senha enviado com sucesso' }
  } catch (error) {
    return { status: false, message: 'Erro ao enviar e-mail de redefinição de senha' }
  }
}
