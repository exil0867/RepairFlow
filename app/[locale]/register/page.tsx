import Image from 'next/image'
import prisma from '@/lib/prisma'
import RegisterForm from './register-form'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { z } from 'zod'
import { Button } from '@/components/ui/button'

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
    <div className='flex items-center min-h-screen p-6 md:p-10'>
      <div className='mx-auto space-y-8 w-full max-w-sm'>
        <div className='space-y-2 text-center'>
          <h1 className='text-3xl font-bold'>S&apos;inscrire</h1>
          <p className='text-gray-500 dark:text-gray-400'>
            Entrez un nom d&apos;utilisateur et un mot de passe ci-dessous pour
            créer un compte
          </p>
        </div>
        <div className='space-y-4'>
          <RegisterForm registerUser={registerUser} />
        </div>
        <div className='space-y-2'>
          <Link className='w-full' href='login'>
            <Button className='w-full' variant='outline'>
              Se connecter
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
