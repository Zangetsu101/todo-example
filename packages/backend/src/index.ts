import { Elysia, t } from 'elysia'
import TodoAddDTO from './dtos/TodoAddDTO'
import TodoUpdateDTO from './dtos/TodoUpdateDTO'
import TodoPartialUpdateDTO from './dtos/TodoPartialUpdateDTO'

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

/*
 * GET /todos
 * POST /todos
 * GET /todos/123421
 * PUT /todos/1234321 {}
 * PATCH /todos/12312312 {}
 * DELETE /todos/1231231
 */

const app = new Elysia()
  .model({
    params: t.Object({
      id: t.Numeric()
    })
  })
  .state('id', TODOS.length + 1)
  .get('/todos', () => TODOS)
  .post(
    '/todos',
    ({ body, store, set }) => {
      const newTodo = {
        id: store.id++,
        starred: body.starred ? body.starred : false,
        completed: body.completed ? body.completed : false,
        ...body
      }

      try {
        TODOS = [...TODOS, newTodo]
        set.status = 201
        return {
          success: true,
          data: newTodo
        }
      } catch (e) {
        return {
          success: false
        }
      }
    },
    {
      body: TodoAddDTO
    }
  )
  .get(
    '/todos/:id',
    ({ params, set }) => {
      const todo = TODOS.find((todo) => todo.id === params.id)
      if (!todo) {
        set.status = 204
        return {
          success: false
        }
      }
      return todo
    },
    {
      params: 'params'
    }
  )
  .put(
    '/todos/:id',
    ({ params, body, set }) => {
      try {
        let existing = TODOS.find((todo) => todo.id == params.id)

        if (!existing) {
          set.status = 204
          return {
            success: false
          }
        }

        existing = { id: params.id, ...body }

        TODOS = TODOS.map((todo) => {
          if (todo.id == params.id) return existing
          return todo
        })

        return {
          success: true,
          data: existing
        }
      } catch (e) {
        return {
          success: false
        }
      }
    },
    {
      params: 'params',
      body: TodoUpdateDTO
    }
  )
  .patch(
    '/todos/:id',
    ({ params, body, set }) => {
      try {
        let existing = TODOS.find((todo) => params.id == todo.id)

        if (!existing) {
          set.status = 204
          return {
            success: false
          }
        }

        existing = {
          ...existing,
          completed: body.completed ? body.completed : false,
          starred: body.starred ? body.starred : false
        }

        TODOS = TODOS.map((todo) => {
          if (todo.id == params.id) return existing
          return todo
        })

        return {
          success: true,
          data: existing
        }
      } catch (e) {
        return {
          success: false
        }
      }
    },
    {
      params: 'params',
      body: TodoPartialUpdateDTO
    }
  )
  .delete(
    '/todos/:id',
    ({ params, set }) => {
      try {
        const existing = TODOS.find((todo) => params.id == todo.id)

        if (!existing) {
          set.status = 204
          return {
            success: false
          }
        }
        TODOS = TODOS.filter((todo) => todo.id != params.id)
        return {
          success: true
        }
      } catch (e) {
        return {
          success: false
        }
      }
    },
    {
      params: 'params'
    }
  )

  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
