import { Elysia, error, t } from 'elysia'

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

const app = new Elysia()
  .state('id', 2)
  .model({
    paramCheck: t.Object({
      id: t.Numeric()
    }),
    bodyCheck: t.Object({
      starred: t.Boolean(),
      completed: t.Boolean(),
      desc: t.String()
    })
  })
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
      params: 'paramCheck'
    }
  )
  .post(
    '/todos',
    ({ body, store }) => {
      const newID = ++store.id
      const newTodo = { id: newID, ...body }
      TODOS.push(newTodo)
      return TODOS
    },
    {
      body: 'bodyCheck'
    }
  )
  .put(
    '/todos/:id',
    ({ body, params, error }) => {
      const todo = TODOS.find((todo) => todo.id === params.id)
      if (!todo) {
        return error(404)
      }
      Object.assign(todo, body)
      return TODOS
    },
    {
      body: 'bodyCheck',
      params: 'paramCheck'
    }
  )
  .patch(
    '/todos/:id',
    ({ body, params, error }) => {
      const todo = TODOS.find((todo) => todo.id === params.id)
      if (!todo) {
        return error(404)
      }
      Object.assign(todo, body)
      return TODOS
    },
    {
      body: t.Object({
        starred: t.Optional(t.Boolean()),
        completed: t.Optional(t.Boolean()),
        desc: t.Optional(t.String())
      }),
      params: 'paramCheck'
    }
  )
  .delete(
    '/todos/:id',
    ({ params, error }) => {
      const todo = TODOS.find((todo) => todo.id === params.id)
      if (!todo) {
        return error(404)
      }
      TODOS.splice(TODOS.indexOf(todo), 1)
      return TODOS
    },
    {
      params: 'paramCheck'
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
