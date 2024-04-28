import cors from '@elysiajs/cors'
import { Elysia, t } from 'elysia'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { db } from './db/db'
import { todos } from './db/schema'
import { eq } from 'drizzle-orm'

migrate(db, { migrationsFolder: './drizzle' })

const todoList = [
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
    desc: "I don't know what to do!"
  },
  {
    id: 4,
    starred: true,
    completed: true,
    desc: "Yeah, I don't know yet!"
  }
]

const app = new Elysia()
  .use(cors())
  .get('/todos', () => db.select().from(todos))
  .get(
    '/todos/:id',
    async ({params, set, body, error}) => {
      const todo = await db.select().from(todos).where(eq(todos.id, params.id))

      if(!todo[0]) {
        return error(404, 'Todo not found');
      }

      set.status = 'OK'
      return todo[0]
    },
    {
      params: t.Object({
        id: t.Numeric()
      })
    }
  )
  .post(
    '/todos',
    async ({ body, set }) => {
      let newTodo = await db.insert(todos)
                            .values(body)
                            .returning()
      console.log(newTodo)
      set.status = 'Created'
      return {
        "id": newTodo[0].id
      };
    },
    {
      body: t.Object({
        desc: t.String(),
        starred: t.Boolean(),
        completed: t.Boolean()
      })
    }
  )
  .put(
    '/todos/:id',
    async ({params, set, body, error}) => {
      const todo = await db.select().from(todos).where(eq(todos.id, params.id))

      if(!todo[0]) {
        return error(404, 'Todo not found for update');
      }

      const updatedTodo = await db.update(todos)
                                  .set(body)
                                  .where(eq(todos.id, params.id))
                                  .returning()
      if(!updatedTodo[0]) {
        return error(500, 'Todo could not be updated')
      }

      set.status = 'OK'
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
    async ({params, set, body, error}) => {
      const todo = await db.select().from(todos).where(eq(todos.id, params.id))

      if(!todo[0]) {
        return error(404, 'Todo not found for update');
      }

      const updatedTodo = await db.update(todos)
                                  .set(body)
                                  .where(eq(todos.id, params.id))
                                  .returning()
      if(!updatedTodo[0]) {
        return error(500, 'Todo could not be updated')
      }

      set.status = 'OK'
    },
    {
      params: t.Object({
        id: t.Numeric()
      }),
      body: t.Object({
        desc: t.Optional(t.String()),
        starred: t.Optional(t.Boolean()),
        completed: t.Optional(t.Boolean())
      })
    }
  )
  .delete(
    '/todos/:id',
    async ({ params, set, error }) => {
      try {
        const deletedTodo = await db.delete(todos)
                                    .where(eq(todos.id, params.id))
                                    .returning();

        if (!deletedTodo) {
          return error(404, 'Todo not found for deletion.');
        }
        
        set.status = 'No Content'
        return 
      } catch (err) {
        console.error('Error deleting todo:', err);
        return error(500, "Interval server error: " + err);
      }
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

export type App = typeof app

/*
 * GET /todos
 * GET /todos/123421
 * POST /todos
 * PUT /todos/1234321 {}
 * PATCH /todos/12312312 {}
 * DELETE /todos/1231231
 */
