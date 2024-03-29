'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import { ResponsiveLine } from '@nivo/line'
import { ResponsiveBar } from '@nivo/bar'
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table'
import { useState } from 'react'
import { signOut } from '../actions/auth'

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
      <circle cx='12' cy='7' r='4' />
    </svg>
  )
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M5 12h14' />
      <path d='M12 5v14' />
    </svg>
  )
}

function HomeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
      <polyline points='9 22 9 12 15 12 15 22' />
    </svg>
  )
}

function LayoutDashboardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <rect width='7' height='9' x='3' y='3' rx='1' />
      <rect width='7' height='5' x='14' y='3' rx='1' />
      <rect width='7' height='9' x='14' y='12' rx='1' />
      <rect width='7' height='5' x='3' y='16' rx='1' />
    </svg>
  )
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='11' cy='11' r='8' />
      <path d='m21 21-4.3-4.3' />
    </svg>
  )
}

function TableIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M12 3v18' />
      <rect width='18' height='18' x='3' y='3' rx='2' />
      <path d='M3 9h18' />
      <path d='M3 15h18' />
    </svg>
  )
}

function BarChartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='12' x2='12' y1='20' y2='10' />
      <line x1='18' x2='18' y1='20' y2='4' />
      <line x1='6' x2='6' y1='20' y2='16' />
    </svg>
  )
}

function BellIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9' />
      <path d='M10.3 21a1.94 1.94 0 0 0 3.4 0' />
    </svg>
  )
}

function CreditCardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <rect width='20' height='14' x='2' y='5' rx='2' />
      <line x1='2' x2='22' y1='10' y2='10' />
    </svg>
  )
}

export default function Component({ children }: { children: React.ReactNode }) {
  const [accountMenu, setAccountMenu] = useState(false)
  return (
    <div className='grid min-h-screen w-full lg:grid-cols-[280px_1fr]'>
      <div className='hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40'>
        <div className='flex h-full max-h-screen flex-col gap-2'>
          <div className='flex h-[60px] items-center border-b px-6'>
            <Link className='flex items-center gap-2 font-semibold' href='#'>
              <LayoutDashboardIcon className='h-6 w-6' />
              <span className=''>Tableau de bord</span>
            </Link>
          </div>
          <div className='flex-1 overflow-auto py-2'>
            <nav className='grid items-start px-4 text-sm font-medium'>
              <Link
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                href='/dashboard'
              >
                <HomeIcon className='h-4 w-4' />
                Accueil
              </Link>
              <div className='flex flex-col gap-2'>
                <Link
                  className='flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50'
                  href='/dashboard/customers'
                >
                  <TableIcon className='h-4 w-4' />
                  Clients
                </Link>
                <Link
                  className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ml-4'
                  href='/dashboard/customers/create'
                >
                  <PlusIcon className='h-4 w-4' />
                  Créer un client
                </Link>
              </div>
              <div className='flex flex-col gap-2'>
                <Link
                  className='flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50'
                  href='/dashboard/devices'
                >
                  <TableIcon className='h-4 w-4' />
                  Appareils
                </Link>
                <Link
                  className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ml-4'
                  href='/dashboard/devices/create'
                >
                  <PlusIcon className='h-4 w-4' />
                  Créer un appareil
                </Link>
              </div>
              <div className='flex flex-col gap-2'>
                <Link
                  className='flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50'
                  href='/dashboard/applications'
                >
                  <TableIcon className='h-4 w-4' />
                  Tâches
                </Link>
                <Link
                  className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ml-4'
                  href='/dashboard/applications/create'
                >
                  <PlusIcon className='h-4 w-4' />
                  Créer une tâche
                </Link>
              </div>
              <Button
                asChild
                className='mt-4 text-white bg-green-500 hover:bg-green-600'
                variant='default'
              >
                <Link href={'/dashboard/wizard'}>
                  <PlusIcon className='h-4 w-4' />
                  <span>Initier une tâche</span>
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <header className='flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40'>
          <Link className='lg:hidden' href='#'>
            <LayoutDashboardIcon className='h-6 w-6' />
            <span className='sr-only'>Accueil</span>
          </Link>
          <div className='w-full flex-1'></div>
          <div className='flex items-center gap-4'>
            <Button
              onClick={() => setAccountMenu(!accountMenu)}
              className='h-8 w-8'
              size='icon'
              variant='outline'
            >
              <UserIcon className='h-4 w-4' />
              <span className='sr-only'>Avatar de l&apos;utilisateur</span>
            </Button>
            {accountMenu && (
              <div className='relative'>
                <div className='absolute right-0 w-48 py-2 mt-2 bg-white rounded-lg shadow-xl'>
                  <Button
                    onClick={async () => {
                      await signOut()
                    }}
                    className='block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white'
                  >
                    Se déconnecter
                  </Button>
                </div>
              </div>
            )}
          </div>
        </header>
        <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
          {children}
        </main>
      </div>
    </div>
  )
}
