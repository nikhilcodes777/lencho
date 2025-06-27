
import { AppType } from "@/app/api/[[...route]]/route";
import { Hono } from "hono";

import { insertTrAccountSchema as insertAccountSchema, transactionAccounts as accounts } from "@/db/schema";
import { db } from "@/db/db";
import { zValidator } from "@hono/zod-validator";
import z from "zod";
import { eq, and } from "drizzle-orm";
const app = new Hono<AppType>()
  .patch("/:id", zValidator("param", z.object({
    id: z.string().optional()
  }),
  ),
    zValidator("json", insertAccountSchema.pick(
      {
        name: true,
        type: true,
        balance: true
      }
    )),
    async (c) => {

      if (!c.get('user')) {
        return c.json({
          error: "Unauthorized"
        }, 401)
      }

      const { id } = c.req.valid("param")
      if (!id) {
        return c.json({ error: "Bad request" }, 400)
      }
      const { id: userId } = c.get("user")!
      const values = c.req.valid("json")

      const [data] = await db.update(
        accounts
      ).set({ userId, ...values }).where(
        and(eq(accounts.userId, userId),
          eq(accounts.id, id))).returning()
      if (!data) {
        return c.json({ error: "Not found" }, 404)
      }
      return c.json({ data }, 200)

    })
export default app

