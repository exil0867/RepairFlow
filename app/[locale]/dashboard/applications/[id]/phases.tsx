'use client'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import Cancel from './cancel'
import { Delete } from 'lucide-react'
import Repairing from './repairing'
import Repaired from './repaired'
import Diagnosing from './diagnosing'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { statusToIndex } from '@/lib/utils'

// Step component
const Step = ({ stepNumber, title, active }: any) => (
  <div
    className={`flex flex-col items-center ${
      active ? 'text-blue-600' : 'text-gray-500'
    }`}
  >
    <div
      className={`flex items-center justify-center w-8 h-8 rounded-full border-2 border-blue-600 ${
        active ? 'bg-blue-600' : 'bg-white'
      }`}
    >
      <span
        className={`text-sm font-bold ${
          active ? 'text-white' : 'text-blue-600'
        }`}
      >
        {stepNumber}
      </span>
    </div>
    <span
      className={`text-xs mt-1 ${active ? 'font-semibold' : 'font-normal'}`}
    >
      {title}
    </span>
  </div>
)

export default function Component({ application }: any) {
  const currentStep = statusToIndex(application.status)
  const isCancelled = application.status === 'CANCELLED'

  // Function to handle advancing to the next step
  const nextStep = () => {
    if (currentStep < 3 && !isCancelled) {
      if (currentStep === 1) {
        setOpenedStatusDialog('REPAIRING')
      }
      if (currentStep === 2) {
        setOpenedStatusDialog('REPAIRED')
      }
      if (currentStep === 3) {
        setOpenedStatusDialog('REPAIRED')
      }
    }
  }

  // Get Send gift text based on current step
  const getSendGiftText = () => {
    switch (currentStep) {
      case 1:
        return {
          title: `L'appareil est en cours de diagnostic`,
          description: `L'appareil est actuellement en cours de diagnostic. Une fois le diagnostic effectué, veuillez passer à l’étape suivante.`,
          button: `Prêt à réparer`,
        }
      case 2:
        return {
          title: `L'appareil est en réparation`,
          description: `L'appareil est actuellement en réparation après diagnostic. Veuillez passer à l'étape finale une fois la réparation terminée.`,
          button: `Prêt à être réparé`,
        }
      case 3:
        return {
          title: `L'appareil a été réparé`,
          description: `L'appareil a été réparé, veuillez contacter le client pour le récupérer et payer les frais.`,
        }
      case 0:
        return {
          title: `Le processus a été annulé`,
          description: `Le processus a été annulé. Cet article sera archivé.`,
        }
    }
  }

  const content = getSendGiftText()

  const router = useRouter()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [openedStatusDialog, setOpenedStatusDialog] = useState<
    'DIAGNOSING' | 'REPAIRED' | 'REPAIRING' | 'CANCELLED' | null
  >(application.status)

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

      <div className='bg-gray-100 p-10'>
        {!isCancelled && (
          <div className='flex justify-between items-center mb-6'>
            <div className='flex space-x-4'>
              {[1, 2, 3].map((stepNumber) => (
                <Step
                  key={stepNumber}
                  stepNumber={stepNumber}
                  title={['Diagnostic', 'Réparation', 'Réparé'][stepNumber - 1]}
                  active={stepNumber === currentStep && !isCancelled}
                />
              ))}
            </div>
            <div className='flex'>
              {currentStep !== 3 && !isCancelled && (
                <DialogTrigger asChild>
                  <Button
                    className={`bg-blue-600 text-white py-2 px-4 rounded-lg `}
                    variant='outline'
                    disabled={isCancelled}
                    onClick={() => {
                      nextStep()
                    }}
                  >
                    {content?.button}
                  </Button>
                </DialogTrigger>
              )}

              <button
                className={`bg-blue-600 text-white py-2 px-4 rounded-lg ${
                  currentStep === 3 || isCancelled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-blue-700'
                }`}
                onClick={() => {
                  setOpenedStatusDialog('REPAIRED')
                }}
                disabled={currentStep === 3 || isCancelled} // Disable button on last step or if cancelled
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div className='max-w-2xl bg-white rounded-lg p-6 shadow'>
          <h2 className='text-xl font-semibold mb-4'>{content?.title}</h2>
          <p className='text-sm text-gray-700'>{content?.description}</p>
        </div>
      </div>
    </Dialog>
  )
}
