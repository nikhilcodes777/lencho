import { AppType } from "@/app/api/[[...route]]/route";
import { Hono } from "hono";

import { transactionAccounts as accounts } from "@/db/schema";
import { db } from "@/db/db";
const app = new Hono<AppType>()
  .get("/", async (c) => {
    if (!c.get('user')) {
      return c.json({
        error: "Unauthorized"
      }, 401)
    }

    const data = await db.select({
      id: accounts.id,
      name: accounts.name,
      balance: accounts.balance
    }).from(accounts)

    return c.json({ data }, 200)
  })
export default app
