import { Hono } from "hono";
import { AppType } from "@/app/api/[[...route]]/route";
import getAccounts from "@/routes/account/account.get"
import getAccount from "@/routes/account/accountid.get"
import updateAccount from "@/routes/account/update.patch"
import deleteAccount from "@/routes/account/account.delete"
import createAccount from "@/routes/account/create-account.post"

const app = new Hono<AppType>()
  .route("/", getAccounts)
  .route("/", getAccount)
  .route("/", updateAccount)
  .route("/", deleteAccount)
  .route("/", createAccount)
export default app
