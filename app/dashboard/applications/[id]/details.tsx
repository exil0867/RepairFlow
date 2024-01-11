/**
 * v0 by Vercel.
 * @see https://v0.dev/t/wV9MQ7o4nJJ
 */
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu'
import { Application } from '@prisma/client'

export default function Component({ application }: any) {
  return (
    <main className='p-6 md:p-8 lg:p-10'>
      <Card className='space-y-6'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>
            Application Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid gap-6 md:gap-8'>
            <div className='grid gap-2'>
              <div className='text-lg font-semibold '>Application Subject</div>
              <div className='text-gray-600'>{application.subject}</div>
            </div>
            <div className='grid gap-2'>
              <div className='text-lg font-semibold '>Application Notes</div>
              <div className='text-gray-600'>{application.notes}</div>
            </div>
            <div className='grid gap-2'>
              <div className='text-lg font-semibold '>Application Status</div>
              <div className='text-gray-600'>{application.status}</div>
            </div>
            <div className='grid gap-2'>
              <div className='text-lg font-semibold'>Customer Details</div>
              <div className='text-gray-600'>
                <div>
                  <span className='text-gray-800 font-medium'>Name:</span>{' '}
                  {application.customer.name}
                </div>
                <div>
                  <span className='text-gray-800 font-medium'>Address:</span>{' '}
                  {application.customer.address}
                </div>
                <div>
                  <span className='text-gray-800 font-medium'>
                    Phone Number:
                  </span>{' '}
                  {application.customer.phoneNumber}
                </div>
              </div>
            </div>
            <div className='grid gap-2'>
              <div className='text-lg font-semibold'>Device Details</div>
              <div className='text-gray-600'>
                <div>
                  <span className='text-gray-800 font-medium'>
                    Serial Number:
                  </span>{' '}
                  {application.device.serialNumber}
                </div>
                <div>
                  <span className='text-gray-800 font-medium'>Model:</span>{' '}
                  {application.device.model}
                </div>
                <div>
                  <span className='text-gray-800 font-medium'>Brand:</span>{' '}
                  {application.device.brand}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex gap-4'>
          <Button variant='outline'>Edit</Button>
          <Button variant='outline'>Delete</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline'>Mark As</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Complete</DropdownMenuItem>
              <DropdownMenuItem>Pending</DropdownMenuItem>
              <DropdownMenuItem>Cancelled</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </main>
  )
}
