import { AppType } from "@/app/api/[[...route]]/route";
import { Hono } from "hono";

import { insertTrAccountSchema as insertAccountSchema, transactionAccounts as accounts } from "@/db/schema";
import { db } from "@/db/db";
import { zValidator } from "@hono/zod-validator";
import { nanoid } from "nanoid";
const app = new Hono<AppType>()
  .post("/",
    zValidator("json", insertAccountSchema.pick({
      name: true,
      balance: true,
      type: true

    }))
    ,
    async (c) => {

      if (!c.get('user')) {
        return c.json({
          error: "Unauthorized"
        }, 401)
      }

      const values = c.req.valid("json")

      const userId = c.get('user')?.id!
      const [data] = await db.insert(accounts).values({
        id: nanoid(),
        userId,
        ...values
      }).returning()

      return c.json({ data }, 201)
    })

export default app

