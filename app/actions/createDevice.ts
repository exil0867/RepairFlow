'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const deviceSchema = z.object({
  customerId: z.string().transform((val) => Number(val)),
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
export default async function createDevice(
  prevState: any,
  data: FormData,
): Promise<formRes> {
  try {
    const customerId = data.get('customer_id')
    const serialNumber = data.get('serial_number')
    const model = data.get('model')
    const brand = data.get('brand')

    const validatedFields = deviceSchema.safeParse({
      customerId: customerId,
      serialNumber: serialNumber,
      model: model,
      brand: brand,
    })

    if (!validatedFields.success) {
      throw new Error('Invalid user input')
    }

    const response = await prisma.device.create({
      data: {
        customerId: validatedFields.data.customerId,
        serialNumber: validatedFields.data.serialNumber,
        model: validatedFields.data.model,
        brand: validatedFields.data.brand,
      },
    })

    revalidatePath('/')

    return {
      message: 'Device created',
      response: response,
      error: false,
    }
  } catch (error) {
    return {
      message: 'An error occurred while creating the device',
      error: true,
    }
  }
}
