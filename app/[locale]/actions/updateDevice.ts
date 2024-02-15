'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { ZodError, z } from 'zod'
import { revalidatePath } from 'next/cache'
import { FormResponse } from './type'
import { validateUpdateDevice } from '../validation'

export default async function updateDevice(
  prevState: FormResponse,
  data: FormData,
): Promise<FormResponse> {
  try {
    const { customerId, serialNumber, model, brand, id } =
      validateUpdateDevice.parse(data)

    const response = await prisma.device.update({
      where: {
        id,
      },
      data: {
        model,
        brand,
        serialNumber,
        customerId,
      },
    })

    revalidatePath('/')

    return {
      message: 'Appareil mis à jour',
      response: response,
      error: false,
    }
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.errors[0])
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
      message: `Une erreur s'est produite lors de la mise à jour de l'appareil`,
      error: true,
    }
  }
}
