'use client'
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
import { usePathname, useRouter } from 'next/navigation'
import Wrapper from '@/components/wrapper'

export default function Component({ application }: any) {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <Wrapper
      title='Application Details'
      footer={
        <>
          <Button
            onClick={() => router.push(pathname + '/edit')}
            variant='outline'
          >
            Edit
          </Button>
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
        </>
      }
    >
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
              <span className='text-gray-800 font-medium'>Phone Number:</span>{' '}
              {application.customer.phoneNumber}
            </div>
          </div>
        </div>
        <div className='grid gap-2'>
          <div className='text-lg font-semibold'>Device Details</div>
          <div className='text-gray-600'>
            <div>
              <span className='text-gray-800 font-medium'>Serial Number:</span>{' '}
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
    </Wrapper>
  )
}
