'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export default async function deleteCustomer(id: number) {
  try {
    return prisma.$transaction(async (p) => {
      const deleteCustomer = await p.customer.delete({
        where: {
          id,
        },
      })

      revalidatePath('/')

      return {
        message: 'Client supprimé',
        response: deleteCustomer,
        error: false,
      }
    })
  } catch (error) {
    console.log(error)
    return {
      message: `Une erreur s'est produite lors de la suppression du client.`,
      error: true,
    }
  }
}
