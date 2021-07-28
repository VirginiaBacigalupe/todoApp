import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { TaskType } from '../..'

export const getTodoList = createAsyncThunk('todos/getTodoList', async () => {
  try {
    const response = await axios.get(
      `https://rn-training-backend.herokuapp.com/todos`,
    )
    return response.data
  } catch (err) {
    throw new Error(err.message)
  }
})

export const addTodoItem = createAsyncThunk<TaskType, Partial<TaskType>>(
  'todos/addTodoItem',
  async task => {
    try {
      const response = await axios.post(
        `https://rn-training-backend.herokuapp.com/todos`,
        { ...task, completed: false },
      )
      return response.data
    } catch (err) {
      throw new Error(err.message)
    }
  },
)

export const updateTodoItem = createAsyncThunk<
  TaskType,
  { id: string } & Partial<TaskType>
>('todos/updateTodoItem', async data => {
  try {
    const response = await axios.put(
      `https://rn-training-backend.herokuapp.com/todos/${data.id}`,
      data,
    )
    return response.data
  } catch (err) {
    throw new Error(err.message)
  }
})

export const deleteTodoItem = createAsyncThunk<void, string[]>(
  'todos/deleteTodoItem',
  async (todoIds: string[]) => {
    try {
      const querys = todoIds.map(id =>
        axios.delete(`https://rn-training-backend.herokuapp.com/todos/${id}`),
      )
      await Promise.all(querys)
    } catch (err) {
      throw new Error(err.message)
    }
  },
)
