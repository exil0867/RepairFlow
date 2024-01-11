import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Edit from './edit'

export default function EditApplication({
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
        },
      })
      return application
    } catch (error) {
      console.error('Error fetching application:', error)
      return
    }
  }

  const renderApplication = async () => {
    const application = await fetchApplication()
    console.log(application)
    if (!application) {
      redirect('/404')
    }
    return <Edit application={application} />
  }

  return <>{renderApplication()}</>
}
