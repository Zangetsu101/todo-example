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
      const id = Math.max(...TODOS.map(todo => todo.id), 0) + 1;
      TODOS.push({ id, ...body });
      return { id, ...body };
    },
    {
      body: t.Object({
        starred: t.Boolean(),
        completed: t.Boolean(),
        desc: t.String()
      })
    }
  )
  
  .put(
    '/todos/:id',
    ({ params, body, error }) => {
      const index = TODOS.findIndex(todo => todo.id === Number(params.id));
      if (index === -1) {
        return error(404);
      }
      TODOS[index] = { id: Number(params.id), ...body };
      return TODOS[index];
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
      const index = TODOS.findIndex(todo => todo.id === Number(params.id));
      if (index === -1) {
        return error(404);
      }
      TODOS[index] = { ...TODOS[index], ...body };
      return TODOS[index];
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
  .delete(
    '/todos/:id',
    ({ params, error }) => {
      const index = TODOS.findIndex(todo => todo.id === Number(params.id));
      if (index === -1) {
        return error(404);
      }
      TODOS.splice(index, 1);
      return { success: true };
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
