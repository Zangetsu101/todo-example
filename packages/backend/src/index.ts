import cors from '@elysiajs/cors'
import Elysia, { t } from 'elysia'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { db } from './db/db'
import { todos } from './db/schema'
import {eq} from "drizzle-orm";

migrate(db, { migrationsFolder: './drizzle' })

const app = new Elysia()
  .use(cors())
  .get('/todos', () => db.select().from(todos))
  .get(
    '/todos/:id',
    async ({params, set, error}) => {
        const [todo] = await db
            .select()
            .from(todos)
            .where(eq(todos.id, params.id));
        if (!todo ) {
            return error(404, 'Todo could not be found.');
        }
        return todo;
    },
    {
      params: t.Object({
        id: t.Numeric()
      })
    }
  )
  .post(
    '/todos',
    async ({ body, set, error }) => {
      const [newTodo] = await db
          .insert(todos)
          .values(body)
          .returning();
      if(!newTodo){
          return error(500, 'Todo could not be created.')
      }
      set.status = 'Created';
      return newTodo;
    },
    {
      body: t.Object({
        desc: t.String()
      })
    }
  )
  .put(
    '/todos/:id',
    async ({params, body, error}) => {
        const [updatedTodo] = await db
            .update(todos)
            .set(body)
            .where(eq(todos.id, params.id))
            .returning();
        if(!updatedTodo){
            return error(500, 'Todo could not be updated.')
        }
        return updatedTodo;
    },
    {
      params: t.Object({
        id: t.Numeric()
      }),
      body: t.Object({
        starred: t.Boolean(),
        completed: t.Boolean(),
        desc: t.String()
      })
    }
  )
  .patch(
    '/todos/:id',
    async ({params, body, error}) => {
        const [updatedTodo] = await db
            .update(todos)
            .set(body)
            .where(eq(todos.id, params.id))
            .returning();
        if (!updatedTodo) {
            return error(500, 'Todo could not be updated.')
        }
        return updatedTodo;
    },
    {
      params: t.Object({
        id: t.Numeric()
      }),
      body: t.Object({
        desc: t.Optional(t.String()),
        starred: t.Optional(t.Boolean()),
        completed: t.Optional(t.Boolean())
      })
    }
  )
    .delete(
        '/todos/:id',
    async ({params, set, error}) => {
        const [deletedTodo] = await db
            .delete(todos)
            .where(eq(todos.id, params.id))
            .returning();
        if (!deletedTodo) {
            return error(500, 'Todo could not be deleted.')
        }
        set.status = 'No Content';
    },
    {
      params: t.Object({
        id: t.Numeric()
      })
    }
  )
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)

export type App = typeof app

/*
 * GET /todos
 * GET /todos/123421
 * POST /todos
 * PUT /todos/1234321 {}
 * PATCH /todos/12312312 {}
 * DELETE /todos/1231231
 */
