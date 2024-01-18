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
import Link from 'next/link'

export default function Component({ device }: any) {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <Wrapper
      title='Device Details'
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
          <div className='text-lg font-semibold '>Device Brand</div>
          <div className='text-gray-600'>{device.brand}</div>
        </div>
        <div className='grid gap-2'>
          <div className='text-lg font-semibold '>Customer Model</div>
          <div className='text-gray-600'>{device.model}</div>
        </div>
        <div className='grid gap-2'>
          <div className='text-lg font-semibold '>Customer Serial Number</div>
          <div className='text-gray-600'>{device.serialNumber}</div>
        </div>
        <div className='grid gap-2'>
          <div className='text-lg font-semibold'>Applications list</div>
          {device.applications.length}
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
          <div className='text-lg font-semibold'>Customer</div>
          <Link href={`/dashboard/customers/${device.customer.id}`}>
            {device.customer.name}
          </Link>
        </div>
      </div>
    </Wrapper>
  )
}
