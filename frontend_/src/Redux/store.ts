









// imorting slicers
import userSlice from './userSlice'
import chatReqIdSlice from './chatReqIdSlice'

import { configureStore } from '@reduxjs/toolkit'




export default configureStore({
  reducer: {
    user: userSlice,
    chatReqId: chatReqIdSlice
  }
})
























