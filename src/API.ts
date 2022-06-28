import axios, { AxiosResponse } from 'axios'

const baseUrl: string = 'http://localhost:3001/api'

export const getTodos = async () => {
  try {
    const todos = await axios.get(
      baseUrl + '/todo'
    )
    return todos.data
  } catch (error) {
    throw new Error(error)
  }
}

export const addTodo = async (
  formData: ITodo
) => {
  try {
    const todo: Omit<ITodo, '_id'> = {
      name: formData.name,
      description: formData.description,
      status: 'false',
    }
    const saveTodo = await axios.post(
      baseUrl + '/todo',
      todo
    )

    return saveTodo.data
  } catch (error) {
    throw new Error(error)
  }
}

export const updateTodo = async (
  todo: ITodo
) => {
  try {
    const todoUpdate: Pick<ITodo, 'status'> = {
      status: 'true',
    }
    const updatedTodo = await axios.put(
      `${baseUrl}/todo/${todo._id}`,
      todoUpdate
    )
    return updatedTodo.data
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteTodo = async (
  _id: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
      `${baseUrl}/todo/${_id}`
    )
    return deletedTodo
  } catch (error) {
    throw new Error(error)
  }
}
