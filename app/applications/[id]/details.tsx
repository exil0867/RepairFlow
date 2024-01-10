'use client'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import setApplicationAsComplete from '@/app/actions/setApplicationAsComplete'

export default function Component({ application }) {
  const { id, subject, notes, status, customer, device } = application
  return (
    <main className='p-4 md:p-6 lg:p-8'>
      <Card>
        <CardHeader>
          <CardTitle>Application Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 md:gap-6 lg:gap-8'>
            <div className='grid gap-2'>
              <Label htmlFor='subject'>Application Subject</Label>
              <Input defaultValue={subject} disabled id='subject' />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='notes'>Application Notes</Label>
              <Textarea defaultValue={notes} disabled id='notes' />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='status'>Application Status</Label>
              <Input defaultValue={status} disabled id='status' />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='customer-name'>Customer Name</Label>
              <Input defaultValue={customer.name} disabled id='customer-name' />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='address'>Customer Address</Label>
              <Input defaultValue={customer.address} disabled id='address' />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='phone'>Customer Phone</Label>
              <Input defaultValue={customer.phoneNumber} disabled id='phone' />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='serial-number'>Device Serial Number</Label>
              <Input
                defaultValue={device.serialNumber}
                disabled
                id='serial-number'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='model'>Device Model</Label>
              <Input defaultValue={device.model} disabled id='model' />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='brand'>Device Brand</Label>
              <Input defaultValue={device.brand} disabled id='brand' />
            </div>
            <div className='flex justify-end gap-4 mt-6'>
              <Button
                onClick={async () => {
                  await setApplicationAsComplete(id)
                }}
              >
                Set as complete
              </Button>
              <Button>Edit Application</Button>
              <Button className='bg-red-500 text-white'>
                Delete Application
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
