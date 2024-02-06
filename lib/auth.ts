import NextAuth from 'next-auth'
import { authConfig } from './../auth.config'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { User } from '@prisma/client'

async function getUser(username: string): Promise<User | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })
    if (user) {
      return user
    } else {
      console.error(`Impossible de trouver l'utilisateur.`)
      throw new Error(`Impossible de trouver l'utilisateur.`)
    }
  } catch (error) {
    console.error(`Échec de la récupération de l'utilisateur:`, error)
    throw new Error(`Échec de la récupération de l'utilisateur.`)
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials: any) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(4) })
          .safeParse(credentials)
        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data
          const user = await getUser(username)
          if (!user) return null
          const passwordsMatch = await bcrypt.compare(password, user.password)
          if (passwordsMatch) return user
        }
        return null
      },
    } as any) as any,
  ] as any,
})
