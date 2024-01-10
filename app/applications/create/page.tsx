import Image from 'next/image'
import prisma from '@/lib/prisma'
import Form from './form'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { z } from 'zod'

const schema = z.object({
  deviceId: z.string().transform((val) => Number(val)),
  customerId: z.string().transform((val) => Number(val)),
})

export type formRes = {
  message: string
  error: boolean
}

export default function CreateApplication() {
  const createApplication = async (
    prevState: any,
    data: FormData,
  ): Promise<formRes> => {
    'use server'
    console.log(data)
    try {
      const deviceId = data.get('device_id')
      const customerId = data.get('customer_id')
      console.log({
        deviceId: deviceId,
        customerId: customerId,
      })

      const validatedFields = schema.safeParse({
        deviceId: deviceId,
        customerId: customerId,
      })

      if (!validatedFields.success) {
        throw new Error('Invalid user input')
      }

      await prisma.application.create({
        data: {
          status: 'PENDING',
          subject: 'Test',
          deviceId: validatedFields.data.deviceId,
          customerId: validatedFields.data.customerId,
        },
      })

      return {
        message: 'Application created',
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

  return <Form createApplication={createApplication} />
}
