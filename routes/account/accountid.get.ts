
import { AppType } from "@/app/api/[[...route]]/route";
import { Hono } from "hono";

import { transactionAccounts as accounts } from "@/db/schema";
import { db } from "@/db/db";
import { zValidator } from "@hono/zod-validator";
import z from "zod";
import { eq, and } from "drizzle-orm";

const app = new Hono<AppType>()
  .get("/:id", zValidator("param", z.object({
    id: z.string().optional()
  })), async (c) => {

    if (!c.get('user')) {
      return c.json({
        error: "Unauthorized"
      }, 401)
    }

    const { id } = c.req.valid("param")
    if (!id) {
      return c.json({ error: "Bad request" }, 400)
    }
    const user = c.get("user")!

    const [data] = await db.select({
      id: accounts.id,
      name: accounts.name,
      balance: accounts.balance
    })
      .from(accounts)
      .where(and(eq(accounts.id, id),
        eq(accounts.userId, user.id)))

    return c.json({ data }, 200)

  })

export default app
