'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export default async function searchApplication(
  customerId?: number,
  deviceId?: number,
  subject?: string,
  status?: 'PENDING' | 'COMPLETE' | 'CANCELLED',
) {
  try {
    const fetchApplications = async () => {
      try {
        const applications = await prisma.application.findMany({
          where: {
            customerId: customerId ? customerId : undefined,
            deviceId: deviceId ? deviceId : undefined,
            subject: subject ? { contains: subject } : undefined,
            status: status ? status : undefined,
          },
          include: {
            device: true,
            customer: true,
          },
        })
        return applications
      } catch (error) {
        console.error('Error fetching applications:', error)
        return []
      }
    }

    const applications = await fetchApplications()

    revalidatePath('/')

    return applications
  } catch (error) {
    return {
      message: 'An error occurred while creating the application',
      error: true,
    }
  }
}
