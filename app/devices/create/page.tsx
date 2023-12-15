import Image from 'next/image'
import prisma from '@/lib/prisma'
import Form from './form'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { z } from 'zod'

const schema = z.object({
  serialNumber: z.string(),
  model: z.string(),
  brand: z.string(),
})

export type formRes = {
  message: string
  error: boolean
}

export default function CreateDevice() {
  const createDevice = async (
    prevState: any,
    data: FormData,
  ): Promise<formRes> => {
    'use server'
    try {
      const serialNumber = data.get('serial_number')
      const model = data.get('model')
      const brand = data.get('brand')

      const validatedFields = schema.safeParse({
        serialNumber: serialNumber,
        model: model,
        brand: brand,
      })

      if (!validatedFields.success) {
        throw new Error('Invalid user input')
      }

      await prisma.device.create({
        data: {
          serialNumber: validatedFields.data.serialNumber,
          model: validatedFields.data.model,
          brand: validatedFields.data.brand,
        },
      })

      return {
        message: 'Device created',
        error: false,
      }
    } catch (error) {
      return {
        message: 'An error occurred while creating the device',
        error: true,
      }
    }
  }

  return <Form createDevice={createDevice} />
}
