import { Elysia, t } from 'elysia'

let TODOS = [
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

/*
 * GET /todos
 * POST /todos
 * GET /todos/123421
 * PUT /todos/1234321 {}
 * PATCH /todos/12312312 {}
 * DELETE /todos/1231231
 */

const app = new Elysia()
  .state('id', TODOS.length + 1)
  .get('/todos', () => TODOS)
  .post(
    '/todos',
    ({ body, store, error }) => {
      const newTodo = { id: store.id++, ...body }
      try {
        TODOS = [...TODOS, newTodo]
        return {
          status: 200,
          message: 'success',
          data: newTodo
        }
      } catch (e) {
        return error(500)
      }
    },
    {
      body: t.Object({
        starred: t.Boolean({
          error: 'Starred must be boolean.'
        }),
        completed: t.Boolean({
          error: 'Completed must be boolean.'
        }),
        desc: t.String({
          minLength: 3,
          maxLength: 255,
          error: 'Description must be 3-255 characters.'
        })
      })
    }
  )
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
  .put(
    '/todos/:id',
    ({ params, body, error }) => {
      try {
        const existing = { id: params.id, ...body }
        TODOS = TODOS.map((todo) => {
          if (todo.id == params.id) return existing
          return todo
        })
        return {
          status: 200,
          message: 'success',
          data: existing
        }
      } catch (e) {
        return error(500)
      }
    },
    {
      params: t.Object({
        id: t.Numeric()
      }),
      body: t.Object({
        starred: t.Boolean({
          error: 'Starred must be boolean.'
        }),
        completed: t.Boolean({
          error: 'Completed must be boolean.'
        }),
        desc: t.String({
          minLength: 3,
          maxLength: 255,
          error: 'Description must be 3-255 characters.'
        })
      })
    }
  )
  .patch(
    '/todos/:id',
    ({ params, body, error }) => {
      try {
        let existing = TODOS.find((todo) => params.id == todo.id)

        if (!existing) {
          return error(404, {
            message: 'error'
          })
        }

        existing = { ...existing, completed: body.completed }

        TODOS = TODOS.map((todo) => {
          if (todo.id == params.id) return existing
          return todo
        })
        return {
          status: 200,
          message: 'success',
          data: existing
        }
      } catch (e) {
        return error(500)
      }
    },
    {
      params: t.Object({
        id: t.Numeric()
      }),
      body: t.Object({
        completed: t.Boolean({
          error: 'Completed must be boolean.'
        })
      })
    }
  )
  .delete(
    '/todos/:id',
    ({ params, error }) => {
      try {
        const existing = TODOS.find((todo) => params.id == todo.id)

        if (!existing) {
          return error(404, {
            message: 'error'
          })
        }
        TODOS = TODOS.filter((todo) => todo.id != params.id)
        return {
          status: 200,
          message: 'success'
        }
      } catch (e) {
        return error(500)
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
