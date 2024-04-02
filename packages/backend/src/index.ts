import { Elysia, t } from 'elysia'
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
        return error(404)
      }
      return todo
    },
    {
      params: t.Object({
        id: t.Numeric()
      })
    })
    .delete('/todos/delete/:id', ({params, error}) => {
        const todoId = parseInt(params.id);
        const todos = TODOS.filter((todo) => todo.id !== todoId)
        if (TODOS.length == todos.length){
            return error(404)
        }
        TODOS = todos
        return TODOS
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
            return TODOS;
        }
        return error(404, 'Todo description is required.');

    })
    .put('/todos/:id', ({params, body, error}) => {
        const todoId = parseInt(params.id);
        const index = TODOS.findIndex(todo => todo.id === todoId);
        if (index === -1) {
            return error(404, 'Todo not found');
        }
        const updatedTodo = {
            ...TODOS[index],
            ...body
        };
        TODOS[index] = updatedTodo;
        return TODOS
    })
    .patch('/todos/:id', ({ params, body, error }) => {
        const todoId = parseInt(params.id);
        const index = TODOS.findIndex(todo => todo.id === todoId);
        if (index === -1) {
            return error(404, 'Todo not found');
        }
        const updatedTodo = {
            ...TODOS[index],
            ...body
        };
        TODOS[index] = updatedTodo;
        return TODOS[index];
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
