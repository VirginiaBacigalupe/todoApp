/* eslint-disable sort-keys */
import { createSlice, isPending, isRejected } from '@reduxjs/toolkit'

import { TaskType } from '../../index'
import {
  addTodoItem,
  deleteTodoItem,
  getTodoList,
  updateTodoItem,
} from './actions'

const todoSlice = createSlice({
  initialState: { todoList: [] as TaskType[], status: '' },
  name: 'todo',
  reducers: {
    // VERSION SIN COMUNICACIÓN CON BACKEND
    //
    // addTodo(state, action) {
    //   const newTodo = {
    //     description: action.payload.description,
    //     id: (idCount++).toString(),
    //     completed: false,
    //     title: action.payload.title,
    //   }
    //   state.todoList.push(newTodo)
    // },
    // checkTodo(state, action) {
    //   const todoIndex = state.todoList.findIndex(
    //     todo => todo.id === action.payload.id,
    //   )
    //   state.todoList[todoIndex].completed = action.payload.completed
    // },
    // cleanCkeckedTodos(state) {
    //   state.todoList = state.todoList.filter(item => item.completed === false)
    // },
  },
  extraReducers: builder => {
    builder.addCase(getTodoList.fulfilled, (state, action) => {
      state.status = 'success'
      state.todoList = action.payload
    })

    builder.addCase(addTodoItem.fulfilled, (state, action) => {
      const { description, title, id } = action.payload
      const newTodo = {
        description,
        id,
        completed: false,
        title,
      }
      state.todoList = state.todoList.concat(newTodo)
      state.status = 'success'
    })
    builder.addCase(updateTodoItem.fulfilled, (state, action) => {
      const { description, title, completed, id } = action.payload

      const todoIndex = state.todoList.findIndex(todo => todo.id === id)

      state.todoList[todoIndex].completed = completed
      state.todoList[todoIndex].title = title
      state.todoList[todoIndex].description = description
      state.status = 'success'
    })
    builder.addCase(deleteTodoItem.fulfilled, state => {
      state.todoList = state.todoList.filter(item => item.completed === false)
      state.status = 'success'
    })
    builder.addMatcher(isPending, state => {
      state.status = 'loading'
    })
    builder.addMatcher(isRejected, state => {
      state.status = 'failed'
      throw new Error('Falla conexión al servidor')
    })
  },
})

//export const { addTodo, checkTodo, cleanCkeckedTodos } = todoSlice.actions

export const todoReducer = todoSlice.reducer
