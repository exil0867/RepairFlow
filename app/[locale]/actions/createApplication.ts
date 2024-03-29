'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { ZodError, z } from 'zod'
import { revalidatePath } from 'next/cache'
import { FormResponse } from './type'
import { validateCreateArticle } from '../validation'
import { Application } from '@prisma/client'

export default async function createDevice(
  prevState: FormResponse,
  data: FormData,
): Promise<FormResponse> {
  try {
    const { subject, remark, deviceId, customerId, status } =
      validateCreateArticle.parse(data)

    const response = await prisma.application.create({
      data: {
        subject,
        remark,
        deviceId,
        customerId,
        status: status as Application['status'],
      },
    })

    revalidatePath('/')

    return {
      message: 'Tâche créée',
      response: response,
      error: false,
    }
  } catch (error) {
    console.log(error)
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
      message: `Une erreur s'est produite lors de la création de la tâche`,
      error: true,
    }
  }
}
