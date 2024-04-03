import { Elysia, error, t } from 'elysia'
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
let id = TODOS.length
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
      const newTodo = { id: ++id, starred: false, completed: false, ...body }
      TODOS.push(newTodo)
      return newTodo
    },
    {
      body: t.Object({
        desc: t.String({
          minLength: 3,
          maxLength: 2000
        })
      })
    }
  )
  .put(
    'todos/:id',
    ({ params, body, error }) => {
      let flag = false
      let updatedTodo
      TODOS.map((todo) => {
        if (todo.id === params.id) {
          todo = { id: params.id, ...body }
          updatedTodo = todo
          flag = true
          console.log('update done')
        }
      })
      if (!flag) {
        return error(404, 'No todo record found')
      }
      return updatedTodo
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
    'todos/:id',
    ({ params, body, error }) => {
      let flag = false
      let updatedTodo
      TODOS.map((todo) => {
        if (todo.id === params.id) {
          if (body.starred != undefined) todo.starred = body.starred
          if (body.completed != undefined) todo.completed = body.completed
          updatedTodo = todo
          flag = true
        }
      })
      if (!flag) {
        return error(404, 'No todo record found')
      }
      return updatedTodo
    },
    {
      params: t.Object({
        id: t.Numeric()
      }),
      body: t.Object({
        starred: t.Optional(t.Boolean()),
        completed: t.Optional(t.Boolean())
      })
    }
  )
  .delete(
    'todos/:id',
    ({ params }) => {
      const todo = TODOS.find((todo) => todo.id === params.id)
      if (!todo) {
        return error(404, 'No records belongs to that id')
      }
      TODOS = TODOS.filter((todo) => todo.id !== params.id)
      return TODOS
    },
    {
      params: t.Object({
        id: t.Numeric()
      })
    }
  )

  .listen(3000)

console.log(`Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
/*
 * GET /todos
 * GET /todos/123421

 * POST /todos
 * PUT /todos/1234321 {}
 * PATCH /todos/12312312 {}
 * DELETE /todos/1231231
 */
