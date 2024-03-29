'use server'
import { signIn, signOut as NextAuthSignOut } from '@/lib/auth'
import { AuthError } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log(formData.get('username'))
    await signIn('credentials', {
      redirect: false,
      username: formData.get('username'),
      password: formData.get('password'),
    })
    return {
      message: 'Connecté',
      error: false,
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            message: `Les informations d'identification invalides.`,
            error: true,
          }
        default:
          return {
            message: `Quelque chose s'est mal passé.`,
            error: true,
          }
      }
    }
    throw error
  }
}

export async function signOut() {
  try {
    await NextAuthSignOut()
  } catch (error) {
    throw error
  }
}
