import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow
} from '@/components/ui/table'
import { Checkbox } from './components/ui/checkbox'
import { Label } from './components/ui/label'
import { Button } from './components/ui/button'
import { StarIcon, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Input } from './components/ui/input'
import type { App } from 'backend/src/index'
import { treaty } from '@elysiajs/eden'

const client = treaty<App>('localhost:3000')

function Delete({
  id,
  onDelete
}: {
  id: number
  onDelete: (id: number) => void
}) {
  return (
    <Button
      onClick={() => onDelete(id)}
      variant="ghost"
      size="icon"
      className="rounded-3xl"
    >
      <Trash2 className="h-4 w-4 text-red-500" />
    </Button>
  )
}

function Star({
  id,
  starred,
  toggleStar
}: {
  id: number
  starred: boolean
  toggleStar: (id: number) => void
}) {
  return (
    <Button
      onClick={() => toggleStar(id)}
      variant="ghost"
      size="icon"
      className="rounded-3xl"
    >
      {starred ? (
        <StarIcon className="h-4 w-4 text-yellow-300" fill="#fde047" />
      ) : (
        <StarIcon className="h-4 w-4 text-yellow-300" />
      )}
    </Button>
  )
}

type Todo = NonNullable<
  Awaited<ReturnType<typeof client.todos.get>>['data']
>[number]

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    client.todos.get().then((res) => {
      if (res.error) {
        res.error
      }
      if (res.data) {
        setTodos(res.data)
      }
    })
  }, [])

  const handleDelete = (id: number) => {
    client
      .todos({ id })
      .delete()
      .then((res) => {
        if (res.error) {
          res.error
        } else {
          setTodos(todos.filter((todo) => todo.id !== id))
        }
      })
  }

  const toggleStar = (id: number) => {
    const todo = todos.find((todo) => todo.id === id)
    if (!todo) {
      return
    }
    client
      .todos({ id })
      .patch({
        starred: !todo.starred
      })
      .then((res) => {
        if (res.error) {
          res.error
        }
        if (res.data) {
          setTodos(
            todos.map((todo) =>
              todo.id === id ? { ...todo, starred: !todo.starred } : todo
            )
          )
        }
      })
  }

  const toggleChecked = (id: number) => {
    const todo = todos.find((todo) => todo.id === id)
    if (!todo) {
      return
    }
    client
      .todos({ id })
      .patch({
        completed: !todo.completed
      })
      .then((res) => {
        if (res.error) {
          res.error
        }
        if (res.data) {
          setTodos(
            todos.map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
          )
        }
      })
  }

  const addTodo = () => {
    client.todos
      .post({
        desc: inputRef.current!.value
      })
      .then((res) => {
        if (res.error) {
          res.error
        }
        if (res.data) {
          setTodos([...todos, ...res.data])
        }
      })
    inputRef.current!.value = ''
  }

  return (
    <main className="mx-auto mt-8 max-w-prose">
      <h1 className="text-center text-xl">My todos</h1>
      <Table>
        <TableCaption>A list of your todos.</TableCaption>
        <TableBody>
          {[
            ...todos.filter(({ starred }) => starred),
            ...todos.filter(({ starred }) => !starred)
          ].map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>
                <Checkbox
                  id={todo.id.toString()}
                  checked={todo.completed}
                  onCheckedChange={() => toggleChecked(todo.id)}
                />
              </TableCell>
              <TableCell>
                <Label htmlFor={todo.id.toString()}>{todo.desc}</Label>
              </TableCell>
              <TableCell className="text-right">
                <Star
                  id={todo.id}
                  starred={todo.starred}
                  toggleStar={toggleStar}
                />
                <Delete id={todo.id} onDelete={handleDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <form
        className="mt-8 flex space-x-2"
        onSubmit={(e) => {
          e.preventDefault()
          addTodo()
        }}
      >
        <Input ref={inputRef} type="text" placeholder="To do" />
        <Button type="submit">Add</Button>
      </form>
    </main>
  )
}

export default App
