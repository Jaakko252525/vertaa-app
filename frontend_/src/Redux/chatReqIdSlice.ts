





























import { createSlice } from '@reduxjs/toolkit'



const chatReqIdSlice = createSlice({
  name: 'chatReqId',

  initialState: {
    chatReqID: ''
  },

  reducers: {
    chatReqIDToStore: (state, action) => {
      const payload = action.payload

      state.chatReqID = payload.chatReqID



    }
  },
})


export const { chatReqIDToStore } = chatReqIdSlice.actions
export default chatReqIdSlice.reducer



































