'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export default async function setApplicationAsComplete(id: number) {
  try {
    const fetchApplication = async () => {
      try {
        const updatedApplication = await prisma.application.update({
          where: {
            id: id,
            status: {
              not: 'COMPLETE',
            },
          },
          data: {
            status: 'COMPLETE',
          },
        })
        if (!updatedApplication)
          throw new Error(`Couldn't find or update the application.`)
        return {
          message: 'Application status was set to complete.',
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
      message: 'An error occurred while setting the application as complete',
      error: true,
    }
  }
}
