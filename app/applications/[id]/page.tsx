import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

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
    return (
      <div>
        <h2>Application</h2>
        <ul>
          <li key={application.id}>
            <p>Application Subject: {application.subject}</p>
            {application?.notes && (
              <p>Application Notes: {application.notes}</p>
            )}
            <p>Application Status: {application.status}</p>
            <p> Device ID: {application.device.id}</p>
            <p> Device Serial Number: {application.device.serialNumber}</p>
            <p> Customer ID: {application.customer.id}</p>
            <p> Customer Name: {application.customer.name}</p>
          </li>
        </ul>
      </div>
    )
  }

  return <>{renderApplication()}</>
}
