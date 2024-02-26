'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import searchApplication from '../../actions/searchApplication'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Selector from '@/components/selector'
import { renderStatus, transformArray } from '@/lib/utils'
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
import { useSearchParams } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const debounceDuration = 1000

export default function Component() {
  const searchDeviceId = useSearchParams().get('deviceId')
  const searchDeviceIdLabel = useSearchParams().get('deviceIdLabel')
  const searchCustomerId = useSearchParams().get('customerId')
  const searchCustomerIdLabel = useSearchParams().get('customerIdLabel')
  const searchStatus = useSearchParams().get('status') as any
  const searchId = useSearchParams().get('id')
  const searchSubject = useSearchParams().get('subject')
  const [list, setList] = useState([])
  const [customer_, setCustomer_] = useState(
    searchCustomerId
      ? { id: searchCustomerId, value: searchCustomerIdLabel }
      : undefined,
  )
  const [device_, setDevice_] = useState(
    searchDeviceId
      ? { id: searchDeviceId, value: searchDeviceIdLabel }
      : undefined,
  )
  const [subject, setSubject] = useState(
    searchSubject ? searchSubject : undefined,
  )
  const [debouncedSubject] = useDebounce(subject, debounceDuration)
  const [id, setId] = useState(searchId ? searchId : undefined)
  const [debouncedId] = useDebounce(id, debounceDuration)
  const [status, setStatus] = useState<
    'DIAGNOSING' | 'REPAIRING' | 'REPAIRED' | 'CANCELLED'
  >(searchStatus ? searchStatus.toUpperCase() : undefined)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const filtered = (await searchApplication(
        debouncedId as any,
        (customer_ as any)?.id as any,
        (device_ as any)?.id as any,
        debouncedSubject,
        status,
      )) as any
      console.log('adsfasdf ', filtered)
      setList(filtered)
      setLoading(false)
    }
    fetchData()
  }, [customer_, device_, debouncedId, status, debouncedSubject])
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const renderList = () => {
    if (list.length === 0 && !loading) {
      return <EmptyList itemsName='Tâche' />
    } else if (loading) {
      return <Skeleton height={95} count={10} />
    } else {
      return list.map(({ subject, id, device, customer }: any) => {
        return (
          <ListItem
            key={id}
            title={`${subject} #${id}`}
            subtitle={`Appareil: ${device.model}`}
            footer={`Client: ${customer.name}`}
            button={
              <Link href={`/dashboard/applications/${id}`}>
                <Button variant='outline'>Voir</Button>
              </Link>
            }
          />
        )
      })
    }
  }
  return (
    <Wrapper title={'Tâches'} footer={undefined}>
      <FilterHeader>
        <FilterWrapper>
          <FormField
            labelText='Référence'
            labelClassName=''
            inputElement={
              <Input
                type='text'
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
            labelText='Appareil'
            labelClassName=''
            inputElement={
              <Selector
                setObject={setDevice_}
                object={device_}
                itemName={{ plurar: 'appareils', singular: 'appareil' }}
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
            labelText='Sujet'
            labelClassName=''
            inputElement={
              <Input
                type='text'
                placeholder='Filtrer par sujet'
                defaultValue={subject}
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
            labelText='Statut'
            labelClassName=''
            inputElement={
              <Select
                defaultValue={status}
                onValueChange={(v: any) => setStatus(v)}
                value={status}
              >
                <SelectTrigger className='w-[180px] border-gray-300 p-2 rounded text-gray-700'>
                  <SelectValue placeholder='Sélectionnez le statut' />
                </SelectTrigger>
                <SelectContent className='bg-white'>
                  <SelectGroup>
                    <SelectItem value='DIAGNOSING'>Diagnostic</SelectItem>
                    <SelectItem value='REPAIRING'>Réparer</SelectItem>
                    <SelectItem value='REPAIRED'>Réparé</SelectItem>
                    <SelectItem value='CANCELLED'>Annulé</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            }
          />
        </FilterWrapper>
      </FilterHeader>
      <div className='flex flex-col gap-2'>{renderList()}</div>
    </Wrapper>
  )
}
