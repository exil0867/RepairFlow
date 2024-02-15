import { zfd } from 'zod-form-data'
import { z } from 'zod'

export const validateCreateCustomer = zfd.formData({
  name: z.string().min(1, { message: 'Le nom est requis' }).max(50),
  address: z.string(),
  phoneNumber: z.string(),
})

export const validateUpdateCustomer = zfd.formData({
  id: z.string().transform((val) => Number(val)),
  name: z.string().min(1, { message: 'Le nom est requis' }).max(50),
  address: z.string(),
  phoneNumber: z.string(),
})
