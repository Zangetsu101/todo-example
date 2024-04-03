import { default as Elysia, t } from 'elysia'
let globalId = 3

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
        return error(404, 'Todo not found.')
      }
      return todo
    },
    {
      params: t.Object({
        id: t.Numeric()
      })
    })
    .delete('/todos/:id', ({params, error}) => {
        const index = TODOS.findIndex(todo => todo.id === params.id)
        if (index === -1) {
            return error(404, 'Todo to be deleted not found.')
        }
        const todos = TODOS.filter((todo) => todo.id !== params.id)
        TODOS = todos
        return {"message": "Deletion successful"}
        },{
        params: t.Object({
            id: t.Numeric()
        })
    })
    .post('/todos', ({ params, error, body }) => {
        if (body && body.desc) {
            const newTodo = {
                id: globalId,
                desc: body.desc,
                starred: body.starred || false,
                completed: body.completed || false
            };
            globalId++; // Increment globalId for the next todo
            TODOS.push(newTodo);
            return {"message": "Todo added."};
        }
        return error(400, 'Todo description is required.');

    })
    .put('/todos/:id', ({params, body, error}) => {
        const todoId = parseInt(params.id);
        const index = TODOS.findIndex(todo => todo.id === todoId);
        if (index === -1) {
            return error(404, 'Todo to be updated not found');
        }
        // Validate that all todo properties are included in the request body
        if (!body || !body.desc || !('starred' in body) || !('completed' in body)) {
            return error(400, 'All todo properties must be included in the request body');
        }
        const updatedTodo = {
            id: todoId,
            desc: body.desc,
            starred: body.starred,
            completed: body.completed
        };
        TODOS[index] = updatedTodo;
        return {"message": "Put update successful."}
    })
    .patch('/todos/:id', ({ params, body, error }) => {
        const todoId = parseInt(params.id);
        const index = TODOS.findIndex(todo => todo.id === todoId);
        if (index === -1) {
            return error(404, 'Todo to be updated not found');
        }
        TODOS[index] = {
            ...TODOS[index],
            ...body
        };
        return {"message": "Patch update successful."}
    })

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
