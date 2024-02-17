'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { ZodError, z } from 'zod'
import { revalidatePath } from 'next/cache'
import { validateCreateCustomer, validateUpdateCustomer } from '../validation'
import { FormResponse } from './type'

export default async function createCustomer(
  prevState: FormResponse,
  data: FormData,
): Promise<FormResponse> {
  try {
    const { name, address, phoneNumber, taxId } =
      validateCreateCustomer.parse(data)

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
        taxId,
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
