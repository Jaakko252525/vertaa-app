























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
    username: ''
  },

  reducers: {
    userToStore: (state, action) => {
      const payload = action.payload

      state.username = payload.username


    }
  },
})


export const { userToStore } = userSlice.actions
export default userSlice.reducer

















