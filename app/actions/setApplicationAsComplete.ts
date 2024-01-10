'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export default async function setApplicationAsComplete(id: number) {
  try {
    const fetchApplication = async () => {
      try {
        const application = await prisma.application.findMany({
          where: {
            id: id,
          },
        })
        await prisma.application.update({
          where: {
            id: application[0].id,
          },
          data: {
            status: 'COMPLETE',
          },
        })
      } catch (error) {
        console.error('Error fetching application:', error)
        return []
      }
    }

    const devices = await fetchApplication()

    revalidatePath('/')

    return devices
  } catch (error) {
    return {
      message: 'An error occurred while setting the application as complete',
      error: true,
    }
  }
}
