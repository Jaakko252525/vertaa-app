























import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


// type interface
interface UserState {
  username: string
}


// initialState
let initialState = {
     username: ''
    } as UserState


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userToStore(state, action) {
      console.log('inside userSlice', action.payload)
      return initialState = action.payload
    }
  },
})


export const { userToStore } = userSlice.actions
export default userSlice.reducer

















