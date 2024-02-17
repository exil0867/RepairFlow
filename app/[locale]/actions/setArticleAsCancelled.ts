'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { ZodError, z } from 'zod'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'
import { FormResponse } from './type'
import { validateCreateDiagnosedArticle } from '../validation'

export default async function setArticleAsDiagnosing(id: number) {
  try {
    return await prisma.$transaction(async (p) => {
      const ApplicationResponse = await p.application.update({
        where: {
          id: id,
        },
        data: {
          status: 'CANCELLED',
        },
      })

      revalidatePath('/')

      return {
        message: `L'article a été défini comme annulé`,
        response: { ApplicationResponse },
        error: false,
      }
    })
  } catch (error) {
    console.log(error)
    if (error instanceof ZodError) {
      return {
        error: true,
        message: 'Données de formulaire invalides',
        errors: error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      }
    }
    return {
      message: `Une erreur s'est produite lors de la définition de l'article sur annulé`,
      error: true,
    }
  }
}
