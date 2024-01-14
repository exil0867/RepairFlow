import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Details from './details'

export default function DisplayDevice({ params }: { params: { id: string } }) {
  const fetchDevice = async () => {
    try {
      const device = await prisma.device.findUnique({
        where: { id: Number(params.id) },
        include: {
          applications: true,
          customer: true,
        },
      })
      return device
    } catch (error) {
      console.error('Error fetching device:', error)
      return
    }
  }

  const renderDevice = async () => {
    const device = await fetchDevice()
    if (!device) {
      redirect('/404')
    }
    return <Details device={device} />
  }

  return <>{renderDevice()}</>
}
