import { createSlice } from '@reduxjs/toolkit'

import { TaskType } from '../../index'

let idCount = 0
const todoSlice = createSlice({
  initialState: { todoList: [] as TaskType[] },
  name: 'todo',
  reducers: {
    addTodo(state, action) {
      const newTodo = {
        description: action.payload.description,
        id: (idCount++).toString(),
        isChecked: action.payload.isChecked,
        title: action.payload.title,
      }
      state.todoList.push(newTodo)
    },
    checkTodo(state, action) {
      const todoIndex = state.todoList.findIndex(
        todo => todo.id === action.payload.id,
      )
      state.todoList[todoIndex].isChecked = action.payload.isChecked
    },
    cleanCkeckedTodos(state) {
      state.todoList = state.todoList.filter(item => item.isChecked === false)
    },
  },
})

export const { addTodo, checkTodo, cleanCkeckedTodos } = todoSlice.actions

export const todoReducer = todoSlice.reducer
