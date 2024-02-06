'use client'

import { signOut } from 'next-auth/react'

export default function SignOut() {
  return (
    <button
      className='text-stone-400 hover:text-stone-200 transition-all'
      onClick={async () => {
        await signOut()
      }}
    >
      Déconnectez-moi!
    </button>
  )
}
