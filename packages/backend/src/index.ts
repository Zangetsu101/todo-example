import { Elysia, t } from 'elysia'
let id = 2

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
    '/addTodo',
    ({ body }) => {
      const newTodo = { id: ++id, ...body, }
      TODOS.push(newTodo)
      return newTodo
    },
    {
      body: t.Object({
        starred: t.Boolean(),
        completed: t.Boolean(),
        desc: t.String()
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
