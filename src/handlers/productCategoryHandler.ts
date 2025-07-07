import { Request, Response } from "express";
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';
import { productCategoryTable } from "../db/productCategoryTable";
import { productSubCategoryTable } from "../db/productSubCategoryTable";

const db = drizzle(process.env.DATABASE_URL!);
 



export const productCategoryHandler = async (req: Request, res: Response) => {
  const productCategory = await db
    .select()
    .from(productCategoryTable);

  const mainAndSubCategories = await Promise.all(
    productCategory.map(async (m) => {
      const subCategories = await db
      .select()
      .from(productSubCategoryTable)
      .where(eq(productSubCategoryTable.ProductCategoryID, m.ID));

      return {
        mainCategory: {
          name: m.Name,
          icon: m.Icon,
          isActive: m.IsActive,
        },
        subCategories: subCategories.map((s) => ({
          name: s.Name,
          icon: s.Icon,
          isActive: s.IsActive,
        })),
      }
    })
  )
  // console.log(mainAndSubCategories);
  res.status(200).json(mainAndSubCategories);
};