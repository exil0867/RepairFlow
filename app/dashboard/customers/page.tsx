import prisma from '@/lib/prisma'
import List from './list'

export default function DisplayCustomers() {
  const fetchCustomers = async () => {
    try {
      const customers = await prisma.customer.findMany({
        include: {
          applications: true,
        },
      })
      return customers
    } catch (error) {
      console.error('Error fetching customers:', error)
      return []
    }
  }

  const renderCustomers = async () => {
    const customers = await fetchCustomers()
    return <List />
  }

  return <>{renderCustomers()}</>
}
