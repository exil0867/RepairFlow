'use client'
import { useEffect, useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type Props = {}

function Selector({
  object,
  setObject,
  getObjects,
  creator,
  itemName,
  showList,
  setShowList,
}: any) {
  const [list, setList] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [shouldType, setShouldType] = useState(true)
  useEffect(() => {
    if (inputValue === '') {
      setList([])
      setShouldType(true)
      return
    }
    async function fetchData() {
      const filtered = (await getObjects(inputValue)) as any
      setList(filtered)
      setShouldType(false)
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, showList])
  return (
    <>
      <Popover
        open={showList}
        onOpenChange={(e) => {
          setShowList(e)
          console.log(showList)
          console.log(object)
        }}
      >
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={showList}
            className='w-[200px] justify-between border border-gray-300 p-2 rounded text-gray-700'
          >
            {object?.value
              ? object.value
              : `Sélectionner ${itemName.singular}...`}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0 bg-white'>
          <Command shouldFilter={false}>
            <CommandInput
              onValueChange={setInputValue}
              value={inputValue}
              placeholder={`Rechercher un ${itemName.singular}...`}
            />
            <CommandEmpty>
              {shouldType
                ? `Veuillez rechercher un ${itemName.singular}`
                : `Aucun ${itemName.plurar} trouvé.`}
            </CommandEmpty>
            <CommandGroup>
              {list.slice(0, 6).map((item: any) => (
                <CommandItem
                  key={item.id}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setObject(item)
                    setShowList(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      object?.id == item.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {item.value}
                </CommandItem>
              ))}
            </CommandGroup>
            {creator}
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default Selector
