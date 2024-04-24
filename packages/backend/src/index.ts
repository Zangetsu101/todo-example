import { Elysia, t } from 'elysia'

let noteId = 3

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
    '/todos/',
    ({ body }) => {
      const desc = body
      const newTodo = {
        id: noteId++,
        starred: false,
        completed: false,
        desc: desc
      }
      TODOS = [...TODOS, newTodo]
    },
    {
      body: t.String()
    }
  )
  .put(
    '/todos/:id',
    ({ params: { id }, body }) => {
      let done = true
      for (let i = 0; i < TODOS.length; ++i) {
        if (TODOS[i].id === id) {
          const newTodo = {
            id: id,
            ...body
          }
          TODOS[i] = newTodo
          done = false
          break
        }
      }
      if (done) {
        const newTodo = {
          id: id,
          ...body
        }
        TODOS = [...TODOS, newTodo]
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
    ({ params, body, error }) => {
      if (TODOS.some((todo) => todo.id === params.id) === false)
        return error(404, 'Not Found')
      for (let i = 0; i < TODOS.length; ++i) {
        if (TODOS[i].id === params.id) {
          if (body.starred !== undefined) {
            TODOS[i].starred = body.starred
          }
          if (body.completed !== undefined) {
            TODOS[i].completed = body.completed
          }
          if (body.desc !== undefined) {
            TODOS[i].desc = body.desc
          }
        }
      }
    },
    {
      params: t.Object({ id: t.Numeric() }),
      body: t.Object({
        starred: t.Optional(t.Boolean()),
        completed: t.Optional(t.Boolean()),
        desc: t.String()
      })
    }
  )
  .delete(
    '/todos/:id',
    ({ params, error }) => {
      if (TODOS.some((e) => e.id === params.id)) {
        const newTodo = TODOS.filter((todo) => todo.id != params.id)
        TODOS = [...newTodo]
      } else return error(404, 'Not Found')
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
