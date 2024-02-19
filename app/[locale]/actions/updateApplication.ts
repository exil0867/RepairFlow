'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { ZodError, z } from 'zod'
import { revalidatePath } from 'next/cache'
import { FormResponse } from './type'
import { validateUpdateArticle } from '../validation'

export default async function createDevice(
  prevState: FormResponse,
  data: FormData,
): Promise<FormResponse> {
  try {
    const { id, subject, remark, deviceId, customerId, status } =
      validateUpdateArticle.parse(data)

    const response = await prisma.application.update({
      where: {
        id,
      },
      data: {
        status,
        subject,
        remark,
        deviceId,
        customerId,
      },
    })

    revalidatePath('/')

    return {
      message: 'Article mis à jour',
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
      message: `Une erreur s'est produite lors de la mise à jour de l'article`,
      error: true,
    }
  }
}
