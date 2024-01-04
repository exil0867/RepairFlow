'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const applicationSchema = z.object({
  subject: z.string(),
  notes: z.string(),
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
    const deviceId = data.get('device_id')
    const customerId = data.get('customer_id')
    const subject = data.get('subject')
    const notes = data.get('notes')
    const validatedFields = applicationSchema.safeParse({
      subject: subject,
      notes: notes,
      deviceId: deviceId,
      customerId: customerId,
    })

    if (!validatedFields.success) {
      throw new Error('Invalid user input')
    }

    const response = await prisma.application.create({
      data: {
        status: 'PENDING',
        subject: validatedFields.data.subject,
        notes: validatedFields.data.notes,
        deviceId: validatedFields.data.deviceId,
        customerId: validatedFields.data.customerId,
      },
    })

    revalidatePath('/')

    return {
      message: 'Application created',
      response: response,
      error: false,
    }
  } catch (error) {
    console.log(error)
    return {
      message: 'An error occurred while creating the application',
      error: true,
    }
  }
}
