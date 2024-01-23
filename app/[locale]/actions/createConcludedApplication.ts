'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'

const concludedApplicationSchema = z.object({
  changes: z.string(),
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
    const changes = data.get('changes')
    const cost = data.get('cost')
    const applicationId = data.get('application_id')
    const validatedFields = concludedApplicationSchema.safeParse({
      changes,
      cost,
      applicationId,
    })
    console.log({
      changes,
      cost,
      applicationId,
    })

    if (!validatedFields.success) {
      throw new Error('Invalid user input', validatedFields.error)
    }

    let response = await prisma.concludedApplication.create({
      data: {
        changes: validatedFields.data.changes,
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
      message: 'Concluded Application created',
      response: { response, ApplicationResponse },
      error: false,
    }
  } catch (error) {
    console.log(error)
    return {
      message: 'An error occurred while creating the Concluded Application',
      error: true,
    }
  }
}
