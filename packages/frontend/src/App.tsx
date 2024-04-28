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
    const todo = todos.find((delTodo) => delTodo.id === id)

    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id))

    client
      .todos({ id })
      .delete()
      .then((res) => {
        if (res.error) {
          if (todo) {
            setTodos((prevTodos) => [...prevTodos, { ...todo }])
          }
        }
      })
  }

  const toggleStar = (id: number) => {
    const starredValue = todos.find((todo) => todo.id === id)?.starred
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, starred: !starredValue } : todo
      )
    )

    if (starredValue !== undefined) {
      client
        .todos({ id })
        .patch({ starred: !starredValue })
        .then((res) => {
          if (res.error) {
            if (starredValue) {
              setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                  todo.id === id ? { ...todo, starred: starredValue } : todo
                )
              )
            }
          }
        })
    }
  }

  const toggleChecked = (id: number) => {
    const checkedValue = todos.find((todo) => todo.id === id)?.completed
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !checkedValue } : todo
      )
    )

    if (checkedValue !== undefined) {
      client
        .todos({ id })
        .patch({ completed: !checkedValue })
        .then((res) => {
          if (res.error) {
            if (checkedValue) {
              setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                  todo.id === id ? { ...todo, completed: checkedValue } : todo
                )
              )
            }
          }
        })
    }
  }

  const addTodo = () => {
    const newTodo = {
      desc: inputRef.current!.value,
      starred: false,
      completed: false
      // id: Math.random()
    }
    setTodos((prevTodos) => [...prevTodos, { ...newTodo, id: Math.random() }])
    if (newTodo.desc !== undefined) {
      client.todos.new.post(newTodo).then((res) => {
        if (res.error) {
          res.error
        }
        if (res.data) {
          setTodos((prevTodos) => [...prevTodos, res.data])
        }
      })
      inputRef.current!.value = ''
    }
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
