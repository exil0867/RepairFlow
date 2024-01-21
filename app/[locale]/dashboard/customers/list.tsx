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

export default function Component() {
  const [list, setList] = useState([])
  const [name, setName] = useState(undefined)
  useEffect(() => {
    async function fetchData() {
      const filtered = (await searchCustomer(undefined, name)) as any
      setList(filtered)
    }
    fetchData()
  }, [name])
  return (
    <Wrapper title={'Customers'} footer={undefined}>
      <FilterHeader>
        <FilterWrapper>
          <FormField
            labelText='Name'
            labelClassName=''
            inputElement={
              <Input
                type='text'
                placeholder='Filter by name'
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
        {list.map(({ id, name, address, phoneNumber }) => {
          return (
            <ListItem
              key={id}
              title={`Customer ${name}`}
              subtitle={`Address: ${address}`}
              footer={`Phone Number: ${phoneNumber}`}
              button={
                <Link href={`/dashboard/customers/${id}`}>
                  <Button variant='outline'>View</Button>
                </Link>
              }
            />
          )
        })}
      </div>
    </Wrapper>
  )
}
