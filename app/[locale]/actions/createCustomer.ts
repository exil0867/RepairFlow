'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const deviceSchema = z.object({
  serialNumber: z.string(),
  model: z.string(),
  brand: z.string(),
})

const applicationSchema = z.object({
  deviceId: z.string().transform((val) => Number(val)),
  customerId: z.string().transform((val) => Number(val)),
})
export type formRes = {
  message: string
  response?: any
  error: boolean
}

const schema = z.object({
  name: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
})
export default async function createCustomer(
  prevState: any,
  data: FormData,
): Promise<formRes> {
  try {
    const name = data.get('name')
    const address = data.get('address')
    const phoneNumber = data.get('phone_number')

    const validatedFields = schema.safeParse({
      name: name,
      address: address,
      phoneNumber: phoneNumber,
    })

    if (!validatedFields.success) {
      throw new Error('Entrée utilisateur invalide.')
    }

    const response = await prisma.customer.create({
      data: {
        name: validatedFields.data.name,
        address: validatedFields.data.address,
        phoneNumber: validatedFields.data.phoneNumber,
      },
    })
    revalidatePath('/')
    return {
      message: 'Client créé',
      response: response,
      error: false,
    }
  } catch (error) {
    return {
      message: `Une erreur s'est produite lors de la création du client`,
      error: true,
    }
  }
}
