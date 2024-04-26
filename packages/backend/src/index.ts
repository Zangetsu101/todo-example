import cors from '@elysiajs/cors'
import { eq } from 'drizzle-orm'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { Elysia, t } from 'elysia'
import { db } from './db/db'
import { todos } from './db/schema'

migrate(db, { migrationsFolder: './drizzle' })

const app = new Elysia()
  .use(cors())
  .get('/todos', () => db.select().from(todos))
  .get(
    '/todos/:id',
    async ({ params, error }) => {
      const todo = await db.select().from(todos).where(eq(todos.id, params.id))

      if (!todo[0]) {
        return error(404, 'Todo not found.')
      }

      return todo[0]
    },
    {
      params: t.Object({
        id: t.Numeric()
      })
    }
  )
  .post(
    '/todos',
    async ({ body, set }) => {
      const newTodo = await db.insert(todos).values(body).returning()

      set.status = 'Created'
      return newTodo
    },
    {
      body: t.Object({
        desc: t.String()
      })
    }
  )
  .put(
    '/todos/:id',
    async ({ params, body, error }) => {
      const todo = await db.select().from(todos).where(eq(todos.id, params.id))

      if (!todo[0]) {
        return error(404, 'Todo not found.')
      }

      const updatedTodo = await db
        .update(todos)
        .set(body)
        .where(eq(todos.id, params.id))
        .returning()

      if (!updatedTodo[0]) {
        return error(403, 'Todo can not be updated.')
      }

      return updatedTodo[0]
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
    async ({ params, body, error }) => {
      const todo = await db.select().from(todos).where(eq(todos.id, params.id))

      if (!todo[0]) {
        return error(404, 'Todo not found.')
      }

      const updatedTodo = await db
        .update(todos)
        .set(body)
        .where(eq(todos.id, params.id))
        .returning()

      if (!updatedTodo[0]) {
        return error(403, 'Todo can not be updated.')
      }

      return updatedTodo[0]
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
    async ({ params, error, set }) => {
      const todo = await db.select().from(todos).where(eq(todos.id, params.id))

      if (!todo) {
        return error(404, 'Todo not found.')
      }

      await db.delete(todos).where(eq(todos.id, params.id))

      set.status = 'No Content'
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
