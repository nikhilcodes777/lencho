import { AppType } from "@/app/api/[[...route]]/route";
import { Hono } from "hono";

import { categories } from "@/db/schema";
import { db } from "@/db/db";
import { zValidator } from "@hono/zod-validator";
import z from "zod";
import { eq, and, inArray } from "drizzle-orm";
const app = new Hono<AppType>()
  .post("/delete", zValidator("json", z.object({
    ids: z.array(z.string())
  })), async (c) => {

    if (!c.get('user')) {
      return c.json({
        error: "Unauthorized"
      }, 401)
    }
    const values = c.req.valid("json")

    const data = await db.delete(categories).where(
      and(eq(categories.userId, c.get('user')?.id!),
        inArray(categories.id, values.ids))).returning({ id: categories.id })
    return c.json({ data }, 200)


  })
export default app

