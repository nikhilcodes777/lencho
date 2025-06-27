import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import authRoutes from '@/routes/auth/route'
import accountRoutes from '@/routes/account/route'
import categoryRoutes from '@/routes/category/route'
import { auth } from '@/lib/auth'
export const runtime = 'nodejs'

const app = new Hono<AppType>().basePath('/api')
  .use(async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) {
      c.set("user", null);
      c.set("session", null);
      return await next();
    }

    c.set("user", session.user);
    c.set("session", session.session);
    return await next();
  })

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/auth", authRoutes)
  .route("/account", accountRoutes)
  .route("/category", categoryRoutes)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)

export type AppType = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null
  }
}
export type RouteType = typeof routes
