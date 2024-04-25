import cors from '@elysiajs/cors'
import { Elysia, t } from 'elysia'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { db } from './db/db'
import { todos } from './db/schema'
import { eq } from 'drizzle-orm'

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
      await db.insert(todos).values(body)
      set.status = 'Created'
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
        .update(todos)
        .set(body)
        .where(eq(todos.id, params.id))
        .returning()

      if (!todo) {
        return error(204, 'Todo can not be updated.')
      }

      return todo
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
        return error(204, 'Todo can not be updated.')
      }
      Object.assign(todo[0], body)
      const updatedTodo = await db
        .update(todos)
        .set(todo[0])
        .where(eq(todos.id, params.id))
        .returning()

      if (!updatedTodo) {
        return error(204, 'Todo can not be updated.')
      }
      return updatedTodo
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
      const todo = await db
        .delete(todos)
        .where(eq(todos.id, params.id))
        .returning()

      if (!todo) {
        return error(204, 'Todo can not be deleted.')
      }

      return todo
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
