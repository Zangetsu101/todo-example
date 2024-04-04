import { t } from 'elysia'

const TodoPartialUpdateDTO = t.Object({
  starred: t.Optional(
    t.Boolean({
      error: 'Starred must be boolean.'
    })
  ),
  completed: t.Optional(
    t.Boolean({
      error: 'Completed must be boolean.'
    })
  )
})

export default TodoPartialUpdateDTO
