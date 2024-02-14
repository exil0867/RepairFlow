import React from 'react'
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardDescription,
} from '@/components/ui/card'
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
import LineChart from './line-chart'
import Link from 'next/link'
import { renderStatus } from '@/lib/utils'
import { Status } from '@prisma/client'

type Props = {}

async function page({}: Props) {
  async function getApplicationStatusCounts() {
    const today = new Date()
    const lastYear = new Date(today)
    lastYear.setFullYear(lastYear.getFullYear() - 1)

    const applications = await prisma.application.findMany({
      where: {
        // Filter applications from the last year
        createdAt: {
          gte: lastYear,
          lte: today,
        },
      },
      select: {
        status: true,
      },
    })

    // Count applications for each status
    const statusCounts: Record<Status, number> = {
      REPAIRED: 0,
      REPAIRING: 0,
      CANCELLED: 0,
    }

    applications.forEach((application) => {
      statusCounts[application.status] += 1
    })

    // Format data for pie chart
    const pieChartData = Object.entries(statusCounts).map(
      ([status, count]) => ({
        id: renderStatus(status),
        value: count,
      }),
    )

    return pieChartData
  }
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
  const applicationStatusCounts = await getApplicationStatusCounts()
  return (
    <>
      <div className='flex items-center'>
        <h1 className='font-semibold text-lg md:text-2xl'>Tableau de bord</h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Line Chart</CardTitle>
            <CardDescription>
              A simple linear chart displaying the number of applications
              accepted per day over the past 30 days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart className='w-full aspect-[2/1]' />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Graphique à barres</CardTitle>
            <CardDescription>
              A simple linear chart displaying the number of applications
              accepted per day over the past 30 days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={applicationStatusCounts}
              className='w-full aspect-[1/1]'
            />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Articles récents</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>ID</TableHead>
                <TableHead>Sujet</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Périphérique</TableHead>
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
                        <TableCell>{renderStatus(status)}</TableCell>
                        <TableCell>
                          <Link href={`/dashboard/customers/${customer.id}`}>
                            {customer.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link
                            className='underline'
                            href={`/dashboard/devices/${device.id}`}
                          >
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
