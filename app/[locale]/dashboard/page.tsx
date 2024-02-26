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
      DIAGNOSING: 0,
    }

    applications.forEach((application) => {
      statusCounts[application.status] += 1
    })

    // Format data for pie chart
    const pieChartData = Object.entries(statusCounts).map(
      ([status, count]) => ({
        id: renderStatus(status as Status),
        value: count,
      }),
    )

    return pieChartData
  }
  async function getApplicationsCreatedPerMonth() {
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
        createdAt: true,
      },
    })

    // Initialize an array to store monthly counts
    const monthlyCounts = Array.from({ length: 12 }, () => 0)

    // Count applications created each month
    applications.forEach((application) => {
      const month = application.createdAt.getMonth()
      monthlyCounts[month] += 1
    })

    // Format data for line chart
    const lineChartData = monthlyCounts.map((count, index) => ({
      name: new Date(0, index).toLocaleString('default', { month: 'short' }), // Convert month index to month name
      count,
    }))

    return lineChartData
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
  const applicationStatusCountsLine = await getApplicationsCreatedPerMonth()
  return (
    <>
      <div className='flex items-center'>
        <h1 className='font-semibold text-lg md:text-2xl'>Tableau de bord</h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Tâches par mois</CardTitle>
            <CardDescription>
              Un graphique linéaire montrant le nombre de tâches créées par mois
              au cours de l&apos;année écoulée.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={applicationStatusCountsLine}
              className='w-full aspect-[2/1]'
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Statut des tâches en pourcentage</CardTitle>
            <CardDescription>
              Un diagramme circulaire montrant le nombre de tâches par statut
              créé au cours de l&apos;année écoulée.
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
          <CardTitle>Tâches récentes</CardTitle>
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
                        <TableCell className='font-medium'>
                          <Link
                            className='underline text-blue-500'
                            href={`/dashboard/applications/${id}`}
                          >
                            {id}
                          </Link>
                        </TableCell>
                        <TableCell>{subject}</TableCell>
                        <TableCell>{renderStatus(status)}</TableCell>
                        <TableCell>
                          <Link
                            className='underline text-blue-500'
                            href={`/dashboard/customers/${customer.id}`}
                          >
                            {customer.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link
                            className='underline text-blue-500'
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
