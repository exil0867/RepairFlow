'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export default async function searchCustomer(query: string) {
  try {
    const fetchCustomers = async () => {
      try {
        const customers = await prisma.customer.findMany({
          where: { name: query },
          include: {
            applications: true,
          },
        })
        return customers
      } catch (error) {
        console.error('Error fetching customers:', error)
        return []
      }
    }

    const customers = await fetchCustomers()
    console.log('dd', query, customers)

    revalidatePath('/')

    return customers
  } catch (error) {
    return {
      message: 'An error occurred while creating the device',
      error: true,
    }
  }
}
