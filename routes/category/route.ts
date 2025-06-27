import { Hono } from "hono";
import { AppType } from "@/app/api/[[...route]]/route";
import getCategories from "@/routes/category/category.get"
import getCategory from "@/routes/category/categoryid.get"
import updateCategory from "@/routes/category/update.patch"
import deleteCategory from "@/routes/category/category.delete"
import createCategory from "@/routes/category/create-category.post"

const app = new Hono<AppType>()
  .route("/", getCategories)
  .route("/", getCategory)
  .route("/", updateCategory)
  .route("/", deleteCategory)
  .route("/", createCategory)
export default app
