import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Details from './details'

export default function DisplayApplication({
  params,
}: {
  params: { id: string }
}) {
  const fetchApplication = async () => {
    try {
      const application = await prisma.application.findUnique({
        where: { id: Number(params.id) },
        include: {
          device: true,
          customer: true,
          conclusion: true,
        },
      })
      return application
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'article:`, error)
      return
    }
  }

  const renderApplication = async () => {
    let application = await fetchApplication()
    if (!application) {
      redirect('/404')
    }

    if (application.conclusion) {
      application.conclusion.cost = `${application.conclusion.cost}` as any
    }

    return <Details application={application} />
  }

  return <>{renderApplication()}</>
}
