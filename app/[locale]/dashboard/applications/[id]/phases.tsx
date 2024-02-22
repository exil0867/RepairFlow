'use client'

import React, { useState } from 'react'

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

export default function Component() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isCancelled, setIsCancelled] = useState(false)

  // Function to handle advancing to the next step
  const nextStep = () => {
    if (currentStep < 3 && !isCancelled) {
      setCurrentStep(currentStep + 1)
    }
  }

  // Function to cancel the process
  const cancelProcess = () => {
    setIsCancelled(true)
  }

  // Get Send gift text based on current step
  const getSendGiftText = () => {
    switch (currentStep) {
      case 1:
        return {
          title: `L'appareil est en cours de diagnostic`,
          description: `L'appareil est actuellement en cours de diagnostic. Une fois le diagnostic effectué, veuillez passer à l’étape suivante.`,
        }
      case 2:
        return {
          title: `L'appareil est en réparation`,
          description: `L'appareil est actuellement en réparation après diagnostic. Veuillez passer à l'étape finale une fois la réparation terminée.`,
        }
      case 3:
        return {
          title: `L'appareil a été réparé`,
          description: `L'appareil a été réparé, veuillez contacter le client pour le récupérer et payer les frais.`,
        }
    }
  }

  const content = getSendGiftText()

  return (
    <div className='bg-gray-100 p-10'>
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
          <button
            className={`bg-blue-600 text-white py-2 px-4 rounded-lg ${
              currentStep === 3 || isCancelled
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-blue-700'
            }`}
            onClick={nextStep}
            disabled={currentStep === 3 || isCancelled} // Disable button on last step or if cancelled
          >
            Next Step
          </button>
          <button
            className={`bg-blue-600 text-white py-2 px-4 rounded-lg ${
              currentStep === 3 || isCancelled
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-blue-700'
            }`}
            onClick={cancelProcess}
            disabled={currentStep === 3 || isCancelled} // Disable button on last step or if cancelled
          >
            Cancel
          </button>
        </div>
      </div>
      {isCancelled && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
            <p className='text-lg font-semibold text-red-500 mb-4'>
              Process Cancelled
            </p>
            <p className='text-sm text-gray-700'>
              The process has been cancelled.
            </p>
          </div>
        </div>
      )}
      <div className='max-w-2xl bg-white rounded-lg p-6 shadow'>
        <h2 className='text-xl font-semibold mb-4'>{content?.title}</h2>
        <p className='text-sm text-gray-700'>{content?.description}</p>
      </div>
    </div>
  )
}
