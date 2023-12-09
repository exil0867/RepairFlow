import ReusableForm from '@/components/newForm'

export const First = () => {
  const createInvoice = async (formData: FormData) => {
    'use server'
    console.log(formData)
  }

  const fields: Field[] = [
    { label: 'Customer ID', name: 'customerId', type: 'text' },
    { label: 'Email', name: 'email', type: 'email' },
    // Add more fields as needed
  ]

  return (
    <ReusableForm
      fields={fields}
      onAction={createInvoice}
      submitText='Submit'
      type='NORMAL'
    />
  )
}
