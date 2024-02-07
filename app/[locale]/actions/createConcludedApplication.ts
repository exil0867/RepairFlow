'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'

const concludedApplicationSchema = z.object({
  cost: z.string().transform((val) => new Prisma.Decimal(val)),
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
    const cost = data.get('cost')
    const applicationId = data.get('application_id')
    const validatedFields = concludedApplicationSchema.safeParse({
      cost,
      applicationId,
    })
    console.log({
      cost,
      applicationId,
    })

    if (!validatedFields.success) {
      throw new Error('Entrée utilisateur invalide.', validatedFields.error)
    }

    let response = await prisma.concludedApplication.create({
      data: {
        cost: validatedFields.data.cost,
        applicationId: validatedFields.data.applicationId,
      },
    })

    const ApplicationResponse = await prisma.application.update({
      where: {
        id: response.applicationId,
      },
      data: {
        status: 'COMPLETE',
      },
    })

    revalidatePath('/')

    response.cost = `${response.cost}` as any

    return {
      message: 'Article conclu créé',
      response: { response, ApplicationResponse },
      error: false,
    }
  } catch (error) {
    console.log(error)
    return {
      message: `Une erreur s'est produite lors de la création de l'article conclu`,
      error: true,
    }
  }
}
