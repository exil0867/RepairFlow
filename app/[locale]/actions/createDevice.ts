'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { ZodError, z } from 'zod'
import { revalidatePath } from 'next/cache'
import { FormResponse } from './type'
import { validateCreateDevice } from '../validation'

export default async function createDevice(
  prevState: FormResponse,
  data: FormData,
): Promise<FormResponse> {
  try {
    const { customerId, serialNumber, model, brand, remark } =
      validateCreateDevice.parse(data)
    console.log(customerId)
    const response = await prisma.device.create({
      data: {
        customerId,
        serialNumber,
        model,
        brand,
        remark,
      },
    })

    revalidatePath('/')

    return {
      message: 'Appareil créé',
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
      message: `Une erreur s'est produite lors de la création de l'appareil.`,
      error: true,
    }
  }
}
