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

export default function Component({ customer }: any) {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <Wrapper
      title='Customer Details'
      footer={
        <>
          <Button
            onClick={() => router.push(pathname + '/edit')}
            variant='outline'
          >
            Edit
          </Button>
          <Button variant='outline'>Delete</Button>
        </>
      }
    >
      <div className='grid gap-6 md:gap-8'>
        <div className='grid gap-2'>
          <div className='text-lg font-semibold '>Customer Name</div>
          <div className='text-gray-600'>{customer.name}</div>
        </div>
        <div className='grid gap-2'>
          <div className='text-lg font-semibold '>Customer Address</div>
          <div className='text-gray-600'>{customer.address}</div>
        </div>
        <div className='grid gap-2'>
          <div className='text-lg font-semibold '>Customer Phone Number</div>
          <div className='text-gray-600'>{customer.phoneNumber}</div>
        </div>
        <div className='grid gap-2'>
          <div className='text-lg font-semibold'>Applications list</div>
          {customer.applications.length}
          {/* <div className='text-gray-600'>
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
          </div> */}
        </div>
        <div className='grid gap-2'>
          <div className='text-lg font-semibold'>Devices List</div>
          {customer.Device.length}
        </div>
      </div>
    </Wrapper>
  )
}
