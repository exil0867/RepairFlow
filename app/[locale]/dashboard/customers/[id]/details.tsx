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
import {
  ViewField,
  ViewFieldSubWrapper,
  ViewFieldSubWrapperField,
  ViewFieldWrapper,
} from '@/components/view'

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
        <ViewFieldWrapper>
          <ViewField title='Customer Name' value={customer.name} />
        </ViewFieldWrapper>
        <ViewFieldWrapper>
          <ViewField title='Customer Address' value={customer.address} />
        </ViewFieldWrapper>
        <ViewFieldWrapper>
          <ViewField
            title='Customer Phone Number'
            value={customer.phoneNumber}
          />
        </ViewFieldWrapper>
        <ViewFieldWrapper>
          <ViewField
            title='Applications list'
            value={customer.applications.length}
          />
        </ViewFieldWrapper>
        <ViewFieldWrapper>
          <ViewField title='Devices list' value={customer.devices.length} />
        </ViewFieldWrapper>
      </div>
    </Wrapper>
  )
}
