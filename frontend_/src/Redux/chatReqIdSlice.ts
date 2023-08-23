





























import { createSlice } from '@reduxjs/toolkit'



const chatReqIdSlice = createSlice({
  name: 'chatReqId',

  initialState: {
    chatReqID: ''
  },

  reducers: {
    chatReqIDToStore: (state, action) => {
      const data = action.payload

      //@ts-ignore
      state.chatReqID = data



    }
  },
})


export const { chatReqIDToStore } = chatReqIdSlice.actions
export default chatReqIdSlice.reducer



































