import React, { useEffect, useState } from 'react'
import TodoItem from './components/TodoItem'
import AddTodo from './components/AddTodo'
import { getTodos, addTodo, updateTodo, deleteTodo } from './API'

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = (): void => {
    getTodos()
    .then((todos) => setTodos(todos))
    .catch((err: Error) => console.log(err))
  }

 const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
   e.preventDefault()
   addTodo(formData)
   .then(() => {
    fetchTodos()
  })
  .catch((err) => console.log(err))
}

  const handleUpdateTodo = (todo: ITodo): void => {
    updateTodo(todo)
    .then(({}) => {
       
      fetchTodos()
      })
      .catch((err) => console.log(err))
  }

  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
    .then(({  }) => {
       
        fetchTodos()
      })
      .catch((err) => console.log(err))
  }

  return (
    <main className='App'>
      <h1>My Todos</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      {todos.map((todo: ITodo) => (
        <TodoItem
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </main>
  )
}

export default App
