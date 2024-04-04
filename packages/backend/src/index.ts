import { Elysia, t } from 'elysia'

let TODOS = [
  {
    id: 1,
    started: false,
    completed: false,
    desc: 'Wake up at 5am'
  },
  {
    id: 2,
    started: false,
    completed: false,
    desc: 'Brush your teeth'
  },
  {
    id: 3,
    started: false,
    completed: false,
    desc: 'Berakfast in 8am'
  },
  {
    id: 4,
    started: false,
    completed: false,
    desc: 'Go to exercise'
  },
  {
    id: 5,
    started: false,
    completed: false,
    desc: 'Go to office'
  }
]
const ID = TODOS.length + 1

const app = new Elysia()
  .state('id', ID)
  .model({
    paramCheck: t.Object({
      id: t.Numeric()
    })
  })
  .get('/todos', () => TODOS)
  .get(
    '/todos/:id',
    ({ params, error }) => {
      const todo = TODOS.find((todo) => todo.id === params.id)
      if (!todo) {
        return error(404, 'Todo not found')
      }
      return todo
    },
    {
      params: 'paramCheck'
    }
  )
  .patch(
    '/todos/:id',
    ({ body, params, error }) => {
      let hasTodo = false
      TODOS.forEach((todo) => {
        if (todo.id === params.id) {
          hasTodo = true
          Object.assign(todo, body)
        }
      })
      if (!hasTodo) {
        return error(204)
      }
      return body
    },
    {
      params: 'paramCheck',
      body: t.Object({
        desc: t.Optional(
          t.String({
            minLength: 1,
            error: 'description cannot be empty'
          })
        ),
        completed: t.Optional(t.Boolean()),
        starred: t.Optional(t.Boolean())
      })
    }
  )
  .delete(
    '/todos/:id',
    ({ params, error }) => {
      let hasTodo = false
      TODOS = TODOS.filter((todo) => {
        if (todo.id === params.id) {
          hasTodo = true
        } else {
          return true
        }
      })
      if (!hasTodo) {
        return error(204)
      }
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