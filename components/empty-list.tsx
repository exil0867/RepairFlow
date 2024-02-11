import React from 'react'

type Props = {
  itemsName: string
}

function EmptyList({ itemsName: itemNames }: Props) {
  return (
    <div className='flex items-center space-x-2'>
      <div>
        <div className='text-lg font-bold'>
          Aucun {itemNames} n&apos;a été trouvé
        </div>
        <div className='text-sm text-gray-500 dark:text-gray-400'>
          Ajustez les filtres pour trouver un résultat ou essayez un terme de
          recherche différent.
        </div>
      </div>
    </div>
  )
}

export default EmptyList
