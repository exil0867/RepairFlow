'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'

const concludedApplicationSchema = z.object({
  issue: z.string(),
  applicationId: z.string().transform((val) => Number(val)),
})
export type formRes = {
  message: string
  response?: any
  error: boolean
}

export default async function createConcludedApplication(
  prevState: any,
  data: FormData,
): Promise<formRes> {
  try {
    const issue = data.get('issue')
    const applicationId = data.get('application_id')
    const validatedFields = concludedApplicationSchema.safeParse({
      issue,
      applicationId,
    })
    console.log({
      issue,
      applicationId,
    })

    if (!validatedFields.success) {
      throw new Error('Entrée utilisateur invalide.', validatedFields.error)
    }

    let response = await prisma.diagnosedApplication.create({
      data: {
        issue: validatedFields.data.issue,
        applicationId: validatedFields.data.applicationId,
      },
    })

    const ApplicationResponse = await prisma.application.update({
      where: {
        id: response.applicationId,
      },
      data: {
        status: 'PENDING',
      },
    })

    revalidatePath('/')

    return {
      message: 'Article diagnostiqué créé',
      response: { response, ApplicationResponse },
      error: false,
    }
  } catch (error) {
    console.log(error)
    return {
      message: `Une erreur s'est produite lors de la création de l'article diagnostiqué`,
      error: true,
    }
  }
}
