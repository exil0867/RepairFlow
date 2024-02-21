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
import Link from 'next/link'
import deleteCustomer from '@/app/actions/deleteCustomer'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'
import Delete from './delete'

export default function Component({ customer }: any) {
  const pathname = usePathname()
  const router = useRouter()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [openedDeleteDialog, setOpenedDeleteDialog] = useState<boolean>(false)
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {openedDeleteDialog && (
        <Delete
          id={customer.id}
          onClose={() => {
            setDialogOpen(false)
            setOpenedDeleteDialog(false)
          }}
        />
      )}
      <Wrapper
        title='Détails du client'
        footer={
          <>
            <Button
              onClick={() => router.push(pathname + '/edit')}
              variant='outline'
            >
              Modifier
            </Button>
            <DialogTrigger asChild>
              <Button
                variant='outline'
                onClick={() => {
                  setOpenedDeleteDialog(true)
                }}
              >
                Supprimer
              </Button>
            </DialogTrigger>
          </>
        }
      >
        <div className='grid gap-6 md:gap-8'>
          <ViewFieldWrapper>
            <ViewField title={`Référence`} value={customer.id} />
          </ViewFieldWrapper>
          <ViewFieldWrapper>
            <ViewField title='Nom' value={customer.name} />
          </ViewFieldWrapper>
          <ViewFieldWrapper>
            <ViewField title='Adresse' value={customer.address} />
          </ViewFieldWrapper>
          <ViewFieldWrapper>
            <ViewField
              title='Numéro de téléphone'
              value={customer.phoneNumber}
            />
          </ViewFieldWrapper>
          <ViewFieldWrapper>
            <ViewField title='Matricule fiscal' value={customer.taxId} />
          </ViewFieldWrapper>
          <ViewFieldWrapper>
            <ViewField
              title='Liste des articles'
              value={
                <Link
                  className='underline text-blue-500'
                  href={`/dashboard/applications?customerId=${customer.id}&customerIdLabel=${customer.name}`}
                >
                  {customer.applications.length}
                </Link>
              }
            />
          </ViewFieldWrapper>
          <ViewFieldWrapper>
            <ViewField
              title='Liste des appareils'
              value={
                <Link
                  className='underline text-blue-500'
                  href={`/dashboard/devices?customerId=${customer.id}&customerIdLabel=${customer.name}`}
                >
                  {customer.devices.length}
                </Link>
              }
            />
          </ViewFieldWrapper>
        </div>
      </Wrapper>
    </Dialog>
  )
}
