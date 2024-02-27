'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import searchApplication from '../../actions/searchApplication'
import { useCallback, useEffect, useMemo, useState } from 'react'
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
import { useSearchParams } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const debounceDuration = 1000

export default function Component() {
  const searchId = useSearchParams().get('id')
  const searchModel = useSearchParams().get('model')
  const searchBrand = useSearchParams().get('brand')
  const searchSerialNumber = useSearchParams().get('serialNumber')
  const searchCustomerId = useSearchParams().get('customerId')
  const searchCustomerIdLabel = useSearchParams().get('customerIdLabel')
  const [list, setList] = useState([])
  const [model, setModel] = useState(searchModel ? searchModel : undefined)
  const [debouncedModel] = useDebounce(model, debounceDuration)
  const [serialNumber, setSerialNumber] = useState(
    searchSerialNumber ? searchSerialNumber : undefined,
  )
  const [debouncedSerialNumber] = useDebounce(serialNumber, debounceDuration)
  const [brand, setBrand] = useState(searchBrand ? searchBrand : undefined)
  const [debouncedBrand] = useDebounce(brand, debounceDuration)
  const [customer_, setCustomer_] = useState(
    searchCustomerId
      ? { id: searchCustomerId, value: searchCustomerIdLabel }
      : undefined,
  )
  const [open, setOpen] = useState(false)
  const [id, setId] = useState(searchId ? searchId : undefined)
  const [debouncedId] = useDebounce(id, debounceDuration)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const filtered = (await searchDevice(
        debouncedId,
        debouncedModel,
        debouncedBrand,
        debouncedSerialNumber,
        (customer_ as any)?.id as any,
      )) as any
      setList(filtered)
      setLoading(false)
    }
    fetchData()
  }, [
    debouncedBrand,
    customer_,
    debouncedId,
    debouncedModel,
    debouncedSerialNumber,
  ])
  const renderList = () => {
    if (list.length === 0 && !loading) {
      return <EmptyList itemsName='Appareil' />
    } else if (loading) {
      return <Skeleton height={95} count={10} />
    } else {
      return list.map(({ id, model, brand, customer }: any) => {
        return (
          <ListItem
            key={id}
            title={`${model} #${id}`}
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
    }
  }
  return (
    <Wrapper title={'Appareils'} footer={undefined}>
      <FilterHeader>
        <FilterWrapper>
          <FormField
            labelText='Référence'
            labelClassName=''
            inputElement={
              <Input
                type='number'
                placeholder='Filtrer par référence'
                onChange={(s) => {
                  console.log(s)
                  setId(s.target.value as any)
                }}
              />
            }
          />
        </FilterWrapper>
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
      <div className='flex flex-col gap-2'>{renderList()}</div>
    </Wrapper>
  )
}
