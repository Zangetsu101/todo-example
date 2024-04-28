import cors from '@elysiajs/cors'
import { Elysia, t } from 'elysia'
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

let idCounter = 3

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
    ({ params, body, error }) => {
      const todo = todoList.find((todo) => todo.id === params.id)

      if (!todo) {
        return error(204, 'Todo can not be updated.')
      }

      Object.assign(todo, body)

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
    ({ params, body, error }) => {
      const todo = todoList.find((todo) => todo.id === params.id)

      if (!todo) {
        return error(204, 'Todo can not be updated.')
      }

      Object.assign(todo, body)

      return todo
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
    ({ params, error }) => {
      const todo = todoList.find((todo) => todo.id === params.id)

      if (!todo) {
        return error(204, 'Todo can not be deleted.')
      }

      todoList.splice(todoList.indexOf(todo), 1)

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
    ({ body, error }) => {
      if (!body.desc) {
        return error(400, 'Description is required')
      }

      const todo = {
        id: idCounter++,
        starred: false,
        completed: false,
        desc: body.desc
      }
      TODOS.push(todo)

      return todo
    },
    {
      body: t.Object({
        desc: t.String()
      })
    }
  )
  .put(
    '/todos/:id',
    ({ params, body, error }) => {
      if (!body.desc || !body.starred || !body.completed) {
        return error(
          400,
          'Description, starred, and completed fields are required'
        )
      }

      const todoToUpdate = TODOS.find((todo) => todo.id === params.id)
      if (!todoToUpdate) {
        return error(404, 'Todo not found')
      }

      todoToUpdate.desc = body.desc
      todoToUpdate.starred = body.starred
      todoToUpdate.completed = body.completed

      console.log(todoToUpdate)

      return todoToUpdate
    },
    {
      params: t.Object({
        id: t.Numeric()
      }),
      body: t.Object({
        desc: t.String(),
        starred: t.Boolean(),
        completed: t.Boolean()
      })
    }
  )
  .patch(
    '/todos/:id',
    ({ params, body, error }) => {
      if (!body.desc && !body.starred && !body.completed) {
        return error(
          400,
          'Description, starred, or completed field is required'
        )
      }

      const todoToUpdate = TODOS.find((todo) => todo.id === params.id)
      if (!todoToUpdate) {
        return error(404, 'Todo not found')
      }

      if (body.desc !== undefined) {
        todoToUpdate.desc = body.desc
      }
      if (body.starred !== undefined) {
        todoToUpdate.starred = body.starred
      }
      if (body.completed !== undefined) {
        todoToUpdate.completed = body.completed
      }
      console.log(todoToUpdate)

      return todoToUpdate
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
    ({ params, error }) => {
      const todoIndex = TODOS.findIndex((todo) => todo.id === params.id)
      if (todoIndex === -1) {
        return error(404, 'Todo not found')
      }

      TODOS.splice(todoIndex, 1)

      return { message: 'Todo deleted successfully' }
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
