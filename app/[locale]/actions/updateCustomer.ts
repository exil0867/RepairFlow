'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const customerSchema = z.object({
  id: z.string().transform((val) => Number(val)),
  name: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
})
export type formRes = {
  message: string
  response?: any
  error: boolean
}

export default async function updateCustomer(
  prevState: any,
  data: FormData,
): Promise<formRes> {
  try {
    const id = data.get('id')
    const name = data.get('name')
    const address = data.get('address')
    const phoneNumber = data.get('phone_number')

    const validatedFields = customerSchema.safeParse({
      id,
      name,
      address,
      phoneNumber,
    })
    if (!validatedFields.success) {
      throw new Error('Entrée utilisateur invalide.')
    }

    const response = await prisma.customer.update({
      where: {
        id: validatedFields.data.id,
      },
      data: {
        name: validatedFields.data.name,
        address: validatedFields.data.address,
        phoneNumber: validatedFields.data.phoneNumber,
      },
    })

    revalidatePath('/')

    return {
      message: 'Client mis à jour',
      response: response,
      error: false,
    }
  } catch (error) {
    console.log(error)
    return {
      message: `Une erreur s'est produite lors de la mise à jour du client`,
      error: true,
    }
  }
}
