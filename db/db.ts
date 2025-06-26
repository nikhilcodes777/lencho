import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

import * as schema from "@/db/schema";
config({ path: ".env" }); // or .env.local

export const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql ,schema});
