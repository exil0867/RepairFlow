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
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'
import Repaired from './repaired'
import Repairing from './repairing'
import Cancel from './cancel'
import { renderStatus } from '@/lib/utils'
import Link from 'next/link'

export default function Component({ application }: any) {
  const pathname = usePathname()
  const router = useRouter()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [openedDialog, setOpenedDialog] = useState<
    'REPAIRED' | 'REPAIRING' | 'CANCELLED' | null
  >(null)

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {openedDialog === 'REPAIRED' && (
        <Repaired
          applicationId={application.id}
          onClose={() => {
            setDialogOpen(false)
          }}
        />
      )}
      {openedDialog === 'REPAIRING' && (
        <Repairing
          applicationId={application.id}
          onClose={() => {
            setDialogOpen(false)
          }}
        />
      )}
      {openedDialog === 'CANCELLED' && (
        <Cancel
          applicationId={application.id}
          onClose={() => {
            setDialogOpen(false)
          }}
        />
      )}
      <Wrapper
        title={`Détails de l'article`}
        footer={
          <>
            <Button
              onClick={() => router.push(pathname + '/edit')}
              variant='outline'
            >
              Modifier
            </Button>
            <Button variant='outline'>Supprimer</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline'>Marquer comme</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onClick={() => {
                      setOpenedDialog('REPAIRED')
                    }}
                  >
                    Réparé
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onClick={() => {
                      setOpenedDialog('REPAIRING')
                    }}
                  >
                    Réparation
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onClick={() => {
                      setOpenedDialog('CANCELLED')
                    }}
                  >
                    Annulé
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        }
      >
        <div className='grid gap-6 md:gap-8'>
          <ViewFieldWrapper>
            <ViewField
              title={`Référence de l'article`}
              value={application.id}
            />
          </ViewFieldWrapper>
          <ViewFieldWrapper>
            <ViewField
              title={`Sujet de l'article`}
              value={application.subject}
            />
          </ViewFieldWrapper>
          <ViewFieldWrapper>
            <ViewField
              title={`Notes sur les articles`}
              value={application.notes}
            />
          </ViewFieldWrapper>
          <ViewFieldWrapper>
            <ViewField
              title={`Statut de l'article`}
              value={renderStatus(application.status)}
            />
          </ViewFieldWrapper>
          {application.conclusion && (
            <ViewFieldWrapper>
              <ViewFieldSubWrapper title='Conclusion'>
                <ViewFieldSubWrapperField
                  title='Changements:'
                  value={application.conclusion.changes}
                />
                <ViewFieldSubWrapperField
                  title='Coût:'
                  value={application.conclusion.cost}
                />
              </ViewFieldSubWrapper>
            </ViewFieldWrapper>
          )}
          <ViewFieldWrapper>
            <ViewFieldSubWrapper title='Détails du client'>
              <ViewFieldSubWrapperField
                title='Référence:'
                value={
                  <Link
                    className='underline text-blue-500'
                    href={`/dashboard/customers/${application.customer.id}`}
                  >
                    {application.device.id}
                  </Link>
                }
              />
              <ViewFieldSubWrapperField
                title='Nom:'
                value={application.customer.name}
              />
              <ViewFieldSubWrapperField
                title='Adresse:'
                value={application.customer.address}
              />
              <ViewFieldSubWrapperField
                title='Numéro de téléphone:'
                value={application.customer.phoneNumber}
              />
            </ViewFieldSubWrapper>
          </ViewFieldWrapper>
          <ViewFieldWrapper>
            <ViewFieldSubWrapper title={`Détails de l'appareil`}>
              <ViewFieldSubWrapperField
                title='Référence:'
                value={
                  <Link
                    className='underline text-blue-500'
                    href={`/dashboard/devices/${application.device.id}`}
                  >
                    {application.device.id}
                  </Link>
                }
              />
              <ViewFieldSubWrapperField
                title='Numéro de série:'
                value={application.device.serialNumber}
              />
              <ViewFieldSubWrapperField
                title='Modèle:'
                value={application.device.model}
              />
              <ViewFieldSubWrapperField
                title='Marque:'
                value={application.device.brand}
              />
            </ViewFieldSubWrapper>
          </ViewFieldWrapper>
        </div>
      </Wrapper>
    </Dialog>
  )
}
