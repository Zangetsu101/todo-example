import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const todos = sqliteTable('todos', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  starred: integer('id', { mode: 'boolean' }),
  completed: integer('id', { mode: 'boolean' }),
  desc: text('desc')
})
