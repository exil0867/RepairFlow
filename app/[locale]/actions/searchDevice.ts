'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export default async function searchDevice(
  id?: string,
  model?: string,
  brand?: string,
  serialNumber?: string,
  customerId?: string,
) {
  try {
    const fetchDevices = async () => {
      try {
        const devices = await prisma.device.findMany({
          include: {
            customer: true,
          },
          where: {
            id: id ? Number(id) : undefined,
            model: model ? { contains: model, mode: 'insensitive' } : undefined,
            brand: brand ? { contains: brand, mode: 'insensitive' } : undefined,
            serialNumber: serialNumber
              ? { contains: serialNumber, mode: 'insensitive' }
              : undefined,
            customerId: customerId ? Number(customerId) : undefined,
          },
        })
        return devices
      } catch (error) {
        console.error('Erreur lors de la récupération des appareils:', error)
        return []
      }
    }

    const devices = await fetchDevices()

    revalidatePath('/')

    return devices
  } catch (error) {
    return {
      message: `Une erreur s'est produite lors de la recherche de l'appareil`,
      error: true,
    }
  }
}
