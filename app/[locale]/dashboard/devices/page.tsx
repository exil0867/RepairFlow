import prisma from '@/lib/prisma'
import List from './list'

export default function DisplayDevices() {
  const fetchDevices = async () => {
    try {
      const devices = await prisma.device.findMany({
        include: {
          applications: true,
          customer: true,
        },
      })
      return devices
    } catch (error) {
      console.error('Erreur lors de la récupération des appareils:', error)
      return []
    }
  }

  const renderDevices = async () => {
    const customers = await fetchDevices()
    return <List />
  }

  return <>{renderDevices()}</>
}
