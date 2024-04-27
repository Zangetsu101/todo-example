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
  .get('/todos', async () => await db.select().from(todos))
  .get(
    '/todos/:id',
    async ({ params, error }) => {
      try {
        const todo = await db
          .select()
          .from(todos)
          .where(eq(todos.id, params.id))
        if (!todo.length) {
          return error(404, 'Todo not found.')
        }
        return todo
      } catch (err) {
        return error(500, 'Internal server error.')
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
        const newTodo = await db.insert(todos).values(body).returning()
        set.status = 'Created'
        return newTodo
      } catch (err) {
        return error(500)
      }
    },
    {
      body: t.Object({
        desc: t.String(),
        completed: t.Optional(t.Boolean()),
        starred: t.Optional(t.Boolean())
      })
    }
  )
  .put(
    '/todos/:id',
    async ({ params, body, error, set }) => {
      try {
        const updatedTodo = await db
          .update(todos)
          .set({
            desc: body.desc,
            starred: body.starred,
            completed: body.completed
          })
          .where(eq(todos.id, params.id))
          .returning()
        if (!updatedTodo.length) {
          return error(204)
        }
        set.status = 202
        return updatedTodo
      } catch (err) {
        return error(500)
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
      const [oldTodo] = await db
        .select()
        .from(todos)
        .where(eq(todos.id, params.id))
      if (!oldTodo) {
        return error(204)
      }
      try {
        const todo = await db
          .update(todos)
          .set({
            starred: body.starred,
            desc: body.desc,
            completed: body.completed
          })
          .where(eq(todos.id, params.id))
          .returning()
        return todo
      } catch (err) {
        return error(500)
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
      // const todo = todoList.find((todo) => todo.id === params.id)
      const deletedUser = await db
        .delete(todos)
        .where(eq(todos.id, params.id))
        .returning()
      if (!deletedUser.length) {
        return error(204)
      }
      return deletedUser
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
