'use client'
import React, { useState } from 'react'

interface Field {
  label: string
  name: string
  type?: string
}

interface ReusableFormProps {
  fields: Field[]
  onAction?: (formData: { [key: string]: string }) => void
  onSubmit?: (formData: { [key: string]: string }) => void
}

const ReusableForm: React.FC<ReusableFormProps> = ({
  fields,
  onAction,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    }
    if (onAction) {
      onAction(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <div key={index}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type || 'text'}
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type='submit'>Submit</button>
    </form>
  )
}

export default ReusableForm
