import { hc } from 'hono/client'
import type { RouteType} from '@/app/api/[[...route]]/route'

export const client = hc<RouteType>(process.env.NEXT_PUBLIC_APP_URL!)

