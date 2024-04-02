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
    ({ body }) => {
      const newTodo = { ...body, id: TODOS.length + 1, starred: false, completed: false }
      TODOS.push(newTodo)
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
    ({ params, body, error }) => {
      const todoIndex = TODOS.findIndex(todo => todo.id === params.id)
      if (todoIndex === -1) {
        return error(404, 'Todo not found')
      }
      TODOS[todoIndex] = { ...TODOS[todoIndex], ...body, id: params.id }
      return TODOS[todoIndex]
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

  .delete(
    '/todos/:id',
    ({ params, error }) => {
      const todoIndex = TODOS.findIndex(todo => todo.id === params.id)
      if (todoIndex === -1) {
        return error(404, 'Todo not found')
      }
      TODOS.splice(todoIndex, 1)
      return { success: true }
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
/*
 * GET /todos
 * GET /todos/123421
 * POST /todos
 * PUT /todos/1234321 {}
 * PATCH /todos/12312312 {}
 * DELETE /todos/1231231
 */
