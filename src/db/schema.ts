import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { OrderStatus } from "../core/enums/orederStatus";

export const clientTable = sqliteTable("clients_table", {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  phone: text().notNull(),
  createdAt: text()
    .notNull(),
  updatedAt: text()
    .notNull(),
  deletedAt: text(),
});

export const workerTable = sqliteTable("workers_table", {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  salary: integer().notNull(),
  role: text().notNull(),
  isActive: integer({ mode: "boolean" }).notNull().default(true),
  createdAt: text()
    .notNull(),
   
  updatedAt: text()
    .notNull(),

  deletedAt: text(),
});

export const orderTable = sqliteTable(
  "orders_table",
  {
    id: text().primaryKey(),
    clientId: text()
      .notNull()
      .references(() => clientTable.id, { onDelete: "cascade" }),
    workerId: text().references(() => workerTable.id, { onDelete: "set null" }),
    status: text("status", { enum: OrderStatus.values() }).notNull(),
    totalPrice: integer().notNull(),
    createdAt: text()
      .notNull(),
    updatedAt: text()
      .notNull(),
    deletedAt: text(),
  },
  (table) => ({
    clientIdx: index("orders_client_idx").on(table.clientId),
    workerIdx: index("orders_worker_idx").on(table.workerId),
  })
);

export const paymentTable = sqliteTable(
  "payments_table",
  {
    id: text().primaryKey(),
    orderId: text()
      .notNull()
      .references(() => orderTable.id, { onDelete: "cascade" }),
    amount: integer().notNull(),
    method: text().notNull(),
    createdAt: text()
      .notNull(),
    updatedAt: text()
      .notNull(),
    deletedAt: text(),
  },
  (table) => ({
    orderIdx: index("payments_order_idx").on(table.orderId),
  })
);

export const orderItemTable = sqliteTable(
  "order_items_table",
  {
    id: text().primaryKey(),
    orderId: text()
      .notNull()
      .references(() => orderTable.id, { onDelete: "cascade" }),
    itemName: text().notNull(),
    quantity: integer().notNull(),
    price: integer().notNull(),
    subTotal: integer().notNull(),
    createdAt: text()
      .notNull(),
    updatedAt: text()
      .notNull(),
    deletedAt: text(),
  },
  (table) => ({
    orderIdx: index("order_items_order_idx").on(table.orderId),
  })
);

export const itemTable = sqliteTable("items_table", {
  id: text().primaryKey(),
  category: text().notNull(),
  type: text().notNull(),
  name: text().notNull(),
  description: text().notNull(),
  price: integer().notNull(),
  isStock: integer({ mode: "boolean" }).notNull().default(true),
  createdAt: text()
    .notNull(),
  updatedAt: text()
    .notNull(),
  deletedAt: text(),
});
