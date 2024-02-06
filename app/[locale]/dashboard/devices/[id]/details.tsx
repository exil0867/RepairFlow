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
            Modifier
          </Button>
          <Button variant='outline'>Supprimer</Button>
        </>
      }
    >
      <div className='grid gap-6 md:gap-8'>
        <ViewFieldWrapper>
          <ViewField title={`Marque de l'appareil`} value={device.brand} />
        </ViewFieldWrapper>
        <ViewFieldWrapper>
          <ViewField title={`Modèle d'appareil`} value={device.model} />
        </ViewFieldWrapper>
        <ViewFieldWrapper>
          <ViewField
            title={`Numéro de série de l'appareil`}
            value={device.serialNumber}
          />
        </ViewFieldWrapper>
        <ViewFieldWrapper>
          <ViewField
            title='Liste des articles'
            value={device.applications.length}
          />
        </ViewFieldWrapper>
        <ViewFieldWrapper>
          <ViewField
            title='Client'
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
