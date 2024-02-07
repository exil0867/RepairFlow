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
  const [customer_, setCustomer_] = useState(undefined) as any
  const [device_, setDevice_] = useState(undefined)
  const [subject, setSubject] = useState(undefined)
  const [status, setStatus] = useState<'PENDING' | 'COMPLETE' | 'CANCELLED'>(
    'PENDING',
  )
  useEffect(() => {
    async function fetchData() {
      const filtered = (await searchApplication(
        (customer_ as any)?.id as any,
        (device_ as any)?.id as any,
        subject,
        status,
      )) as any
      console.log('adsfasdf ', filtered)
      setList(filtered)
    }
    fetchData()
  }, [customer_, device_, status, subject])
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  return (
    <Wrapper title={'Applications'} footer={undefined}>
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
                  setDevice_(undefined)
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
            labelText='Device'
            labelClassName=''
            inputElement={
              <Selector
                setObject={setDevice_}
                object={device_}
                itemName={{ plurar: 'devices', singular: 'device' }}
                showList={open2}
                setShowList={setOpen2}
                getObjects={async (e: any) => {
                  const s = transformArray(
                    await searchDevice(
                      undefined,
                      e,
                      undefined,
                      undefined,
                      customer_?.id,
                    ),
                    'model',
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
            labelText='Subject'
            labelClassName=''
            inputElement={
              <Input
                type='text'
                placeholder='Filter by subject'
                onChange={(s) => {
                  console.log(s)
                  setSubject(s.target.value as any)
                }}
              />
            }
          />
        </FilterWrapper>
        <FilterWrapper>
          <FormField
            labelText='Status'
            labelClassName=''
            inputElement={
              <Select
                defaultValue={status}
                onValueChange={(v: any) => setStatus(v)}
                value={status}
              >
                <SelectTrigger className='w-[180px] border-gray-300 p-2 rounded text-gray-700'>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent className='bg-white'>
                  <SelectGroup>
                    <SelectItem value='PENDING'>Pending</SelectItem>
                    <SelectItem value='COMPLETE'>Complete</SelectItem>
                    <SelectItem value='CANCELLED'>Cancelled</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            }
          />
        </FilterWrapper>
      </FilterHeader>
      <div className='flex flex-col gap-2'>
        {list.map(({ id, device, customer }: any) => {
          return (
            <ListItem
              key={id}
              title={`Application ${id}`}
              subtitle={`Device: ${device.model}`}
              footer={`Customer: ${customer.name}`}
              button={
                <Link href={`/dashboard/applications/${id}`}>
                  <Button variant='outline'>Voir</Button>
                </Link>
              }
            />
          )
        })}
      </div>
    </Wrapper>
  )
}
