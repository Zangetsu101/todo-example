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

let nextTodoId = TODOS.length + 1 

const app = new Elysia()
  .get('/todos', () => TODOS)
  .get(
    '/todos/:id',
    ({ params, error }) => {
      const todo = TODOS.find((todo) => todo.id === Number(params.id))
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
      const newTodo = {
        id: nextTodoId++,
        starred: false,
        completed: false,
        desc: body.desc
      }
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
      const todoIndex = TODOS.findIndex((todo) => todo.id === Number(params.id));
      if (todoIndex === -1) {
        return error(404);
      }
      TODOS[todoIndex] = { id: Number(params.id), ...body };
      return TODOS[todoIndex];
    },
    {
      params: t.Object({
        id: t.Numeric()
      }),
      body: t.Object({
        id: t.Optional(t.Numeric()),
        starred: t.Boolean(),
        completed: t.Boolean(),
        desc: t.String()
      })
    }
  )
  .patch(
    '/todos/:id',
    ({ params, body, error }) => {
      const todo = TODOS.find((todo) => todo.id === Number(params.id));
      if (!todo) {
        return error(404);
      }
      if (body.starred !== undefined) {
        todo.starred = body.starred;
      }
      if (body.completed !== undefined) {
        todo.completed = body.completed;
      }
      if (body.desc !== undefined) {
        todo.desc = body.desc;
      }
      return todo;
    },
    {
      params: t.Object({
        id: t.Numeric()
      }),
      body: t.Object({
        starred: t.Optional(t.Boolean()),
        completed: t.Optional(t.Boolean()),
        desc: t.Optional(t.String())
      })
    }
  ) 
  .delete(
    '/todos/:id',
    ({ params, error }) => {
      const todoIndex = TODOS.findIndex((todo) => todo.id === Number(params.id))
      if (todoIndex === -1) {
        return error(404)
      }
      TODOS.splice(todoIndex, 1)
      return { message: 'Todo item deleted successfully.' }
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
