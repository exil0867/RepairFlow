'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export default async function searchCustomer(id?: number, query?: string) {
  try {
    const fetchCustomers = async () => {
      try {
        const customers = await prisma.customer.findMany({
          where: {
            id: id ? id : undefined,
            name: query ? { contains: query } : undefined,
          },
          include: {
            applications: true,
          },
        })
        return customers
      } catch (error) {
        console.error('Erreur lors de la récupération des clients:', error)
        return []
      }
    }

    const customers = await fetchCustomers()

    revalidatePath('/')

    return customers
  } catch (error) {
    return {
      message: `Une erreur s'est produite lors de la recherche du client`,
      error: true,
    }
  }
}
