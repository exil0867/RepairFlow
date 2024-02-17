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
      let article = await p.application.findUnique({
        include: {
          conclusion: true,
          diagnosis: true,
        },
        where: {
          id,
        },
      })

      if (!article) throw new Error('Article introuvable')

      if (article.status === 'CANCELLED')
        throw new Error(`Impossible de modifier le statut d'un article annulé`)

      if (article.conclusion) {
        await p.concludedApplication.delete({
          where: {
            applicationId: article.id,
          },
        })
      }

      if (article.diagnosis) {
        await p.diagnosedApplication.delete({
          where: {
            applicationId: article.id,
          },
        })
      }

      const ApplicationResponse = await p.application.update({
        where: {
          id: article.id,
        },
        data: {
          status: 'DIAGNOSING',
        },
      })

      revalidatePath('/')

      return {
        message: `L'article est désormais défini comme diagnostic`,
        response: { article, ApplicationResponse },
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
      message: `Une erreur s'est produite lors de la définition de l'article comme diagnostic`,
      error: true,
    }
  }
}
