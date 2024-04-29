import cors from '@elysiajs/cors'
import { Elysia, t } from 'elysia'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { db } from './db/db'
import { todos } from './db/schema'
import { eq } from 'drizzle-orm'

migrate(db, { migrationsFolder: './drizzle' })

const app = new Elysia()
  .use(cors())
  .get('/todos', () => db.select().from(todos))
  .get(
    '/todos/:id',
    async ({ params, error }) => {
      try {
        const [todo] = await db
          .select()
          .from(todos)
          .where(eq(todos.id, params.id))

        if (!todo) {
          return error(404, 'Todo not found.')
        }

        return todo
      } catch (err) {
        console.error(err)
        return error(500, 'Internal Server Error')
      }
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
      try {
        const [newTodo] = await db.insert(todos).values(body).returning()
        set.status = 'Created'
        return newTodo
      } catch (err) {
        console.error(err)
        return error(500, 'Internal Server Error')
      }
    },
    {
      body: t.Object({
        desc: t.String(),
        starred: t.Boolean(),
        completed: t.Boolean()
      })
    }
  )
  .put(
    '/todos/:id',
    async ({ params, body, error }) => {
      try {
        const [updatedTodo] = await db
          .update(todos)
          .set(body)
          .where(eq(todos.id, params.id))
          .returning()

        if (!updatedTodo) {
          return error(204, 'Todo can not be updated.')
        }

        return updatedTodo
      } catch (err) {
        console.error(err)
        return error(500, 'Internal Server Error')
      }
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
      try {
        const [updatedTodo] = await db
          .update(todos)
          .set(body)
          .where(eq(todos.id, params.id))
          .returning()

        if (!updatedTodo) {
          return error(204, 'Todo can not be updated.')
        }

        return updatedTodo
      } catch (err) {
        console.error(err)
        return error(500, 'Internal Server Error')
      }
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
    async ({ params, error }) => {
      try {
        const [deletedTodo] = await db
          .delete(todos)
          .where(eq(todos.id, params.id))
          .returning()

        if (!deletedTodo) {
          return error(204, 'Todo can not be deleted.')
        }

        return deletedTodo
      } catch (err) {
        console.error(err)
        return error(500, 'Internal Server Error')
      }
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
