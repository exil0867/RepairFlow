'use server'
import prisma from '@/lib/prisma'
import { Application } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const applicationSchema = z.object({
  id: z.number(),
  status: z.enum(['REPAIRED', 'REPAIRING', 'CANCELLED']),
})

export default async function updateApplicationStatus(
  id: number,
  status: Application['status'],
) {
  try {
    const fetchApplication = async () => {
      try {
        const validatedFields = applicationSchema.safeParse({
          id: id,
          status: status,
        })

        if (!validatedFields.success) {
          throw new Error('Entrée utilisateur invalide.')
        }
        let updatedApplication = await prisma.application.update({
          include: {
            conclusion: true,
          },
          where: {
            id: id,
          },
          data: {
            status: validatedFields.data.status,
          },
        })
        if (!updatedApplication)
          throw new Error(
            `Impossible de trouver ou de mettre à jour l'article.`,
          )
        if (
          ['CANCELLED', 'REPAIRING'].includes(validatedFields.data.status) &&
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
    return {
      message: `Une erreur s'est produite lors de la définition du statut de l'article`,
      error: true,
    }
  }
}
