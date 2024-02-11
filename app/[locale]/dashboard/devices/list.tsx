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
import EmptyList from '@/components/empty-list'

export default function Component() {
  const [list, setList] = useState([])
  const [model, setModel] = useState(undefined)
  const [serialNumber, setSerialNumber] = useState(undefined)
  const [brand, setBrand] = useState(undefined)
  const [customer_, setCustomer_] = useState(undefined)
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const filtered = (await searchDevice(
        undefined,
        model,
        brand,
        serialNumber,
        (customer_ as any)?.id as any,
      )) as any
      setList(filtered)
      setLoading(false)
    }
    fetchData()
  }, [brand, customer_, model, serialNumber])
  return (
    <Wrapper title={'Appareils'} footer={undefined}>
      <FilterHeader>
        <FilterWrapper>
          <FormField
            labelText='Client'
            labelClassName=''
            inputElement={
              <Selector
                setObject={setCustomer_}
                object={customer_}
                itemName={{ plurar: 'clients', singular: 'client' }}
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
            labelText='Modèle'
            labelClassName=''
            inputElement={
              <Input
                type='text'
                placeholder='Filtrer par modèle'
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
            labelText='Marque'
            labelClassName=''
            inputElement={
              <Input
                type='text'
                placeholder='Filtrer par marque'
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
            labelText='Numéro de série'
            labelClassName=''
            inputElement={
              <Input
                type='text'
                placeholder='Filtrer par numéro de série'
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
        {list.length === 0 && !loading ? (
          <EmptyList itemsName='Appareil' />
        ) : (
          list.map(({ id, model, brand, customer }: any) => {
            return (
              <ListItem
                key={id}
                title={`Appareil ${model}`}
                subtitle={`Client: ${customer.name}`}
                footer={`Marque: ${brand}`}
                button={
                  <Link href={`/dashboard/devices/${id}`}>
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
