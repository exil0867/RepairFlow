'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const deviceSchema = z.object({
  id: z.string().transform((val) => Number(val)),
  model: z.string(),
  brand: z.string(),
  serialNumber: z.string(),
  customerId: z.string().transform((val) => Number(val)),
})
export type formRes = {
  message: string
  response?: any
  error: boolean
}

export default async function updateDevice(
  prevState: any,
  data: FormData,
): Promise<formRes> {
  try {
    const id = data.get('id')
    const model = data.get('model')
    const brand = data.get('brand')
    const serialNumber = data.get('serial_number')
    const customerId = data.get('customer_id')

    const validatedFields = deviceSchema.safeParse({
      id,
      model,
      brand,
      serialNumber,
      customerId,
    })
    if (!validatedFields.success) {
      throw new Error('Entrée utilisateur invalide.')
    }

    const response = await prisma.device.update({
      where: {
        id: validatedFields.data.id,
      },
      data: {
        model: validatedFields.data.model,
        brand: validatedFields.data.brand,
        serialNumber: validatedFields.data.serialNumber,
        customerId: validatedFields.data.customerId,
      },
    })

    revalidatePath('/')

    return {
      message: 'Appareil mis à jour',
      response: response,
      error: false,
    }
  } catch (error) {
    console.log(error)
    return {
      message: `Une erreur s'est produite lors de la mise à jour de l'appareil`,
      error: true,
    }
  }
}
