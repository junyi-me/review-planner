import { relations, type InferSelectModel } from "drizzle-orm";
import { pgTable, serial, text, integer, timestamp, json } from "drizzle-orm/pg-core";

const commonFields = {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
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
  ownerId: integer("owner_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  offsetDays: json("offset_days").$type<number[]>().notNull(),
});

export const projectRelation = relations(project, ({ one, many }) => ({
  owner: one(user, {
    fields: [project.ownerId],
    references: [user.id],
  }),
  tasks: many(task),
}));

export const task = pgTable("task", {
  ...commonFields,
  name: text("name").notNull(),
  projectId: integer("project_id").notNull(),
});

export const taskRelation = relations(task, ({ one, many }) => ({
  project: one(project, {
    fields: [task.projectId],
    references: [project.id],
  }),
  iterations: many(iteration),
}));

export const iteration = pgTable("iteration", {
  ...commonFields,
  taskId: integer("task_id").notNull(),
  plannedAt: timestamp("planned_at").notNull(),
  doneAt: timestamp("done_at"),
});

export const iterationRelation = relations(iteration, ({ one }) => ({
  task: one(task, {
    fields: [iteration.taskId],
    references: [task.id],
  }),
}));

export type UserRow = InferSelectModel<typeof user>;
export type ProjectRow = InferSelectModel<typeof project>;
export type TaskRow = InferSelectModel<typeof task>;
export type IterationRow = InferSelectModel<typeof iteration>;

