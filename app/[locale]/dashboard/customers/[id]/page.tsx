import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Details from './details'

export default function DisplayCustomer({
  params,
}: {
  params: { id: string }
}) {
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
    return <Details customer={customer} />
  }

  return <>{renderCustomer()}</>
}
