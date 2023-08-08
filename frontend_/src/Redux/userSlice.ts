























import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


// type interface
interface UserState {
  username: string
}


// initialState
const initialState = {
     username: ''
    } as UserState


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userToStore(state, action) {
      console.log('inside userSlice', action)
      // @ts-ignore
      state.username = action
    }
  },
})


export const { userToStore } = userSlice.actions
export default userSlice.reducer

















