'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import { ResponsiveLine } from '@nivo/line'
import { ResponsiveBar } from '@nivo/bar'
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table'

function BarChart(props) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          {
            name: 'A',
            data: 111,
          },
          {
            name: 'B',
            data: 157,
          },
          {
            name: 'C',
            data: 129,
          },
          {
            name: 'D',
            data: 187,
          },
          {
            name: 'E',
            data: 119,
          },
          {
            name: 'F',
            data: 22,
          },
          {
            name: 'G',
            data: 101,
          },
          {
            name: 'H',
            data: 83,
          },
        ]}
        keys={['data']}
        indexBy='name'
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'paired' }}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Name',
          legendPosition: 'middle',
          legendOffset: 45,
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Number',
          legendPosition: 'middle',
          legendOffset: -45,
          truncateTickAt: 0,
        }}
        theme={{
          tooltip: {
            container: {
              fontSize: '12px',
            },
          },
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        role='application'
        ariaLabel='A bar chart showing data'
      />
    </div>
  )
}

function CurvedlineChart(props) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: 'B',
            data: [
              { x: '2018-01-01', y: 7 },
              { x: '2018-01-02', y: 5 },
              { x: '2018-01-03', y: 11 },
              { x: '2018-01-04', y: 9 },
              { x: '2018-01-05', y: 12 },
              { x: '2018-01-06', y: 16 },
              { x: '2018-01-07', y: 13 },
              { x: '2018-01-08', y: 13 },
            ],
          },
          {
            id: 'A',
            data: [
              { x: '2018-01-01', y: 9 },
              { x: '2018-01-02', y: 8 },
              { x: '2018-01-03', y: 13 },
              { x: '2018-01-04', y: 6 },
              { x: '2018-01-05', y: 8 },
              { x: '2018-01-06', y: 14 },
              { x: '2018-01-07', y: 11 },
              { x: '2018-01-08', y: 12 },
            ],
          },
        ]}
        enableCrosshair={false}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{
          type: 'time',
          format: '%Y-%m-%d',
          useUTC: false,
          precision: 'day',
        }}
        xFormat='time:%Y-%m-%d'
        yScale={{
          type: 'linear',
          min: 0,
          max: 'auto',
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'X',
          legendOffset: 45,
          legendPosition: 'middle',
          format: '%b %d',
          tickValues: 'every 1 day',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Y',
          legendOffset: -45,
          legendPosition: 'middle',
        }}
        colors={{ scheme: 'paired' }}
        pointSize={5}
        pointColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        pointBorderWidth={2}
        pointBorderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        pointLabelYOffset={-12}
        useMesh={true}
        curve='monotoneX'
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            symbolSize: 14,
            symbolShape: 'circle',
          },
        ]}
        theme={{
          tooltip: {
            container: {
              fontSize: '12px',
            },
          },
        }}
        role='application'
      />
    </div>
  )
}

type Props = {}

function page({}: Props) {
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
            <CurvedlineChart className='w-full aspect-[4/3]' />
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
          <CardTitle>Data Table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className='font-medium'>1</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Admin</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-medium'>2</TableCell>
                <TableCell>Jane Doe</TableCell>
                <TableCell>Inactive</TableCell>
                <TableCell>User</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-gray-500 dark:text-gray-400'>
              No new notifications.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Important Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-gray-500 dark:text-gray-400'>
              Metrics will be displayed here.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default page
