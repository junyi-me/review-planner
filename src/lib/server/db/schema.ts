import { relations, type InferSelectModel } from "drizzle-orm";
import { pgTable, serial, text, integer, timestamp, json, date } from "drizzle-orm/pg-core";

const commonFields = {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
}

export const user = pgTable("user", {
  ...commonFields,
  email: text("email").unique().notNull(),
  name: text("name").notNull(),
  password: text("password").notNull(),
});

export const userRelation = relations(user, ({ many }) => ({
  projects: many(project),
}));

export const project = pgTable("project", {
  ...commonFields,
  ownerId: integer("owner_id").notNull().references(() => user.id),
  name: text("name").notNull(),
  link: text("link"),
  description: text("description"),
  offsetDays: json("offset_days").$type<number[]>().notNull(),
});

export const projectRelation = relations(project, ({ one, many }) => ({
  owner: one(user, {
    fields: [project.ownerId],
    references: [user.id],
  }),
  tasks: many(task),
}));

export type Iteration = {
  plannedAt: string;
  done: boolean;
}
export const task = pgTable("task", {
  ...commonFields,
  name: text("name").notNull(),
  projectId: integer("project_id").notNull().references(() => project.id),
  link: text("link"),
  description: text("description"),
  firstIterAt: date("first_iter_at").notNull(),
  nextIterAt: date("next_iter_at"),
  lastIterAt: date("last_iter_at").notNull(),
  iterations: json("iters").$type<Iteration[]>().notNull(),
});

export const taskRelation = relations(task, ({ one }) => ({
  project: one(project, {
    fields: [task.projectId],
    references: [project.id],
  }),
}));

export type UserRow = InferSelectModel<typeof user>;
export type ProjectRow = InferSelectModel<typeof project>;
export type TaskRow = InferSelectModel<typeof task>;

