'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export default async function deleteArticle(id: number) {
  try {
    const response = await prisma.application.delete({
      where: {
        id,
      },
    })

    revalidatePath('/')

    return {
      message: 'Article supprimé',
      response: response,
      error: false,
    }
  } catch (error) {
    console.log(error)
    return {
      message: `Une erreur s'est produite lors de la suppression de l'article.`,
      error: true,
    }
  }
}
