









// imorting slicers
import counterSlice from './counterSlice'
import userSlice from './userSlice'


import { configureStore } from '@reduxjs/toolkit'




export default configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice
  }
})
























