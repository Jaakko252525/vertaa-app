









// imorting slicers
import userSlice from './userSlice'


import { configureStore } from '@reduxjs/toolkit'




export default configureStore({
  reducer: {
    user: userSlice
  }
})
























