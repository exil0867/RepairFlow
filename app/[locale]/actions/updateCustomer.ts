'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { ZodError, z } from 'zod'
import { revalidatePath } from 'next/cache'
import { FormResponse } from './type'
import { validateUpdateCustomer } from '../validation'

export default async function updateCustomer(
  prevState: FormResponse,
  data: FormData,
): Promise<FormResponse> {
  try {
    const { id, name, address, phoneNumber } =
      validateUpdateCustomer.parse(data)
    const response = await prisma.customer.update({
      where: {
        id,
      },
      data: {
        name,
        address,
        phoneNumber,
      },
    })

    revalidatePath('/')

    return {
      message: 'Client mis à jour',
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
      message: `Une erreur s'est produite lors de la mise à jour du client`,
      error: true,
    }
  }
}
