import { configureStore } from '@reduxjs/toolkit'
import users from './slices/users'
import { uiSlice } from './slices/users/ui'

export default configureStore({
  reducer: {
    users,
    ui: uiSlice.reducer
  }
})
