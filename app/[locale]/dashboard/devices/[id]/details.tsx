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
import {
  ViewField,
  ViewFieldSubWrapper,
  ViewFieldSubWrapperField,
  ViewFieldWrapper,
} from '@/components/view'

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
        <ViewFieldWrapper>
          <ViewField title='Device Brand' value={device.brand} />
        </ViewFieldWrapper>
        <ViewFieldWrapper>
          <ViewField title='Device Model' value={device.model} />
        </ViewFieldWrapper>
        <ViewFieldWrapper>
          <ViewField title='Device Serial Number' value={device.serialNumber} />
        </ViewFieldWrapper>
        <ViewFieldWrapper>
          <ViewField
            title='Applications list'
            value={device.applications.length}
          />
        </ViewFieldWrapper>
        <ViewFieldWrapper>
          <ViewField
            title='Customer'
            value={
              <Link href={`/dashboard/customers/${device.customer.id}`}>
                {device.customer.name}
              </Link>
            }
          />
        </ViewFieldWrapper>
      </div>
    </Wrapper>
  )
}
