import { auth } from "@/lib/auth";
import { Hono } from "hono";

const app = new Hono()
 .on(["POST", "GET"], "/**", (c) =>auth.handler(c.req.raw))
export default app
