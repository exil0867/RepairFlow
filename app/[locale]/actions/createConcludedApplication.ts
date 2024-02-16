'use server'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'
import { validateCreateConcludedArticle } from '../validation'
import { FormResponse } from './type'

export default async function createConcludedApplication(
  prevState: FormResponse,
  data: FormData,
): Promise<FormResponse> {
  try {
    const { changes, cost, applicationId } =
      validateCreateConcludedArticle.parse(data)

    let response = await prisma.concludedApplication.create({
      data: {
        changes,
        cost,
        applicationId,
      },
    })

    const ApplicationResponse = await prisma.application.update({
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
      message: 'Article conclu créé',
      response: { response, ApplicationResponse },
      error: false,
    }
  } catch (error) {
    console.log(error)
    return {
      message: `Une erreur s'est produite lors de la création de l'article conclu`,
      error: true,
    }
  }
}
