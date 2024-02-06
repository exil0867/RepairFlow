import Image from 'next/image'
import prisma from '@/lib/prisma'
import RegisterForm from './register-form'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { z } from 'zod'

const schema = z.object({
  username: z.string({
    invalid_type_error: 'Invalid Username',
  }),
  password: z.string(),
})

export type registerRes = {
  message: string
  error: boolean
}

export default function Register() {
  const registerUser = async (
    prevState: any,
    data: FormData,
  ): Promise<registerRes> => {
    'use server'
    const username = data.get('username')
    const password = data.get('password')
    const validatedFields = schema.safeParse({
      username: username,
      password: password,
    })

    if (!validatedFields.success) {
      return { message: 'Entrée utilisateur invalide.', error: true }
    }

    const user = await prisma.user.findUnique({
      where: {
        username: validatedFields.data.username,
      },
    })
    if (user) {
      return { message: `L'utilisateur existe déjà`, error: true }
    } else {
      await prisma.user.create({
        data: {
          username: validatedFields.data.username,
          password: await hash(validatedFields.data.password, 10),
        },
      })
    }
    return {
      message: 'Utilisateur créé',
      error: false,
    }
  }
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-gray-50'>
      <div className='z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl'>
        <div className='flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16'>
          <Link href='/'>
            <Image
              src='/logo.png'
              priority
              alt='Logo'
              className='h-10 w-10 rounded-full'
              width={20}
              height={20}
            />
          </Link>
          <h3 className='text-xl font-semibold'>S&apos;inscrire</h3>
          <p className='text-sm text-gray-500'>
            Créez un compte avec votre nom d&apos;utilisateur et votre mot de
            passe
          </p>
        </div>
        <RegisterForm registerUser={registerUser} />
      </div>
    </div>
  )
}
