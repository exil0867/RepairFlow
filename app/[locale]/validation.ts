import { zfd } from 'zod-form-data'
import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const validateCreateCustomer = zfd.formData({
  name: z.string().min(1, { message: 'Le nom est requis' }).max(50),
  address: z.string(),
  phoneNumber: z.string(),
  taxId: z.string(),
})

export const validateUpdateCustomer = zfd.formData({
  id: z.coerce.number().min(0),
  name: z.string().min(1, { message: 'Le nom est requis' }).max(50),
  address: z.string(),
  phoneNumber: z.string(),
  taxId: z.string(),
})

export const validateCreateDevice = zfd.formData({
  customerId: z.coerce.number().min(0),
  serialNumber: z.string(),
  remark: z.string(),
  model: z.string().min(1, { message: 'Le model est requis' }).max(50),
  brand: z.string(),
})

export const validateUpdateDevice = zfd.formData({
  id: z.coerce.number().min(0),
  customerId: z.coerce.number().min(0),
  serialNumber: z.string(),
  remark: z.string(),
  model: z.string().min(1, { message: 'Le model est requis' }).max(50),
  brand: z.string(),
})

const ArticleStatus = {
  Diagnosing: 'DIAGNOSING',
  Repaired: 'REPAIRED',
  Repairing: 'REPAIRING',
  Cancelled: 'CANCELLED',
}

export const validateCreateArticle = zfd.formData({
  subject: z.string().min(1, { message: 'Le sujet est requis' }).max(50),
  remark: z.string(),
  deviceId: z.coerce.number().min(0),
  customerId: z.coerce.number().min(0),
  status: z.nativeEnum(ArticleStatus, {
    errorMap: (issue, ctx) => {
      return { message: `S'il vous plaît un statut d'article correct` }
    },
  }),
})

export const validateUpdateArticle = zfd.formData({
  id: z.coerce.number().min(0),
  subject: z.string().min(1, { message: 'Le sujet est requis' }).max(50),
  remark: z.string(),
  deviceId: z.coerce.number().min(0),
  customerId: z.coerce.number().min(0),
  status: z.nativeEnum(ArticleStatus, {
    errorMap: () => {
      return { message: 'Le statut est requis' }
    },
  }),
})

export const validateUpdateArticleStatus = zfd.formData({
  id: z.coerce.number().min(0),
  status: z.nativeEnum(ArticleStatus, {
    errorMap: () => {
      return { message: 'Le statut est requis' }
    },
  }),
})

export const validateCreateConcludedArticle = zfd.formData({
  cost: z
    .string()
    .min(1, { message: 'Le coût est requis' })
    .transform((val) => new Prisma.Decimal(val)),
  applicationId: z.coerce.number().min(0),
})

export const validateCreateDiagnosedArticle = zfd.formData({
  issue: z.string(),
  applicationId: z.coerce.number().min(0),
})
