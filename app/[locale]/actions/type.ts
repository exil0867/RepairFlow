export type FormResponse = {
  message: string | null
  response?: any
  error: boolean | null
  errors?: Array<{
    path: string
    message: string
  }>
} | null
