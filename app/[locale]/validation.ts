import { zfd } from 'zod-form-data'
import { z } from 'zod'

export const createApplication = zfd.formData({
  name: z.string().min(1, { message: 'Le nom est requis' }).max(50),
  address: z.string(),
  phoneNumber: z.string(),
})
