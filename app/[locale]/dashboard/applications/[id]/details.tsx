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
import { formatDate, renderStatus } from '@/lib/utils'
import Link from 'next/link'
import deleteApplication from '@/app/actions/deleteApplication'
import Delete from './delete'
import Diagnosing from './diagnosing'
import Phases from './phases'

export default function Component({ application }: any) {
  const pathname = usePathname()
  const router = useRouter()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [openedStatusDialog, setOpenedStatusDialog] = useState<
    'DIAGNOSING' | 'REPAIRED' | 'REPAIRING' | 'CANCELLED' | null
  >(null)
  const [openedDeleteDialog, setOpenedDeleteDialog] = useState<boolean>(false)

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {openedStatusDialog === 'DIAGNOSING' && (
        <Diagnosing
          applicationId={application.id}
          onClose={() => {
            setDialogOpen(false)
            setOpenedStatusDialog(null)
          }}
        />
      )}
      {openedStatusDialog === 'REPAIRED' && (
        <Repaired
          applicationId={application.id}
          onClose={() => {
            setDialogOpen(false)
            setOpenedStatusDialog(null)
          }}
        />
      )}
      {openedStatusDialog === 'REPAIRING' && (
        <Repairing
          applicationId={application.id}
          onClose={() => {
            setDialogOpen(false)
            setOpenedStatusDialog(null)
          }}
        />
      )}
      {openedStatusDialog === 'CANCELLED' && (
        <Cancel
          applicationId={application.id}
          onClose={() => {
            setDialogOpen(false)
            setOpenedStatusDialog(null)
          }}
        />
      )}
      {openedDeleteDialog && (
        <Delete
          id={application.id}
          onClose={() => {
            setDialogOpen(false)
            setOpenedDeleteDialog(false)
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
            <DialogTrigger asChild>
              <Button
                variant='outline'
                onClick={() => {
                  setOpenedDeleteDialog(true)
                  setOpenedStatusDialog(null)
                }}
              >
                Supprimer
              </Button>
            </DialogTrigger>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline'>Marquer comme</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onClick={() => {
                      setOpenedStatusDialog('DIAGNOSING')
                      setOpenedDeleteDialog(false)
                    }}
                  >
                    Diagnostic
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onClick={() => {
                      setOpenedStatusDialog('REPAIRED')
                      setOpenedDeleteDialog(false)
                    }}
                  >
                    Réparé
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onClick={() => {
                      setOpenedStatusDialog('REPAIRING')
                      setOpenedDeleteDialog(false)
                    }}
                  >
                    Réparation
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onClick={() => {
                      setOpenedStatusDialog('CANCELLED')
                      setOpenedDeleteDialog(false)
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
          <Phases application={application} />
          <ViewFieldWrapper>
            <ViewField title={`Référence`} value={application.id} />
          </ViewFieldWrapper>
          <ViewFieldWrapper>
            <ViewField title={`Sujet`} value={application.subject} />
          </ViewFieldWrapper>
          <ViewFieldWrapper>
            <ViewField title={`Remarque`} value={application.remark} />
          </ViewFieldWrapper>
          <ViewFieldWrapper>
            <ViewField
              title={`Statut`}
              value={renderStatus(application.status)}
            />
          </ViewFieldWrapper>
          <ViewFieldWrapper>
            <ViewField
              dehydrateValue
              title='Date de création'
              value={formatDate(application.createdAt)}
            />
          </ViewFieldWrapper>
          <ViewFieldWrapper>
            <ViewField
              dehydrateValue
              title='Date de mise à jour'
              value={formatDate(application.updatedAt)}
            />
          </ViewFieldWrapper>
          {application.diagnosis && (
            <ViewFieldWrapper>
              <ViewFieldSubWrapper title='Diagnostic'>
                <ViewFieldSubWrapperField
                  title='Problème'
                  value={application.diagnosis.issue}
                />
              </ViewFieldSubWrapper>
            </ViewFieldWrapper>
          )}
          {application.conclusion && (
            <ViewFieldWrapper>
              <ViewFieldSubWrapper title='Conclusion'>
                <ViewFieldSubWrapperField
                  title='Coût'
                  value={application.conclusion.cost}
                />
              </ViewFieldSubWrapper>
            </ViewFieldWrapper>
          )}
          <ViewFieldWrapper>
            <ViewFieldSubWrapper title='Client'>
              <ViewFieldSubWrapperField
                title='Référence'
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
                title='Nom'
                value={application.customer.name}
              />
              <ViewFieldSubWrapperField
                title='Adresse'
                value={application.customer.address}
              />
              <ViewFieldSubWrapperField
                title='Matricule fiscal'
                value={application.customer.taxId}
              />
              <ViewFieldSubWrapperField
                title='Numéro de téléphone'
                value={application.customer.phoneNumber}
              />
            </ViewFieldSubWrapper>
          </ViewFieldWrapper>
          <ViewFieldWrapper>
            <ViewFieldSubWrapper title={`Appareil`}>
              <ViewFieldSubWrapperField
                title='Référence'
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
                title='Numéro de série'
                value={application.device.serialNumber}
              />
              <ViewFieldSubWrapperField
                title='Modèle'
                value={application.device.model}
              />
              <ViewFieldSubWrapperField
                title='Marque'
                value={application.device.brand}
              />
              <ViewFieldSubWrapperField
                title={`Remarque`}
                value={application.device.remark}
              />
            </ViewFieldSubWrapper>
          </ViewFieldWrapper>
        </div>
      </Wrapper>
    </Dialog>
  )
}
