import { mysqlTable, int, varchar} from "drizzle-orm/mysql-core";

export const productDetailTable = mysqlTable("product_detail", {
  ID: int().autoincrement().primaryKey(),
  Username: varchar({ length: 255 }).notNull(),
  PhoneNumber: varchar({ length: 255 }).notNull(),
  Email: varchar({ length: 255 }).notNull(),
})