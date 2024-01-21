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
import { ListItem } from '@/components/list'
import Wrapper from '@/components/wrapper'
import { FilterHeader, FilterWrapper } from '@/components/filter-header'
import { FormField } from '@/components/form'

export default function Component() {
  const [list, setList] = useState([])
  const [model, setModel] = useState(undefined)
  const [serialNumber, setSerialNumber] = useState(undefined)
  const [brand, setBrand] = useState(undefined)
  const [customer_, setCustomer_] = useState(undefined)
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  useEffect(() => {
    async function fetchData() {
      const filtered = (await searchDevice(
        undefined,
        model,
        brand,
        serialNumber,
        (customer_ as any)?.id as any,
      )) as any
      setList(filtered)
    }
    fetchData()
  }, [brand, customer_, model, serialNumber])
  return (
    <Wrapper title={'Devices'} footer={undefined}>
      <FilterHeader>
        <FilterWrapper>
          <FormField
            labelText='Customer'
            labelClassName=''
            inputElement={
              <Selector
                setObject={setCustomer_}
                object={customer_}
                itemName={{ plurar: 'customers', singular: 'customer' }}
                showList={open}
                setShowList={(v: any) => {
                  setOpen(v)
                }}
                getObjects={async (e: any) => {
                  const s = transformArray(
                    await searchCustomer(undefined, e),
                    'name',
                  )
                  console.log(s, 'hi', e)
                  return s
                }}
              />
            }
          />
        </FilterWrapper>
        <FilterWrapper>
          <FormField
            labelText='Model'
            labelClassName=''
            inputElement={
              <Input
                type='text'
                placeholder='Filter by model'
                onChange={(s) => {
                  console.log(s)
                  setModel(s.target.value as any)
                }}
              />
            }
          />
        </FilterWrapper>
        <FilterWrapper>
          <FormField
            labelText='Brand'
            labelClassName=''
            inputElement={
              <Input
                type='text'
                placeholder='Filter by brand'
                onChange={(s) => {
                  console.log(s)
                  setBrand(s.target.value as any)
                }}
              />
            }
          />
        </FilterWrapper>
        <FilterWrapper>
          <FormField
            labelText='Serial Number'
            labelClassName=''
            inputElement={
              <Input
                type='text'
                placeholder='Filter by serial number'
                onChange={(s) => {
                  console.log(s)
                  setSerialNumber(s.target.value as any)
                }}
              />
            }
          />
        </FilterWrapper>
      </FilterHeader>
      <div className='flex flex-col gap-2'>
        {list.map(({ id, model, brand, customer }: any) => {
          return (
            <ListItem
              key={id}
              title={`Device ${model}`}
              subtitle={`Customer: ${customer.name}`}
              footer={`Brand: ${brand}`}
              button={
                <Link href={`/dashboard/devices/${id}`}>
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
