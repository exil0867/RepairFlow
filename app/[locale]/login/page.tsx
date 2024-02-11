import Image from 'next/image'
import LoginForm from './login-form'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Login() {
  return (
    <div className='flex items-center min-h-screen p-6 md:p-10'>
      <div className='mx-auto space-y-8 w-full max-w-sm'>
        <div className='space-y-2 text-center'>
          <h1 className='text-3xl font-bold'>Se connecter</h1>
          <p className='text-gray-500 dark:text-gray-400'>
            Entrez votre nom d&apos;utilisateur ci-dessous pour vous connecter à
            votre compte
          </p>
        </div>
        <div className='space-y-4'>
          <LoginForm />
        </div>
        <div className='space-y-2'>
          <Link className='w-full' href='register'>
            <Button className='w-full' variant='outline'>
              S&apos;inscrire
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
