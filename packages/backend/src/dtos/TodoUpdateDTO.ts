import { t } from 'elysia'

const TodoUpdateDTO = t.Object({
  starred: t.Boolean({
    error: 'Starred must be boolean.'
  }),
  completed: t.Boolean({
    error: 'Completed must be boolean.'
  }),
  desc: t.String({
    minLength: 3,
    maxLength: 255,
    error: 'Description must be 3-255 characters.'
  })
})

export default TodoUpdateDTO
