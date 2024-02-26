'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { ZodError, z } from 'zod'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'
import { validateCreateConcludedArticle } from '../validation'
import { FormResponse } from './type'

export default async function createConcludedApplication(
  prevState: FormResponse,
  data: FormData,
): Promise<FormResponse> {
  try {
    const { cost, changes, applicationId } =
      validateCreateConcludedArticle.parse(data)

    return await prisma.$transaction(async (p) => {
      let article = await p.application.findUnique({
        where: {
          id: applicationId,
        },
      })

      if (!article) throw new Error('Tâche introuvable')

      if (article.status === 'CANCELLED')
        throw new Error(`Impossible de modifier le statut d'une tâche annulée`)

      let response = await p.concludedApplication.create({
        include: {
          application: true,
        },
        data: {
          cost: cost,
          changes: changes,
          applicationId: applicationId,
        },
      })

      const ApplicationResponse = await p.application.update({
        where: {
          id: response.applicationId,
        },
        data: {
          status: 'REPAIRED',
        },
      })
      revalidatePath('/')

      response.cost = `${response.cost}` as any

      return {
        message: 'Une conclusion pour la tâche ajoutée',
        response: { response, ApplicationResponse },
        error: false,
      }
    })
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
      message: `Une erreur s'est produite lors de l'ajout d'une conclusion pour la tâche`,
      error: true,
    }
  }
}
