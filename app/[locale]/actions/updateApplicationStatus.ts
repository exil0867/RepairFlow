'use server'
import prisma from '@/lib/prisma'
import { Application } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const applicationSchema = z.object({
  id: z.number(),
  status: z.enum(['COMPLETE', 'PENDING', 'CANCELLED']),
})

export default async function updateApplicationStatus(
  id: number,
  status: Application['status'],
) {
  try {
    const fetchApplication = async () => {
      try {
        const validatedFields = applicationSchema.safeParse({
          id: id,
          status: status,
        })

        if (!validatedFields.success) {
          throw new Error('Invalid user input')
        }
        let updatedApplication = await prisma.application.update({
          include: {
            conclusion: true,
          },
          where: {
            id: id,
          },
          data: {
            status: validatedFields.data.status,
          },
        })
        if (!updatedApplication)
          throw new Error(`Couldn't find or update the application.`)
        if (
          ['CANCELLED', 'PENDING'].includes(validatedFields.data.status) &&
          updatedApplication.conclusion
        ) {
          await prisma.concludedApplication.delete({
            where: {
              applicationId: updatedApplication.id,
            },
          })
        }
        if (updatedApplication.conclusion) {
          updatedApplication.conclusion.cost =
            `${updatedApplication.conclusion.cost}` as any
        }
        return {
          message: 'Application status was set.',
          response: updatedApplication,
          error: false,
        }
      } catch (error) {
        return {
          message: 'An error occurred while fetching the application.',
          error: true,
        }
      }
    }

    const application = await fetchApplication()

    revalidatePath('/')

    return application
  } catch (error) {
    return {
      message: 'An error occurred while setting the application status',
      error: true,
    }
  }
}
