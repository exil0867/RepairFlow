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

function Selector({ object, setObject, getObjects, creator, itemName }: any) {
  const [open, setOpen] = useState(false)
  const [list, setList] = useState([])
  const [inputValue, setInputValue] = useState('')
  useEffect(() => {
    async function fetchData() {
      const filtered = (await getObjects(inputValue)) as any
      setList(filtered)
    }
    fetchData()
  }, [inputValue])
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-[200px] justify-between'
          >
            {object.value ? object.value : `Select ${itemName.singular}...`}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0'>
          <Command shouldFilter={false}>
            <CommandInput
              onValueChange={setInputValue}
              value={inputValue}
              placeholder={`Search  ${itemName.singular}...`}
            />
            <CommandEmpty>No ${itemName.plurar} found. </CommandEmpty>
            <CommandGroup>
              {list.map((item: any) => (
                <CommandItem
                  key={item.id}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setObject(item)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      object.id === item.id ? 'opacity-100' : 'opacity-0',
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
