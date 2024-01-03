import Image from 'next/image'
import prisma from '@/lib/prisma'
import Form from './form'
import { hash } from 'bcrypt'
import Link from 'next/link'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const deviceSchema = z.object({
  serialNumber: z.string(),
  model: z.string(),
  brand: z.string(),
})

const applicationSchema = z.object({
  deviceId: z.string().transform((val) => Number(val)),
  customerId: z.string().transform((val) => Number(val)),
})
export type formRes = {
  message: string
  response?: any
  error: boolean
}

export default async function CreateCustomer() {
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
  const fetchDevices = async () => {
    try {
      const devices = await prisma.device.findMany()
      return devices
    } catch (error) {
      console.error('Error fetching devices:', error)
      return []
    }
  }

  return (
    <Form customers={await fetchCustomers()} devices={await fetchDevices()} />
  )
}
