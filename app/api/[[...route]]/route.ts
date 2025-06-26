import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import authroutes from '@/routes/authroutes'
export const runtime = 'nodejs'

const app = new Hono().basePath('/api')
  .get('/hello', (c) => {
    return c.json({
      message: 'Hello Next.js!',
    })
  })
const routes = app.route("/auth",authroutes)
export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof routes
