'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export default async function searchDevice(
  model?: string,
  brand?: string,
  serialNumber?: string,
  customerId?: number,
) {
  try {
    const fetchDevices = async () => {
      try {
        const devices = await prisma.device.findMany({
          include: {
            customer: true,
          },
          where: {
            model: model ? { contains: model } : undefined,
            brand: brand ? { contains: brand } : undefined,
            serialNumber: serialNumber ? { contains: serialNumber } : undefined,
            customerId,
          },
        })
        return devices
      } catch (error) {
        console.error('Error fetching devices:', error)
        return []
      }
    }

    const devices = await fetchDevices()

    revalidatePath('/')

    return devices
  } catch (error) {
    return {
      message: 'An error occurred while creating the device',
      error: true,
    }
  }
}