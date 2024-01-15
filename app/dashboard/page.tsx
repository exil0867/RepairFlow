import React from 'react'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import prisma from '@/lib/prisma'
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table'
import BarChart from './bar-chart'
import Link from 'next/link'

type Props = {}

async function page({}: Props) {
  const getRecentApplications = async () => {
    try {
      return await prisma.application.findMany({
        orderBy: {
          id: 'desc',
        },
        take: 5,
        include: {
          customer: true,
          device: true,
        },
      })
    } catch (error: any) {
      throw new Error(error)
    }
  }
  const recentApplications = await getRecentApplications()
  return (
    <>
      <div className='flex items-center'>
        <h1 className='font-semibold text-lg md:text-2xl'>Dashboard</h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Line Chart</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <CurvedlineChart className='w-full aspect-[4/3]' /> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bar Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart className='w-full aspect-[4/3]' />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Device</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentApplications.length > 0 &&
                recentApplications.map(
                  ({ id, subject, status, customer, device }) => {
                    return (
                      <TableRow key={id}>
                        <TableCell className='font-medium'>{id}</TableCell>
                        <TableCell>{subject}</TableCell>
                        <TableCell>{status}</TableCell>
                        <TableCell>
                          <Link href={`/dashboard/customers/${customer.id}`}>
                            {customer.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link href={`/dashboard/devices/${device.id}`}>
                            {device.model}
                          </Link>
                        </TableCell>
                      </TableRow>
                    )
                  },
                )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}

export default page
