import { AppType } from "@/app/api/[[...route]]/route";
import { Hono } from "hono";

import { insertCategorySchema, categories } from "@/db/schema";
import { db } from "@/db/db";
import { zValidator } from "@hono/zod-validator";
import z from "zod";
import { eq, and } from "drizzle-orm";
const app = new Hono<AppType>()
  .patch("/:id", zValidator("param", z.object({
    id: z.string().optional()
  }),
  ),
    zValidator("json", insertCategorySchema.pick(
      {
        name: true,
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
        categories
      ).set({ userId, ...values }).where(
        and(eq(categories.userId, userId),
          eq(categories.id, id))).returning()
      if (!data) {
        return c.json({ error: "Not found" }, 404)
      }
      return c.json({ data }, 200)

    })
export default app

