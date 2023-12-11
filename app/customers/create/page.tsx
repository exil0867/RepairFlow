import Image from 'next/image'
import prisma from '@/lib/prisma'
import Form from './form'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { z } from 'zod'

const schema = z.object({
  name: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
})

export type formRes = {
  message: string
  error: boolean
}

export default function CreateCustomer() {
  const createCustomer = async (
    prevState: any,
    data: FormData,
  ): Promise<formRes> => {
    'use server'
    const name = data.get('name')
    const address = data.get('address')
    const phoneNumber = data.get('phone_number')
    const validatedFields = schema.safeParse({
      name: name,
      address: address,
      phoneNumber: phoneNumber,
    })

    if (!validatedFields.success) {
      return { message: 'Invalid user input', error: true }
    }

    await prisma.customer.create({
      data: {
        name: validatedFields.data.name,
        address: validatedFields.data.address,
        phoneNumber: validatedFields.data.phoneNumber,
      },
    })
    return {
      message: 'Customer created',
      error: false,
    }
  }
  return <Form createCustomer={createCustomer} />
}
