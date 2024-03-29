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
import { useSearchParams } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const debounceDuration = 1000

export default function Component() {
  const searchId = useSearchParams().get('id')
  const searchName = useSearchParams().get('name')
  const [list, setList] = useState([])
  const [name, setName] = useState(searchName ? searchName : undefined)
  const [debouncedName] = useDebounce(name, debounceDuration)
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(searchId ? searchId : undefined)
  const [debouncedId] = useDebounce(id, debounceDuration)
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const filtered = (await searchCustomer(debouncedId, debouncedName)) as any
      setList(filtered)
      setLoading(false)
    }
    fetchData()
  }, [debouncedId, debouncedName])
  const renderList = () => {
    if (list.length === 0 && !loading) {
      return <EmptyList itemsName='Client' />
    } else if (loading) {
      return <Skeleton height={95} count={10} />
    } else {
      return list.map(({ id, name, address, phoneNumber }) => {
        return (
          <ListItem
            key={id}
            title={`${name} #${id}`}
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
    }
  }
  return (
    <Wrapper title={'Clients'} footer={undefined}>
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
      <div className='flex flex-col gap-2'>{renderList()}</div>
    </Wrapper>
  )
}
