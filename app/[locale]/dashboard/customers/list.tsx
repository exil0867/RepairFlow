'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import searchApplication from '../../actions/searchApplication'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Selector from '@/components/selector'
import { transformArray } from '@/lib/utils'
import searchCustomer from '../../actions/searchCustomer'
import searchDevice from '@/app/actions/searchDevice'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ListItem } from '@/components/list'
import Wrapper from '@/components/wrapper'
import { FilterHeader, FilterWrapper } from '@/components/filter-header'
import { FormField } from '@/components/form'
import EmptyList from '@/components/empty-list'

export default function Component() {
  const [list, setList] = useState([])
  const [name, setName] = useState(undefined)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const filtered = (await searchCustomer(undefined, name)) as any
      setList(filtered)
      setLoading(false)
    }
    fetchData()
  }, [name])
  return (
    <Wrapper title={'Clients'} footer={undefined}>
      <FilterHeader>
        <FilterWrapper>
          <FormField
            labelText='Nom'
            labelClassName=''
            inputElement={
              <Input
                type='text'
                placeholder='Filtrer par nom'
                onChange={(s) => {
                  console.log(s)
                  setName(s.target.value as any)
                }}
              />
            }
          />
        </FilterWrapper>
      </FilterHeader>
      <div className='flex flex-col gap-2'>
        {list.length === 0 && !loading ? (
          <EmptyList itemsName='Client' />
        ) : (
          list.map(({ id, name, address, phoneNumber }) => {
            return (
              <ListItem
                key={id}
                title={`Client ${name}`}
                subtitle={`Adresse: ${address}`}
                footer={`Numéro de téléphone: ${phoneNumber}`}
                button={
                  <Link href={`/dashboard/customers/${id}`}>
                    <Button variant='outline'>Voir</Button>
                  </Link>
                }
              />
            )
          })
        )}
      </div>
    </Wrapper>
  )
}
