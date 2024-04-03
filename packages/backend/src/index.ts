import { Elysia, t } from 'elysia'

const TODOS = [
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
  }
]

let idCounter = 3

const app = new Elysia()
  .get('/todos', () => TODOS)
  .get(
    '/todos/:id',
    ({ params, error }) => {
      const todo = TODOS.find((todo) => todo.id === params.id)
      if (!todo) {
        return error(404)
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
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
/*
 * GET /todos
 * GET /todos/123421
 * POST /todos
 * PUT /todos/1234321 {}
 * PATCH /todos/12312312 {}
 * DELETE /todos/1231231
 */
