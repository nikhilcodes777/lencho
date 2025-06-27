import { hc } from 'hono/client'
import type { routes } from '@/app/api/[[...route]]/route'

export const client = hc<typeof routes>(process.env.NEXT_PUBLIC_APP_URL!)

