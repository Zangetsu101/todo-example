import { Elysia, t } from "elysia";

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
    desc: 'Wake up at 5am'
  },
  {
    id: 3,
    starred: false,
    completed: false,
    desc: 'Brush your teeth'
  }
]

const app = new Elysia()
    .state('id', TODOS.length)
    .get("/", () => "Hello Elysia")
    .get("/home", () => "Hello Home")
    .get("todos", ({set}) => {
        set.status = 202
        return TODOS
    })
    .get('/jsons', () => ({
      hi: 'Elysia'
    }))
    .get("/todos/admin/*", ({params}) => params["*"])
    .get(
      "/todos/:id", 
      ({params, set, error}) => {
          const todo = TODOS.filter((todo) => todo.id === params.id)
          if(Array.isArray(todo) && todo.length === 0) {
            set.redirect = 'https://www.youtube.com/watch?v=1Max9huISzA&list=PLgH5QX0i9K3r6ZGeyFnSv_YDxVON2P85m&index=11'
          }
          return todo;
      },
      {
          params: t.Object({
            id: t.Numeric()
          })
      }
    )
    .post(
      '/todos', 
      ({body, set, store, error}) => {
          body.desc = body.desc.trim()
          if(body.desc.length < 3 || body.desc.length > 255) {
            return error(400, 'Description must be 3-255 characters.');
          }
          store.id++
          const newTodo = {id: store.id, starred: false, completed: false, ...body}
          TODOS = [...TODOS, newTodo]
          set.status = 202
          return TODOS;
      },
      {
        body: t.Object({
          desc: t.String({
            minLength: 3,
            maxLength: 255,
            error: `Description must be 3-255 characters.`
          })
        }),
      }
    )
    .put(
      '/todos/:id',
      ({params, body, set, error}) => {
          body.desc = body.desc.trim()
          if(body.desc.length < 3 || body.desc.length > 255) {
            return error(400, 'Description must be 3-255 characters.');
          }
          let myTodo = {id: params.id, ...body}
          const updatedTodos = TODOS.map((todo) => {
              if(todo.id === params.id) {
                  todo = {...myTodo}
              }
              return todo
          })
          TODOS = [...updatedTodos]
          if(!myTodo) {
              return error(404, 'Not Found Resource')
          }
          set.status = 202
          return myTodo
      },
      {
        params: t.Object({
            id: t.Numeric()
        }),
        body: t.Object({
          starred: t.Boolean(),
          completed: t.Boolean(),
          desc: t.String({
            minLength: 3,
            maxLength: 255,
            error: `Description must be 3-255 characters.`
          })
        }),
      }
    )
    .patch(
      '/todos/:id',
      ({ params, body, set, error }) => {
        const todoId = params.id;
        const updatedTodoIndex = TODOS.findIndex(todo => todo.id === todoId);
    
        if (updatedTodoIndex === -1) {
          return error(404, 'Todo Not Found');
        }
    
        if(body.desc) {
            body.desc = body.desc.trim()
            if(body.desc.length < 3 || body.desc.length > 255) {
              return error(400, 'Description must be 3-255 characters.');
            }
        }

        TODOS[updatedTodoIndex] = { ...TODOS[updatedTodoIndex], ...body }
        
        

        set.status = 200;
        return TODOS[updatedTodoIndex];
      },
      {
        params: t.Object({
          id: t.Numeric()
        }),
        body: t.Object({
          desc: t.Optional(t.String()),
          starred: t.Optional(t.Boolean()),
          completed: t.Optional(t.Boolean())
        }),
      }
    )
    
    .delete(
      '/todos/:id',
      ({params, error, set}) => {
        const newTodos = TODOS.filter((todo) => todo.id !== params.id)
        if(newTodos.length === TODOS.length) {
          set.status = 404
          return error(404, 'Todo Not Found')
        }
        TODOS = [...newTodos]
        set.status = 200
        return TODOS
      },
      {
        params: t.Object({
          id: t.Numeric()
        })
      }
      
    )
    .onError(({code}) =>{
      if(code === 'NOT_FOUND') 
          return 'Route not Found ;('
    })
    .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
