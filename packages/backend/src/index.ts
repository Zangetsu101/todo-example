import cors from '@elysiajs/cors'
import { Elysia, t } from 'elysia'
import { eq } from 'drizzle-orm'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { db } from './db/db'
import { todos } from './db/schema'

migrate(db, { migrationsFolder: './drizzle' })

const todoList = [
  {
    id: 1,
    starred: false,
    completed: false,
    desc: 'Wake up at 5am'
  },
  {
    id: 2,
    starred: false,
    completed: false,
    desc: 'Brush your teeth'
  },
  {
    id: 3,
    starred: false,
    completed: false,
    desc: "I don't know what to do!"
  },
  {
    id: 4,
    starred: true,
    completed: true,
    desc: "Yeah, I don't know yet!"
  }
]

const app = new Elysia()
  .use(cors())
  .get('/todos', () => db.select().from(todos))
  .get(
    '/todos/:id',
    ({ params, error }) => {
      const todo = todoList.find((todo) => todo.id === params.id)

      if (!todo) {
        return error(404, 'Todo not found.')
      }

      return todo
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
      const todo = await db
        .select()
        .from(todos)
        .where(eq(todos.id, params.id))

      if (!todo) {
        return error(404, 'Todo can not be updated.')
      }

      const updatedTodo = await db
        .update(todos)
        .set(body)
        .where(eq(todos.id, params.id))
        .returning()

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
      if (!todo) {
        return error(404)
      }
      const updatedTodo = await db
        .update(todos)
        .set(body)
        .where(eq(todos.id, params.id))
        .returning()
        return updatedTodo[0]
    },
    {
      params: t.Object({
        id: t.Numeric()
      }),
      body: t.Object({
        starred: t.Optional(t.Boolean()),
        completed: t.Optional(t.Boolean()),
        desc: t.Optional(t.String())
      })
    }
  )

  .delete(
    '/todos/:id',
    async ({ params, error, set }) => {
      const todo = await db.select().from(todos).where(eq(todos.id, params.id))
      if (!todo) {
        return error(404, 'Todo not found')
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
