'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { ZodError, z } from 'zod'
import { revalidatePath } from 'next/cache'
import { createApplication } from '../validation'

export type formRes = {
  message: string | null
  response?: any
  error: boolean | null
  errors?: Array<{
    path: string
    message: string
  }>
} | null

export default async function createCustomer(
  prevState: formRes | null,
  data: FormData,
): Promise<formRes> {
  try {
    const { name, address, phoneNumber } = createApplication.parse(data)

    console.log({
      name,
      address,
      phoneNumber,
    })

    const response = await prisma.customer.create({
      data: {
        name,
        address,
        phoneNumber,
      },
    })
    revalidatePath('/')
    return {
      message: 'Client créé',
      response: response,
      error: false,
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        error: true,
        message: 'Données de formulaire invalides',
        errors: error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      }
    }
    return {
      message: `Une erreur s'est produite lors de la création du client`,
      error: true,
    }
  }
}
