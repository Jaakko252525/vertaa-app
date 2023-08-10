























import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


// type interface
interface UserState {
  username: string
}

/*
// initialState
let initialState = {
     username: ''
    } as UserState
*/

const userSlice = createSlice({
  name: 'user',

  initialState: {
    username: '',
    id: '',
    password: ''
  },

  reducers: {
    userToStore: (state, action) => {
      const payload = action.payload

      console.log('payload', payload)
      state.username = payload.username
      state.id = payload.id
      state.password = payload.password


    }
  },
})


export const { userToStore } = userSlice.actions
export default userSlice.reducer

















