import { zfd } from 'zod-form-data'
import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const validateCreateCustomerSchema = {
  name: z.string().min(1, { message: 'Le nom est requis' }).max(50),
  address: z.string(),
  phoneNumber: z.string(),
  taxId: z.string(),
  remark: z.string(),
}
export const validateCreateCustomer = zfd.formData(validateCreateCustomerSchema)

export const validateUpdateCustomerSchema = {
  id: z.coerce.number().min(0),
  name: z.string().min(1, { message: 'Le nom est requis' }).max(50),
  address: z.string(),
  phoneNumber: z.string(),
  taxId: z.string(),
  remark: z.string(),
}

export const validateUpdateCustomer = zfd.formData(validateUpdateCustomerSchema)

export const validateCreateDeviceSchema = {
  customerId: z.coerce.number().min(0),
  serialNumber: z.string(),
  remark: z.string(),
  model: z.string().min(1, { message: 'Le model est requis' }).max(50),
  brand: z.string(),
}

export const validateCreateDevice = zfd.formData(validateCreateDeviceSchema)

export const validateUpdateDeviceSchema = {
  id: z.coerce.number().min(0),
  customerId: z.coerce.number().min(0),
  serialNumber: z.string(),
  remark: z.string(),
  model: z.string().min(1, { message: 'Le model est requis' }).max(50),
  brand: z.string(),
}

export const validateUpdateDevice = zfd.formData(validateUpdateDeviceSchema)

const ArticleStatus = {
  Diagnosing: 'DIAGNOSING',
  Repaired: 'REPAIRED',
  Repairing: 'REPAIRING',
  Cancelled: 'CANCELLED',
}

export const validateCreateArticleSchema = {
  subject: z.string().min(1, { message: 'Le sujet est requis' }).max(50),
  remark: z.string(),
  deviceId: z.coerce.number().min(0),
  customerId: z.coerce.number().min(0),
  status: z.nativeEnum(ArticleStatus, {
    errorMap: (issue, ctx) => {
      return { message: `Veuillez corriger l'état de la tâche` }
    },
  }),
}

export const validateCreateArticle = zfd.formData(validateCreateArticleSchema)

export const validateCreateConcludedArticleSchema = {
  cost: z
    .string()
    .min(1, { message: 'Le coût est requis' })
    .transform((val) => new Prisma.Decimal(val)),
  changes: z.string(),
  applicationId: z.coerce.number().min(0),
}

export const validateCreateConcludedArticle = zfd.formData(
  validateCreateConcludedArticleSchema,
)

export const validateCreateDiagnosedArticleSchema = {
  issue: z.string(),
  applicationId: z.coerce.number().min(0),
}

export const validateCreateDiagnosedArticle = zfd.formData(
  validateCreateDiagnosedArticleSchema,
)

export const validateUpdateArticleSchema = {
  id: z.coerce.number().min(0),
  subject: z.string().min(1, { message: 'Le sujet est requis' }).max(50),
  remark: z.string(),
  deviceId: z.coerce.number().min(0),
  customerId: z.coerce.number().min(0),
  diagnosisIssue: validateCreateDiagnosedArticleSchema['issue'].optional(),
  concludedCost: validateCreateConcludedArticleSchema['cost'].optional(),
  concludedChanges: validateCreateConcludedArticleSchema['changes'].optional(),
}

export const validateUpdateArticle = zfd.formData(validateUpdateArticleSchema)

export const validateUpdateArticleStatusSchema = {
  id: z.coerce.number().min(0),
  status: z.nativeEnum(ArticleStatus, {
    errorMap: () => {
      return { message: 'Le statut est requis' }
    },
  }),
}

export const validateUpdateArticleStatus = zfd.formData(
  validateUpdateArticleStatusSchema,
)
