import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Edit from './edit'

export default function EditCustomer({ params }: { params: { id: string } }) {
  const fetchCustomer = async () => {
    try {
      const customer = await prisma.customer.findUnique({
        where: { id: Number(params.id) },
        include: {
          devices: true,
          applications: true,
        },
      })
      return customer
    } catch (error) {
      console.error('Erreur lors de la récupération du client:', error)
      return
    }
  }

  const renderCustomer = async () => {
    const customer = await fetchCustomer()
    console.log(customer)
    if (!customer) {
      redirect('/404')
    }
    return <Edit customer={customer} />
  }

  return <>{renderCustomer()}</>
}
