import { t } from 'elysia'

const TodoAddDTO = t.Object({
  starred: t.Optional(t.Boolean()),
  completed: t.Optional(t.Boolean()),
  desc: t.String({
    minLength: 3,
    maxLength: 255,
    error: 'Description must be 3-255 characters.'
  })
})

export default TodoAddDTO
