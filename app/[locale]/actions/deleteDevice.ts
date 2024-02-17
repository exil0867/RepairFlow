'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export default async function deleteDevice(id: number) {
  try {
    return await prisma.$transaction(async (p) => {
      const deleteDevice = await p.device.delete({
        where: {
          id,
        },
      })
      revalidatePath('/')

      return {
        message: 'Appareil supprimé',
        response: deleteDevice,
        error: false,
      }
    })
  } catch (error) {
    console.log(error)
    return {
      message: `Une erreur s’est produite lors de la suppression de l’appareil.`,
      error: true,
    }
  }
}
