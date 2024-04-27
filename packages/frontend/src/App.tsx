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
import { Loader2Icon, StarIcon, Trash2 } from 'lucide-react'
import {
  useEffect,
  useOptimistic,
  useRef,
  useState,
  useTransition
} from 'react'
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

function Spinner() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="pointer-events-none rounded-3xl"
    >
      <Loader2Icon className="h-4 w-4 animate-spin duration-500" />
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

type OptimisticTodos = Todo & {
  pending?: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [todosOptimistic, setTodosOptimistic] =
    useOptimistic<OptimisticTodos[]>(todos)
  const [isPending, startTransition] = useTransition()

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
    startTransition(async () => {
      setTodosOptimistic(
        todos.map((todo) =>
          todo.id === id ? { ...todo, pending: true } : todo
        )
      )

      const res = await client.todos({ id: id }).delete()
      if (res.error) {
        res.error
      }
      if (res.data) {
        setTodos(todos.filter((todo) => todo.id !== res.data.id))
      }
    })
  }

  const toggleStar = (id: number) => {
    const currentTodo = todos.find((todo) => todo.id === id)
    if (!currentTodo) return

    startTransition(async () => {
      setTodosOptimistic(
        todos.map((todo) =>
          todo.id === id
            ? { ...todo, starred: !currentTodo.starred, pending: true }
            : todo
        )
      )

      const res = await client
        .todos({ id: id })
        .patch({ starred: !currentTodo.starred })
      if (res.error) {
        res.error
      }
      if (res.data) {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, starred: res.data.starred } : todo
          )
        )
      }
    })
  }

  const toggleChecked = (id: number) => {
    const currentTodo = todos.find((todo) => todo.id === id)
    if (!currentTodo) return

    startTransition(async () => {
      setTodosOptimistic(
        todos.map((todo) =>
          todo.id === id
            ? { ...todo, completed: !currentTodo.completed, pending: true }
            : todo
        )
      )

      const res = await client
        .todos({ id: id })
        .patch({ completed: !currentTodo.completed })

      if (res.error) {
        res.error
      }
      if (res.data) {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: res.data.completed } : todo
          )
        )
      }
    })
  }

  const addTodo = () => {
    if (inputRef.current && inputRef.current.value != '') {
      const description = inputRef.current.value
      startTransition(async () => {
        setTodosOptimistic([
          ...todosOptimistic,
          {
            id: Math.random(),
            desc: description,
            starred: false,
            completed: false,
            pending: true
          }
        ])
        const res = await client.todos.post({ desc: description })
        if (res.error) {
          res.error
        }
        if (res.data) {
          setTodos([...todos, res.data])
        }
        if (inputRef.current) inputRef.current.value = ''
      })
    }
  }

  return (
    <main className="mx-auto mt-8 max-w-prose">
      <h1 className="text-center text-xl">My todos</h1>
      <Table>
        <TableCaption>A list of your todos.</TableCaption>
        <TableBody>
          {[
            ...todosOptimistic.filter(({ starred }) => starred),
            ...todosOptimistic.filter(({ starred }) => !starred)
          ].map((todo) => (
            <TableRow className="" key={todo.id}>
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
                {todo.pending && <Spinner />}
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
        <Input
          disabled={isPending}
          ref={inputRef}
          type="text"
          placeholder="To do"
        />
        <Button disabled={isPending} type="submit">
          Add
        </Button>
      </form>
    </main>
  )
}

export default App
