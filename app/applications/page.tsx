import prisma from '@/lib/prisma'

export default function DisplayApplications() {
  const fetchApplications = async () => {
    try {
      const applications = await prisma.application.findMany({
        include: {
          device: true,
          customer: true,
        },
      })
      return applications
    } catch (error) {
      console.error('Error fetching applications:', error)
      return []
    }
  }

  const renderApplications = async () => {
    const applications = await fetchApplications()
    return (
      <div>
        <h2>Applications</h2>
        <ul>
          {applications.map((application) => (
            <li key={application.id}>
              <p>Application Status: {application.status}</p>
              Device ID: {application.device.id}
              Device Serial Number: {application.device.serialNumber}
              Customer ID: {application.customer.id}
              Customer Name: {application.customer.name}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return <>{renderApplications()}</>
}
