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

export default async function createConcludedApplication(
  prevState: FormResponse,
  data: FormData,
): Promise<FormResponse> {
  try {
    const { issue, applicationId } = validateCreateDiagnosedArticle.parse(data)

    return await prisma.$transaction(async (p) => {
      let article = await p.application.findUnique({
        where: {
          id: applicationId,
        },
      })

      if (!article) throw new Error('Tâche introuvable')

      if (article.status === 'CANCELLED')
        throw new Error(`Impossible de modifier le statut d'une tâche annulée`)

      let response = await p.diagnosedApplication.create({
        include: {
          application: {
            include: {
              conclusion: true,
            },
          },
        },
        data: {
          issue,
          applicationId,
        },
      })

      if (response.application.conclusion) {
        await p.concludedApplication.delete({
          where: {
            applicationId: response.applicationId,
          },
        })
      }

      const ApplicationResponse = await p.application.update({
        where: {
          id: response.applicationId,
        },
        data: {
          status: 'REPAIRING',
        },
      })

      revalidatePath('/')

      return {
        message: 'Un diagnostic pour la tâche ajoutée',
        response: { response, ApplicationResponse },
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
      message: `Une erreur s'est produite lors de l'ajout d'un diagnostic pour la tâche`,
      error: true,
    }
  }
}
