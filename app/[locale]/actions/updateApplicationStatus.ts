'use server'
import prisma from '@/lib/prisma'
import { Application } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { ZodError, z } from 'zod'
import { validateUpdateArticleStatus } from '../validation'

export default async function updateApplicationStatus(
  id: number,
  status: Application['status'],
) {
  try {
    const fetchApplication = async () => {
      try {
        const parsedData = validateUpdateArticleStatus.parse({ id, status })
        let updatedApplication = await prisma.application.update({
          include: {
            conclusion: true,
          },
          where: {
            id: parsedData.id,
          },
          data: {
            status: parsedData.status,
          },
        })
        if (!updatedApplication)
          throw new Error(
            `Impossible de trouver ou de mettre à jour l'article.`,
          )
        if (
          ['CANCELLED', 'REPAIRING'].includes(parsedData.status) &&
          updatedApplication.conclusion
        ) {
          await prisma.concludedApplication.delete({
            where: {
              applicationId: updatedApplication.id,
            },
          })
        }
        if (updatedApplication.conclusion) {
          updatedApplication.conclusion.cost =
            `${updatedApplication.conclusion.cost}` as any
        }
        return {
          message: `Le statut de l'article a été défini.`,
          response: updatedApplication,
          error: false,
        }
      } catch (error) {
        return {
          message: `Une erreur s'est produite lors de la récupération de l'article.`,
          error: true,
        }
      }
    }

    const application = await fetchApplication()

    revalidatePath('/')

    return application
  } catch (error) {
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
      message: `Une erreur s'est produite lors de la définition du statut de l'article`,
      error: true,
    }
  }
}
