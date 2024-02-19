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
import deleteDevice from '@/app/actions/deleteDevice'
import Delete from './delete'
import { useState } from 'react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

export default function Component({ device }: any) {
  const pathname = usePathname()
  const router = useRouter()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [openedDeleteDialog, setOpenedDeleteDialog] = useState<boolean>(false)
  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {openedDeleteDialog && (
          <Delete
            id={device.id}
            onClose={() => {
              setDialogOpen(false)
              setOpenedDeleteDialog(false)
            }}
          />
        )}

        <Wrapper
          title={`Détails de l'appareil`}
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
              <ViewField title={`Référence de l'appareil`} value={device.id} />
            </ViewFieldWrapper>
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
                title={`Remarque sur l'appareil`}
                value={device.remark}
              />
            </ViewFieldWrapper>
            <ViewFieldWrapper>
              <ViewField
                title='Liste des articles'
                value={
                  <Link
                    className='underline text-blue-500'
                    href={`/dashboard/applications?customerId=${device.id}&customerIdLabel=${device.model}`}
                  >
                    {device.applications.length}
                  </Link>
                }
              />
            </ViewFieldWrapper>
            <ViewFieldWrapper>
              <ViewField
                title='Client'
                value={
                  <Link
                    className='underline text-blue-500'
                    href={`/dashboard/customers/${device.customer.id}`}
                  >
                    {device.customer.name}
                  </Link>
                }
              />
            </ViewFieldWrapper>
          </div>
        </Wrapper>
      </Dialog>
    </>
  )
}
