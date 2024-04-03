import { Elysia, t } from 'elysia'

let todos = [
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
  },
  {
    id: 3,
    starred: false,
    completed: false,
    desc: 'I don\'t know what to do!'
  },
  {
    id: 4,
    starred: true,
    completed: true,
    desc: 'Yeah, I don\'t know yet!'
  }
]

const app = new Elysia()
  .get('/todos', () => todos)
  .get('/todos/:id', ({ params, error }) => {
      const todo = todos.find((todo) => todo.id === params.id);

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
  .post('/todos/create', ({ body, error }) => {
    const newTodo = {
      id: todos.length + 1,
      starred: false,
      completed: false,
      ...body
    };

    todos.push(newTodo);
    
    return newTodo;
  },
  {
    body: t.Object({
      desc: t.String()
    })
  }
  )
  .put('/todos/:id', ({ params, body, error }) => {
    let updated = false;
    todos = todos.map(todo => {
      if (todo.id === params.id) {
        updated = true;

        return { ...todo, ...body, id: params.id };
      }

      return todo;
    });

    if (!updated) {
      return error(404);
    }

    return todos.find(todo => todo.id === params.id);
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
  .patch('/todos/:id', ({ params, body, error }) => {
    let updated = false;

    todos = todos.map(todo => {
      if (todo.id === params.id) {
        updated = true;

        return { ...todo, ...body };
      }

      return todo;
    });

    if (!updated) {
      return error(404);
    }

    return todos.find(todo => todo.id === params.id);
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
  .delete('/todos/:id/delete', ({ params, error }) => {
    const updatedTodos = todos.filter(todo => todo.id !== params.id);

    if (updatedTodos.length === todos.length) {
      return error(404);
    }

    todos = updatedTodos;

    return todos;
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
