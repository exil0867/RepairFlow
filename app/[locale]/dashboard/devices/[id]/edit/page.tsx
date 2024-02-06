import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Edit from './edit'

export default function EditDevice({ params }: { params: { id: string } }) {
  const fetchDevice = async () => {
    try {
      const device = await prisma.device.findUnique({
        where: { id: Number(params.id) },
        include: {
          customer: true,
          applications: true,
        },
      })
      return device
    } catch (error) {
      console.error(`Erreur de récupération de l'appareil:`, error)
      return
    }
  }

  const renderDevice = async () => {
    const device = await fetchDevice()
    console.log(device)
    if (!device) {
      redirect('/404')
    }
    return <Edit device={device} />
  }

  return <>{renderDevice()}</>
}
