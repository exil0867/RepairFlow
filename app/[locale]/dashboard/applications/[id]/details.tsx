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
        <ViewFieldWrapper>
          <ViewField title='Application Subject' value={application.subject} />
        </ViewFieldWrapper>
        <ViewFieldWrapper>
          <ViewField title='Application Notes' value={application.notes} />
        </ViewFieldWrapper>
        <ViewFieldWrapper>
          <ViewField title='Application Status' value={application.status} />
        </ViewFieldWrapper>
        <ViewFieldWrapper>
          <ViewFieldSubWrapper title='Customer Details'>
            <ViewFieldSubWrapperField
              title='Name:'
              value={application.customer.name}
            />
            <ViewFieldSubWrapperField
              title='Address:'
              value={application.customer.address}
            />
            <ViewFieldSubWrapperField
              title='Phone Number:'
              value={application.customer.phoneNumber}
            />
          </ViewFieldSubWrapper>
        </ViewFieldWrapper>
        <ViewFieldWrapper>
          <ViewFieldSubWrapper title='Device Details'>
            <ViewFieldSubWrapperField
              title='Serial Number:'
              value={application.device.serialNumber}
            />
            <ViewFieldSubWrapperField
              title='Model:'
              value={application.device.model}
            />
            <ViewFieldSubWrapperField
              title='Brand:'
              value={application.device.brand}
            />
          </ViewFieldSubWrapper>
        </ViewFieldWrapper>
      </div>
    </Wrapper>
  )
}
